document.addEventListener("DOMContentLoaded", () => {
    if (!window.blogConfig || !window.blogConfig.latestPosts) return;

    const blogs = window.blogConfig.latestPosts;
    let loadedCount = 0;

    blogs.forEach((blog, index) => {
        const callbackName = `latestPostCallback_${index}`;

        window[callbackName] = function (data) {
            if (data.feed.entry && data.feed.entry.length > 0) {
                const entry = data.feed.entry[0];
                const link = entry.link.find(l => l.rel === "alternate");
                const postUrl = link ? link.href : "";

                const target = document.getElementById(blog.id);
                if (target) {
                    target.innerHTML = `<div class="ton3-card" data-url="${postUrl}"></div>`;
                }
            }

            loadedCount++;

            // 全ブログの JSONP が完了したら ton3card.js を実行
            if (loadedCount === blogs.length) {
                const ton3 = document.createElement("script");
                ton3.src = "https://ton3card.tonpukusan.workers.dev/ton3card.js";
                document.body.appendChild(ton3);
            }
        };

        const script = document.createElement("script");
        script.src = `${blog.feed}&callback=${callbackName}`;
        document.body.appendChild(script);
    });
});
