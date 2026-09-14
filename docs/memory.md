# Changelog & Memory of Recent Updates

This document maintains a persistent operational memory of feature updates, UI/UX polish, structural changes, and bug fixes applied to **ManOS.dev**.

---

## 📅 Recent Session Updates (September 2026)

### 1. Terminal CLI (`Cli.jsx` & `Cli.scss`)
- **Interactive Contact Cards (`/contact`)**:
  - Transformed plain text output into interactive glassmorphic cards for **Email** (`mailto:`), **Phone** (`tel:`), and **Location** (`Jammu & Kashmir, India - Available Remote`).
  - Added micro-interactions with smooth hover elevation and arrow (`↗`) shifting.
- **Dynamic Help Command (`/help`)**:
  - Auto-renders the full **Command Directory Table** on boot (`SYSTEM_LINES`).
  - Redesigned output into a structured 2-column table (`COMMAND` & `DESCRIPTION`) with row hover states.
  - Made every command tag (`/about`, `/experience`, `/skills`, `/projects`, `/socials`, `/contact`, `/open ...`) directly **clickable** with instant execution.
  - Added user-friendly invalid command handling (`zsh: command not found: <cmd>. Try /help`) with a bold amber highlighted target symbol (`.cmd-bad`).
- **Section & Layout Polish**:
  - **/about**: Formatted into an **About Profile Card** with a cyan accent border (`#38bdf8`) and aligned two-column label-value grid (`Name`, `Role`, `Education`, `Location`, `Status`).
  - **/description**: Created an **Engineering Bio & Focus Card** with a purple accent border (`#a855f7`), opening statement, core engineering pillars box (`AI & Cognitive Tools`, `Full Stack Development`, `Web3 Protocols`), and domain badges.
  - **/education**: Transformed into chronological academic timeline cards (`Chandigarh University, Mohali, Punjab` & `Brahmrishi Bawra Shanti Vidya Peeth, Udhampur`).
  - **/interests**: Upgraded to 4 themed glassmorphic cards (`Gaming & Sports`, `Tech & Innovation`, `Creative & Arts`, `Lifestyle & Exploration`).
  - **/motivation**: Redesigned quote card with a gold quote mark (`“`) and italicized mindset text. Removed `"Growth Mindset 🎯"` tag as requested.
  - **/projects**: Refined project cards for `MindGraph`, `Buildex`, and `OutReach-AI` to use soft sky blue project names and emerald/slate stack highlights.
  - **Section Dividers (`.line-divider`)**: Configured repeating linear-gradient dashed lines (`6px` dash, `4px` gap, `rgba(255, 255, 255, 0.55)`) with balanced `1.5rem 1.2rem` margins for clear visual structure without clutter.
  - **Terminal Scroll Flow**: Kept natural terminal scroll-to-bottom behavior on command execution while scrolling to top on initial boot.

### 2. Dock & Desktop Layout (`Dock.scss`, `Desktop.jsx`, `MacWindow.jsx`, `App.scss`)
- **Dock Auto-Hide on Full Screen**:
  - Integrated `app-maximized` body class toggle in `MacWindow.jsx`.
  - Added smooth CSS transition in `Dock.scss` (`transform: translate(-50%, 140%) !important`) so the Dock automatically slides down and hides when any app window is maximized/full-screen.
- **Dock Icon Spacing**:
  - Expanded icon gaps in `.dock` (`Dock.scss`) to `1.15rem` for better touch targets and spacing.
- **Default Background Wallpaper**:
  - Restored clean CSS background rule `background: url("/bg.png") center/cover no-repeat;` in `App.scss`.
  - Updated `Desktop.jsx` `useEffect` hook to apply `/bg.png` by default on startup if no custom wallpaper exists in local storage.
- **Navbar & Icon Size Standardization**:
  - Adjusted Navbar font size to `13px` (`NavLeft.scss`, `NavRight.scss`, `Nav.scss`).
  - Standardized Dock icon sizes across desktop and mobile.
- **Notification Toast Rate-Limiting (`NotificationCenter.jsx`)**:
  - Added a **4-second cooldown throttle** map (`lastShownRef`) per action key/title.
  - Suppressed intrusive single-window close and app-open toast popups for a cleaner macOS feel.

---

## 🏷️ System Verification
- Production builds verified with zero syntax, SCSS, or bundling errors (`npm run build`).
- Live dev server active and responsive on `http://localhost:5173`.
