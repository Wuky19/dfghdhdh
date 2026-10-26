/* HAATZ 프로젝트 인터랙션 스크립트
   현재 메인 배너의 Swiper 초기화는 index.html에서 실행합니다.
   페이지 섹션 및 카드 인터랙션을 추가할 때 이 파일을 사용합니다. */
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    if (!header) return;

    // 모바일에서 헤더가 화면 상단에 고정되도록 유지합니다.
    header.setAttribute("aria-label", "하츠 리뉴얼 사이트 헤더");
});