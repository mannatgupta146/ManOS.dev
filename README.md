# ManOS.dev

ManOS.dev is a macOS-inspired interactive portfolio built with React and Vite. Instead of presenting information as a conventional single-page portfolio, it turns the portfolio into a small desktop environment with windows, system actions, search, notifications, built-in apps, and touch-friendly mobile behavior.

The goal of the project is not only to show projects and contact details, but to present them through an experience that feels memorable, tactile, and personal.

---

## Quick Navigation

- [Overview](#overview)
- [Highlights](#highlights)
- [Desktop And Mobile Interaction](#desktop-and-mobile-interaction)
- [Built-In Apps](#built-in-apps)
- [Terminal Commands](#terminal-commands)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Design Notes](#design-notes)
- [Links](#links)
- [Contact](#contact)
- [Philosophy](#philosophy)

---

## Overview

ManOS.dev presents portfolio content as an operating-system-style workspace. The interface includes a top system bar, a dock, draggable windows on desktop, a Spotlight-inspired launcher, a custom terminal, and a set of built-in apps that each reveal a different part of the portfolio.

On larger screens, the project behaves like a lightweight desktop OS. On phones and tablets, the same experience is adapted through touch-first interactions such as floating search access, quick actions, and mobile-friendly window layouts.

---

## Highlights

- macOS-inspired visual structure with a top bar, dock, traffic-light controls, and layered windows
- Spotlight-style app and action launcher for quick navigation
- Interactive terminal with profile-specific commands instead of generic placeholder output
- Built-in apps for resume, contact, GitHub, notes, media, utilities, and settings
- Notification system for system-like feedback
- Responsive behavior tailored for desktop, tablet, and phone interactions
- Local persistence for selected settings and user-created content such as notes and gallery captures

---

## Desktop And Mobile Interaction

### Desktop

- Use `Ctrl + K` to open Spotlight
- Right-click the desktop to open quick actions
- Open apps from the dock
- Drag, resize, minimize, and close windows like a desktop environment

### Phone / Tablet

- Tap the floating clock or Search button to open Spotlight
- Tap Actions or long-press the desktop for quick actions
- Windows switch from free dragging to a more touch-friendly layout
- Navigation remains focused on reachability and simplified actions rather than desktop precision

---

## Built-In Apps

### Terminal

The Terminal is the most direct way to explore the portfolio. It behaves like a personal CLI interface rather than a decorative widget. It shows boot-style system lines, accepts commands, displays structured output, and acts as a fast route into personal details, background, projects, and external links.

What it covers:

- personal details
- education
- interests
- motivation
- experience
- skills
- projects
- socials
- contact information

### Calendar

The Calendar app embeds a Google Calendar view inside the desktop environment. Its role is less about portfolio storytelling and more about making the OS concept feel like a real workspace with practical tools.

### Mail

The Mail app works as a polished contact surface. Instead of only listing an email address, it frames collaboration availability, provides a direct mail action, includes copy-to-clipboard behavior, and links outward to professional profiles.

It is meant to feel like opening a focused contact window rather than reading a static footer.

### GitHub

The GitHub app is presented as a storyboard-style experience. It introduces the profile through a more visual entry point, then allows the user to watch an embedded story and open the GitHub profile directly.

This makes the GitHub section feel more curated than a standard “visit my profile” card.

### Resume

The Resume app opens the portfolio resume directly in the interface through an embedded PDF view. Instead of sending the user elsewhere immediately, it keeps the reading experience inside the desktop environment.

### Notes

The Notes app is a functional utility, not just decoration. It supports:

- creating notes
- editing notes
- searching notes
- deleting notes
- local persistence

On mobile, it switches to a more practical list-and-editor flow so the app remains usable on smaller screens.

### Code Editor

The Code Editor uses Monaco to provide a small browser-based JavaScript editing experience. It includes a run action and a lightweight output panel. It is intentionally playful: the goal is to reinforce the OS concept and showcase interactivity rather than act as a full development environment.

### Spotify

The Spotify app embeds a playlist into the workspace. It adds atmosphere to the project and helps the desktop feel personal rather than purely informational.

### Camera

The Camera app opens the webcam, shows a mirrored live preview, and lets the user capture photos directly inside ManOS. Captured images are saved into the built-in Gallery experience.

The camera flow also includes cleanup logic so the media stream stops when the window is closed or minimized, preventing the camera from continuing to run in the background.

### Gallery

The Gallery app displays photos captured from the Camera app. It supports selection, deletion, download, and persistence through local storage, so it behaves like a real companion app rather than a disconnected media viewer.

### Settings

The Settings app controls the desktop environment itself. It currently covers:

- focus mode
- system sounds
- brightness
- unlock behavior
- desktop reset

Changes apply immediately and are stored where appropriate so the workspace feels consistent between sessions.

---

## Terminal Commands

The table below summarizes the available terminal commands and what each one reveals or performs.

| Command           | What It Does                                            |
| ----------------- | ------------------------------------------------------- |
| `/help`           | Displays the available command list inside the terminal |
| `/about`          | Shows core personal details                             |
| `/description`    | Gives a short professional introduction                 |
| `/education`      | Lists academic history and CGPA                         |
| `/interests`      | Shows hobbies and personal interests                    |
| `/motivation`     | Displays the project owner’s mindset statement          |
| `/experience`     | Shows internship and professional experience            |
| `/skills`         | Lists technical skills, tools, and stack areas          |
| `/projects`       | Shows highlighted projects                              |
| `/socials`        | Displays social profile references                      |
| `/contact`        | Shows direct contact information                        |
| `/open github`    | Opens GitHub in a new tab                               |
| `/open linkedin`  | Opens LinkedIn in a new tab                             |
| `/open instagram` | Opens Instagram in a new tab                            |
| `/open x`         | Opens X in a new tab                                    |
| `/clear`          | Resets the terminal output                              |

Command behavior:

- valid commands produce structured output
- invalid commands return an error-style response
- `/clear` resets the terminal without breaking the system feel

---

## Tech Stack

- React 19
- Vite 6
- SCSS
- `react-rnd`
- `@monaco-editor/react`
- Remix Icon

---

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build For Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint The Project

```bash
npm run lint
```

---

## Contributing

Contributions are welcome if you want to improve the experience, polish the interface, fix bugs, or expand the built-in apps.

Suggested contribution areas:

- UI and animation refinement
- mobile and tablet interaction polish
- accessibility improvements
- performance optimization
- new app ideas inside the ManOS desktop
- sound design and media assets
- bug fixes and code cleanup

Basic contribution flow:

1. Fork the repository.
2. Create a feature branch.
3. Make focused changes.
4. Run `npm run lint` and test the app locally.
5. Open a pull request with a clear summary of what changed.

If you contribute, keep the OS-style interaction model and existing visual language consistent with the rest of the project.

---

## Design Notes

- The project is intentionally experience-first rather than layout-first
- Desktop interactions are preserved where they add personality
- Mobile and tablet interactions are adapted instead of forcing desktop metaphors unchanged
- Persistent state is used selectively to make the workspace feel lived-in without becoming noisy

---

## Links

- GitHub: https://github.com/mannatgupta146
- LinkedIn: https://www.linkedin.com/in/mannatgupta146/
- Instagram: https://instagram.com/mannat_1411
- X: https://x.com/MannatGupta146

---

## Contact

- Email: mannatgupta146@gmail.com

---

## Philosophy

> Better than yesterday, even by 0.00001%. Every effort matters.
