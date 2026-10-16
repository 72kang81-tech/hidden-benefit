#!/usr/bin/env python3
"""
매시간 실행되는 정부지원금 블로그 → 쓰레드 자동 게시 스크립트.

흐름 (2026-10-16 변경: 사진을 붙여 올리도록 바뀜. 블로그 글의 첫 사진이 있으면 바로 붙여 올리고,
없을 때만 카드 사진이 만들어질 때까지 기다렸다가 올린다):
  1. 블로그 RSS(300md72.com/rss)에서 최신 글 1건을 가져온다.
  2. state.json에 기록된 last_processed_link와 비교해서 새 글인지 확인한다.
  3-a. 새 글을 처음 본 실행: 올리지 않고 state.json의 pending에 "대기" 표시만 한다.
       (같은 실행의 뒷 단계에서 benefit 카드가 만들어지고 사이트에 올라간다.)
  3-b. 다음 실행: social/ 폴더에 카드 사진(PNG)이 있고 사이트에서 실제로 열리면,
       그 사진을 붙여 쓰레드 본문 + 고정 댓글을 올린다. 사진이 MAX_WAIT_HOURS 시간이
       넘도록 준비되지 않으면 예전처럼 글자만 올린다.
  4. 처리 결과를 state.json에 기록한다. 이 파일은 워크플로우가 커밋해서 저장소에 반영한다.

사람의 확인(승인) 절차 없이 완전 자동으로 게시된다 — 이건 사용자가 명시적으로
선택한 방식이다. 문구는 AI가 매번 새로 짓는 게 아니라 정해진 템플릿을 순환시키는
방식이라, Cowork 대화에서 만드는 초안보다 표현이 반복될 수 있다.

링크 규칙(2026-08-26 확정): 쓰레드 본문(BODY_TEMPLATES)에는 어떤 링크도 절대 넣지
않는다 — 링크는 항상 고정 댓글에만 넣는다. 고정 댓글에는 블로그 글 링크와
benefit.300md72.com 링크를 항상 둘 다 넣는다 — 블로그 링크만 있고 베네핏 링크가
빠지면 안 된다.
"""
import glob
import hashlib
import html
import json
import os
import re
import sys
import time
import urllib.request
import urllib.parse
import xml.etree.ElementTree as ET

RSS_URL = "https://300md72.com/rss"
STATE_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "state.json")
API_BASE = "https://graph.threads.net/v1.0"
MAX_LEN = 500

# 숨은 혜택 큐레이션 사이트 — 개별 글 딥링크는 지원하지 않아(script.js가 검색/필터를
# 클라이언트에서 처리) 항상 사이트 루트로 건다. 고정 댓글에는 이 링크를 블로그 글
# 링크와 함께 항상 넣는다.
BENEFIT_SITE_URL = "https://benefit.300md72.com/"

# 절대 이 리스트에 {link}나 {benefit_link}를 넣지 않는다 — 본문에는 링크를 넣지 않는
# 게 규칙이다. 링크는 REPLY_TEMPLATES(고정 댓글)에서만 쓴다.
BODY_TEMPLATES = [
    "{title}\n\n{meta}\n\n대상 여부는 소득·가구·신청 시점에 따라 달라질 수 있어요. 공식 조건까지 함께 확인해보세요.\n\n{tags}",
    "놓치기 쉬운 생활 혜택입니다.\n\n{title}\n\n{meta}\n\n해당될 가능성이 있다면 신청 기간부터 확인해보세요.\n\n{tags}",
    "오늘 확인할 정책 혜택\n\n{title}\n\n{meta}\n\n핵심 조건과 공식 신청처를 정리했습니다.\n\n{tags}",
]

# 블로그 글 링크({link})와 베네핏 사이트 링크({benefit_link})를 항상 둘 다 포함한다.
REPLY_TEMPLATES = [
    "자세한 내용 여기 👉 {link}\n\n비슷한 숨은 혜택 더 보기 👉 {benefit_link}",
    "신청 방법 정리해둠 👉 {link}\n\n놓치기 쉬운 다른 혜택도 모아둠 👉 {benefit_link}",
    "조건 궁금하면 확인 👉 {link}\n\n숨은 혜택 더 보기 👉 {benefit_link}",
]

TAG_SETS = [
    "#정부지원금 #지원금정보",
    "#정부지원금 #복지정책",
    "#정부지원금 #신청방법",
]


def log(msg):
    print(msg, file=sys.stderr)


def load_state():
    if not os.path.exists(STATE_PATH):
        return {
            "last_processed_link": None,
            "last_processed_title": None,
            "last_thread_permalink": None,
            "last_body_template": -1,
            "last_reply_template": -1,
            "last_tag_set": -1,
            "last_checked_at": None,
        }
    with open(STATE_PATH, "r", encoding="utf-8") as f:
        return json.load(f)


def save_state(state):
    with open(STATE_PATH, "w", encoding="utf-8") as f:
        json.dump(state, f, ensure_ascii=False, indent=2)
        f.write("\n")


def fetch(url, data=None, headers=None, method=None, timeout=20):
    merged_headers = {"User-Agent": "Mozilla/5.0 (gov-thread-autopost bot)"}
    merged_headers.update(headers or {})
    req = urllib.request.Request(url, data=data, headers=merged_headers, method=method)
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        return resp.status, resp.read().decode("utf-8")


def get_latest_post():
    status, body = fetch(RSS_URL)
    root = ET.fromstring(body)
    item = root.find("./channel/item")
    if item is None:
        return None
    title = html.unescape(item.findtext("title", default="").strip())
    link = item.findtext("link", default="").strip()
    description = html.unescape(item.findtext("description", default="") or "")

    meta_match = re.search(r"메타디스크립션:\s*(.+?)\s*-->", description)
    if meta_match:
        meta = meta_match.group(1).strip()
    else:
        # 메타디스크립션 주석이 없으면 첫 <p> 텍스트를 대신 사용
        p_match = re.search(r"<p[^>]*>(.*?)</p>", description, re.S)
        meta = re.sub(r"<[^>]+>", "", p_match.group(1)).strip() if p_match else ""
        meta = meta[:150]

    # 글 본문의 첫 번째 사진(블로그에 올린 사진)을 쓰레드 사진으로 쓴다.
    img_match = re.search(r'<img[^>]+src="([^"]+)"', description)
    image = img_match.group(1) if img_match else None

    return {"title": title, "link": link, "meta": meta, "image": image}


def pick_index(total, last_index):
    """직전에 쓴 것과 겹치지 않게 다음 인덱스를 고른다."""
    if total <= 1:
        return 0
    candidates = [i for i in range(total) if i != last_index]
    # 실행 시각 기반으로 결정적으로 순환시켜서(랜덤 대신) 매 실행 재현 가능하게 함
    idx = int(time.time()) % len(candidates)
    return candidates[idx]


def build_texts(post, state):
    body_idx = pick_index(len(BODY_TEMPLATES), state.get("last_body_template", -1))
    reply_idx = pick_index(len(REPLY_TEMPLATES), state.get("last_reply_template", -1))
    tag_idx = pick_index(len(TAG_SETS), state.get("last_tag_set", -1))

    body = BODY_TEMPLATES[body_idx].format(
        title=post["title"], meta=post["meta"], tags=TAG_SETS[tag_idx]
    )
    reply = REPLY_TEMPLATES[reply_idx].format(link=post["link"], benefit_link=BENEFIT_SITE_URL)

    if len(body) > MAX_LEN:
        # 메타 요약이 너무 길면 잘라서 길이 제한을 지킨다
        overflow = len(body) - MAX_LEN
        trimmed_meta = post["meta"][: max(0, len(post["meta"]) - overflow - 1)] + "…"
        body = BODY_TEMPLATES[body_idx].format(
            title=post["title"], meta=trimmed_meta, tags=TAG_SETS[tag_idx]
        )

    if len(reply) > MAX_LEN:
        # 문구가 길어서 링크 두 개(블로그 + 베네핏)와 함께 500자를 넘으면, 문구는
        # 빼고 링크 두 개만 남긴다 — 링크가 하나라도 빠지는 것보다는 이게 낫다.
        reply = f"{post['link']}\n{BENEFIT_SITE_URL}"

    return body, reply, body_idx, reply_idx, tag_idx


def create_container(user_id, token, text, reply_to_id=None):
    params = {"media_type": "TEXT", "text": text, "access_token": token}
    if reply_to_id:
        params["reply_to_id"] = reply_to_id
    data = urllib.parse.urlencode(params).encode()
    status, body = fetch(f"{API_BASE}/{user_id}/threads", data=data, method="POST")
    result = json.loads(body)
    if "id" not in result:
        raise RuntimeError(f"create_container 실패: {result}")
    return result["id"]


def wait_until_ready(creation_id, token, timeout_sec=30):
    deadline = time.time() + timeout_sec
    while time.time() < deadline:
        url = f"{API_BASE}/{creation_id}?" + urllib.parse.urlencode(
            {"fields": "status,error_message", "access_token": token}
        )
        try:
            status, body = fetch(url, method="GET")
            data = json.loads(body)
            st = data.get("status")
            if st == "FINISHED":
                return
            if st == "ERROR":
                raise RuntimeError(f"컨테이너 처리 에러: {data}")
        except Exception as e:
            log(f"wait_until_ready 조회 실패(무시하고 재시도): {e}")
        time.sleep(2)


def publish_container(user_id, token, creation_id):
    params = {"creation_id": creation_id, "access_token": token}
    data = urllib.parse.urlencode(params).encode()
    status, body = fetch(f"{API_BASE}/{user_id}/threads_publish", data=data, method="POST")
    result = json.loads(body)
    if "id" not in result:
        raise RuntimeError(f"publish_container 실패: {result}")
    return result["id"]


def get_permalink(media_id, token):
    try:
        url = f"{API_BASE}/{media_id}?" + urllib.parse.urlencode(
            {"fields": "permalink", "access_token": token}
        )
        status, body = fetch(url, method="GET")
        return json.loads(body).get("permalink")
    except Exception:
        return None



REPO_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SOCIAL_DIR = os.path.join(REPO_ROOT, "social")
SOCIAL_BASE_URL = "https://benefit.300md72.com/social/"
# 카드 사진이 이 시간(시간 단위)을 넘도록 준비되지 않으면 사진 없이 글자만 올린다.
MAX_WAIT_HOURS = 3


def find_card_image_url(link):
    """build-social이 만든 카드 PNG(social/<제목>-<sha1(블로그주소) 앞 7자>.png)를 찾아
    실제 사이트에서 열리는지 확인한 뒤 주소를 돌려준다. 없으면 None."""
    suffix = "-" + hashlib.sha1(link.encode("utf-8")).hexdigest()[:7] + ".png"
    for path in glob.glob(os.path.join(SOCIAL_DIR, "*" + suffix)):
        name = os.path.basename(path)
        url = SOCIAL_BASE_URL + urllib.parse.quote(name)
        try:
            req = urllib.request.Request(
                url, method="HEAD", headers={"User-Agent": "Mozilla/5.0 (gov-thread-autopost bot)"}
            )
            with urllib.request.urlopen(req, timeout=20) as resp:
                if resp.status == 200 and "image" in (resp.headers.get("content-type") or ""):
                    return url
        except Exception as e:
            log(f"카드 사진 주소 확인 실패: {e}")
    return None


def create_image_container(user_id, token, text, image_url):
    params = {"media_type": "IMAGE", "image_url": image_url, "text": text, "access_token": token}
    data = urllib.parse.urlencode(params).encode()
    status, body = fetch(f"{API_BASE}/{user_id}/threads", data=data, method="POST")
    result = json.loads(body)
    if "id" not in result:
        raise RuntimeError(f"create_image_container 실패: {result}")
    return result["id"]


def publish_post(user_id, token, state, post, image_url):
    """본문(사진 있으면 사진 포함) + 고정 댓글을 올리고 state에 기록한다."""
    body, reply, body_idx, reply_idx, tag_idx = build_texts(post, state)

    posted = False
    if image_url:
        try:
            creation_id = create_image_container(user_id, token, body, image_url)
            wait_until_ready(creation_id, token)
            post_id = publish_container(user_id, token, creation_id)
            posted = True
        except Exception as e:
            log(f"사진 게시 실패, 글자만 올립니다: {e}")
    if not posted:
        creation_id = create_container(user_id, token, body)
        wait_until_ready(creation_id, token)
        post_id = publish_container(user_id, token, creation_id)
    permalink = get_permalink(post_id, token)
    log(f"본문 게시 완료({'사진 포함' if posted else '글자만'}): {permalink or post_id}")

    # 본문 게시는 성공했으니, 다음 실행에서 중복 게시되지 않도록 여기서 바로 state를 저장한다.
    state["last_processed_link"] = post["link"]
    state["last_processed_title"] = post["title"]
    state["last_thread_permalink"] = permalink
    state["last_body_template"] = body_idx
    state["last_tag_set"] = tag_idx
    state["pending"] = None
    save_state(state)

    try:
        time.sleep(3)
        reply_creation_id = create_container(user_id, token, reply, reply_to_id=post_id)
        wait_until_ready(reply_creation_id, token)
        reply_id = publish_container(user_id, token, reply_creation_id)
        log(f"고정 댓글 게시 완료: {reply_id}")
        state["last_reply_template"] = reply_idx
        save_state(state)
    except Exception as e:
        log(f"고정 댓글 게시 실패(본문은 이미 게시됨, 댓글만 누락): {e}")


def main():
    token = os.environ.get("THREADS_ACCESS_TOKEN")
    user_id = os.environ.get("THREADS_USER_ID")
    if not token or not user_id:
        log("THREADS_ACCESS_TOKEN / THREADS_USER_ID 환경변수가 없습니다.")
        sys.exit(1)

    state = load_state()
    post = get_latest_post()
    if post is None:
        log("RSS에서 글을 찾지 못했습니다.")
        sys.exit(0)

    now = time.time()
    state["last_checked_at"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime(now))
    pending = state.get("pending")

    # 대기 중인 글이 있는데 더 새 글이 올라왔다면, 대기 글은 사진 없이 먼저 올린다.
    if pending and pending.get("link") != post["link"]:
        log(f"대기 글을 사진 없이 먼저 게시: {pending.get('title')}")
        publish_post(user_id, token, state, pending, None)
        pending = None

    if post["link"] == state.get("last_processed_link"):
        log("새 글 없음 — 이미 처리한 글과 동일.")
        save_state(state)
        return

    if not pending and post.get("image"):
        # 블로그 글 안의 첫 사진을 바로 붙여 올린다(기다릴 필요 없음). 사진 게시가 실패하면
        # publish_post 안에서 글자만 올리는 쪽으로 넘어간다.
        log(f"새 글 감지(블로그 사진으로 바로 게시): {post['title']}")
        publish_post(user_id, token, state, post, post["image"])
        return

    if not pending:
        # 새 글에 쓸 블로그 사진이 없을 때만 이 단계로 온다. 새 글을 처음 본 시점:
        # 카드 사진은 이번 실행 뒤쪽 단계(benefit 카드 연동·빌드)에서
        # 만들어지므로, 지금은 올리지 않고 대기 표시만 해 둔다. 다음 실행에서 사진과 함께 올린다.
        log(f"새 글 감지(카드 사진 준비를 기다립니다): {post['title']}")
        state["pending"] = {
            "link": post["link"],
            "title": post["title"],
            "meta": post["meta"],
            "first_seen": now,
        }
        save_state(state)
        return

    image_url = find_card_image_url(post["link"])
    waited_hours = (now - float(pending.get("first_seen", now))) / 3600
    if image_url is None and waited_hours < MAX_WAIT_HOURS:
        log(f"카드 사진이 아직 준비되지 않았습니다({waited_hours:.1f}시간 대기). 다음 실행에서 다시 확인합니다.")
        save_state(state)
        return

    log(f"게시 시작: {post['title']} (사진: {'있음' if image_url else '없음'})")
    publish_post(user_id, token, state, post, image_url)


if __name__ == "__main__":
    main()
