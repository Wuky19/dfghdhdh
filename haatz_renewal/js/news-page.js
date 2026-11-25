/* 공통 뉴스 데이터를 페이지 단위로 출력 */
(() => {
  const board = document.getElementById("news-board-list");
  const pagination = document.getElementById("news-pagination");
  const news = window.HAATZ_NEWS || [];
  if (!board || !pagination) return;

  const pageSize = 6;
  let currentPage = 1;
  const totalPages = Math.ceil(news.length / pageSize);

  const esc = value => String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));

  function renderPage() {
    const start = (currentPage - 1) * pageSize;
    const pageItems = news.slice(start, start + pageSize);

    board.innerHTML = `
      <div class="news-board-head" aria-hidden="true">
        <span>번호</span><span>분류</span><span>제목</span><span>게시일</span>
      </div>
      ${pageItems.map(([title, image, category, date, url], index) => {
        const globalIndex = start + index;
        const id = String(globalIndex + 1).padStart(2, "0");
        const number = String(news.length - globalIndex).padStart(2, "0");
        const href = url ? esc(url) : `#news-${id}`;
        const target = url ? ' target="_blank" rel="noopener noreferrer"' : "";
        return `
          <a class="news-board-row" id="news-${id}" href="${href}"${target}>
            <span class="news-board-no">${number}</span>
            <span class="news-board-type">${esc(category || "NEWS")}</span>
            <strong class="news-board-title">${esc(title)}</strong>
            <span class="news-board-date">${esc(date || "게시일 확인 필요")}</span>
          </a>`;
      }).join("")}
    `;

    pagination.innerHTML = `
      <button type="button" class="news-page-arrow" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""} aria-label="이전 페이지">이전</button>
      <div class="news-page-numbers" aria-label="페이지 선택">
        ${Array.from({length: totalPages}, (_, i) => {
          const pageNumber = i + 1;
          return `<button type="button" class="news-page-number ${pageNumber === currentPage ? "is-active" : ""}" data-page="${pageNumber}" ${pageNumber === currentPage ? 'aria-current="page"' : ""}>${pageNumber}</button>`;
        }).join("")}
      </div>
      <button type="button" class="news-page-arrow" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""} aria-label="다음 페이지">다음</button>
    `;

    pagination.querySelectorAll("button[data-page]").forEach(button => {
      button.addEventListener("click", () => {
        const nextPage = Number(button.dataset.page);
        if (nextPage < 1 || nextPage > totalPages || nextPage === currentPage) return;
        currentPage = nextPage;
        renderPage();
        board.scrollIntoView({behavior:"smooth", block:"start"});
      });
    });
  }

  if (!news.length) {
    board.innerHTML = '<p class="empty-state">등록된 소식이 없습니다.</p>';
    pagination.hidden = true;
    return;
  }
  renderPage();
})();
