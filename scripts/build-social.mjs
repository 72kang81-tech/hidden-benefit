import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { spawnSync } from "node:child_process";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = fs.readFileSync(path.join(root, "data.js"), "utf8");
const context = {};
vm.createContext(context);
vm.runInContext(`${source}\nthis.__benefits = benefits;`, context, { timeout: 1000 });
const benefits = context.__benefits;

const FONT = "Noto Sans CJK KR";
const fontCheck = spawnSync("fc-match", [FONT], { encoding: "utf8" });
if (fontCheck.status !== 0 || !/NotoSansCJK|Noto Sans CJK/i.test(fontCheck.stdout || "")) {
  throw new Error("Noto Sans CJK KR font is required. Install fonts-noto-cjk before building.");
}

const escapeXml = value => String(value || "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;"
})[char]);

const clean = value => String(value || "").replace(/\s+/g, " ").trim();
const shorten = (value, max) => {
  const text = clean(value);
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
};
const wrap = (value, maxChars, maxLines) => {
  let rest = shorten(value, maxChars * maxLines);
  const lines = [];
  while (rest && lines.length < maxLines) {
    if (rest.length <= maxChars) { lines.push(rest); rest = ""; break; }
    let cut = rest.lastIndexOf(" ", maxChars);
    if (cut < Math.floor(maxChars * 0.55)) cut = maxChars;
    lines.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  if (rest && lines.length) lines[lines.length - 1] = shorten(lines[lines.length - 1], maxChars - 1);
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
const paletteFor = item => palettes[item.category] || ["#EEF3F8", "#35536F"];
const textLines = (lines, x, y, size, gap, weight = 700, color = "#172033", anchor = "start") =>
  lines.map((line, i) => `<text x="${x}" y="${y + i * gap}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`).join("");

function squareSvg(item) {
  const [soft, accent] = paletteFor(item);
  const title = wrap(item.title, 18, 3);
  const summary = wrap(item.summary, 25, 3);
  const target = wrap(item.target, 23, 2);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">
  <rect width="1080" height="1080" fill="#F7F8FC"/><rect x="48" y="48" width="984" height="984" rx="46" fill="#FFF"/>
  <rect x="76" y="76" width="928" height="222" rx="32" fill="${soft}"/>
  <text x="112" y="126" font-family="${FONT}" font-size="28" font-weight="800" fill="${accent}">생활혜택 상황극 · ${escapeXml(item.category)}</text>
  ${textLines(title,112,184,48,58,900)}
  <rect x="76" y="326" width="448" height="286" rx="32" fill="#F2F5F8"/>
  <circle cx="174" cy="427" r="54" fill="#FFD7B5"/><path d="M128 416c8-69 94-79 104 0-23-20-77-20-104 0" fill="#263449"/>
  <circle cx="156" cy="432" r="5" fill="#263449"/><circle cx="193" cy="432" r="5" fill="#263449"/>
  <rect x="245" y="372" width="234" height="116" rx="25" fill="#FFF"/><path d="M245 450l-30 28 42-9" fill="#FFF"/>
  ${textLines(["“이 혜택,","나도 받을까?”"],273,418,27,38,700)}
  <text x="112" y="556" font-family="${FONT}" font-size="24" font-weight="700" fill="#607086">조건부터 확인해 봐요</text>
  <rect x="556" y="326" width="448" height="286" rx="32" fill="${soft}"/>
  <circle cx="654" cy="427" r="54" fill="#FFD7B5"/><path d="M608 417c11-72 92-72 104 0-26-17-78-17-104 0" fill="${accent}"/>
  <rect x="725" y="370" width="235" height="125" rx="25" fill="#FFF"/><path d="M725 450l-31 28 43-9" fill="#FFF"/>
  ${textLines(["“놓치기 전에","핵심만 보자!”"],750,416,26,40,800,accent)}
  <text x="592" y="556" font-family="${FONT}" font-size="24" font-weight="700" fill="${accent}">지원 내용 빠른 확인</text>
  <rect x="76" y="642" width="928" height="188" rx="32" fill="#172033"/>
  <text x="112" y="694" font-family="${FONT}" font-size="25" font-weight="800" fill="#9DD6FF">한눈에 보는 핵심</text>
  ${textLines(summary,112,744,30,40,700,"#FFF")}
  <rect x="76" y="856" width="928" height="128" rx="32" fill="${accent}"/>
  <text x="112" y="901" font-family="${FONT}" font-size="24" font-weight="800" fill="#FFF">누가 확인하면 좋을까요?</text>
  ${textLines(target,112,944,25,34,600,"#FFF")}
  <text x="912" y="1008" text-anchor="end" font-family="${FONT}" font-size="18" font-weight="700" fill="#8B98AA">300md72.com</text>
</svg>`;
}

const shell = (item, number, kicker, body, accentBox = false) => {
  const [soft, accent] = paletteFor(item);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">
  <rect width="1080" height="1350" fill="#F5F7FB"/>
  <rect x="54" y="54" width="972" height="1242" rx="48" fill="#FFF"/>
  <rect x="82" y="82" width="916" height="112" rx="28" fill="${soft}"/>
  <text x="122" y="148" font-family="${FONT}" font-size="30" font-weight="800" fill="${accent}">생활혜택 상황극 · ${escapeXml(kicker)}</text>
  ${body}
  <rect x="82" y="1192" width="916" height="76" rx="24" fill="${accentBox ? accent : soft}"/>
  <text x="122" y="1240" font-family="${FONT}" font-size="23" font-weight="700" fill="${accentBox ? "#FFF" : accent}">신청 전 공식 조건을 꼭 확인하세요</text>
  <text x="954" y="1240" text-anchor="end" font-family="${FONT}" font-size="22" font-weight="800" fill="${accentBox ? "#FFF" : accent}">${number}/6</text>
</svg>`;
};

function carouselSvgs(item) {
  const [soft, accent] = paletteFor(item);
  const title = wrap(item.title, 16, 4);
  const summary = wrap(item.summary, 24, 5);
  const target = wrap(item.target, 24, 5);
  const situation = wrap(`${item.category} 혜택을 찾다가 ‘나도 해당될까?’ 고민하는 순간`, 22, 3);
  return [
    shell(item,1,item.category,`
      <text x="122" y="282" font-family="${FONT}" font-size="30" font-weight="800" fill="${accent}">오늘 확인할 생활혜택</text>
      ${textLines(title,122,372,62,78,900)}
      <rect x="122" y="760" width="836" height="300" rx="40" fill="${soft}"/>
      <circle cx="310" cy="900" r="92" fill="#FFD7B5"/><path d="M230 875c15-115 145-122 160 0-39-29-119-29-160 0" fill="#263449"/>
      <rect x="450" y="822" width="430" height="150" rx="34" fill="#FFF"/>
      ${textLines(["“이거, 나도","확인해 볼까?”"],500,880,37,50,800)}
    `,true),
    shell(item,2,"상황",`
      <text x="122" y="292" font-family="${FONT}" font-size="34" font-weight="900" fill="#172033">이런 순간, 한 번쯤 있죠</text>
      <rect x="122" y="356" width="836" height="430" rx="40" fill="${soft}"/>
      <circle cx="310" cy="558" r="96" fill="#FFD7B5"/><path d="M225 530c20-120 150-120 170 0-48-30-125-30-170 0" fill="#263449"/>
      <rect x="455" y="438" width="430" height="210" rx="36" fill="#FFF"/>
      ${textLines(situation,500,500,34,48,750)}
      <text x="122" y="890" font-family="${FONT}" font-size="31" font-weight="800" fill="${accent}">정보를 모르고 지나치면 신청 기회를 놓칠 수 있어요.</text>
    `),
    shell(item,3,"핵심 혜택",`
      <text x="122" y="300" font-family="${FONT}" font-size="36" font-weight="900" fill="#172033">무엇을 확인할 수 있나요?</text>
      <rect x="122" y="370" width="836" height="520" rx="40" fill="#172033"/>
      <text x="170" y="442" font-family="${FONT}" font-size="28" font-weight="800" fill="#9DD6FF">핵심 내용</text>
      ${textLines(summary,170,520,39,58,750,"#FFF")}
      <text x="122" y="1000" font-family="${FONT}" font-size="28" font-weight="700" fill="#5F6F82">금액과 지원 내용은 개인 조건 및 공고 시점에 따라 달라질 수 있습니다.</text>
    `),
    shell(item,4,"대상 확인",`
      <text x="122" y="300" font-family="${FONT}" font-size="36" font-weight="900" fill="#172033">나는 대상에 가까울까요?</text>
      <rect x="122" y="370" width="836" height="520" rx="40" fill="${soft}"/>
      <circle cx="190" cy="464" r="30" fill="${accent}"/><text x="190" y="476" text-anchor="middle" font-family="${FONT}" font-size="28" font-weight="900" fill="#FFF">✓</text>
      ${textLines(target,252,458,38,58,750)}
      <text x="122" y="996" font-family="${FONT}" font-size="29" font-weight="750" fill="${accent}">소득·가구·연령·거주지 조건을 함께 확인하세요.</text>
    `),
    shell(item,5,"놓치기 쉬운 조건",`
      <text x="122" y="300" font-family="${FONT}" font-size="36" font-weight="900" fill="#172033">금액만 보면 안 되는 이유</text>
      <rect x="122" y="374" width="836" height="154" rx="34" fill="${soft}"/><text x="170" y="466" font-family="${FONT}" font-size="36" font-weight="800" fill="${accent}">01  신청 기간</text>
      <rect x="122" y="554" width="836" height="154" rx="34" fill="#F2F5F8"/><text x="170" y="646" font-family="${FONT}" font-size="36" font-weight="800" fill="#34445A">02  제외·중복 조건</text>
      <rect x="122" y="734" width="836" height="154" rx="34" fill="${soft}"/><text x="170" y="826" font-family="${FONT}" font-size="36" font-weight="800" fill="${accent}">03  제출 서류</text>
      <text x="122" y="1000" font-family="${FONT}" font-size="29" font-weight="700" fill="#5F6F82">공식 공고에서 최신 기준을 다시 확인해야 합니다.</text>
    `),
    shell(item,6,"확인 방법",`
      <text x="122" y="300" font-family="${FONT}" font-size="36" font-weight="900" fill="#172033">이제 이렇게 확인하세요</text>
      <rect x="122" y="382" width="836" height="410" rx="40" fill="${accent}"/>
      ${textLines(["1. 대상 조건 확인","2. 신청 기간 확인","3. 공식 사이트에서 신청"],180,492,43,94,850,"#FFF")}
      <text x="122" y="916" font-family="${FONT}" font-size="30" font-weight="800" fill="#172033">자세한 설명은 300md72.com</text>
      <text x="122" y="976" font-family="${FONT}" font-size="27" font-weight="700" fill="#5F6F82">저장해 두고 신청 전에 다시 확인해 보세요.</text>
    `,true)
  ];
}

const output = path.join(root, "social");
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
const index = {};
const carouselIndex = {};

for (const item of benefits) {
  const slug = slugFor(item);
  const squareName = `${slug}.png`;
  await sharp(Buffer.from(squareSvg(item))).png({ compressionLevel: 9 }).toFile(path.join(output, squareName));
  index[item.blogUrl] = `https://benefit.300md72.com/social/${encodeURIComponent(squareName)}`;

  const dir = path.join(output, "carousel", slug);
  fs.mkdirSync(dir, { recursive: true });
  const slides = [];
  const svgs = carouselSvgs(item);
  for (let i = 0; i < svgs.length; i++) {
    const name = `${String(i + 1).padStart(2, "0")}.png`;
    await sharp(Buffer.from(svgs[i])).png({ compressionLevel: 9 }).toFile(path.join(dir, name));
    slides.push(`https://benefit.300md72.com/social/carousel/${encodeURIComponent(slug)}/${name}`);
  }
  carouselIndex[item.blogUrl] = { cover: slides[0], slides };
}

fs.writeFileSync(path.join(output, "index.json"), JSON.stringify(index, null, 2));
fs.writeFileSync(path.join(output, "carousel-index.json"), JSON.stringify(carouselIndex, null, 2));
console.log(`Generated ${benefits.length} square cards and ${benefits.length * 6} carousel slides`);
