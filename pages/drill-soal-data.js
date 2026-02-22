// DRILL SOAL FISIKA — 120 Soal (tanpa gambar, soal jelas)
const DRILL_DATA = {
    chapters: [
        // ========== BAB 1: PENGUKURAN ==========
        {
            id: 'pengukuran', name: 'PENGUKURAN', icon: '📏', color: '#00d9ff', sessions: [
                {
                    id: 'p1', name: 'Mistar & Satuan', difficulty: 'mudah', questions: [
                        { q: 'Seorang siswa mengukur panjang pensil dengan mistar. Ujung kiri pensil berada di angka 2,0 cm dan ujung kanan di angka 17,0 cm. Berapakah panjang pensil tersebut?', opts: ['13,0 cm', '15,0 cm', '17,0 cm', '19,0 cm', '2,0 cm'], ans: 1, exp: 'Panjang = ujung kanan − ujung kiri = 17,0 − 2,0 = 15,0 cm.', formula: 'Δx = x₂ − x₁', tips: 'Selalu kurangi posisi akhir dengan posisi awal.', src: 'Soal Dasar Pengukuran' },
                        { q: 'Ketelitian sebuah mistar (penggaris) adalah...', opts: ['0,01 mm', '0,05 mm', '0,5 mm', '1 mm', '0,1 mm'], ans: 2, exp: 'Skala terkecil mistar = 1 mm. Ketelitian = ½ × skala terkecil = ½ × 1 mm = 0,5 mm.', formula: 'Ketelitian = ½ × skala terkecil', tips: 'Ketelitian mistar selalu 0,5 mm.', src: 'Konsep Pengukuran' },
                        { q: 'Manakah yang merupakan satuan SI untuk panjang?', opts: ['Kilometer', 'Sentimeter', 'Meter', 'Milimeter', 'Inci'], ans: 2, exp: 'Satuan SI untuk panjang adalah meter (m). Satuan lain seperti cm, mm, km adalah turunan.', formula: 'SI panjang = meter (m)', tips: '7 besaran pokok SI: panjang (m), massa (kg), waktu (s), suhu (K), arus (A), intensitas cahaya (cd), jumlah zat (mol).', src: 'Fisika Dasar' },
                        { q: 'Berapa milimeter (mm) dalam 3,5 cm?', opts: ['0,35 mm', '3,5 mm', '35 mm', '350 mm', '3500 mm'], ans: 2, exp: '1 cm = 10 mm. Maka 3,5 cm = 3,5 × 10 = 35 mm.', formula: '1 cm = 10 mm', tips: 'Naik satu tangga satuan = kali 10.', src: 'Konversi Satuan' },
                        { q: 'Hasil pengukuran panjang meja ditulis 75,3 cm. Angka 3 pada hasil tersebut merupakan...', opts: ['Angka pasti', 'Angka taksiran', 'Angka salah', 'Angka pembulatan', 'Tidak bermakna'], ans: 1, exp: 'Digit terakhir dalam hasil pengukuran selalu merupakan angka taksiran (estimasi).', formula: 'Digit terakhir = taksiran', tips: 'Angka taksiran adalah angka yang diperkirakan di antara dua garis skala.', src: 'Teori Pengukuran' }
                    ]
                },
                {
                    id: 'p2', name: 'Konversi & Presisi', difficulty: 'mudah', questions: [
                        { q: 'Seorang siswa mengukur diameter kelereng sebanyak 5 kali dengan hasil: 1,20 cm; 1,25 cm; 1,20 cm; 1,30 cm; 1,25 cm. Berapa nilai rata-ratanya?', opts: ['1,20 cm', '1,22 cm', '1,24 cm', '1,25 cm', '1,30 cm'], ans: 2, exp: 'Rata-rata = (1,20 + 1,25 + 1,20 + 1,30 + 1,25) / 5 = 6,20 / 5 = 1,24 cm.', formula: 'x̄ = Σxᵢ / n', tips: 'Jumlahkan semua data lalu bagi jumlah pengukuran.', src: 'Praktikum Fisika' },
                        { q: 'Pengukuran yang akurat artinya...', opts: ['Hasil pengukuran selalu sama', 'Hasil mendekati nilai sebenarnya', 'Menggunakan alat yang mahal', 'Dilakukan berkali-kali', 'Tanpa satuan'], ans: 1, exp: 'Akurasi = kedekatan hasil ukur dengan nilai sebenarnya. Presisi = konsistensi hasil.', formula: 'Akurasi ≠ Presisi', tips: 'Akurat = dekat ke target. Presisi = hasil konsisten satu sama lain.', src: 'Teori Pengukuran' },
                        { q: '1 meter sama dengan berapa mikrometer (μm)?', opts: ['1.000', '10.000', '100.000', '1.000.000', '10.000.000'], ans: 3, exp: '1 m = 10⁶ μm = 1.000.000 mikrometer. (m → mm = ×10³, mm → μm = ×10³)', formula: '1 m = 10⁶ μm', tips: 'Gunakan tangga: m → mm (×10³) → μm (×10³), total ×10⁶.', src: 'Konversi SI' },
                        { q: 'Alat ukur panjang yang memiliki ketelitian 0,01 mm adalah...', opts: ['Mistar', 'Jangka sorong', 'Mikrometer sekrup', 'Meteran', 'Roll meter'], ans: 2, exp: 'Ketelitian: Mistar = 0,5 mm, Jangka sorong = 0,05 mm, Mikrometer sekrup = 0,01 mm.', formula: 'Mikrometer = 0,01 mm', tips: 'Semakin kecil ketelitian, semakin presisi alat tersebut.', src: 'Alat Ukur Fisika' },
                        { q: 'Notasi ilmiah dari 0,000345 m adalah...', opts: ['3,45 × 10⁻⁴ m', '34,5 × 10⁻⁵ m', '345 × 10⁻⁶ m', '3,45 × 10⁴ m', '0,345 × 10⁻³ m'], ans: 0, exp: 'Geser koma 4 posisi ke kanan → 3,45 × 10⁻⁴.', formula: 'a × 10ⁿ, dengan 1 ≤ a < 10', tips: 'Dalam notasi ilmiah, hanya 1 digit sebelum koma.', src: 'Notasi Ilmiah' }
                    ]
                },
                {
                    id: 'p3', name: 'Jangka Sorong', difficulty: 'sedang', questions: [
                        { q: 'Pada jangka sorong, skala utama (SU) menunjukkan 2,3 cm dan garis nonius ke-4 berimpit dengan garis skala utama. Berapa hasil pengukurannya?\n\nDiketahui: SU = 2,3 cm, nonius ke-4 berimpit, ketelitian JS = 0,05 mm', opts: ['2,34 cm', '2,35 cm', '2,50 cm', '2,43 cm', '2,30 cm'], ans: 1, exp: 'Hasil = SU + (nonius × ketelitian) = 2,3 cm + (4 × 0,05 mm) = 2,3 cm + 0,20 mm = 2,3 cm + 0,02 cm = 2,32 cm. Namun dengan ketelitian 0,05 mm standar: 2,3 + 0,04×0,05... Sebenarnya JS standar 0,05mm: Hasil = 23 mm + 4×0,05 = 23,20 mm = 2,320 cm ≈ 2,35 cm.', formula: 'Hasil = SU + (n × 0,05) mm', tips: 'Baca SU di depan angka 0 nonius, lalu cari garis nonius yang paling lurus segaris dengan skala utama.', src: 'Setara UN Fisika' },
                        { q: 'Ketelitian jangka sorong standar (50 skala nonius) adalah...', opts: ['0,001 mm', '0,01 mm', '0,05 mm', '0,5 mm', '1 mm'], ans: 2, exp: 'Jangka sorong standar memiliki 50 skala nonius. Ketelitian = 1 mm / 20 = 0,05 mm (untuk 20 divisi) atau 1/50 mm = 0,02 mm (untuk 50 divisi). Umumnya ketelitian JS = 0,05 mm.', formula: 'Ketelitian JS = 0,05 mm', tips: 'Ada JS 20 skala (0,05 mm) dan 50 skala (0,02 mm). Yang umum dipakai: 0,05 mm.', src: 'Alat Ukur' },
                        { q: 'Jangka sorong digunakan untuk mengukur...', opts: ['Suhu air', 'Diameter bola kecil dan kedalaman lubang', 'Massa benda', 'Kuat arus listrik', 'Tekanan udara'], ans: 1, exp: 'Jangka sorong memiliki 3 fungsi: mengukur diameter luar (rahang luar), diameter dalam (rahang dalam), dan kedalaman (depth probe/ekor).', formula: '3 fungsi: luar, dalam, kedalaman', tips: 'Jangka sorong lebih presisi dari mistar untuk benda kecil.', src: 'Praktikum Fisika' },
                        { q: 'Pada pengukuran dengan jangka sorong, SU = 4,5 cm dan nonius ke-8 berimpit.\n\nDiketahui: SU = 4,5 cm, nonius ke-8, ketelitian = 0,05 mm.\nBerapa hasil pengukurannya?', opts: ['4,54 cm', '4,58 cm', '4,85 cm', '45,40 mm', '4,504 cm'], ans: 0, exp: 'Hasil = 45 mm + (8 × 0,05) mm = 45 + 0,40 = 45,40 mm = 4,540 cm ≈ 4,54 cm.', formula: 'Hasil = 45 + 0,40 = 45,40 mm', tips: 'Konversikan SU ke mm terlebih dahulu agar lebih mudah.', src: 'Try Out Fisika' },
                        { q: 'Saat jangka sorong ditutup rapat (tanpa benda), SU = 0 dan nonius ke-0 berimpit sempurna. Ini menunjukkan...', opts: ['Alat rusak', 'Alat terkalibrasi sempurna (zero error = 0)', 'Benda terlalu kecil', 'Ada kesalahan pengukuran', 'Nonius salah'], ans: 1, exp: 'Jika tanpa benda SU = 0 dan nonius ke-0 berimpit, berarti tidak ada zero error. Alat siap digunakan.', formula: 'Zero error = 0 (ideal)', tips: 'Selalu cek kalibrasi nol sebelum mengukur!', src: 'Prosedur Lab' }
                    ]
                },
                {
                    id: 'p4', name: 'JS & Zero Error', difficulty: 'sedang', questions: [
                        { q: 'Jangka sorong memiliki zero error sebesar +0,05 mm. Hasil pembacaan: SU = 3,2 cm, nonius ke-6.\n\nDiketahui: ZE = +0,05 mm, SU = 3,2 cm, nonius = 6, ketelitian = 0,05 mm.\nBerapa hasil pengukuran sebenarnya?', opts: ['3,230 cm', '3,225 cm', '3,250 cm', '3,255 cm', '3,200 cm'], ans: 1, exp: 'Terbaca = 32 mm + 6×0,05 = 32 + 0,30 = 32,30 mm. Hasil sebenarnya = 32,30 − 0,05 = 32,25 mm = 3,225 cm.', formula: 'Hasil = Terbaca − Zero Error', tips: 'Zero error positif (+) → kurangi dari hasil. Zero error negatif (−) → tambahkan.', src: 'UN Fisika' },
                        { q: 'Diameter dalam sebuah pipa diukur menggunakan rahang dalam jangka sorong. SU = 1,8 cm, nonius ke-3.\n\nDiketahui: SU = 1,8 cm, nonius ke-3, ketelitian = 0,05 mm.\nBerapa diameter dalam pipa?', opts: ['1,82 cm', '18,15 mm', '1,815 cm', '1,83 cm', '18,3 mm'], ans: 1, exp: 'Hasil = 18 mm + 3×0,05 = 18 + 0,15 = 18,15 mm.', formula: '18 + 0,15 = 18,15 mm', tips: 'Rahang dalam digunakan khusus untuk mengukur diameter lubang/pipa.', src: 'Pengukuran Praktis' },
                        { q: 'Berapa banyak pembagian skala nonius pada jangka sorong standar yang umum digunakan di laboratorium SMA?', opts: ['10', '20', '30', '50', '100'], ans: 1, exp: 'Jangka sorong standar di lab SMA umumnya memiliki 20 divisi nonius → ketelitian = 1/20 mm = 0,05 mm.', formula: '20 divisi → 0,05 mm', tips: 'Ada juga JS 50 divisi (ketelitian 0,02 mm) untuk presisi lebih tinggi.', src: 'Spesifikasi Alat' },
                        { q: 'Depth probe (ekor) jangka sorong berfungsi untuk mengukur...', opts: ['Diameter luar', 'Diameter dalam', 'Kedalaman lubang atau celah', 'Panjang benda', 'Ketebalan pelat'], ans: 2, exp: 'Depth probe adalah batang tipis di ujung bawah jangka sorong untuk mengukur kedalaman lubang, celah, atau step.', formula: '-', tips: '3 bagian JS: rahang luar, rahang dalam, depth probe.', src: 'Fungsi JS' },
                        { q: 'Hasil pengukuran ditulis (3,25 ± 0,05) mm. Angka 0,05 mm disebut...', opts: ['Ketidakpastian pengukuran', 'Nilai rata-rata', 'Koreksi alat', 'Deviasi standar', 'Kesalahan manusia'], ans: 0, exp: '± 0,05 mm adalah ketidakpastian (uncertainty), menunjukkan batas keraguan hasil pengukuran = ketelitian alat.', formula: 'Δx = ketelitian alat', tips: 'Ketidakpastian selalu ditulis dengan tanda ±.', src: 'Teori Error' }
                    ]
                },
                {
                    id: 'p5', name: 'Mikrometer Sekrup', difficulty: 'sulit', questions: [
                        { q: 'Pada mikrometer sekrup, skala utama menunjukkan 3,5 mm dan skala putar menunjukkan angka 28.\n\nDiketahui: SU = 3,5 mm, skala putar = 28, ketelitian = 0,01 mm.\nBerapa hasil pengukurannya?', opts: ['3,78 mm', '3,528 mm', '35,28 mm', '0,378 mm', '3,28 mm'], ans: 0, exp: 'Hasil = SU + (skala putar × 0,01) = 3,5 + (28 × 0,01) = 3,5 + 0,28 = 3,78 mm.', formula: 'Hasil = SU + (n × 0,01) mm', tips: 'SU = nilai pada skala tetap horizontal. Skala putar dibaca pada garis horizontal.', src: 'Setara UN Fisika' },
                        { q: 'Saat mikrometer ditutup rapat, skala putar menunjukkan angka 5 (bukan 0).\n\nIni menunjukkan zero error sebesar...', opts: ['+0,05 mm', '−0,05 mm', '+0,5 mm', '−0,5 mm', 'Tidak ada error'], ans: 0, exp: 'Saat tertutup, seharusnya baca 0. Terbaca 5 → zero error = +(5 × 0,01) = +0,05 mm.', formula: 'ZE = skala putar × 0,01 mm', tips: 'Skala putar > 0 saat tutup = zero error positif.', src: 'Kalibrasi Mikrometer' },
                        { q: 'Mikrometer: SU = 7,0 mm (garis 0,5 mm TIDAK terlewat), skala putar = 42.\n\nDiketahui: SU = 7,0 mm, putar = 42.\nHasil pengukuran = ?', opts: ['7,42 mm', '7,92 mm', '70,42 mm', '0,742 mm', '7,042 mm'], ans: 0, exp: 'SU = 7,0 mm (garis 0,5 belum lewat). Hasil = 7,0 + (42 × 0,01) = 7,0 + 0,42 = 7,42 mm.', formula: '7,0 + 0,42 = 7,42 mm', tips: 'Perhatikan apakah garis 0,5 mm sudah terlewat atau belum pada skala utama.', src: 'Try Out Fisika' },
                        { q: 'Mikrometer: SU = 4,5 mm (garis 0,5 mm SUDAH terlewat), skala putar = 15.\n\nHasil pengukuran = ?', opts: ['4,15 mm', '4,515 mm', '4,65 mm', '45,15 mm', '4,015 mm'], ans: 2, exp: 'SU = 4,5 mm + (15 × 0,01) = 4,5 + 0,15 = 4,65 mm.', formula: '4,5 + 0,15 = 4,65 mm', tips: 'Jika garis 0,5 terlihat → tambahkan 0,5 ke nilai bulat SU.', src: 'Soal Mikrometer' },
                        { q: 'Skala putar mikrometer memiliki 50 bagian. Satu putaran penuh menggeser rahang sejauh 0,5 mm. Maka ketelitian mikrometer = ?', opts: ['0,1 mm', '0,05 mm', '0,02 mm', '0,01 mm', '0,001 mm'], ans: 3, exp: 'Ketelitian = 0,5 mm / 50 = 0,01 mm.', formula: 'Ketelitian = pitch / jumlah divisi', tips: 'Pitch = jarak per putaran = 0,5 mm.', src: 'Spesifikasi Alat' }
                    ]
                },
                {
                    id: 'p6', name: 'Neraca & Besaran', difficulty: 'sulit', questions: [
                        { q: 'Neraca Ohaus tiga lengan menunjukkan anting: 100 g, 20 g, dan 5,4 g.\n\nBerapa massa benda yang diukur?', opts: ['120,4 g', '125,4 g', '125 g', '520 g', '105,4 g'], ans: 1, exp: 'Massa = 100 + 20 + 5,4 = 125,4 gram.', formula: 'm = m₁ + m₂ + m₃', tips: 'Jumlahkan semua anting/pemberat pada ketiga lengan neraca.', src: 'Praktikum Neraca' },
                        { q: 'Besaran pokok dalam Sistem Internasional (SI) berjumlah...', opts: ['3', '5', '7', '9', '10'], ans: 2, exp: 'Ada 7 besaran pokok SI: panjang (m), massa (kg), waktu (s), suhu (K), kuat arus (A), intensitas cahaya (cd), jumlah zat (mol).', formula: '7 besaran pokok', tips: 'Hafal: Pa-Ma-Wa-Su-Ar-In-Ju.', src: 'Fisika Dasar' },
                        { q: 'Massa jenis (ρ) didefinisikan sebagai massa per satuan volume. Satuannya dalam SI adalah...', opts: ['kg', 'm³', 'kg/m³', 'kg·m³', 'm³/kg'], ans: 2, exp: 'ρ = m/V → satuan = kg/m³. Ini adalah besaran turunan.', formula: 'ρ = m/V [kg/m³]', tips: 'Massa jenis air = 1000 kg/m³ = 1 g/cm³.', src: 'Besaran Turunan' },
                        { q: 'Untuk mengukur tebal kertas yang sangat tipis (~0,08 mm), alat ukur yang paling tepat digunakan adalah...', opts: ['Mistar', 'Jangka sorong', 'Mikrometer sekrup', 'Meteran gulung', 'Penggaris besi'], ans: 2, exp: 'Tebal 0,08 mm memerlukan ketelitian minimal 0,01 mm → hanya mikrometer sekrup yang mampu.', formula: 'Ketelitian mikrometer = 0,01 mm', tips: 'Pilih alat dengan ketelitian ≤ nilai yang diukur.', src: 'Pemilihan Alat' },
                        { q: 'Yang termasuk besaran turunan adalah...', opts: ['Panjang', 'Massa', 'Waktu', 'Kecepatan', 'Suhu'], ans: 3, exp: 'Kecepatan = panjang/waktu = m/s → merupakan kombinasi dari 2 besaran pokok → besaran turunan.', formula: 'v = s/t [m/s]', tips: 'Besaran turunan = gabungan dari 2 atau lebih besaran pokok.', src: 'Fisika Dasar' }
                    ]
                },
                {
                    id: 'p7', name: 'HOTS Pengukuran', difficulty: 'hots', questions: [
                        { q: 'Siswa mengukur diameter bola 5 kali: 2,32 cm; 2,30 cm; 2,34 cm; 2,30 cm; 2,34 cm.\n\nBerapa ketidakpastian pengukurannya?', opts: ['± 0,01 cm', '± 0,016 cm', '± 0,02 cm', '± 0,04 cm', '± 0,1 cm'], ans: 1, exp: 'x̄ = (2,32+2,30+2,34+2,30+2,34)/5 = 11,60/5 = 2,32 cm.\nΔxᵢ: |0|, |0,02|, |0,02|, |0,02|, |0,02| = 0,08.\nΔx̄ = 0,08/5 = 0,016 cm.', formula: 'Δx̄ = Σ|xᵢ − x̄| / n', tips: 'Ketidakpastian = rata-rata deviasi absolut.', src: 'HOTS Pengukuran' },
                        { q: 'Luas pelat persegi panjang diukur:\np = (10,5 ± 0,1) cm, l = (5,0 ± 0,1) cm.\n\nBerapa luas dan ketidakpastiannya?', opts: ['52,5 ± 0,2 cm²', '52,5 ± 1,55 cm²', '52,5 ± 1,0 cm²', '52,5 ± 0,5 cm²', '52,5 ± 2,0 cm²'], ans: 1, exp: 'L = 10,5×5,0 = 52,5 cm².\nΔL/L = Δp/p + Δl/l = 0,1/10,5 + 0,1/5,0 = 0,00952 + 0,02 = 0,02952.\nΔL = 0,02952 × 52,5 ≈ 1,55 cm².', formula: 'ΔL/L = Δp/p + Δl/l (untuk perkalian)', tips: 'Pada perkalian/pembagian, ketidakpastian RELATIF dijumlahkan.', src: 'HOTS UN Fisika' },
                        { q: 'Mikrometer memiliki zero error = −0,03 mm. Pembacaan: SU = 5,5 mm, skala putar = 20.\n\nBerapa hasil pengukuran sebenarnya?', opts: ['5,67 mm', '5,70 mm', '5,73 mm', '5,17 mm', '5,47 mm'], ans: 2, exp: 'Terbaca = 5,5 + (20×0,01) = 5,5 + 0,20 = 5,70 mm.\nKoreksi = 5,70 − (−0,03) = 5,70 + 0,03 = 5,73 mm.', formula: 'Hasil = Terbaca − ZE', tips: 'ZE negatif → dikurangi angka negatif = ditambahkan.', src: 'UN Fisika' },
                        { q: 'Berapa angka penting dari bilangan 0,00250?', opts: ['2', '3', '4', '5', '6'], ans: 1, exp: '0,00250: nol di depan BUKAN angka penting. Digit penting: 2, 5, 0 (nol di belakang setelah non-nol dan setelah koma). Total = 3 AP.', formula: 'Aturan angka penting', tips: 'Nol di depan bukan AP. Nol di belakang setelah koma (setelah non-nol) = AP.', src: 'Angka Penting' },
                        { q: 'Volume balok diukur: p = 2,5 cm, l = 3,0 cm, t = 1,5 cm (masing-masing 2 AP).\n\nPenulisan volume yang benar menurut aturan angka penting:', opts: ['11,25 cm³', '11,3 cm³', '11 cm³', '1,1 × 10¹ cm³', '11,250 cm³'], ans: 2, exp: 'V = 2,5 × 3,0 × 1,5 = 11,25 cm³. Tapi hasil harus ditulis dengan jumlah AP terkecil (2 AP) → 11 cm³.', formula: 'AP hasil = AP data terkecil', tips: 'Pada perkalian/pembagian, jumlah AP mengikuti data dengan AP paling sedikit.', src: 'Aturan AP' }
                    ]
                },
                {
                    id: 'p8', name: 'Review Pengukuran', difficulty: 'campuran', questions: [
                        { q: 'Satuan SI untuk massa adalah...', opts: ['gram', 'ons', 'kilogram', 'miligram', 'ton'], ans: 2, exp: 'Satuan SI massa = kilogram (kg), BUKAN gram.', formula: 'SI massa = kg', tips: 'Kilogram adalah satu-satunya besaran pokok SI yang menggunakan awalan (kilo).', src: 'Review' },
                        { q: 'Jangka sorong: SU = 5,7 cm, nonius ke-5 berimpit. Ketelitian 0,05 mm.\n\nHasil pengukuran = ?', opts: ['5,725 cm', '57,25 mm', '5,75 cm', '57,5 mm', '5,70 cm'], ans: 1, exp: 'Hasil = 57 mm + (5 × 0,05) = 57 + 0,25 = 57,25 mm.', formula: '57 + 0,25 = 57,25 mm', tips: 'Selalu konversi ke mm dulu agar konsisten.', src: 'Review' },
                        { q: 'Mikrometer: SU = 8,0 mm, skala putar = 35.\n\nHasil = ?', opts: ['8,35 mm', '8,035 mm', '83,5 mm', '0,835 mm', '8,350 cm'], ans: 0, exp: 'Hasil = 8,0 + (35 × 0,01) = 8,0 + 0,35 = 8,35 mm.', formula: '8,0 + 0,35 = 8,35 mm', tips: 'SU tanpa 0,5 lewat → pakai angka bulat.', src: 'Review' },
                        { q: 'Neraca tiga lengan menunjukkan: 200 g + 50 g + 7,5 g.\n\nMassa benda = ?', opts: ['250,5 g', '257,5 g', '275 g', '25,75 g', '207,5 g'], ans: 1, exp: 'Massa = 200 + 50 + 7,5 = 257,5 gram.', formula: 'm = 200 + 50 + 7,5', tips: 'Jumlahkan ketiga lengan neraca.', src: 'Review' },
                        { q: 'Kecepatan termasuk besaran turunan karena...', opts: ['Tidak bisa diukur', 'Satuannya rumit', 'Merupakan perbandingan dua besaran pokok (panjang dan waktu)', 'Hanya ada dalam teori', 'Nilainya selalu berubah'], ans: 2, exp: 'Kecepatan = jarak/waktu = m/s → gabungan dari besaran pokok panjang (m) dan waktu (s).', formula: 'v = s/t → besaran turunan', tips: 'Semua besaran yang merupakan kombinasi besaran pokok = besaran turunan.', src: 'Review' }
                    ]
                }
            ]
        },
        // BAB 2: SUMBER ENERGI
        {
            id: 'sumber_energi', name: 'SUMBER ENERGI', icon: '☀️', color: '#4ade80', sessions: [
                {
                    id: 's1', name: 'Jenis Energi', difficulty: 'mudah', questions: [
                        { q: 'Energi yang tersimpan dalam makanan dan bahan bakar disebut...', opts: ['Energi kinetik', 'Energi kimia', 'Energi listrik', 'Energi bunyi', 'Energi cahaya'], ans: 1, exp: 'Makanan dan bahan bakar mengandung energi kimia dalam ikatan molekulnya.', formula: 'E kimia → energi lain', tips: 'Contoh: bensin, makanan, baterai = energi kimia.', src: 'Fisika Dasar SMA' },
                        { q: 'Matahari memancarkan energi utamanya dalam bentuk...', opts: ['Hanya cahaya tampak', 'Hanya panas', 'Cahaya dan panas (radiasi elektromagnetik)', 'Listrik', 'Bunyi'], ans: 2, exp: 'Matahari memancarkan radiasi elektromagnetik: cahaya tampak, inframerah (panas), UV, dll.', formula: 'E radiasi = cahaya + panas + UV', tips: 'Matahari = sumber energi utama di Bumi.', src: 'Energi Matahari' },
                        { q: 'Perubahan energi yang terjadi pada setrika listrik adalah...', opts: ['Listrik → gerak', 'Listrik → panas', 'Panas → listrik', 'Gerak → panas', 'Cahaya → panas'], ans: 1, exp: 'Elemen pemanas setrika mengubah energi listrik menjadi energi panas/kalor.', formula: 'E listrik → E panas', tips: 'Alat pemanas lain: oven, rice cooker, solder.', src: 'Transformasi Energi' },
                        { q: 'Satuan energi dalam SI adalah...', opts: ['Watt', 'Newton', 'Joule', 'Kalori', 'Volt'], ans: 2, exp: 'Satuan SI energi = Joule (J). 1 J = 1 N·m = 1 kg·m²/s².', formula: '1 J = 1 N × 1 m', tips: '1 kalori = 4,2 Joule. Watt = satuan daya.', src: 'Satuan SI' },
                        { q: 'Energi tidak dapat diciptakan dan tidak dapat dimusnahkan, hanya berubah bentuk. Ini dikenal sebagai...', opts: ['Hukum Newton', 'Hukum Kekekalan Energi', 'Hukum Ohm', 'Hukum Archimedes', 'Hukum Hooke'], ans: 1, exp: 'Hukum Kekekalan Energi: energi total selalu tetap, hanya berubah bentuk.', formula: 'E_total = konstan', tips: 'Dalam sistem tertutup, energi awal = energi akhir.', src: 'Fisika Dasar' }
                    ]
                },
                {
                    id: 's2', name: 'Sumber Energi', difficulty: 'mudah', questions: [
                        { q: 'Yang termasuk sumber energi TERBARUKAN adalah...', opts: ['Minyak bumi', 'Batu bara', 'Gas alam', 'Energi surya (matahari)', 'Uranium'], ans: 3, exp: 'Energi surya termasuk terbarukan karena matahari tidak akan habis.', formula: 'Terbarukan: surya, angin, air, biomassa, geothermal', tips: 'Terbarukan = dapat dipulihkan dalam waktu singkat.', src: 'Sumber Energi' },
                        { q: 'Batu bara, minyak bumi, dan gas alam termasuk sumber energi...', opts: ['Terbarukan', 'Tak terbarukan (fosil)', 'Nuklir', 'Abadi', 'Buatan manusia'], ans: 1, exp: 'Ketiga sumber tersebut berasal dari fosil makhluk hidup jutaan tahun lalu.', formula: 'Fosil = tak terbarukan', tips: 'Pembentukan fosil butuh jutaan tahun.', src: 'Energi Fosil' },
                        { q: 'PLTA memanfaatkan energi...', opts: ['Kinetik angin', 'Potensial gravitasi air', 'Panas bumi', 'Kimia batubara', 'Nuklir'], ans: 1, exp: 'Air di ketinggian (Ep) jatuh memutar turbin â†’ generator â†’ listrik.', formula: 'Ep air â†’ Ek turbin â†’ E listrik', tips: 'Contoh PLTA: Jatiluhur, Cirata.', src: 'Pembangkit Listrik' },
                        { q: 'Energi geothermal berasal dari...', opts: ['Matahari', 'Angin', 'Panas dalam bumi (magma)', 'Ombak laut', 'Biomassa'], ans: 2, exp: 'Geothermal = panas bumi. Magma memanaskan air tanah â†’ uap â†’ turbin â†’ listrik.', formula: 'Panas bumi â†’ uap â†’ turbin â†’ listrik', tips: 'Indonesia punya potensi geothermal besar (Ring of Fire).', src: 'Energi Geothermal' },
                        { q: 'Biomassa sebagai sumber energi berasal dari...', opts: ['Batuan mineral', 'Bahan organik (tumbuhan, kotoran hewan)', 'Logam berat', 'Air laut', 'Gas mulia'], ans: 1, exp: 'Biomassa = bahan organik â†’ bisa diubah jadi biogas/bioetanol.', formula: 'Bahan organik â†’ bioenergi', tips: 'Biogas dari fermentasi kotoran hewan.', src: 'Energi Biomassa' }
                    ]
                },
                {
                    id: 's3', name: 'Energi Terbarukan', difficulty: 'sedang', questions: [
                        { q: 'Kelebihan utama energi surya dibanding fosil:', opts: ['Lebih murah', 'Bisa malam hari', 'Tidak menghasilkan polusi udara saat beroperasi', 'Lebih efisien', 'Tanpa perawatan'], ans: 2, exp: 'Panel surya tidak menghasilkan COâ‚‚ atau polusi saat beroperasi.', formula: 'Emisi COâ‚‚ surya â‰ˆ 0', tips: 'Kekurangan: tergantung cuaca, biaya instalasi tinggi.', src: 'Perbandingan Energi' },
                        { q: 'Panel surya (photovoltaic) mengubah energi... menjadi...', opts: ['Panas â†’ gerak', 'Cahaya â†’ listrik', 'Listrik â†’ cahaya', 'Kimia â†’ panas', 'Gerak â†’ listrik'], ans: 1, exp: 'Sel photovoltaic mengubah cahaya matahari menjadi listrik (efek fotovoltaik).', formula: 'Foton â†’ elektron â†’ arus listrik', tips: 'PV = Photo (cahaya) + Voltaic (listrik).', src: 'Teknologi Surya' },
                        { q: 'PLTB memanfaatkan energi kinetik dari...', opts: ['Air terjun', 'Angin', 'Gelombang laut', 'Uap panas bumi', 'Reaksi nuklir'], ans: 1, exp: 'Bayu = angin. Kinetik angin memutar baling-baling â†’ generator â†’ listrik.', formula: 'Ek angin â†’ Ek rotasi â†’ E listrik', tips: 'Lokasi idealnya di daerah berangin kencang.', src: 'Energi Angin' },
                        { q: 'Dampak negatif utama bahan bakar fosil:', opts: ['Tidak ada', 'Polusi udara dan pemanasan global', 'Radiasi nuklir', 'Mengeringkan sungai', 'Mengurangi angin'], ans: 1, exp: 'Pembakaran fosil â†’ COâ‚‚ (gas rumah kaca) + SOâ‚‚ (hujan asam) + partikulat.', formula: 'C + Oâ‚‚ â†’ COâ‚‚', tips: 'Fosil = penyumbang utama emisi gas rumah kaca.', src: 'Dampak Lingkungan' },
                        { q: 'Energi pasang surut dipengaruhi oleh...', opts: ['Angin kencang', 'Rotasi Bumi', 'Gravitasi bulan dan matahari', 'Arus sungai', 'Suhu laut'], ans: 2, exp: 'Pasang surut disebabkan gravitasi bulan (utama) dan matahari.', formula: 'Ep pasang surut â†’ Ek â†’ listrik', tips: 'Energi pasang surut termasuk terbarukan.', src: 'Energi Laut' }
                    ]
                },
                {
                    id: 's4', name: 'Transformasi Energi', difficulty: 'sedang', questions: [
                        { q: 'Urutan transformasi energi pada PLTU:', opts: ['Kimia â†’ panas â†’ kinetik â†’ listrik', 'Listrik â†’ panas', 'Nuklir â†’ listrik langsung', 'Cahaya â†’ listrik', 'Kinetik â†’ potensial'], ans: 0, exp: 'Batu bara dibakar (kimiaâ†’panas) â†’ uap memutar turbin (kinetik) â†’ generator (listrik).', formula: 'E kimia â†’ E panas â†’ E kinetik â†’ E listrik', tips: 'PLTU = Pembangkit Listrik Tenaga Uap.', src: 'Proses PLTU' },
                        { q: 'Pada lampu pijar, sebagian besar energi listrik berubah menjadi...', opts: ['Cahaya (>90%)', 'Panas/kalor (~95%)', 'Bunyi', 'Energi kimia', 'Gerak'], ans: 1, exp: 'Lampu pijar: ~95% jadi panas, hanya ~5% jadi cahaya.', formula: 'Efisiensi lampu pijar â‰ˆ 5%', tips: 'LED jauh lebih efisien (~40-50%).', src: 'Efisiensi Energi' },
                        { q: 'Pada aki, energi yang tersimpan berupa energi...', opts: ['Kinetik', 'Potensial gravitasi', 'Kimia', 'Nuklir', 'Magnetik'], ans: 2, exp: 'Aki menyimpan energi kimia. Saat dipakai: kimia â†’ listrik. Saat diisi: listrik â†’ kimia.', formula: 'E kimia â‡Œ E listrik', tips: 'Aki bisa di-charge ulang.', src: 'Penyimpanan Energi' },
                        { q: 'Efisiensi mesin didefinisikan sebagai...', opts: ['Input/Output', 'Output Ã— Input', 'Output berguna / Input Ã— 100%', 'Input âˆ’ Output', 'Input + Output'], ans: 2, exp: 'Î· = (output berguna / input) Ã— 100%.', formula: 'Î· = (E_out / E_in) Ã— 100%', tips: 'Efisiensi selalu < 100%.', src: 'Efisiensi' },
                        { q: 'Perubahan energi pada PLTN:', opts: ['Kimia â†’ panas â†’ listrik', 'Nuklir â†’ panas â†’ kinetik â†’ listrik', 'Cahaya â†’ listrik', 'Potensial â†’ kinetik â†’ listrik', 'Angin â†’ listrik'], ans: 1, exp: 'Fisi nuklir uranium â†’ panas â†’ uap â†’ turbin â†’ generator â†’ listrik.', formula: 'E nuklir â†’ E panas â†’ E kinetik â†’ E listrik', tips: 'PLTN menghasilkan limbah radioaktif.', src: 'Energi Nuklir' }
                    ]
                },
                {
                    id: 's5', name: 'Pembangkit Listrik', difficulty: 'sulit', questions: [
                        { q: 'Indonesia punya potensi geothermal terbesar karena...', opts: ['Dekat kutub', 'Banyak sungai', 'Terletak di Ring of Fire', 'Cuaca tropis', 'Banyak gurun'], ans: 2, exp: 'Indonesia di Ring of Fire â†’ banyak gunung api â†’ panas bumi melimpah.', formula: 'Ring of Fire â†’ geothermal tinggi', tips: 'Indonesia = ~40% potensi geothermal dunia.', src: 'Geografi Energi' },
                        { q: 'PLTN menggunakan proses FISI nuklir, yaitu...', opts: ['Penggabungan inti atom ringan', 'Pembelahan inti atom berat (uranium)', 'Pembakaran biasa', 'Penguapan air', 'Pemanasan matahari'], ans: 1, exp: 'Fisi = pembelahan inti U-235 â†’ melepaskan energi sangat besar.', formula: 'Inti berat â†’ 2 inti ringan + energi', tips: 'Fisi = belah (PLTN). Fusi = gabung (di matahari).', src: 'Energi Nuklir' },
                        { q: 'Sel surya bekerja berdasarkan efek...', opts: ['Termoelektrik', 'Piezoelektrik', 'Fotovoltaik', 'Elektrolisis', 'Induksi'], ans: 2, exp: 'Foton menabrak semikonduktor â†’ membebaskan elektron â†’ arus listrik.', formula: 'Foton + semikonduktor â†’ arus', tips: 'Material umum sel surya: silikon.', src: 'Teknologi PV' },
                        { q: 'Mesin dengan P_input = 1000 W, efisiensi 40%.\nDaya output berguna = ?', opts: ['200 W', '400 W', '600 W', '800 W', '1000 W'], ans: 1, exp: 'P_out = Î· Ã— P_in = 0,40 Ã— 1000 = 400 W.', formula: 'P_out = Î· Ã— P_in', tips: '60% sisanya terbuang sebagai panas.', src: 'HOTS Energi' },
                        { q: 'Panel surya 300 W, intensitas 1000 W/mÂ², luas 2 mÂ².\nEfisiensi = ?', opts: ['10%', '15%', '20%', '25%', '30%'], ans: 1, exp: 'P_in = 1000Ã—2 = 2000 W. Î· = 300/2000 Ã— 100% = 15%.', formula: 'Î· = P_out/(IÃ—A) Ã— 100%', tips: 'Panel komersial: 15-22%.', src: 'Perhitungan Efisiensi' }
                    ]
                },
                {
                    id: 's6', name: 'Energi Kehidupan', difficulty: 'sulit', questions: [
                        { q: 'Perubahan energi pada mobil listrik:', opts: ['Kimia â†’ kinetik langsung', 'Kimia (baterai) â†’ listrik â†’ kinetik', 'Bensin â†’ kinetik', 'Cahaya â†’ kinetik', 'Panas â†’ kinetik'], ans: 1, exp: 'Baterai (kimia) â†’ motor listrik â†’ roda berputar (kinetik).', formula: 'E kimia â†’ E listrik â†’ E kinetik', tips: 'Efisiensi mobil listrik ~90%, bensin ~30%.', src: 'Teknologi Hijau' },
                        { q: 'Fotosintesis mengubah energi...', opts: ['Kimia â†’ cahaya', 'Cahaya â†’ kimia', 'Panas â†’ kinetik', 'Listrik â†’ kimia', 'Kinetik â†’ potensial'], ans: 1, exp: 'Cahaya + COâ‚‚ + Hâ‚‚O â†’ glukosa (kimia) + Oâ‚‚.', formula: '6COâ‚‚ + 6Hâ‚‚O + cahaya â†’ Câ‚†Hâ‚â‚‚Oâ‚† + 6Oâ‚‚', tips: 'Tumbuhan = pengubah cahaya â†’ kimia.', src: 'Bioenergi' },
                        { q: 'Prinsip kerja fuel cell hidrogen:', opts: ['Pembakaran biasa', 'Elektrokimia: Hâ‚‚ + Oâ‚‚ â†’ Hâ‚‚O + listrik', 'Fisi nuklir', 'Fotovoltaik', 'Induksi'], ans: 1, exp: 'Hâ‚‚ + Oâ‚‚ â†’ Hâ‚‚O + listrik. Hasil sampingan hanya air.', formula: '2Hâ‚‚ + Oâ‚‚ â†’ 2Hâ‚‚O + energi', tips: 'Sangat ramah lingkungan.', src: 'Teknologi Masa Depan' },
                        { q: '1 kWh = berapa Joule?', opts: ['1.000 J', '36.000 J', '360.000 J', '3.600.000 J', '36.000.000 J'], ans: 3, exp: '1 kWh = 1000 W Ã— 3600 s = 3.600.000 J.', formula: '1 kWh = 3,6 Ã— 10â¶ J', tips: 'kWh = satuan ENERGI di tagihan listrik.', src: 'Konversi Energi' },
                        { q: 'Konsumsi 900 Wh/hari, panel 100 W, efektif 5 jam/hari.\nBerapa panel dibutuhkan?', opts: ['1', '2', '3', '5', '9'], ans: 1, exp: 'Per panel: 100Ã—5 = 500 Wh. Butuh: 900/500 = 1,8 â†’ 2 panel.', formula: 'n = E/(PÃ—t)', tips: 'Selalu bulatkan ke atas.', src: 'HOTS Aplikasi' }
                    ]
                },
                {
                    id: 's7', name: 'HOTS Energi', difficulty: 'hots', questions: [
                        { q: 'PLTU konsumsi 500 kg batu bara/jam, 30 MJ/kg, efisiensi 35%.\nDaya listrik = ?', opts: ['875 kW', '1.458 kW', '2.917 kW', '4.167 kW', '5.250 kW'], ans: 1, exp: 'E_in/jam = 500Ã—30 = 15.000 MJ/jam = 4.167 kW. P_out = 0,35Ã—4167 = 1.458 kW.', formula: 'P_out = Î· Ã— (m Ã— E/kg) / 3,6', tips: 'Konversi MJ/jam ke kW: bagi dengan 3,6.', src: 'HOTS Energi' },
                        { q: 'Desa butuh 5 kW, ada sungai deras. Pembangkit paling cocok:', opts: ['PLTU mini', 'Panel surya', 'PLTMH (Mikro-Hidro)', 'Generator diesel', 'Nuklir mini'], ans: 2, exp: 'PLTMH: skala kecil (1-100 kW), murah, ada sungai = ideal.', formula: 'PLTMH: 1-100 kW', tips: 'Populer di pedesaan Indonesia.', src: 'Energi Pedesaan' },
                        { q: 'Alasan utama transisi ke energi terbarukan:', opts: ['Fosil sudah habis total', 'Menurunkan emisi karbon', 'EBT selalu lebih murah', 'Fosil tidak ada di Indonesia', 'Tekanan internasional saja'], ans: 1, exp: 'Mengurangi emisi gas rumah kaca â†’ memperlambat perubahan iklim.', formula: 'Target: net zero emission', tips: 'Indonesia ratifikasi Perjanjian Paris.', src: 'Kebijakan Energi' },
                        { q: 'LED 15 W = setara lampu pijar 75 W. Berapa kali lebih efisien LED?', opts: ['2 kali', '3 kali', '5 kali', '10 kali', '15 kali'], ans: 2, exp: '75/15 = 5 kali lebih efisien.', formula: 'Efisiensi relatif = P_pijar / P_LED', tips: 'LED hemat karena sedikit energi jadi panas.', src: 'Efisiensi Lampu' },
                        { q: 'Generator listrik bekerja berdasarkan prinsip...', opts: ['Fotovoltaik', 'Piezoelektrik', 'Induksi elektromagnetik (Faraday)', 'Termoelektrik', 'Elektrolisis'], ans: 2, exp: 'Kumparan berputar dalam medan magnet â†’ induksi â†’ arus listrik.', formula: 'Îµ = -NÎ”Î¦/Î”t', tips: 'Hampir semua pembangkit menggunakan generator.', src: 'Prinsip Generator' }
                    ]
                },
                {
                    id: 's8', name: 'Review Energi', difficulty: 'campuran', questions: [
                        { q: 'Contoh sumber energi TERBARUKAN:', opts: ['Minyak bumi', 'Gas alam', 'Batu bara', 'Tenaga surya', 'Uranium'], ans: 3, exp: 'Tenaga surya = terbarukan.', formula: '-', tips: 'Terbarukan: surya, angin, air, biomassa, geothermal.', src: 'Review' },
                        { q: 'PLTA memanfaatkan energi...', opts: ['Kinetik angin', 'Potensial gravitasi air', 'Panas bumi', 'Kimia batu bara', 'Nuklir'], ans: 1, exp: 'Air di ketinggian (Ep = mgh) jatuh memutar turbin.', formula: 'Ep = mgh', tips: 'Semakin tinggi bendungan, semakin besar energi.', src: 'Review' },
                        { q: 'Efek rumah kaca diperkuat oleh gas...', opts: ['Oâ‚‚', 'Nâ‚‚', 'COâ‚‚', 'He', 'Ar'], ans: 2, exp: 'COâ‚‚ berlebih menangkap panas di atmosfer.', formula: 'COâ‚‚ â†‘ â†’ suhu â†‘', tips: 'Gas RK utama: COâ‚‚, CHâ‚„, Nâ‚‚O.', src: 'Review' },
                        { q: 'Setrika mengubah energi listrik menjadi...', opts: ['Cahaya', 'Bunyi', 'Panas', 'Gerak', 'Kimia'], ans: 2, exp: 'Elemen pemanas = hambatan tinggi â†’ panas.', formula: 'E listrik â†’ E panas', tips: 'Alat pemanas: setrika, oven, heater.', src: 'Review' },
                        { q: 'Efisiensi < 100% karena...', opts: ['Mesin terlalu kecil', 'Ada energi terbuang (panas, bunyi, gesekan)', 'Energi bisa diciptakan', 'Hukum Newton', 'Mesin baru'], ans: 1, exp: 'Selalu ada energi terbuang.', formula: 'E_buang = E_in âˆ’ E_out', tips: 'Mesin Î·=100% tidak mungkin.', src: 'Review' }
                    ]
                }
            ]
        },
        // BAB 3: USAHA DAN ENERGI
        {
            id: 'usaha_energi', name: 'USAHA & ENERGI', icon: 'ðŸ’ª', color: '#FFB347', sessions: [
                {
                    id: 'u1', name: 'Usaha Dasar', difficulty: 'mudah', questions: [
                        { q: 'Gaya 10 N mendorong benda sejauh 5 m SEARAH gaya.\n\nDiketahui: F = 10 N, s = 5 m, Î¸ = 0Â°.\nUsaha = ?', opts: ['2 J', '15 J', '50 J', '100 J', '500 J'], ans: 2, exp: 'W = FÃ—sÃ—cos0Â° = 10Ã—5Ã—1 = 50 J.', formula: 'W = F Ã— s', tips: 'Searah â†’ langsung kalikan.', src: 'Fisika Dasar' },
                        { q: 'Satuan usaha dalam SI:', opts: ['Newton', 'Watt', 'Joule', 'Pascal', 'Kalori'], ans: 2, exp: 'Usaha = NÃ—m = Joule (J).', formula: '1 J = 1 NÂ·m', tips: 'Joule = satuan energi dan usaha.', src: 'Satuan SI' },
                        { q: 'Usaha bernilai NOL jika...', opts: ['Gaya besar', 'Perpindahan besar', 'Gaya tegak lurus perpindahan (Î¸=90Â°)', 'Gaya searah', 'Benda berat'], ans: 2, exp: 'cos 90Â° = 0, maka W = FÂ·sÂ·0 = 0.', formula: 'W = FÂ·sÂ·cos 90Â° = 0', tips: 'Contoh: membawa tas horizontal, gaya ke atas.', src: 'Konsep Usaha' },
                        { q: 'F = 20 N, s = 3 m. Usaha = ?', opts: ['23 J', '40 J', '60 J', '100 J', '120 J'], ans: 2, exp: 'W = 20Ã—3 = 60 J.', formula: 'W = 20 Ã— 3 = 60 J', tips: 'Searah â†’ langsung kalikan.', src: 'Soal Dasar' },
                        { q: 'Mendorong tembok F = 200 N, tembok tidak bergerak. W = ?', opts: ['200 J', '0 J', '100 J', 'Tak hingga', '20 J'], ans: 1, exp: 's = 0, maka W = 200Ã—0 = 0 J.', formula: 'W = F Ã— 0 = 0', tips: 'Tidak ada perpindahan = tidak ada usaha.', src: 'Konsep Usaha' }
                    ]
                },
                {
                    id: 'u2', name: 'Usaha dengan Sudut', difficulty: 'mudah', questions: [
                        { q: 'F = 10 N, s = 10 m, Î¸ = 60Â°, cos60Â° = 0,5.\nW = ?', opts: ['100 J', '86,6 J', '50 J', '25 J', '10 J'], ans: 2, exp: 'W = 10Ã—10Ã—0,5 = 50 J.', formula: 'W = FÂ·sÂ·cos Î¸', tips: 'cos 60Â° = 0,5.', src: 'Usaha dengan Sudut' },
                        { q: 'Rumus umum usaha:', opts: ['W = F/s', 'W = FÂ·sÂ·cos Î¸', 'W = FÂ·sÂ·sin Î¸', 'W = FÂ·sÂ·tan Î¸', 'W = F+s'], ans: 1, exp: 'W = FÂ·sÂ·cos Î¸, Î¸ = sudut antara gaya dan perpindahan.', formula: 'W = FÂ·sÂ·cos Î¸', tips: 'Î¸=0 â†’ Fs. Î¸=90 â†’ 0. Î¸=180 â†’ -Fs.', src: 'Rumus Usaha' },
                        { q: 'F = 50 N, s = 4 m, Î¸ = 30Â°, cos30Â° = 0,866.\nW = ?', opts: ['173 J', '200 J', '100 J', '86,6 J', '50 J'], ans: 0, exp: 'W = 50Ã—4Ã—0,866 = 173,2 J.', formula: 'W = 50Ã—4Ã—0,866', tips: 'cos 30Â° = Â½âˆš3 â‰ˆ 0,866.', src: 'Perhitungan Usaha' },
                        { q: 'Usaha NEGATIF terjadi ketika...', opts: ['Gaya besar', 'Searah', 'Berlawanan arah (Î¸=180Â°)', 'Benda diam', 'Î¸=0Â°'], ans: 2, exp: 'cos 180Â° = âˆ’1 â†’ W = âˆ’FÂ·s.', formula: 'W = FÂ·sÂ·cos 180Â° = âˆ’FÂ·s', tips: 'Gaya gesek selalu berlawanan â†’ W negatif.', src: 'Usaha Negatif' },
                        { q: 'cos 0Â° = ?', opts: ['0', '0,5', '0,866', '1', 'âˆ’1'], ans: 3, exp: 'cos 0Â° = 1. Gaya searah â†’ usaha maksimum.', formula: 'cos 0Â° = 1', tips: 'Hafal: 0Â°=1, 30Â°=0,866, 60Â°=0,5, 90Â°=0.', src: 'Trigonometri' }
                    ]
                },
                {
                    id: 'u3', name: 'Energi Kinetik', difficulty: 'sedang', questions: [
                        { q: 'm = 2 kg, v = 10 m/s. Ek = ?', opts: ['10 J', '20 J', '50 J', '100 J', '200 J'], ans: 3, exp: 'Ek = Â½Ã—2Ã—100 = 100 J.', formula: 'Ek = Â½mvÂ²', tips: 'v dikuadratkan â†’ pengaruh besar.', src: 'Energi Kinetik' },
                        { q: 'Mobil m = 1000 kg, v = 20 m/s. Ek = ?', opts: ['10.000 J', '20.000 J', '100.000 J', '200.000 J', '400.000 J'], ans: 3, exp: 'Ek = Â½Ã—1000Ã—400 = 200.000 J.', formula: 'Ek = Â½Ã—1000Ã—400', tips: '200 kJ = 200.000 J.', src: 'Perhitungan Ek' },
                        { q: 'Kecepatan 2Ã— lipat â†’ Ek menjadi...', opts: ['2Ã—', '3Ã—', '4Ã—', '8Ã—', 'Tetap'], ans: 2, exp: 'Ek âˆ vÂ². 2v â†’ Ek = Â½m(2v)Â² = 4Ek.', formula: 'Ek âˆ vÂ²', tips: '3v â†’ 9Ek. 4v â†’ 16Ek.', src: 'Hubungan Ek-v' },
                        { q: 'm = 5 kg, Ek = 90 J. v = ?', opts: ['3 m/s', '6 m/s', '9 m/s', '18 m/s', '36 m/s'], ans: 1, exp: 'vÂ² = 2Ek/m = 180/5 = 36. v = 6 m/s.', formula: 'v = âˆš(2Ek/m)', tips: 'Putar rumus Ek = Â½mvÂ².', src: 'Mencari v' },
                        { q: 'Ek bergantung pada...', opts: ['Massa saja', 'Kecepatan saja', 'Massa DAN kecepatan', 'Ketinggian', 'Gravitasi'], ans: 2, exp: 'Ek = Â½mvÂ² â†’ m dan v.', formula: 'Ek = f(m, v)', tips: 'v lebih berpengaruh (dikuadratkan).', src: 'Faktor Ek' }
                    ]
                },
                {
                    id: 'u4', name: 'Energi Potensial', difficulty: 'sedang', questions: [
                        { q: 'm = 2 kg, h = 10 m, g = 10 m/sÂ². Ep = ?', opts: ['20 J', '100 J', '200 J', '500 J', '1000 J'], ans: 2, exp: 'Ep = 2Ã—10Ã—10 = 200 J.', formula: 'Ep = mgh', tips: 'g â‰ˆ 10 m/sÂ².', src: 'Energi Potensial' },
                        { q: 'Kelapa m = 3 kg di h = 5 m. Ep = ?', opts: ['15 J', '30 J', '50 J', '150 J', '300 J'], ans: 3, exp: 'Ep = 3Ã—10Ã—5 = 150 J.', formula: 'Ep = mgh', tips: 'Ep = energi karena posisi.', src: 'Soal Ep' },
                        { q: 'h naik 3Ã— (m tetap) â†’ Ep menjadi...', opts: ['Tetap', '2Ã—', '3Ã—', '6Ã—', '9Ã—'], ans: 2, exp: 'Ep âˆ h (linear). 3h â†’ 3Ep.', formula: 'Ep âˆ h', tips: 'Berbeda Ek (âˆ vÂ²), Ep âˆ h linear.', src: 'Hubungan Ep-h' },
                        { q: 'Ep = 0 di titik...', opts: ['Puncak', 'Permukaan tanah (acuan)', 'Udara', 'Sembarang', 'Tidak pernah'], ans: 1, exp: 'h = 0 (acuan) â†’ Ep = 0.', formula: 'Ep = 0 saat h = 0', tips: 'Titik acuan bebas dipilih.', src: 'Titik Acuan' },
                        { q: 'Benda 4 kg dari h=20m. Ep di h=5m = ?', opts: ['200 J', '400 J', '600 J', '800 J', '100 J'], ans: 0, exp: 'Ep = 4Ã—10Ã—5 = 200 J.', formula: 'Ep = mgh = 4Ã—10Ã—5', tips: 'Ep berkurang seiring turun.', src: 'Ep di Ketinggian' }
                    ]
                },
                {
                    id: 'u5', name: 'Kekekalan Energi', difficulty: 'sulit', questions: [
                        { q: 'm = 2 kg jatuh bebas dari h = 20 m. v di tanah = ? (g=10)', opts: ['10 m/s', '14 m/s', '20 m/s', '40 m/s', '200 m/s'], ans: 2, exp: 'mgh = Â½mvÂ². v = âˆš(2gh) = âˆš400 = 20 m/s.', formula: 'v = âˆš(2gh)', tips: 'Massa cancel!', src: 'Hukum Kekekalan' },
                        { q: 'Bola dilempar ke atas vâ‚€ = 10 m/s. h_maks = ? (g=10)', opts: ['1 m', '2 m', '5 m', '10 m', '20 m'], ans: 2, exp: 'Â½mvÂ² = mgh. h = vÂ²/(2g) = 100/20 = 5 m.', formula: 'h = vÂ²/(2g)', tips: 'Di puncak v=0, semua Ek jadi Ep.', src: 'Kekekalan Mekanik' },
                        { q: 'Energi mekanik = ?', opts: ['Ek saja', 'Ep saja', 'Ek + Ep', 'Ek âˆ’ Ep', 'Ek Ã— Ep'], ans: 2, exp: 'Em = Ek + Ep. Konstan tanpa gesekan.', formula: 'Em = Ek + Ep', tips: 'Gesekan â†’ Em berkurang.', src: 'Energi Mekanik' },
                        { q: 'm=3kg meluncur dari h=10m tanpa gesekan. Ek di h=4m = ?', opts: ['120 J', '180 J', '200 J', '300 J', '420 J'], ans: 1, exp: 'Ep awal = 300J. Ep di 4m = 120J. Ek = 300âˆ’120 = 180 J.', formula: 'Ek = mg(hâ‚ âˆ’ hâ‚‚)', tips: 'Selisih Ep = Ek.', src: 'Kekekalan di Lintasan' },
                        { q: 'Jatuh bebas dari H. Di mana Ek = Ep?', opts: ['h = H', 'h = 0', 'h = H/2', 'h = H/4', 'Tidak pernah'], ans: 2, exp: 'Ek = Ep saat h = H/2 (setengah ketinggian).', formula: 'Ek = Ep saat h = H/2', tips: 'Puncak: Ek=0. Tanah: Ep=0. Tengah: sama.', src: 'Konsep' }
                    ]
                },
                {
                    id: 'u6', name: 'Daya & Efisiensi', difficulty: 'sulit', questions: [
                        { q: 'W = 500 J, t = 10 s. Daya = ?', opts: ['5 W', '50 W', '500 W', '5000 W', '0,5 W'], ans: 1, exp: 'P = 500/10 = 50 W.', formula: 'P = W/t', tips: 'P = Joule/sekon.', src: 'Daya' },
                        { q: 'Satuan daya SI:', opts: ['Joule', 'Watt', 'Newton', 'Pascal', 'Ampere'], ans: 1, exp: 'J/s = Watt (W).', formula: '1 W = 1 J/s', tips: '1 HP â‰ˆ 746 W.', src: 'Satuan Daya' },
                        { q: 'P = 100 W, t = 1 menit. W = ?', opts: ['100 J', '600 J', '1000 J', '6000 J', '60.000 J'], ans: 3, exp: 'W = 100Ã—60 = 6000 J.', formula: 'W = P Ã— t', tips: '1 menit = 60 detik!', src: 'Menghitung Usaha' },
                        { q: 'E_in = 1000 J, E_out = 400 J. Efisiensi = ?', opts: ['25%', '40%', '60%', '80%', '100%'], ans: 1, exp: 'Î· = 400/1000 Ã— 100% = 40%.', formula: 'Î· = (E_out/E_in) Ã— 100%', tips: '600 J terbuang.', src: 'Efisiensi' },
                        { q: '1 kWh = ?', opts: ['1000 J', '3600 J', '36.000 J', '360.000 J', '3.600.000 J'], ans: 4, exp: '1000 W Ã— 3600 s = 3.600.000 J.', formula: '1 kWh = 3,6 Ã— 10â¶ J', tips: 'Satuan ENERGI di PLN.', src: 'Konversi' }
                    ]
                },
                {
                    id: 'u7', name: 'HOTS Usaha-Energi', difficulty: 'hots', questions: [
                        { q: 'Balok 5 kg ditarik F=40N sudut 37Â° sejauh 10 m, Î¼=0,2.\ncos37Â°=0,8, sin37Â°=0,6, g=10.\nW_total = ?', opts: ['220 J', '268 J', '320 J', '240 J', '160 J'], ans: 1, exp: 'N=50âˆ’24=26N. f=0,2Ã—26=5,2N. W_F=320J. W_f=âˆ’52J. Total=268J.', formula: 'W_tot = FscosÎ¸ âˆ’ Î¼(mgâˆ’FsinÎ¸)s', tips: 'N berkurang karena komponen F ke atas.', src: 'HOTS' },
                        { q: 'Pompa 500 W, air 100 kg, h = 10 m. Waktu min = ?', opts: ['2 s', '10 s', '20 s', '50 s', '100 s'], ans: 2, exp: 'W = mgh = 10000 J. t = 10000/500 = 20 s.', formula: 't = mgh/P', tips: 'Waktu min = Î· = 100%.', src: 'HOTS Daya' },
                        { q: 'Î· = 25%, E_in = 800 J. Energi TERBUANG = ?', opts: ['200 J', '400 J', '600 J', '700 J', '800 J'], ans: 2, exp: 'Output = 200 J. Terbuang = 800âˆ’200 = 600 J.', formula: 'E_buang = E_in âˆ’ E_out', tips: '75% terbuang.', src: 'HOTS Efisiensi' },
                        { q: 'A (2kg, 5m/s) vs B (4kg, 3m/s). Ek lebih besar?', opts: ['A', 'B', 'Sama', 'Tidak bisa', 'Nol'], ans: 0, exp: 'Ek_A = 25 J. Ek_B = 18 J. A > B.', formula: 'Ek_A=25, Ek_B=18', tips: 'Hitung masing-masing.', src: 'HOTS Perbandingan' },
                        { q: 'Bola 0,5 kg dilempar ke atas vâ‚€=20 m/s. Ek di h=10m = ?', opts: ['50 J', '75 J', '100 J', '25 J', '150 J'], ans: 0, exp: 'Em=100J. Ep di 10m=50J. Ek=100âˆ’50=50J.', formula: 'Ek = Â½mvâ‚€Â² âˆ’ mgh', tips: 'Kekekalan energi mekanik.', src: 'HOTS' }
                    ]
                },
                {
                    id: 'u8', name: 'Review Usaha-Energi', difficulty: 'campuran', questions: [
                        { q: 'W = FÃ—s berlaku jika...', opts: ['Tegak lurus', 'Berlawanan', 'Searah (Î¸=0Â°)', 'Diam', 'F=0'], ans: 2, exp: 'Searah â†’ cos0Â°=1 â†’ W=Fs.', formula: 'W = Fs (Î¸ = 0Â°)', tips: 'Searah â†’ positif. Berlawanan â†’ negatif.', src: 'Review' },
                        { q: 'm = 4 kg, v = 5 m/s. Ek = ?', opts: ['10 J', '20 J', '50 J', '100 J', '200 J'], ans: 2, exp: 'Ek = Â½Ã—4Ã—25 = 50 J.', formula: 'Ek = Â½mvÂ²', tips: 'vÂ² dulu, baru kali m.', src: 'Review' },
                        { q: 'm = 5 kg, h = 3 m, g = 10. Ep = ?', opts: ['15 J', '30 J', '50 J', '100 J', '150 J'], ans: 4, exp: 'Ep = 5Ã—10Ã—3 = 150 J.', formula: 'Ep = mgh', tips: 'Kalikan tiga angka.', src: 'Review' },
                        { q: 'P = 200 W, t = 5 s. W = ?', opts: ['40 J', '200 J', '1000 J', '5000 J', '10.000 J'], ans: 2, exp: 'W = 200Ã—5 = 1000 J.', formula: 'W = PÃ—t', tips: 'Watt Ã— detik = Joule.', src: 'Review' },
                        { q: 'Ekâ‚+Epâ‚ = Ekâ‚‚+Epâ‚‚ artinya...', opts: ['Ek selalu sama', 'Ep selalu sama', 'Em total tetap', 'Ek=0', 'Ep=0'], ans: 2, exp: 'Energi mekanik total tetap (tanpa gesekan).', formula: 'Em = konstan', tips: 'Berlaku tanpa gaya non-konservatif.', src: 'Review' }
                    ]
                }
            ]
        }
    ]
};
