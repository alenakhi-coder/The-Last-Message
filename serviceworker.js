/* =====================================================
   The Last Message — Service Worker
   Cache-first for local assets, network-first for remote
   ===================================================== */

const CACHE_NAME    = 'tlm-cache-v1';
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json'
];

/* ── Install: pre-cache shell ── */
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(STATIC_ASSETS);
        }).catch(function() {
            /* silently fail if a resource isn't available yet */
        })
    );
    self.skipWaiting();
});

/* ── Activate: purge stale caches ── */
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(keys) {
            return Promise.all(
                keys
                    .filter(function(key) { return key !== CACHE_NAME; })
                    .map(function(key) { return caches.delete(key); })
            );
        })
    );
    self.clients.claim();
});

/* ── Fetch: cache-first for same-origin, network-first for external ── */
self.addEventListener('fetch', function(event) {
    var url = new URL(event.request.url);

    /* Only handle GET requests */
    if (event.request.method !== 'GET') return;

    /* Skip chrome-extension and non-http requests */
    if (!url.protocol.startsWith('http')) return;

    /* Same-origin assets: cache-first */
    if (url.origin === location.origin) {
        event.respondWith(
            caches.match(event.request).then(function(cached) {
                if (cached) return cached;
                return fetch(event.request).then(function(response) {
                    if (!response || response.status !== 200 || response.type === 'error') {
                        return response;
                    }
                    var cloned = response.clone();
                    caches.open(CACHE_NAME).then(function(cache) {
                        cache.put(event.request, cloned);
                    });
                    return response;
                }).catch(function() {
                    return caches.match('/index.html');
                });
            })
        );
        return;
    }

    /* External resources (fonts, images, YouTube, etc.): network-first with cache fallback */
    event.respondWith(
        fetch(event.request).then(function(response) {
            if (!response || response.status !== 200) return response;
            var cloned = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
                cache.put(event.request, cloned);
            });
            return response;
        }).catch(function() {
            return caches.match(event.request);
        })
    );
});
