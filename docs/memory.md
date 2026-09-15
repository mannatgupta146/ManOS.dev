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
- **macOS System Settings Fixed Centered Window**:
  - Configured System Settings to open as a fixed, centered macOS window (`760px × 520px`).
  - Disabled window full-screen maximizing (`allowMaximize={false}`) to maintain optimal proportions and prevent full-screen distortion.
  - Added minimum window bounds (`minWidth={700}`, `minHeight={480}`) in [`Settings.jsx`](file:///Users/mannatgupta146/Desktop/PROJECTS/ManOS.dev/src/components/windows/Settings.jsx) to preserve UI elements and two-pane alignment.
  - Added support in [`MacWindow.jsx`](file:///Users/mannatgupta146/Desktop/PROJECTS/ManOS.dev/src/components/windows/MacWindow.jsx) for custom `minWidth`, `minHeight`, `zIndex`, and `onFocus` props alongside `initialWidth`, `initialHeight`, `initialX`, `initialY`.
- **macOS System Settings App Icon & Tooltip Label**:
  - Replaced flat vector with authentic 3D metallic gear app icon matching macOS Sequoia & Tahoe in [`public/icons/settings.svg`](file:///Users/mannatgupta146/Desktop/PROJECTS/ManOS.dev/public/icons/settings.svg) (featuring rounded squircle container, aluminum metallic gradient background, 24 serrated gear teeth, dark inner recessed pit, and 3-spoke driver hub).
  - Updated Dock icon label in [`Dock.jsx`](file:///Users/mannatgupta146/Desktop/PROJECTS/ManOS.dev/src/components/Dock.jsx) from `"Settings"` to `"System Settings"`.
  - Replaced legacy orange hero badge in [`Settings.jsx`](file:///Users/mannatgupta146/Desktop/PROJECTS/ManOS.dev/src/components/windows/Settings.jsx) (About ManOS tab) with the metallic 3D gear SVG app icon (`/icons/settings.svg`).
- **Dock Active App Indicator Pill**:
  - Reduced indicator line width to `35%` (`left: 32.5%`), added bottom margin to app icons (`margin-bottom: calc(0.25rem * var(--dock-size, 1))`), and expanded Dock container bottom padding (`padding-bottom: calc(0.75rem * var(--dock-size, 1))`) in [`Dock.scss`](file:///Users/mannatgupta146/Desktop/PROJECTS/ManOS.dev/src/components/Dock.scss). This maintains a clear gap below the app icons while keeping the indicator pill safely inside the glass Dock container bounds.
- **Dock Icon Spacing & Customizable Dock Size**:
  - Added a **Dock Size slider control** in Workspace Settings (`Settings.jsx`), allowing users to dynamically scale the Dock height, icon sizes, and inter-icon gaps from **Compact (70%)** to **Large (140%)**.
  - Dynamic sizing powered by `--dock-size` CSS custom property in `Dock.scss`.
  - Persisted user preference in `ui-settings` local storage schema.
  - Updated [`MacWindow.jsx`](file:///Users/mannatgupta146/Desktop/PROJECTS/ManOS.dev/src/components/windows/MacWindow.jsx) maximized height calculations to deduct `DOCK_HEIGHT`, ensuring full-screen / maximized app windows terminate cleanly above the floating Dock.
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
