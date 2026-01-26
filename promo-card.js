(function() {

  const DEFAULT_HEIGHT = "200px";
  const SELECTOR = ".promo-card";

  const targets = document.querySelectorAll(SELECTOR);
  if (!targets.length) return;

  targets.forEach(el => {
    const jsonUrl = el.dataset.json;
    if (!jsonUrl) return;

    if (!el.style.minHeight) {
      el.style.minHeight = DEFAULT_HEIGHT;
    }

    fetch(jsonUrl)
      .then(r => r.json())
      .then(card => {

        const html = `
          <div class="promo-card-wrapper">
            <a href="${card.url}" class="promo-card__link" target="_blank" rel="noopener noreferrer">

              <div class="promo-card__thumbnail"
                   style="background-image:url('${card.thumbnail}');">
              </div>

              <div class="promo-card__content">
                <h3 class="promo-card__title">${card.title}</h3>
                <p class="promo-card__description">${card.description}</p>

                <div class="promo-card__extra">
                  <img src="${card.favicon}" width="16" height="16" alt="">
                  <span class="site-url">${card.site}</span>
                </div>
              </div>

            </a>
          </div>
        `;

        el.innerHTML = html;

        requestAnimationFrame(() => {
          el.style.minHeight = el.scrollHeight + "px";
        });

      })
      .catch(err => console.error("promo-card JSON load error:", err));
  });

})();
