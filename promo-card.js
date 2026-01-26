(function() {

  const DEFAULT_HEIGHT = "200px"; // CLS対策
  const SELECTOR = ".promo-card";

  const targets = document.querySelectorAll(SELECTOR);
  if (!targets.length) return;

  targets.forEach(el => {
    const jsonUrl = el.dataset.json;
    if (!jsonUrl) return;

    // CLS対策：最低高さを確保
    if (!el.style.minHeight) {
      el.style.minHeight = DEFAULT_HEIGHT;
    }

    fetch(jsonUrl)
      .then(r => {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.json();
      })
      .then(card => {

        const html = `
          <div class="promo-card-wrapper">
            <a href="${card.url}" class="promo-card__link" target="_blank" rel="noopener noreferrer">

              <div class="promo-card__thumbnail"
                   style="background-image:url('${card.thumbnail}');
                          width:120px; height:90px;">
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

        // CLS対策：実際の高さに更新
        requestAnimationFrame(() => {
          el.style.minHeight = el.scrollHeight + "px";
        });

      })
      .catch(err => {
        console.error("promo-card JSON の読み込みに失敗:", jsonUrl, err);
      });
  });

})();
