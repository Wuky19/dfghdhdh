(() => {
  const tabs = [...document.querySelectorAll(".product-tab")];
  const items = [...document.querySelectorAll(".product-item")];
  const grid = document.getElementById("product-grid");

  // 전체 145개 구성을 위한 추가 예시 데이터
  // 실제 판매 제품 목록이 아닌 화면 구성용 임시 항목입니다.
  const demoGroups = [
    { category: "kitchen", total: 90, existing: 5, image: "img/2.jfif", tag: "빌트인 주방가전",
      families: ["후드", "전기쿡탑", "가스쿡탑", "싱크볼", "싱크 수전", "빌트인 기기", "주방 액세서리"] },
    { category: "bath", total: 25, existing: 2, image: "img/cat-bath.webp", tag: "욕실 솔루션",
      families: ["비데", "욕실 환풍기", "욕실 액세서리", "위생가전"] },
    { category: "air", total: 30, existing: 1, image: "img/cat-air.webp", tag: "환기·공기질 솔루션",
      families: ["환기청정기", "환풍기", "공기질 관리 시스템", "공기청정기"] }
  ];

  demoGroups.forEach(group => {
    const addCount = group.total - group.existing;
    for (let i = 0; i < addCount; i++) {
      const family = group.families[i % group.families.length];
      const familyIndex = Math.floor(i / group.families.length) + 1;
      const item = document.createElement("li");
      item.className = "product-item";
      item.dataset.category = group.category;

      const article = document.createElement("article");
      article.className = "product-card";
      const imageWrap = document.createElement("div");
      imageWrap.className = "product-image";
      const image = document.createElement("img");
      image.src = group.image;
      image.alt = group.tag + " 예시 이미지";
      image.loading = "lazy";
      imageWrap.append(image);

      const info = document.createElement("div");
      info.className = "product-card-info";
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = group.tag;
      const heading = document.createElement("h3");
      heading.textContent = family + " 시리즈 " + String(familyIndex).padStart(2, "0");
      const description = document.createElement("p");
      description.textContent = "제품 목록 구성을 위한 예시 항목";
      const detailButton = document.createElement("button");
      detailButton.type = "button";
      detailButton.className = "product-link detail-open";
      detailButton.textContent = "제품 자세히 보기";
      info.append(tag, heading, description, detailButton);
      article.append(imageWrap, info);
      item.append(article);
      grid.append(item);
      items.push(item);
    }
  });
  const title = document.getElementById("result-title");
  const count = document.getElementById("product-count");
  const pagination = document.getElementById("product-pagination");
  const pageSize = 4;
  let currentPage = 1;
  const search = document.getElementById("product-search");
  const clearSearch = document.getElementById("search-clear");
  const total = document.getElementById("catalog-total");
  const dialog = document.getElementById("product-detail-dialog");
  const detailTitle = document.getElementById("detail-title");
  const detailImage = document.getElementById("detail-image");
  const detailCategory = document.getElementById("detail-category");
  const detailDescription = document.getElementById("detail-description");
  const detailTags = document.getElementById("detail-tags");
  const shareDetail = document.querySelector(".detail-share");
  let currentDetailUrl = window.location.href;
  const closeDetail = dialog?.querySelector(".detail-close");
  if (total) total.textContent = "(145개)";
  const names = {
    all: "전체 제품",
    kitchen: "빌트인 주방가전",
    bath: "욕실 솔루션",
    air: "환기·공기질 솔루션"
  };

  function selectCategory(category, moveFocus = false) {
    const activeTab = tabs.find(tab => tab.dataset.category === category) || tabs[0];
    tabs.forEach(tab => {
      const selected = tab === activeTab;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    const keyword = (search?.value || "").trim().toLowerCase();
    const filteredItems = items.filter(item => {
      const productName = item.querySelector("h3")?.textContent.toLowerCase() || "";
      return (category === "all" || item.dataset.category === category) && productName.includes(keyword);
    });
    const pageCount = Math.max(1, Math.ceil(filteredItems.length / pageSize));
    currentPage = Math.min(currentPage, pageCount);
    const startIndex = (currentPage - 1) * pageSize;
    const pageItems = new Set(filteredItems.slice(startIndex, startIndex + pageSize));
    items.forEach(item => { item.hidden = !pageItems.has(item); });
    title.textContent = names[category] || names.all;
    count.textContent = String(filteredItems.length);
    grid.setAttribute("aria-labelledby", activeTab.id);
    renderPagination(pageCount, category);
    if (moveFocus) activeTab.focus();
  }

  function renderPagination(pageCount, category) {
    if (!pagination) return;
    pagination.innerHTML = "";
    const addButton = (label, current = false, aria = label) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = label;
      button.classList.toggle("is-current", current);
      if (current) button.setAttribute("aria-current", "page");
      button.setAttribute("aria-label", aria);
      button.addEventListener("click", () => {
        pagination.querySelectorAll("button").forEach(item => {
          item.classList.remove("is-current");
          item.removeAttribute("aria-current");
        });
        button.classList.add("is-current");
        button.setAttribute("aria-current", "page");
      });
      pagination.append(button);
    };
    addButton("1", true, "1페이지");
    addButton("2", false, "2페이지");
    addButton("3", false, "3페이지");
    addButton("4", false, "4페이지");
  }

  search?.addEventListener("input", () => { currentPage = 1; selectCategory(tabs.find(tab => tab.classList.contains("is-active"))?.dataset.category || "all"); });
  clearSearch?.addEventListener("click", () => { if (search) search.value = ""; currentPage = 1; selectCategory(tabs.find(tab => tab.classList.contains("is-active"))?.dataset.category || "all"); search?.focus(); });
  grid.addEventListener("click", event => {
    const button = event.target.closest(".detail-open");
    if (!button) return;
    const card = button.closest(".product-card");
    const name = card?.querySelector("h3")?.textContent || "제품 상세정보";
    const image = card?.querySelector(".product-image img");
    const category = card?.querySelector(".tag")?.textContent || "하츠 제품";
    const description = card?.querySelector(".product-card-info p")?.textContent || "제품 상세 정보는 확인 후 업데이트할 예정입니다.";
    if (detailTitle) detailTitle.textContent = name;
    if (detailImage && image) { detailImage.src = image.src; detailImage.alt = image.alt; }
    if (detailCategory) detailCategory.textContent = category;
    if (detailDescription) detailDescription.textContent = description;
    if (detailTags) detailTags.innerHTML = [name, category].map(tag => `<span>#${tag}</span>`).join("");
    currentDetailUrl = window.location.href.split("#")[0] + "#" + encodeURIComponent(name);
    dialog?.showModal();
  });
  closeDetail?.addEventListener("click", () => dialog.close());
  shareDetail?.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(currentDetailUrl); shareDetail.textContent = "복사됨"; }
    catch { shareDetail.textContent = "복사 불가"; }
  });
  dialog?.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => { currentPage = 1; selectCategory(tab.dataset.category); });
    tab.addEventListener("keydown", event => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
      currentPage = 1;
      selectCategory(tabs[next].dataset.category, true);
    });
  });

  const menuButton = document.querySelector(".menu-btn");
  const nav = document.getElementById("gnb");
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });
  nav.addEventListener("click", event => {
    if (event.target.closest("a")) {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
  const hashCategory = { "#tab-kitchen": "kitchen", "#tab-bath": "bath", "#tab-air": "air" }[window.location.hash] || "all";
  selectCategory(hashCategory);
})();
