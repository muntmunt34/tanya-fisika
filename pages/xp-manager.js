// =====================================================
// XP & LEVELING SYSTEM — Tanya Fisika
// =====================================================
// Centralized XP manager. Import via <script src="pages/xp-manager.js">
// Usage: XPManager.addXP(amount, source); XPManager.getData();

const XPManager = (() => {
    const LS_KEY = 'tanyafisika_xp';

    // Level thresholds — XP needed to REACH each level
    // Level 1: 0, Level 2: 100, Level 3: 300 ... grows progressively
    const LEVELS = [
        { level: 1, xpRequired: 0, title: 'Pemula', icon: '🌱', color: '#94a3b8' },
        { level: 2, xpRequired: 100, title: 'Pelajar Baru', icon: '📗', color: '#4ade80' },
        { level: 3, xpRequired: 300, title: 'Mulai Paham', icon: '📘', color: '#22d3ee' },
        { level: 4, xpRequired: 600, title: 'Rajin Belajar', icon: '📙', color: '#fbbf24' },
        { level: 5, xpRequired: 1000, title: 'Siswa Cerdas', icon: '⭐', color: '#f59e0b' },
        { level: 6, xpRequired: 1500, title: 'Fisikawan Muda', icon: '🔬', color: '#a78bfa' },
        { level: 7, xpRequired: 2100, title: 'Ahli Fisika', icon: '🧪', color: '#818cf8' },
        { level: 8, xpRequired: 2800, title: 'Ilmuwan Hebat', icon: '🚀', color: '#f472b6' },
        { level: 9, xpRequired: 3600, title: 'Master Fisika', icon: '👑', color: '#fb923c' },
        { level: 10, xpRequired: 4500, title: 'Legenda Fisika', icon: '🏆', color: '#fbbf24' },
    ];

    // XP rewards for different activities
    const XP_REWARDS = {
        drill_correct: 10,   // per soal benar
        drill_session: 50,   // bonus selesai 1 sesi drill
        drill_perfect: 30,   // bonus 5/5 benar
        materi_read: 20,   // baca 1 materi
        video_watch: 15,   // tonton 1 video
        game_play: 25,   // main game
        daily_login: 10,   // login harian
    };

    function load() {
        try {
            const raw = JSON.parse(localStorage.getItem(LS_KEY));
            if (raw && typeof raw.totalXP === 'number') return raw;
        } catch (e) { /* ignore */ }
        return { totalXP: 0, history: [], lastLogin: null };
    }

    function save(data) {
        localStorage.setItem(LS_KEY, JSON.stringify(data));
    }

    function getLevelInfo(xp) {
        let current = LEVELS[0];
        for (let i = LEVELS.length - 1; i >= 0; i--) {
            if (xp >= LEVELS[i].xpRequired) {
                current = LEVELS[i];
                break;
            }
        }
        const next = LEVELS.find(l => l.level === current.level + 1);
        const xpInLevel = xp - current.xpRequired;
        const xpForNext = next ? (next.xpRequired - current.xpRequired) : 0;
        const progress = next ? Math.min(xpInLevel / xpForNext, 1) : 1;

        return {
            level: current.level,
            title: current.title,
            icon: current.icon,
            color: current.color,
            totalXP: xp,
            xpInLevel,
            xpForNext,
            progress,
            isMaxLevel: !next,
            nextLevel: next || null
        };
    }

    function addXP(amount, source = 'unknown') {
        const data = load();
        const oldInfo = getLevelInfo(data.totalXP);
        data.totalXP += amount;
        data.history.push({
            amount,
            source,
            timestamp: Date.now()
        });
        // Keep only last 50 history entries
        if (data.history.length > 50) data.history = data.history.slice(-50);
        save(data);

        const newInfo = getLevelInfo(data.totalXP);
        const leveledUp = newInfo.level > oldInfo.level;

        return { oldInfo, newInfo, leveledUp, xpGained: amount };
    }

    function getData() {
        const data = load();
        return getLevelInfo(data.totalXP);
    }

    function getRawData() {
        return load();
    }

    function getReward(type) {
        return XP_REWARDS[type] || 0;
    }

    function checkDailyLogin() {
        const data = load();
        const today = new Date().toDateString();
        if (data.lastLogin !== today) {
            data.lastLogin = today;
            save(data);
            return addXP(XP_REWARDS.daily_login, 'daily_login');
        }
        return null;
    }

    // Build XP bar HTML for embedding
    function renderXPBar(containerId) {
        const el = document.getElementById(containerId);
        if (!el) return;
        const info = getData();
        const pct = Math.round(info.progress * 100);

        el.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">
                <span style="font-size:20px">${info.icon}</span>
                <div style="flex:1">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
                        <span style="font-size:12px;font-weight:800;color:${info.color}">LEVEL ${info.level} — ${info.title}</span>
                        <span style="font-size:11px;color:rgba(180,200,230,0.5)">${info.totalXP} XP</span>
                    </div>
                    <div style="height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden">
                        <div style="height:100%;width:${pct}%;background:linear-gradient(90deg,${info.color},${info.nextLevel ? info.nextLevel.color : info.color});border-radius:3px;transition:width .6s ease"></div>
                    </div>
                    <div style="display:flex;justify-content:space-between;margin-top:2px">
                        <span style="font-size:9px;color:rgba(180,200,230,0.4)">${info.isMaxLevel ? 'MAX LEVEL! 🏆' : `${info.xpInLevel}/${info.xpForNext} XP`}</span>
                        ${info.nextLevel ? `<span style="font-size:9px;color:rgba(180,200,230,0.4)">Next: ${info.nextLevel.icon} ${info.nextLevel.title}</span>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    // Level up popup
    function showLevelUpPopup(newInfo) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;animation:fadeIn .3s ease';
        overlay.innerHTML = `
            <div style="background:linear-gradient(135deg,#141a2e,#1b2340);border-radius:20px;padding:30px;text-align:center;max-width:320px;width:85%;border:2px solid ${newInfo.color};box-shadow:0 0 40px ${newInfo.color}40;animation:popIn .4s ease">
                <div style="font-size:52px;margin-bottom:8px">🎉</div>
                <div style="font-size:20px;font-weight:900;color:${newInfo.color};margin-bottom:4px">LEVEL UP!</div>
                <div style="font-size:40px;margin:8px 0">${newInfo.icon}</div>
                <div style="font-size:16px;font-weight:800;color:#e6f7ff;margin-bottom:4px">Level ${newInfo.level}</div>
                <div style="font-size:14px;color:${newInfo.color};font-weight:600;margin-bottom:16px">${newInfo.title}</div>
                <button onclick="this.closest('div[style*=position]').remove()" style="background:linear-gradient(135deg,${newInfo.color},#0ea5e9);color:#000;border:none;padding:10px 28px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Keren! 🚀</button>
            </div>
        `;
        document.body.appendChild(overlay);
        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    }

    return {
        addXP,
        getData,
        getRawData,
        getReward,
        getLevelInfo,
        checkDailyLogin,
        renderXPBar,
        showLevelUpPopup,
        LEVELS,
        XP_REWARDS
    };
})();
