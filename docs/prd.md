# Product Requirements Document (PRD)

## 📋 Executive Summary
**ManOS.dev** is an interactive, browser-based web application that mimics a modern macOS desktop operating system. Built as a high-fidelity developer portfolio for **Mannat Gupta** (Full Stack, AI & Web3 Engineer), it showcases personal experience, technical projects, skills, education, and contact details through an immersive UNIX terminal, desktop widgets, interactive dock, and system controls.

---

## 🎯 Target Audience & Goals
- **Tech Recruiters & Engineering Managers**: Seeking a memorable, interactive portfolio that demonstrates high frontend craftsmanship and engineering depth.
- **Developers & Tech Enthusiasts**: Looking for an open-source macOS web simulator built with clean React architecture.
- **Client & Peer Contacts**: Looking for fast, direct ways to contact Mannat via email, phone, GitHub, LinkedIn, or social profiles.

---

## 🛠️ Key Product Features & Functional Requirements

### 1. Terminal CLI Application (`/Cli.jsx`)
- **Command Engine**: Parse and execute interactive CLI commands.
- **Command Directory (`/help`)**: Display an interactive 2-column command table (`COMMAND` & `DESCRIPTION`) with single-click command execution.
- **Personal Information (`/about`)**: Quick, structured overview card displaying Name, Role, Education, Location, and Status.
- **Engineering Bio (`/description`)**: Comprehensive bio card outlining engineering story, core pillars (AI/Cognitive Tools, Full Stack, Web3 Protocols), and domain badges.
- **Academic Timeline (`/education`)**: Chronological cards detailing degree, school name, location, graduation status, and CGPA/marks.
- **Work History (`/experience`)**: Highlight past software engineering roles (PathMentor SDE 1, Metacrafters Blockchain Intern).
- **Technical Skills (`/skills`)**: Render categorized skill groups (Languages, Frontend, Backend, Databases, AI/ML, DevOps, Web3, Tools).
- **Featured Projects (`/projects`)**: Detailed cards for key portfolio projects (`MindGraph`, `Buildex`, `OutReach-AI`) with direct GitHub links.
- **Interactive Contact Cards (`/contact`)**: Glassmorphic action cards for Email (`mailto:`), Phone (`tel:`), Location, and Socials link.
- **Social Media Quick Links (`/socials` & `/open <network>`)**: Dedicated cards and direct open commands for GitHub, LinkedIn, X (Twitter), and Instagram.
- **Motivation (`/motivation`)**: Inspiring quote card with growth mindset badge.

### 2. macOS Workspace & Window Manager
- **Draggable & Resizable Windows (`MacWindow.jsx`)**: Support titlebars with standard traffic light buttons (Close, Minimize, Expand), window dragging, and z-index focus management.
- **Floating Dock (`Dock.jsx`)**: Bottom-dock container with macOS-style magnification effect on hover and active app indicator dots.
- **Top Navigation Bar (`Nav.jsx`)**: System menu bar featuring Apple logo dropdown, active app title, time/date, battery indicator, and control center.
- **Spotlight Search (`Spotlight.jsx`)**: `Cmd+K` keyboard shortcut trigger to search apps, commands, and portfolio links instantly.
- **Context Menu (`DesktopMenu.jsx`)**: Desktop right-click context menu for changing wallpaper, clearing terminal, or toggling settings.
- **Notification System (`NotificationCenter.jsx`)**: Toast notification center with built-in 4-second cooldown rate-limiting to prevent toast spam.

---

## 🚀 Non-Functional Requirements
- **Performance**: Instant initial load time (<1 second bundle execution) with Vite asset optimization.
- **Responsiveness**: Fully functional across desktop monitors, laptops, and mobile viewports.
- **Accessibility**: Keyboard navigable terminal inputs, clickable command badges, and clear text contrast.
- **Reliability**: Clean zero-error production build (`npm run build`).
