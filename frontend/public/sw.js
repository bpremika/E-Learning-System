if (!self.define) {
    let e,
        s = {};
    const a = (a, n) => (
        (a = new URL(a + ".js", n).href),
        s[a] ||
            new Promise((s) => {
                if ("document" in self) {
                    const e = document.createElement("script");
                    (e.src = a), (e.onload = s), document.head.appendChild(e);
                } else (e = a), importScripts(a), s();
            }).then(() => {
                let e = s[a];
                if (!e)
                    throw new Error(`Module ${a} didn’t register its module`);
                return e;
            })
    );
    self.define = (n, i) => {
        const c =
            e ||
            ("document" in self ? document.currentScript.src : "") ||
            location.href;
        if (s[c]) return;
        let t = {};
        const r = (e) => a(e, c),
            d = { module: { uri: c }, exports: t, require: r };
        s[c] = Promise.all(n.map((e) => d[e] || r(e))).then(
            (e) => (i(...e), t)
        );
    };
}
define(["./workbox-b62942ba"], function (e) {
    "use strict";
    importScripts(),
        self.skipWaiting(),
        e.clientsClaim(),
        e.precacheAndRoute(
            [
                {
                    url: "/192.png",
                    revision: "c59ba2aee82df4a1fce39f2b053fcf96",
                },
                {
                    url: "/512.png",
                    revision: "22b576c1584373b9a5b0585112bff843",
                },
                {
                    url: "/_next/static/chunks/143-692ff10ba43ef575.js",
                    revision: "692ff10ba43ef575",
                },
                {
                    url: "/_next/static/chunks/151-35cc2073755236f6.js",
                    revision: "35cc2073755236f6",
                },
                {
                    url: "/_next/static/chunks/248-4589d7d3049589b3.js",
                    revision: "4589d7d3049589b3",
                },
                {
                    url: "/_next/static/chunks/299-4955bed13a7cc1f5.js",
                    revision: "4955bed13a7cc1f5",
                },
                {
                    url: "/_next/static/chunks/432-3785c971b380d6a5.js",
                    revision: "3785c971b380d6a5",
                },
                {
                    url: "/_next/static/chunks/442-22bfac50b4a2d51b.js",
                    revision: "22bfac50b4a2d51b",
                },
                {
                    url: "/_next/static/chunks/579-08351059519b73ca.js",
                    revision: "08351059519b73ca",
                },
                {
                    url: "/_next/static/chunks/710-5258552a76cb4602.js",
                    revision: "5258552a76cb4602",
                },
                {
                    url: "/_next/static/chunks/framework-4b7b48f62ff0b3db.js",
                    revision: "4b7b48f62ff0b3db",
                },
                {
                    url: "/_next/static/chunks/main-3e36643797b2f681.js",
                    revision: "3e36643797b2f681",
                },
                {
                    url: "/_next/static/chunks/pages/Courses-1ec9b95ebb688808.js",
                    revision: "1ec9b95ebb688808",
                },
                {
                    url: "/_next/static/chunks/pages/Courses/%5Bcoursesname%5D-353d4a392cf432d3.js",
                    revision: "353d4a392cf432d3",
                },
                {
                    url: "/_next/static/chunks/pages/Mycourses-b1737d664ebc7538.js",
                    revision: "b1737d664ebc7538",
                },
                {
                    url: "/_next/static/chunks/pages/_app-d30f59de1329c989.js",
                    revision: "d30f59de1329c989",
                },
                {
                    url: "/_next/static/chunks/pages/_error-e1150d588be41fe4.js",
                    revision: "e1150d588be41fe4",
                },
                {
                    url: "/_next/static/chunks/pages/bolonatest-d9ab6056d857c1b1.js",
                    revision: "d9ab6056d857c1b1",
                },
                {
                    url: "/_next/static/chunks/pages/coursePreviewPage-c4e11d8d2711b1e6.js",
                    revision: "c4e11d8d2711b1e6",
                },
                {
                    url: "/_next/static/chunks/pages/dashboard-3733774a36aee132.js",
                    revision: "3733774a36aee132",
                },
                {
                    url: "/_next/static/chunks/pages/index-57d122f5d5eae38c.js",
                    revision: "57d122f5d5eae38c",
                },
                {
                    url: "/_next/static/chunks/pages/loginpage-31d0023e547c8fc3.js",
                    revision: "31d0023e547c8fc3",
                },
                {
                    url: "/_next/static/chunks/pages/test-b76dd79a9284b0ee.js",
                    revision: "b76dd79a9284b0ee",
                },
                {
                    url: "/_next/static/chunks/pages/videopage-aa1f6cd521071f51.js",
                    revision: "aa1f6cd521071f51",
                },
                {
                    url: "/_next/static/chunks/pages/videopage/%5Bvideopage%5D-f616ed9764e1a85f.js",
                    revision: "f616ed9764e1a85f",
                },
                {
                    url: "/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",
                    revision: "837c0df77fd5009c9e46d446188ecfd0",
                },
                {
                    url: "/_next/static/chunks/webpack-e0bd8b8d079389d0.js",
                    revision: "e0bd8b8d079389d0",
                },
                {
                    url: "/_next/static/css/4ff1da86c6dab736.css",
                    revision: "4ff1da86c6dab736",
                },
                {
                    url: "/_next/static/css/8ac0324f3da23459.css",
                    revision: "8ac0324f3da23459",
                },
                {
                    url: "/_next/static/css/c94285925ab76bd1.css",
                    revision: "c94285925ab76bd1",
                },
                {
                    url: "/_next/static/media/primeicons.0112589c.ttf",
                    revision: "0112589c",
                },
                {
                    url: "/_next/static/media/primeicons.943ab24c.svg",
                    revision: "943ab24c",
                },
                {
                    url: "/_next/static/media/primeicons.ba3f916d.woff2",
                    revision: "ba3f916d",
                },
                {
                    url: "/_next/static/media/primeicons.f8b9e8a4.woff",
                    revision: "f8b9e8a4",
                },
                {
                    url: "/_next/static/media/primeicons.ffecb254.eot",
                    revision: "ffecb254",
                },
                {
                    url: "/_next/static/ozkRFeR-KU4TxNnY7a9tf/_buildManifest.js",
                    revision: "3be3cc72ce6c57a85961108aa408105e",
                },
                {
                    url: "/_next/static/ozkRFeR-KU4TxNnY7a9tf/_ssgManifest.js",
                    revision: "b6652df95db52feb4daf4eca35380933",
                },
                {
                    url: "/check.svg",
                    revision: "1a26679afadaa5a9510cd8dd7a7c6c25",
                },
                {
                    url: "/favicon.ico",
                    revision: "c30c7d42707a47a3f4591831641e50dc",
                },
                {
                    url: "/landingImage/Assignment.png",
                    revision: "c697ef6c0c96eee9ad42e6eb020cb6b5",
                },
                {
                    url: "/landingImage/Cleverse.png",
                    revision: "1778a3d712ca6863a3dc4d91ee73dc67",
                },
                {
                    url: "/landingImage/GT.png",
                    revision: "e7a85858dd6d75690bc5c4dca6fd6bfd",
                },
                {
                    url: "/landingImage/Git.png",
                    revision: "15e23610a826fafb6df12ec85dffca8c",
                },
                {
                    url: "/landingImage/Thinc.png",
                    revision: "dfa717b6e2e6f80610a05a7d646d349e",
                },
                {
                    url: "/landingImage/blockchain.png",
                    revision: "e1710299215ba761a9b310caaac52785",
                },
                {
                    url: "/landingImage/casualBoy.png",
                    revision: "e3b5575a3bd5891908449f816ddfdda4",
                },
                {
                    url: "/landingImage/casualBoy.svg",
                    revision: "5de4779969b19275607dfc28af4f09a7",
                },
                {
                    url: "/landingImage/casualBoyWithBG.svg",
                    revision: "2b77db95adeebb490062c779a139134f",
                },
                {
                    url: "/landingImage/girlnboy.svg",
                    revision: "3f00202a2dbce5e1523290929c1bf87c",
                },
                {
                    url: "/landingImage/holdbookgirl.svg",
                    revision: "60eabed1bf09cc98db55cabe1c3e5309",
                },
                {
                    url: "/landingImage/miniholdbook.png",
                    revision: "939cd943faf3784248fea29eeeefafa0",
                },
                {
                    url: "/landingImage/minisitgirl.png",
                    revision: "8b1f358ac7ba73906ca4ceb93bf6b6dc",
                },
                {
                    url: "/landingImage/nattee.png",
                    revision: "570d6a62055de613337571d1ea071577",
                },
                {
                    url: "/landingImage/sitfriend.png",
                    revision: "b23e1684f130185c284ec7a8e703149d",
                },
                {
                    url: "/landingImage/sitgirl.svg",
                    revision: "7f76aecee3e9446d11b31a63325edb49",
                },
                {
                    url: "/landingImage/thunder.svg",
                    revision: "9b43b4287ea80eef0f3b980158f8558a",
                },
                {
                    url: "/landingImage/vector.png",
                    revision: "583cff2dd33ffac377d351ef4577f920",
                },
                {
                    url: "/landingImage/youtube.png",
                    revision: "052aa30057226c31733ff49ef7a0d3ac",
                },
                {
                    url: "/landingImage/youtubeicon2.png",
                    revision: "616feacb34a207b3033c22d3aa71d5e8",
                },
                {
                    url: "/manifest.json",
                    revision: "d480fd910a6fd3a5ea878415338d1525",
                },
                {
                    url: "/mdi_people-group.png",
                    revision: "90dbde17071a4c2ba91a9a520f039726",
                },
                {
                    url: "/next.svg",
                    revision: "8e061864f388b47f33a1c3780831193e",
                },
                {
                    url: "/thirteen.svg",
                    revision: "53f96b8290673ef9d2895908e69b2f92",
                },
                {
                    url: "/vercel.svg",
                    revision: "61c6b19abff40ea7acd577be818f3976",
                },
            ],
            { ignoreURLParametersMatching: [] }
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            "/",
            new e.NetworkFirst({
                cacheName: "start-url",
                plugins: [
                    {
                        cacheWillUpdate: async ({
                            request: e,
                            response: s,
                            event: a,
                            state: n,
                        }) =>
                            s && "opaqueredirect" === s.type
                                ? new Response(s.body, {
                                      status: 200,
                                      statusText: "OK",
                                      headers: s.headers,
                                  })
                                : s,
                    },
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
            new e.CacheFirst({
                cacheName: "google-fonts-webfonts",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 31536e3,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
            new e.StaleWhileRevalidate({
                cacheName: "google-fonts-stylesheets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-font-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 4,
                        maxAgeSeconds: 604800,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-image-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/image\?url=.+$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-image",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 64,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp3|wav|ogg)$/i,
            new e.CacheFirst({
                cacheName: "static-audio-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:mp4)$/i,
            new e.CacheFirst({
                cacheName: "static-video-assets",
                plugins: [
                    new e.RangeRequestsPlugin(),
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:js)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-js-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:css|less)$/i,
            new e.StaleWhileRevalidate({
                cacheName: "static-style-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\/_next\/data\/.+\/.+\.json$/i,
            new e.StaleWhileRevalidate({
                cacheName: "next-data",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            /\.(?:json|xml|csv)$/i,
            new e.NetworkFirst({
                cacheName: "static-data-assets",
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                const s = e.pathname;
                return !s.startsWith("/api/auth/") && !!s.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "apis",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 16,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => {
                if (!(self.origin === e.origin)) return !1;
                return !e.pathname.startsWith("/api/");
            },
            new e.NetworkFirst({
                cacheName: "others",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 86400,
                    }),
                ],
            }),
            "GET"
        ),
        e.registerRoute(
            ({ url: e }) => !(self.origin === e.origin),
            new e.NetworkFirst({
                cacheName: "cross-origin",
                networkTimeoutSeconds: 10,
                plugins: [
                    new e.ExpirationPlugin({
                        maxEntries: 32,
                        maxAgeSeconds: 3600,
                    }),
                ],
            }),
            "GET"
        );
});
