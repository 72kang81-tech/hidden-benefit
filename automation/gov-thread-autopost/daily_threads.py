#!/usr/bin/env python3
"""한국시간 08:10/13:00/19:30 Threads 정기 콘텐츠 자동 게시."""
import html
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime
from zoneinfo import ZoneInfo

RSS_URL = "https://300md72.com/rss"
API_BASE = "https://graph.threads.net/v1.0"
ROOT = os.path.dirname(os.path.abspath(__file__))
STATE_PATH = os.path.join(ROOT, "daily_threads_state.json")
SOCIAL_INDEX = os.path.abspath(os.path.join(ROOT, "..", "..", "social", "index.json"))
KST = ZoneInfo("Asia/Seoul")
MAX_LEN = 500

def log(message):
    print(message, file=sys.stderr)

def fetch(url, data=None, method=None, timeout=25):
    req = urllib.request.Request(
        url, data=data, method=method,
        headers={"User-Agent": "Mozilla/5.0 (hidden-benefit threads editorial bot)"}
    )
    with urllib.request.urlopen(req, timeout=timeout) as response:
        return response.read().decode("utf-8")

def latest_post():
    root = ET.fromstring(fetch(RSS_URL))
    item = root.find("./channel/item")
    if item is None:
        raise RuntimeError("RSS에 게시물이 없습니다.")
    title = html.unescape(item.findtext("title", "").strip())
    link = item.findtext("link", "").strip()
    raw = html.unescape(item.findtext("description", "") or "")
    match = re.search(r"메타디스크립션:\s*(.+?)\s*-->", raw)
    if match:
        meta = match.group(1).strip()
    else:
        plain = re.sub(r"<[^>]+>", " ", raw)
        meta = re.sub(r"\s+", " ", plain).strip()[:150]
    return {"title": title, "link": link, "meta": meta}

def image_for(link):
    if not os.path.exists(SOCIAL_INDEX):
        return None
    with open(SOCIAL_INDEX, "r", encoding="utf-8") as handle:
        mapping = json.load(handle)
    candidates = [
        link,
        urllib.parse.quote(urllib.parse.unquote(link), safe=":/"),
        urllib.parse.unquote(link),
    ]
    for candidate in candidates:
        if candidate in mapping:
            return mapping[candidate]
    return None

def load_state():
    if not os.path.exists(STATE_PATH):
        return {"posted": {}}
    with open(STATE_PATH, "r", encoding="utf-8") as handle:
        return json.load(handle)

def save_state(state):
    with open(STATE_PATH, "w", encoding="utf-8") as handle:
        json.dump(state, handle, ensure_ascii=False, indent=2)
        handle.write("\n")

def trim(text):
    return text if len(text) <= MAX_LEN else text[:MAX_LEN - 1].rstrip() + "…"

def build_text(slot, post):
    if slot == "morning":
        return trim(
            "오늘의 지원금·정책·생활혜택\n\n"
            f"{post['title']}\n\n{post['meta']}\n\n"
            "나도 대상일 수 있으니 신청 기간과 소득·가구 조건을 먼저 확인해보세요.\n\n"
            "#생활혜택 #정부지원금 #복지정책"
        )
    if slot == "question":
        return trim(
            f"여러분이라면 ‘{post['title']}’을 확인할 때 무엇부터 보시나요?\n\n"
            "① 내가 대상인지\n② 실제 받을 수 있는 금액\n③ 신청 마감일\n④ 신청 절차\n\n"
            "번호와 이유를 댓글로 남겨주세요. 가장 헷갈리는 조건도 함께 알려주세요.\n\n"
            "#생활혜택 #오늘의질문"
        )
    return trim(
        "놓치기 쉬운 조건 체크\n\n"
        f"{post['title']}\n\n"
        "같은 혜택도 연령·소득·가구 구성·거주 지역·신청 시점에 따라 결과가 달라질 수 있습니다. "
        "금액만 보기보다 제외 조건과 신청 기한을 함께 확인하세요.\n\n"
        "#생활혜택 #지원금조건 #놓치지마세요"
    )

def create_container(user_id, token, text, image_url=None):
    params = {
        "media_type": "IMAGE" if image_url else "TEXT",
        "text": text,
        "access_token": token,
    }
    if image_url:
        params["image_url"] = image_url
    payload = urllib.parse.urlencode(params).encode()
    result = json.loads(fetch(f"{API_BASE}/{user_id}/threads", payload, "POST"))
    if "id" not in result:
        raise RuntimeError(f"컨테이너 생성 실패: {result}")
    return result["id"]

def wait_ready(creation_id, token):
    for _ in range(20):
        query = urllib.parse.urlencode({"fields": "status,error_message", "access_token": token})
        result = json.loads(fetch(f"{API_BASE}/{creation_id}?{query}"))
        if result.get("status") == "FINISHED":
            return
        if result.get("status") == "ERROR":
            raise RuntimeError(f"미디어 처리 실패: {result}")
        time.sleep(2)
    raise RuntimeError("미디어 처리 시간 초과")

def publish(user_id, token, creation_id):
    payload = urllib.parse.urlencode({"creation_id": creation_id, "access_token": token}).encode()
    result = json.loads(fetch(f"{API_BASE}/{user_id}/threads_publish", payload, "POST"))
    if "id" not in result:
        raise RuntimeError(f"게시 실패: {result}")
    return result["id"]

def permalink(media_id, token):
    try:
        query = urllib.parse.urlencode({"fields": "permalink", "access_token": token})
        return json.loads(fetch(f"{API_BASE}/{media_id}?{query}")).get("permalink")
    except Exception:
        return None

def main():
    token = os.environ.get("THREADS_ACCESS_TOKEN")
    user_id = os.environ.get("THREADS_USER_ID")
    slot = os.environ.get("THREADS_SLOT")
    if not token or not user_id:
        raise RuntimeError("Threads API 환경변수가 없습니다.")
    if slot not in {"morning", "question", "evening"}:
        raise RuntimeError("THREADS_SLOT 값이 올바르지 않습니다.")

    now = datetime.now(KST)
    key = f"{now.date().isoformat()}:{slot}"
    state = load_state()
    if key in state.get("posted", {}):
        log(f"이미 게시한 시간대입니다: {key}")
        return

    post = latest_post()
    image_url = None if slot == "question" else image_for(post["link"])
    text = build_text(slot, post)
    creation_id = create_container(user_id, token, text, image_url)
    wait_ready(creation_id, token)
    media_id = publish(user_id, token, creation_id)
    url = permalink(media_id, token)

    state.setdefault("posted", {})[key] = {
        "title": post["title"],
        "source_link": post["link"],
        "format": "image" if image_url else "text",
        "permalink": url,
        "posted_at": now.isoformat(),
    }
    cutoff = now.timestamp() - 45 * 86400
    state["posted"] = {
        k: v for k, v in state["posted"].items()
        if datetime.fromisoformat(v["posted_at"]).timestamp() >= cutoff
    }
    save_state(state)
    log(f"정기 Threads 게시 완료: {url or media_id}")

if __name__ == "__main__":
    try:
        main()
    except Exception as exc:
        log(str(exc))
        sys.exit(1)
