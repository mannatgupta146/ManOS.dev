# 🖥️ ManOS.dev

**ManOS.dev** is a macOS-inspired interactive portfolio built with React.  
It blends UI, motion, and interactivity to showcase my profile in a unique, OS-like experience.

Instead of a traditional portfolio, ManOS presents content through draggable windows, a real CLI interface, and system-style navigation — inspired by macOS.

---

## ✨ Features

- 🧭 **macOS-style Navigation Bar**
  - Left system menu (Apple-style)
  - Right system indicators (time, visits, status)

- 🪟 **Draggable macOS Windows**
  - Resizable and movable windows using `react-rnd`
  - Authentic traffic-light buttons (red, yellow, green)

- 💻 **Interactive CLI (Terminal)**
  - Fully custom-built (no external terminal libraries)
  - Real command parsing and validation
  - Color-coded output for better readability
  - Smooth auto-scroll behavior
  - Supports multiple commands (see below)

- 🎬 **GitHub Story Window**
  - On-demand video playback (loads only when clicked)
  - Optimized to avoid blocking page load

- 🎨 **Carefully Designed UI**
  - Custom color system
  - Highlighted numbers, commands, labels, and headings
  - Focus on readability and minimalism

---

## 💻 CLI Commands

Type commands inside the terminal window:

```

/help
/about
/description
/education
/interests
/motivation
/experience
/skills
/projects
/socials
/contact
/open github
/open linkedin
/open instagram
/open x
/clear

```

### Behavior
- ✅ Valid commands → green
- ❌ Invalid commands → red
- Titles → yellow
- Important values (numbers, CGPA, percentages) → highlighted
- `/clear` resets the terminal without removing boot messages

---

## 🧠 About Me (via CLI)

The CLI reveals:
- Personal details
- Education history
- Skills & tech stack
- Projects with tech stacks
- Internship experience
- Motivation & mindset
- Social and contact information

All structured with labels, spacing, and color hierarchy for clarity.

---

## 🛠️ Tech Stack

### Frontend
- React
- SCSS
- JavaScript

### UI / Interaction
- `react-rnd` (draggable & resizable windows)
- Custom terminal logic (no terminal libraries)

### Tools
- VS Code
- GitHub
- Vite

---

## 🚀 Performance & UX Decisions

- Videos are **lazy-loaded** (play only on user interaction)
- No heavy third-party UI libraries
- Smooth scrolling handled via JS (not CSS hacks)
- Clean separation of components:
  - `Nav`
  - `MacWindow`
  - `Cli`
  - `Github`

---

## 📂 Project Structure (Simplified)

```

src/
│── components/
│   ├── Nav.jsx
│   ├── MacWindow.jsx
│   ├── Cli.jsx
│   ├── Github.jsx
│
│── styles/
│   ├── Nav.scss
│   ├── MacWindow.scss
│   ├── Cli.scss
│
│── assets/
│   ├── github.mp4
│
│── App.jsx
│── main.jsx

```

---

## 🔗 Links

- 🌐 **Portfolio**: ManOS.dev  
- 🧑‍💻 **GitHub**: https://github.com/mannatgupta146  
- 💼 **LinkedIn**: https://linkedin.com/in/mannatgupta146  
- 📸 **Instagram**: https://instagram.com/mannat_1411  
- 🐦 **X (Twitter)**: https://x.com/MannatGupta146  

---

## 📬 Contact

- 📧 Email: **mannatgupta146@gmail.com**
- 📱 Phone: **+91 9541343039**

---

## 🧩 Philosophy

> *“Better than yesterday, even by 0.00001%.  
Every effort matters.”*

---

⭐ If you like this concept, feel free to explore the code or reach out.