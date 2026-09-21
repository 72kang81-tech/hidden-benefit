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
const shorten = (value, max) => clean(value).length > max ? `${clean(value).slice(0, max - 1)}…` : clean(value);
const wrap = (value, maxChars, maxLines) => {
  let rest = shorten(value, maxChars * maxLines);
  const lines = [];
  while (rest && lines.length < maxLines) {
    if (rest.length <= maxChars) { lines.push(rest); break; }
    let cut = rest.lastIndexOf(" ", maxChars);
    if (cut < Math.floor(maxChars * .55)) cut = maxChars;
    lines.push(rest.slice(0, cut).trim());
    rest = rest.slice(cut).trim();
  }
  return lines;
};
const slugFor = item => {
  const readable = item.title.normalize("NFKC").toLowerCase().replace(/[^0-9a-z가-힣]+/g, "-").replace(/^-|-$/g, "").slice(0, 72);
  return `${readable || "benefit"}-${crypto.createHash("sha1").update(item.blogUrl || item.title).digest("hex").slice(0, 7)}`;
};
const palettes = {
  "주거": ["#DCE9F3", "#315F78"], "금융·생활비": ["#F9E8B8", "#C86B20"],
  "의료비": ["#DCEADF", "#3F765B"], "문화·여가": ["#E6DDF0", "#74538E"],
  "창업·취업": ["#E1E9F4", "#315C8B"]
};
const paletteFor = item => palettes[item.category] || ["#E8E1D5", "#6D6255"];
const textLines = (lines, x, y, size, gap, weight = 700, color = "#24211E", anchor = "start") =>
  lines.map((line, i) => `<text x="${x}" y="${y + i * gap}" text-anchor="${anchor}" font-family="${FONT}" font-size="${size}" font-weight="${weight}" fill="${color}">${escapeXml(line)}</text>`).join("");

const defs = (soft, accent) => `<defs>
  <pattern id="grid" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M34 0H0V34" fill="none" stroke="#CFC6B6" stroke-width="1" opacity=".34"/></pattern>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#40372C" flood-opacity=".14"/></filter>
  <linearGradient id="tape" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#F2C94C" stop-opacity=".55"/><stop offset=".5" stop-color="#FFE486" stop-opacity=".82"/><stop offset="1" stop-color="#F2C94C" stop-opacity=".55"/></linearGradient>
</defs>
<rect width="1080" height="1350" fill="#F5EEDF"/><rect width="1080" height="1350" fill="url(#grid)" opacity=".48"/>
<path d="M0 86Q100 64 190 88T380 82T570 90T760 80T940 91T1080 78V0H0Z" fill="${soft}" opacity=".72"/>`;
const paper = (x,y,w,h,rotate=0) => `<g transform="rotate(${rotate} ${x+w/2} ${y+h/2})" filter="url(#shadow)"><path d="M${x} ${y+12}L${x+30} ${y+2}L${x+68} ${y+10}L${x+108} ${y+1}L${x+w-70} ${y+9}L${x+w-32} ${y+2}L${x+w} ${y+13}L${x+w-7} ${y+h-20}L${x+w} ${y+h}L${x+w-45} ${y+h-8}L${x+92} ${y+h}L${x+43} ${y+h-9}L${x} ${y+h}L${x+7} ${y+42}Z" fill="#FFFDF7"/></g>`;
const tape = (x,y,w,r=-4) => `<rect x="${x}" y="${y}" width="${w}" height="46" rx="4" fill="url(#tape)" transform="rotate(${r} ${x+w/2} ${y+23})"/>`;
const doodles = accent => `<path d="M857 251c35-27 72-11 56 21-12 24-49 29-75 17" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/><path d="M848 281l-19-2 10 18" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><path d="M126 1101q30-36 61 0q30-36 61 0" fill="none" stroke="${accent}" stroke-width="7" stroke-linecap="round" opacity=".65"/>`;
const shell = (item,n,kicker,body,strong=false) => {
  const [soft,accent]=paletteFor(item);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350">${defs(soft,accent)}
  <text x="84" y="122" font-family="${FONT}" font-size="25" font-weight="800" fill="${accent}">300MD72 · 생활혜택 스크랩북</text>
  <text x="996" y="122" text-anchor="end" font-family="${FONT}" font-size="23" font-weight="800" fill="#71695F">${n}/6</text>
  <path d="M84 146H996" stroke="${accent}" stroke-width="5" stroke-linecap="round" opacity=".58"/>
  <text x="84" y="194" font-family="${FONT}" font-size="26" font-weight="800" fill="#71695F">${escapeXml(kicker)}</text>${body}${doodles(accent)}
  <rect x="70" y="1204" width="940" height="88" rx="18" fill="${strong?accent:"#FFFCF5"}" stroke="${accent}" stroke-width="3"/>
  <text x="104" y="1260" font-family="${FONT}" font-size="24" font-weight="800" fill="${strong?"#FFF":accent}">세부 조건은 공식 공고에서 최종 확인하세요</text>
  <text x="972" y="1260" text-anchor="end" font-family="${FONT}" font-size="19" font-weight="700" fill="${strong?"#FFF":"#786F65"}">300md72.com</text></svg>`;
};

function carouselSvgs(item) {
  const [soft,accent]=paletteFor(item);
  const title=wrap(item.title,15,4), summary=wrap(item.summary,23,5), target=wrap(item.target,23,5);
  const situation=wrap(`${item.category} 정보를 보다가 “나도 해당될까?” 멈춰 보게 되는 순간`,21,3);
  return [
    shell(item,1,item.category,`${paper(70,236,940,868,-1)}${tape(118,216,224,-5)}
      <text x="118" y="310" font-family="${FONT}" font-size="27" font-weight="850" fill="${accent}">오늘 확인할 생활정보</text>
      ${textLines(title,118,404,60,76,900)}
      <g transform="rotate(2 710 870)"><rect x="520" y="720" width="388" height="330" rx="8" fill="#FFF" filter="url(#shadow)"/><rect x="548" y="748" width="332" height="218" rx="5" fill="${soft}"/><circle cx="660" cy="842" r="68" fill="#FFD7B5"/><path d="M599 826c12-84 111-89 123 0-31-23-92-23-123 0" fill="#263449"/><path d="M733 840q42-42 86 0v85h-86Z" fill="${accent}"/><text x="714" y="1014" text-anchor="middle" font-family="${FONT}" font-size="19" font-weight="700" fill="#71685E">생활 속 한 장면</text></g>
      <path d="M126 928q94 40 190-5" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/><text x="118" y="1048" font-family="${FONT}" font-size="37" font-weight="900">“잠깐, 나도 확인해야겠는데?”</text><text x="118" y="1105" font-family="${FONT}" font-size="25" font-weight="700" fill="#71685E">핵심 조건만 차근차근 넘겨보세요.</text>`,true),
    shell(item,2,"상황",`${paper(80,246,920,520,1)}${tape(732,226,190,4)}<text x="126" y="330" font-family="${FONT}" font-size="35" font-weight="900">이런 고민, 한 번쯤 있죠</text>${textLines(situation,126,424,40,58,780)}<path d="M126 610q190 38 390 0" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity=".7"/><g transform="rotate(-3 310 920)"><rect x="118" y="800" width="388" height="280" rx="8" fill="#FFF" filter="url(#shadow)"/><rect x="144" y="826" width="336" height="186" fill="${soft}"/><circle cx="258" cy="910" r="62" fill="#FFD7B5"/><path d="M203 893c9-76 100-82 111 0-29-20-82-20-111 0" fill="#263449"/><rect x="330" y="862" width="116" height="90" rx="20" fill="#FFF"/>${textLines(["나도","될까?"],388,900,19,28,800,"#22201D","middle")}</g><text x="560" y="854" font-family="${FONT}" font-size="30" font-weight="900" fill="${accent}">모르고 지나치기 전에</text>${textLines(["대상과 기간부터","확인해 보는 게 좋아요."],560,920,33,50,760)}`),
    shell(item,3,"핵심 내용",`${paper(74,236,932,780,-1)}${tape(118,214,208,-4)}<text x="122" y="322" font-family="${FONT}" font-size="37" font-weight="900">무엇이 달라지고, 무엇을 받을까요?</text><circle cx="128" cy="392" r="12" fill="${accent}"/>${textLines(summary,160,408,39,59,760)}<rect x="118" y="854" width="820" height="110" rx="18" fill="${soft}"/>${textLines(["금액과 내용은 개인 조건·공고 시점에 따라","달라질 수 있어요."],158,904,25,36,850,accent)}`),
    shell(item,4,"대상 확인",`${paper(80,238,920,780,1)}${tape(748,216,178,5)}<text x="126" y="324" font-family="${FONT}" font-size="38" font-weight="900">나는 대상에 가까울까요?</text><rect x="126" y="384" width="74" height="74" rx="18" fill="${accent}"/><path d="M149 422l15 15 28-34" fill="none" stroke="#FFF" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>${textLines(target,232,410,38,59,760)}<path d="M126 820H920" stroke="${accent}" stroke-width="3" stroke-dasharray="13 13" opacity=".55"/>${textLines(["연령 · 소득 · 가구 · 거주지","분야별 예외도 함께 확인하세요."],126,890,29,48,800,accent)}`),
    shell(item,5,"실수 방지",`${paper(74,234,934,820,-1)}${tape(114,212,230,-5)}<text x="122" y="326" font-family="${FONT}" font-size="38" font-weight="900">금액만 보고 넘기면 안 되는 이유</text>${[["01","신청 기간과 마감 시간"],["02","제외·중복 가능 여부"],["03","제출 서류와 최종 제출"]].map((r,i)=>`<g transform="translate(0 ${i*190})"><circle cx="170" cy="472" r="46" fill="${i%2?soft:accent}"/><text x="170" y="484" text-anchor="middle" font-family="${FONT}" font-size="25" font-weight="900" fill="${i%2?accent:"#FFF"}">${r[0]}</text><text x="250" y="484" font-family="${FONT}" font-size="35" font-weight="820">${r[1]}</text><path d="M250 510H884" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity=".32"/></g>`).join("")}<text x="122" y="1060" font-family="${FONT}" font-size="27" font-weight="800" fill="${accent}">마감 직전보다 여유 있게 공식 공고를 확인하세요.</text>`),
    shell(item,6,"저장용 요약",`${paper(78,234,924,830,1)}${tape(742,214,190,4)}<text x="126" y="326" font-family="${FONT}" font-size="39" font-weight="900">신청 전, 이것만 다시 확인!</text>${["대상 조건 확인","신청 기간·마감 확인","공식 사이트에서 최종 확인"].map((line,i)=>`<g transform="translate(0 ${i*176})"><rect x="126" y="396" width="72" height="72" rx="16" fill="${i===2?accent:soft}" stroke="${accent}" stroke-width="3"/><path d="M146 432l14 14 25-30" fill="none" stroke="${i===2?"#FFF":accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/><text x="232" y="446" font-family="${FONT}" font-size="36" font-weight="820">${line}</text></g>`).join("")}<rect x="126" y="940" width="806" height="84" rx="16" fill="${soft}"/><text x="529" y="994" text-anchor="middle" font-family="${FONT}" font-size="27" font-weight="850" fill="${accent}">저장해 두고 신청 전에 다시 확인해 보세요.</text>`,true)
  ];
}

function squareSvg(item) {
  const [soft,accent]=paletteFor(item), title=wrap(item.title,17,4), summary=wrap(item.summary,25,3);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080">${defs(soft,accent)}${paper(62,176,956,780,-1)}${tape(118,154,220,-5)}<text x="112" y="116" font-family="${FONT}" font-size="25" font-weight="800" fill="${accent}">300MD72 · ${escapeXml(item.category)}</text>${textLines(title,112,300,58,73,900)}<path d="M112 620q160 34 330 0" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>${textLines(summary,112,708,31,44,720)}<text x="112" y="916" font-family="${FONT}" font-size="23" font-weight="800" fill="${accent}">공식 조건을 꼭 확인하세요</text></svg>`;
}

const output=path.join(root,"social");
fs.rmSync(output,{recursive:true,force:true}); fs.mkdirSync(output,{recursive:true});
const index={}, carouselIndex={};
for (const item of benefits) {
  const slug=slugFor(item), squareName=`${slug}.png`;
  await sharp(Buffer.from(squareSvg(item))).png({compressionLevel:9}).toFile(path.join(output,squareName));
  index[item.blogUrl]=`https://benefit.300md72.com/social/${encodeURIComponent(squareName)}`;
  const dir=path.join(output,"carousel",slug); fs.mkdirSync(dir,{recursive:true});
  const slides=[], svgs=carouselSvgs(item);
  for(let i=0;i<svgs.length;i++){const name=`${String(i+1).padStart(2,"0")}.png`;await sharp(Buffer.from(svgs[i])).png({compressionLevel:9}).toFile(path.join(dir,name));slides.push(`https://benefit.300md72.com/social/carousel/${encodeURIComponent(slug)}/${name}`);}
  carouselIndex[item.blogUrl]={cover:slides[0],slides};
}
fs.writeFileSync(path.join(output,"index.json"),JSON.stringify(index,null,2));
fs.writeFileSync(path.join(output,"carousel-index.json"),JSON.stringify(carouselIndex,null,2));
console.log(`Generated ${benefits.length} square cards and ${benefits.length*6} carousel slides`);
