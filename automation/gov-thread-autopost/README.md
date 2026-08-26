# gov-thread-autopost

`300md72.com` 블로그에 새 글이 올라오면, 매시간 자동으로 확인해서 (1) 쓰레드(Threads)에 홍보 글을 올리고 (2) benefit.300md72.com에 혜택 카드로 연동하는 무료 자동화입니다. GitHub Actions로 동작하며, 실행 비용이 들지 않습니다(공개 저장소는 무제한, 비공개 저장소도 매달 2,000분 무료 — 이 작업은 한 달에 1시간마다 몇 분 미만 실행되므로 충분히 무료 범위 안입니다).

> 이 자동화는 별도 저장소가 아니라 `hidden-benefit` 저장소 안 `automation/gov-thread-autopost/` 폴더에 들어 있습니다. (GitHub 연결이 이 저장소 하나에만 권한이 있어서, 새 저장소를 만드는 대신 여기에 추가했습니다.) 이 저장소는 공개(public) 저장소라 코드와 워크플로우 내용은 누구나 볼 수 있지만, Threads 토큰 같은 비밀 값은 GitHub Actions Secrets에 암호화되어 저장되기 때문에 코드에 노출되지 않습니다.

## 동작 방식

매시 정각(UTC 기준)에 두 스크립트가 순서대로 실행됩니다.

**1) `autopost.py` — 쓰레드 자동 게시**
1. 블로그 RSS에서 최신 글 1건을 확인합니다.
2. `state.json`에 기록된 마지막 처리 글과 다르면 "새 글"로 판단합니다.
3. 새 글이면 정해진 템플릿(직전 실행과 겹치지 않게 순환) 중 하나로 쓰레드 본문 + 고정 댓글을 만들어 실제로 게시합니다. **본문에는 어떤 링크도 넣지 않고, 고정 댓글에만 링크를 넣습니다 — 고정 댓글에는 블로그 글 링크와 benefit.300md72.com 링크를 항상 둘 다 포함합니다.** (2026-08-26부터: 예전에는 고정 댓글에 블로그 링크만 있었는데, 베네핏 사이트로도 유입되도록 링크를 하나 더 추가했습니다. benefit.300md72.com은 글마다 딥링크가 없는 구조라 항상 사이트 루트 링크를 씁니다.)

**2) `benefit_autolink.py` — benefit.300md72.com 카드 자동 연동**
1. 블로그 RSS에서 최신 글 1건을 확인합니다.
2. `benefit_state.json`과 `data.js`에 이미 있는 링크 둘 다와 비교해서 "아직 카드로 없는 새 글"인지 확인합니다.
3. 새 글이면 메타디스크립션·핵심요약 불릿·본문 속 정부기관 링크 등에서 정보를 뽑아 카드(제목/요약/대상/분류/키워드/블로그링크/공식링크)를 자동으로 만들어 `data.js`의 `benefits` 배열 끝에 추가합니다. 이 사이트는 원래 블로그 글 중 일부만 골라 보여주는 큐레이션 사이트였지만, 완전 자동화를 위해 "새 글은 일단 다 카드로 추가한다"는 단순 규칙으로 바뀌었습니다 — 카테고리는 제목의 키워드로 추정하고, 대상 문구는 본문의 "대상:" 항목을 찾아서 씁니다. 사람이 다듬던 것보다 문구가 거칠 수 있습니다.

두 스크립트 모두 처리 결과를 각자의 state 파일(및 `data.js`)에 기록하고, 워크플로우가 변경된 파일을 저장소에 커밋합니다.

**사람의 확인 없이 완전 자동으로 처리됩니다.** 특정 글을 카드에서 빼거나 문구를 다듬고 싶으면, 또는 쓰레드 문구가 마음에 안 들면 언제든 Cowork 대화나 GitHub에서 직접 `data.js`/글을 수정하면 됩니다.

## 최초 설정 (한 번만)

### 1) 워크플로우 파일 추가

GitHub 연결 권한 문제로 `.github/workflows/hourly-post.yml` 파일만은 자동으로 못 올렸습니다. GitHub 웹에서 저장소 루트에 **Add file → Create new file**로 경로를 `.github/workflows/hourly-post.yml`로 입력하고, 아래 내용을 붙여넣어 커밋하세요. (이미 이 파일을 만들어두셨다면, 아래 내용으로 덮어써 주세요 — benefit 카드 연동 단계가 새로 추가되었습니다.)

```yaml
name: Hourly Threads Autopost

on:
  schedule:
    - cron: "0 * * * *"
  workflow_dispatch: {}

permissions:
  contents: write

jobs:
  autopost:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: 새 글 확인 후 쓰레드에 게시
        env:
          THREADS_ACCESS_TOKEN: ${{ secrets.THREADS_ACCESS_TOKEN }}
          THREADS_USER_ID: ${{ secrets.THREADS_USER_ID }}
        run: python automation/gov-thread-autopost/autopost.py

      - name: 새 글 확인 후 benefit 카드 연동
        run: python automation/gov-thread-autopost/benefit_autolink.py

      - name: 변경사항 커밋 (state, data.js)
        if: always()
        run: |
          git config user.name "gov-thread-autopost-bot"
          git config user.email "actions@users.noreply.github.com"
          git add automation/gov-thread-autopost/state.json automation/gov-thread-autopost/benefit_state.json data.js
          git diff --cached --quiet || git commit -m "state/카드 업데이트: 자동 게시·연동 기록"
          git push
```

### 2) 시크릿 등록

저장소의 **Settings → Secrets and variables → Actions → New repository secret**에서 아래 두 개를 등록하세요.

- `THREADS_ACCESS_TOKEN`
- `THREADS_USER_ID`

(기존에 쓰던 Threads 인증정보와 동일한 값입니다. `benefit_autolink.py`는 별도 인증정보가 필요 없습니다 — 저장소 자체에 파일을 쓰는 것뿐이라 워크플로우 기본 권한만으로 동작합니다.)

## 수동 실행 (테스트)

**Actions** 탭 → **Hourly Threads Autopost** 워크플로우 → **Run workflow** 버튼으로 언제든 즉시 한 번 실행해볼 수 있습니다. (매시간 자동 실행을 기다리지 않아도 됩니다.)

## 새 글을 다시 처리하고 싶을 때

- 쓰레드: `state.json`의 `last_processed_link` 값을 지우거나 다른 값으로 바꾸고 커밋
- benefit 카드: `benefit_state.json`의 `last_linked_link` 값을 지우거나 다른 값으로 바꾸고, `data.js`에서도 해당 글의 카드를 지운 뒤 커밋 (data.js에 이미 있으면 자동으로 건너뜁니다)

다음 실행 때 최신 글을 "새 글"로 다시 인식해서 처리합니다.
