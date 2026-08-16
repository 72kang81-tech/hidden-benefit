const cards = document.querySelector("#cards");
const search = document.querySelector("#search");
const clear = document.querySelector("#clear");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");
const chips = [...document.querySelectorAll(".chip")];
let selected = "전체";

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function render() {
  const term = search.value.trim().toLocaleLowerCase("ko");
  const visible = benefits.filter(item => {
    const matchesCategory = selected === "전체" || item.category === selected;
    const text = `${item.title} ${item.summary} ${item.target} ${item.category} ${item.keywords}`.toLocaleLowerCase("ko");
    return matchesCategory && (!term || text.includes(term));
  });

  count.textContent = `총 ${visible.length}개의 혜택`;
  empty.hidden = visible.length !== 0;
  cards.innerHTML = visible.map(item => {
    const blogButton = item.blogUrl
      ? `<a class="button primary" href="${encodeURI(item.blogUrl)}">자세한 설명 보기 <span>→</span></a>`
      : `<span class="button disabled" aria-disabled="true">자세한 글 준비 중</span>`;
    return `<article class="card">
      <div class="card-top">
        <span class="category">${escapeHtml(item.category)}</span>
        <span class="status ${item.blogUrl ? "live" : "soon"}">${escapeHtml(item.status)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p class="summary">${escapeHtml(item.summary)}</p>
      <p class="target"><strong>누가 볼까요?</strong> ${escapeHtml(item.target)}</p>
      <div class="actions">
        ${blogButton}
        <a class="button secondary" href="${item.officialUrl}">공식 사이트 확인</a>
      </div>
    </article>`;
  }).join("");
}

chips.forEach(chip => chip.addEventListener("click", () => {
  selected = chip.dataset.filter;
  chips.forEach(item => item.classList.toggle("active", item === chip));
  render();
}));
search.addEventListener("input", render);
clear.addEventListener("click", () => { search.value = ""; search.focus(); render(); });
render();
