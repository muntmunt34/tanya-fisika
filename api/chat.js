// Vercel Serverless Function — /api/chat
// Handles AI chat responses for physics Q&A

export default async function handler(req, res) {
    // Only POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { provider, message } = req.body || {};
        if (!provider || !message) return res.status(400).json({ error: 'provider and message required' });

        if (provider === 'mock') {
            return res.json({ reply: `MockBot: Terima kasih, saya menerima pertanyaan Anda: "${message}". (Ini balasan mock.)` });
        }

        if (provider === 'deepseek') {
            const q = String(message || '').toLowerCase();

            function simpleReply(msg) {
                if (/hukum newton|newton|hukum kedua|hukum pertama|hukum ketiga/.test(msg)) {
                    return `Hukum Newton — Penjelasan lengkap:\n\nHukum I (Kelembaman)\n- Pernyataan: Suatu benda akan tetap diam atau bergerak lurus beraturan kecuali ada gaya total yang bekerja.\n- Inti: tanpa resultan gaya, percepatan = 0.\n- Contoh: sebuah buku yang diam di atas meja tetap diam sampai ada gaya yang mendorongnya.\n\nHukum II (ΣF = m·a)\n- Rumus: ΣF = m · a\n- Penjelasan: Percepatan sebanding dengan gaya total dan berbanding terbalik dengan massa.\n- Contoh terapan: Jika sebuah benda bermassa 2 kg diberi gaya total 6 N maka a = 6 / 2 = 3 m/s^2.\n\nHukum III (Aksi—Reaksi)\n- Pernyataan: Untuk setiap aksi ada reaksi yang sama besar dan berlawanan arah.\n- Contoh: menendang bola memberi gaya ke depan pada bola dan gaya reaksi ke belakang pada kaki.\n\nSoal latihan singkat:\n- Soal: Sebuah kotak massa 5 kg ditarik oleh gaya 20 N horizontal. Abaikan gesekan. Berapa percepatannya?\n- Jawab: a = F / m = 20 / 5 = 4 m/s^2.\n\nUntuk pendalaman, tanyakan contoh soal atau turunan tiap hukum.`;
                }
                if (/energi|energi kinetik|potensial|kinetik|potensial|konservasi energi/.test(msg)) {
                    return `Energi — Penjelasan lengkap:\n\nEnergi Kinetik\n- Rumus: E_k = 1/2 m v^2\n- Makna: energi yang dimiliki benda karena geraknya.\n- Selalu positif atau nol.\n- Dua kali lipat kecepatan = empat kali lipat energi kinetik.\n\nEnergi Potensial Gravitasi\n- Rumus: E_p = m g h\n- Makna: energi karena posisi pada ketinggian h.\n- Bersifat relatif terhadap titik referensi.\n\nHukum Kekekalan Energi\n- Pada sistem konservatif (tanpa gesekan), energi mekanik total tetap konstan.\n- Energi kinetik dan potensial dapat saling berubah, tetapi jumlahnya selalu sama.\n\nContoh soal:\n- Soal: Bola 0.5 kg dilepaskan dari ketinggian 2 m. Berapa kecepatan saat mencapai tanah? (abaikan gesekan)\n- Penyelesaian: E_p awal = m g h = 0.5 × 9.8 × 2 = 9.8 J. Semua berubah menjadi E_k. Dari E_k = 1/2 m v^2 → v ≈ 6.26 m/s.`;
                }
                if (/usaha|work|w=|w =|gaya·jarak/.test(msg)) {
                    return `Usaha dan Daya — Penjelasan lengkap:\n\nDefinisi Usaha\n- Usaha adalah energi yang dipindahkan kepada atau dari benda oleh gaya yang bekerja padanya.\n- Satuan: Joule (J) = Newton × meter (N·m)\n\nDaya\n- Daya adalah laju perubahan energi atau laju usaha.\n- Satuan: Watt (W) = Joule per sekon (J/s)\n\nCatatan: Untuk menghitung energi, gunakan rumus E_k = 1/2 m v^2 (energi kinetik) dan E_p = m g h (energi potensial gravitasi).`;
                }
                if (/pengukuran|satuan|si unit|satuan|meter|m s|kg/.test(msg)) {
                    return `Pengukuran dan Satuan SI — Penjelasan lengkap:\n\nSatuan dasar SI\n- Panjang: meter (m)\n- Massa: kilogram (kg)\n- Waktu: sekon (s)\n\nBesaran turunan\n- Kecepatan: m/s\n- Percepatan: m/s^2\n- Gaya: N (Newton) = kg·m/s^2\n\nTips praktis: Selalu periksa satuan di tiap langkah perhitungan untuk menghindari kesalahan.`;
                }
                if (/listrik|arus|tegangan|resistor|ohm/.test(msg)) {
                    return `Listrik Dasar — Penjelasan lengkap:\n\nBesaran penting\n- Arus (I): satuan Ampere (A)\n- Tegangan (V): satuan Volt (V)\n- Hambatan (R): Ohm (Ω)\n\nHukum Ohm\n- Rumus: V = I·R\n\nDaya listrik\n- Rumus: P = V·I\n\nContoh:\n- Soal: Jika R = 10 Ω dan V = 5 V, berapa arus?\n- Jawab: I = V/R = 0.5 A.`;
                }
                return `DeepSeek (pelajaran fisika): Berikut rangkuman dan langkah-langkah untuk mempelajari topik Anda:\n1) Definisi singkat dan konsep inti.\n2) Rumus utama dan satuan.\n3) Contoh penyelesaian langkah-demi-langkah.\n4) Soal latihan singkat dan jawaban.\n\nTanyakan topik spesifik (mis. 'dengan contoh soal Hukum Newton II' atau 'contoh penerapan usaha dan energi') untuk jawaban yang lebih terfokus.`;
            }

            const reply = simpleReply(q);
            return res.json({ reply });
        }

        if (provider === 'openai') {
            const key = process.env.OPENAI_API_KEY;
            if (!key) return res.status(500).json({ error: 'OPENAI_API_KEY not configured on server' });

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
}
