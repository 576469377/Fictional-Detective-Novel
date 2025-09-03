// Service Worker for The Crimson Cipher
// Provides offline reading capabilities and performance optimization

const CACHE_NAME = 'crimson-cipher-v2.1';
const STATIC_CACHE = 'crimson-cipher-static-v2.1';
const DYNAMIC_CACHE = 'crimson-cipher-dynamic-v2.1';

// Core files that should always be cached
const CORE_CACHE_FILES = [
    '/',
    '/index.html',
    '/en/index.md',
    '/zh/index.md',
    '/assets/css/styles.css',
    '/assets/css/cryptography-demo.css',
    '/assets/css/timeline-interactive.css',
    '/assets/css/content-search.css',
    '/assets/js/interactive.js',
    '/assets/js/cryptography-demo.js',
    '/assets/js/analytics.js',
    '/assets/js/content-search.js',
    '/assets/js/timeline-interactive.js',
    '/manifest.json'
];

// All chapters for complete offline reading
const CHAPTER_FILES = [
    '/en/chapters/chapter01.md', '/en/chapters/chapter02.md', '/en/chapters/chapter03.md',
    '/en/chapters/chapter04.md', '/en/chapters/chapter05.md', '/en/chapters/chapter06.md',
    '/en/chapters/chapter07.md', '/en/chapters/chapter08.md', '/en/chapters/chapter09.md',
    '/en/chapters/chapter10.md', '/en/chapters/chapter11.md', '/en/chapters/chapter12.md',
    '/zh/chapters/chapter01.md', '/zh/chapters/chapter02.md', '/zh/chapters/chapter03.md',
    '/zh/chapters/chapter04.md', '/zh/chapters/chapter05.md', '/zh/chapters/chapter06.md',
    '/zh/chapters/chapter07.md', '/zh/chapters/chapter08.md', '/zh/chapters/chapter09.md',
    '/zh/chapters/chapter10.md', '/zh/chapters/chapter11.md', '/zh/chapters/chapter12.md'
];

// Documentation files
const DOC_FILES = [
    '/docs/character-profiles-en.md', '/docs/character-profiles-zh.md',
    '/docs/cryptography-guide-en.md', '/docs/cryptography-guide-zh.md',
    '/docs/cryptography-interactive.md', '/docs/timeline-en.md', '/docs/timeline-zh.md',
    '/docs/timeline-interactive.md', '/docs/readers-guide-en.md', '/docs/readers-guide-zh.md',
    '/docs/content-search.md', '/docs/project-documentation.md'
];

// Install event - cache resources with strategy
self.addEventListener('install', function(event) {
    event.waitUntil(
        Promise.all([
            // Cache core files immediately
            caches.open(STATIC_CACHE).then(cache => {
                console.log('Crimson Cipher: Caching core files');
                return cache.addAll(CORE_CACHE_FILES.map(url => {
                    return new Request(url, { cache: 'no-cache' });
                }));
            }),
            // Cache chapters and docs (can fail partially)
            caches.open(DYNAMIC_CACHE).then(cache => {
                console.log('Crimson Cipher: Caching content files');
                return Promise.allSettled(
                    [...CHAPTER_FILES, ...DOC_FILES].map(url => {
                        return cache.add(new Request(url, { cache: 'no-cache' }))
                            .catch(error => console.log(`Failed to cache ${url}:`, error));
                    })
                );
            })
        ])
        .then(() => {
            console.log('Crimson Cipher: Service Worker installed successfully');
            self.skipWaiting();
        })
        .catch(error => {
            console.log('Crimson Cipher: Service Worker installation failed:', error);
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                        console.log('Crimson Cipher: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Crimson Cipher: Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - intelligent caching strategy
self.addEventListener('fetch', function(event) {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }
    
    // Skip external requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }
    
    event.respondWith(
        caches.match(event.request).then(function(cachedResponse) {
            // Return cached version if available
            if (cachedResponse) {
                // For core files, also try to update cache in background
                if (CORE_CACHE_FILES.some(file => event.request.url.endsWith(file))) {
                    fetch(event.request).then(networkResponse => {
                        if (networkResponse.ok) {
                            caches.open(STATIC_CACHE).then(cache => {
                                cache.put(event.request, networkResponse.clone());
                            });
                        }
                    }).catch(() => {}); // Ignore network errors
                }
                return cachedResponse;
            }
            
            // If not in cache, fetch from network
            return fetch(event.request).then(function(networkResponse) {
                // Don't cache if not successful
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }
                
                // Clone response before caching
                const responseToCache = networkResponse.clone();
                
                // Determine which cache to use
                const cacheToUse = CORE_CACHE_FILES.some(file => event.request.url.endsWith(file)) 
                    ? STATIC_CACHE 
                    : DYNAMIC_CACHE;
                
                caches.open(cacheToUse).then(function(cache) {
                    cache.put(event.request, responseToCache);
                });
                
                return networkResponse;
            }).catch(function() {
                // Network failed, try to provide offline fallback
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
                
                // For other resources, return a generic offline response
                return new Response('Offline - content not available', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: { 'Content-Type': 'text/plain' }
                });
            });
        })
    );
});

// Background sync for analytics data
self.addEventListener('sync', function(event) {
    if (event.tag === 'analytics-sync') {
        event.waitUntil(syncAnalyticsData());
    }
});

// Sync analytics data when online
function syncAnalyticsData() {
    // For privacy, we keep all analytics local, so this is a placeholder
    return Promise.resolve();
}

// Message handler for cache status and other commands
self.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'GET_CACHE_STATUS') {
        caches.keys().then(cacheNames => {
            const status = {
                caches: cacheNames,
                version: CACHE_NAME,
                timestamp: new Date().toISOString()
            };
            event.ports[0].postMessage(status);
        });
    }
    
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Crimson Cipher Service Worker: Registered successfully');