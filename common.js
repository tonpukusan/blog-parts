// ===============================
//  コンテキストメニュー・コピー抑止
// ===============================
document.addEventListener("contextmenu", e => e.preventDefault());
document.addEventListener("copy", e => {
    e.preventDefault();
    alert("テキストのコピーは禁止されています。");
});

// ===============================
//  ナビゲーションメニュー開閉
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("navigation-button");
    const content = document.getElementById("navigation-content");
    if (!btn || !content) return;

    btn.addEventListener("change", () => {
        content.style.maxHeight = btn.checked ? "500px" : "0";
    });
});

// ===============================
//  Kattene パーツ生成
// ===============================
function insKattene(title, imgUrl, imgWidth, aUrl, yUrl, rUrl, btnStyle, desc) {
  let buttons = '';
  if (aUrl) buttons += `<div><a class="kattene__btn __orange" target="_blank" href="${aUrl}">Amazon</a></div>`;
  if (yUrl) buttons += `<div><a class="kattene__btn __pink" target="_blank" href="${yUrl}">Yahoo!</a></div>`;
  if (rUrl) buttons += `<div><a class="kattene__btn __red" target="_blank" href="${rUrl}">楽天</a></div>`;

  const safeTitle = title ? escapeHTML(title) : "商品";
  const imgPart = aUrl
    ? `<a target="_blank" href="${aUrl}"><img src="${imgUrl}" width="${imgWidth}" alt="${safeTitle}の商品画像"></a>`
    : `<img src="${imgUrl}" width="${imgWidth}" alt="${safeTitle}の商品画像">`;

  return `
    <div class="kattene">
      <div class="kattene__imgpart">${imgPart}</div>
      <div class="kattene__infopart">
        <div class="kattene__title">
          ${aUrl ? `<a target="_blank" href="${aUrl}">${safeTitle}</a>` : safeTitle}
        </div>
        <div class="kattene__description">${desc || ""}</div>
        <div class="kattene__btns ${btnStyle}">${buttons}</div>
      </div>
    </div>`;
}

// ===============================
//  Kattene パーツの構築（data-json / data-cont 両対応）
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".kattene-parts").forEach(async (el) => {
    const jsonUrl = el.dataset.json;     // 新方式
    const rawData = el.getAttribute("data-cont"); // 旧方式

    let data = {};

    // -----------------------------
    // 1) data-json（GitHub Pages）優先
    // -----------------------------
    if (jsonUrl) {
      try {
        const res = await fetch(jsonUrl);
        if (!res.ok) throw new Error("fetch failed: " + res.status);
        data = await res.json();
      } catch (e) {
        console.error("kattene: JSON fetch error", e);
        el.innerHTML = "<p>パーツの読み込みに失敗しました。</p>";
        return;
      }
    }

    // -----------------------------
    // 2) data-cont（旧方式）もサポート
    // -----------------------------
    else if (rawData) {
      try {
        const clean = rawData.replace(/\\"/g, '"');
        data = JSON.parse(clean);
      } catch (e) {
        console.error("kattene: data-cont parse error", e);
        el.innerHTML = "<p>パーツの読み込みに失敗しました。</p>";
        return;
      }
    }

    // -----------------------------
    // 3) どちらも無い場合はスキップ
    // -----------------------------
    else {
      console.warn("kattene: no data-json or data-cont on element", el);
      return;
    }

    // -----------------------------
    // 必須項目チェック
    // -----------------------------
    if (!data.title || !data.imgUrl || !data.aUrl) {
      console.warn("kattene: missing required fields", data);
      el.innerHTML = "<p>パーツ情報が不完全です。</p>";
      return;
    }

    // -----------------------------
    // 描画処理
    // -----------------------------
    data.imgWidth = parseInt(data.imgWidth, 10) || 200;

    const amazonUrl = generateAmazonAffiliateLink(data.aUrl, "yusatosh-22");
    const rakutenUrl = data.rUrl ? generateRakutenAffiliateUrl(data.rUrl) : "";

    el.innerHTML = insKattene(
      data.title,
      data.imgUrl,
      data.imgWidth,
      amazonUrl,
      data.yUrl || "",
      rakutenUrl,
      data.btnStyle || "kattene__btns __one",
      data.desc || ""
    );
  });
});

// ===============================
//  楽天アフィリエイトリンク生成
// ===============================
function generateRakutenAffiliateUrl(originalUrl) {
    const affiliateBase = "https://hb.afl.rakuten.co.jp/hgc/15844848.ec827d24.15844849.84443345/";
    const encodedUrl = encodeURIComponent(originalUrl);
    return `${affiliateBase}?pc=${encodedUrl}&link_type=hybrid_url`;
}

// ===============================
//  Amazonアフィリエイトリンク生成
// ===============================
function generateAmazonAffiliateLink(url, affiliateId) {
    try {
        const urlObj = new URL(url);
        const host = urlObj.hostname;

        if (!host.includes("amazon.co.jp") && !host.includes("amazon.com")) {
            throw new Error("AmazonのURLではありません");
        }

        let asinMatch = url.match(/(?:dp|gp\/product)\/([A-Z0-9]{10})/);
        if (asinMatch) {
            return `https://${host}/dp/${asinMatch[1]}/?tag=${affiliateId}`;
        }

        if (url.includes("/s?")) {
            return `${url}&tag=${affiliateId}`;
        }

        throw new Error("ASINが見つかりませんでした");
    } catch (error) {
        console.error("Amazonリンク生成エラー:", error.message);
        return null;
    }
}

// ===============================
//  HTMLエスケープ
// ===============================
function escapeHTML(html) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '`': '&#96;'
    };
    return html.replace(/[&<>"'`]/g, m => map[m]);
}


// ===============================
//  HTMLエスケープ
// ===============================
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');
  const currentHost = location.hostname;

  links.forEach(link => {
    const linkHost = new URL(link.href).hostname;
    if (linkHost !== currentHost) {
      link.setAttribute('target', '_blank');
    }
  });
});
