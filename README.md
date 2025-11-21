# 📝 Daily Goal Tracker

**Aplikasi web untuk tracking goal harian dengan sistem streak dan visualisasi konsistensi**

---

## 📋 Informasi
- **Tim**: MojagDev
- **Asal Sekolah**: SMK Unggulan NU Mojoagung

---

## 🎯 Latar Belakang

### Masalah
Siswa sering membuat target belajar harian tapi:
- ❌ Tidak ada sistem tracking yang jelas
- ❌ Mudah lupa dengan target yang dibuat
- ❌ Tidak termotivasi untuk konsisten
- ❌ Tidak ada feedback visual atas progress
- ❌ Sulit melihat pola konsistensi bulanan

### Solusi: Daily Goal Tracker
Aplikasi web sederhana yang membantu siswa:
- ✅ Set target harian (max 5 goals)
- ✅ Track progress dengan visual yang jelas
- ✅ Build consistency dengan streak system
- ✅ Lihat overview konsistensi 30 hari terakhir
- ✅ Motivasi lewat gamification

---

## ✨ Fitur Utama

### 1. 📝 Set Daily Goals
- Form input untuk tambah goal baru
- Maksimal 5 goals per hari (fokus, tidak overwhelming)
- Validasi input real-time
- Counter goals: X/5

**Contoh goals:**
- "Belajar matematika 2 jam"
- "Olahraga 30 menit"
- "Baca buku 20 halaman"
- "Ngerjain PR Fisika"
- "Hafal 10 vocab Bahasa Inggris"

### 2. ✅ Goal Checklist
- List semua goals dengan checkbox interaktif
- Klik checkbox → strikethrough text + animasi checkmark
- Visual feedback saat complete (background hijau, icon ✓)
- Bisa uncheck jika salah klik
- Button delete untuk hapus goal

### 3. 📊 Progress Tracking
- **Progress bar visual** dengan animasi smooth
- **Persentase completion** (misal: 3/5 = 60%)
- **Update real-time** setiap ada perubahan
- **Status dinamis:**
  - Belum ada goal
  - Semua goal selesai! 🎉 (hijau)
  - Ayo selesaikan X goal lagi! (kuning)

### 4. 🔥 Streak System
- **Current streak**: berapa hari berturut-turut complete SEMUA goals
- **Best streak**: highest streak ever achieved
- **Display**: 🔥 X hari streak
- **Auto-reset** jika 1 hari tidak complete semua
- **Motivational messages** based on streak:
  - 0 hari: "Ayo mulai streak! 💪"
  - 1-2 hari: "Bagus! Pertahankan momentum! 🔥"
  - 3-6 hari: "Bagus! Terus konsisten! ⭐"
  - 7-13 hari: "Luar biasa! 1 minggu streak! 🚀"
  - 14-29 hari: "Amazing! Kamu super konsisten! 💎"
  - 30+ hari: "Legendary! Kamu unstoppable! 👑"

### 5. 📅 Mini Calendar View
- **Grid calendar 30 hari terakhir** (7 kolom × 5 baris)
- **Color coding per hari:**
  - 🟢 **Hijau**: complete semua goals
  - 🟡 **Kuning**: complete sebagian goals
  - ⚪ **Abu-abu**: tidak complete / no data
  - 🔵 **Border biru**: hari ini
- **Tooltip on hover**: "DD/MM: X/Y goals completed"
- **Visual overview** konsistensi bulanan

### 6. 📈 Daily Summary
- Card summary hari ini dengan:
  - 📅 Tanggal lengkap (Senin, 21 Januari 2025)
  - ✅ Goals completed: X/Y
  - 🎯 Status: "All done! 🎉" atau "Keep going!"
- **Reset otomatis** setiap hari baru (midnight check)
- **History** goals hari sebelumnya tetap tersimpan

### 7. 📊 Statistics
Dashboard statistik lengkap:
- **Total Hari**: berapa lama sudah tracking
- **Total Goals**: total goals yang berhasil diselesaikan
- **Success Rate**: % hari yang complete semua goals
- **Average Goals**: rata-rata goals completed per hari

---

## 🛠️ Tech Stack

**Core Technologies:**
- **HTML5** murni - Semantic markup
- **CSS3** murni - Flexbox, Grid, Animations, Transitions
- **JavaScript ES6** murni - Vanilla JS, no library/framework

**Browser APIs:**
- **localStorage API** - Data persistence
- **Date API** - Date manipulation & daily reset logic

---

## 📁 Struktur File

```
daily-goal-tracker/
│
├── index.html          # HTML structure
├── style.css           # CSS styling (pure CSS)
├── script.js           # JavaScript logic (vanilla JS)
└── README.md           # Documentation
```

**Simple & Clean!** Hanya 3 file utama.

---

## 🎨 Design System

### Color Palette
```css
Primary:   #4A90E2 (Biru)
Success:   #2ECC71 (Hijau)
Warning:   #F39C12 (Kuning)
Danger:    #E74C3C (Merah)
Background: #F5F7FA (Abu muda)
Text Dark:  #2C3E50
Text Gray:  #7F8C8D
```

### Typography
- **Font**: System fonts (Arial, Helvetica, Segoe UI)
- **Size hierarchy**: Clear visual hierarchy
- **Weight**: 300 (light), 400 (regular), 600 (semibold), 700 (bold)

### Layout
- **Mobile-First** responsive design
- **Desktop**: 2 kolom (goals + stats)
- **Mobile**: 1 kolom stacked
- **Breakpoints**: 576px, 768px, 992px

### Components
- Card-based layout dengan shadows
- Rounded corners (6px, 12px, 16px)
- Subtle shadows untuk depth
- Generous spacing untuk readability

### Interactions
- **Smooth transitions** (0.3s ease)
- **Hover effects** pada buttons & cards
- **Click feedback** animations
- **Progress bar** animation dengan cubic-bezier
- **Checkbox** bounce animation
- **Streak icon** flicker animation

---

## 💾 Data Structure (localStorage)

```javascript
{
  "goals": [
    {
      "id": 1637488234567,
      "text": "Belajar matematika 2 jam",
      "completed": false
    },
    {
      "id": 1637488245678,
      "text": "Olahraga 30 menit",
      "completed": true
    }
  ],
  "currentStreak": 5,
  "bestStreak": 12,
  "lastActiveDate": "2025-11-21",
  "history": {
    "2025-11-20": { "total": 5, "completed": 5 },
    "2025-11-19": { "total": 4, "completed": 3 },
    "2025-11-18": { "total": 5, "completed": 5 }
  },
  "stats": {
    "totalDays": 30,
    "totalGoalsCompleted": 120
  }
}
```

**Key**: `dailyGoalTracker`

---

## 🔄 Logic Flow

### 1. Page Load
```
1. Load data dari localStorage
2. Check tanggal: jika hari baru → daily reset
3. Render: goals, progress, streak, calendar, stats
4. Setup event listeners
```

### 2. Add Goal
```
1. Validasi: tidak kosong, max 5 goals
2. Create goal object dengan id unique
3. Push ke appData.goals
4. Save ke localStorage
5. Re-render UI
6. Show toast notification
```

### 3. Toggle Goal (Check/Uncheck)
```
1. Find goal by id
2. Toggle completed status
3. Save ke localStorage
4. Re-render UI (progress bar animasi)
5. Check jika all done → show celebration toast
```

### 4. Delete Goal
```
1. Confirm dialog
2. Filter out goal dari array
3. Save ke localStorage
4. Re-render UI
5. Show toast notification
```

### 5. Daily Reset (Midnight Check)
```
1. Detect: lastActiveDate !== today
2. Save yesterday data ke history
3. Calculate: jika kemarin all done → increment streak
4. Else: reset streak to 0
5. Update stats (totalDays, totalGoalsCompleted)
6. Reset today's goals (uncheck all)
7. Update lastActiveDate to today
8. Save & re-render
```

### 6. Streak Calculation
```
Streak increment jika:
  - Hari kemarin: total > 0 && completed === total

Streak reset jika:
  - Hari kemarin: completed < total
  - Atau: tidak ada goals kemarin
```

### 7. Calendar Render
```
1. Loop 30 hari terakhir (dari 29 hari lalu sampai hari ini)
2. Untuk setiap hari:
   - Get data dari history
   - Determine color: complete/partial/none
   - Create div dengan class & tooltip
   - Mark today dengan border
3. Append ke grid (7 columns)
```

---

## 🚀 Cara Menggunakan

### Instalasi
1. Download folder `daily-goal-tracker`
2. Buka file `index.html` di browser modern
3. **Done!** Aplikasi langsung jalan

**Tidak perlu:**
- ❌ NPM install
- ❌ Build process
- ❌ Web server
- ❌ Internet connection

### Panduan Penggunaan

#### 1. Tambah Goal Baru
1. Ketik goal di input field
2. Tekan Enter atau klik "Tambah Goal"
3. Goal muncul di list dengan checkbox

#### 2. Complete Goal
1. Klik checkbox di sebelah goal
2. Lihat animasi checkmark ✓
3. Text berubah strikethrough
4. Progress bar otomatis update

#### 3. Hapus Goal
1. Klik tombol "Hapus" di sebelah goal
2. Confirm di dialog
3. Goal terhapus dari list

#### 4. Tracking Streak
1. Complete semua goals hari ini
2. Ulangi besok, lusa, dan seterusnya
3. Streak counter otomatis bertambah
4. Cek best streak untuk motivasi

#### 5. Lihat Calendar
1. Scroll ke section calendar
2. Hover di hari tertentu untuk detail
3. Warna hijau = hari yang sempurna!

---

## 📱 Responsive Design

### Mobile (≤576px)
- Single column layout
- Larger touch targets
- Optimized font sizes
- Full-width buttons

### Tablet (≤768px)
- Single column layout
- Stats grid: 1 column
- Comfortable spacing

### Desktop (≥992px)
- Two column layout:
  - Left: Goals & Actions
  - Right: Stats & Calendar
- Side-by-side view

---

## ✨ Key Features & Highlights

### 1. **Pure Vanilla JavaScript**
- No dependencies
- Fast loading (<50KB total)
- Works offline
- No build step

### 2. **Smart Daily Reset**
- Detects day change automatically
- Preserves history
- Calculates streak accurately
- Never loses data

### 3. **Smooth Animations**
- Progress bar: cubic-bezier easing
- Checkbox: bounce animation
- Streak icon: flicker effect
- Toast: slide up

### 4. **Data Persistence**
- All data in localStorage
- Auto-save on every change
- Survives page reload
- Export-friendly structure

### 5. **User Experience**
- Instant feedback
- Clear visual hierarchy
- Intuitive interactions
- Motivational messaging

---

## 🎮 Gamification Elements

1. **🔥 Streak System**
   - Visual fire icon
   - Progressive messages
   - Best streak record
   - Motivates daily consistency

2. **📊 Progress Bar**
   - Real-time update
   - Smooth animation
   - Percentage display
   - Color transitions

3. **🎉 Celebrations**
   - Toast notifications
   - "All done!" status
   - Motivational emojis
   - Positive reinforcement

4. **📅 Calendar Heatmap**
   - Visual consistency pattern
   - Color-coded days
   - 30-day overview
   - GitHub-style contribution graph

---

## 🔒 Privacy & Security

- ✅ **100% Client-Side** - No server communication
- ✅ **Data stays local** - localStorage only
- ✅ **No tracking** - No analytics or cookies
- ✅ **No login required** - Instant use
- ✅ **Offline-capable** - Works without internet
- ✅ **XSS Prevention** - HTML escaping for user input

---

## 🧪 Testing

### Browser Compatibility
Tested on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Features Tested
- ✅ Add/delete goals
- ✅ Toggle completion
- ✅ Progress calculation
- ✅ Daily reset logic
- ✅ Streak calculation
- ✅ Calendar rendering
- ✅ localStorage persistence
- ✅ Responsive layout

---

## 📚 Code Quality

### Best Practices
- ✅ Semantic HTML5
- ✅ BEM-like CSS naming
- ✅ Modular JavaScript functions
- ✅ Comprehensive comments
- ✅ DRY principle
- ✅ Consistent formatting

### Performance
- ✅ Minimal DOM manipulation
- ✅ Event delegation ready
- ✅ Efficient rendering
- ✅ No memory leaks
- ✅ Fast initial load

---

## 🐛 Known Limitations

1. **Single Device Only**
   - Data tidak sync antar device (localStorage-based)
   - Solution: Manual export/import (future feature)

2. **Browser-Specific**
   - Data terikat dengan browser & domain
   - Clear cache = data hilang
   - Solution: Export backup (future feature)

3. **No Authentication**
   - No user accounts
   - One "user" per browser
   - Solution: OK untuk personal use


## 💡 Tips Penggunaan

### Untuk Hasil Maksimal:

1. **Set Realistic Goals**
   - Jangan terlalu banyak (max 5)
   - Specific & measurable
   - Achievable dalam 1 hari

2. **Review Harian**
   - Cek progress di siang hari
   - Adjust jika perlu
   - Celebrate completion

3. **Build Streak**
   - Konsisten > Perfect
   - 1% better every day
   - Track pattern di calendar

4. **Weekly Review**
   - Lihat calendar mingguan
   - Identify patterns
   - Improve next week

---

## 👥 Tim Pengembang

**Tim MojagDev**
- SMK Unggulan NU Mojoagung

---
