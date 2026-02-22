# 📬 Real-Time Notification System Guide

## Overview

The notification system implements real-time notifications for the Tanya Fisika educational platform with complete business logic for teacher-student interactions.

---

## 🎯 Business Logic Flows

### Flow 1: Teacher Creates Task → All Students Get Notified

**Process:**
1. Guru buka halaman Kelas (kelas.html)
2. Guru klik tombol **+** untuk membuat tugas baru
3. Guru isi:
   - **Title**: Judul tugas
   - **Description**: Deskripsi
   - **Due Date**: Tanggal deadline
   - **File** (opsional): Lampiran
4. Guru klik "Kirim"
5. ✅ **Sistem trigger:**
   - Tugas disimpan ke `localStorage.classTasks`
   - Function `broadcastTaskToStudents(taskData)` dipanggil
   - Notifikasi dibuat dengan:
     - **Type**: `assignment_created`
     - **Icon**: 📝 (cyan, #00d9ff)
     - **Title**: "📝 Tugas Baru - [Nama Kelas]"
     - **Body**: "[Guru] memberikan tugas: [Judul] - Deadline: [Tanggal]"
     - **Sound**: Gentle chime (600 Hz, 0.5 detik)
   - Notifikasi dikirim ke semua siswa di kelas itu
   - Guru melihat toast: **"✓ Tugas dikirim ke semua siswa"**
   - Halaman reload otomatis

**Notifikasi yang diterima siswa:**
```javascript
{
  id: "task_1708367400000",
  type: "assignment_created",
  title: "📝 Tugas Baru - Fisika",
  body: "Pak Sarno memberikan tugas: \"Soal Hukum Newton\" - Deadline: 22 Februari 2026",
  timestamp: "2026-02-20T14:30:00Z",
  read: false,
  priority: "high",
  data: {
    classId: "physics_101",
    assignmentId: "task_1708367400000",
    taskTitle: "Soal Hukum Newton",
    deadline: "2026-02-22"
  },
  actionLink: "./kelas.html"
}
```

---

### Flow 2: Student Submits Task → Only Teacher Gets Notified

**Process:**
1. Siswa buka halaman Kelas (kelas.html)
2. Siswa lihat tugas dan klik "Lihat Tugas"
3. Siswa isi form pengumpulan:
   - **Nama** (opsional)
   - **File** (bukti pekerjaan)
   - **Catatan/Jawaban**
4. Siswa klik "Kirim Pengumpulan"
5. ✅ **Sistem trigger:**
   - Cek apakah tepat waktu atau terlambat:
     - **Tepat waktu**: Jika sebelum deadline
     - **Terlambat**: Jika setelah deadline
   - Function `notifyTeacherOfSubmission(submissionData)` dipanggil
   - Notifikasi dibuat dengan:
     - **Type**: 
       - `assignment_submitted` (jika tepat waktu)
       - `assignment_submitted_late` (jika terlambat)
     - **Icon**:
       - 📤 Green (#06d6a0) jika tepat waktu
       - ⚠️ Red (#f72585) jika terlambat
     - **Title**: 
       - "📤 Tugas Dikumpulkan" (tepat waktu)
       - "⚠️ Pengumpulan Terlambat" (terlambat)
     - **Body**: "[Siswa] mengirim: \"[Judul Tugas]\" - Status: Tepat waktu/Terlambat"
     - **Sound**: 
       - Soft pop (800 Hz, 0.3 detik) jika tepat waktu
       - Alert (800 Hz dual-beep) jika terlambat
   - Notifikasi dikirim **HANYA ke guru** (bukan ke siswa lain)
   - Siswa melihat toast: **"✓ Tugas berhasil dikumpulkan"** (BUKAN notifikasi center)

**Notifikasi yang diterima guru (tepat waktu):**
```javascript
{
  id: "submission_1708367500000",
  type: "assignment_submitted",
  title: "📤 Tugas Dikumpulkan",
  body: "Budi mengirim: \"Soal Hukum Newton\" - Status: Tepat waktu",
  timestamp: "2026-02-20T14:35:00Z",
  read: false,
  priority: "normal",
  data: {
    classId: "physics_101",
    studentName: "Budi",
    taskTitle: "Soal Hukum Newton",
    isLate: false
  },
  actionLink: "./kelas.html"
}
```

**Notifikasi yang diterima guru (terlambat):**
```javascript
{
  id: "submission_1708367600000",
  type: "assignment_submitted_late",
  title: "⚠️ Pengumpulan Terlambat",
  body: "Ani mengirim: \"Soal Hukum Newton\" - TERLAMBAT",
  timestamp: "2026-02-20T14:40:00Z",
  read: false,
  priority: "high",
  data: {
    classId: "physics_101",
    studentName: "Ani",
    taskTitle: "Soal Hukum Newton",
    isLate: true
  },
  actionLink: "./kelas.html"
}
```

---

## 🎨 Design System

### Dark Blue Physics Gradient
- **Background**: `linear-gradient(135deg, #0a0f1e, #0f1b35, #1a2a4a, #0f3a5f)`
- **Animated particles**: Atoms, electrons, wave patterns, quantum effects
- **Parallax effect**: Multi-layer floating particles

### Glass Morphism Cards
```css
background: rgba(232, 244, 248, 0.05);
border: 1px solid rgba(0, 217, 255, 0.15);
border-radius: 16px;
backdrop-filter: blur(10px);
box-shadow: 0 8px 32px rgba(0, 217, 255, 0.1);
```

### Neon Accent Colors
| Type | Color | Hex | Usage |
|------|-------|-----|-------|
| Cyan | Primary | #00d9ff | Headings, active states, primary actions |
| Purple | Secondary | #7209b7 | Forum, discussion elements |
| Green | Success | #06d6a0 | Approved, on-time submissions |
| Orange | Warning | #f39c12 | System alerts, important info |
| Magenta | Error | #f72585 | Late submissions, errors |

### Notification Card Styling
```css
.notification-item {
  background: rgba(232, 244, 248, 0.05);
  border-left: 4px solid #00d9ff; /* changes based on type */
  border-radius: 12px;
  padding: 1rem;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 217, 255, 0.1);
  transition: all 0.3s ease;
}

.notification-item:hover {
  box-shadow: 0 12px 40px rgba(0, 217, 255, 0.2);
  transform: translateY(-4px);
}
```

### Notification Type Color Codes
| Type | Border Color | Badge Text | Icon |
|------|--------------|------------|------|
| `assignment_created` | #00d9ff (cyan) | Tugas Baru | 📝 |
| `assignment_submitted` | #06d6a0 (green) | Pengumpulan | 📤 |
| `assignment_submitted_late` | #f72585 (magenta) | Terlambat | ⚠️ |
| `assignment_graded` | #ffd166 (gold) | Penilaian | ⭐ |
| `forum_reply` | #7209b7 (purple) | Forum | 💬 |
| `message` | #3a86ff (blue) | Pesan | 💌 |
| `class_announcement` | #f39c12 (orange) | Pengumuman | 📢 |
| `deadline_reminder` | #ff006e (hot pink) | Pengingat | ⏰ |

---

## 📱 UI Components

### Notifikasi.html Features

#### Filter Tabs
```
[Semua] [Belum Dibaca] [Tugas Baru] [Pengumpulan] [Penilaian]
```
- **Semua**: Tampilkan semua notifikasi
- **Belum Dibaca**: Hanya notifikasi dengan `read: false`
- **Tugas Baru**: Type `assignment_created`
- **Pengumpulan**: Type `assignment_submitted` (semua status)
- **Penilaian**: Type `assignment_graded`

#### Date Grouping
Notifikasi dikelompokkan berdasarkan tanggal:
- **Hari Ini**: Notifikasi hari ini
- **Kemarin**: Notifikasi kemarin
- **7 hari lalu**: Notifikasi dalam 7 hari terakhir
- **Tanggal spesifik**: Format "20 Feb 2026"

#### Real-Time Badge
Unread notifications memiliki:
- 🔵 **Pulsing cyan dot** di samping title
- Animation: Opacity 1 → 0.5 → 1 (2 seconds loop)
- Visual indication: "read" class menghilangkan badge

#### Mark as Read
- Circle button di sebelah kanan notification
- **Filled cyan (#00d9ff)**: Unread
- **Empty with border**: Read
- Click untuk toggle state

#### Delete Button
- Trash icon button
- Color: **#f72585** (magenta)
- Click untuk hapus notifikasi dari list
- Optimistic UI (langsung hilang)

---

## ⚙️ Implementation Details

### Files Modified/Created

#### 1. **kelas.html** (Modified)
- Added physics background: `<div id="app"></div>`
- Added CSS links: `physics-background.css`, `physics-components.css`
- Added script: `physics-animations.js`, `notification-config.js`, `notification-service.js`
- Added `broadcastTaskToStudents()` function
- Modified `finalizeSave()` to trigger `broadcastTaskToStudents()`
- Added toast notification UI

#### 2. **notifikasi.html** (Modified)
- Updated filter tabs: Semua, Belum Dibaca, Tugas Baru, Pengumpulan, Penilaian
- Added `groupByDate()` function for date-based grouping
- Updated `displayNotifications()` to support date grouping
- Updated filter logic to handle "unread" filter
- Added physics background integration

#### 3. **notification-service.js** (Already created)
- Core class: `NotificationService`
- Methods:
  - `addNotification(notif)`: Add notification to storage
  - `markAsRead(id)`: Mark as read
  - `markAllAsRead()`: Mark all as read
  - `deleteNotification(id)`: Delete notification
  - `subscribe(callback)`: Listen to notification events
  - `playSound(priority)`: Play alert sound with Web Audio API
  - `updateBadge(count)`: Update app badge count

#### 4. **physics-animations.js** (Already created)
- Class: `PhysicsBackground`
- Features:
  - Dark blue gradient background with animated particles
  - 60fps smooth animations
  - Mouse interaction (particle repulsion)
  - Public API: `enhanceCard()`, `createGlowingText()`, `addGlowEffect()`

#### 5. **notification-config.js** (Already created)
- Configuration object with:
  - WebSocket settings
  - Firebase Cloud Messaging settings
  - 10 notification types (assignment_created, assignment_submitted, etc.)
  - Sound profiles (normal: 600Hz, high: 800Hz)
  - Payload templates

---

## 🔧 Configuration

### Enable WebSocket (Production)
```javascript
const notificationService = initializeNotificationService({
  userId: 'user_12345',
  useWebSocket: true,  // ← Change to true
  useFirebase: false,
  soundEnabled: true,
  badgeEnabled: true
});
```

### Enable Firebase Cloud Messaging
```javascript
const notificationService = initializeNotificationService({
  userId: 'user_12345',
  useWebSocket: false,
  useFirebase: true,  // ← Change to true
  soundEnabled: true,
  badgeEnabled: true
});
```

### Custom Sound Frequencies
In `notification-config.js`:
```javascript
sounds: {
  normal: { frequency: 600, duration: 0.5, amplitude: 0.3 },
  high: { frequency: 800, duration: 0.3, amplitude: 0.4 }
}
```

---

## 🎵 Sound Alerts

### Normal Priority (Tugas Dibuat, Forum Reply)
- **Frequency**: 600 Hz
- **Duration**: 0.5 seconds
- **Sound type**: Single beep
- **Description**: Gentle chime sound

### High Priority (Terlambat, Penilaian)
- **Frequency**: 800 Hz
- **Duration**: 0.3 seconds × 2 (dual beep)
- **Sound type**: Alert sound
- **Description**: More prominent, attention-grabbing

---

## 📊 Data Structure

### Notification Object
```typescript
interface Notification {
  id: string;                    // Unique ID (e.g., "task_12345")
  type: string;                  // Type code (assignment_created, etc)
  title: string;                 // Display title with emoji
  body: string;                  // Short description
  timestamp: string;             // ISO 8601 format
  read: boolean;                 // Read status
  priority: 'normal' | 'high';   // Affects sound volume
  data: {                        // Metadata
    classId: string;
    [key: string]: any;
  };
  deadline?: string;             // Optional deadline date
  actionLink?: string;           // Link to related page
}
```

### Local Storage Keys
```javascript
'notifications'                  // Array of notification objects
'notificationPreferences'        // User settings (sound, display, etc)
'notificationBadgeCount'         // Current unread count
'classTasks'                     // Tasks created by teacher
'classStudents'                  // List of student IDs in class
'completedTasks'                 // Completed task IDs
'submissions'                    // Student submissions by task
```

---

## 🚀 Future Enhancements

1. **WebSocket Real-Time Delivery**
   - Server sends notifications via Socket.io
   - Near-instant delivery (< 100ms)
   - Fallback: HTTP polling

2. **Firebase Cloud Messaging**
   - Native push notifications on mobile
   - Service Worker integration
   - IndexedDB for offline storage

3. **Advanced Filtering**
   - By class
   - By teacher
   - By notification type with multi-select
   - By date range

4. **Custom Settings Panel**
   - Mute specific notification types
   - Disable sound alerts
   - Notification frequency (real-time, hourly digest, daily digest)

5. **Notification History Export**
   - Download as PDF/CSV
   - Email digest
   - Archive old notifications

6. **Analytics**
   - Track notification read rates
   - Measure engagement
   - Identify most-used notification types

---

## 🐛 Troubleshooting

### Notifications Not Appearing
1. Check browser console for errors
2. Verify Service Worker is registered
3. Check `localStorage.notifications` for stored data
4. Reload page and try again

### Sound Not Playing
1. Check browser sound warning/permissions
2. Check if `soundEnabled: true` in config
3. Verify Web Audio API support in browser
4. Test with high priority notification (louder)

### Badge Count Not Updating
1. Verify `badgeEnabled: true`
2. Check `navigator.setAppBadge()` browser support
3. Restart browser/clear cache

### Filter Not Working
1. Check if filter function is called
2. Verify notification type values match
3. Clear localStorage and reload
4. Check browser developer tools console

---

## 📚 References

- [Web Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notification)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Socket.io Documentation](https://socket.io/docs/)
