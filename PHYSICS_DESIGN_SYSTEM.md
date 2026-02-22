# 🌌 Physics-Themed UI Design System Guide

## 🎨 Design Overview

A stunning dark blue gradient background with animated physics-themed visual elements, glass morphism cards, and neon accents. Modern 4K-quality design suitable for an educational platform.

---

## 🎭 Color Palette

### Primary Colors
| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| **Deep Navy** | #0A0F1E | 10, 15, 30 | Background base |
| **Dark Blue** | #0F1B35 | 15, 27, 53 | Gradient layer |
| **Navy Blue** | #1A2A4A | 26, 42, 74 | Gradient layer |
| **Ocean Blue** | #0F3A5F | 15, 58, 95 | Gradient layer |

### Accent Colors
| Color Name | Hex | Usage |
|------------|-----|-------|
| **Electric Cyan** | #00D9FF | Primary accent, headings, active states |
| **Neon Purple** | #7209B7 | Forum, secondary accents |
| **Lime Green** | #06D6A0 | Success, approved, on-time |
| **Warm Orange** | #F39C12 | Warnings, system alerts |
| **Hot Magenta** | #F72585 | Errors, late submissions |
| **Gold** | #FFD166 | Grades, achievements |
| **Royal Blue** | #2563EB | Buttons, CTAs |

### Text Colors
| Color Name | Hex | Usage | Opacity |
|------------|-----|-------|---------|
| **Light Text** | #E8F4F8 | Primary text | 100% |
| **Dim Text** | #E8F4F8 | Secondary text | 80% |
| **Muted Text** | #E8F4F8 | Tertiary text | 60% |
| **Extra Muted** | #E8F4F8 | Hint text | 40% |

---

## 🌊 Background Design

### Main Gradient
```css
background: linear-gradient(135deg, 
  #0a0f1e 0%, 
  #0f1b35 25%, 
  #1a2a4a 50%, 
  #0f3a5f 75%, 
  #0a0f1e 100%);
```

**Properties:**
- Angle: 135° (diagonal from top-left to bottom-right)
- Smooth color transitions through dark blue spectrum
- Creates depth and dimensionality
- Animated layers with parallax effect

### Physics Animated Elements

#### 1. Atomic Structures
```
┌─────────────┐
│   ◯ ◯ ◯    │  Floating atoms with
│  ◯     ◯   │  electron orbits
│   ◯ ◯ ◯    │  
└─────────────┘
```
- **Animation**: Rotate 360° in 8 seconds
- **Opacity**: Pulsing 0.3 to 0.6
- **Glow**: `box-shadow: 0 0 20px rgba(0, 217, 255, 0.4)`
- **Count**: 4 atoms distributed across screen

#### 2. Electron Orbits
```
      ● → 
    ●     ●
      ● ← 
    Electron orbiting nucleus
```
- **Animation**: Circular orbit in 6 seconds
- **Blur**: `filter: blur(1px)`
- **Opacity**: 0.5
- **Count**: 3 orbital paths

#### 3. Wave Patterns
```
～ ～ ～ ～ ～
Main frequency wave motion
```
- **Animation**: Float upward while oscillating
- **Duration**: 4 seconds loop
- **Color**: Cyan gradient fade
- **Count**: 2-3 waves offset

#### 4. Light Particles (Dust)
```
   · ·  ·
 ·    ·    ·   Random floating dust
·  ·  ·  · ·
```
- **Animation**: Random drift and fade
- **Duration**: 3-5 seconds
- **Opacity**: 0.2 to 0.5
- **Count**: 12-15 particles
- **Speed**: Slow, gentle movement

#### 5. Quantum Effects
```
✦ ✦ ✦
  ✦ ✦  Burst animation
✦ ✦ ✦
```
- **Animation**: Expand outward then fade
- **Duration**: 2 seconds
- **Frequency**: Every 3-4 seconds
- **Opacity**: High (0.6) to low (0)

#### 6. Gravity Ripples
```
  ◯
 ◯ ◯
◯   ◯   Concentric circles expanding
 ◯ ◯
  ◯
```
- **Animation**: Expand radially from center
- **Duration**: 3 seconds
- **Opacity**: 0.6 → 0
- **Count**: 2 ripples offset by 1.5s

### Parallax Effect
Multiple layers of particles move at different speeds:
- **Layer 1** (atoms): 1x speed - base movement
- **Layer 2** (electrons): 0.8x speed - slower
- **Layer 3** (dust): 0.6x speed - slowest
- Creates **depth perception** and immersion

---

## 🏠 Glass Morphism Design

### Card Base Style
```css
.card {
  background: rgba(232, 244, 248, 0.05);
  border: 1px solid rgba(0, 217, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px 0 rgba(0, 217, 255, 0.1);
  padding: 1.25rem;
  transition: all 0.3s ease;
}
```

**Attributes:**
- **Transparency**: 5% opaque (95% transparent)
- **Blur**: 10px backdrop blur for frosted glass effect
- **Border**: Thin cyan line (15% opacity)
- **Shadow**: Soft glow (10% opacity)
- **Radius**: 16px for soft corners

### Card Hover State
```css
.card:hover {
  background: rgba(232, 244, 248, 0.08);
  box-shadow: 0 12px 40px 0 rgba(0, 217, 255, 0.2);
  transform: translateY(-4px);
}
```

**Changes:**
- Transparency increase: 5% → 8%
- Shadow 2x brighter (20% opacity)
- Lifts up 4px for depth
- Smooth 0.3s transition

### Card Variants

#### Primary Card (Featured/Highlighted)
```css
border-color: rgba(0, 217, 255, 0.3);  /* Brighter border */
box-shadow: 0 8px 32px rgba(0, 217, 255, 0.15);
```

#### Success Card (Completed Tasks)
```css
border-left: 4px solid #06d6a0;
background: rgba(6, 214, 160, 0.05);
```

#### Alert Card (Late Submissions)
```css
border-left: 4px solid #f72585;
background: rgba(247, 37, 133, 0.05);
```

#### Info Card (Announcements)
```css
border-left: 4px solid #f39c12;
background: rgba(243, 156, 18, 0.05);
```

---

## 🎯 Typography

### Font Family
```css
font-family: 'Poppins', 'Montserrat', sans-serif;
```

### Text Styles

#### Heading 1 (Main Title)
- **Size**: 2.5rem (40px)
- **Weight**: 800 (Bold)
- **Color**: #00D9FF
- **Shadow**: `0 0 15px rgba(0, 217, 255, 0.3)`
- **Line-height**: 1.2

#### Heading 2 (Section Title)
- **Size**: 1.75rem (28px)
- **Weight**: 700 (Bold)
- **Color**: #00D9FF
- **Shadow**: `0 0 10px rgba(0, 217, 255, 0.2)`

#### Heading 3 (Card Title)
- **Size**: 1.25rem (20px)
- **Weight**: 700
- **Color**: #00D9FF

#### Body Text
- **Size**: 1rem (16px)
- **Weight**: 400 (Regular)
- **Color**: rgba(232, 244, 248, 0.8)
- **Line-height**: 1.6

#### Small Text (Timestamps, Labels)
- **Size**: 0.85rem (13px)
- **Weight**: 500 (Medium)
- **Color**: rgba(232, 244, 248, 0.6)
- **Letter-spacing**: 0.5px

---

## 🔘 Button Styles

### Primary Button
```css
background: linear-gradient(135deg, #2563eb 0%, #00d9ff 100%);
color: #0A0F1E;
padding: 0.75rem 1.5rem;
border: none;
border-radius: 8px;
font-weight: 600;
box-shadow: 0 8px 20px rgba(0, 217, 255, 0.3);
cursor: pointer;
transition: all 0.3s ease;
```

### Button Hover
```css
transform: translateY(-3px);
box-shadow: 0 12px 32px rgba(0, 217, 255, 0.4);
```

### Secondary Button
```css
background: rgba(0, 217, 255, 0.1);
border: 1px solid rgba(0, 217, 255, 0.3);
color: #00D9FF;
```

### Floating Action Button (FAB)
```css
width: 56px;
height: 56px;
border-radius: 50%;
background: linear-gradient(135deg, #2563eb 0%, #00d9ff 100%);
box-shadow: 0 8px 24px rgba(0, 217, 255, 0.4);
color: #0A0F1E;
font-size: 28px;
position: fixed;
right: 18px;
bottom: 18px;
z-index: 100;
```

**Hover:**
- Scale 1.1 (10% larger)
- Shadow 2x brighter
- Smooth 0.3s transition

**Active:**
- Scale 0.95 (5% smaller)

---

## 📋 Input Fields

### Text Input / Textarea
```css
background: rgba(232, 244, 248, 0.05);
border: 1px solid rgba(0, 217, 255, 0.2);
border-radius: 8px;
color: #E8F4F8;
padding: 0.6rem;
font-family: 'Poppins', sans-serif;
transition: all 0.3s ease;
```

### On Focus
```css
border-color: rgba(0, 217, 255, 0.4);
box-shadow: 0 0 15px rgba(0, 217, 255, 0.2);
background: rgba(232, 244, 248, 0.08);
outline: none;
```

### Placeholder Text
```css
color: rgba(232, 244, 248, 0.5);
```

---

## 🎬 Animations

### Float Animation
```css
@keyframes float1 {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float2 {
  0%, 100% { transform: translateY(-20px); }
  50% { transform: translateY(0px); }
}

animation: float1 6s ease-in-out infinite;
```

### Electron Orbit
```css
@keyframes electronOrbit {
  0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
  100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
}

animation: electronOrbit 6s linear infinite;
```

### Pulse/Glow
```css
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

animation: pulse 2s ease-in-out infinite;
```

### Wave Float
```css
@keyframes waveFloat {
  0% { transform: translateY(100vh) translateX(0); opacity: 0; }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% { transform: translateY(-100vh) translateX(40px); opacity: 0; }
}

animation: waveFloat 4s ease-in infinite;
```

### Quantum Burst
```css
@keyframes quantumBurst {
  0% { 
    transform: scale(0);
    opacity: 0.8;
  }
  100% { 
    transform: scale(3);
    opacity: 0;
  }
}

animation: quantumBurst 2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
```

---

## 📱 Responsive Design

### Breakpoints
```css
/* Desktop */
@media (min-width: 1024px) {
  .card { padding: 1.5rem; }
}

/* Tablet */
@media (max-width: 1024px) and (min-width: 640px) {
  .card { padding: 1.25rem; }
}

/* Mobile */
@media (max-width: 640px) {
  .card { padding: 1rem; }
  
  /* Hide some animations on mobile for performance */
  .particle { display: none; }
  
  .floating-plus {
    width: 48px;
    height: 48px;
    bottom: 70px;
  }
}
```

### Touch-Friendly Design
- Minimum tap target: 44×44px
- Buttons scale on active: `transform: scale(0.95)`
- Smooth transitions for touch feedback

---

## 🌙 Dark Mode

The entire design is optimized for dark mode with:

- **High contrast text** (light cyan on dark blue)
- **Reduced eye strain** with warm tones
- **WCAG AAA compliance** for text legibility
- **No white backgrounds** (only dark blues and semi-transparent overlays)

---

## ♿ Accessibility

### Text Contrast
- **Large text** (18pt+): 4.5:1 minimum contrast
- **Normal text**: 7:1 (WCAG AAA)
- Current color scheme exceeds standards

### Focus States
```css
button:focus {
  outline: 2px solid #00D9FF;
  outline-offset: 2px;
}
```

### Keyboard Navigation
- Tab order follows logical flow
- All interactive elements accessible via keyboard
- Visual focus indicators clear and visible

### Screen Reader Support
- Semantic HTML5 elements
- ARIA labels where needed
- Alt text for all images/icons

---

## 🖼️ Component Gallery

### Notification Card
```
┌─────────────────────────────────────┐
│ 📝 Tugas Baru - Fisika              │
│ Pak Sarno memberikan: "Soal Hukum"  │
│ Deadline: 22 Februari 2026           │
│                                       │
│ Hari ini, 14:30  [●] [🗑️]          │
│ [→ Lihat Tugas]                      │
└─────────────────────────────────────┘
```

### Assignment Card
```
┌─────────────────────────────────────┐
│ 📚 Soal Hukum Newton           [⋯]  │
│ Deskripsi tugas...                  │
│ Deadline: 22 Feb 2026               │
│ Submitted by: Budi (Tepat waktu)    │
│                                       │
│ [🔴] Selesaikan tugas               │
└─────────────────────────────────────┘
```

### Modal Dialog
```
╔═════════════════════════════════════╗
║ [×] Buat Tugas Baru                 ║
║                                      ║
║ Judul                               ║
║ [_______________________]            ║
║                                      ║
║ Deskripsi                           ║
║ [_______________________]            ║
║ [_______________________]            ║
║                                      ║
║ Deadline                            ║
║ [__ / __ / ____]                    ║
║                                      ║
║ File Lampiran (opsional)            ║
║ [Choose File] book-chapter.pdf      ║
║                                      ║
║             [Batal] [Kirim]         ║
╚═════════════════════════════════════╝
```

---

## 🎬 Visual Effects Reference

### Glow Text
```css
color: #00D9FF;
text-shadow: 
  0 0 5px rgba(0, 217, 255, 0.2),
  0 0 10px rgba(0, 217, 255, 0.1),
  0 0 15px rgba(0, 217, 255, 0.05);
```

### Soft Shadow
```css
box-shadow: 0 8px 32px 0 rgba(0, 217, 255, 0.1);
```

### Strong Glow
```css
box-shadow: 0 0 20px rgba(0, 217, 255, 0.4);
```

### Transition Smooth
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 📊 Responsive Grid

### Desktop Layout (1024px+)
```
┌──────────────────────────────────────┐
│          HEADER (Nav + Bell)         │
├──────┬────────────────────────────────┤
│      │                                │
│ Side │      Main Content (Col 2-4)   │
│ bar  │      ┌─────────────────────┐  │
│      │      │ Card 1              │  │
│      │      └─────────────────────┘  │
│      │      ┌─────────────────────┐  │
│      │      │ Card 2              │  │
│      │      └─────────────────────┘  │
│      │      ┌─────────────────────┐  │
│      │      │ Card 3              │  │
│      │      └─────────────────────┘  │
├──────┴────────────────────────────────┤
│        FOOTER (Nav Bar)               │
└──────────────────────────────────────┘
```

### Tablet Layout (640-1024px)
```
┌─────────────────────────────┐
│   HEADER (Mobile)           │
├─────────────────────────────┤
│ Content (full width)        │
│ ┌─────────────────────────┐ │
│ │ Card 1                  │ │
│ └─────────────────────────┘ │
│ ┌─────────────────────────┐ │
│ │ Card 2                  │ │
│ └─────────────────────────┘ │
├─────────────────────────────┤
│    BOTTOM NAV (Mobile)      │
└─────────────────────────────┘
```

### Mobile Layout (<640px)
```
┌────────────────┐
│ HEADER (Nav)   │
├────────────────┤
│ Content        │
│ ┌────────────┐ │
│ │ Card       │ │
│ └────────────┘ │
│ ┌────────────┐ │
│ │ Card       │ │
│ └────────────┘ │
├────────────────┤
│  BOTTOM NAV    │
└────────────────┘
```

---

## 🚀 Performance Optimization

### For 4K Displays
- Use `backdrop-filter: blur(10px)` sparingly
- Limit particle count on mobile
- Use CSS animations instead of JavaScript
- Optimize SVG and image sizes

### GPU Acceleration
```css
.particle {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### Animation Performance
- Use `requestAnimationFrame` for smooth 60fps
- Limit simultaneous animations
- Disable on mobile with low battery
- Use CSS transforms over position changes

---

## 📚 Design System Export

All CSS variables are defined in `physics-background.css`:

```css
:root {
  --primary-blue: #2563eb;
  --primary-cyan: #00d9ff;
  --accent-green: #06d6a0;
  --accent-purple: #7209b7;
  --accent-orange: #f39c12;
  --accent-magenta: #f72585;
  --accent-gold: #ffd166;
  
  --bg-dark: #0a0f1e;
  --bg-darker: #0f1b35;
  --text-light: #e8f4f8;
  --text-muted: rgba(232, 244, 248, 0.6);
  
  --radius-lg: 16px;
  --radius-md: 12px;
  --radius-sm: 8px;
  
  --shadow-glow: 0 8px 32px rgba(0, 217, 255, 0.1);
  --shadow-strong: 0 12px 40px rgba(0, 217, 255, 0.2);
}
```

---

## 🎓 Brand Voice

The design communicates:
- **Modern**: Latest tech aesthetics with physics theme
- **Educational**: Clear hierarchy, readable typography
- **Trustworthy**: Professional dark mode with scientific undertones
- **Engaging**: Animated elements that don't distract from content
- **Inclusive**: High contrast, accessible colors, responsive design

---

