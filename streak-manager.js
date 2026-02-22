/**
 * StreakManager — TikTok-style Daily Streak for Tanya Fisika
 * Stores streak data in localStorage. Integrates with HistoryManager.
 *
 * Flame levels:
 *   1-6   → small  (static orange)
 *   7-29  → medium (animated sway)
 *   30+   → large  (glowing pulse)
 *
 * Milestones: 7, 15, 30, 60, 100 days
 *
 * API:
 *   StreakManager.recordActivity()
 *   StreakManager.getData()
 *   StreakManager.getFlameLevel()
 *   StreakManager.getNextMilestone()
 *   StreakManager.getMilestones()
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'tanyaFisika_streak';
    var MAX_CALENDAR_DAYS = 90;

    var MILESTONES = [
        { day: 7, badge: '7-Day Streaker', reward: 100, icon: '🔥' },
        { day: 15, badge: 'Consistent Learner', reward: 250, icon: '⚡' },
        { day: 30, badge: 'Dedicated', reward: 500, icon: '🌟' },
        { day: 60, badge: 'Committed', reward: 1000, icon: '💎' },
        { day: 100, badge: 'Streak Master', reward: 2500, icon: '👑' }
    ];

    // --- Helpers ---
    function todayStr() {
        var d = new Date();
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function yesterdayStr() {
        var d = new Date();
        d.setDate(d.getDate() - 1);
        return d.getFullYear() + '-' +
            String(d.getMonth() + 1).padStart(2, '0') + '-' +
            String(d.getDate()).padStart(2, '0');
    }

    function daysBetween(dateStr1, dateStr2) {
        var d1 = new Date(dateStr1 + 'T00:00:00');
        var d2 = new Date(dateStr2 + 'T00:00:00');
        return Math.round(Math.abs(d2 - d1) / (1000 * 60 * 60 * 24));
    }

    function load() {
        try {
            var data = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (data && typeof data === 'object' && data.currentStreak !== undefined) return data;
        } catch (e) { }
        return null;
    }

    function save(data) {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) { }
    }

    function createDefault(today) {
        return {
            currentStreak: 0,
            longestStreak: 0,
            lastActivityDate: null,
            streakStartDate: null,
            activeDays: [],
            milestones: {}
        };
    }

    // --- Core ---

    /**
     * Record today's activity. Handles all 4 cases:
     * 1) First time → streak = 1
     * 2) Already active today → skip
     * 3) Active yesterday → streak + 1
     * 4) Gap > 1 day → reset to 1
     *
     * Returns { streak, status } where status is 'new'|'already'|'increased'|'reset'
     */
    function recordActivity() {
        var today = todayStr();
        var yesterday = yesterdayStr();
        var data = load();

        if (!data) {
            // CASE 1: First time ever
            data = createDefault(today);
            data.currentStreak = 1;
            data.longestStreak = 1;
            data.lastActivityDate = today;
            data.streakStartDate = today;
            data.activeDays = [today];
            save(data);
            checkMilestones(data);
            return { streak: 1, status: 'new' };
        }

        // CASE 2: Already active today
        if (data.lastActivityDate === today) {
            return { streak: data.currentStreak, status: 'already' };
        }

        // CASE 3: Active yesterday → increment
        if (data.lastActivityDate === yesterday) {
            data.currentStreak = (data.currentStreak || 0) + 1;
            data.lastActivityDate = today;
            if (data.currentStreak > data.longestStreak) {
                data.longestStreak = data.currentStreak;
            }
            // Add to calendar
            if (!data.activeDays) data.activeDays = [];
            data.activeDays.push(today);
            // Cap calendar entries
            if (data.activeDays.length > MAX_CALENDAR_DAYS) {
                data.activeDays = data.activeDays.slice(-MAX_CALENDAR_DAYS);
            }
            save(data);
            checkMilestones(data);
            return { streak: data.currentStreak, status: 'increased' };
        }

        // CASE 4: Gap > 1 day → reset
        data.currentStreak = 1;
        data.lastActivityDate = today;
        data.streakStartDate = today;
        if (!data.activeDays) data.activeDays = [];
        data.activeDays.push(today);
        if (data.activeDays.length > MAX_CALENDAR_DAYS) {
            data.activeDays = data.activeDays.slice(-MAX_CALENDAR_DAYS);
        }
        save(data);
        return { streak: 1, status: 'reset' };
    }

    /**
     * Get full streak data.
     */
    function getData() {
        var data = load();
        if (!data) return createDefault(todayStr());

        // Auto-check if streak should be shown as broken (gap > 1 from today)
        if (data.lastActivityDate) {
            var gap = daysBetween(data.lastActivityDate, todayStr());
            if (gap > 1) {
                // Streak is stale but we don't reset until next activity
                // UI can show warning
                data._stale = true;
            }
        }
        return data;
    }

    /**
     * Get flame level based on current streak.
     * Returns 'small', 'medium', or 'large'
     */
    function getFlameLevel(streak) {
        if (streak === undefined) {
            var d = getData();
            streak = d.currentStreak || 0;
        }
        if (streak >= 30) return 'large';
        if (streak >= 7) return 'medium';
        return 'small';
    }

    /**
     * Get the flame CSS class for styling.
     */
    function getFlameClass(streak) {
        return 'flame-' + getFlameLevel(streak);
    }

    /**
     * Get next unclaimed milestone.
     */
    function getNextMilestone() {
        var data = getData();
        var current = data.currentStreak || 0;
        for (var i = 0; i < MILESTONES.length; i++) {
            if (!data.milestones || !data.milestones[MILESTONES[i].day]) {
                return {
                    milestone: MILESTONES[i],
                    daysLeft: Math.max(0, MILESTONES[i].day - current),
                    progress: Math.min(100, Math.round((current / MILESTONES[i].day) * 100))
                };
            }
        }
        // All milestones claimed
        return null;
    }

    /**
     * Get all milestones with claim status.
     */
    function getMilestones() {
        var data = getData();
        return MILESTONES.map(function (m) {
            return {
                day: m.day,
                badge: m.badge,
                reward: m.reward,
                icon: m.icon,
                claimed: !!(data.milestones && data.milestones[m.day]),
                claimedAt: (data.milestones && data.milestones[m.day]) || null
            };
        });
    }

    /**
     * Check and auto-claim milestones.
     */
    function checkMilestones(data) {
        if (!data) data = getData();
        var current = data.currentStreak || 0;
        var changed = false;

        if (!data.milestones) data.milestones = {};

        for (var i = 0; i < MILESTONES.length; i++) {
            var m = MILESTONES[i];
            if (current >= m.day && !data.milestones[m.day]) {
                // Claim milestone!
                data.milestones[m.day] = new Date().toISOString();
                changed = true;

                // Fire notification
                try {
                    if (window.notificationSystem && window.notificationSystem.add) {
                        window.notificationSystem.add({
                            type: 'system',
                            title: m.icon + ' Milestone ' + m.day + ' Hari!',
                            content: 'Selamat! Kamu mencapai streak ' + m.day + ' hari dan mendapatkan badge "' + m.badge + '" + ' + m.reward + ' poin! 🎉',
                            sound: true
                        });
                    }
                } catch (e) { }

                // Add XP reward
                try {
                    var xp = parseInt(localStorage.getItem('userXP') || '0');
                    xp += m.reward;
                    localStorage.setItem('userXP', String(xp));
                } catch (e) { }
            }
        }

        if (changed) save(data);
    }

    /**
     * Get active days for calendar display.
     * Returns Set of date strings for last N days.
     */
    function getActiveDaysSet() {
        var data = getData();
        var set = {};
        var days = data.activeDays || [];
        for (var i = 0; i < days.length; i++) {
            set[days[i]] = true;
        }
        return set;
    }

    /**
     * Generate calendar data for last 30 days.
     * Returns array of { date, label, active, isToday }
     */
    function getCalendar(numDays) {
        numDays = numDays || 30;
        var activeDays = getActiveDaysSet();
        var today = todayStr();
        var result = [];

        for (var i = numDays - 1; i >= 0; i--) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            var ds = d.getFullYear() + '-' +
                String(d.getMonth() + 1).padStart(2, '0') + '-' +
                String(d.getDate()).padStart(2, '0');
            var dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
            result.push({
                date: ds,
                dayNum: d.getDate(),
                dayName: dayNames[d.getDay()],
                active: !!activeDays[ds],
                isToday: ds === today
            });
        }
        return result;
    }

    /**
     * Get motivational message based on streak.
     */
    function getMotivation(streak) {
        if (!streak || streak <= 0) return 'Mulai streak kamu hari ini! 🚀';
        if (streak === 1) return 'Langkah pertama! Lanjutkan besok! 💪';
        if (streak < 7) return 'Streak ' + streak + ' hari! Semangat terus! 🔥';
        if (streak < 15) return 'Satu minggu lebih! Kamu luar biasa! ⚡';
        if (streak < 30) return 'Konsisten sekali! Teruskan! 🌟';
        if (streak < 60) return 'Sebulan lebih! Kamu inspirasi! 💎';
        if (streak < 100) return 'Dedikasi tinggi! Hampir 100 hari! 👑';
        return 'STREAK MASTER! ' + streak + ' hari! Legendaris! 🏆';
    }

    // --- Expose API ---
    window.StreakManager = {
        recordActivity: recordActivity,
        getData: getData,
        getFlameLevel: getFlameLevel,
        getFlameClass: getFlameClass,
        getNextMilestone: getNextMilestone,
        getMilestones: getMilestones,
        checkMilestones: checkMilestones,
        getCalendar: getCalendar,
        getMotivation: getMotivation,
        MILESTONES: MILESTONES
    };

})();
