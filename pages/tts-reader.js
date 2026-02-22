// =====================================================
// TEXT-TO-SPEECH READER — Tanya Fisika (ElevenLabs)
// =====================================================
// Uses ElevenLabs AI voice via /api/tts server proxy
// Falls back to Web Speech API if ElevenLabs fails

(function () {
    'use strict';

    const synth = window.speechSynthesis;
    let sections = [];
    let currentIdx = 0;
    let isPlaying = false;
    let isPaused = false;
    let currentAudio = null;
    let speed = 1.0;
    let useElevenLabs = true; // try ElevenLabs first
    let audioCache = {};      // cache generated audio blobs

    // ── Extract readable text from a section ──
    function extractText(el) {
        const clone = el.cloneNode(true);
        clone.querySelectorAll('.MathJax, .MathJax_Preview, script, style, svg, .mjx-container').forEach(e => e.remove());
        let text = clone.textContent || '';
        text = text.replace(/\s+/g, ' ').trim();
        text = text.replace(/\$[^$]+\$/g, '');
        text = text.replace(/\\\(.+?\\\)/g, '');
        return text;
    }

    // ── Build section list from DOM ──
    function buildSections() {
        sections = [];
        const detail = document.querySelector('.material-detail');
        if (!detail) return;

        const children = detail.children;
        let currentSection = { title: 'Ringkasan Umum', text: '' };

        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            const tag = child.tagName;

            if (tag === 'H2' || tag === 'H3') {
                if (currentSection.text.trim().length > 10) {
                    sections.push({ ...currentSection });
                }
                currentSection = { title: extractText(child), text: '' };
            } else if (child.classList.contains('subsection')) {
                const heading = child.querySelector('h3, h4');
                if (currentSection.text.trim().length > 10) {
                    sections.push({ ...currentSection });
                }
                currentSection = {
                    title: heading ? extractText(heading) : 'Bagian',
                    text: extractText(child)
                };
            } else {
                currentSection.text += ' ' + extractText(child);
            }
        }

        if (currentSection.text.trim().length > 10) {
            sections.push(currentSection);
        }

        if (sections.length === 0 && detail.textContent.trim()) {
            sections.push({ title: 'Materi', text: extractText(detail) });
        }
    }

    // ── ElevenLabs TTS via server ──
    async function speakElevenLabs(text) {
        const cacheKey = text.slice(0, 100);
        let audioUrl = audioCache[cacheKey];

        if (!audioUrl) {
            updateUI('loading');

            const resp = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text })
            });

            if (!resp.ok) throw new Error(`TTS API error: ${resp.status}`);

            const blob = await resp.blob();
            audioUrl = URL.createObjectURL(blob);
            audioCache[cacheKey] = audioUrl;
        }

        return new Promise((resolve, reject) => {
            currentAudio = new Audio(audioUrl);
            currentAudio.playbackRate = speed;
            currentAudio.onended = resolve;
            currentAudio.onerror = reject;
            currentAudio.play().catch(reject);
        });
    }

    // ── Web Speech API fallback ──
    function speakFallback(text) {
        return new Promise((resolve, reject) => {
            const utt = new SpeechSynthesisUtterance(text);
            utt.rate = speed * 0.9;
            utt.pitch = 0.85;
            utt.lang = 'id-ID';
            // Try to get a good voice
            const voices = synth.getVoices();
            const voice = voices.find(v => v.lang.startsWith('id'))
                || voices.find(v => v.name.toLowerCase().includes('google'))
                || voices.find(v => v.lang.startsWith('en'))
                || voices[0];
            if (voice) utt.voice = voice;
            utt.onend = resolve;
            utt.onerror = (e) => {
                if (e.error !== 'interrupted' && e.error !== 'canceled') reject(e);
                else resolve();
            };
            synth.speak(utt);
        });
    }

    // ── Speak a section ──
    async function speakSection(idx) {
        if (idx >= sections.length) {
            stopAll();
            updateUI('done');
            return;
        }

        currentIdx = idx;
        stopAudio();

        const sec = sections[idx];
        const fullText = sec.title + '. ' + sec.text;
        // Limit text for ElevenLabs (save quota)
        const trimmed = fullText.slice(0, 2500);

        updateUI('playing');
        highlightSection(idx);

        try {
            if (useElevenLabs) {
                await speakElevenLabs(trimmed);
            } else {
                await speakFallback(trimmed);
            }
            // Auto-advance to next section
            if (isPlaying && !isPaused) {
                speakSection(currentIdx + 1);
            }
        } catch (err) {
            console.warn('TTS error, trying fallback:', err);
            if (useElevenLabs) {
                // Fall back to Web Speech API
                useElevenLabs = false;
                updateSourceLabel();
                try {
                    await speakFallback(trimmed);
                    if (isPlaying && !isPaused) speakSection(currentIdx + 1);
                } catch (e2) {
                    console.error('Fallback also failed:', e2);
                    stopAll();
                }
            }
        }
    }

    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        if (synth) synth.cancel();
    }

    // ── Controls ──
    function play() {
        buildSections();
        if (sections.length === 0) return;

        if (isPaused && currentAudio) {
            currentAudio.play();
            isPaused = false;
            isPlaying = true;
            updateUI('playing');
        } else if (isPaused && !currentAudio) {
            synth.resume();
            isPaused = false;
            isPlaying = true;
            updateUI('playing');
        } else {
            isPlaying = true;
            isPaused = false;
            speakSection(currentIdx);
        }
    }

    function pause() {
        if (!isPlaying) return;
        if (currentAudio) {
            currentAudio.pause();
        } else {
            synth.pause();
        }
        isPaused = true;
        isPlaying = false;
        updateUI('paused');
    }

    function stopAll() {
        stopAudio();
        isPlaying = false;
        isPaused = false;
        currentIdx = 0;
        clearHighlight();
        updateUI('stopped');
    }

    function next() {
        if (currentIdx < sections.length - 1) {
            stopAudio();
            isPaused = false;
            isPlaying = true;
            speakSection(currentIdx + 1);
        }
    }

    function prev() {
        if (currentIdx > 0) {
            stopAudio();
            isPaused = false;
            isPlaying = true;
            speakSection(currentIdx - 1);
        }
    }

    function setSpeed(s) {
        speed = s;
        if (currentAudio) currentAudio.playbackRate = s;
    }

    // ── Highlight current section ──
    function highlightSection(idx) {
        clearHighlight();
        const detail = document.querySelector('.material-detail');
        if (!detail) return;
        const subsections = detail.querySelectorAll('.subsection');
        if (idx > 0 && idx - 1 < subsections.length) {
            subsections[idx - 1].style.outline = '2px solid #4361ee';
            subsections[idx - 1].style.outlineOffset = '4px';
            subsections[idx - 1].style.borderRadius = '8px';
            subsections[idx - 1].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function clearHighlight() {
        document.querySelectorAll('.subsection').forEach(s => {
            s.style.outline = '';
            s.style.outlineOffset = '';
        });
    }

    // ── UI ──
    function updateUI(state) {
        const playBtn = document.getElementById('ttsPlayBtn');
        const pauseBtn = document.getElementById('ttsPauseBtn');
        const status = document.getElementById('ttsStatus');
        const progress = document.getElementById('ttsProgress');

        if (playBtn) playBtn.style.display = (state === 'playing' || state === 'loading') ? 'none' : 'flex';
        if (pauseBtn) pauseBtn.style.display = (state === 'playing') ? 'flex' : 'none';

        if (status) {
            if (state === 'loading') {
                status.innerHTML = '<span class="tts-loading">⏳ Memuat suara AI...</span>';
                status.style.color = '#818cf8';
            } else if (state === 'playing') {
                status.textContent = '🎙️ ' + (sections[currentIdx]?.title || 'Membaca...');
                status.style.color = '#4ade80';
            } else if (state === 'paused') {
                status.textContent = '⏸ Dijeda';
                status.style.color = '#fbbf24';
            } else if (state === 'done') {
                status.textContent = '✅ Selesai';
                status.style.color = '#4ade80';
            } else {
                status.textContent = '🎙️ Siap dibaca (AI Voice)';
                status.style.color = '#94a3b8';
            }
        }

        if (progress && sections.length > 0) {
            progress.textContent = `${currentIdx + 1}/${sections.length}`;
        }
    }

    function updateSourceLabel() {
        const src = document.getElementById('ttsSource');
        if (src) src.textContent = useElevenLabs ? '✨ AI Voice' : '🔊 Browser';
    }

    // ── Create floating player ──
    function createPlayer() {
        const player = document.createElement('div');
        player.id = 'ttsPlayer';

        player.innerHTML = `
            <div class="tts-bar">
                <div class="tts-icon" title="AI Voice Drew">🎙️</div>
                <div class="tts-controls">
                    <button id="ttsPrevBtn" class="tts-btn" title="Sebelumnya">⏮</button>
                    <button id="ttsPlayBtn" class="tts-btn tts-play" title="Putar">▶</button>
                    <button id="ttsPauseBtn" class="tts-btn tts-play" title="Jeda" style="display:none">⏸</button>
                    <button id="ttsStopBtn" class="tts-btn" title="Berhenti">⏹</button>
                    <button id="ttsNextBtn" class="tts-btn" title="Selanjutnya">⏭</button>
                </div>
                <div class="tts-info">
                    <div id="ttsStatus" class="tts-status">🎙️ Siap dibaca (AI Voice)</div>
                    <div class="tts-meta">
                        <span id="ttsProgress" class="tts-progress">0/0</span>
                        <button id="ttsSpeedBtn" class="tts-speed" title="Kecepatan">
                            <span id="ttsSpeedLabel">1x</span>
                        </button>
                        <span id="ttsSource" class="tts-source">✨ AI Voice</span>
                    </div>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            #ttsPlayer {
                position: fixed;
                bottom: 16px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 9000;
                width: 92%;
                max-width: 520px;
                animation: ttsSlideUp .4s ease;
            }
            @keyframes ttsSlideUp {
                from { transform: translateX(-50%) translateY(100%); opacity: 0 }
                to { transform: translateX(-50%) translateY(0); opacity: 1 }
            }
            .tts-bar {
                background: linear-gradient(135deg, #1e293b, #0f172a);
                border: 1px solid rgba(100, 140, 255, 0.2);
                border-radius: 16px;
                padding: 10px 14px;
                display: flex;
                align-items: center;
                gap: 10px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5), 0 0 20px rgba(67, 97, 238, 0.15);
                backdrop-filter: blur(20px);
            }
            .tts-icon {
                font-size: 24px;
                flex-shrink: 0;
                animation: ttsPulse 2s ease-in-out infinite;
            }
            @keyframes ttsPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.12); }
            }
            .tts-controls {
                display: flex;
                gap: 4px;
                flex-shrink: 0;
            }
            .tts-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.08);
                color: #e2e8f0;
                width: 32px;
                height: 32px;
                border-radius: 8px;
                cursor: pointer;
                font-size: 13px;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all .15s;
            }
            .tts-btn:hover {
                background: rgba(67, 97, 238, 0.2);
                border-color: rgba(67, 97, 238, 0.4);
                transform: scale(1.05);
            }
            .tts-btn.tts-play {
                background: linear-gradient(135deg, #4361ee, #3b82f6);
                border: none;
                color: white;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                font-size: 14px;
            }
            .tts-btn.tts-play:hover {
                transform: scale(1.12);
                box-shadow: 0 0 16px rgba(67, 97, 238, 0.5);
            }
            .tts-info {
                flex: 1;
                min-width: 0;
            }
            .tts-status {
                font-size: 12px;
                font-weight: 600;
                color: #94a3b8;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .tts-loading {
                animation: ttsBlinkText 1s ease-in-out infinite;
            }
            @keyframes ttsBlinkText {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.4; }
            }
            .tts-meta {
                display: flex;
                align-items: center;
                gap: 6px;
                margin-top: 2px;
            }
            .tts-progress {
                font-size: 10px;
                color: rgba(148, 163, 184, 0.6);
                font-weight: 600;
            }
            .tts-speed {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.08);
                color: #94a3b8;
                padding: 1px 6px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 10px;
                font-weight: 700;
                font-family: inherit;
            }
            .tts-speed:hover {
                background: rgba(67, 97, 238, 0.15);
                color: #818cf8;
            }
            .tts-source {
                font-size: 9px;
                color: rgba(130, 140, 248, 0.7);
                font-weight: 600;
                padding: 1px 5px;
                background: rgba(67, 97, 238, 0.1);
                border-radius: 3px;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(player);

        // Event listeners
        document.getElementById('ttsPlayBtn').addEventListener('click', play);
        document.getElementById('ttsPauseBtn').addEventListener('click', pause);
        document.getElementById('ttsStopBtn').addEventListener('click', stopAll);
        document.getElementById('ttsNextBtn').addEventListener('click', next);
        document.getElementById('ttsPrevBtn').addEventListener('click', prev);

        // Speed cycle
        const speeds = [0.8, 1.0, 1.2, 1.5];
        const speedLabels = ['0.8x', '1x', '1.2x', '1.5x'];
        let speedIdx = 1;
        document.getElementById('ttsSpeedBtn').addEventListener('click', () => {
            speedIdx = (speedIdx + 1) % speeds.length;
            setSpeed(speeds[speedIdx]);
            document.getElementById('ttsSpeedLabel').textContent = speedLabels[speedIdx];
        });
    }

    // ── Init ──
    function init() {
        if (!document.querySelector('.material-detail')) return;

        buildSections();
        createPlayer();
        updateUI('stopped');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        setTimeout(init, 500);
    }

    // Cleanup
    window.addEventListener('beforeunload', () => {
        stopAudio();
    });
})();
