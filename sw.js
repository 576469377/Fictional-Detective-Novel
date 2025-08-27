// Service Worker for The Crimson Cipher
// Provides offline reading capabilities and performance optimization

const CACHE_NAME = 'crimson-cipher-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/en/index.md',
    '/zh/index.md',
    '/en/chapters/chapter01.md',
    '/en/chapters/chapter02.md',
    '/en/chapters/chapter03.md',
    '/en/chapters/chapter04.md',
    '/zh/chapters/chapter01.md',
    '/zh/chapters/chapter02.md',
    '/zh/chapters/chapter03.md',
    '/zh/chapters/chapter04.md',
    '/assets/css/styles.css',
    '/assets/css/cryptography-demo.css',
    '/assets/js/interactive.js',
    '/assets/js/cryptography-demo.js',
    '/assets/js/analytics.js',
    '/docs/character-profiles-en.md',
    '/docs/cryptography-guide-en.md',
    '/docs/cryptography-interactive.md',
    '/docs/timeline-en.md',
    '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Crimson Cipher: Caching app shell');
                return cache.addAll(urlsToCache.map(url => {
                    return new Request(url, { cache: 'no-cache' });
                }));
            })
            .catch(function(error) {
                console.log('Crimson Cipher: Cache installation failed:', error);
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                // Return cached version if available
                if (response) {
                    return response;
                }
                
                // Clone the request because it's a stream
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(function(response) {
                    // Check if valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    // Clone the response because it's a stream
                    const responseToCache = response.clone();
                    
                    // Add to cache for future use
                    caches.open(CACHE_NAME)
                        .then(function(cache) {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                }).catch(function() {
                    // Network failed, serve offline page if available
                    if (event.request.mode === 'navigate') {
                        return caches.match('/');
                    }
                });
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Crimson Cipher: Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Background sync for analytics data
self.addEventListener('sync', function(event) {
    if (event.tag === 'analytics-sync') {
        event.waitUntil(syncAnalyticsData());
    }
});

async function syncAnalyticsData() {
    try {
        // In a real implementation, this would sync analytics data to a server
        console.log('Crimson Cipher: Syncing analytics data...');
        
        // Simulate data sync
        const analyticsData = await getStoredAnalytics();
        if (analyticsData && analyticsData.length > 0) {
            console.log('Crimson Cipher: Analytics data synced:', analyticsData.length, 'events');
            // Clear synced data
            await clearSyncedAnalytics();
        }
    } catch (error) {
        console.log('Crimson Cipher: Analytics sync failed:', error);
    }
}

function getStoredAnalytics() {
    return new Promise((resolve) => {
        // This would retrieve analytics data from IndexedDB in a real implementation
        resolve([]);
    });
}

function clearSyncedAnalytics() {
    return new Promise((resolve) => {
        // This would clear synced data from IndexedDB
        resolve();
    });
}

// Push notification support (for future features)
self.addEventListener('push', function(event) {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/images/icon-192.png',
            badge: '/assets/images/badge-72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Read Now',
                    icon: '/assets/images/book-icon.png'
                },
                {
                    action: 'close',
                    title: 'Close',
                    icon: '/assets/images/close-icon.png'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Handle notification clicks
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    
    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

console.log('Crimson Cipher Service Worker: Registered successfully');