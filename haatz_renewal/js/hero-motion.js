/* ===== 공통 페이지 모션: HERO 순차 등장 + 콘텐츠 스크롤 리빌 ===== */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const ease = "cubic-bezier(.2,.7,.2,1)";
  const animateIn = (el, delay = 0, distance = 24) => {
    if (!el || !el.animate) return;
    el.animate(
      [
        { opacity: 0, transform: `translateY(${distance}px)` },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: 850, delay, easing: ease, fill: "both" }
    );
  };

  // 모든 서브 페이지 HERO: 영문 문구 → 제목 → 설명 → CTA 순서로 등장
  const heroes = document.querySelectorAll(
    ".about-hero-in, .product-hero-in, .cf-hero-in, .customer-hero-in, .pr-news-hero-in"
  );
  heroes.forEach(hero => {
    const items = [...hero.children].filter(el =>
      el.matches("p, h1, form, a, .search-hint")
    );
    items.forEach((el, i) => animateIn(el, i * 130, 26));

    const visual = hero.closest(".product-hero")?.querySelector(".product-hero-visual img");
    if (visual) {
      visual.animate(
        [{ transform: "scale(1.07)" }, { transform: "scale(1)" }],
        { duration: 1500, easing: ease, fill: "both" }
      );
    }
  });

  // 서브 페이지 주요 콘텐츠: 화면에 들어올 때 한 번만 부드럽게 등장
  const revealTargets = document.querySelectorAll([
    ".about-section-head",
    ".about-intro",
    ".space-list > *",
    ".solution-grid > *",
    ".value-grid > *",
    ".product-result-head",
    ".product-grid > *",
    ".cf-content > *",
    ".cf-category-grid > *",
    ".cf-recommend-grid > *",
    ".customer-section-head",
    ".support-grid > *",
    ".news-list-toolbar",
    ".news-board-wrap"
  ].join(","));

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach(el => { el.style.opacity = "1"; });
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      animateIn(entry.target, 0, 28);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });

  revealTargets.forEach(el => observer.observe(el));
})();
