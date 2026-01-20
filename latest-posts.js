// ===============================
//  最新記事カード（Workers ton3card 用）
// ===============================
document.addEventListener("DOMContentLoaded", () => {
    if (!window.blogConfig || !window.blogConfig.latestPosts) return;

    const blogs = window.blogConfig.latestPosts;

    // JSONP コールバックを動的に生成
    blogs.forEach((blog, index) => {
        const callbackName = `latestPostCallback_${index}`;

        window[callbackName] = function (data) {
            if (!data.feed.entry || data.feed.entry.length === 0) return;

            const entry = data.feed.entry[0];
            let postUrl = "";

            for (let i = 0; i < entry.link.length; i++) {
                if (entry.link[i].rel === "alternate") {
                    postUrl = entry.link[i].href;
                    break;
                }
            }

            const target = document.getElementById(blog.id);
            if (!target) return;

            target.innerHTML = `<div class="ton3-card" data-url="${postUrl}"></div>`;
        };

        // JSONP スクリプト追加
        const script = document.createElement("script");
        script.src = `${blog.feed}&callback=${callbackName}`;
        document.body.appendChild(script);
    });

    // ton3card.js を自動ロード（必要なら）
    const ton3 = document.createElement("script");
    ton3.src = "https://ton3card.tonpukusan.workers.dev/ton3card.js";
    document.body.appendChild(ton3);
});
