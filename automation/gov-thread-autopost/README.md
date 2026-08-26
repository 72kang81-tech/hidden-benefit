# gov-thread-autopost

`300md72.com` 블로그에 새 글이 올라오면, 매시간 자동으로 확인해서 쓰레드(Threads)에 홍보 글을 올리는 무료 자동화입니다. GitHub Actions로 동작하며, 실행 비용이 들지 않습니다(공개 저장소는 무제한, 비공개 저장소도 매달 2,000분 무료 — 이 작업은 한 달에 1시간마다 1분 미만 실행되므로 충분히 무료 범위 안입니다).

> 이 자동화는 별도 저장소가 아니라 `hidden-benefit` 저장소 안 `automation/gov-thread-autopost/` 폴더에 들어 있습니다. (GitHub 연결이 이 저장소 하나에만 권한이 있어서, 새 저장소를 만드는 대신 여기에 추가했습니다.) 이 저장소는 공개(public) 저장소라 코드와 워크플로우 내용은 누구나 볼 수 있지만, Threads 토큰 같은 비밀 값은 GitHub Actions Secrets에 암호화되어 저장되기 때문에 코드에 노출되지 않습니다.

## 동작 방식

1. 매시 정각(UTC 기준)에 `autopost.py`가 실행됩니다.
2. 블로그 RSS(`https://300md72.com/rss`)에서 최신 글 1건을 확인합니다.
3. `state.json`에 기록된 마지막 처리 글과 다르면 "새 글"로 판단합니다.
4. 새 글이면 정해진 템플릿(직전 실행과 겹치지 않게 순환) 중 하나로 쓰레드 본문 + 고정 댓글(블로그 링크 포함)을 만들어 실제로 게시합니다.
5. 처리 결과를 `state.json`에 기록하고, 워크플로우가 이 파일을 저장소에 커밋합니다.

**사람의 확인 없이 완전 자동으로 게시됩니다.** 문구는 AI가 매번 새로 짓는 게 아니라 정해진 템플릿을 순환시키는 방식이라, Cowork 대화에서 만드는 초안보다 표현이 반복될 수 있습니다.

## 최초 설정 (한 번만)

### 1) 워크플로우 파일 추가

GitHub 연결 권한 문제로 `.github/workflows/hourly-post.yml` 파일만은 자동으로 못 올렸습니다. GitHub 웹에서 저장소 루트에 **Add file → Create new file**로 경로를 `.github/workflows/hourly-post.yml`로 입력하고, 아래 내용을 붙여넣어 커밋하세요.

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

      - name: state.json 변경사항 커밋
        if: always()
        run: |
          git config user.name "gov-thread-autopost-bot"
          git config user.email "actions@users.noreply.github.com"
          git add automation/gov-thread-autopost/state.json
          git diff --cached --quiet || git commit -m "state 업데이트: 자동 게시 기록"
          git push
```

### 2) 시크릿 등록

저장소의 **Settings → Secrets and variables → Actions → New repository secret**에서 아래 두 개를 등록하세요.

- `THREADS_ACCESS_TOKEN`
- `THREADS_USER_ID`

(기존에 쓰던 Threads 인증정보와 동일한 값입니다.)

## 수동 실행 (테스트)

**Actions** 탭 → **Hourly Threads Autopost** 워크플로우 → **Run workflow** 버튼으로 언제든 즉시 한 번 실행해볼 수 있습니다. (매시간 자동 실행을 기다리지 않아도 됩니다.)

## 새 글을 다시 게시하고 싶을 때

`state.json`의 `last_processed_link` 값을 지우거나 다른 값으로 바꾸고 커밋하면, 다음 실행 때 최신 글을 "새 글"로 다시 인식해서 게시합니다.
