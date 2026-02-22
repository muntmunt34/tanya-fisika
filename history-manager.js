/**
 * HistoryManager — Recently Accessed History for Tanya Fisika
 * Stores history in localStorage, 50-item cap, dedup by URL.
 * Auto-records on DOMContentLoaded if body has data-content-type.
 *
 * Usage:
 *   <body data-content-type="materi">
 *   <script src="history-manager.js"></script>
 *
 * API:
 *   HistoryManager.recordAccess(contentType, title, urlPath, opts)
 *   HistoryManager.getHistory(limit, contentType)
 *   HistoryManager.deleteItem(id)
 *   HistoryManager.clearAll()
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'tanyaFisika_history';
    var MAX_ITEMS = 50;

    // --- Helpers ---
    function getUserId() {
        return sessionStorage.getItem('userEmail') ||
            localStorage.getItem('userEmail') || '_guest';
    }

    function generateId() {
        return 'h_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    }

    function loadAll() {
        try {
            var data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
            return Array.isArray(data) ? data : [];
        } catch (e) { return []; }
    }

    function saveAll(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { }
    }

    function iconForType(type) {
        var map = {
            'materi': 'fas fa-book-open',
            'kelas': 'fas fa-school',
            'forum': 'fas fa-comments',
            'bank_soal': 'fas fa-clipboard-list'
        };
        return map[type] || 'fas fa-history';
    }

    function labelForType(type) {
        var map = {
            'materi': 'Materi',
            'kelas': 'Kelas',
            'forum': 'Forum',
            'bank_soal': 'Bank Soal'
        };
        return map[type] || type;
    }

    function timeAgo(dateStr) {
        var seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
        if (seconds < 60) return 'Baru saja';
        var minutes = Math.floor(seconds / 60);
        if (minutes < 60) return minutes + ' menit lalu';
        var hours = Math.floor(minutes / 60);
        if (hours < 24) return hours + ' jam lalu';
        var days = Math.floor(hours / 24);
        if (days === 1) return 'Kemarin';
        if (days < 7) return days + ' hari lalu';
        var weeks = Math.floor(days / 7);
        if (weeks < 5) return weeks + ' minggu lalu';
        return Math.floor(days / 30) + ' bulan lalu';
    }

    // --- Core Methods ---

    /**
     * Record a content access.
     * If same urlPath exists for this user, update timestamp (no duplicate).
     */
    function recordAccess(contentType, title, urlPath, opts) {
        opts = opts || {};
        var userId = getUserId();
        var all = loadAll();

        // Find existing entry with same URL for this user
        var existingIdx = -1;
        for (var i = 0; i < all.length; i++) {
            if (all[i].userId === userId && all[i].urlPath === urlPath) {
                existingIdx = i;
                break;
            }
        }

        if (existingIdx >= 0) {
            // Update existing: move to front, update timestamp
            var entry = all.splice(existingIdx, 1)[0];
            entry.accessedAt = new Date().toISOString();
            entry.title = title || entry.title;
            if (opts.progress !== undefined) entry.progress = opts.progress;
            all.unshift(entry);
        } else {
            // Create new entry
            var newEntry = {
                id: generateId(),
                userId: userId,
                contentType: contentType || 'materi',
                title: title || document.title || 'Untitled',
                urlPath: urlPath,
                icon: opts.icon || iconForType(contentType),
                accessedAt: new Date().toISOString(),
                progress: opts.progress || null
            };
            all.unshift(newEntry);
        }

        // Cap at MAX_ITEMS for this user
        var userCount = 0;
        var filtered = [];
        for (var j = 0; j < all.length; j++) {
            if (all[j].userId === userId) {
                userCount++;
                if (userCount > MAX_ITEMS) continue; // drop oldest
            }
            filtered.push(all[j]);
        }

        saveAll(filtered);
    }

    /**
     * Get history for current user.
     * @param {number} limit - max items (default 20)
     * @param {string|null} contentType - filter by type
     * @returns {Array}
     */
    function getHistory(limit, contentType) {
        limit = limit || 20;
        var userId = getUserId();
        var all = loadAll();
        var results = [];

        for (var i = 0; i < all.length; i++) {
            if (all[i].userId !== userId) continue;
            if (contentType && all[i].contentType !== contentType) continue;
            results.push(all[i]);
            if (results.length >= limit) break;
        }

        return results;
    }

    /**
     * Delete a single history item by ID.
     */
    function deleteItem(id) {
        var all = loadAll();
        var filtered = [];
        for (var i = 0; i < all.length; i++) {
            if (all[i].id !== id) filtered.push(all[i]);
        }
        saveAll(filtered);
    }

    /**
     * Clear all history for current user.
     */
    function clearAll() {
        var userId = getUserId();
        var all = loadAll();
        var filtered = [];
        for (var i = 0; i < all.length; i++) {
            if (all[i].userId !== userId) filtered.push(all[i]);
        }
        saveAll(filtered);
    }

    // --- Auto-record on page load ---
    function autoRecord() {
        var body = document.body;
        if (!body) return;

        var contentType = body.getAttribute('data-content-type');
        if (!contentType) return; // no data attribute = don't record

        var title = document.title.replace(' - Tanya Fisika', '').replace(' | Tanya Fisika', '').trim();
        var urlPath = window.location.pathname;
        // Normalize path: strip leading / or keep relative
        if (urlPath.indexOf('/pages/') !== -1) {
            urlPath = 'pages/' + urlPath.split('/pages/')[1];
        } else {
            // Just use the filename
            urlPath = urlPath.substring(urlPath.lastIndexOf('/') + 1) || 'index.html';
        }

        recordAccess(contentType, title, urlPath);

        // Also trigger streak recording if StreakManager is loaded
        try {
            if (window.StreakManager && window.StreakManager.recordActivity) {
                window.StreakManager.recordActivity();
            }
        } catch (e) { }
    }

    // Auto-record when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoRecord);
    } else {
        autoRecord();
    }

    // --- Expose API ---
    window.HistoryManager = {
        recordAccess: recordAccess,
        getHistory: getHistory,
        deleteItem: deleteItem,
        clearAll: clearAll,
        timeAgo: timeAgo,
        iconForType: iconForType,
        labelForType: labelForType
    };

})();
