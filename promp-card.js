(function() {

  const CARD_URL = "https://tonpukusan.github.io/blog-parts/promo-card.html";
  const PLACEHOLDER_SELECTOR = ".promo-card-placeholder";

  const DEFAULT_HEIGHT = "200px"; // CLS対策

  const placeholders = document.querySelectorAll(PLACEHOLDER_SELECTOR);
  if (!placeholders.length) return;

  placeholders.forEach(el => {
    if (!el.style.minHeight) {
      el.style.minHeight = DEFAULT_HEIGHT;
    }
  });

  fetch(CARD_URL)
    .then(response => response.text())
    .then(html => {
      placeholders.forEach(el => {
        el.insertAdjacentHTML("beforeend", html);

        requestAnimationFrame(() => {
          el.style.minHeight = el.scrollHeight + "px";
        });
      });
    })
    .catch(err => {
      console.error("promo-card の読み込みに失敗:", err);
    });

})();
