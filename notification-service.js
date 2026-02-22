/**
 * Real-Time Notification Service
 * Supports WebSocket (Socket.io) and Firebase Cloud Messaging
 * Features: Auto-retry, badge count, sound alerts, PWA support
 */

class NotificationService {
    constructor(config = {}) {
        this.config = {
            useWebSocket: config.useWebSocket || false,
            useFirebase: config.useFirebase || false,
            userId: config.userId || localStorage.getItem('userId'),
            maxRetries: config.maxRetries || 3,
            retryDelay: config.retryDelay || 1000,
            soundEnabled: config.soundEnabled !== false,
            badgeEnabled: config.badgeEnabled !== true,
            ...config
        };

        this.socket = null;
        this.notifications = [];
        this.unreadCount = 0;
        this.listeners = [];
        this.retryQueue = [];
        this.isOnline = navigator.onLine;

        this.init();
    }

    /**
     * Initialize notification service
     */
    async init() {
        // Register Service Worker for PWA support
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('notification-worker.js');
                console.log('✅ Service Worker registered');
            } catch (error) {
                console.error('❌ Service Worker registration failed:', error);
            }
        }

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        // Listen for online/offline events
        window.addEventListener('online', () => this.handleOnline());
        window.addEventListener('offline', () => this.handleOffline());

        // Load notifications from localStorage
        this.loadFromStorage();

        // Initialize WebSocket or Firebase
        if (this.config.useWebSocket) {
            this.initWebSocket();
        } else if (this.config.useFirebase) {
            this.initFirebase();
        } else {
            // Fallback to polling
            this.initPolling();
        }

        // Update badge on init
        this.updateBadge();
    }

    /**
     * Initialize WebSocket connection using Socket.io
     */
    initWebSocket() {
        // Include Socket.io client library first:
        // <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>

        if (typeof io === 'undefined') {
            console.warn('⚠️ Socket.io not loaded. Install: <script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>');
            return;
        }

        try {
            this.socket = io(this.config.socketUrl || 'http://localhost:3000', {
                auth: {
                    userId: this.config.userId,
                    token: localStorage.getItem('authToken')
                },
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: 5
            });

            // Connection events
            this.socket.on('connect', () => {
                console.log('✅ WebSocket connected');
                this.processRetryQueue();
            });

            this.socket.on('disconnect', () => {
                console.log('❌ WebSocket disconnected');
            });

            // Real-time notification listener
            this.socket.on('notification', (payload) => {
                this.handleNotification(payload);
            });

            // Batch notifications
            this.socket.on('notifications:batch', (notifications) => {
                notifications.forEach(notif => this.handleNotification(notif));
            });

            // Error handling
            this.socket.on('error', (error) => {
                console.error('WebSocket error:', error);
            });

        } catch (error) {
            console.error('WebSocket initialization failed:', error);
        }
    }

    /**
     * Initialize Firebase Cloud Messaging
     */
    async initFirebase() {
        // Include Firebase libraries first:
        // <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-app.js"></script>
        // <script src="https://www.gstatic.com/firebasejs/9.x.x/firebase-messaging.js"></script>

        if (typeof firebase === 'undefined') {
            console.warn('⚠️ Firebase not loaded. Install Firebase SDK');
            return;
        }

        try {
            // Initialize Firebase (ensure firebaseConfig is set)
            if (!firebase.apps.length) {
                firebase.initializeApp(this.config.firebaseConfig);
            }

            const messaging = firebase.messaging();

            // Request permission
            if (Notification.permission === 'granted') {
                const token = await messaging.getToken({
                    vapidKey: this.config.vapidKey
                });
                console.log('📱 FCM Token:', token);
                this.sendTokenToServer(token);
            }

            // Listen for foreground messages
            messaging.onMessage((payload) => {
                console.log('📬 Message received:', payload);
                this.handleNotification(payload.data || payload.notification);
            });

            console.log('✅ Firebase Cloud Messaging initialized');

        } catch (error) {
            console.error('Firebase initialization failed:', error);
        }
    }

    /**
     * Fallback polling method
     */
    initPolling() {
        setInterval(() => {
            this.fetchNotifications();
        }, this.config.pollInterval || 30000); // Poll every 30 seconds
    }

    /**
     * Handle incoming notification
     */
    async handleNotification(payload) {
        // Validate payload structure
        const notification = this.validatePayload(payload);
        if (!notification) return;

        // Store notification
        this.addNotification(notification);

        // Play sound if enabled
        if (this.config.soundEnabled) {
            this.playSound(notification.priority);
        }

        // Show browser notification if in background
        if (document.hidden) {
            this.showBrowserNotification(notification);
        }

        // Update badge
        this.updateBadge();

        // Trigger listeners
        this.notifyListeners('notification:received', notification);

        // Show browser notification for high priority
        if (notification.priority === 'high') {
            this.showBrowserNotification(notification);
        }
    }

    /**
     * Validate notification payload structure
     */
    validatePayload(payload) {
        const required = ['type', 'title', 'body'];
        const missing = required.filter(field => !payload[field]);

        if (missing.length > 0) {
            console.warn('⚠️ Notification payload missing fields:', missing);
            return null;
        }

        return {
            id: payload.id || this.generateId(),
            type: payload.type, // 'assignment_created', 'assignment_submitted', etc
            title: payload.title,
            body: payload.body,
            data: payload.data || {}, // { assignmentId, classId, userId, etc }
            priority: payload.priority || 'normal', // 'high' or 'normal'
            read: false,
            timestamp: payload.timestamp || new Date().toISOString(),
            actionLink: this.generateActionLink(payload)
        };
    }

    /**
     * Generate action link based on notification type
     */
    generateActionLink(payload) {
        const baseUrl = '../';
        const type = payload.type;

        switch (type) {
            case 'assignment_created':
            case 'assignment_submitted':
            case 'grade_updated':
                return `${baseUrl}pages/kelas.html?classId=${payload.data?.classId || ''}`;
            case 'forum_reply':
                return `${baseUrl}pages/forum.html?forumId=${payload.data?.forumId || ''}`;
            case 'message':
                return `${baseUrl}pages/messages.html?userId=${payload.data?.senderId || ''}`;
            default:
                return `${baseUrl}pages/notifikasi.html`;
        }
    }

    /**
     * Add notification to storage and memory
     */
    addNotification(notification) {
        try {
            // If a baseline timestamp exists for the current session (students), ignore older notifications
            const baseline = sessionStorage.getItem('notif_baseline_ts');
            const userRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole') || 'siswa';
            if (baseline && userRole === 'siswa') {
                const baseTs = parseInt(baseline, 10) || 0;
                const notifTs = notification && notification.timestamp ? (new Date(notification.timestamp)).getTime() : Date.now();
                if (notifTs <= baseTs) {
                    // ignore old notification for students
                    console.log('⚪ Ignored old notification (before baseline)');
                    return;
                }
            }

            this.notifications.unshift(notification);
        } catch (e) {
            console.error('addNotification error:', e);
            this.notifications.unshift(notification);
        }

        // Keep only last 100 notifications
        if (this.notifications.length > 100) {
            this.notifications = this.notifications.slice(0, 100);
        }

        // Save to localStorage
        this.saveToStorage();

        // Update unread count
        this.updateUnreadCount();
    }

    /**
     * Fetch notifications from server
     */
    async fetchNotifications() {
        try {
            const response = await fetch(`/api/notifications?userId=${this.config.userId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (!response.ok) throw new Error('Failed to fetch');

            const data = await response.json();
            const newNotifications = data.notifications || [];

            // Check for new notifications
            const existingIds = new Set(this.notifications.map(n => n.id));
            const newOnes = newNotifications.filter(n => !existingIds.has(n.id));

            newOnes.forEach(notif => {
                this.handleNotification(notif);
            });

        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        }
    }

    /**
     * Send notification (from client to server)
     */
    async sendNotification(payload, targetUserId) {
        try {
            const fullPayload = {
                ...payload,
                senderId: this.config.userId,
                timestamp: new Date().toISOString()
            };

            if (this.socket && this.socket.connected) {
                // Use WebSocket if available
                this.socket.emit('notification:send', {
                    targetUserId,
                    ...fullPayload
                });
            } else {
                // Fallback to HTTP with retry
                await this.retryFetch('/api/notifications/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    },
                    body: JSON.stringify({
                        targetUserId,
                        ...fullPayload
                    })
                });
            }

            this.notifyListeners('notification:sent', payload);
            return true;

        } catch (error) {
            console.error('Failed to send notification:', error);
            this.addToRetryQueue(payload, targetUserId);
            return false;
        }
    }

    /**
     * Retry fetch with exponential backoff
     */
    async retryFetch(url, options, attempt = 0) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return response;

        } catch (error) {
            if (attempt < this.config.maxRetries) {
                const delay = this.config.retryDelay * Math.pow(2, attempt);
                console.log(`🔄 Retrying in ${delay}ms... (attempt ${attempt + 1})`);
                
                await new Promise(resolve => setTimeout(resolve, delay));
                return this.retryFetch(url, options, attempt + 1);
            }

            throw error;
        }
    }

    /**
     * Add failed notification to retry queue
     */
    addToRetryQueue(payload, targetUserId) {
        this.retryQueue.push({
            payload,
            targetUserId,
            timestamp: Date.now(),
            attempts: 0
        });

        console.log('📋 Added to retry queue:', this.retryQueue.length, 'items');
    }

    /**
     * Process retry queue when coming back online
     */
    async processRetryQueue() {
        while (this.retryQueue.length > 0) {
            const item = this.retryQueue.shift();

            try {
                await this.sendNotification(item.payload, item.targetUserId);
                console.log('✅ Retried notification sent successfully');
            } catch (error) {
                console.error('Failed to retry:', error);
                this.retryQueue.unshift(item); // Put back in queue
                break; // Stop processing
            }
        }
    }

    /**
     * Send token to server for push notifications
     */
    async sendTokenToServer(token) {
        try {
            await fetch('/api/notification-tokens', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify({
                    userId: this.config.userId,
                    token,
                    platform: 'web'
                })
            });
        } catch (error) {
            console.error('Failed to send token:', error);
        }
    }

    /**
     * Play notification sound
     */
    playSound(priority = 'normal') {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            if (priority === 'high') {
                // High priority: two beeps
                oscillator.frequency.value = 800;
                gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);

                oscillator.start(audioContext.currentTime + 0.15);
                oscillator.stop(audioContext.currentTime + 0.25);
            } else {
                // Normal: single beep
                oscillator.frequency.value = 600;
                gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.15);
            }
        } catch (error) {
            console.error('Failed to play sound:', error);
        }
    }

    /**
     * Show browser notification
     */
    showBrowserNotification(notification) {
        if (!('Notification' in window)) return;
        if (Notification.permission !== 'granted') return;

        new Notification(notification.title, {
            body: notification.body,
            icon: '../assets/icon-192x192.png',
            badge: '../assets/badge-72x72.png',
            tag: notification.id,
            data: notification.data,
            actions: [
                { action: 'open', title: 'View' },
                { action: 'close', title: 'Dismiss' }
            ]
        });
    }

    /**
     * Update badge count
     */
    updateBadge() {
        const unread = this.notifications.filter(n => !n.read).length;

        if (this.config.badgeEnabled && 'setAppBadge' in navigator) {
            if (unread > 0) {
                navigator.setAppBadge(unread);
            } else {
                navigator.clearAppBadge();
            }
        }

        // Update DOM badge
        const badgeElement = document.getElementById('unreadCount');
        if (badgeElement) {
            badgeElement.textContent = unread;
            badgeElement.style.display = unread > 0 ? 'block' : 'none';
        }

        this.notifyListeners('badge:updated', unread);
    }

    /**
     * Mark notification as read
     */
    markAsRead(notificationId) {
        const notification = this.notifications.find(n => n.id === notificationId);
        if (notification) {
            notification.read = true;
            this.saveToStorage();
            this.updateBadge();
            this.notifyListeners('notification:read', notification);
        }
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.saveToStorage();
        this.updateBadge();
        this.notifyListeners('notifications:all-read', this.notifications);
    }

    /**
     * Delete notification
     */
    deleteNotification(notificationId) {
        const index = this.notifications.findIndex(n => n.id === notificationId);
        if (index > -1) {
            const deleted = this.notifications.splice(index, 1)[0];
            this.saveToStorage();
            this.updateBadge();
            this.notifyListeners('notification:deleted', deleted);
        }
    }

    /**
     * Get notifications filtered by type
     */
    getNotifications(type = null) {
        if (!type) return this.notifications;
        return this.notifications.filter(n => n.type === type);
    }

    /**
     * Update unread count
     */
    updateUnreadCount() {
        this.unreadCount = this.notifications.filter(n => !n.read).length;
    }

    /**
     * Save notifications to localStorage
     */
    saveToStorage() {
        try {
            localStorage.setItem('notifications', JSON.stringify(this.notifications));
        } catch (error) {
            console.error('Failed to save notifications:', error);
        }
    }

    /**
     * Load notifications from localStorage
     */
    loadFromStorage() {
        try {
            const stored = localStorage.getItem('notifications');
            if (stored) {
                this.notifications = JSON.parse(stored);
                this.updateUnreadCount();
            }
        } catch (error) {
            console.error('Failed to load notifications:', error);
            this.notifications = [];
        }
    }

    /**
     * Subscribe to notifications
     */
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(l => l !== callback);
        };
    }

    /**
     * Notify all listeners
     */
    notifyListeners(event, data) {
        this.listeners.forEach(callback => {
            try {
                callback({ event, data });
            } catch (error) {
                console.error('Listener error:', error);
            }
        });
    }

    /**
     * Handle coming online
     */
    handleOnline() {
        console.log('✅ Back online');
        this.isOnline = true;
        this.processRetryQueue();
        this.fetchNotifications();
    }

    /**
     * Handle going offline
     */
    handleOffline() {
        console.log('❌ Offline');
        this.isOnline = false;
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Disconnect WebSocket
     */
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }

    /**
     * Get statistics
     */
    getStats() {
        return {
            total: this.notifications.length,
            unread: this.unreadCount,
            read: this.notifications.length - this.unreadCount,
            byType: this.notifications.reduce((acc, n) => {
                acc[n.type] = (acc[n.type] || 0) + 1;
                return acc;
            }, {}),
            retryQueueSize: this.retryQueue.length
        };
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NotificationService;
}
