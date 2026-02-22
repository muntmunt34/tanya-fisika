# Panduan Sistem Notifikasi - Tanya Fisika

## Ringkasan

Sistem notifikasi Tanya Fisika telah diperbarui dengan fitur lengkap untuk memastikan siswa dan guru selalu mendapat informasi terkini tentang tugas, pengumpulan, dan pengumuman penting.

## Fitur yang Ditambahkan

### A. PERBAIKAN TAMPILAN (UI) – Teks Lebih Terbaca ✅

#### Masalah yang Diperbaiki:
- ✅ Teks sapaan "Halo, [Nama]!" - Ditambah shadow dan warna kontras lebih baik
- ✅ "XP: - Level 3" - Ditambah shadow dan warna yang lebih terlihat jelas
- ✅ "Apa yang mau dipelajari hari ini?" - Diperbaiki dengan text-shadow ganda
- ✅ Menu navigasi bawah (Home, Kelas, Daftar Pustaka, Notifikasi, Profil) - Ditambah shadow pada teks dan ikon

#### Cara Perbaikan:
- Menambahkan `text-shadow` dengan kombinasi warna gelap dan terang untuk kontras maksimal
- Mengubah warna font menjadi lebih gelap (#1a202c) untuk teks utama
- Menambahkan filter drop-shadow pada ikon untuk visibilitas lebih baik
- Semua teks sekarang terbaca jelas di atas wallpaper biru cerah

### B. FITUR NOTIFIKASI TUGAS (Push Notification) ✅

#### 1. Notifikasi untuk Siswa – Ketika Guru Membuat Tugas Baru

**Cara Kerja:**
- Saat guru membuat tugas baru, siswa otomatis mendapat notifikasi
- Format: "Tugas baru: [Judul Tugas] – [Mata Pelajaran]. Deadline: [Tanggal]."
- Notifikasi dapat diklik untuk langsung ke halaman tugas
- Notifikasi disertai suara (jika diaktifkan di pengaturan)

**Contoh:**
```
Tugas Baru: Soal Termodinamika
Guru telah membuat tugas baru "Soal Termodinamika" di kelas Fisika. 
Deadline: 2026-02-20
[Klik untuk membuka]
```

#### 2. Notifikasi untuk Guru – Ketika Siswa Mensubmit Tugas

**Cara Kerja:**
- Saat siswa mengumpulkan tugas, guru mendapat notifikasi real-time
- Format: "[Nama Siswa] telah mengumpulkan tugas: [Judul Tugas]."
- Guru bisa melihat status pengumpulan dari notifikasi
- Support untuk beberapa siswa mengumpulkan dalam waktu bersamaan

**Contoh:**
```
Siswa Mengumpulkan Tugas
Siti Nurhaliza telah mengumpulkan tugas "Soal Hukum Newton Edisi 2".
[Klik untuk melihat detail]
```

#### 3. Halaman Histori Notifikasi

**Lokasi:** Pages → Notifikasi atau klik icon lonceng di header

**Fitur:**
- ✅ Daftar lengkap semua notifikasi (terbaru di atas)
- ✅ Filter notifikasi: Semua, Tugas, Pengumpulan, Sistem
- ✅ Tandai sebagai dibaca/belum dibaca
- ✅ Hapus notifikasi individual
- ✅ Tombol "Tandai Semua Dibaca"
- ✅ Menampilkan waktu relatif (5 menit lalu, kemarin, dll)

**Tampilan Notifikasi:**
```
┌─────────────────────────────────┐
│ 🔔 Notifikasi                   │
│ [✔ Tandai Semua Dibaca]        │
├─────────────────────────────────┤
│ Filter: [Semua] [Tugas] [Pengumpulan] [Sistem]
├─────────────────────────────────┤
│ │ Tugas Baru: Soal Termodinamika │
│ │ Guru telah membuat tugas... │
│ │ Deadline: 15 Feb 2026     │
│ │ 3 jam lalu        ✓ Hapus │
├─────────────────────────────────┤
│ │ Siswa Mengumpulkan Tugas   │
│ │ Budi Santoso telah... │
│ │ 1 hari lalu      ✓ Hapus │
└─────────────────────────────────┘
```

#### 4. Pengaturan Notifikasi (Notification Preferences)

**Lokasi:** Profil & Pengaturan → Pengaturan Notifikasi

**Opsi yang Tersedia:**

| Pengaturan | Default | Deskripsi |
|-----------|---------|-----------|
| **Aktifkan Notifikasi** | ✅ On | Matikan untuk tidak menerima semua notifikasi |
| **Suara Notifikasi** | ✅ On | Putar suara saat notifikasi tiba |
| **Notifikasi Tugas Baru** | ✅ On | Untuk siswa: notifikasi saat guru buat tugas baru |
| **Notifikasi Pengumpulan** | ✅ On | Untuk guru: notifikasi saat siswa submit tugas |
| **Notifikasi Sistem** | ✅ On | Pembaruan sistem dan pengumuman penting |

**Cara Mengatur:**
1. Buka **Profil** dari menu bawah
2. Scroll ke bagian **Pengaturan Notifikasi**
3. Gunakan toggle untuk mengaktifkan/menonaktifkan fitur yang diinginkan
4. Klik **Simpan Pengaturan**

### C. Teknologi yang Digunakan

#### 1. **Desktop Notifications API**
- Menampilkan notifikasi desktop native (Windows, macOS, Linux)
- Permintaan izin otomatis saat user membuka app pertama kali

#### 2. **Service Worker**
- Background sync untuk notifikasi
- Support offline notifications
- Caching untuk app yang lebih cepat

#### 3. **Local Storage**
- Penyimpanan notifikasi lokal
- Preference user disimpan di browser
- Sinkronisasi antar tab/window

#### 4. **Audio API**
- Notifikasi suara yang asik
- Fallback jika API tidak support

## Cara Menggunakan

### Untuk Siswa:

1. **Mengaktifkan Notifikasi:**
   - Buka app, izinkan notifikasi ketika diminta browser
   - Settings → Pengaturan Notifikasi → pastikan semuanya on

2. **Menerima Notifikasi Tugas:**
   - Saat guru membuat tugas baru, Anda akan menerima notifikasi
   - Klik notifikasi untuk membuka halaman tugas
   - Atau pergi ke Notifikasi untuk melihat semua

3. **Mengatur Preferensi:**
   - Profil → Pengaturan Notifikasi
   - Aktifkan/nonaktifkan tipe notifikasi sesuai kebutuhan
   - Aktifkan/nonaktifkan suara notifikasi

### Untuk Guru:

1. **Membuat Tugas Baru:**
   - Saat Anda membuat tugas, sistem akan otomatis mengirim notifikasi ke siswa
   - Tugas akan muncul dengan status "Belum dikumpulkan"

2. **Menerima Notifikasi Pengumpulan:**
   - Saat siswa submit tugas, Anda akan menerima notifikasi real-time
   - Klik untuk melihat detail pengumpulan
   - Lihat status semua siswa dari halaman Notifikasi

3. **Mengatur Preferensi:**
   - Profil → Pengaturan Notifikasi
   - Aktifkan notifikasi pengumpulan untuk tracking real-time
   - Aktifkan suara untuk alert yang lebih obvious

## Statistik & Monitoring

### Badge Count
- Tampilan icon lonceng menunjukkan jumlah notifikasi belum dibaca
- Update real-time saat notifikasi baru tiba
- Otomatis berkurang saat notifikasi dibaca

### History Pinned
- Tersimpan hingga 12 notifikasi terbaru
- Dapat dihapus manual
- Filter berdasarkan tipe untuk pencarian cepat

## Fitur Tambahan yang Tersedia

### 1. **Dark Mode** 🌙
- Profil → Tampilan → Mode Gelap
- Lebih nyaman di malam hari

### 2. **Privacy Settings** 🔒
- Kontrol profil publik/privat
- Pengaturan keamanan akun

### 3. **Clear All Data** 🗑️
- Hapus semua data lokal jika perlu
- Fitur di "Zona Berbahaya"

### 4. **Session Management**
- Logout/keluar akun
- Multi-device support (setiap device independen)

## Troubleshooting

### Notifikasi tidak muncul:
1. ✅ Pastikan Notifikasi diaktifkan di browser
2. ✅ Periksa Profil → Pengaturan Notifikasi
3. ✅ Izinkan notifikasi ketika browser minta
4. ✅ Reload page (F5) dan coba lagi

### Notifikasi suara tidak terdengar:
1. ✅ Pastikan browser volume tidak muted
2. ✅ Periksa Profil → Pengaturan Notifikasi → Suara Notifikasi
3. ✅ Periksa volume sistem device

### Notifikasi hilang:
1. ✅ Buka halaman Notifikasi untuk melihat history lengkap
2. ✅ Notifikasi tersimpan di local storage
3. ✅ Jangan clear browser data jika ingin keep history

## Data Privacy & Security

- Semua notifikasi disimpan di browser lokal (tidak dikirim ke server tanpa izin)
- Preferensi pengguna aman di localStorage terenkripsi browser
- Tidak ada tracking eksternal
- User bisa clear semua data kapan saja

## Roadmap Fitur Masa Depan

- [ ] Cloud sync untuk notifikasi antar device
- [ ] Custom notification sounds
- [ ] Scheduled notifications
- [ ] Push notifications via email
- [ ] WhatsApp integration
- [ ] Smart notification grouping

## Kontak Support

Jika ada pertanyaan atau bug report:
- Email: support@tanyafisika.com
- Forum: pages/forum.html
- Chat: Direct message ke admin

---

**Update Terakhir:** 12 Februari 2026
**Version:** 2.1 (UI + Notification System)
