/* 공통 뉴스 데이터를 홍보센터 게시판 목록으로 출력 */
(() => {
  const board = document.getElementById("news-board-list");
  const news = window.HAATZ_NEWS || [];
  if (!board) return;

  const esc = value => String(value).replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[char]));

  board.innerHTML = `
    <div class="news-board-head" aria-hidden="true">
      <span>번호</span><span>분류</span><span>제목</span><span>게시일</span>
    </div>
    ${news.map(([title, image, category], index) => {
      const id = String(index + 1).padStart(2, "0");
      const number = String(news.length - index).padStart(2, "0");
      return `
        <a class="news-board-row" id="news-${id}" href="#news-${id}">
          <span class="news-board-no">${number}</span>
          <span class="news-board-type">${esc(category || "NEWS")}</span>
          <strong class="news-board-title">${esc(title)}</strong>
          <span class="news-board-date">게시일 정보 없음</span>
        </a>`;
    }).join("")}
  `;

  if (!news.length) {
    board.innerHTML = '<p class="empty-state">등록된 소식이 없습니다.</p>';
  }
})();
