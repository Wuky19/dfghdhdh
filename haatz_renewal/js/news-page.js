/* 뉴스·블로그·인스타그램 통합 목록 및 카테고리 필터 */
(() => {
  const board = document.getElementById("news-board-list");
  const pagination = document.getElementById("news-pagination");
  const filters = document.getElementById("news-category-filters");
  const searchForm = document.getElementById("news-search-form");
  const searchInput = document.getElementById("news-search-input");
  const allItems = window.HAATZ_NEWS || [];
  if (!board || !pagination || !filters) return;

  const pageSize = 6;
  const categories = [
    ["ALL", "전체"],
    ["NEWS", "뉴스"],
    ["BLOG", "블로그"],
    ["INSTAGRAM", "인스타그램"]
  ];
  let activeCategory = "ALL";
  let searchKeyword = "";
  let currentPage = 1;

  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));

  function getItems() {
    return allItems
      .filter(item => activeCategory === "ALL" || item.category === activeCategory)
      .filter(item => {
        const keyword = searchKeyword.toLocaleLowerCase();
        return !keyword || [item.title, item.category, item.date].some(value => String(value || "").toLocaleLowerCase().includes(keyword));
      })
      .slice()
      .sort((a,b) => (b.sortDate || "").localeCompare(a.sortDate || ""));
  }

  function render() {
    const items = getItems();
    const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
    currentPage = Math.min(currentPage, totalPages);
    const start = (currentPage - 1) * pageSize;
    const pageItems = items.slice(start, start + pageSize);

    board.innerHTML = `
      <div class="news-board-head" aria-hidden="true">
        <span>번호</span><span>분류</span><span>제목</span><span>게시일</span>
      </div>
      ${pageItems.map((item,index) => {
        const number = String(items.length - start - index).padStart(2,"0");
        const href = item.url ? esc(item.url) : `#${esc(item.id)}`;
        const target = item.url ? ' target="_blank" rel="noopener noreferrer"' : "";
        const image = item.image ? `<img class="news-board-thumb" src="../${esc(item.image)}" alt="" loading="lazy">` : "";
        return `
          <a class="news-board-row" id="${esc(item.id)}" href="${href}"${target}>
            <span class="news-board-no">${number}</span>
            <span class="news-board-type news-type-${esc(item.category.toLowerCase())}">${esc(item.category)}</span>
            <span class="news-board-title-wrap">${image}<strong class="news-board-title">${esc(item.title)}</strong></span>
            <span class="news-board-date">${esc(item.date || "게시일 확인 필요")}</span>
          </a>`;
      }).join("")}
    `;
    if (!pageItems.length) {
      board.innerHTML = '<p class="empty-state">검색 결과가 없습니다. 다른 검색어를 입력해 주세요.</p>';
      pagination.innerHTML = "";
      return;
    }

    pagination.innerHTML = `
      <button type="button" class="btn btn-page news-page-arrow" data-page="${currentPage-1}" ${currentPage===1?"disabled":""}>이전</button>
      <div class="news-page-numbers">
        ${Array.from({length:totalPages},(_,i)=>`<button type="button" class="btn btn-page news-page-number ${i+1===currentPage?"is-active":""}" data-page="${i+1}" ${i+1===currentPage?'aria-current="page"':""}>${i+1}</button>`).join("")}
      </div>
      <button type="button" class="news-page-arrow" data-page="${currentPage+1}" ${currentPage===totalPages?"disabled":""}>다음</button>
    `;
    pagination.querySelectorAll("[data-page]").forEach(button => button.addEventListener("click", () => {
      const next = Number(button.dataset.page);
      if (next < 1 || next > totalPages || next === currentPage) return;
      currentPage = next;
      render();
      board.scrollIntoView({behavior:"smooth",block:"start"});
    }));
  }

  filters.innerHTML = categories.map(([key,label]) =>
    `<button type="button" class="btn btn-category news-filter ${key===activeCategory?"is-active":""}" data-category="${key}" aria-pressed="${key===activeCategory}">${label}</button>`
  ).join("");
  filters.addEventListener("click", event => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    activeCategory = button.dataset.category;
    currentPage = 1;
    filters.querySelectorAll(".news-filter").forEach(item => {
      const selected = item.dataset.category === activeCategory;
      item.classList.toggle("is-active",selected);
      item.setAttribute("aria-pressed",String(selected));
    });
    render();
  });

  searchForm?.addEventListener("submit", event => {
    event.preventDefault();
    searchKeyword = searchInput.value.trim();
    currentPage = 1;
    render();
  });
  searchInput?.addEventListener("input", () => {
    searchKeyword = searchInput.value.trim();
    currentPage = 1;
    render();
  });

  render();
})();
