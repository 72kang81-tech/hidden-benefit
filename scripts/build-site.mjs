import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const source = fs.readFileSync(path.join(root, "data.js"), "utf8");
const context = {};
vm.createContext(context);
vm.runInContext(`${source}\nthis.__benefits = benefits;`, context, { timeout: 1000 });
const benefits = context.__benefits;

const escapeHtml = value => String(value || "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
})[char]);

function slugFor(item) {
  const readable = item.title.normalize("NFKC").toLowerCase()
    .replace(/[^0-9a-z가-힣]+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
  return `${readable || "benefit"}-${crypto.createHash("sha1").update(item.blogUrl || item.title).digest("hex").slice(0, 7)}`;
}

function page(item, slug) {
  const canonical = `https://benefit.300md72.com/benefits/${encodeURIComponent(slug)}/`;
  const title = escapeHtml(item.title);
  const summary = escapeHtml(item.summary);
  const target = escapeHtml(item.target);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org", "@type": "WebPage", name: item.title,
    description: item.summary, url: canonical,
    isPartOf: { "@type": "WebSite", name: "숨은혜택", url: "https://benefit.300md72.com/" }
  }).replace(/</g, "\\u003c");
  return `<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} | 숨은혜택</title><meta name="description" content="${summary}"><link rel="canonical" href="${canonical}">
<meta property="og:type" content="article"><meta property="og:title" content="${title}"><meta property="og:description" content="${summary}"><meta property="og:url" content="${canonical}">
<link rel="stylesheet" href="../../style.css"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8974162710750438" crossorigin="anonymous"></script><script type="application/ld+json">${jsonLd}</script></head>
<body><header class="hero compact"><nav class="nav"><a class="brand" href="../../"><span>숨은</span>혜택</a><a class="blog-link" href="../../">다른 혜택 찾기</a></nav></header>
<main class="detail"><p class="eyebrow">${escapeHtml(item.category)}</p><h1>${title}</h1><p class="detail-summary">${summary}</p>
<section class="detail-box"><h2>누가 확인하면 좋을까요?</h2><p>${target}</p></section>
<p class="fine">지원 대상·금액·기간은 변경될 수 있으므로 신청 전 공식 안내를 확인하세요.</p>
<div class="actions"><a class="button primary" href="${escapeHtml(item.blogUrl)}">자세한 설명 보기 →</a><a class="button secondary" href="${escapeHtml(item.officialUrl)}" rel="noopener">공식 사이트 확인</a></div></main>
<script src="../../site.config.js"></script><script src="../../analytics.js"></script></body></html>`;
}

const output = path.join(root, "benefits");
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
const urls = ["https://benefit.300md72.com/"];

for (const item of benefits) {
  const slug = slugFor(item);
  const dir = path.join(output, slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), page(item, slug));
  urls.push(`https://benefit.300md72.com/benefits/${encodeURIComponent(slug)}/`);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(url => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);
console.log(`Generated ${benefits.length} benefit pages and sitemap.xml`);
