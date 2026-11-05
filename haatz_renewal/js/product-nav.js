/* 공통 헤더 메가 메뉴 및 모바일 하위 메뉴 */
(() => {
  const head = document.querySelector(".head");
  const navLinks = [...document.querySelectorAll("#gnb-list > li > a")];
  if (!head || !navLinks.length) return;

  /* 기존 리뉴얼 사이트에서 사용하던 하위 메뉴 목록과 단순 칩 형태를 유지 */
  const SUB = {
    "하츠이야기": {
      desc: "30년 넘게 이어온 하츠의 이야기와 사업, 경영 정보를 소개합니다.",
      links: [
        ["About 하츠", "about.html"],
        ["연혁", "about.html#brand-story"],
        ["CI", "about.html#brand-value"],
        ["사업소", "about.html#haatz-solution"],
        ["사업소개", "about.html#haatz-solution"],
        ["투자정보", "about.html#brand-value"],
        ["윤리경영", "about.html#brand-value"]
      ]
    },
    "제품소개": {
      desc: "주방, 욕실, 환기·공기질 등 다양한 공간에 필요한 하츠의 제품 솔루션을 살펴보세요.",
      links: [
        ["나에게 맞는 하츠 찾기", "custom-finder.html"],
        ["빌트인 주방가전", "product.html#tab-kitchen"],
        ["욕실 솔루션", "product.html#tab-bath"],
        ["환기·공기질 솔루션", "product.html#tab-air"]
      ]
    },
    "고객지원": {
      desc: "제품 사용 중 궁금한 점과 A/S, 매뉴얼, 구매처까지 필요한 지원 정보를 확인하세요.",
      links: [
        ["고객지원 홈", "customer.html"],
        ["자주 묻는 질문", "customer/faq.html"],
        ["유지관리 가이드", "customer/maintenance.html"],
        ["A/S 신청·조회", "customer/service.html"],
        ["E-카탈로그", "customer/catalog.html"],
        ["사용설명서", "customer/manual.html"],
        ["서비스 정책", "customer/policy.html"],
        ["구매처", "customer/store.html"],
        ["고객의 소리", "customer/voice.html"],
        ["대리점 개설 문의", "customer/partnership.html"]
      ]
    },
    "홍보센터": {
      desc: "하츠의 새로운 소식과 홍보영상, 미디어 자료, 공지사항을 확인하세요.",
      links: [
        ["홍보센터 홈", "pr-center.html"],
        ["NEWS", "pr-center/news.html"],
        ["홍보영상", "pr-center/video.html"],
        ["하츠 미디어", "pr-center/media.html"],
        ["공지사항", "pr-center/notice.html"]
      ]
    }
  };

  const makeLinks = links => links.map(([label, url]) =>
    `<a class="chip" href="${url}"><span>${label}</span><svg viewBox="0 0 8 14" width="8" height="14" aria-hidden="true"><path d="M1 1l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5"/></svg></a>`
  ).join("");

  const mega = document.createElement("div");
  mega.className = "mega";
  mega.id = "mega";
  mega.hidden = true;
  head.appendChild(mega);

  let current = null;
  let closeTimer;

  function open(name, trigger) {
    const item = SUB[name];
    if (!item || window.innerWidth <= 768) return close();
    clearTimeout(closeTimer);
    if (current !== name) {
      mega.innerHTML = `
        <div class="wrap mega-in">
          <div class="mega-l"><strong>${name}</strong><p>${item.desc}</p></div>
          <div class="mega-r">${makeLinks(item.links)}</div>
        </div>`;
      current = name;
    }
    mega.hidden = false;
    navLinks.forEach(link => {
      const active = link === trigger;
      link.classList.toggle("on", active);
      link.setAttribute("aria-expanded", active ? "true" : "false");
    });
  }

  function close() {
    current = null;
    mega.hidden = true;
    navLinks.forEach(link => {
      link.classList.remove("on");
      if (link.hasAttribute("aria-expanded")) link.setAttribute("aria-expanded", "false");
    });
  }

  navLinks.forEach(link => {
    const name = link.textContent.trim();
    if (!SUB[name]) return;
    link.setAttribute("aria-haspopup", "true");
    link.setAttribute("aria-expanded", "false");
    link.setAttribute("aria-controls", "mega");

    const mobileSub = document.createElement("div");
    mobileSub.className = "m-sub";
    mobileSub.innerHTML = makeLinks(SUB[name].links);
    link.parentElement.appendChild(mobileSub);

    link.parentElement.addEventListener("mouseenter", () => open(name, link));
    link.addEventListener("focus", () => open(name, link));
  });

  head.addEventListener("mouseenter", () => clearTimeout(closeTimer));
  head.addEventListener("mouseleave", () => {
    closeTimer = setTimeout(close, 120);
  });
  head.addEventListener("focusout", event => {
    if (!head.contains(event.relatedTarget)) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
  mega.addEventListener("click", event => {
    if (event.target.closest("a")) close();
  });
  window.addEventListener("resize", close);
})();
