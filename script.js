// Login Form Handler
// Debug: log auth state on script load
console.log('[auth:init] path=', window.location.pathname, 'localLogged=', localStorage.getItem('userLoggedIn'), 'sessionLogged=', sessionStorage.getItem('userLoggedIn'));
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.login-form');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Remove active class from all tabs and forms
            tabBtns.forEach(b => b.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            this.classList.add('active');
            document.getElementById(tabName + 'Form').classList.add('active');
        });
    });

    // Universal password hashing helper with fallback for non-secure contexts
    async function computeHash(password){
        const pw = String(password || '');
        // prefer SubtleCrypto when available
        try {
            if (window.crypto && crypto.subtle && typeof crypto.subtle.digest === 'function'){
                const enc = new TextEncoder();
                const buf = await crypto.subtle.digest('SHA-256', enc.encode(pw));
                return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join('');
            }
        } catch(e){ /* fallthrough to fallback */ }

        // Fallback: non-cryptographic deterministic hash (demo only)
        let h = 5381;
        for (let i = 0; i < pw.length; i++) {
            h = ((h << 5) + h) + pw.charCodeAt(i);
            h = h & 0xffffffff;
        }
        // return fixed-width hex
        return (h >>> 0).toString(16).padStart(8,'0');
    }

    // Sign In Form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        // Helper: get and save users map in localStorage
        function getUsers() {
            try { return JSON.parse(localStorage.getItem('users') || '{}'); } catch(e){ return {}; }
        }
        function saveUsers(u){ try{ localStorage.setItem('users', JSON.stringify(u)); }catch(e){} }

        async function hashPassword(password){
            return await computeHash(password);
        }

        signinForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = (document.getElementById('signinEmail').value || '').trim().toLowerCase();
            const password = document.getElementById('signinPassword').value || '';
            const rememberMe = document.getElementById('rememberMe').checked;

            if (!email || !password) return alert('Harap isi email dan password!');

            const users = getUsers();
            const user = users[email];
            if (!user) {
                return alert('Akun tidak ditemukan. Silakan daftar terlebih dahulu.');
            }

            const hash = await hashPassword(password);
            if (hash !== user.passwordHash) {
                return alert('Password salah.');
            }

            const userName = user.name || email.split('@')[0];
            if (rememberMe) {
                localStorage.setItem('userLoggedIn', 'true');
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userName', userName);
                localStorage.setItem('userRole', user.role || 'siswa');
            } else {
                sessionStorage.setItem('userLoggedIn', 'true');
                sessionStorage.setItem('userEmail', email);
                sessionStorage.setItem('userName', userName);
                sessionStorage.setItem('userRole', user.role || 'siswa');
            }

            sessionStorage.setItem('fromLogin', 'true');
            try { localStorage.setItem('fromLogin', 'true'); } catch(e){}
            window.location.href = 'index.html';
        });
    }

    // Sign Up Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;
            const role = document.querySelector('input[name="signupRole"]:checked')?.value || 'siswa';
            const agreeTerms = document.getElementById('agreeTerms').checked;
            
            if (!name || !email || !password || !confirmPassword) {
                alert('Harap isi semua field!');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Password dan konfirmasi password tidak cocok!');
                return;
            }
            
            if (password.length < 6) {
                alert('Password minimal 6 karakter!');
                return;
            }
            
            if (!agreeTerms) {
                alert('Harap setujui syarat dan ketentuan!');
                return;
            }
            // Save user credentials (hashed) and auto-login
            (async function(){
                const normalizedEmail = (email||'').trim().toLowerCase();
                const users = (function(){ try{ return JSON.parse(localStorage.getItem('users')||'{}'); }catch(e){return {};}})();
                if (users[normalizedEmail]) return alert('Email sudah terdaftar. Silakan masuk.');
                const pwHash = await computeHash(password);
                users[normalizedEmail] = { name: name, email: normalizedEmail, passwordHash: pwHash, role: role, createdAt: new Date().toISOString() };
                try { localStorage.setItem('users', JSON.stringify(users)); } catch(e){ console.error('save users failed', e); }

                alert('Pendaftaran berhasil! Mengarahkan ke aplikasi...');

                // Persist name/email/role and mark session as logged-in
                try { localStorage.setItem('userName', name); localStorage.setItem('userEmail', normalizedEmail); localStorage.setItem('userRole', role); } catch(e){}
                sessionStorage.setItem('userLoggedIn', 'true');
                sessionStorage.setItem('userName', name);
                sessionStorage.setItem('userEmail', normalizedEmail);
                sessionStorage.setItem('userRole', role);
                // Flag to indicate we came from signup so index can advance to dashboard
                sessionStorage.setItem('fromSignup', 'true');
                try { localStorage.setItem('fromSignup', 'true'); } catch(e){}

                // Redirect to index (index will then forward to dashboard when it sees fromSignup)
                window.location.href = 'index.html';
            })();
        });
    }

    // Social Login Buttons
    const googleBtn = document.getElementById('googleLogin');
    const facebookBtn = document.getElementById('facebookLogin');
    
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            // Simulate Google OAuth popup
            alert('Fitur Google Login akan terintegrasi dengan Google OAuth.\n\nUntuk demo, Anda akan dianggap login berhasil.');
            
            // Prompt for username
            const userName = prompt('Masukkan username Anda:', 'Siswa');
            if (userName && userName.trim()) {
                // Simulate successful login
                sessionStorage.setItem('userLoggedIn', 'true');
                sessionStorage.setItem('userEmail', 'user@gmail.com');
                sessionStorage.setItem('userName', userName.trim());
                sessionStorage.setItem('fromLogin', 'true');
                try { localStorage.setItem('fromLogin', 'true'); } catch(e){}
                window.location.href = 'index.html';
            } else {
                alert('Username diperlukan!');
            }
        });
    }
    
    if (facebookBtn) {
        facebookBtn.addEventListener('click', function() {
            // Simulate Facebook OAuth popup
            alert('Fitur Facebook Login akan terintegrasi dengan Facebook OAuth.\n\nUntuk demo, Anda akan dianggap login berhasil.');
            
            // Prompt for username
            const userName = prompt('Masukkan username Anda:', 'Siswa');
            if (userName && userName.trim()) {
                // Simulate successful login
                sessionStorage.setItem('userLoggedIn', 'true');
                sessionStorage.setItem('userEmail', 'user@facebook.com');
                sessionStorage.setItem('userName', userName.trim());
                sessionStorage.setItem('fromLogin', 'true');
                try { localStorage.setItem('fromLogin', 'true'); } catch(e){}
                window.location.href = 'index.html';
            } else {
                alert('Username diperlukan!');
            }
        });
    }

    // Check if user is already logged in — ensure logged-in users leave login page
    if ((localStorage.getItem('userLoggedIn') || sessionStorage.getItem('userLoggedIn')) && window.location.pathname.includes('login.html')) {
        console.log('[auth] already logged in, redirecting to dashboard');
        window.location.href = 'dashboard.html';
    }

    // If on index splash page and not logged in, go to login.
    // If we just signed up (`fromSignup`), allow redirect to dashboard.
    if (window.location.pathname.includes('index.html')) {
        if (!(localStorage.getItem('userLoggedIn') || sessionStorage.getItem('userLoggedIn'))) {
            console.log('[auth] not logged in — redirecting to login');
            window.location.href = 'login.html';
        } else if (
            sessionStorage.getItem('fromSignup') || sessionStorage.getItem('fromLogin') ||
            localStorage.getItem('fromSignup') || localStorage.getItem('fromLogin')
        ) {
            // Remove the flags and go to dashboard immediately
            sessionStorage.removeItem('fromSignup');
            sessionStorage.removeItem('fromLogin');
            try { localStorage.removeItem('fromSignup'); localStorage.removeItem('fromLogin'); } catch(e){}
            console.log('[auth] from signup/login — forwarding to dashboard');
            // small timeout so index can finish any animations if needed
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 150);
        }
    }

    // Ensure UI shows the logged-in user's name across pages
    function updateUserName(){
        const name = sessionStorage.getItem('userName') || localStorage.getItem('userName') || '';
        const role = sessionStorage.getItem('userRole') || localStorage.getItem('userRole') || 'siswa';
        const displayName = name || 'Siswa';
        // update elements by id or class used in templates
        const idEl = document.getElementById('userName');
        if(idEl) idEl.textContent = displayName;
        document.querySelectorAll('.user-name').forEach(el => el.textContent = displayName);
        document.querySelectorAll('.profile-name').forEach(el => el.textContent = displayName);
        
        // display role badge if element exists
        const roleEl = document.getElementById('userRole');
        if(roleEl) {
            roleEl.textContent = role === 'guru' ? 'Guru' : 'Siswa';
            roleEl.style.padding = '2px 8px';
            roleEl.style.borderRadius = '12px';
            roleEl.style.fontSize = '12px';
            roleEl.style.fontWeight = '600';
            roleEl.style.backgroundColor = role === 'guru' ? '#ffd700' : '#4361ee';
            roleEl.style.color = role === 'guru' ? '#000' : '#fff';
        }
    }

    // Rest of the existing code...
    const startButton = document.getElementById('startButton');
    const splashScreen = document.querySelector('.splash-screen');

    if (startButton) {
        startButton.addEventListener('click', function() {
            // Check if user is logged in
            if (localStorage.getItem('userLoggedIn') || sessionStorage.getItem('userLoggedIn')) {
                // Set flag that user came from splash
                sessionStorage.setItem('fromSplash', 'true');

                // Add fade out animation
                splashScreen.style.animation = 'fadeOut 0.5s ease-out forwards';

                // Redirect to dashboard after animation
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 500);
            } else {
                // Not logged in, redirect to login
                window.location.href = 'login.html';
            }
        });
    }

    // Removed auto redirect - user must click button each time
    localStorage.setItem('visited', 'true');

    // Update streak based on activity (run on any page when user is logged in)
    if (localStorage.getItem('userLoggedIn') || sessionStorage.getItem('userLoggedIn')) {
        updateStreak();
        updateUserName();

        // Record last activity when user opens a content page (e.g., Kelas, Forum)
        const currentLabel = getPageNameFromPath();
        if (currentLabel && currentLabel !== 'Dashboard') {
            setLastActivity(currentLabel);
        }

        // Refresh last-activity UI anywhere on the site
        updateLastActivityUI();
    }

    // Logout button
    function injectComposeIfNeeded(){
        if(document.getElementById('composeBtn')) return; // already injected

        // Determine page type
        const page = getPageNameFromPath(); // 'Kelas' or 'Forum' or others
        // Only inject compose on Kelas or Forum to keep them separate
        if (page !== 'Kelas' && page !== 'Forum') return;

        const wrapper = document.createElement('div');
        if (page === 'Forum') {
            wrapper.innerHTML = `
                <button id="composeBtn" class="floating-plus" aria-label="Tulis pesan">+</button>
                <div id="composeModalForum" class="compose-modal" aria-hidden="true">
                    <div class="compose-modal-content">
                        <button class="close-compose" id="closeCompose" aria-label="Tutup">×</button>
                        <h3>Kirim Pesan ke Forum</h3>
                        <form id="composeFormForum">
                            <label class="compose-label">Nama
                                <input id="composeNameForum" type="text" placeholder="Nama Anda" required>
                            </label>
                            <label class="compose-label">Pesan
                                <textarea id="composeMessageForum" rows="4" placeholder="Tulis pesan..." required></textarea>
                            </label>
                            <div class="compose-actions">
                                <button type="submit" class="btn">Kirim</button>
                                <button type="button" class="btn outline" id="cancelCompose">Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        } else if (page === 'Kelas') {
            wrapper.innerHTML = `
                <button id="composeBtn" class="floating-plus" aria-label="Kirim tugas">+</button>
                <div id="composeModalClass" class="compose-modal" aria-hidden="true">
                    <div class="compose-modal-content">
                        <button class="close-compose" id="closeCompose" aria-label="Tutup">×</button>
                        <h3>Kirim Tugas</h3>
                        <form id="composeFormClass">
                            <label class="compose-label">Nama
                                <input id="composeNameClass" type="text" placeholder="Nama Anda" required>
                            </label>
                            <label class="compose-label">Pilih Tugas
                                <select id="composeTaskSelectClass"></select>
                            </label>
                            <label class="compose-label">Catatan (opsional)
                                <textarea id="composeMessageClass" rows="3" placeholder="Catatan untuk guru..."></textarea>
                            </label>
                            <div class="compose-actions">
                                <button type="submit" class="btn">Kirim Tugas</button>
                                <button type="button" class="btn outline" id="cancelCompose">Batal</button>
                            </div>
                        </form>
                    </div>
                </div>
            `;
        }
        document.body.appendChild(wrapper);
    }

    document.addEventListener('DOMContentLoaded', function(){
        injectComposeIfNeeded();

        // Setup handlers depending on which modal exists
        const composeBtn = document.getElementById('composeBtn');
        const closeCompose = document.getElementById('closeCompose');
        const cancelCompose = document.getElementById('cancelCompose');

        if (document.getElementById('composeModalForum')) {
            const modal = document.getElementById('composeModalForum');
            const form = document.getElementById('composeFormForum');
            const nameInput = document.getElementById('composeNameForum');
            const msgInput = document.getElementById('composeMessageForum');

            function openForumModal(){ if(modal){ modal.style.display='flex'; modal.setAttribute('aria-hidden','false'); if(nameInput) nameInput.focus(); } }
            function closeForumModal(){ if(modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); } }

            if(composeBtn) composeBtn.addEventListener('click', openForumModal);
            if(closeCompose) closeCompose.addEventListener('click', closeForumModal);
            if(cancelCompose) cancelCompose.addEventListener('click', closeForumModal);
            window.addEventListener('click', function(e){ if(e.target === modal) closeForumModal(); });

            if(form){
                form.addEventListener('submit', function(e){
                    e.preventDefault();
                    const name = (nameInput && nameInput.value.trim()) || '';
                    const message = (msgInput && msgInput.value.trim()) || '';
                    if(!message) return alert('Isi pesan terlebih dahulu.');
                    const payload = { name: name || ('Anon'+Math.floor(Math.random()*9000+1000)), message: message, time: new Date().toISOString() };
                    try{ if(window.receiveCompose && typeof window.receiveCompose === 'function') window.receiveCompose(payload); }catch(e){}
                    try{ localStorage.setItem('compose_post', JSON.stringify(payload)); }catch(e){}
                    closeForumModal();
                    showProgressNotification();
                });
                if(msgInput){ msgInput.addEventListener('keydown', function(e){ if((e.ctrlKey||e.metaKey) && e.key==='Enter'){ e.preventDefault(); form.dispatchEvent(new Event('submit',{cancelable:true})); } }); }
            }
        }

        if (document.getElementById('composeModalClass')) {
            const modal = document.getElementById('composeModalClass');
            const form = document.getElementById('composeFormClass');
            const nameInput = document.getElementById('composeNameClass');
            const taskSelect = document.getElementById('composeTaskSelectClass');
            const noteInput = document.getElementById('composeMessageClass');

            function openClassModal(){
                if(!modal) return;
                // populate tasks from DOM assignment cards
                taskSelect.innerHTML = '';
                document.querySelectorAll('.assignment-card').forEach(card => {
                    const id = card.getAttribute('data-task');
                    const title = (card.querySelector('.assignment-main h3') || {}).textContent || id;
                    const opt = document.createElement('option'); opt.value = id; opt.textContent = title;
                    taskSelect.appendChild(opt);
                });
                // if no tasks, show disabled option
                if(taskSelect.children.length === 0){ taskSelect.innerHTML = '<option disabled selected>Tidak ada tugas</option>'; }
                modal.style.display='flex'; modal.setAttribute('aria-hidden','false'); if(nameInput) nameInput.focus();
            }
            function closeClassModal(){ if(modal){ modal.style.display='none'; modal.setAttribute('aria-hidden','true'); } }

            if(composeBtn) composeBtn.addEventListener('click', openClassModal);
            if(closeCompose) closeCompose.addEventListener('click', closeClassModal);
            if(cancelCompose) cancelCompose.addEventListener('click', closeClassModal);
            window.addEventListener('click', function(e){ if(e.target === modal) closeClassModal(); });

            if(form){
                form.addEventListener('submit', function(e){
                    e.preventDefault();
                    const name = (nameInput && nameInput.value.trim()) || '';
                    const taskId = (taskSelect && taskSelect.value) || null;
                    const note = (noteInput && noteInput.value.trim()) || '';
                    if(!taskId){ alert('Tidak ada tugas yang tersedia untuk dikirim.'); return; }
                    try{
                        const subs = window.loadSubmissions ? window.loadSubmissions() : {};
                        subs[taskId] = { fileName: '(via compose)', note: note, name: name, time: new Date().toISOString() };
                        if(window.saveSubmissions) window.saveSubmissions(subs);
                        if(window.renderSubmissionStates) window.renderSubmissionStates();
                        closeClassModal();
                        showProgressNotification();
                        try{ completeTask(taskId); }catch(e){}
                        try{ setLastActivity('Kelas'); updateLastActivityUI(); }catch(e){}
                    }catch(err){ console.error(err); alert('Gagal mengirim tugas.'); }
                });
            }
        }
    });

// Function to animate streak increase
function animateStreakIncrease(element) {
    element.style.animation = 'none';
    element.offsetHeight; // Trigger reflow
    element.style.animation = 'bounce 0.6s ease-out';
}

// Function to complete a task and update streak
function completeTask(taskId) {
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks') || '[]');
    
    // Check if task is already completed
    if (completedTasks.includes(taskId)) {
        return; // Already completed
    }
    
    // Add task to completed list
    completedTasks.push(taskId);
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    
    // Update streak (activity today)
    updateStreak();
    
    // Show encouraging message
    showStreakNotification();
}

// Function to show streak notification
function showStreakNotification() {
    const currentStreak = parseInt(localStorage.getItem('currentStreak') || '1');
    const messages = [
        "Kerja bagus! Streak kamu bertambah! 🔥",
        "Mantap! Hari ke-" + currentStreak + " streak! 🚀",
        "Wow! Kamu luar biasa hari ini! 💪",
        "Streak " + currentStreak + " hari! Teruskan! 🌟"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'streak-notification';
    notification.innerHTML = `
        <i class="fas fa-fire"></i>
        <span>${randomMessage}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FF6B35, #F7931E);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 4000);
}

// Function to show login modal
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    const closeBtn = document.querySelector('.close-modal');
    const goToLoginBtn = document.getElementById('goToLogin');
    
    if (modal) {
        modal.style.display = 'block';
        
        // Close modal when clicking X
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                modal.style.display = 'none';
                // Redirect to login page
                window.location.href = 'login.html';
            });
        }
        
        // Go to login page
        if (goToLoginBtn) {
            goToLoginBtn.addEventListener('click', function() {
                window.location.href = 'login.html';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                window.location.href = 'login.html';
            }
        });
    }
}

// --- Last activity tracking (stores lastActivity and recentActivities in localStorage) ---
function getPageNameFromPath() {
    const path = window.location.pathname;
    let file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    // If running from root (no filename), default to index.html
    if (!file) file = 'index.html';

    const map = {
        'dashboard.html': 'Dashboard',
        'index.html': 'Beranda',
        'login.html': 'Masuk',
        'kelas.html': 'Kelas',
        'pages/kelas.html': 'Kelas',
        'forum.html': 'Forum',
        'pages/forum.html': 'Forum',
        'profile.html': 'Profil',
        'pages/profile.html': 'Profil',
        'pages/materi.html': 'Materi',
        'materi.html': 'Materi',
        'ai.html': 'AI Pintar',
        'pages/ai.html': 'AI Pintar',
        'pengukuran.html': 'Pengukuran',
        'pages/pengukuran.html': 'Pengukuran',
        'sumber-energi.html': 'Sumber Energi',
        'pages/sumber-energi.html': 'Sumber Energi',
        'usaha-energi.html': 'Usaha & Energi',
        'pages/usaha-energi.html': 'Usaha & Energi',
        'hukum-newton.html': 'Hukum Newton',
        'pages/hukum-newton.html': 'Hukum Newton'
    };

    return map[file] || file.replace('.html', '').replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function setLastActivity(label, opts) {
    const now = new Date().toISOString();
    opts = opts || {};
    // Normalize entry to include resource details and metadata
    const entry = {
        page: label,
        label: label,
        time: now,
        resource_type: opts.resource_type || opts.type || null,
        resource_id: opts.resource_id || opts.id || null,
        metadata: opts.metadata || opts.meta || {}
    };

    // For backward compatibility keep a simple lastActivity object too
    try { localStorage.setItem('lastActivity', JSON.stringify(entry)); } catch(e){}

    // Maintain recentActivities list (most recent first) - robust parsing so a malformed value can't break the flow
    let recent;
    try {
        recent = JSON.parse(localStorage.getItem('recentActivities') || '[]');
        if(!Array.isArray(recent)) recent = [];
    } catch(e) {
        recent = [];
    }

    // Remove identical consecutive entries (same label + resource)
    if (recent.length === 0 || (recent[0].label !== entry.label || recent[0].resource_id !== entry.resource_id)) {
        recent.unshift(entry);
    }
    // Keep only latest 12
    recent = recent.slice(0, 12);
    try { localStorage.setItem('recentActivities', JSON.stringify(recent)); } catch(e){}

    // Share recent activities via window.name so file:// pages can pass data across navigations
    try{
        const share = { __sharedRecentActivities: recent };
        window.name = JSON.stringify(share);
    }catch(e){}

    try{ console.info('[activity] setLastActivity ->', entry.label, entry.resource_id || entry.metadata && entry.metadata.href); }catch(e){}

    updateLastActivityUI();
}

function timeAgo(date) {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
    if (seconds < 60) return `${seconds} detik lalu`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} menit lalu`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} jam lalu`;
    const days = Math.floor(hours / 24);
    return `${days} hari lalu`;
}



function updateLastActivityUI() {
    // Update small display element (header/profile)
    const display = document.getElementById('lastActivity');
    // If there are shared activities in window.name (useful for file:// origin navigation), merge them first
    try{
        if(window.name){
            try{
                const parsed = JSON.parse(window.name || 'null');
                if(parsed && parsed.__sharedRecentActivities){
                    const shared = parsed.__sharedRecentActivities || [];
                    const local = JSON.parse(localStorage.getItem('recentActivities') || '[]');
                    const combined = shared.concat(local);
                    const seen = new Set();
                    const merged = [];
                    for(const a of combined){
                        const key = (a.resource_id && String(a.resource_id)) || a.label || JSON.stringify(a);
                        if(seen.has(key)) continue;
                        seen.add(key);
                        merged.push(a);
                    }
                    try{ localStorage.setItem('recentActivities', JSON.stringify(merged.slice(0,12))); }catch(e){}
                    if(merged.length > 0){ try{ localStorage.setItem('lastActivity', JSON.stringify(merged[0])); }catch(e){} }
                    // clear the shared slot to avoid reprocessing
                    try{ window.name = ''; }catch(e){}
                }
            }catch(e){}
        }
    }catch(e){}

    const last = JSON.parse(localStorage.getItem('lastActivity') || 'null');
    if (display) {
        if (last) {
            display.textContent = `${last.label} • ${timeAgo(new Date(last.time))}`;
        } else {
            display.textContent = '-';
        }
    }

    // Update recent activity list on dashboard — dedupe by resource and show most-recent per resource
    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        // parse safely and backfill from lastActivity when appropriate
        let recent;
        try { recent = JSON.parse(localStorage.getItem('recentActivities') || '[]'); if(!Array.isArray(recent)) recent = []; } catch(e) { recent = []; }
        if ((!recent || recent.length === 0) && last) {
            // if recent list empty but we have a lastActivity, use it as a single entry
            recent = [ last ];
            try{ localStorage.setItem('recentActivities', JSON.stringify(recent)); }catch(e){}
        }
        if (!recent || recent.length === 0) {
            activityList.innerHTML = '<p class="muted">Belum ada aktivitas.</p>';
            return;
        }

        // build unique items keyed by resource_id or label, keeping the most recent
        const seen = new Set();
        const unique = [];
        for (let i = 0; i < recent.length; i++) {
            const a = recent[i];
            const key = (a.resource_id && String(a.resource_id)) || a.label || JSON.stringify(a);
            if (seen.has(key)) continue;
            seen.add(key);
            unique.push(a);
        }

        activityList.innerHTML = unique.map(a => {
            let icon = 'fas fa-history';
            const lab = (a.label||'').toLowerCase();
            const rtype = (a.resource_type || (a.metadata && a.metadata.type) || '').toLowerCase();
            if (rtype.includes('course') || lab.includes('kelas')) icon = 'fas fa-school';
            else if (rtype.includes('material') || lab.includes('materi') || lab.includes('video') || lab.includes('hukum') || lab.includes('pengukuran') || lab.includes('sumber')) icon = 'fas fa-book-open';
            else if (rtype.includes('forum') || lab.includes('forum')) icon = 'fas fa-comments';
            else if (rtype.includes('quiz') || lab.includes('quiz')) icon = 'fas fa-bolt';

            const xpValue = (a.metadata && a.metadata.xp) || a.xp || null;
            const xp = xpValue ? `<div class="activity-xp">+${xpValue} XP</div>` : '';

            const subtitle = (a.metadata && (a.metadata.subtitle || a.metadata.detail || a.metadata.description)) || `Terakhir dibuka • ${timeAgo(new Date(a.time))}`;

            const hrefVal = (a.metadata && a.metadata.href) || a.resource_id || '';
            const clickableClass = hrefVal ? 'clickable' : '';
            return `
            <div class="activity-item activity-card ${clickableClass}" data-href="${hrefVal}">
                <div class="activity-icon">
                    <i class="${icon}"></i>
                </div>
                <div class="activity-content">
                    <h4>${a.label}</h4>
                    <p class="muted">${subtitle}</p>
                </div>
                ${xp}
            </div>`;
        }).join('');

        // attach click handlers to navigate to hrefs when present
        try{
            document.querySelectorAll('.activity-item.clickable').forEach(el => {
                el.addEventListener('click', function(){
                    const href = this.getAttribute('data-href');
                    if(!href) return;
                    // support relative links and resource ids
                    try{
                        if(href.startsWith('http') || href.indexOf('/') !== -1) {
                            window.location.href = href;
                        } else {
                            // fallback: try pages/ + href
                            window.location.href = href;
                        }
                    }catch(e){ console.error('navigate activity', e); }
                });
            });
        }catch(e){ }

    }
}

// --- End last activity tracking ---

// Test button event listener
document.addEventListener('DOMContentLoaded', function() {
    const testButton = document.getElementById('testCompleteTask');
    if (testButton) {
        let taskCounter = 1;
        testButton.addEventListener('click', function() {
            completeTask('task' + taskCounter);
            taskCounter++;
        });
    }
});

// Attach handlers to dashboard/menu links so clicks are recorded before navigation
document.addEventListener('DOMContentLoaded', function() {
    try {
        // target common menu anchors/cards on dashboard
        document.querySelectorAll('.menu-card, .menu-grid a, .menu-grid .menu-card').forEach(el => {
            el.addEventListener('click', function(e) {
                const h3 = (this.querySelector && this.querySelector('h3')) || null;
                const href = (this.getAttribute && (this.getAttribute('href') || this.dataset.href)) || '';
                const map = {
                    'pages/kelas.html': 'Kelas',
                    'pages/materi.html': 'Materi',
                    'pages/forum.html': 'Forum',
                    'pages/ai.html': 'AI Pintar',
                    'pages/daftar-pustaka.html': 'Daftar Pustaka'
                };
                const label = (h3 && h3.textContent && h3.textContent.trim()) || map[href] || href.replace(/.*\//,'').replace('.html','');
                try { setLastActivity(label); } catch(err) { /* ignore */ }
                // navigation continues normally; localStorage is synchronous so activity is saved
            });
        });
    } catch(err) { console.error('attach menu activity handlers', err); }
});

// Global delegated link tracker for internal HTML links (records activity before navigation)
document.addEventListener('click', function(e){
    try{
        const a = e.target.closest && e.target.closest('a[href]');
        if(!a) return;
        const href = a.getAttribute('href');
        if(!href) return;
        // consider internal links: html pages or relative paths
        const internal = href.endsWith('.html') || href.startsWith('pages/') || href.startsWith('./') || href.startsWith('../') || href.startsWith('/');
        if(!internal) return;
        const label = a.dataset.label || (a.querySelector && a.querySelector('h3') && a.querySelector('h3').textContent) || (a.textContent || '').trim();
        try{ setLastActivity(label || getPageNameFromPath(), { resource_type: 'link', resource_id: href, metadata: { href: href } }); }catch(e){}
    }catch(e){ /* ignore */ }
}, true);

// Ensure dashboard menu cards and bottom nav use guarded navigation (record activity then navigate)
document.addEventListener('DOMContentLoaded', function(){
    try{
        // menu cards on dashboard
        document.querySelectorAll('.menu-card').forEach(el => {
            if(!el || !el.getAttribute) return;
            const href = el.getAttribute('href') || el.dataset.href;
            if(!href) return;
            el.addEventListener('click', function(ev){
                // prevent default immediate navigation to ensure activity stored
                ev.preventDefault();
                const h3 = el.querySelector && el.querySelector('h3');
                const label = (h3 && h3.textContent && h3.textContent.trim()) || (el.dataset && el.dataset.label) || href.replace(/.*\//,'').replace('.html','');
                try{ setLastActivity(label, { resource_type: 'link', resource_id: href, metadata: { href: href } }); }catch(e){}
                // small delay to ensure storage write; localStorage is sync but some browsers suspend scripts during navigation
                setTimeout(() => { window.location.href = href; }, 220);
            });
        });

        // bottom nav links
        document.querySelectorAll('nav.bottom-nav a').forEach(a => {
            const href = a.getAttribute('href');
            if(!href) return;
            a.addEventListener('click', function(ev){
                ev.preventDefault();
                const label = (a.textContent || '').trim() || href.replace(/.*\//,'').replace('.html','');
                try{ setLastActivity(label, { resource_type: 'link', resource_id: href, metadata: { href: href } }); }catch(e){}
                setTimeout(() => { window.location.href = href; }, 220);
            });
        });
    }catch(e){ console.error('attach guarded nav handlers', e); }
});

// Add fadeOut animation to CSS if not exists
const style = document.createElement('style');
style.textContent = `
@keyframes fadeOut {
    to {
        opacity: 0;
        transform: scale(0.95);
    }
}
@keyframes slideInRight {
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes slideOutRight {
    from {
        transform: translateX(0);
        opacity: 1;
    }
    to {
        transform: translateX(100%);
        opacity: 0;
    }
}
@keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-5px);
    }
}
`;
document.head.appendChild(style);

// --- Global Quick Compose (+) injected across pages ---
(function(){
    function injectComposeIfNeeded(){
        if(document.getElementById('composeBtn')) return; // already injected

        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <button id="composeBtn" class="floating-plus" aria-label="Tulis pesan">+</button>
            <div id="composeModal" class="compose-modal" aria-hidden="true">
                <div class="compose-modal-content">
                    <button class="close-compose" id="closeCompose" aria-label="Tutup">×</button>
                    <h3>Tulis Pesan Cepat</h3>
                    <form id="composeForm">
                        <label class="compose-label">Nama
                            <input id="composeName" type="text" placeholder="Nama Anda" required>
                        </label>
                        <label class="compose-label">Tujuan
                            <select id="composeTarget">
                                <option value="forum">Forum</option>
                                <option value="task">Kirim Tugas</option>
                            </select>
                        </label>
                        <label class="compose-label" id="composeTaskLabel" style="display:none">Pilih Tugas
                            <select id="composeTaskSelect"></select>
                        </label>
                        <label class="compose-label">Pesan
                            <textarea id="composeMessage" rows="4" placeholder="Tulis pesan singkat..." required></textarea>
                        </label>
                        <div class="compose-actions">
                            <button type="submit" class="btn">Kirim</button>
                            <button type="button" class="btn outline" id="cancelCompose">Batal</button>
                        </div>
                        <p class="compose-hint">Tekan <strong>Ctrl/Cmd + Enter</strong> untuk mengirim cepat.</p>
                    </form>
                </div>
            </div>
        `;
        document.body.appendChild(wrapper);
    }

    document.addEventListener('DOMContentLoaded', function(){
        injectComposeIfNeeded();

        const composeBtn = document.getElementById('composeBtn');
        const composeModal = document.getElementById('composeModal');
        const closeCompose = document.getElementById('closeCompose');
        const cancelCompose = document.getElementById('cancelCompose');
        const composeForm = document.getElementById('composeForm');
        const composeTarget = document.getElementById('composeTarget');
        const composeTaskLabel = document.getElementById('composeTaskLabel');
        const composeTaskSelect = document.getElementById('composeTaskSelect');

        function openModal(){
            if(!composeModal) return;
            composeModal.style.display = 'flex';
            composeModal.setAttribute('aria-hidden','false');
            const nameInput = document.getElementById('composeName');
            if(nameInput) nameInput.focus();
            // populate tasks list
            if(composeTaskSelect){
                composeTaskSelect.innerHTML = '';
                document.querySelectorAll('.assignment-card').forEach(card => {
                    const id = card.getAttribute('data-task');
                    const title = (card.querySelector('.assignment-main h3') || {}).textContent || id;
                    const opt = document.createElement('option'); opt.value = id; opt.textContent = title;
                    composeTaskSelect.appendChild(opt);
                });
                // if no tasks, disable task option
                if(composeTaskSelect.children.length === 0 && composeTarget){
                    composeTarget.querySelector('option[value="task"]').disabled = true;
                } else if(composeTarget){
                    composeTarget.querySelector('option[value="task"]').disabled = false;
                }
            }
        }

        function closeModal(){ if(composeModal){ composeModal.style.display = 'none'; composeModal.setAttribute('aria-hidden','true'); } }

        if(composeBtn) composeBtn.addEventListener('click', openModal);
        if(closeCompose) closeCompose.addEventListener('click', closeModal);
        if(cancelCompose) cancelCompose.addEventListener('click', closeModal);

        if(composeTarget){
            composeTarget.addEventListener('change', function(){
                if(composeTarget.value === 'task'){
                    if(composeTaskLabel) composeTaskLabel.style.display = 'block';
                } else {
                    if(composeTaskLabel) composeTaskLabel.style.display = 'none';
                }
            });
        }

        window.addEventListener('click', function(e){ if(e.target === composeModal) closeModal(); });

        if(composeForm){
            composeForm.addEventListener('submit', function(e){
                e.preventDefault();
                const name = document.getElementById('composeName').value.trim();
                const message = document.getElementById('composeMessage').value.trim();
                if(!name || !message) return alert('Harap isi nama dan pesan.');

                // determine target
                const target = (composeTarget && composeTarget.value) ? composeTarget.value : 'forum';
                if(target === 'task'){
                    const taskId = composeTaskSelect && composeTaskSelect.value;
                    if(!taskId) { alert('Pilih tugas tujuan pengiriman.'); return; }
                    try{
                        const subs = window.loadSubmissions ? window.loadSubmissions() : {};
                        subs[taskId] = { fileName: '(via compose)', note: message, name: name, time: new Date().toISOString() };
                        if(window.saveSubmissions) window.saveSubmissions(subs);
                        if(window.renderSubmissionStates) window.renderSubmissionStates();
                        closeModal();
                        showProgressNotification();
                        try{ completeTask(taskId); }catch(e){}
                        try{ setLastActivity('Kelas'); updateLastActivityUI(); }catch(e){}
                    }catch(err){ console.error(err); alert('Gagal mengirim tugas.'); }
                    return;
                }

                // default: forum post
                closeModal();
                const payload = { name: name, message: message, time: new Date().toISOString() };
                try { if (window.receiveCompose && typeof window.receiveCompose === 'function') window.receiveCompose(payload); } catch(e){}
                try { localStorage.setItem('compose_post', JSON.stringify(payload)); } catch(e){}
                showProgressNotification();
                try{ setLastActivity('Forum', { resource_type: 'forum', metadata: { subtitle: 'Pesan terkirim • ' + timeAgo(new Date()) } }); updateLastActivityUI(); }catch(e){}
            });

            const msg = document.getElementById('composeMessage');
            if(msg){ msg.addEventListener('keydown', function(e){ if((e.ctrlKey || e.metaKey) && e.key === 'Enter'){ e.preventDefault(); composeForm.dispatchEvent(new Event('submit', {cancelable:true})); } }); }
        }
    });
})();

// --- Assignment submission helpers for classroom view ---
(function(){
    const SUB_KEY = 'submissions';

    function loadSubmissions(){
        return JSON.parse(localStorage.getItem(SUB_KEY) || '{}');
    }
    function saveSubmissions(obj){
        localStorage.setItem(SUB_KEY, JSON.stringify(obj));
    }

    // Inject three-dot menus into assignment cards (delete / options)
    function injectTaskMenus(){
        document.querySelectorAll('.assignment-card').forEach(card => {
            const task = card.getAttribute('data-task');
            if(!task) return;
            if(card.querySelector('.task-menu-button')) return; // already injected

            const btn = document.createElement('button');
            btn.className = 'task-menu-button';
            btn.type = 'button';
            btn.innerHTML = '⋮';
            btn.title = 'Opsi tugas';

            const menu = document.createElement('div');
            menu.className = 'task-menu';

            const del = document.createElement('button');
            del.type = 'button';
            del.textContent = 'Hapus tugas';
            del.addEventListener('click', function(e){
                e.stopPropagation();
                if(!confirm('Hapus tugas ini secara permanen?')) return;
                try{
                    // mark deleted
                    const deleted = JSON.parse(localStorage.getItem('deletedTasks') || '[]');
                    if(!deleted.includes(task)) { deleted.push(task); localStorage.setItem('deletedTasks', JSON.stringify(deleted)); }
                    // remove submission if any
                    const subs = loadSubmissions(); if(subs[task]) { delete subs[task]; saveSubmissions(subs); }
                    // remove DOM
                    if(card.parentNode) card.parentNode.removeChild(card);
                }catch(err){ console.error('delete task', err); }
            });

            menu.appendChild(del);

            btn.addEventListener('click', function(ev){ ev.stopPropagation(); document.querySelectorAll('.task-menu').forEach(m => m.classList.remove('active')); menu.classList.toggle('active'); });
            // close menus when clicking elsewhere
            document.addEventListener('click', function(ev){ if(!menu.contains(ev.target) && ev.target !== btn) menu.classList.remove('active'); });

            card.appendChild(btn);
            card.appendChild(menu);
        });
    }

    // expose for other pages/scripts to call after they render tasks
    try{ window.injectTaskMenus = injectTaskMenus; }catch(e){}

    // Observe assignment list for dynamically added tasks and inject menus
    try{
        const al = document.getElementById('assignmentList');
        if(al && typeof MutationObserver !== 'undefined'){
            const mo = new MutationObserver((mutations)=>{
                injectTaskMenus();
            });
            mo.observe(al, { childList: true, subtree: true });
        }
    }catch(e){ /* ignore */ }

    function renderSubmissionStates(){
        const subs = loadSubmissions();
        const deleted = (function(){ try{ return JSON.parse(localStorage.getItem('deletedTasks')||'[]'); }catch(e){ return []; }})();
        document.querySelectorAll('.assignment-card').forEach(card => {
            const task = card.getAttribute('data-task');
            if (!task) return;
            // hide deleted tasks
            if (deleted.includes(task)) { card.style.display = 'none'; return; }
            const statusEl = card.querySelector('.status');
            if(!statusEl) return;
            const s = subs[task];
            if(s){
                statusEl.classList.remove('not-submitted');
                statusEl.classList.add('submitted');
                statusEl.textContent = 'Terkumpul • ' + timeAgo(new Date(s.time));
            } else {
                statusEl.classList.remove('submitted');
                statusEl.classList.add('not-submitted');
                statusEl.textContent = 'Belum dikumpulkan';
            }
        });
        // Update overall class progress based on submissions
        try{
            const total = document.querySelectorAll('.assignment-card').length || 0;
            const submittedCount = Object.keys(subs).length || 0;
            const percent = total === 0 ? 0 : Math.round((submittedCount / total) * 100);
            const pctEl = document.getElementById('classProgress');
            const pctFill = document.getElementById('classProgressFill');
            if(pctEl) pctEl.textContent = percent + '%';
            if(pctFill) pctFill.style.width = percent + '%';
        }catch(e){}
        // ensure menus are injected after render
        try{ injectTaskMenus(); }catch(e){}
    }

    // expose helpers to other scripts (compose modal will call these)
    window.loadSubmissions = loadSubmissions;
    window.saveSubmissions = saveSubmissions;
    window.renderSubmissionStates = renderSubmissionStates;

    // handle click on Kumpulkan button
    document.addEventListener('click', function(e){
        if(!e.target.classList.contains('submit-assignment')) return;
        const task = e.target.getAttribute('data-task');
        if(!task) return;
        const card = document.querySelector('.assignment-card[data-task="' + task + '"]');
        if(!card) return;
        const fileInput = card.querySelector('.assignment-file');
        if(!fileInput) return;
        // open file picker
        fileInput.click();

        // one-time change handler
        const onChange = function(){
            const file = fileInput.files && fileInput.files[0];
            if(!file){ fileInput.removeEventListener('change', onChange); return; }
            const subs = loadSubmissions();
            subs[task] = { fileName: file.name, time: new Date().toISOString() };
            saveSubmissions(subs);
            renderSubmissionStates();
            // feedback and progress
            showProgressNotification();
            try{ completeTask(task); }catch(e){}
            try{ setLastActivity('Kelas'); updateLastActivityUI(); }catch(e){}
            fileInput.removeEventListener('change', onChange);
        };

        fileInput.addEventListener('change', onChange);
    });

    // also render on load
    document.addEventListener('DOMContentLoaded', function(){
        renderSubmissionStates();
    });
})();

/* Parallax scene + 3D tilt interactions (lightweight) */
(function(){
    const scene = document.querySelector('.parallax-scene');
    const layers = scene ? Array.from(scene.querySelectorAll('.layer')) : [];

    function onMove(e){
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const x = (e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || cx);
        const y = (e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || cy);
        layers.forEach(layer => {
            const depth = parseFloat(layer.dataset.depth) || 0.12;
            const moveX = (x - cx) * depth;
            const moveY = (y - cy) * depth * -1;
            layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });

    // 3D tilt for elements with .tilt
    const tiltEls = Array.from(document.querySelectorAll('.tilt'));
    tiltEls.forEach(el => {
        let rect = null;
        function onTilt(e){
            rect = rect || el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const x = (e.clientX || (e.touches && e.touches[0] && e.touches[0].clientX) || cx);
            const y = (e.clientY || (e.touches && e.touches[0] && e.touches[0].clientY) || cy);
            const dx = (x - cx) / rect.width;
            const dy = (y - cy) / rect.height;
            const rotX = (dy * 8).toFixed(2);
            const rotY = (dx * -8).toFixed(2);
            el.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(12px)`;
        }

        el.addEventListener('mousemove', onTilt);
        el.addEventListener('touchmove', onTilt, { passive: true });
        el.addEventListener('mouseleave', function(){ el.style.transform = 'none'; rect = null; });
        el.addEventListener('touchend', function(){ el.style.transform = 'none'; rect = null; });
    });
})();
// ===== NOTIFICATION SYSTEM =====
(function() {
    const NOTIFICATIONS_KEY = 'notifications';
    const NOTIFICATION_PREFS_KEY = 'notificationPreferences';

    // Initialize notification preferences
    function initializePreferences() {
        let prefs = JSON.parse(localStorage.getItem(NOTIFICATION_PREFS_KEY) || '{}');
        if (Object.keys(prefs).length === 0) {
            prefs = {
                enabled: true,
                sound: true,
                taskNotifications: true,
                submissionNotifications: true,
                systemNotifications: true
            };
            localStorage.setItem(NOTIFICATION_PREFS_KEY, JSON.stringify(prefs));
        }
        return prefs;
    }

    // Get all notifications
    function getNotifications() {
        try {
            return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    // Save notifications
    function saveNotifications(notifications) {
        try {
            localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
        } catch (e) {
            console.error('Failed to save notifications', e);
        }
    }

    // Add new notification
    function addNotification(notif) {
        const prefs = initializePreferences();
        
        // Check if this type of notification is enabled
        if (!prefs.enabled) return;
        if (notif.type === 'task' && !prefs.taskNotifications) return;
        if (notif.type === 'submission' && !prefs.submissionNotifications) return;
        if (notif.type === 'system' && !prefs.systemNotifications) return;

        const notifications = getNotifications();
        const id = Math.max(...notifications.map(n => n.id || 0), 0) + 1;
        
        const newNotif = {
            id: id,
            type: notif.type || 'system',
            title: notif.title || 'Notifikasi',
            content: notif.content || '',
            timestamp: new Date().toISOString(),
            read: false,
            ...(notif.deadline && { deadline: notif.deadline }),
            ...(notif.actionLink && { actionLink: notif.actionLink })
        };

        notifications.unshift(newNotif);
        saveNotifications(notifications);

        // Play notification sound if enabled
        if (prefs.sound && notif.sound !== false) {
            playNotificationSound();
        }

        // Show desktop notification if available
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(newNotif.title, {
                body: newNotif.content,
                icon: '/icon-192x192.png',
                tag: newNotif.type
            });
        }

        // Update notification badge
        updateNotificationBadge();
    }

    // Update notification badge count
    function updateNotificationBadge() {
        const notifications = getNotifications();
        const unreadCount = notifications.filter(n => !n.read).length;
        const badge = document.getElementById('unreadCount');
        if (badge) {
            badge.textContent = unreadCount;
            badge.style.display = unreadCount > 0 ? 'flex' : 'none';
        }
    }

    // Play notification sound
    function playNotificationSound() {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } catch (e) {
            // Fallback: use simple beep sound
            console.log('Notification sound: beep!');
        }
    }

    // Request notification permission
    function requestNotificationPermission() {
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    console.log('Notification permission granted');
                }
            });
        }
    }

    // Simulate receiving new task notification (for demo)
    function simulateTaskNotification() {
        const userRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole') || 'siswa';
        if (userRole !== 'siswa') return;

        addNotification({
            type: 'task',
            title: 'Tugas Baru: Soal Termodinamika',
            content: 'Guru telah membuat tugas baru "Soal Termodinamika" di kelas Fisika. Deadline: 2026-02-20',
            deadline: '2026-02-20',
            actionLink: 'pages/kelas.html',
            sound: true
        });
    }

    // Simulate receiving submission notification (for demo)
    function simulateSubmissionNotification() {
        const userRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole') || 'siswa';
        if (userRole !== 'guru') return;

        addNotification({
            type: 'submission',
            title: 'Siswa Mengumpulkan Tugas',
            content: 'Siti Nurhaliza telah mengumpulkan tugas "Soal Hukum Newton Edisi 2".',
            actionLink: 'pages/kelas.html',
            sound: true
        });
    }

    // Expose functions to global scope
    window.notificationSystem = {
        add: addNotification,
        getAll: getNotifications,
        updateBadge: updateNotificationBadge,
        requestPermission: requestNotificationPermission,
        simulateTaskNotif: simulateTaskNotification,
        simulateSubmissionNotif: simulateSubmissionNotification,
        getPreferences: initializePreferences
    };

    // Initialize on page load
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize preferences if not already done
        initializePreferences();
        
        // Request notification permission from user
        if ('Notification' in window && Notification.permission === 'default') {
            // Only request on certain pages to avoid spam
            const currentPage = getPageNameFromPath();
            if (['Dashboard', 'index.html', 'login.html'].includes(currentPage)) {
                requestNotificationPermission();
            }
        }
        
        // Update notification badge on dashboard
        updateNotificationBadge();
    });

    // Simulate notifications for demo purposes (remove in production)
    if (window.location.pathname.includes('dashboard.html')) {
        setTimeout(() => {
            // Simulate occasional notifications for demo
            if (Math.random() > 0.7) {
                const userRole = sessionStorage.getItem('userRole') || localStorage.getItem('userRole') || 'siswa';
                if (userRole === 'siswa' && Math.random() > 0.5) {
                    simulateTaskNotification();
                } else if (userRole === 'guru' && Math.random() > 0.5) {
                    simulateSubmissionNotification();
                }
            }
        }, 5000);
    }
})();