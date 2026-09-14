# Technical Requirements Document (TRD) & Tech Stack

## 💻 Tech Stack Specifications

| Layer | Technology / Library | Purpose & Rationale |
| :--- | :--- | :--- |
| **Core Framework** | React 18 (`react`, `react-dom`) | Declarative component UI rendering and reactive state hooks |
| **Build Tooling** | Vite (`vite`, `@vitejs/plugin-react`) | Fast HMR dev server and optimized production bundling |
| **Styling & CSS** | Vanilla SCSS / Sass (`sass`) | Maximum styling flexibility, custom properties, and glassmorphic rules |
| **Icons & Font Sets** | RemixIcon (`remixicon`) | Vector iconography for macOS top bar, dock, and contact cards |
| **Deployment Platform**| Vercel | Global CDN deployment, instant Git continuous integration |

---

## ⚡ Technical Requirements & Specifications

### 1. State & Data Flow Architecture
- **Terminal History State**: Managed via React `useState` array (`lines`). Each line is a typed object (`help-table`, `about-card`, `bio-card`, `exp-card`, `skill-group`, `contact-grid`, `socials-grid`, `quote-card`, `project`, `error-msg`).
- **Terminal Execution Map**: Command dispatch registry mapping `/command` keys to execution logic.
- **Window Stacking (`zIndex`)**: Controlled by parent `Desktop.jsx` component. Clicking any window updates its `zIndex` to `topZ + 1`.

### 2. Notification Rate Limiting Algorithms
- Notification requests are dispatched via `window.notify({ title, message, key, cooldownMs })`.
- `NotificationCenter.jsx` uses a `lastShownRef` map storing timestamps (`Date.now()`).
- Suppresses notification execution if `now - lastTime < cooldownMs` (default `4000ms`).

### 3. Local Storage Persistence Schema
```json
{
  "ui-settings": {
    "focusMode": false,
    "sound": true,
    "soundLevel": 100,
    "autoCloseAfterUnlock": false,
    "brightness": 100
  },
  "ui-wallpaper": "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1920",
  "ui-wallpaper-queue": ["...shuffled wallpaper URLs..."]
}
```

---

## ⚙️ Build, Lint & Execution Commands

### Development Server:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
```

### Preview Production Build Locally:
```bash
npm run preview
```

---

## 🔒 Security & Performance Guidelines
1. **Target Blank External Links**: All external profile links (`GitHub`, `LinkedIn`, `X`, `Instagram`, project repositories) include `target="_blank"` and `rel="noopener noreferrer"` to prevent window object manipulation.
2. **Sanitized Inputs**: Terminal input trims whitespace and safely highlights numbers via string regex replace without arbitrary code execution risk.
3. **No Third-Party Bloat**: Built cleanly without heavyweight UI component libraries, maintaining low memory consumption and fast frame rates during dock magnification animations.
