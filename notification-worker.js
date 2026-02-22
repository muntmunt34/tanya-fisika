/**
 * Service Worker for Push Notifications
 * Handles background notifications and browser events
 */

const NOTIFICATION_CACHE = 'notifications-v1';

// Install event
self.addEventListener('install', event => {
    console.log('[Service Worker] Installing...');
    self.skipWaiting();
});

// Activate event
self.addEventListener('activate', event => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(self.clients.claim());
});

// Push notification received
self.addEventListener('push', event => {
    console.log('[Service Worker] Push notification received');

    if (!event.data) {
        console.warn('[Service Worker] No data in push event');
        return;
    }

    let payload;
    try {
        payload = event.data.json();
    } catch (error) {
        payload = {
            title: event.data.text(),
            body: 'Notification received'
        };
    }

    const notification = {
        id: payload.id || `notif_${Date.now()}`,
        type: payload.type || 'system',
        title: payload.title || 'Notification',
        body: payload.body || '',
        data: payload.data || {},
        priority: payload.priority || 'normal',
        read: false,
        timestamp: new Date().toISOString()
    };

    // Save notification
    saveNotification(notification);

    // Show notification
    const options = {
        body: notification.body,
        icon: '/assets/icon-192x192.png',
        badge: '/assets/badge-72x72.png',
        tag: notification.id,
        data: notification,
        actions: [
            { action: 'open', title: 'View' },
            { action: 'close', title: 'Dismiss' }
        ],
        badge: '/icon-72x72.png'
    };

    // Add visual indicator for priority
    if (notification.priority === 'high') {
        options.requireInteraction = true;
    }

    event.waitUntil(
        self.registration.showNotification(notification.title, options)
    );
});

// Notification click event
self.addEventListener('notificationclick', event => {
    console.log('[Service Worker] Notification clicked:', event.action);

    event.notification.close();

    const data = event.notification.data;

    if (event.action === 'open' || !event.action) {
        // Open the app
        const urlToOpen = data.actionLink || '/dashboard.html';

        event.waitUntil(
            clients.matchAll({ type: 'window', includeUncontrolled: true }).then(clientList => {
                // Check if app is already open
                for (let i = 0; i < clientList.length; i++) {
                    const client = clientList[i];
                    if (client.url === urlToOpen && 'focus' in client) {
                        return client.focus();
                    }
                }
                // If not open, open new window
                if (clients.openWindow) {
                    return clients.openWindow(urlToOpen);
                }
            })
        );

        // Mark as read
        markNotificationAsRead(data.id);
    }
});

/**
 * Save notification to IndexedDB
 */
function saveNotification(notification) {
    if (!('indexedDB' in self)) {
        console.warn('IndexedDB not available');
        return;
    }

    const request = self.indexedDB.open('NotificationsDB', 1);

    request.onerror = () => {
        console.error('Failed to open IndexedDB');
    };

    request.onupgradeneeded = event => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('notifications')) {
            db.createObjectStore('notifications', { keyPath: 'id' });
        }
    };

    request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(['notifications'], 'readwrite');
        const store = transaction.objectStore('notifications');
        store.add(notification);

        transaction.oncomplete = () => {
            console.log('✅ Notification saved to IndexedDB');
        };

        transaction.onerror = () => {
            console.error('Failed to save notification');
        };
    };
}

/**
 * Mark notification as read
 */
function markNotificationAsRead(notificationId) {
    const request = self.indexedDB.open('NotificationsDB', 1);

    request.onsuccess = event => {
        const db = event.target.result;
        const transaction = db.transaction(['notifications'], 'readwrite');
        const store = transaction.objectStore('notifications');
        const getRequest = store.get(notificationId);

        getRequest.onsuccess = () => {
            const notification = getRequest.result;
            if (notification) {
                notification.read = true;
                store.put(notification);
            }
        };
    };
}

/**
 * Handle background sync for offline notifications
 */
self.addEventListener('sync', event => {
    console.log('[Service Worker] Background sync:', event.tag);

    if (event.tag === 'sync-notifications') {
        event.waitUntil(
            syncNotifications()
        );
    }
});

async function syncNotifications() {
    try {
        const response = await fetch('/api/notifications/sync');
        const data = await response.json();

        if (data.notifications) {
            data.notifications.forEach(notification => {
                saveNotification(notification);
            });
        }

        return true;
    } catch (error) {
        console.error('Failed to sync notifications:', error);
        throw error;
    }
}

/**
 * Handle messages from clients
 */
self.addEventListener('message', event => {
    console.log('[Service Worker] Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Periodic background sync (for future use)
// Requires user permission and supportive browsers
if ('periodicSync' in self.registration) {
    // Register for periodic notification sync (daily)
    self.addEventListener('periodicsync', event => {
        if (event.tag === 'sync-notifications-daily') {
            event.waitUntil(syncNotifications());
        }
    });
}
