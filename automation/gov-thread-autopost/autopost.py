#!/usr/bin/env python3
"""
매시간 실행되는 정부지원금 블로그 → 쓰레드 자동 게시 스크립트.

흐름:
  1. 블로그 RSS(300md72.com/rss)에서 최신 글 1건을 가져온다.
  2. state.json에 기록된 last_processed_link와 비교해서 새 글인지 확인한다.
  3. 새 글이면 RSS 안의 메타디스크립션(gov-support-blog-editor 스킬이 HTML 안에
     <!-- 메타디스크립션: ... --> 형태로 심어둔 요약 문장)을 뽑아서, 미리 준비된
     여러 템플릿 중 하나(직전 실행과 겹치지 않게 순환)로 쓰레드 본문 + 고정 댓글을 만든다.
  4. Threads API로 본문을 게시하고, 이어서 고정 댓글(블로그 글 링크 + benefit.300md72.com
     링크 둘 다 포함)을 답글로 게시한다.
  5. 처리 결과를 state.json에 기록한다. 이 파일은 워크플로우가 커밋해서 저장소에 반영한다.

사람의 확인(승인) 절차 없이 완전 자동으로 게시된다 — 이건 사용자가 명시적으로
선택한 방식이다. 문구는 AI가 매번 새로 짓는 게 아니라 정해진 템플릿을 순환시키는
방식이라, Cowork 대화에서 만드는 초안보다 표현이 반복될 수 있다.

링크 규칙(2026-08-26 확정): 쓰레드 본문(BODY_TEMPLATES)에는 어떤 링크도 절대 넣지
않는다 — 링크는 항상 고정 댓글에만 넣는다. 고정 댓글에는 블로그 글 링크와
benefit.300md72.com 링크를 항상 둘 다 넣는다 — 블로그 링크만 있고 베네핏 링크가
빠지면 안 된다.
"""
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
    "{title} 이거 모르면 그냥 날아감.\n\n{meta}\n\n근데 조건이랑 신청 안내가 은근 헷갈림. 놓치기 전에 확인해봐.\n\n{tags}",
    "이거 아직도 모르는 사람 있음?\n\n{title}\n\n{meta}\n\n자세한 조건은 다 안 적음.\n\n{tags}",
    "요즘 물가 때문에 다들 힘든 시기.\n\n{title}\n\n{meta}\n\n방법 알아두면 손해 안 봄.\n\n{tags}",
    "{title}\n\n{meta}\n\n이거 기한 지나면 못 받음. 확인 안 하면 나만 손해.\n\n{tags}",
    "다들 이거 확인했나 모르겠음.\n\n{title}\n\n{meta}\n\n자세한 내용은 더 있는데 다 못 적음.\n\n{tags}",
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

    return {"title": title, "link": link, "meta": meta}


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

    state["last_checked_at"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

    if post["link"] == state.get("last_processed_link"):
        log("새 글 없음 — 이미 처리한 글과 동일.")
        save_state(state)
        return

    log(f"새 글 감지: {post['title']}")
    body, reply, body_idx, reply_idx, tag_idx = build_texts(post, state)

    creation_id = create_container(user_id, token, body)
    wait_until_ready(creation_id, token)
    post_id = publish_container(user_id, token, creation_id)
    permalink = get_permalink(post_id, token)
    log(f"본문 게시 완료: {permalink or post_id}")

    # 본문 게시는 성공했으니, 다음 실행에서 중복 게시되지 않도록 여기서 바로 state를 저장한다.
    state["last_processed_link"] = post["link"]
    state["last_processed_title"] = post["title"]
    state["last_thread_permalink"] = permalink
    state["last_body_template"] = body_idx
    state["last_tag_set"] = tag_idx
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
        # 본문은 성공했으므로 실패로 종료하지 않는다 — 워크플로우는 정상 종료.


if __name__ == "__main__":
    main()
