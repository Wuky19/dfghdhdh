(() => {
  const tabs = [...document.querySelectorAll(".product-tab")];
  const items = [...document.querySelectorAll(".product-item")];
  const title = document.getElementById("result-title");
  const count = document.getElementById("product-count");
  const grid = document.getElementById("product-grid");
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
      const visible = category === "all" || item.dataset.category === category;
      item.hidden = !visible;
      if (visible && !item.classList.contains("is-empty")) visibleCount += 1;
    });

    title.textContent = names[category] || names.all;
    count.textContent = String(visibleCount);
    grid.setAttribute("aria-labelledby", activeTab.id);
    if (moveFocus) activeTab.focus();
  }

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
