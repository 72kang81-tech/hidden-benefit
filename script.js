const cards = document.querySelector("#cards");
const search = document.querySelector("#search");
const clear = document.querySelector("#clear");
const count = document.querySelector("#count");
const empty = document.querySelector("#empty");
const promo = document.querySelector("#promo");
const chips = [...document.querySelectorAll(".chip")];
const quickOptions = [...document.querySelectorAll("[data-term]")];
let selected = "전체";

function track(eventName, params = {}) {
  if (typeof window.gtag === "function") window.gtag("event", eventName, params);
}

function benefitId(item) {
  return encodeURIComponent(item.title.replace(/\s+/g, "-").slice(0, 80));
}

function escapeHtml(value) {
  return value.replace(/[&<>'"]/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function renderPromo() {
  const item = typeof promos !== "undefined" ? promos[selected] : null;
  if (!item) { promo.hidden = true; promo.innerHTML = ""; return; }
  promo.hidden = false;
  const link = item.url
    ? `<a class="button primary" href="${encodeURI(item.url)}">확인하러 가기 <span>→</span></a>`
    : `<span class="button disabled" aria-disabled="true">준비 중</span>`;
  promo.innerHTML = `<div class="promo-card">
    <span class="promo-label">${escapeHtml(item.label)}</span>
    <h3>${escapeHtml(item.title)}</h3>
    <p>${escapeHtml(item.desc)}</p>
    ${link}
  </div>`;
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
      ? `<a class="button primary track-link" data-kind="blog" data-title="${escapeHtml(item.title)}" href="${encodeURI(item.blogUrl)}">자세한 설명 보기 <span>→</span></a>`
      : `<span class="button disabled" aria-disabled="true">자세한 글 준비 중</span>`;
    return `<article class="card" id="benefit-${benefitId(item)}">
      <div class="card-top">
        <span class="category">${escapeHtml(item.category)}</span>
        <span class="status ${item.blogUrl ? "live" : "soon"}">${escapeHtml(item.status)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p class="summary">${escapeHtml(item.summary)}</p>
      <p class="target"><strong>누가 볼까요?</strong> ${escapeHtml(item.target)}</p>
      <div class="actions">
        ${blogButton}
        <a class="button secondary track-link" data-kind="official" data-title="${escapeHtml(item.title)}" href="${item.officialUrl}" rel="noopener">공식 사이트 확인</a>
        <button class="share-button" type="button" data-share="${benefitId(item)}" data-title="${escapeHtml(item.title)}">공유</button>
      </div>
    </article>`;
  }).join("");

  renderPromo();

  document.querySelectorAll(".track-link").forEach(link => link.addEventListener("click", () => {
    track("benefit_outbound_click", { destination: link.dataset.kind, benefit_title: link.dataset.title });
  }));
  document.querySelectorAll("[data-share]").forEach(button => button.addEventListener("click", async () => {
    const url = `${location.origin}${location.pathname}#benefit-${button.dataset.share}`;
    try {
      if (navigator.share) await navigator.share({ title: button.dataset.title, url });
      else { await navigator.clipboard.writeText(url); button.textContent = "링크 복사됨"; }
      track("benefit_share", { benefit_title: button.dataset.title });
    } catch (_) {}
  }));
}

chips.forEach(chip => chip.addEventListener("click", () => {
  selected = chip.dataset.filter;
  chips.forEach(item => item.classList.toggle("active", item === chip));
  render();
}));
search.addEventListener("input", render);
clear.addEventListener("click", () => { search.value = ""; search.focus(); render(); });
quickOptions.forEach(button => button.addEventListener("click", () => {
  selected = "전체";
  chips.forEach(item => item.classList.toggle("active", item.dataset.filter === "전체"));
  search.value = button.dataset.term;
  render();
  document.querySelector("#finder-title").scrollIntoView({ behavior: "smooth" });
  track("quick_finder_select", { term: button.dataset.term });
}));
render();

if (location.hash.startsWith("#benefit-")) {
  requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth", block: "center" }));
}
