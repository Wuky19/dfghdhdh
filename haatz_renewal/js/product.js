(() => {
  const tabs = [...document.querySelectorAll(".product-tab")];
  const items = [...document.querySelectorAll(".product-item")];
  const title = document.getElementById("result-title");
  const count = document.getElementById("product-count");
  const grid = document.getElementById("product-grid");
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
  items.forEach((item, index) => {
    const card = item.querySelector(".product-card-info");
    const number = document.createElement("span");
    number.className = "product-number";
    number.textContent = String(index + 1).padStart(2, "0");
    card?.prepend(number);
  });
  if (total) total.textContent = `(${items.length}개)`;
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

    let visibleCount = 0;
    items.forEach(item => {
      const keyword = (search?.value || "").trim().toLowerCase();
      const productName = item.querySelector("h3")?.textContent.toLowerCase() || "";
      const visible = (category === "all" || item.dataset.category === category) && productName.includes(keyword);
      item.hidden = !visible;
      if (visible && !item.classList.contains("is-empty")) visibleCount += 1;
    });

    title.textContent = names[category] || names.all;
    count.textContent = String(visibleCount);
    if (total) total.textContent = `(${visibleCount}개 표시 / 전체 ${items.length}개)`;
    grid.setAttribute("aria-labelledby", activeTab.id);
    if (moveFocus) activeTab.focus();
  }

  search?.addEventListener("input", () => selectCategory(tabs.find(tab => tab.classList.contains("is-active"))?.dataset.category || "all"));
  clearSearch?.addEventListener("click", () => { if (search) search.value = ""; selectCategory(tabs.find(tab => tab.classList.contains("is-active"))?.dataset.category || "all"); search?.focus(); });
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
    tab.addEventListener("click", () => selectCategory(tab.dataset.category));
    tab.addEventListener("keydown", event => {
      let next = index;
      if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft") next = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = tabs.length - 1;
      else return;
      event.preventDefault();
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
