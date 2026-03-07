# ManOS.dev

ManOS.dev is a macOS-inspired portfolio built with React and Vite. Instead of a conventional landing page, it presents profile content as a small operating system: draggable windows, a terminal, system menus, status indicators, notifications, and app-like experiences for projects, resume, mail, GitHub, notes, camera, gallery, and more.

The project is designed to feel like an interactive desktop on large screens while still remaining usable on phones and tablets through touch-friendly shortcuts such as Spotlight access, quick actions, and responsive window behavior.

## Highlights

- macOS-style top navigation with left-side menus and right-side system status
- Draggable and resizable desktop windows powered by `react-rnd`
- Interactive terminal with portfolio-specific commands
- Spotlight-style global search for apps and desktop actions
- Built-in apps for resume, mail, GitHub, notes, calendar, settings, camera, gallery, Spotify, and code editor
- Notification system for system-style feedback
- Responsive mobile and tablet behavior with touch-friendly search and quick actions
- Persistent UI state using local storage and session storage

## Desktop And Mobile Interaction

### Desktop

- Use `Ctrl + K` to open Spotlight
- Right-click the desktop for quick actions
- Open apps from the dock
- Drag, resize, minimize, and close windows like a desktop OS

### Phone / Tablet

- Tap the floating clock or Search button to open Spotlight
- Tap Actions or long-press the desktop for quick actions
- Windows switch to a mobile-friendly layout instead of free dragging

## Built-In Apps

### Terminal

The terminal is the fastest way to explore the portfolio content. It includes boot-style system lines, command parsing, highlighted output, profile information, project summaries, social links, and direct commands to open external profiles.

#### Terminal Commands

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `/help`           | Show the full command list inside the terminal |
| `/about`          | Display personal details                       |
| `/description`    | Show a quick professional introduction         |
| `/education`      | Show academic background and CGPA              |
| `/interests`      | List hobbies and interests                     |
| `/motivation`     | Show the personal mindset statement            |
| `/experience`     | Show internship and work experience            |
| `/skills`         | List technical skills and tools                |
| `/projects`       | Show highlighted projects                      |
| `/socials`        | Show social profile links                      |
| `/contact`        | Show email and phone details                   |
| `/open github`    | Open GitHub in a new tab                       |
| `/open linkedin`  | Open LinkedIn in a new tab                     |
| `/open instagram` | Open Instagram in a new tab                    |
| `/open x`         | Open X in a new tab                            |
| `/clear`          | Reset terminal output                          |

Behavior:

- Valid commands render as successful output
- Invalid commands return an error-style response
- `/clear` resets the terminal output without removing the initial system feel

### Calendar

The Calendar window embeds a Google Calendar view, giving the project a real utility-app feel instead of treating every window as static portfolio content.

### Mail

The Mail app acts like a contact card with stronger presentation. It includes a direct mail action, copy-email shortcut, collaboration messaging, and quick links to GitHub and LinkedIn.

### GitHub

The GitHub window is presented as a storyboard experience rather than a plain link card. It includes a story launcher, project-oriented framing, and direct access to the GitHub profile.

### Resume

The Resume app loads the portfolio resume directly inside the desktop experience through an embedded PDF viewer, so it feels like opening a document inside the OS.

### Notes

The Notes app supports creating, editing, searching, and deleting notes with local persistence. On mobile, it shifts into a more touch-friendly flow with separate list and editor views.

### Code Editor

The Code Editor uses Monaco to provide an in-browser JavaScript editing experience with a small output console. It is designed as a playful built-in utility instead of a full IDE replacement.

### Spotify

The Spotify window embeds a playlist directly into the interface, adding atmosphere to the OS concept and making the desktop feel more personal and lived-in.

### Camera

The Camera app accesses the user camera, shows a live mirrored preview, and lets users capture images directly into the built-in gallery. It also includes cleanup logic so the media stream stops properly when the window closes or minimizes.

### Gallery

The Gallery app displays photos captured through the Camera window. It supports selection, deletion, download, and local persistence, turning captured images into part of the OS experience.

### Settings

The Settings panel controls workspace-level options such as focus mode, system sounds, brightness, unlock behavior, and desktop reset. These changes apply immediately and persist across sessions where appropriate.

## Tech Stack

- React 19
- Vite 6
- SCSS
- `react-rnd`
- `@monaco-editor/react`
- Remix Icon

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Run Development Server

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

### Lint

```bash
npm run lint
```

## Design Notes

- The project prioritizes an OS-like feel over a traditional portfolio layout
- Mobile and tablet UX uses alternate interaction patterns instead of forcing desktop-only behaviors onto touch devices
- UI state such as wallpaper, visits, and window positions is persisted where it improves continuity

## Links

- GitHub: https://github.com/mannatgupta146
- LinkedIn: https://www.linkedin.com/in/mannatgupta146/
- Instagram: https://instagram.com/mannat_1411
- X: https://x.com/MannatGupta146

## Contact

- Email: mannatgupta146@gmail.com

## Philosophy

> Better than yesterday, even by 0.00001%. Every effort matters.
