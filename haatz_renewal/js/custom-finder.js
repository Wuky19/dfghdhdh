(() => {
  const categoryButtons = [...document.querySelectorAll(".cf-category")];
  const widthButtons = [...document.querySelectorAll(".cf-size-option")];
  const sizePanel = document.getElementById("size-panel");
  const result = document.getElementById("finder-result");
  const resultCategory = document.getElementById("result-category");
  const resultWidth = document.getElementById("result-width");
  const categoryLink = document.getElementById("category-link");
  const changeButton = document.getElementById("change-condition");
  const categoryNames = {
    kitchen: "빌트인 주방가전",
    bath: "욕실 솔루션",
    air: "환기·공기질 솔루션"
  };
  const categoryUrls = {
    kitchen: "product.html#tab-kitchen",
    bath: "product.html#tab-bath",
    air: "product.html#tab-air"
  };
  let selectedCategory = null;
  let selectedWidth = null;

  function selectCategory(button) {
    selectedCategory = button.dataset.category;
    categoryButtons.forEach(item => {
      const selected = item === button;
      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    result.hidden = true;
    sizePanel.hidden = false;
    document.getElementById("progress-category").classList.add("is-done");
    document.getElementById("progress-size").classList.remove("is-done");
    document.getElementById("progress-size").classList.add("is-current");
    document.getElementById("progress-result").classList.remove("is-current");
    document.getElementById("size-title").focus?.();
    sizePanel.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest"});
  }

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => selectCategory(button));
  });

  widthButtons.forEach(button => {
    button.addEventListener("click", () => {
      selectedWidth = Number(button.dataset.width);
      widthButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("is-selected", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      showResult();
    });
  });

  function showResult() {
    if (!selectedCategory || !selectedWidth) return;
    resultCategory.textContent = categoryNames[selectedCategory];
    resultWidth.textContent = selectedWidth.toLocaleString("ko-KR");
    categoryLink.href = categoryUrls[selectedCategory];
    result.hidden = false;
    document.getElementById("progress-category").classList.add("is-done");
    document.getElementById("progress-size").classList.remove("is-current");
    document.getElementById("progress-size").classList.add("is-done");
    document.getElementById("progress-result").classList.add("is-current");
    result.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
  }

  changeButton.addEventListener("click", () => {
    result.hidden = true;
    sizePanel.hidden = true;
    selectedCategory = null;
    selectedWidth = null;
    categoryButtons.forEach(button => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });
    widthButtons.forEach(button => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });
    document.getElementById("progress-category").classList.remove("is-done");
    document.getElementById("progress-size").classList.remove("is-done", "is-current");
    document.getElementById("progress-result").classList.remove("is-current");
    document.getElementById("category-options").scrollIntoView({behavior: "smooth", block: "center"});
  });
})();