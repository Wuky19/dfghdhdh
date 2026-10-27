/* ===== 전환 효과 유틸 (움직임 줄이기 설정이면 모두 생략) ===== */
const REDUCE = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const EASE = "cubic-bezier(.2,.7,.2,1)";
function swapIn(el, dx = 0, dy = 0, delay = 0, dur = 480) {
  if (REDUCE || !el || !el.animate) return;
  el.animate([{opacity: 0, transform: `translate(${dx}px,${dy}px)`}, {opacity: 1, transform: "none"}], {duration: dur, delay, easing: EASE, fill: "backwards"});
}
if (!REDUCE) document.documentElement.classList.add("js-motion");

/* ===== 데이터: 공식 사이트(haatz.com) 메인 페이지 기준. 교체 시 이 객체만 수정 ===== */
const B = "https://www.haatz.com/kor/";
const I = "assets/images/";
const MENU = [
  ["하츠이야기", B+"about/about.html"],
  ["제품소개", B+"product/kitchen_list.html"],
  ["고객지원", B+"support/faq.html"],
  ["홍보센터", B+"pr-center/news__list.html"]
];
const CAT = [
  ["빌트인 주방가전","Built-in Kitchen Appliances","세련된 디자인과 정교한 기술력으로 주방의 새로운 기준을 제시합니다.",I+"cat-kitchen.webp",B+"product/kitchen_list.html"],
  ["환기·공기질 솔루션","Ventilation & Air Quality Solutions","효율적인 환기와 정교한 공기 제어로, 조용하고 깨끗한 생활환경을 실현합니다.",I+"cat-air.webp",B+"product/airappliances_list.html"],
  ["욕실 솔루션","Bathroom Solutions","감각적인 디자인과 섬세한 기능이 어우러져, 욕실을 나만의 안식처로 바꿉니다.",I+"cat-bath.webp",B+"product/haatzbath_list.html"],
  ["생활 소형가전","Home & Lifestyle Appliances","일상에 영감을 더하는 디자인과 실용성으로, 더 편리하고 여유로운 라이프를 제안합니다.",I+"cat-life.webp",B+"product/expendables_list.html"]
];
const SVC = [
  ["A/S 신청 및 확인","간편하게 접수하고, 진행상황까지 한눈에 확인하세요.",I+"svc-as.webp",B+"support/service__1.html"],
  ["전국 대리점 찾기","가까운 대리점을 쉽고 빠르게 확인하세요.",I+"svc-store.webp",B+"support/buy.html"],
  ["자주 묻는 질문","고객님들이 가장 많이 찾는 답변을 한곳에 모았습니다.",I+"svc-faq.webp",B+"support/faq.html"],
  ["사용 설명서","제품 사용을 쉽고 정확하게 안내해드립니다.",I+"svc-manual.webp",B+"support/manuals.html"]
];
const P = (n,u) => B+"product/"+n+"_list.html?bmain=view&uid="+u;
const BEST = [
  ["마이티","공기환경을 쾌적하게 가꾸는 하츠의 환기·공기질 솔루션",I+"p-mighty.png",P("airappliances",202)],
  ["폰테 사각싱크볼(엠보리폼980)","사각 형태로 주방 공간을 깔끔하게 완성하는 싱크볼",I+"p-sink.png",P("kitchen",119)],
  ["노바 후드","아일랜드 키친을 완성하는 역T아일랜드 후드",I+"p-nova.png",P("kitchen",285)],
  ["하츠 비데","욕실을 더 청결하고 편안하게 만드는 하츠 비데",I+"p-bidet.png",P("haatzbath",176)],
  ["모아후드","플루티드 유리를 사용한 후드 제품으로 공간의 품격을 완성시킵니다.",I+"p-moa.png",P("kitchen",284)],
  ["하츠 비데 라이트","하츠 비데를 간결하게 담아낸 라이트 모델",I+"p-bidet-lite.png",P("haatzbath",313)],
  ["휠라이트 인덕션","주방에 깔끔하게 어우러지는 빌트인 인덕션",I+"p-wheelite.jpg",P("kitchen",94)],
  ["클레르 인덕션","공간에 맞춰 설치하는 하츠의 빌트인 인덕션",I+"p-clair.jpg",P("kitchen",93)]
];
const STORY = [
  ["하츠소개","About 하츠",B+"about/about.html"],
  ["연혁","하츠가 걸어온 길",B+"about/history.html"],
  ["사업소개","하츠의 사업 영역",B+"about/overview.html"]
];
const NEWS = [
  ["'주방 리모델링 편의성 높인다' 하츠,'수전 일체형 올인원 사각볼' 출시",I+"n1.png"],
  ["하츠, 라이프스타일 플랫폼까지 유통망 확대… B2C 사업 경쟁력 강화",I+"n2.png"],
  ["하츠, 프리미엄 욕실 브랜드 하츠바스 경쟁력 강화… 대표 제품 '루체오슬림' 주목",I+"n3.png"],
  ["휠 조작으로 완성하는 새로운 주방 경험, 하츠, 마그네틱 휠 적용한 '휠라이트 인덕션' 출시",I+"n4.png"],
  ["“오세아니아 시장 공략 본격화” 하츠, ‘호주 국제 주방·욕실 박람회 2026’ 참가",I+"n5.png"],
  ["“제품 넘어 공간 케어 영역 확장” 하츠, ‘홈케어서비스’ 런칭",I+"n6.png"]
];
const SNS = [
  ["온라인 하츠레터 43편","블로그",I+"s-l43.png","https://blog.naver.com/haatz_official/224309633090"],
  ["[하츠한스푼] ep4. 마라 고수가 말아주는 인생 마라샹궈","유튜브",I+"s-ep4.png","https://youtu.be/FZMMQ3x8ILQ"],
  ["온라인 하츠레터 42편","블로그",I+"s-l42.png","https://blog.naver.com/haatz_official/224302861152"],
  ["[하츠한스푼] ep3. 중식 여왕 마음을 탕탕 저격한 블랙 주방 (feat. 탕수육)","유튜브",I+"s-ep3.png","https://youtu.be/FPF51B1D8_4"],
  ["온라인 하츠레터 41편","블로그",I+"s-l41.png","https://blog.naver.com/haatz_official/224296117555"],
  ["[하츠한스푼] ep2. 딤섬의 여왕도 반해버린 디테일..눈꽃까지 완벽 재현한 궈티에","유튜브",I+"s-ep2.png","https://youtu.be/jzwPLvDLKk8"],
  ["온라인 하츠레터 40편","블로그",I+"s-l40.png","https://blog.naver.com/haatz_official/224289852201"],
  ["온라인 하츠레터 39편","블로그",I+"s-l39.png","https://blog.naver.com/haatz_official/224282555012"]
];
const CHAN = [["인스타그램","https://www.instagram.com/haatz_korea/"],["블로그","https://blog.naver.com/haatz_official"],["유튜브","https://www.youtube.com/@_haatz"]];
/* 맞춤 제품 찾기: 데모 로직 (공식 추천 데이터 아님) */
const FINDER = {
  concern: ["냄새·연기","습기·냄새","환기 부족","공기질"],
  space: ["주방","거실","욕실","다용도실"],
  env: ["벽 배기 가능","덕트 연결 불가","창문 환기 가능","공간이 좁음"]
};
/* 고민별 추천 제품(BEST 인덱스). 데모 매핑이며 공식 추천 기준이 아님 */
const RESULT_IDX = {"냄새·연기":4, "습기·냄새":0, "환기 부족":0, "공기질":0};

/* ===== 렌더링 ===== */
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ext = 'target="_blank" rel="noopener"';
const img = (s,a,c="") => `<img class="${c}" src="${s}" alt="${esc(a)}" loading="lazy" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'ph',textContent:'이미지를 불러올 수 없습니다'}))">`;
const R = {
  cat: CAT.map(([t,e,d,s,u]) => `<li><article class="card">${img(s,t,"thumb")}<div class="card-b"><span class="tag">${esc(e)}</span><h3>${esc(t)}</h3><p>${esc(d)}</p><a class="btn" href="${u}" ${ext}>${esc(t)} 보기 (외부)</a></div></article></li>`),
  svc: SVC.map(([t,d,s,u]) => `<li><a class="svc" href="${u}" ${ext}><span class="svc-img">${img(s,"","ico")}</span><span class="svc-b"><strong>${esc(t)}</strong><span>${esc(d)}</span></span></a></li>`),
  best: BEST.map(([t,d,s,u]) => `<li><article class="card prod">${img(s,t,"prod-img")}<div class="card-b"><h3>${esc(t)}</h3>${d?`<p>${esc(d)}</p>`:""}<a class="btn" href="${u}" ${ext}>제품 보기 (외부)</a></div></article></li>`),
  story: STORY.map(([t,d,u]) => `<li><a href="${u}" ${ext}>${esc(t)} <span class="sr">(외부 링크)</span><span aria-hidden="true">&rarr;</span></a></li>`),
  news: NEWS.map(([t,s]) => `<li><article class="card newscard"><div class="nthumb">${img(s,t,"thumb news")}</div><div class="card-b"><h3 class="sm">${esc(t)}</h3></div></article></li>`),
  sns: SNS.map(([t,k,s,u]) => `<li><article class="card newscard snscard"><div class="nthumb">${img(s,t,"thumb snsimg")}</div><div class="card-b"><span class="tag">${esc(k)}</span><h3 class="sm">${esc(t)}</h3><a class="btn" href="${u}" ${ext}>${esc(k)}에서 보기 (외부)</a></div></article></li>`),
};
document.querySelectorAll("[data-cards]").forEach(ul => ul.innerHTML = R[ul.dataset.cards].join(""));
document.getElementById("gnb-list").innerHTML = MENU.map(([t,u]) => `<li><a href="${u}" ${ext}>${t}</a></li>`).join("") + `<li><a href="#finder">맞춤 제품 찾기</a></li>`;
document.querySelectorAll("[data-chan]").forEach(b => b.innerHTML = CHAN.map(([t,u]) => `<a href="${u}" ${ext}>${t} (외부)</a>`).join(""));

/* ===== 헤더 자세히 보기(메가 메뉴): 제품소개에 마우스를 올리거나 포커스하면 펼쳐짐 ===== */
const SUB = {
  "하츠이야기": {
    desc: "30년 넘게 이어온 하츠의 이야기와 사업, 경영 정보를 소개합니다.",
    links: [["About 하츠","about/about.html"],["연혁","about/history.html"],["CI","about/ci.html"],["사업소","about/lcations__1.html"],["사업소개","about/overview.html"],["투자정보","about/investor__1.html"],["윤리경영","about/ethical__write.html"]].map(([t,u]) => [t, B+u])
  },
  "제품소개": {
    desc: "주방, 생활, 공기환경 등 다양한 분야의 제품을 통해 일상에 편리함과 품질을 더하는 하츠의 솔루션을 소개합니다.",
    links: [["나에게 맞는 하츠 찾기", "#finder"], ["빌트인 주방가전", B+"product/kitchen_list.html"], ["욕실 솔루션", B+"product/haatzbath_list.html"], ["환기·공기질 솔루션", B+"product/airappliances_list.html"], ["생활 소형가전", B+"product/expendables_list.html"]]
  },
  "고객지원": {
    desc: "제품 사용 중 궁금한 점과 A/S, 매뉴얼, 구매처까지 필요한 지원 정보를 한곳에서 확인하세요.",
    links: [["자주 묻는 질문","support/faq.html"],["유지관리 가이드","support/maintenance__list.html"],["A/S 신청&amp;조회","support/service__1.html"],["E - 카탈로그","support/catalog.html"],["사용설명서","support/manuals.html"],["서비스정책","support/policy.html"],["구매처","support/buy.html"],["고객의 소리","support/feedback__1.html"],["대리점 개설 문의","support/inquiry__1.html"]].map(([t,u]) => [t, B+u])
  },
  "홍보센터": {
    desc: "하츠의 새로운 소식과 홍보영상, 미디어 자료, 공지사항을 확인하세요.",
    links: [["NEWS","pr-center/news__list.html"],["홍보영상","pr-center/promotion__list.html"],["하츠 미디어","pr-center/media__list.html"],["공지사항","pr-center/notices__list.html"]].map(([t,u]) => [t, B+u])
  }
};
(function () {
  const head = document.querySelector(".head");
  const mega = document.createElement("div");
  mega.className = "mega"; mega.id = "mega"; mega.hidden = true;
  head.appendChild(mega);
  const subLinks = (links) => links.map(([t, u]) => `<a class="chip" href="${u}" ${u.startsWith("#") ? "" : ext}><span>${t}</span><svg viewBox="0 0 8 14" width="8" height="14" aria-hidden="true"><path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></a>`).join("");
  let cur = null, timer;
  function open(name, trigger) {
    clearTimeout(timer);
    const d = SUB[name]; if (!d) return close();
    if (cur !== name) {
      mega.innerHTML = `<div class="wrap mega-in"><div class="mega-l"><strong>${name}</strong><p>${d.desc}</p></div><div class="mega-r">${subLinks(d.links)}</div></div>`;
      swapIn(mega.querySelector(".mega-r"), 0, 10, 0, 320);
    }
    cur = name; mega.hidden = false;
    document.querySelectorAll("#gnb-list > li > a").forEach(a => a.classList.toggle("on", a === trigger));
    trigger.setAttribute("aria-expanded", "true");
  }
  function close() {
    cur = null; mega.hidden = true;
    document.querySelectorAll("#gnb-list > li > a").forEach(a => { a.classList.remove("on"); if (a.hasAttribute("aria-expanded")) a.setAttribute("aria-expanded", "false"); });
  }
  document.querySelectorAll("#gnb-list > li > a").forEach(a => {
    const name = a.textContent.trim();
    if (SUB[name]) {
      a.setAttribute("aria-haspopup", "true"); a.setAttribute("aria-expanded", "false"); a.setAttribute("aria-controls", "mega");
      /* 모바일 메뉴: 같은 항목 아래에 하위 링크를 세로로 표시 */
      a.parentElement.insertAdjacentHTML("beforeend", `<div class="m-sub">${subLinks(SUB[name].links)}</div>`);
    }
    const li = a.parentElement;
    li.addEventListener("mouseenter", () => { if (innerWidth > 768) open(name, a); });
    a.addEventListener("focus", () => { if (innerWidth > 768) open(name, a); });
  });
  head.addEventListener("mouseleave", () => { timer = setTimeout(close, 120); });
  head.addEventListener("mouseenter", () => clearTimeout(timer));
  head.addEventListener("focusout", e => { if (!head.contains(e.relatedTarget)) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
  mega.addEventListener("click", e => { if (e.target.closest("a")) close(); });
  window.addEventListener("resize", close);
})();

/* ===== 모바일 메뉴 ===== */
const mb = document.querySelector(".menu-btn"), gnb = document.getElementById("gnb");
mb.addEventListener("click", () => { mb.setAttribute("aria-expanded", gnb.classList.toggle("open")); });
gnb.addEventListener("click", e => { if (e.target.tagName === "A") { gnb.classList.remove("open"); mb.setAttribute("aria-expanded", false); } });

/* ===== 맞춤 제품 찾기: 조건을 한 단계씩 선택 ===== */
const STEPS = [["concern","어떤 고민이 있으신가요?"],["space","제품을 설치할 공간을 선택하세요"],["env","설치 환경을 선택하세요"]];
const sel = {}; let step = 0;
const wb = document.getElementById("wizBody"), crumbs = document.getElementById("crumbs");
function wizRender(focus) {
  crumbs.innerHTML = STEPS.map(([k],i) => sel[k] ? `<li><button type="button" class="crumb" data-i="${i}" aria-label="${i+1}단계 ${esc(sel[k])}, 다시 선택">${esc(sel[k])}</button></li>` : "").join("");
  if (step < 3) {
    const [k,q] = STEPS[step];
    wb.innerHTML = `<p class="stepno">${step+1} / 3 단계</p><h3 class="q" tabindex="-1">${q}</h3><div class="opts">${FINDER[k].map(v => `<button type="button" class="opt" data-v="${esc(v)}">${esc(v)}</button>`).join("")}</div>`;
  } else {
    const [n,d,s,u] = BEST[RESULT_IDX[sel.concern]];
    wb.innerHTML = `<p class="stepno">추천 결과</p><h3 class="q" tabindex="-1">이런 제품을 추천해요</h3><div class="rec">${img(s,n,"prod-img")}<div><h4>${esc(n)}</h4><p>${d?esc(d)+"<br>":""}선택 조건: ${esc(sel.concern)} / ${esc(sel.space)} / ${esc(sel.env)}<br><small>데모용 예시 추천입니다.</small></p><a class="fill-btn" href="${u}" ${ext}><span>제품 자세히 보기 <span class="sr">(외부 링크)</span></span><i class="plus" aria-hidden="true">+</i></a></div></div>`;
  }
  if (focus) { wb.querySelector(".q").focus({preventScroll: true}); swapIn(wb, 0, 18, 0, 420); }
}
wb.addEventListener("click", e => { const b = e.target.closest(".opt"); if (!b || step > 2) return; sel[STEPS[step][0]] = b.dataset.v; step++; wizRender(true); });
crumbs.addEventListener("click", e => { const b = e.target.closest(".crumb"); if (!b) return; const i = +b.dataset.i; STEPS.slice(i).forEach(([k]) => delete sel[k]); step = i; wizRender(true); });
document.getElementById("reset").addEventListener("click", () => { Object.keys(sel).forEach(k => delete sel[k]); step = 0; wizRender(true); });
wizRender(false);

/* ===== 인기 가전: 하나를 크게, 나머지는 오른쪽에 (BEST 데이터 중 가전만, 싱크볼 제외) ===== */
const POP = BEST.map((b,i) => ({b, c:["환기·공기질 솔루션","빌트인 주방가전","빌트인 주방가전","욕실 솔루션","빌트인 주방가전","욕실 솔루션","빌트인 주방가전","빌트인 주방가전"][i]})).filter((_,i) => i !== 1);
let ci = 0;
const cm = document.getElementById("catMain"), cr = document.getElementById("catRail");
function catRender(dir = 0) {
  const {b:[n,d,s,u], c} = POP[ci];
  cm.innerHTML = `<div class="arch">${img(s,n,"best-img")}</div><div class="best-info"><h3>${esc(n)}</h3><p class="cat">${c}</p>${d?`<p class="desc">${esc(d)}</p>`:""}<a class="more" href="${u}" ${ext}>자세히 보기 <span aria-hidden="true">&rarr;</span><span class="sr">(외부 링크)</span></a></div>`;
  cr.innerHTML = POP.map((_,k) => { const i = (ci + 1 + k) % POP.length; return i === ci ? "" : `<button type="button" class="rail-item" data-i="${i}" aria-label="${esc(POP[i].b[0])} 보기"><span class="rcap">${img(POP[i].b[2],"","rail-img")}</span><strong>${esc(POP[i].b[0])}</strong></button>`; }).join("");
  if (dir) { const a = cm.querySelector(".arch"), t = cm.querySelector(".best-info"); swapIn(a, dir * 48, 0, 0, 520); swapIn(t, dir * 32, 0, 90, 520); [...cr.children].forEach((k, n) => swapIn(k, dir * 24, 0, 40 * n, 480)); }
}
cr.addEventListener("click", e => { const b = e.target.closest(".rail-item"); if (!b) return; ci = +b.dataset.i; catRender(1); });
document.querySelector(".bprev").addEventListener("click", () => { ci = (ci - 1 + POP.length) % POP.length; catRender(-1); });
document.querySelector(".bnext").addEventListener("click", () => { ci = (ci + 1) % POP.length; catRender(1); });
catRender();

/* ===== SNS 가로 슬라이더 (버튼, 터치 스와이프, 마우스 드래그, 키보드 포커스 이동) ===== */
(() => {
  const tr = document.querySelector(".track"), prev = document.querySelector(".sl-prev"), next = document.querySelector(".sl-next");
  if (!tr) return;
  const step = () => { const li = tr.children[0]; return li ? li.getBoundingClientRect().width + parseFloat(getComputedStyle(tr).columnGap || 24) : 300; };
  const upd = () => { prev.disabled = tr.scrollLeft <= 4; next.disabled = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 4; };
  prev.addEventListener("click", () => tr.scrollBy({left: -step(), behavior: "smooth"}));
  next.addEventListener("click", () => tr.scrollBy({left: step(), behavior: "smooth"}));
  tr.addEventListener("scroll", upd, {passive: true}); window.addEventListener("resize", upd); upd();
  let down = false, sx = 0, sl = 0, moved = false;
  tr.addEventListener("pointerdown", e => { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = tr.scrollLeft; });
  window.addEventListener("pointermove", e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 5) { moved = true; tr.classList.add("drag"); } if (moved) tr.scrollLeft = sl - dx; });
  window.addEventListener("pointerup", () => { if (!down) return; down = false; tr.classList.remove("drag"); });
  tr.addEventListener("click", e => { if (moved) { e.preventDefault(); moved = false; } }, true);
})();

/* ===== 스크롤 등장 효과 ===== */
(() => {
  const head = document.querySelector(".head");
  const onScroll = () => head.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, {passive: true}); onScroll();
  if (REDUCE || !("IntersectionObserver" in window)) return;
  const SEL = ".sec-head, .best-head, .best-stage, .best-ctrl, .band .eyebrow, .band h2, .band .lead, .care-list > li, .grid4 > li, .grid3 > li, .finder-photo, .finder-panel, .story-box, .slider, #sns .note";
  const els = [...document.querySelectorAll(SEL)];
  els.forEach(el => { const sib = [...el.parentElement.children].indexOf(el); el.style.setProperty("--d", Math.min(sib, 5) * 90 + "ms"); el.classList.add("rv"); });
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; io.unobserve(el);
    el.classList.add("in");
    setTimeout(() => el.classList.remove("rv", "in"), 1400); // 끝난 뒤에는 hover 효과 등 원래 스타일로 복귀
  }), {threshold: 0.12, rootMargin: "0px 0px -6% 0px"});
  els.forEach(el => io.observe(el));
})();
