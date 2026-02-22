# 🎮 Physics Game Design System
## Pixel Game Platform - Gameplay Mechanics & Motivation System

**Game Specs:** 3 Educational Game Modes | Physics Concepts | Pixel Art Style | HTML5

---

## TABLE OF CONTENTS

1. [Game Overview](#game-overview)
2. [Part A: Gameplay Flow](#part-a-gameplay-flow)
3. [Part B: Motivation System](#part-b-motivation-system)
4. [Part C: Motivation Scenarios](#part-c-motivation-scenarios)
5. [Part D: Summary](#part-d-summary)

---

## GAME OVERVIEW

### Target Audience
- Students Grade 10-12 (Ages 16-18)
- Physics learners
- Casual gamers who need educational content

### Core Goal
Make physics learning fun through interactive pixel game modes that teach 3 concepts:
1. **Pengukuran** (Measurement)
2. **Usaha & Energi** (Work & Energy)
3. **Sumber Energi** (Energy Sources)

### Success Metrics
- Student completes all 3 mode storylines
- Student achieves "Master Fisika" title
- Student understands core physics concepts through practical game mechanics

---

# PART A: GAMEPLAY FLOW

## SETUP AWAL (Initial Setup)

### 1. Character Selection Screen
```
┌─────────────────────────────────┐
│  WELCOME TO PHYSICS QUEST       │
│  Pick Your Character             │
├─────────────────────────────────┤
│  [ 👨‍🔬 ] [ 👨‍🏭 ] [ 👨‍🚀 ] [ 👨‍🏫 ]     │
│  Ilmuwan  Insinyur  Astronot  Prof  │
└─────────────────────────────────┘
```

**What Happens:**
- Player selects one of 4 character pixel arts
- Each has unique idle animation and color palette
- Choice affects visual theme but not gameplay

### 2. Physics Lab (Hub World)
```
┌──────────────────────────────────────┐
│  PHYSICS LAB - Welcome {CharName}!   │
├──────────────────────────────────────┤
│                                      │
│    ┌─ PINTU 1 ─┐  ┌─ PINTU 2 ─┐   │
│    │           │  │           │   │
│    │ 📏 UKUR    │  │⚙️ USAHA    │   │
│    │ BENDA      │  │ & ENERGI   │   │
│    \─────────────┘  \─────────────┘   │
│                                      │
│           ┌─ PINTU 3 ─┐              │
│           │ ⚡ SUMBER │              │
│           │  ENERGI   │              │
│           \───────────┘              │
│                                      │
│  [NPC Profesor] "Kumpulkan bintang  │
│   untuk unlock skin keren!"          │
│                                      │
│  STATS: ⭐ 0  🏆 0  🔓 0            │
└──────────────────────────────────────┘
```

**Tutorial:**
NPC Profesor explains:
- "Ambil mission di setiap pintu"
- "Menang level = dapat bintang"
- "Kumpulkan bintang = unlock hadiah"
- "Selesaikan 3 mode = master fisika!"

---

## STRUKTUR PER MODE

### Universal Level Structure

| Level | Type | Duration | XP | Purpose |
|-------|------|----------|----|---------| 
| 1-4 | Tutorial + Practice | 2-3 min | 10 XP | Learn concepts |
| 5 | Application | 4-5 min | 25 XP | Apply concepts |
| 6 | Boss | 5-7 min | 50 XP | Master concepts |

**Total per mode:** 6 levels × 3 modes = 18 levels

---

## MODE 1: PENGUKURAN (MEASUREMENT)

### Level 1: Panjang Dasar (Basic Length)

**Objective:** Measure pencil length using ruler

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 1: PANJANG DASAR          │
│ ⭐⭐⭐ BINTANG: 1                 │
├─────────────────────────────────┤
│                                 │
│   ◻─── PENSIL PIXEL ───◻        │
│   0  1  2  3  4  5  6  7  8  9  │
│     ▲ MISTAR PIXEL ▲             │
│                                 │
│   [Drag ruler to measure]       │
│                                 │
│   JAWABAN: [__.__] cm           │
│   [ CEK JAWABAN ]               │
│                                 │
│   💡 HINT: Ujung pensil?       │
│                                 │
│   Attempt: 1 / 3                │
└─────────────────────────────────┘
```

**Game Mechanics:**
1. Ruler appears as draggable element
2. Player drags ruler to align with pencil
3. Player reads value from ruler scale
4. Input answer in text field
5. Click "CEK JAWABAN" (Check Answer)

**Feedback:**
- **Correct:** ✅ Karakter jump, "Bintang!" appears, sound effect (ting!), screen flash green
- **Incorrect:** ❌ Ruler shakes, karakter sad, "Coba lagi!" message
- **3 mistakes:** Hint appears with arrows pointing to correct scale

**Learning:** Basic measurement reading, decimal precision

---

### Level 2: Jangka Sorong (Vernier Caliper)

**Objective:** Read diameter using vernier caliper

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 2: JANGKA SORONG          │
│ ⭐⭐⭐ BINTANG: 1                 │
├─────────────────────────────────┤
│                                 │
│   ╫═══════════════════════════╫ │
│   ║ KOIN PIXEL ◯              ║ │
│   ║ [Drag jaws to coin]       ║ │
│   ╫═══════════════════════════╫ │
│                                 │
│   SKALA UTAMA: [_._] cm        │
│   SKALA NONIUS: [__] (×0,1mm)  │
│   HASIL: [_.__] cm             │
│                                 │
│   [ CEK JAWABAN ]              │
│                                 │
│   Percobaan: 1 / 3             │
└─────────────────────────────────┘
```

**Game Mechanics:**
1. Coin (koin) appears in center
2. Player drags vernier caliper jaws to grip coin
3. Player rotates thimble (roda) to tighten
4. Main scale + Vernier scale reading appears
5. Player inputs two separate values
6. System calculates total = Main + (Vernier × 0.1mm)

**Learning:** Precision measurement, reading dual scales, significant figures

---

### Level 3: Mikrometer (Micrometer)

**Objective:** Measure hair thickness using micrometer

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 3: MIKROMETER             │
│ ⭐⭐⭐ BINTANG: 1                 │
├─────────────────────────────────┤
│                                 │
│   ╭─ RAMBUT PIXEL ─╮            │
│   │ ╔════════════╗ │            │
│   │ ║   PUTAR    ║ │            │
│   │ ║  THIMBLE   ║ │            │
│   │ ║            ║ │            │
│   │ ║ ↻↻↻↻↻↻↻ ║ │            │
│   │ ╚════════════╝ │            │
│   │ SCALE: [0.00] mm            │
│   ╰────────────────╯            │
│                                 │
│   HASIL: [_._] mm              │
│   [ CEK JAWABAN ]              │
│                                 │
│   Status: [████░░░░░] 50%      │
└─────────────────────────────────┘
```

**Game Mechanics:**
1. Hair (rambut) placed in mic opening
2. Player rotates thimble by dragging (circular motion)
3. Visual feedback: Thimble rotates with mouse, spindle advances
4. Main scale + rotating scale aligns
5. Reading displays in mm with 0.01 precision
6. Auto-correct when thimble reaches "0" mark (proper zero adjustment)

**Challenge:** Requires careful fine motor control (rotation precision)

**Learning:** Ultra-precise measurement, metric micro-units

---

### Level 4: Neraca Lengan (Beam Balance)

**Objective:** Measure mass of stone using beam balance

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 4: NERACA LENGAN          │
│ ⭐⭐⭐ BINTANG: 1                 │
├─────────────────────────────────┤
│                                 │
│   BERGERAK: ▲ (tidak seimbang) │
│                                 │
│      ╭─────┬─────╮              │
│      │     │     │              │
│   {Batu}  {Mistar}              │
│      └─────┴─────┘              │
│        ▲ NERACA ▲               │
│                                 │
│   SLIDER ANAK TIMBANGAN:        │
│   1kg ════◯════ 10kg           │
│                                 │
│   POSISI: [___] kg             │
│   [ CEK JAWABAN ]              │
│                                 │
│   💡 Geser sampai seimbang     │
└─────────────────────────────────┘
```

**Game Mechanics:**
1. Stone placed on left pan
2. Slider (anak timbangan) starts at left
3. Player drags slider right to balance beam
4. Beam becomes level when correct mass is reached
5. "SEIMBANG!" message appears
6. Player inputs mass value or system auto-reads from slider position

**Visual Feedback:** 
- Beam tilts toward heavier side (visual physics)
- When balanced: Beam glows, satisfying "level" animation

---

### Level 5: Campuran (Mixed Measurement Challenge)

**Objective:** Measure 5 different objects using appropriate tools within 3 minutes

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 5: CAMPURAN ⏱️ 3:00       │
│ ⭐⭐⭐ BINTANG: 1                 │
├─────────────────────────────────┤
│                                 │
│  BENDA 1: Mistar [████] 2/5    │
│  BENDA 2: Jangka [░░░░░] 0/5  │
│  BENDA 3: Mikro  [░░░░░] 0/5  │
│  BENDA 4: Neraca [░░░░░] 0/5  │
│  BENDA 5: Jangka [░░░░░] 0/5  │
│                                 │
│  TOOLS: [Mistar][Jangka][Mikro]│
│         [Neraca][Termometer]   │
│                                 │
│  SKOR: 20 / 100 poin           │
│                                 │
└─────────────────────────────────┘
```

**Game Mechanics:**
1. 5 objects displayed on meja (table)
2. 5 tools available at bottom toolbar
3. Each correct measurement = 20 points
4. Timer counts down from 3 minutes
5. Timer bonus: Extra 10 points if completed before 2 minutes
6. Wrong tool = "-5 points" penalty

**Objects & Tools:**
- Pensil → Mistar (ruler)
- Koin → Jangka Sorong (caliper)
- Rambut → Mikrometer (micrometer)
- Batu → Neraca (balance)
- Buku tebal → Jangka + Mistar (calipers or ruler)

**Learning:** Tool selection, time management, measurement decision-making

---

### Level 6: BOSS - Laboratorium Rusak (Chaotic Lab)

**Objective:** Save the lab! Measure all scattered objects correctly before time runs out

**Story:** "Oh no! Badai mengacaukan lab! Bantu Profesor mengukur semuanya sebelum inspeksi!"

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 6: BOSS - LAB RUSAK ⏱️    │
│ BAHAYA! [████████░░] 80% CHAOS  │
├─────────────────────────────────┤
│                                 │
│  [Object floating around]       │
│  ~ benda berubah-ubah posisi ~  │
│                                 │
│  TERUKUR: [████░░] 4/10        │
│  WAKTU: 5:00 ⏱️                 │
│  SKOR: 60 / 100                │
│                                 │
│  TOOLS: [Mistar][Jangka][Mikro]│
│         [Neraca][Termometer]   │
│                                 │
│  Difficulty: ⭐⭐⭐⭐⭐          │
│                                 │
└─────────────────────────────────┘
```

**Unique Mechanics:**
1. Objects move slowly across screen (floating animation)
2. Player must catch and measure before time expires
3. Harder than Level 5: 10 objects, only 5 minutes
4. Each wrong measurement loses 20 points
5. Chaos meter increases over time (visual distortion effect)

**Victory Condition:**
- Complete ≥6/10 measurements before timer ends
- Unlock trophy: "Lab Master! 🏆"

**Rewards:**
- ⭐⭐⭐ 3 stars
- 🏆 Physical trophy pixel in lab
- Unlock Mode 2

---

## MODE 2: USAHA & ENERGI (WORK & ENERGY)

### Level 1: Dorong Kotak (Push the Box - Basic Work)

**Concept Taught:** W = F × s (Work = Force × Distance)

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 1: DORONG KOTAK           │
│ ⭐⭐⭐ BINTANG: 1                 │
├─────────────────────────────────┤
│                                 │
│   KOTAK ▢─────────────────►     │
│   karakter mendorong dari kiri  │
│                                 │
│  ┌─ RUMUS ─────────────┐       │
│  │ W = F × s           │       │
│  │ W = usaha (Joule)   │       │
│  │ F = gaya (Newton)   │       │
│  │ s = jarak (meter)   │       │
│  └─────────────────────┘       │
│                                 │
│  SOAL:                          │
│  Gaya (F): [10] N              │
│  Jarak (s): [5] m              │
│  Usaha (W): [__] J             │
│                                 │
│  [ HITUNG ] [ KIRIM JAWABAN ]  │
│                                 │
│  💡 HINT: Kalikan F × s       │
│                                 │
│  Attempt: 1 / 3                │
└─────────────────────────────────┘
```

**Game Mechanics:**
1. Textual formula appears at top
2. Player inputs F and s values
3. Player solves equation: W = F × s
4. Visual: Character pushes box across distance
5. Result bar fills based on calculation

**Interactive Element:**
- Slider to adjust "Force" value (1-50 N)
- Slider to adjust "Distance" value (1-10 m)
- Real-time visualization: Box moves proportional to distance

**Learning:** Basic formula application, unit understanding

---

### Level 2: Dorong Miring (Inclined Plane Work Calculation)

**Concept:** W = F × s × cos(θ) - Work on angled surface

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 2: DORONG MIRING          │
│ ⭐⭐⭐ BINTANG: 2                 │
├─────────────────────────────────┤
│                                 │
│            ╱                    │
│    KOTAK ═╱ ← karakter dorong  │
│          ╱                      │
│         ╱ ← bidang miring       │
│        ╱                        │
│       ╱___________________      │
│      ^ θ = 30°              ^ │
│                                 │
│  ┌─ RUMUS ─────────────┐       │
│  │ W = F×s×cos(θ)     │       │
│  │ cos(30°) = 0.866   │       │
│  └─────────────────────┘       │
│                                 │
│  INPUT:                         │
│  Gaya (F): [20] N              │
│  Jarak (s): [4] m              │
│  Sudut (θ): [30] °             │
│                                 │
│  Usaha: [ HITUNG ]            │
│  Jawaban: [____] J             │
│                                 │
│  Attempt: 1 / 3                │
└─────────────────────────────────┘
```

**Game Mechanics:**
1. Angle slider (0-90°) adjustable
2. cos(θ) value auto-updates
3. Player must input all 3 values
4. System calculates: W = 20 × 4 × cos(30°) = 69.28 J
5. Inclined plane rotates visually as angle changes

**Challenge:** Introducing trigonometry, understanding vector components

---

### Level 3: Bola Bergerak (Kinetic Energy)

**Concept:** EK = ½ × m × v² (Kinetic Energy)

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 3: BOLA BERGERAK          │
│ ⭐⭐⭐ BINTANG: 2                 │
├─────────────────────────────────┤
│                                 │
│   ●━━━━━━━━━━━━━━━━━━→         │
│   bola pixel bergerak cepat    │
│                                 │
│  ┌─ RUMUS ──────────────┐      │
│  │ EK = ½ × m × v²     │      │
│  │ EK = energi kinetik │      │
│  │ m = massa (kg)      │      │
│  │ v = kecepatan (m/s) │      │
│  └────────────────────┘      │
│                                 │
│  SOAL:                          │
│  Massa bola (m): [2] kg        │
│  Kecepatan (v): [3] m/s        │
│  Energi Kinetik: [__] J        │
│                                 │
│  [ HITUNG JAWABAN ]            │
│                                 │
│  💡 Ingat: ½ × m × v²         │
│  💡 Catatan: v² berarti v×v   │
│                                 │
│  Attempt: 1 / 3                │
└─────────────────────────────────┘
```

**Game Mechanics:**
1. Ball animation shows movement speed
2. Faster v = faster ball movement (visual feedback)
3. Larger m = ball appears bigger
4. Player calculates: ½ × 2 × 3² = ½ × 2 × 9 = 9 J
5. Energy bar appears showing EK amount

**Visual Feedback:**
- Ball with speed lines
- Size represents mass
- Energy particle effects (sparkles) around ball = energy amount

**Learning:** Quadratic relationship, kinetic energy concept

---

### Level 4: Bola Jatuh (Potential Energy)

**Concept:** EP = m × g × h (Gravitational Potential Energy)

**UI Layout:**
```
┌─────────────────────────────────┐
│ LEVEL 4: BOLA JATUH             │
│ ⭐⭐⭐ BINTANG: 2                 │
├─────────────────────────────────┤
│                                 │
│   ●                             │
│   │ ← h (ketinggian)            │
│   │                             │
│   │ 10 m                       │
│   │                             │
│   └─────────────────            │
│         Tanah                   │
│                                 │
│  SOAL:                          │
│  Massa (m): [1] kg             │
│  Gravitasi (g): [10] m/s²      │
│  Ketinggian (h): [10] m        │
│                                 │
│  Energi Potensial: [__] J      │
│  [ HITUNG ]                    │
│                                 │
│  Attempt: 1 / 3                │
└─────────────────────────────────┘
```

**Game Mechanics:**
1. Ball displayed at height on screen
2. Slider adjusts height (visual)
3. Player inputs m, g, h values
4. Calculates: EP = 1 × 10 × 10 = 100 J
5. Height meter shows on right side

**Progressive Challenge:**
- g is given as 10 m/s²
- Later levels might ask: "Hitung g jika EP = 200J, m = 2kg, h = 10m"

---

### Level 5: Roller Coaster Designs (Energy Conservation)

**Concept:** Total Mechanical Energy = EK + EP = constant (Conservation of Energy)

**Unique Mechanic: BUILD MODE**

**UI Layout:**
```
┌──────────────────────────────────────┐
│ LEVEL 5: ROLLER COASTER DESIGN       │
│ ⭐⭐⭐⭐⭐ BINTANG: 3                     │
├──────────────────────────────────────┤
│                                      │
│ TRACK PALETTE:                       │
│ [═══] straight [╱╲] loop [╲╱] dip  │
│ [╱╱╱] uphill [╲╲╲] down [╱─╲] flat │
│                                      │
│ GRID:                                │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
│                                      │
│ STATUS: 🟢 READY TO TEST            │
│ [ TEST TRACK ] [ RESET ] [ HINT ]   │
│                                      │
│ INFO: Start H=20m, m=1kg, g=10     │
│ Target: Reach FINISH                │
│                                      │
└──────────────────────────────────────┘
```

**Game Flow:**

1. **Build Phase:**
   - Player drags track pieces from palette onto grid
   - Each piece snaps to grid
   - Building is free-form (creative)

2. **Test Phase:**
   - Click "TEST TRACK"
   - Ball animates sliding down
   - Real-time energy meter shows:
     ```
     EP (Energi Potensial): [████░░░░] 200J
     EK (Energi Kinetik):   [░░░░████] 0J
     TOTAL:                 200J (constant!)
     ```
   - As ball slides down: EP decreases, EK increases
   - At loop: Ball might lose speed if insufficient energy

3. **Victory Condition:**
   - Ball reaches "FINISH" flag
   - Show energy conservation visualization
   - Award stars based on efficiency (minimize friction)

4. **Failure State:**
   - Ball runs out of energy midway
   - Message: "Energi habis! Coba kurangi gesekan atau tambah tinggi awal"
   - Return to build phase

**Learning Objectives:**
- Energy conservation principle
- Gravity converts PE to KE
- System design thinking
- Understanding friction/losses

---

### Level 6: BOSS - Malam Roller Coaster

**Objective:** Design complex roller coaster with 3 loops that reaches finish in 5 minutes

**UI Layout:**
```
┌──────────────────────────────────────┐
│ LEVEL 6: BOSS - ROLLER COASTER MALAM │
│ ⏱️ TIME: 5:00                        │
├──────────────────────────────────────┤
│                                      │
│ "Desain lintasan tersulit!"         │
│ Harus lewati 3 LOOP & FINISH        │
│                                      │
│ TRACK PIECES: [═══] [╱╲] [╲╱] [╱╱] │
│                                      │
│ GRID: (darker theme - malam)         │
│ Grid with night background           │
│                                      │
│ REQUIREMENTS:                        │
│ ✓ Bola masuk LOOP 1                 │
│ ✗ Bola masuk LOOP 2                 │
│ ✗ Bola masuk LOOP 3                 │
│ ✗ Bola sampai FINISH                │
│                                      │
│ [ TEST ] [ RESET ] [ SUBMIT ]       │
│                                      │
│ Difficulty: ⭐⭐⭐⭐⭐              │
│                                      │
└──────────────────────────────────────┘
```

**Challenges:**
1. Must include exactly 3 loops
2. Insufficient energy creates game over
3. Loops get progressively harder to maintain speed through
4. Friction increases at night (visual effect)

**Rewards:**
- ⭐⭐⭐ 3 stars
- 🏆 Roller Coaster Master trophy
- Unlock Mode 3

---

## MODE 3: SUMBER ENERGI (ENERGY SOURCES)

### Level 1: Panel Surya (Solar Energy)

**Objective:** Build solar panels in sunny area to power 10 houses

**UI Layout:**
```
┌──────────────────────────────────────┐
│ LEVEL 1: PANEL SURYA ☀️              │
│ ⭐⭐⭐ BINTANG: 1                     │
├──────────────────────────────────────┤
│                                      │
│  GURUN PIXEL (sunny area)            │
│  ☀️  ☀️ ☀️                            │
│                                      │
│  ☐☐☐☐☐  (10 rumah)              │
│  ☐☐☐☐☐                           │
│                                      │
│  ENERGI: [████░░░░░░] 40 / 100 MW  │
│  RUMAH TERPENUHI: 4 / 10            │
│  BUDGET: 500 koin                   │
│  USED: 200 koin                     │
│                                      │
│  TOOLS:                              │
│  [Panel Surya] cost=50 koin, 5MW   │
│  [Panel Besar] cost=100 koin, 12MW │
│                                      │
│  [ NEXT LEVEL ]  [ HINT ]           │
│                                      │
└──────────────────────────────────────┘
```

**Game Mechanics:**

1. **Placement System:**
   - Player taps sunny location on grid
   - Selects panel type from menu
   - Panel placed with cost deducted from budget

2. **Energy Generation:**
   - Each panel generates fixed MW
   - Total MW shown in meter
   - When MW ≥ house needs: houses light up

3. **Victory:**
   - All 10 houses power up
   - "Kota terang!" message
   - Progress to Level 2

---

### Level 2: Kincir Angin (Wind Energy)

**Objective:** Build wind turbines in windy areas to power 15 houses

**UI Layout:**
```
┌──────────────────────────────────────┐
│ LEVEL 2: KINCIR ANGIN 💨             │
│ ⭐⭐⭐ BINTANG: 1                     │
├──────────────────────────────────────┤
│                                      │
│  PANTAI PIXEL                        │
│  >>>>>  wind lines (animated)   │
│  >>>>>                               │
│                                      │
│  ☐☐☐☐☐  (15 rumah)              │
│  ☐☐☐☐☐                           │
│  ☐☐☐☐☐                           │
│                                      │
│  ENERGI: [██░░░░░░░] 25 / 150 MW   │
│  RUMAH TERPENUHI: 2 / 15            │
│  BUDGET: 800 koin                   │
│  USED: 100 koin                     │
│                                      │
│  TOOLS:                              │
│  [Kincir Kecil] cost=50, 8MW       │
│  [Kincir Besar] cost=150, 25MW     │
│                                      │
│  💡 HINT: Tempat dengan angin ✓    │
│                                      │
└──────────────────────────────────────┘
```

**Unique Feature:**
- Wind visual effect (animated lines)
- Only works in "windy zones" (indicated by wind lines)
- Placing outside windy zone = wasted money

**Learning:** Renewable energy feasibility, location importance

---

### Level 3: Bendungan (Hydroelectric)

**Objective:** Build dam to generate power, balance energy vs environmental impact

**UI Layout:**
```
┌──────────────────────────────────────┐
│ LEVEL 3: BENDUNGAN 💧               │
│ ⭐⭐⭐ BINTANG: 2                     │
├──────────────────────────────────────┤
│                                      │
│  SUNGAI PIXEL:                       │
│  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿ (flowing)  │
│  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿             │
│  ∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿             │
│                                      │
│  HEIGHT SLIDER: [==◯══] 0-100%    │
│                                      │
│  ENERGI: [█████░░░░░] 50 / 100 MW  │
│  IKAN: 🐟🐟🐟🐟🐟🐟🐟🐟 (8/10)        │
│  LIMBAH: 0%  ✓                      │
│                                      │
│  ⚠️ PERINGATAN:                     │
│  Tinggi bendungan = energi lebih   │
│  Tapi = ikan berkurang              │
│                                      │
│  [ NEXT ] [ HINT ] [ VIEW DATA ]   │
│                                      │
└──────────────────────────────────────┘
```

**Game Mechanic: Trade-off System**

1. **Dam Height Slider:**
   - Move slider up = more energy, fewer fish
   - Move slider down = less energy, more fish

2. **Meters:**
   - Energy meter increases with height
   - Fish counter decreases with height
   - Pollution meter stays 0% (clean energy)

3. **Victory Condition:**
   - Energy ≥ 50 MW AND
   - Fish ≥ 5 (environmental consideration)
   - Shows balance between needs and sustainability

**Learning:** Renewable energy trade-offs, environmental impact, cost-benefit analysis

---

### Level 4: Panas Bumi (Geothermal)

**Objective:** Build geothermal plant near volcano (expensive but stable)

**UI Layout:**
```
┌──────────────────────────────────────┐
│ LEVEL 4: PANAS BUMI 🌋               │
│ ⭐⭐⭐ BINTANG: 2                     │
├──────────────────────────────────────┤
│                                      │
│  GUNUNG API PIXEL:                   │
│         △                            │
│        ╱ ╲  ◀ asap (animated)       │
│       ╱ ~ ╲ geothermal area        │
│      ╱_____╲                        │
│     ║       ║  ← BOLT AREA           │
│                                      │
│  ENERGI BESAR:                       │
│  [████████░░] 80 / 100 MW  (24/7!) │
│  STATUS: ✓ Stabil sepanjang hari   │
│                                      │
│  BUDGET DIBUTUHKAN: 500 koin        │
│ 💰 BUDGET: 500 koin (cukup!)       │
│                                      │
│  [ BUILD GEOTHERMAL ]               │
│                                      │
│  ℹ️ Info: Mahal tapi worth it!      │
│  Energi stabil 24 jam               │
│                                      │
└──────────────────────────────────────┘
```

**Game Mechanic:**

1. **High Cost:**
   - 500 koin investment (highest so far)
   - Player must manage budget carefully

2. **High Reward:**
   - 80 MW generation (highest single source)
   - Always active (day/night)
   - No environmental impact

3. **Strategic Choice:**
   - Can only build at volcano location
   - Forces planning ahead
   - Example of investment return in energy

**Learning:** Renewable energy diversity, capital investment, consistency concept

---

### Level 5: Fosil vs Terbarukan (Energy Mix Challenge)

**Objective:** Power city of 50 houses with budget constraint, balance pollution

**UI Layout:**
```
┌────────────────────────────────────────┐
│ LEVEL 5: FOSIL VS ENERGI TERBARUKAN   │
│ ⭐⭐⭐⭐⭐ BINTANG: 3                    │
├────────────────────────────────────────┤
│                                       │
│  KOTA BESAR: 50 rumah                │
│  ☐☐☐☐☐☐☐☐☐☐  (50 houses)    │
│  ☐☐☐☐☐☐☐☐☐☐                │
│  ☐☐☐☐☐☐☐☐☐☐                │
│  ☐☐☐☐☐☐☐☐☐☐                │
│  ☐☐☐☐☐☐☐☐☐☐                │
│                                       │
│  KEBUTUHAN: 500 MW                   │
│  BUDGET: 1500 koin                   │
│                                       │
│  ┌─ METER MONITORING ─────────────┐ │
│  │ ENERGI:        [███░░] 300/500 MW│
│  │ BIAYA:         [███░░] 900/1500  │
│  │ POLUSI:        [████░] 80%  ❌  │
│  └──────────────────────────────────┘│
│                                       │
│  PILIHAN PEMBANGKIT:                 │
│  ☀️ Panel Surya (5MW, 50koin, 0%)   │
│  💨 Kincir Angin (8MW, 40koin, 0%)  │
│  💧 Bendungan (50MW, 400koin, -fish)│
│  🌋 Panas Bumi (80MW, 500koin, 0%)  │
│  ⚡ Batu Bara (60MW, 50koin, 40%)   │
│  ☢️ Nuklir (100MW, 300koin, 5%)    │
│                                       │
│  Jika POLUSI > 50%: GAME OVER!       │
│                                       │
│  [ BUILD ] [ NEXT ] [ DATA ]         │
│                                       │
└────────────────────────────────────────┘
```

**Game Mechanic: Multiple Constraint System**

1. **Three Meters to Balance:**
   - Energy (must ≥ 500 MW)
   - Budget (must ≤ 1500 koin)
   - Pollution (must < 50%)

2. **Fossil vs Renewable Trade-off:**
   - Coal (batu bara): Cheap, fast, high pollution
   - Nuclear: Moderate cost, low pollution, questionable safety (gameplay wise)
   - Renewables: Expensive, clean, takes planning

3. **Victory Paths:**
   - Path A: All renewable (expensive, long planning)
   - Path B: Mix of fossil + renewable (balanced)
   - Path C: All fossil (fails - too much pollution)

**Learning:** Complex energy planning, cost-benefit, environmental responsibility

---

### Level 6: BOSS - Kota Futuristik (Future City 100% Renewable)

**Objective:** Design 100% renewable energy city with tight budget

**Story:** "Tahun 2050! Bangun kota futuristik dengan energi tercukupi, budget terbatas, 0% polusi!"

**UI Layout:**
```
┌─────────────────────────────────────┐
│ LEVEL 6: BOSS - KOTA FUTURISTIK 2050│
│ MISI TINGKAT TERTINGGI               │
├─────────────────────────────────────┤
│                                     │
│  KOTA 100 RUMAH:                    │
│  [Grid dengan 100 rumah futuristik] │
│                                     │
│  TARGET: 1000 MW (besar!)           │
│  BUDGET: 2000 koin SAJA             │
│  POLUSI: MAX 0% (ZERO!)             │
│  WAKTU: 7 menit                     │
│                                     │
│  ┌─ REQUIREMENT ──────────────────┐│
│  │ Energy:    [░░░░░░░] 0/1000 MW ││
│  │ Budget:    [██████░░] 1200/2000││
│  │ Pollution: [░░░░░░░░] 0%  (✓)  ││
│  │ Time Left: 7:00  ⏱️              ││
│  └────────────────────────────────┘│
│                                     │
│  HANYA TERBARUKAN:                  │
│  [☀️️] [💨] [💧] [🌋]                 │
│  Batu Bara = FAILED!                │
│                                     │
│  [ BUILD ] [ TEST ] [ SUBMIT ]     │
│                                     │
│  Difficulty: ⭐⭐⭐⭐⭐⭐             │
│                                     │
│  🏆 HADIAH: Master Energi title     │
│             + All modes complete    │
│                                     │
└─────────────────────────────────────┘
```

**Challenges:**

1. **High Energy Demand:** 1000 MW = requires extensive planning
2. **Limited Budget:** 2000 koin forces efficiency
3. **Zero Pollution:** Cannot use any fossil fuels
4. **Complex Optimization:** Need mix of all 4 renewable sources
5. **Time Pressure:** 7 minutes to design and verify

**Victory State:**
- Kota bersinar dengan cahaya futuristik
- Penduduk berteriak senang (pixel animation)
- All renewable sources visible and balanced
- Unlock: "Master Energi" achievement + completion of all 3 modes

---

# PART B: MOTIVATION SYSTEM

## 1. PROGRESSION SYSTEM (Sense of Achievement)

### Star & Trophy System

```
┌─────────────────────────────────────┐
│ ACHIEVEMENT MILESTONES              │
├─────────────────────────────────────┤
│                                     │
│ 1 Level Selesai  → 1 Bintang ⭐   │
│ 5 Level Selesai  → Trophy Perak 🏆 │
│ 10 Level Selesai → Trophy Emas 🏆  │
│ 18 Level Selesai → "Master Fisika" │
│ Daily Streak 7   → Bonus Medal      │
│ Daily Streak 30  → Skin Legendary   │
│                                     │
└─────────────────────────────────────┘
```

### XP & Leveling

Each level gives XP:
- Level 1-5: 10 XP each
- Level 6 (Boss): 50 XP
- Total per mode: 50 + 50 + 50 = 300 XP per mode × 3 = 900 XP total

**Player Level Progression:**
```
Level 1 (0 XP)      - Newbie badge 🆕
Level 5 (300 XP)    - Physicist badge 🔬
Level 10 (600 XP)   - Expert badge ⭐
Level 15 (900 XP)   - Master badge 🏆
```

---

## 2. VISUAL FEEDBACK (Instant Joy)

### Correct Answer Feedback

**Multi-sensory celebration:**
```
1. Screen Flash: GREEN pulse (0.2 second)
2. Sound: "Ting!" cheerful SFX
3. Character: Jump animation (8 frames)
4. Particles: Gold stars spawn around character
5. Text: "✅ BENAR!" in dropdown animation
6. Star: ⭐ floats up, then lands in progress bar
7. Confetti: Small pixel confetti rains (brief)
```

**Code concept:**
```javascript
function onCorrectAnswer() {
    playSound('correct.mp3');
    flashScreen('green');
    character.playAnimation('jump');
    spawnParticles('stars', 10);
    showText('✅ BENAR!', 'dropdown');
    levelProgress.addStar(1);
    setTimeout(() => nextLevel(), 1500);
}
```

### Level Completion Feedback

**Boss level victory:**
```
1. Screen: Victory screen appears with fade-in
2. Music: Victory fanfare plays (orchestral)
3. Animation: Confetti cannons (larger, longer)
4. Character: Victory dance (looping 12-frame animation)
5. Trophy: Trophy graphic rotates slowly in center
6. Text: "LEVEL SELESAI! ⭐⭐⭐"
7.Stars: 3 stars appear with "pop" sound each
8. Buttons: "NEXT LEVEL" and "MAIN LAGI" light up
```

### Skill Progression Unlocks

**New Skin Unlock:**
```
Screen darkens, spotlight on character
Unboxing animation: Box opens with star burst
Character transforms to new costume
Auto-play victory animation in new outfit
"🎉 UNLOCK: Astronot Suit! Wear with style"
```

---

## 3. CURIOSITY DRIVERS (Sense of Wonder)

### Unlockable Physics Facts

**System:**
After each level, brief fact appears:

```
┌─ PHYSICS FACT ──────────────────┐
│                                 │
│ 📚 Tahukah kamu?                │
│                                 │
│ "Energi tidak bisa diciptakan   │
│  atau dimusnahkan, hanya        │
│  berubah bentuk."               │
│                                 │
│ - Albert Einstein                │
│                                 │
│ [X] (close button)              │
│                                 │
└─────────────────────────────────┘
```

**Fact Pool Examples:**

**Mode 1 (Measurement):**
- "Alat ukur paling teliti bisa mengukur rambut manusia! (mikrometer: 0.01mm)"
- "Satuan SI (meter, kilogram, sekon) berlaku di seluruh dunia"
- "Jangka sorong bisa mencapai ketepatan 0,1mm"

**Mode 2 (Work & Energy):**
- "Energi kinetik tergantung KUADRAT kecepatan → sedikit cepat = energi besar"
- "Roller coaster nyata menggunakan kekekalan energi!"
- "Usaha adalah konsep yang berbeda dari 'kerja' sehari-hari"

**Mode 3 (Energy Sources):**
- "Panel surya bisa generate 200W per meter persegi di siang hari"
- "Satu kincir angin modern bisa power 1000 rumah!"
- "Energi panas bumi stabil 24 jam, tidak tergantung cuaca"
- "Indonesia punya potensi energi surya terbaik di dunia"

### Misteri & Easter Eggs

**Secret Level Hint:**
```
After all 18 levels:
"Tunggu... ada yang aneh di lab. Coba dengar suara di pojok kanan atas..."

Secret click area (invisible button) plays sound
Unlocks: Hidden Level 19 "Quantum Physics Quiz"
```

**Character Easter Eggs:**
```
Tap character 10× rapidly:
Character talks: "Hey! Kenapa kamu tap-tap terus? Mau belajar atau nggak? 😄"

Tap 20× more:
Character: "Oke, ini hadiah rahasia untuk kamu yang sabar..."
Plays: Easter egg minigame (random)
```

---

## 4. SOCIAL MOTIVATION (Status & Recognition)

### Leaderboard System

**Weekly Leaderboard (per class):**
```
┌────────────────────────────────────┐
│ LEADERBOARD - PEKAN INI             │
├────────────────────────────────────┤
│                                    │
│ 🥇 Budi Hartono      2850 XP       │
│ 🥈 Sinta Cahyo       2720 XP       │
│ 🥉 Andi Wijaya       2680 XP       │
│ 4️⃣ KAMU (Player)    2100 XP  →    │
│ 5️⃣ Dina Kusuma      2050 XP       │
│                                    │
│ [See Full Ranking]  [Your Rank]   │
│                                    │
└────────────────────────────────────┘
```

### Share Achievements

**Screen after completing mode:**
```
┌────────────────────────────────────┐
│ ✅ MODE SELESAI!                   │
├────────────────────────────────────┤
│                                    │
│ Skor Akhir: 2400 poin             │
│ Mode: Pengukuran                  │
│ Waktu: 18 menit 35 detik          │
│ Akurasi: 85%                      │
│                                    │
│ [ 📸 Screenshot ]                 │
│ [ 📤 Share WhatsApp ]             │
│ [ 📧 Kirim ke Guru ]              │
│ [ 👥 Challenge Teman ]            │
│                                    │
│ Guru akan melihat: "Nama Siswa    │
│ telah menyelesaikan Mode           │
│ Pengukuran dengan skor 2400poin!" │
│                                    │
└────────────────────────────────────┘
```

### Multiplayer Mini-Challenge

**Concept:**
- "Battle" mode: Challenge friend
- Both solve same problem
- Race to correct answer
- Winner gets bonus XP

---

## 5. REAL-WORLD CONNECTION (Relevance)

### "Di Dunia Nyata" System

**After each level concept, show real application:**

**Pengukuran Level 1:**
```
┌─────────────────────────────────────┐
│ 🌍 DI DUNIA NYATA                  │
│                                     │
│ Kamu pernah beli kain?             │
│ Penjual itu pakai MISTAR untuk     │
│ ngukur panjang kain yang kamu beli!│
│                                     │
│ Kemampuan ukur presisi = uang      │
│ Tidak bisa rugi-rugi!              │
│                                     │
│ [gambar penjual kain dengan mistar] │
│                                     │
│ [ LANJUT ]                         │
│                                     │
└─────────────────────────────────────┘
```

**Usaha Level 2:**
```
┌─────────────────────────────────────┐
│ 🌍 DI DUNIA NYATA                  │
│                                     │
│ Pernah dorong mobil mogok?         │
│ Kamu ngasih GAYA, mobil bergerak   │
│ SEJAUH beberapa meter.             │
│                                     │
│ ITU USAHA! W = F × s               │
│                                     │
│ Makin kuat dorong = makin besar    │
│ usaha yang keluar dari tubuhmu     │
│                                     │
│ [gambar orang dorong mobil]        │
│                                     │
│ [ LANJUT ]                         │
│                                     │
└─────────────────────────────────────┘
```

**Energi Level 5:**
```
┌─────────────────────────────────────┐
│ 🌍 DI DUNIA NYATA                  │
│                                     │
│ Rumahmu dikuasai energi:           │
│                                     │
│ ⚡ Listrik dari mana?              │
│   Kemungkinan:                     │
│   - Bendungan (energi air)         │
│   - Pembangkit (energi fosil)      │
│   - Panel surya (energi matahari)  │
│                                     │
│ Pilihan energi = pilihan masa depan│
│ apa yang ingin berbisnis          │
│                                     │
│ [ LANJUT ]                         │
│                                     │
└─────────────────────────────────────┘
```

### Home Experiment Challenges

**At mode end:**
```
┌─────────────────────────────────────┐
│ 🧪 PERCOBAAN DI RUMAH              │
│                                     │
│ Tantangan: Ukur panjang meja       │
│ belajarmu menggunakan mistar!      │
│                                     │
│ Kemudian:                          │
│ 1. Tulis hasilnya                 │
│ 2. Photo hasilnya                 │
│ 3. Kirim ke guru via WhatsApp    │
│                                    │
│ Guru akan kasih reward gratis      │
│ (extra XP atau badge special!)     │
│                                    │
│ [Coba sekarang]  [Nanti saja]    │
│                                    │
└─────────────────────────────────────┘
```

---

## 6. PROGRESS VISUALIZATION (Feeling of Growth)

### Lab Evolution System

**Physics Lab Hub upgrades as player progresses:**

**Stage 1 (0-5 levels):**
```
Spartan lab: Dark, empty, only character
```

**Stage 2 (6-12 levels):**
```
Lab fills up: Shelves with equipment appear, light gets brighter
```

**Stage 3 (13-18 levels):**
```
Full lab: Trophy cases visible, achievements on wall, vibrant lighting
```

### Trophy & Medal Display

**Lab wall has display case:**
```
┌─────────────────────────────────────┐
│ TROPHY CASE (di lab lab)            │
│                                     │
│ 🏆 Pengukuran Master               │
│ 🏆 Energi Expert                   │
│ 🏆 Usaha Champion                  │
│ 🎖️ Streak 7 Hari                   │
│ 🎖️ Speed Runner (selesai <5min)  │
│                                     │
│ Total trofis: 5 / 50                │
│                                     │
└─────────────────────────────────────┘
```

### Diploma/Certificate Wall

```
Saat selesai 1 mode, sertifikat pixel ditampilin:

╔═══════════════════════════════════╗
║    SERTIFIKAT KEAHLIAN            ║
║   FISIKA - PENGUKURAN             ║
║                                   ║
║   Ini menyatakan bahwa            ║
║   [NAMA SISWA]                    ║
║   Telah menyelesaikan Mode        ║
║   PENGUKURAN dengan               ║
║   keberhasilan sempurna           ║
║                                   ║
║   Kota Pixel, Feb 2026            ║
║   [TTD] Profesor Pixel      ║
╚═══════════════════════════════════╝
```

---

## 7. CHALLENGE & VARIETY (Thrill Factor)

### Daily Challenge System

**Every day, new challenge unlocks:**

```
┌─────────────────────────────────────┐
│ 🎯 TANTANGAN HARIAN                 │
├─────────────────────────────────────┤
│                                     │
│ Hari Ke: 21 Tanda Tanya Terus      │
│                                     │
│ TANTANGAN: "Speed Run"              │
│ Selesaikan level random dalam      │
│ waktu < 1 menit!                   │
│                                     │
│ REWARD: 50 XP bonus + medal         │
│                                     │
│ [ START CHALLENGE ]                 │
│                                     │
│ Jangan ketinggalan challenge hari  │
│ esok! Streak akan putus jika tidak │
│ main daily.                         │
│                                     │
└─────────────────────────────────────┘
```

### Difficulty Modifiers

**Optional hard mode for each level:**

```
NORMAL MODE    ← Selected by default
- 3 attempts allowed
- Hints available
- Full feedback on error

HARD MODE      ← Unlock after normal clear
- 1 attempt only
- No hints
- Minimal feedback
- Reward: 1.5× stars & XP
- Badge: "Hard Mode Master"
```

### Perfect Run System

**Complete level without any mistakes = special reward**

```
Level Feedback:
✅ All questions correct
✅ No hints used
✅ Time limit not exceeded

BONUS UNLOCKED: ⭐⭐⭐
Bonus stars: +2 stars

Achievement: "Perfect! 💯"
```

---

## 8. NARRATIVE STORY (Emotional Connection)

### Main Story Arc

**Prologue (Introduction):**
```
Profesor Pixel sedang tidur lelap di lab.
Tiba-tiba: "POOF!" Badai fisika melanda!
Semua pengetahuannya hilang!

"Oh tidak! Saya lupa segalanya!"

Profesor bertanya padamu:
"Bisa bantu saya mengingat fisika lagi?
Jika kamu bisa menyelesaikan 3 misi,
saya bisa kembali belajar fisika!"
```

**Episode Structure:**

**Episode 1-2 (Pengukuran Mode):**
```
Profesor: "Mulai dengan mengukur. Sebagai ahli fisika,
saya HARUS tahu cara mengukur dengan benar!"

Cerita: Setiap level, Profesor memberi petunjuk
sekaligus berbagi memori:

Level 1: "Ah! Aku ingat mistar pertamaku!"
Level 2: "Ya, jangka sorong sangat presisi!"
...
Level 6: "SEMUANYA KEMBALI! Terima kasih!"
```

**Episode 3-4 (Usaha & Energi Mode):**
```
Profesor: "Selanjutnya, energi adalah jantung fisika.
Bantu saya pahami bagaimana energi bekerja!"

Level 1: "Hmm, usaha = gaya × jarak, iya kan?"
Level 5: "Wow! Roller coaster! Aku ingin belajar ini dulu!"
Level 6: "Sempurna! Kamu mengajariku semuanya!"
```

**Episode 5-6 (Sumber Energi Mode):**
```
Profesor: "Terakhir, sumber energi. Ini penting untuk
masa depan bumi kita!"

Level 1-4: Profesor menceritakan sejarah energi di dunia
Level 5: "Bagaimana kita seimbang biaya dan lingkungan?"
Level 6: "Kota futuristik! Itu impianku!"

ENDING: "Kamu adalah ahli fisika sejati sekarang!"

Profesor memberikan gelar: "MASTER FISIKA 🏆"
```

### NPC Dialog Variety

**Profesor memberikan different dialog setiap kali:**
```
Kunjungan 1: "Coba lagi level ini."
Kunjungan 2: "Kamu bisa lakukan lebih baik!"
Kunjungan 3: "Saya percaya padamu, coba terus."
Kunjungan 4: "Sudah aku lihat progress kamu, mantap!"
Kunjungan 5: "Hmm, mungkin perlu hint dari saya?"
...
And 20+ variations based on performance
```

---

## 9. REWARD VARIETY (Loot System)

### Reward Tiers

**Tier 1: Easy Rewards (Every level)**
```
- Coins: +10-20 per level
- XP: +10-50 per level
- Stars: +1-3 per level
```

**Tier 2: Medium Rewards (Every 5 levels)**
```
- Badge: "Level 5 Champion"
- Medal: Perak
- Cosmetic: New character animation frame
```

**Tier 3: Rare Rewards (Every mode)**
```
- Skin: Unlock new character outfit
- Trophy: Physical trophy in lab
- Certificate: Sertifikat pixel
- Title: Special namecard color
```

**Tier 4: Legendary Rewards (Completionist)**
```
- Gelar Master Fisika
- Ending sequence (victory movie)
- Unlock secret area (bonus content)
```

### Currency System

**Coins:**
- Earned from levels
- Spendable in shop for hints or cosmetics
- Example: 50 coins = fast hint, 200 coins = skip level (not recommended)

**Stars:**
- Earned from level clear
- Used to unlock premium skins
- Track collection progress: "10 Stars → Unlock Astronot Suit"

**Badges:**
- Earned from achievements
- Display on leaderboard next to name
- Social status symbol

---

## 10. MICRO-ACHIEVEMENTS (Dopamine Hits)

### Achievement Pop-ups

**Trigger events that display achievement card:**

```
┌──────────────────────────┐
│ 🎖️ ACHIEVEMENT UNLOCKED  │
│                          │
│ "First Blood! 🔥"        │
│ Menyelesaikan Level 1   │
│                          │
│ +10 XP                  │
│ +1 Badge                │
│                          │
│ [Lanjut]                │
│                          │
└──────────────────────────┘
```

### Full Achievement List

```
TIER 1: STARTER
✓ First Blood!         - Complete level 1
✓ Getting Started      - Complete 5 levels
✓ On Fire!            - Complete 10 levels

TIER 2: GROWTH
✓ Precision Master    - Get 100% on measurement
✓ Energy Expert       - Get 95%+ on energy modes
✓ Speed Demon         - Complete level in <1 minute
✓ Perfect 10!         - Get 10 consecutive correct answers

TIER 3: MASTERY
✓ Pengukuran Master   - Complete measurement mode
✓ Energi Champion     - Complete energy mode
✓ Usaha Expert        - Complete work mode
✓ Tri-Master          - Complete all 3 modes
✓ Master Fisika       - Achieve all above
✓ Eco Warrior         - Get 0% pollution in mode 3
✓ Bookworm            - Read all 50 physics facts

TIER 4: EXTREME
✓ Collector           - Unlock all 20 skins
✓ Consistent!         - 30-day streak
✓ Hard Mode Hero      - Beat hard mode 5 times
✓ Speedrunner Pro     - Beat all levels <30 minutes
✓ Community Legend    - #1 in leaderboard for 1 week
```

---

# PART C: MOTIVATION SCENARIOS

## Scenario 1: Siswa Malas Belajar (Unmotivated Student)

**Initial State:**
- Student opens game reluctantly
- No interest in physics
- Low confidence

**Game-Induced Motivation:**

```
1. Character Selection
   → Picks cool character (astronot)
   → Feels sense of agency: "Aku pilih ini"
   
2. Level 1 Success
   → Problem is SUPER EASY
   → Gets first ⭐ immediately
   → "Wow, aku bisa!"
   
3. Reward Loop
   → Sees cool skin unlock at 20 stars
   → Astronot suit is awesome
   → "Aku mau unlock ini!"
   
4. Motivation Chain
   → Play level 1-5: Kumpul 15 bintang
   → Close to unlock skin: 5 bintang lagi
   → "Satu level lagi!"
   
5. Unknowing Learning
   → Completed 20 levels
   → Mastered 5 measurement concepts
   → Earned "Pengukuran Master" badge
   → Student didn't realize they "studied"
   
6. Habit Formation
   → Daily streak appears
   → Plays every day to not break streak
   → Eventually: "Saya suka game fisika"
```

**Success Metric:**
- Student completes Mode 1 on first attempt
- Reports: "Game ini fun, bukan boring"
- Teacher sees progress in physics understanding

---

## Scenario 2: Siswa Suka Tantangan (Challenge Seeker)

**Initial State:**
- Student likes games
- Wants to test skills
- Competitive personality

**Game-Induced Motivation:**

```
1. Character Selection
   → Picks engineer (builder personality)
   → Sees "HARD MODE" available
   
2. Challenge Appeal
   → Reads Level 5 description: "Buat roller coaster sendiri"
   → Thinks: "Bisa bikin lintasan? Wow!"
   → Skips level 1-4 to get to level 5
   
3. Creative Challenge
   → Build mode is sandbox-like
   → Unlimited tries
   → "Apa yang bisa saya buat?"
   → Tanpa sadar belajar energy conservation
   
4. Competitive Drive
   → Sees leaderboard
   → Friend ada di top 3
   → "Aku bisa kalahkan?"
   → Plays multiplayer battle
   
5. Mastery Push
   → Tries hard mode
   → Dies multiple times
   → Studies concepts to optimize approach
   → Eventually wins hard mode
   
6. Achievement Pride
   → Unlocks "Hard Mode Hero" badge
   → Share dengan teman
   → "Aku yang terbaik di kelas!"
```

**Success Metric:**
- Student tries hard mode before completing normal
- Completes all 18 levels within 1 week
- Reports to friends about difficulty levels
- Teacher observes deeper physics understanding in class discussions

---

## Scenario 3: Siswa Kompetitif (Competitive Gamer)

**Initial State:**
- Student plays mobile games regularly
- Likes leaderboards & rankings
- Social gamer

**Game-Induced Motivation:**

```
1. First Session
   → Sees LEADERBOARD immediately
   → Friend Budi is #1 with 2850 XP
   → Thinks: Aku bisa beat Budi!
   
2. XP Grind
   → Plays every level efficiently
   → Tracks XP gain: 10→50→100 XP per level
   → Calculates: "Need 750 XP to beat Budi"
   
3. Streak Challenge
   → Pagi: 200 XP
   → Siang: 200 XP
   → Malam: 200 XP
   → Daily = 600 XP
   → 2-3 hari naik 1800 XP
   
4. Social Competition
   → Checks leaderboard daily
   → Lihat posisi berubah from #4 → #2
   → Teman melihat progress, ikut main
   → Dinamika: "Siapa unggul minggu ini?"
   
5. Community Engagement
   → Join "Challenge Teman" feature
   → 1v1 battles dengan Budi
   → Mix tinggi kalah-menang
   → Belajar strategies dari losses
   
6. Status Symbol
   → Unlock "Community Legend" badge
   → Get gold namecard
   → Recognized di kelas as "Physics Game Pro"
```

**Success Metric:**
- Student plays daily without reminder
- Actively competes on leaderboard
- Shares screenshots with friends
- Improved physics test scores due to consistent learning

---

## Scenario 4: Siswa Kolektor (Collection Enthusiast)

**Initial State:**
- Student likes to collect things
- Enjoys unlocking/discovering
- Completionist personality

**Game-Induced Motivation:**

```
1. Skin Collection
   → Game ada 20 skins total
   → Student sees collection UI
   → "Ada 20? Semua mau!"
   
2. Unlock Progress
   → Each skin needs 15-20 stars
   → Progress tracker: 3/20 skins unlocked
   → Visible goal: "17 lagi"
   
3. Farming Gameplay
   → Re-plays levels to farm stars
   → Strategize: "Hard mode = 1.5× stars"
   → Sedang farm, tanpa sadar dapat XP level up
   
4. Rarity Appeal
   → Some skins "Legendary" (rare)
   → Requires 30-day streak
   → Or 100 perfect runs
   → Creates urgency: "Aku harus konsisten!"
   
5. Display Pride
   → Lab wall shows all unlocked skins
   → Can customize character outfit
   → Screenshot for Instagram: "Koleksi skinku! 🎨"
   
6. Completion Dopamine
   → Unlock all common skins (15/20)
   → Only 5 legendary left
   → "Tinggal dikit lagi!"
   → Massive dopamine saat unlock yang ke-20
```

**Success Metric:**
- Student plays consistently for 30+ days
- Claims all available achievements
- Demonstrates deep physics knowledge via memorization of facts
- Shares collection on social media

---

# PART D: SUMMARY

## CORE DESIGN PILLARS

| Pillar | Implementation | Motivation Hook |
|--------|-----------------|-----------------|
| **Easy Start** | Level 1 adalah super mudah | "Aku bisa!" (instant win) |
| **Continuous Reward** | Setiap level dapat bintang | Kumpul terus untuk unlock |
| **Clear Progression** | XP level, trophy case, gelar | Rasa berkembang |
| **Curiosity** | Physics facts, easter eggs | "Apa next..." |
| **Competition** | Leaderboard, multiplayer | "Aku yang terbaik" |
| **Variety** | 3 mode × 6 level × many approaches | Tidak bosan |
| **Relevance** | Real-world examples, home experiments | "Oh ini di rumahku!" |
| **Achievement** | Badges, titles, certificates | "Master Fisika!" |
| **Social** | Share, challenge friends, leaderboard | Status recognition |
| **Narrative** | Story with Profesor Pixel | Emotional investment |

---

## WHY THIS SYSTEM WORKS

### 1. **MUDAH MULAI**
- Level 1 sangat mudah → instant success
- Builds confidence: "Aku pasti bisa mode lainnya"

### 2. **ADA REWARD TERUS**
- Every level: coins, XP, stars, medal
- Brain gets dopamine every 2-3 minutes
- Reinforces habit: play = reward

### 3. **RASA PENCAPAIAN JELAS**
- Progression visual: Labs gets brighter
- Trophy case fills up
- Gelar Master Fisika = ultimate trophy
- Students can see the forest (not just trees)

### 4. **RASA PENASARAN TINGGI**
- 20 skins, only unlocked 3
- 50 physics facts, only read 15
- Secret level hinted but not found
- "Apa lagi yang ada?"

### 5. **RASA KOMPETISI SEHAT**
- Leaderboard public but fair
- Daily challenges allow catch-up
- Multiplayer battles are fun, not p2w
- Everyone can be #1 (just need consistency)

### 6. **TIDAK BOSAN**
- 3 modes dengan mekanik berbeda
- 18 levels dengan variety
- Daily challenges = konten baru
- Hard mode = replay value

### 7. **RELEVAN KE DUNIA NYATA**
- "Oh, saya pake ini saat beli kain!"
- "Ini yang terjadi saat dorong mobil mogok"
- Home experiment: "Coba di rumah!"
- Physics feels applicable, not abstract

### 8. **CERITA MEMBUAT TERASA PENTING**
- Bukan "solve 100 random problems"
- Melainkan "help Profesor Pixel remember physics"
- Emotional arc: lost → help → recovered → master
- Student is the hero

### 9. **MICRO-REWARDS ADDICTIVE**
- Next level pop-up: "Achievement!"
- Next star appears: visual ding!
- Next badge: "You unlocked..."
- Every 30 seconds: something rewarding happens

### 10. **HABIT LOOP STRONG**
```
Cue: See notification "Daily Challenge Available"
Action: Open game, play level
Reward: +50 XP, streak continues, leaderboard updates
Repetition: Next day, same loop

After 2 weeks: habit formed
Student WANTS to play, tidak "have to"
```

---

## FINAL MOTIVATION MATRIX

| Player Type | Key Hooks | Expected Behavior |
|------------|-----------|-------------------|
| Causal Learner | Easy progression, rewards, story | Play 3-4 levels/day, completes 1 mode/week |
| Challenge Seeker | Hard mode, boss levels, optimization | Skips early levels, master 1 mode deeply, tries speedrun |
| Competitive | Leaderboards, multiplayer, badges | Plays daily, daily challenge, competes with friends |
| Completionist | Collection, hidden content, 100% | Plays until all skins unlocked, all facts read, all achievements done |
| Social Player | Sharing, friend challenges, status | Screenshots often, competes with classmates, creates communities |
| Career Student | Real-world link, facts, certificates | Shares with teacher, uses certificates as portfolio, loves experiments |

---

## CONCLUSION

This Game Design System creates intrinsic motivation through **multiple concurrent reward mechanisms**, ensuring students keep playing while unknowingly mastering physics concepts. The combination of gameplay progression, social competition, narrative engagement, and clear achievement milestones transforms physics learning from burden into pleasure.

**Result:** Students don't ask "Do I have to play this?" They ask "When can I play next?" 🎮✨

