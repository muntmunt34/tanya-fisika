/* Simple proxy server for AI Pintar chat
   - POST /api/chat { provider, message }
   - provider: 'openai' | 'deepseek' | 'mock'
   - For 'openai' the server will call OpenAI's Chat Completions API. Set OPENAI_API_KEY env var.
*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '1mb' }));

const PORT = process.env.PORT || 3000;

app.post('/api/chat', async (req, res) => {
    try {
        const { provider, message } = req.body || {};
        if (!provider || !message) return res.status(400).json({ error: 'provider and message required' });

        if (provider === 'mock') {
            // Simple deterministic mock reply
            return res.json({ reply: `MockBot: Terima kasih, saya menerima pertanyaan Anda: "${message}". (Ini balasan mock.)` });
        }

        if (provider === 'deepseek') {
            // Enhanced local "Deepseek" responder focused on physics topics — returns more complete material
            const q = String(message || '').toLowerCase();

            function simpleReply(msg) {
                // Provide structured, educational answers: definition, key formulas, worked example, practice problem
                if (/hukum newton|newton|hukum kedua|hukum pertama|hukum ketiga/.test(msg)) {
                    return `Hukum Newton — Penjelasan lengkap:

Hukum I (Kelembaman)
- Pernyataan: Suatu benda akan tetap diam atau bergerak lurus beraturan kecuali ada gaya total yang bekerja.
- Inti: tanpa resultan gaya, percepatan = 0.
- Contoh: sebuah buku yang diam di atas meja tetap diam sampai ada gaya yang mendorongnya.

Hukum II (ΣF = m·a)
- Rumus: ΣF = m · a
- Penjelasan: Percepatan sebanding dengan gaya total dan berbanding terbalik dengan massa.
- Contoh terapan: Jika sebuah benda bermassa 2 kg diberi gaya total 6 N maka a = 6 / 2 = 3 m/s^2.

Hukum III (Aksi—Reaksi)
- Pernyataan: Untuk setiap aksi ada reaksi yang sama besar dan berlawanan arah.
- Contoh: menendang bola memberi gaya ke depan pada bola dan gaya reaksi ke belakang pada kaki.

Soal latihan singkat:
- Soal: Sebuah kotak massa 5 kg ditarik oleh gaya 20 N horizontal. Abaikan gesekan. Berapa percepatannya?
- Jawab: a = F / m = 20 / 5 = 4 m/s^2.

Untuk pendalaman, tanyakan contoh soal atau turunan tiap hukum.`;
                }

                if (/energi|energi kinetik|potensial|kinetik|potensial|konservasi energi/.test(msg)) {
                    return `Energi — Penjelasan lengkap:

Energi Kinetik
- Rumus: E_k = 1/2 m v^2
- Makna: energi yang dimiliki benda karena geraknya.
- Selalu positif atau nol.
- Dua kali lipat kecepatan = empat kali lipat energi kinetik.

Energi Potensial Gravitasi
- Rumus: E_p = m g h
- Makna: energi karena posisi pada ketinggian h.
- Bersifat relatif terhadap titik referensi.

Hukum Kekekalan Energi
- Pada sistem konservatif (tanpa gesekan), energi mekanik total tetap konstan.
- Energi kinetik dan potensial dapat saling berubah, tetapi jumlahnya selalu sama.

Contoh soal:
- Soal: Bola 0.5 kg dilepaskan dari ketinggian 2 m. Berapa kecepatan saat mencapai tanah? (abaikan gesekan)
- Penyelesaian: E_p awal = m g h = 0.5 × 9.8 × 2 = 9.8 J. Semua berubah menjadi E_k. Dari E_k = 1/2 m v^2 → v ≈ 6.26 m/s.`;
                }

                if (/usaha|work|w=|w =|gaya·jarak/.test(msg)) {
                    return `Usaha dan Daya — Penjelasan lengkap:

Definisi Usaha
- Usaha adalah energi yang dipindahkan kepada atau dari benda oleh gaya yang bekerja padanya.
- Satuan: Joule (J) = Newton × meter (N·m)

Daya
- Daya adalah laju perubahan energi atau laju usaha.
- Satuan: Watt (W) = Joule per sekon (J/s)

Catatan: Untuk menghitung energi, gunakan rumus E_k = 1/2 m v^2 (energi kinetik) dan E_p = m g h (energi potensial gravitasi).`;
                }

                if (/pengukuran|satuan|si unit|satuan|meter|m s|kg/.test(msg)) {
                    return `Pengukuran dan Satuan SI — Penjelasan lengkap:

Satuan dasar SI
- Panjang: meter (m)
- Massa: kilogram (kg)
- Waktu: sekon (s)

Besaran turunan
- Kecepatan: m/s
- Percepatan: m/s^2
- Gaya: N (Newton) = kg·m/s^2

Tips praktis: Selalu periksa satuan di tiap langkah perhitungan untuk menghindari kesalahan.`;
                }

                if (/listrik|arus|tegangan|resistor|ohm/.test(msg)) {
                    return `Listrik Dasar — Penjelasan lengkap:

Besaran penting
- Arus (I): satuan Ampere (A)
- Tegangan (V): satuan Volt (V)
- Hambatan (R): Ohm (Ω)

Hukum Ohm
- Rumus: V = I·R

Daya listrik
- Rumus: P = V·I

Contoh:
- Soal: Jika R = 10 Ω dan V = 5 V, berapa arus?
- Jawab: I = V/R = 0.5 A.`;
                }

                // broader fallback: try to give a structured, helpful answer for other physics topics
                return `DeepSeek (pelajaran fisika): Berikut rangkuman dan langkah-langkah untuk mempelajari topik Anda:
1) Definisi singkat dan konsep inti.
2) Rumus utama dan satuan.
3) Contoh penyelesaian langkah-demi-langkah.
4) Soal latihan singkat dan jawaban.

Tanyakan topik spesifik (mis. 'dengan contoh soal Hukum Newton II' atau 'contoh penerapan usaha dan energi') untuk jawaban yang lebih terfokus.`;
            }

            const reply = simpleReply(q);
            return res.json({ reply });
        }

        if (provider === 'openai') {
            const key = process.env.OPENAI_API_KEY;
            if (!key) return res.status(500).json({ error: 'OPENAI_API_KEY not configured on server' });

            // minimal chat completion call
            const payload = {
                model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
                max_tokens: 512,
            };

            const r = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + key
                }, body: JSON.stringify(payload)
            });
            if (!r.ok) {
                const txt = await r.text();
                return res.status(502).json({ error: 'OpenAI API error', details: txt });
            }
            const data = await r.json();
            const reply = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || '';
            return res.json({ reply, raw: data });
        }

        return res.status(400).json({ error: 'Unknown provider' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error', details: String(err) });
    }
});

// ─── Microsoft Edge Neural TTS (Free, No API Key) ───
// Proxies to local Python microservice (edge-tts) on port 3001
app.post('/api/tts', async (req, res) => {
    try {
        const { text } = req.body || {};
        if (!text) return res.status(400).json({ error: 'text is required' });

        const trimmedText = text.slice(0, 3000);

        // id-ID-ArdiNeural = Indonesian male, deep & calm
        const response = await fetch('http://127.0.0.1:3001/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: trimmedText,
                voice: 'id-ID-ArdiNeural',
                rate: '-5%',
                pitch: '-10Hz'
            })
        });

        if (!response.ok) {
            throw new Error(`Python TTS server returned ${response.status}`);
        }

        const arrayBuffer = await response.arrayBuffer();

        res.set({
            'Content-Type': 'audio/mpeg',
            'Cache-Control': 'public, max-age=86400'
        });
        res.send(Buffer.from(arrayBuffer));
        console.log(`✅ TTS generated (Python): ${trimmedText.length} chars`);

    } catch (err) {
        console.error('TTS error:', err.message);
        // Try English fallback voice
        try {
            const trimmedText = (req.body?.text || '').slice(0, 3000);
            const response = await fetch('http://127.0.0.1:3001/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: trimmedText,
                    voice: 'en-US-GuyNeural',
                    rate: '-5%',
                    pitch: '-15Hz'
                })
            });

            if (!response.ok) throw new Error('Fallback failed');

            const arrayBuffer = await response.arrayBuffer();
            res.set({ 'Content-Type': 'audio/mpeg' });
            res.send(Buffer.from(arrayBuffer));
        } catch (e2) {
            console.error('Fallback TTS also failed:', e2.message);
            res.status(500).json({ error: 'TTS error', details: String(err.message) });
        }
    }
});

// Redirect root to login page (flow: login.html → index.html → dashboard.html)
app.get('/', (req, res) => { res.redirect('/login.html'); });

app.use(express.static('.'));

app.listen(PORT, () => { console.log('AI proxy running on http://localhost:' + PORT); });
