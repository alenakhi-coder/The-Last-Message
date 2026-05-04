
// =========================================================
// THE LAST MESSAGE — serviceworker.js
// Minimal service worker — caches key assets for offline use
// FIX: proper SW prevents PWA freeze on reopen
// =========================================================

var CACHE_NAME = 'tlm-cache-v1';

var PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js'
];

// Install — cache core assets
self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(PRECACHE_ASSETS).catch(function () {
                // If any asset fails to cache, continue anyway
            });
        })
    );
});

// Activate — clean up old caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter(function (key) { return key !== CACHE_NAME; })
                    .map(function (key) { return caches.delete(key); })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', function (event) {
    // Only handle GET requests for same-origin or cached assets
    if (event.request.method !== 'GET') return;

    var url = new URL(event.request.url);

    // Skip cross-origin requests (YouTube, Google Fonts, Catbox, etc.)
    if (url.origin !== self.location.origin) return;

    event.respondWith(
        fetch(event.request)
            .then(function (networkResponse) {
                // Cache a copy of fresh responses
                if (networkResponse.ok) {
                    var clone = networkResponse.clone();
                    caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, clone);
                    });
                }
                return networkResponse;
            })
            .catch(function () {
                // Network failed — try cache
                return caches.match(event.request).then(function (cached) {
                    return cached || new Response('Offline', { status: 503 });
                });
            })
    );
});
