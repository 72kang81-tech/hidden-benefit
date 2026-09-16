import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = fs.readFileSync(path.join(root, "data.js"), "utf8");
const context = {};
vm.createContext(context);
vm.runInContext(`${source}\nthis.__benefits = benefits;`, context, { timeout: 1000 });
const benefits = context.__benefits;

const escapeXml = value => String(value || "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
})[char]);

const shorten = (value, max) => {
  const text = String(value || "").replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
};

const wrap = (value, maxChars, maxLines) => {
  const text = shorten(value, maxChars * maxLines);
  const lines = [];
  let rest = text;
  while (rest && lines.length < maxLines) {
    if (rest.length <= maxChars) { lines.push(rest); break; }
    let cut = rest.lastIndexOf(" ", maxChars);
    if (cut < Math.floor(maxChars * 0.55)) cut = maxChars;
    lines.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest && lines.length === maxLines) {
    lines[maxLines - 1] = shorten(lines[maxLines - 1], Math.max(1, maxChars - 1));
  }
  return lines;
};

const slugFor = item => {
  const readable = item.title.normalize("NFKC").toLowerCase()
    .replace(/[^0-9a-z가-힣]+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
  return `${readable || "benefit"}-${crypto.createHash("sha1").update(item.blogUrl || item.title).digest("hex").slice(0, 7)}`;
};

const palettes = {
  "주거": ["#EAF4FF", "#2563EB"],
  "금융·생활비": ["#FFF6DB", "#D97706"],
  "의료비": ["#EAFBF3", "#059669"],
  "문화·여가": ["#F4ECFF", "#7C3AED"],
  "창업·취업": ["#FFF0F3", "#E11D48"]
};

const textLines = (lines, x, y, size, gap, weight = 700, color = "#172033") =>
  lines.map((line, index) => `<text x="${x}" y="${y + index * gap}" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`).join("");

function svgFor(item) {
  const [soft, accent] = palettes[item.category] || ["#EEF3F8", "#35536F"];
  const title = wrap(item.title, 18, 3);
  const summary = wrap(item.summary, 25, 3);
  const target = wrap(item.target, 23, 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="0 0 1080 1080">
  <rect width="1080" height="1080" fill="#F7F8FC"/>
  <rect x="48" y="48" width="984" height="984" rx="46" fill="#FFFFFF"/>
  <rect x="76" y="76" width="928" height="222" rx="32" fill="${soft}"/>
  <text x="112" y="126" font-family="Noto Sans KR, sans-serif" font-size="28" font-weight="800" fill="${accent}">생활혜택 상황극 · ${escapeXml(item.category)}</text>
  <g font-family="Noto Sans KR, sans-serif">${textLines(title, 112, 184, 48, 58, 900)}</g>
  <rect x="76" y="326" width="448" height="286" rx="32" fill="#F2F5F8"/>
  <circle cx="174" cy="427" r="54" fill="#FFD7B5"/><path d="M128 416c8-69 94-79 104 0-23-20-77-20-104 0" fill="#263449"/>
  <circle cx="156" cy="432" r="5" fill="#263449"/><circle cx="193" cy="432" r="5" fill="#263449"/>
  <path d="M158 458c13 10 24 10 36 0" stroke="#263449" stroke-width="6" fill="none" stroke-linecap="round"/>
  <rect x="245" y="372" width="234" height="116" rx="25" fill="#FFFFFF"/>
  <path d="M245 450l-30 28 42-9" fill="#FFFFFF"/>
  <text x="273" y="418" font-family="Noto Sans KR, sans-serif" font-size="27" font-weight="700" fill="#283548">“이 혜택,</text>
  <text x="273" y="456" font-family="Noto Sans KR, sans-serif" font-size="27" font-weight="700" fill="#283548">나도 받을까?”</text>
  <text x="112" y="556" font-family="Noto Sans KR, sans-serif" font-size="24" font-weight="700" fill="#607086">조건부터 확인해 봐요</text>
  <rect x="556" y="326" width="448" height="286" rx="32" fill="${soft}"/>
  <circle cx="654" cy="427" r="54" fill="#FFD7B5"/><path d="M608 417c11-72 92-72 104 0-26-17-78-17-104 0" fill="${accent}"/>
  <circle cx="637" cy="432" r="5" fill="#263449"/><circle cx="674" cy="432" r="5" fill="#263449"/>
  <path d="M640 456c12 8 23 8 34 0" stroke="#263449" stroke-width="6" fill="none" stroke-linecap="round"/>
  <rect x="725" y="370" width="235" height="125" rx="25" fill="#FFFFFF"/>
  <path d="M725 450l-31 28 43-9" fill="#FFFFFF"/>
  <text x="750" y="416" font-family="Noto Sans KR, sans-serif" font-size="26" font-weight="800" fill="${accent}">“놓치기 전에</text>
  <text x="750" y="456" font-family="Noto Sans KR, sans-serif" font-size="26" font-weight="800" fill="${accent}">핵심만 보자!”</text>
  <text x="592" y="556" font-family="Noto Sans KR, sans-serif" font-size="24" font-weight="700" fill="${accent}">지원 내용 빠른 확인</text>
  <rect x="76" y="642" width="928" height="188" rx="32" fill="#172033"/>
  <text x="112" y="694" font-family="Noto Sans KR, sans-serif" font-size="25" font-weight="800" fill="#9DD6FF">한눈에 보는 핵심</text>
  <g font-family="Noto Sans KR, sans-serif">${textLines(summary, 112, 744, 30, 40, 700, "#FFFFFF")}</g>
  <rect x="76" y="856" width="928" height="128" rx="32" fill="${accent}"/>
  <text x="112" y="901" font-family="Noto Sans KR, sans-serif" font-size="24" font-weight="800" fill="#FFFFFF">누가 확인하면 좋을까요?</text>
  <g font-family="Noto Sans KR, sans-serif">${textLines(target, 112, 944, 25, 34, 600, "#FFFFFF")}</g>
  <text x="912" y="1008" text-anchor="end" font-family="Noto Sans KR, sans-serif" font-size="18" font-weight="700" fill="#8B98AA">300md72.com</text>
</svg>`;
}

const output = path.join(root, "social");
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
const index = {};

for (const item of benefits) {
  const slug = slugFor(item);
  const filename = `${slug}.png`;
  await sharp(Buffer.from(svgFor(item))).png({ quality: 92, compressionLevel: 9 }).toFile(path.join(output, filename));
  index[item.blogUrl] = `https://benefit.300md72.com/social/${encodeURIComponent(filename)}`;
}

fs.writeFileSync(path.join(output, "index.json"), JSON.stringify(index, null, 2));
console.log(`Generated ${benefits.length} social card images`);
