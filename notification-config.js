/**
 * Notification Configuration
 * Centralized config for notification service
 */

const NotificationConfig = {
    // WebSocket Configuration
    websocket: {
        enabled: false,
        url: 'http://localhost:3000', // Change to your backend URL
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5
    },

    // Firebase Cloud Messaging Configuration
    firebase: {
        enabled: false,
        // Get from Firebase Console
        config: {
            apiKey: 'YOUR_API_KEY',
            authDomain: 'your-app.firebaseapp.com',
            projectId: 'your-project-id',
            storageBucket: 'your-project-id.appspot.com',
            messagingSenderId: 'YOUR_SENDER_ID',
            appId: 'YOUR_APP_ID'
        },
        vapidKey: 'YOUR_VAPID_PUBLIC_KEY'
    },

    // Service Configuration
    service: {
        maxRetries: 3,
        retryDelay: 1000, // milliseconds
        pollInterval: 30000, // 30 seconds for fallback polling
        soundEnabled: true,
        badgeEnabled: true,
        storageKey: 'notifications'
    },

    // Notification Types
    types: {
        assignment_created: {
            label: 'Tugas Baru',
            icon: 'tasks',
            color: '#f72585',
            priority: 'normal'
        },
        assignment_submitted: {
            label: 'Pengumpulan Tugas',
            icon: 'check-circle',
            color: '#06d6a0',
            priority: 'high'
        },
        assignment_graded: {
            label: 'Penilaian Tugas Selesai',
            icon: 'star',
            color: '#ffd166',
            priority: 'high'
        },
        grade_updated: {
            label: 'Nilai Diperbarui',
            icon: 'chart-line',
            color: '#4361ee',
            priority: 'normal'
        },
        forum_reply: {
            label: 'Forum Balasan Baru',
            icon: 'comments',
            color: '#7209b7',
            priority: 'normal'
        },
        forum_mention: {
            label: 'Forum Disebutkan',
            icon: '@',
            color: '#fb5607',
            priority: 'high'
        },
        message: {
            label: 'Pesan Baru',
            icon: 'envelope',
            color: '#3a86ff',
            priority: 'high'
        },
        class_announcement: {
            label: 'Pengumuman Kelas',
            icon: 'megaphone',
            color: '#ff006e',
            priority: 'normal'
        },
        deadline_reminder: {
            label: 'Pengingat Deadline',
            icon: 'bell',
            color: '#ff006e',
            priority: 'high'
        },
        system: {
            label: 'Sistem',
            icon: 'cog',
            color: '#6c757d',
            priority: 'normal'
        }
    },

    // Payload Structure Template
    payloadTemplate: {
        type: '', // Required: notification type from types above
        title: '', // Required: notification title
        body: '', // Required: notification body/content
        data: {
            // Optional: context data
            assignmentId: '',
            classId: '',
            userId: '',
            forumId: '',
            messageId: ''
        },
        priority: 'normal', // 'high' or 'normal'
        actionLink: '', // Where to navigate when clicked
        timestamp: new Date().toISOString()
    },

    // Sound Profiles
    sounds: {
        normal: {
            frequency: 600,
            duration: 150,
            amplitude: 0.2
        },
        high: {
            frequency: 800,
            duration: 100,
            amplitude: 0.3,
            count: 2, // Two beeps
            interval: 50
        }
    },

    // Badge Configuration
    badge: {
        enabled: true,
        position: 'top-right'
    },

    // Display Options
    display: {
        showNotificationCenter: true,
        showBrowserNotifications: true,
        showSoundNotifications: true,
        autoMarkReadAfter: null, // null = never, or milliseconds
        maxNotificationsToShow: 100
    },

    // Retry Configuration
    retry: {
        enabled: true,
        maxAttempts: 3,
        initialDelay: 1000,
        backoffMultiplier: 2,
        maxDelay: 30000
    }
};

/**
 * Initialize notification service with config
 */
function initializeNotificationService(userConfig = {}) {
    const config = {
        userId: userConfig.userId || localStorage.getItem('userId'),
        useWebSocket: NotificationConfig.websocket.enabled || userConfig.useWebSocket,
        useFirebase: NotificationConfig.firebase.enabled || userConfig.useFirebase,
        socketUrl: NotificationConfig.websocket.url,
        firebaseConfig: NotificationConfig.firebase.config,
        vapidKey: NotificationConfig.firebase.vapidKey,
        ...NotificationConfig.service,
        ...userConfig
    };

    // Create service instance
    if (typeof NotificationService !== 'undefined') {
        return new NotificationService(config);
    } else {
        console.error('NotificationService not found. Make sure to include notification-service.js');
        return null;
    }
}

/**
 * Get notification type configuration
 */
function getNotificationType(typeKey) {
    return NotificationConfig.types[typeKey] || NotificationConfig.types.system;
}

/**
 * Validate notification payload
 */
function validatePayload(payload) {
    const errors = [];

    if (!payload.type) errors.push('type is required');
    if (!payload.title) errors.push('title is required');
    if (!payload.body) errors.push('body is required');

    if (errors.length > 0) {
        console.error('Payload validation failed:', errors);
        return false;
    }

    return true;
}

/**
 * Create notification payload
 */
function createPayload(type, title, body, data = {}, priority = 'normal') {
    return {
        type,
        title,
        body,
        data,
        priority,
        timestamp: new Date().toISOString()
    };
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NotificationConfig,
        initializeNotificationService,
        getNotificationType,
        validatePayload,
        createPayload
    };
}
