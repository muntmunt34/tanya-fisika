const CACHE_NAME = 'tanya-fisika-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/dashboard.html',
  '/style.css',
  '/script.js',
  '/manifest.json'
];

// Install: cache core assets
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate: clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
  self.clients.claim();
});

// Fetch: network-first for navigation and core assets, cache fallback
self.addEventListener('fetch', event => {
  const req = event.request;

  // Only handle same-origin requests
  if (!req.url.startsWith(self.location.origin)) return;

  // Network-first strategy: try fetch, then cache fallback
  event.respondWith(
    fetch(req).then(networkResponse => {
      // Update cache for core assets
      if (req.method === 'GET') {
        const respClone = networkResponse.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(req, respClone)).catch(()=>{});
      }
      return networkResponse;
    }).catch(() => caches.match(req))
  );
});

// Handle push notifications
self.addEventListener('push', event => {
  const options = {
    body: event.data?.text() || 'Anda memiliki notifikasi baru',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    tag: 'notification',
    requireInteraction: false,
    vibrate: [100, 50, 100],
    actions: [
      {
        action: 'open',
        title: 'Buka'
      },
      {
        action: 'close',
        title: 'Tutup'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Tanya Fisika', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'close') {
    return;
  }

  // Open or focus the app window
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      // Check if there's already a window open
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, open a new window
      if (clients.openWindow) {
        return clients.openWindow('/dashboard.html');
      }
    })
  );
});

// Handle notification close
self.addEventListener('notificationclose', event => {
  console.log('Notification closed');
});
// Allow client to force skipWaiting via message
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});