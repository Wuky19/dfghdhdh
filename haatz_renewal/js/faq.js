/* FAQ 검색, 카테고리 필터, 아코디언 */
(() => {
  const list = document.getElementById("faq-list");
  const search = document.getElementById("faq-search");
  const count = document.getElementById("faq-count");
  const empty = document.getElementById("faq-empty");
  const categoryButtons = [...document.querySelectorAll("[data-category]")];

  if (!list || !search || !count || !empty) return;

  // 최초 목록을 기준으로 필터링하므로 아코디언을 열고 닫아도 항목은 제거되지 않습니다.
  const items = [...list.querySelectorAll(".faq-item")];
  let activeCategory = "전체";

  function closeItem(item) {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button.setAttribute("aria-expanded", "false");
    answer.hidden = true;
    item.classList.remove("is-open");
  }

  function updateList() {
    const query = search.value.trim().toLocaleLowerCase();
    let visible = 0;

    items.forEach(item => {
      const matchedCategory =
        activeCategory === "전체" || item.dataset.category === activeCategory;
      const matchedQuery =
        !query || item.querySelector(".faq-question-text").textContent
          .toLocaleLowerCase().includes(query);

      const show = matchedCategory && matchedQuery;
      item.hidden = !show;

      if (show) {
        visible++;
      } else {
        closeItem(item);
      }
    });

    count.textContent = `검색 결과 ${visible}개`;
    empty.hidden = visible !== 0;
  }

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;

      categoryButtons.forEach(categoryButton => {
        const selected = categoryButton === button;
        categoryButton.classList.toggle("is-active", selected);
        categoryButton.setAttribute("aria-pressed", String(selected));
      });

      updateList();
    });
  });

  items.forEach(item => {
    const button = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    button.addEventListener("click", () => {
      const willOpen = button.getAttribute("aria-expanded") !== "true";

      button.setAttribute("aria-expanded", String(willOpen));
      answer.hidden = !willOpen;
      item.classList.toggle("is-open", willOpen);
    });
  });

  search.addEventListener("input", updateList);
  updateList();
})();
