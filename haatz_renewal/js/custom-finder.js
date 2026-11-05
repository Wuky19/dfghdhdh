(() => {
  const categoryButtons = [...document.querySelectorAll(".cf-category")];
  const widthButtons = [...document.querySelectorAll(".cf-size-option")];
  const sizePanel = document.getElementById("size-panel");
  const result = document.getElementById("finder-result");
  const resultCategory = document.getElementById("result-category");
  const resultWidth = document.getElementById("result-width");
  const categoryLink = document.getElementById("category-link");
  const recommendList = document.getElementById("recommend-list");
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

  // 제품소개 페이지에 등록된 예시 제품만 표시한다.
  // 제품의 실제 가로 폭 데이터가 확보되기 전까지 크기 적합성을 단정하지 않는다.
  const products = {
    kitchen: [
      {name:"노바 후드",description:"주방 공간을 위한 후드",image:"img/2.jfif"},
      {name:"모아후드",description:"플루티드 유리 디자인",image:"img/3.jfif"}
    ],
    bath: [
      {name:"하츠 비데",description:"욕실 위생가전",image:"img/cat-bath.webp"},
      {name:"하츠 비데 라이트",description:"욕실 위생가전",image:"img/cat-bath.webp"}
    ],
    air: [
      {name:"마이티",description:"환기·공기질 솔루션",image:"img/cat-air.webp"}
    ]
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
    sizePanel.scrollIntoView({behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest"});
  }

  function renderRecommendations(category) {
    recommendList.replaceChildren();
    products[category].forEach(product => {
      const card = document.createElement("article");
      card.className = "cf-recommend-card";

      const imageWrap = document.createElement("div");
      imageWrap.className = "cf-recommend-image";
      const image = document.createElement("img");
      image.src = product.image;
      image.alt = product.name;
      image.loading = "lazy";
      imageWrap.append(image);

      const info = document.createElement("div");
      info.className = "cf-recommend-info";
      const tag = document.createElement("span");
      tag.className = "tag";
      tag.textContent = categoryNames[category];
      const title = document.createElement("h4");
      title.textContent = product.name;
      const description = document.createElement("p");
      description.textContent = product.description;
      const link = document.createElement("a");
      link.href = categoryUrls[category];
      link.textContent = "자세히 보기";
      info.append(tag, title, description, link);
      card.append(imageWrap, info);
      recommendList.append(card);
    });
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
    renderRecommendations(selectedCategory);
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
    document.getElementById("category-options").scrollIntoView({behavior:"smooth",block:"center"});
  });
})();