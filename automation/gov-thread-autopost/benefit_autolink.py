#!/usr/bin/env python3
"""
매시간 실행되는 정부지원금 블로그 → benefit.300md72.com 카드 자동 연동 스크립트.

흐름:
  1. 블로그 RSS(300md72.com/rss)에서 최신 글 1건을 가져온다.
  2. benefit_state.json에 기록된 last_linked_link, 그리고 data.js에 이미 있는
     blogUrl 목록 두 곳 모두와 비교해서 "아직 카드로 없는 새 글"인지 확인한다.
  3. 새 글이면 RSS 안의 정보(메타디스크립션, 핵심 요약 불릿, 본문 속 정부/공공기관
     링크)를 뽑아서 카드 항목(title/summary/target/category/keywords/blogUrl/officialUrl)을
     자동으로 만들고, 저장소 루트의 data.js 안 benefits 배열 끝에 추가한다.

이 사이트는 블로그 글 전부가 아니라 일부만 골라 보여주는 큐레이션 사이트였지만,
완전 자동화를 위해 이 스크립트는 "새 글은 일단 다 카드로 추가한다"는 단순한
규칙으로 동작한다 — 사람이 판단하던 부분(정말 이 사이트에 어울리는 글인지, 문구를
다듬는 것)을 생략한 것이다. 그래서 제목/요약/대상/분류는 AI가 손으로 쓴 것보다
거칠 수 있다. 특정 글을 카드에서 빼거나 문구를 다듬고 싶으면 data.js를 직접
수정하면 된다.
"""
import json
import html
import os
import re
import sys
import time
import urllib.request
import xml.etree.ElementTree as ET

RSS_URL = "https://300md72.com/rss"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
STATE_PATH = os.path.join(SCRIPT_DIR, "benefit_state.json")
# 이 스크립트는 저장소 루트에서 실행된다고 가정한다 (data.js가 루트에 있음).
DATA_JS_PATH = os.path.join(os.getcwd(), "data.js")

CATEGORY_KEYWORDS = {
    "주거": ["주거", "전세", "월세", "임대", "행복주택", "보증금", "LH", "입주"],
    "의료비": ["의료", "치매", "암", "질환", "진료", "병원", "약", "바우처", "재활", "장애"],
    "문화·여가": ["문화", "여가", "공연", "전시", "할인", "축제", "여행", "관광"],
    "창업·취업": ["창업", "취업", "고용", "일자리", "훈련", "구직", "사업자"],
}
DEFAULT_CATEGORY = "금융·생활비"


def log(msg):
    print(msg, file=sys.stderr)


def load_state():
    if not os.path.exists(STATE_PATH):
        return {"last_linked_link": None, "last_linked_title": None, "last_checked_at": None}
    with open(STATE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_state(state):
    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)
        f.write("\n")


def fetch(url, timeout=20):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (gov-thread-autopost bot)"})
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.read().decode("utf-8")


def get_latest_post():
    body = fetch(RSS_URL)
    root = ET.fromstring(body)
    item = root.find("./channel/item")
    if item is None:
        return None
    title = html.unescape(item.findtext("title", default="").strip())
    link = item.findtext("link", default="").strip()
    description_raw = item.findtext("description", default="") or ""
    description = html.unescape(description_raw)
    return {"title": title, "link": link, "description": description}


def existing_blog_urls():
    if not os.path.exists(DATA_JS_PATH):
        return set()
    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    return set(re.findall(r'blogUrl:\s*"([^"]*)"', content))


def extract_meta(description):
    m = re.search(r"메타디스크립션:\s*(.+?)\s*-->", description)
    if m:
        return m.group(1).strip()
    p = re.search(r"<p[^>]*>(.*?)</p>", description, re.S)
    if p:
        return re.sub(r"<[^>]+>", "", p.group(1)).strip()[:150]
    return ""


def extract_summary_bullets(description):
    """'핵심 요약' 박스(gov-support-summary) 안의 불릿만 뽑는다. 없으면 첫 <ul> 전체를 쓴다."""
    box = re.search(r'class="gov-support-summary"[^>]*>(.*?)</div>', description, re.S)
    scope = box.group(1) if box else description
    bullets = re.findall(r"<li[^>]*>(.*?)</li>", scope, re.S)
    return [re.sub(r"<[^>]+>", "", b).strip() for b in bullets]


def extract_target(bullets, fallback):
    for b in bullets:
        if b.startswith("대상"):
            return re.sub(r"^대상\s*:\s*", "", b).strip()
    for b in bullets:
        if "대상" in b:
            return b
    return fallback


def extract_official_url(description):
    links = re.findall(r'href="([^"]+)"', description)
    for l in links:
        if ("go.kr" in l or "or.kr" in l) and "cdn" not in l:
            return l
    return None


def guess_category(title, bullets):
    text = title + " " + " ".join(bullets)
    best_cat, best_score = DEFAULT_CATEGORY, 0
    for cat, kws in CATEGORY_KEYWORDS.items():
        score = sum(1 for kw in kws if kw in text)
        if score > best_score:
            best_cat, best_score = cat, score
    return best_cat


def guess_keywords(title):
    tokens = re.findall(r"[가-힣A-Za-z0-9]+", title)
    tokens = [t for t in tokens if len(t) > 1]
    return " ".join(tokens[:6])


def js_escape(s):
    return s.replace("\\", "\\\\").replace('"', '\\"')


def build_entry(post):
    bullets = extract_summary_bullets(post["description"])
    meta = extract_meta(post["description"])
    summary = meta or (bullets[0] if bullets else post["title"])
    target = extract_target(bullets, fallback=summary)
    category = guess_category(post["title"], bullets)
    keywords = guess_keywords(post["title"])
    official_url = extract_official_url(post["description"]) or post["link"]

    return {
        "title": post["title"],
        "summary": summary,
        "target": target,
        "category": category,
        "status": "현재 확인 가능",
        "keywords": keywords,
        "blogUrl": post["link"],
        "officialUrl": official_url,
    }


def entry_to_js(entry):
    lines = ["  {"]
    for key in ["title", "summary", "target", "category", "status", "keywords", "blogUrl", "officialUrl"]:
        lines.append(f'    {key}: "{js_escape(entry[key])}",')
    lines[-1] = lines[-1].rstrip(",")  # 마지막 필드는 콤마 없이
    lines.append("  }")
    return "\n".join(lines)


def append_entry_to_data_js(entry):
    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    entry_js = entry_to_js(entry)
    # 배열이 "...}\n];" 형태로 끝난다고 가정하고, 그 앞에 새 항목을 끼워넣는다.
    match = re.search(r"\n\];\s*$", content)
    if not match:
        raise RuntimeError("data.js 끝부분에서 '];' 패턴을 찾지 못했습니다 — 수동 확인 필요.")
    insert_at = match.start()
    new_content = content[:insert_at] + ",\n" + entry_js + "\n];\n"

    with open(DATA_JS_PATH, "w", encoding="utf-8") as f:
        f.write(new_content)


def main():
    state = load_state()
    post = get_latest_post()
    if post is None:
        log("RSS에서 글을 찾지 못했습니다.")
        sys.exit(0)

    state["last_checked_at"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    already_linked = post["link"] == state.get("last_linked_link") or post["link"] in existing_blog_urls()
    if already_linked:
        log("새로 연동할 글 없음 — 이미 카드로 있거나 처리한 글과 동일.")
        save_state(state)
        return

    log(f"새 글 카드 추가: {post['title']}")
    entry = build_entry(post)
    append_entry_to_data_js(entry)

    state["last_linked_link"] = post["link"]
    state["last_linked_title"] = post["title"]
    save_state(state)
    log(f"카드 추가 완료: {json.dumps(entry, ensure_ascii=False)}")


if __name__ == "__main__":
    main()
