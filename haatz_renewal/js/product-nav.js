/* 제품소개 페이지 공통 헤더 서브메뉴 */
(() => {
  const head = document.querySelector(".head");
  const productLink = [...document.querySelectorAll("#gnb-list > li > a")]
    .find(link => link.textContent.trim() === "제품소개");
  if (!head || !productLink) return;

  const links = [
    ["나에게 맞는 하츠 찾기", "index.html#finder"],
    ["빌트인 주방가전", "product.html#tab-kitchen"],
    ["욕실 솔루션", "product.html#tab-bath"],
    ["환기·공기질 솔루션", "product.html#tab-air"],
    ["생활 소형가전", "product.html#tab-life"]
  ];

  const makeLinks = () => links.map(([label, url]) =>
    `<a class="chip" href="${url}"><span>${label}</span></a>`
  ).join("");

  const mega = document.createElement("div");
  mega.className = "mega";
  mega.id = "mega";
  mega.hidden = true;
  mega.innerHTML = `
    <div class="wrap mega-in">
      <div class="mega-l">
        <strong>제품소개</strong>
        <p>주방, 욕실, 환기·공기질 등 다양한 공간에 필요한 하츠의 제품 솔루션을 살펴보세요.</p>
      </div>
      <div class="mega-r">${makeLinks()}</div>
    </div>`;
  head.appendChild(mega);

  const mobileSub = document.createElement("div");
  mobileSub.className = "m-sub m-sub-product";
  mobileSub.innerHTML = makeLinks();
  productLink.parentElement.appendChild(mobileSub);

  const open = () => {
    if (window.innerWidth <= 768) return;
    mega.hidden = false;
    productLink.classList.add("on");
    productLink.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    mega.hidden = true;
    productLink.classList.remove("on");
    productLink.setAttribute("aria-expanded", "false");
  };

  productLink.setAttribute("aria-haspopup", "true");
  productLink.setAttribute("aria-expanded", "false");
  productLink.setAttribute("aria-controls", "mega");
  productLink.addEventListener("mouseenter", open);
  productLink.addEventListener("focus", open);
  head.addEventListener("mouseleave", close);
  head.addEventListener("focusout", event => {
    if (!head.contains(event.relatedTarget)) close();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
  window.addEventListener("resize", close);
  mega.addEventListener("mouseenter", open);
  mega.addEventListener("click", event => {
    if (event.target.closest("a")) close();
  });
})();