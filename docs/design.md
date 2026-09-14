# UI/UX & Design System Documentation (`design.md`)

This document outlines the visual aesthetics, design tokens, typography, glassmorphism principles, micro-interactions, and component styling rules for **ManOS.dev**.

---

## 🎨 Design Philosophy & Aesthetic Principles

ManOS.dev replicates the ultra-premium aesthetic of macOS Sequoia & Tahoe dark mode combined with modern web glassmorphism.

### 🌟 Core Design Principles:
1. **Rich Glassmorphism & Depth**: Multi-layered semi-transparent surfaces with backdrop blurring, subtle outer glows, and clean hairline borders (`1px solid rgba(255, 255, 255, 0.08)`).
2. **Harmonious Dark Palette**: Eliminates harsh pure blacks (`#000000`) and high-contrast neons in favor of deep slate tones (`rgba(40, 40, 42, 0.7)`), soft off-whites (`#f8fafc`), and muted accent colors (`#38bdf8`, `#a855f7`, `#34d399`, `#eab308`).
3. **Subtle Micro-Animations**: Smooth hover elevations, button scaling, dock magnification, and menu transitions using cubic-bezier timing curves.
4. **Clean Information Hierarchy**: High contrast headers, muted metadata labels (`#94a3b8`), and distinct colored side-accent stripes (`border-left: 3.5px solid <accent>`) on content cards.

---

## 🎨 Color Palette & Design Tokens

### Dark Mode Base Colors:
| Token Name | Hex / RGBA Value | Usage Area |
| :--- | :--- | :--- |
| **Desktop / Main BG** | `#0f172a` / Wallpaper | Main desktop background layer |
| **Window Background** | `rgba(20, 20, 22, 0.85)` | Terminal & window application shells |
| **Glass Card Background** | `rgba(255, 255, 255, 0.03)` | Inner content cards, skill groups & project items |
| **Dock Background** | `rgba(40, 40, 42, 0.7)` | Floating bottom dock container |
| **Hairline Border** | `rgba(255, 255, 255, 0.08)` | Outer borders for cards, modals & windows |
| **Section Divider** | `1.5px linear-gradient (6px dash, 4px gap)` | Separator lines between terminal command history |

### Typography Colors:
| Token Name | Hex Value | Usage Area |
| :--- | :--- | :--- |
| **Primary Text** | `#f8fafc` | Main headings, card titles & primary values |
| **Secondary Text** | `#cbd5e1` | Descriptions, bio prose & body text |
| **Muted Text / Labels** | `#94a3b8` / `#64748b` | Subtitles, duration badges & key labels |
| **Terminal Command** | `#10b981` | Clickable green terminal commands |
| **Mistyped Command** | `#f59e0b` | Underlined amber text for invalid input |

### Section Accent Stripes (`border-left`):
- **Cyan (`#38bdf8`)**: `/about` overview, primary project cards & email contact.
- **Purple (`#a855f7`)**: `/description` engineering story & Web3 projects.
- **Emerald (`#34d399`)**: `/education` degree cards & phone contact.
- **Gold/Amber (`#eab308`)**: `/motivation` quote card & secondary education cards.
- **Pink (`#ec4899`)**: High secondary education cards & creative interests.

---

## 🔤 Typography & Font Hierarchy

- **Primary Font Stack**: SF Pro Display, system-ui, -apple-system, BlinkMacSystemFont, "Inter", sans-serif.
- **Monospace Font Stack (Terminal & Code)**: "SF Mono", "Fira Code", Menlo, Monaco, Consolas, monospace.

### Font Sizes & Weights:
- **Navbar Status Items**: `13px` (Medium 500)
- **Window Title**: `13px` (Semi-bold 600)
- **Card Titles & Headers**: `0.92rem` - `0.95rem` (Bold 700)
- **Body & Description Text**: `0.84rem` - `0.86rem` (Regular 400 / Medium 500, line-height `1.55`)
- **Pills & Badges**: `0.74rem` - `0.78rem` (Semi-bold 600)

---

## ✨ Component UI/UX Specifications

### 1. Terminal Window (`Cli.jsx` & `Cli.scss`)
- **Container**: Translucent dark glass with custom scrollbar styling.
- **Help Table**: 2-column grid (`COMMAND` & `DESCRIPTION`) with row hover background (`rgba(255, 255, 255, 0.04)`).
- **Cards**: All content cards (`about-card`, `bio-card`, `exp-card`, `project-card`, `quote-card`) feature rounded corners (`8px`), 3.5px left accent stripes, and subtle box shadows (`0 4px 12px rgba(0, 0, 0, 0.25)`).

### 2. macOS Floating Dock (`Dock.jsx` & `Dock.scss`)
- **Positioning**: Fixed bottom center (`bottom: 1rem`).
- **Spacing**: Inter-icon gap `1.15rem`, inline padding `1rem`.
- **Hover Magnification**: Scale `1.27` with `-22%` vertical translation and elevation shadow (`box-shadow: 0 12px 25px rgba(0, 0, 0, 0.45)`). Neighboring icons scale to `1.12`.

### 3. Navigation Bar (`Nav.jsx`, `NavLeft.scss`, `NavRight.scss`)
- **Height**: Fixed top bar (`30px`), semi-transparent backdrop blur (`16px`).
- **Text & Menus**: White text (`#f5f5f7`), dropdown menus with glassmorphic background (`rgba(30, 30, 32, 0.95)`).

### 4. Toast Notification Center (`NotificationCenter.jsx`)
- **Position**: Top right overlay (`top: 3.5rem`, `right: 1.2rem`).
- **Animation**: Slide-in right animation (`300ms cubic-bezier(0.16, 1, 0.3, 1)`).
- **Rate-Limiting**: 4-second cooldown throttle preventing toast spam on rapid user interactions.
