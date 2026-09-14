import React, { useEffect, useRef, useState } from "react"
import MacWindow from "./MacWindow"
import "./Cli.scss"

/* =====================
   HELP COMMAND DATA
===================== */
const HELP_COMMANDS = [
  { cmd: "/about", desc: "Personal info & profile summary" },
  { cmd: "/description", desc: "Detailed professional background" },
  { cmd: "/education", desc: "Degree, schooling & CGPA" },
  { cmd: "/experience", desc: "Work history & roles" },
  { cmd: "/skills", desc: "Technical skills & stack" },
  { cmd: "/projects", desc: "Featured projects & repositories" },
  { cmd: "/interests", desc: "Hobbies, games & passions" },
  { cmd: "/socials", desc: "Social media profiles" },
  { cmd: "/contact", desc: "Email, phone & location" },
  { cmd: "/open github", desc: "Open GitHub profile" },
  { cmd: "/open linkedin", desc: "Open LinkedIn profile" },
  { cmd: "/open x", desc: "Open X (Twitter) profile" },
  { cmd: "/open instagram", desc: "Open Instagram profile" },
  { cmd: "/motivation", desc: "Personal mindset & quote" },
  { cmd: "/clear", desc: "Clear terminal buffer" },
]

/* =====================
   SYSTEM BOOT LINES
===================== */
const SYSTEM_LINES = [
  { type: "system-title", text: "Welcome to ManOS CLI" },
  {
    type: "system-sub",
    parts: [
      { text: "Type ", className: "" },
      { text: "/help", className: "cmd-green" },
      { text: " anytime to view command directory", className: "" },
    ],
  },
  { type: "spacer" },
  { type: "help-table", commands: HELP_COMMANDS },
  { type: "divider" },
]

/* =====================
   COMMAND LIST
===================== */
const COMMANDS = [
  "/help",
  "/about",
  "/description",
  "/education",
  "/interests",
  "/motivation",
  "/experience",
  "/skills",
  "/projects",
  "/socials",
  "/open mindgraph",
  "/open buildex",
  "/open outreach-ai",
  "/open manos",
  "/open github",
  "/open instagram",
  "/open x",
  "/open linkedin",
  "/contact",
  "/clear",
]

/* =====================
   NUMBER HIGHLIGHTER
===================== */
const highlightNumbers = (text = "") =>
  text.replace(/(\d+(\.\d+)?%?|\d{4}–\d{4})/g, `<span class="number">$1</span>`)

const Cli = ({ minimized, onClose, onMinimize, zIndex, onFocus }) => {
  const [lines, setLines] = useState(SYSTEM_LINES)
  const [input, setInput] = useState("")

  const terminalRef = useRef(null)
  const inputRef = useRef(null)
  const lastInputRef = useRef(null)

  // Scroll to top on initial render
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = 0
    }
  }, [])

  // Auto-scroll to bottom whenever new command lines are printed
  useEffect(() => {
    if (lines.length > SYSTEM_LINES.length && terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
    inputRef.current?.focus()
  }, [lines])

  const isValidTyping = COMMANDS.some((c) => c.startsWith(input.trim()))

  const pushLines = (items) =>
    setLines((prev) => [...prev, ...items, { type: "divider" }])

  /* =====================
     COMMAND ACTIONS
  ===================== */
  const actions = {
    "/help": () =>
      pushLines([{ type: "help-table", commands: HELP_COMMANDS }]),

    "/about": () =>
      pushLines([
        {
          type: "about-card",
          title: "Personal Overview",
          details: [
            { label: "Name", value: "Mannat Gupta" },
            { label: "Role", value: "Full Stack, AI & Web3 Engineer" },
            { label: "Education", value: "BE Computer Science (Chandigarh University)" },
            { label: "Location", value: "Jammu & Kashmir, India (Remote Available)" },
            { label: "Status", value: "Recent Graduate (2022–2026)" },
          ],
        },
      ]),

    "/description": () =>
      pushLines([
        {
          type: "bio-card",
          title: "Professional Bio & Engineering Focus",
          intro: "I am a Computer Science Engineer focused on building high-fidelity software—from cognitive AI systems to high-concurrency web applications and decentralized Web3 protocols.",
          pillars: [
            { icon: "🧠", title: "AI & Cognitive Tools", desc: "Building RAG pipelines, Knowledge Graphs & LLM Agents" },
            { icon: "💻", title: "Full Stack Development", desc: "Crafting scalable web apps with MERN, Next.js & React Native" },
            { icon: "🔗", title: "Web3 Protocols", desc: "Developing Ethereum & Polygon smart contract architectures" },
          ],
          highlights: [
            "MERN Stack",
            "GenAI & RAG",
            "Scalable Systems",
            "Cross-Platform Mobile",
            "Smart Contracts",
            "Cloud Infrastructure",
          ],
        },
      ]),

    "/education": () =>
      pushLines([
        {
          type: "exp-card",
          role: "Bachelor of Engineering (BE) — Computer Science",
          company: "Chandigarh University, Mohali, Punjab",
          duration: "2022 – 2026",
          desc: "Focused on Software Engineering, Data Structures & Algorithms, Database Systems, Artificial Intelligence, and Web Development.",
          stack: ["CGPA: 7.89 / 10", "Computer Science", "Mohali, Punjab"],
          theme: "emerald",
        },
        {
          type: "exp-card",
          role: "Higher Secondary (12th CBSE)",
          company: "Brahmrishi Bawra Shanti Vidya Peeth, Udhampur",
          duration: "2020 – 2022",
          desc: "Science Stream (Physics, Chemistry, Mathematics & Computer Science).",
          stack: ["80.4%", "CBSE Board", "Udhampur, J&K"],
          theme: "amber",
        },
        {
          type: "exp-card",
          role: "Secondary School (10th CBSE)",
          company: "Brahmrishi Bawra Shanti Vidya Peeth, Udhampur",
          duration: "2019 – 2020",
          desc: "General Academic Sciences & Mathematics.",
          stack: ["88.5%", "CBSE Board", "Udhampur, J&K"],
          theme: "pink",
        },
      ]),

    "/interests": () =>
      pushLines([
        {
          type: "skill-group",
          title: "Gaming & Sports",
          icon: "🎮",
          items: ["Competitive Chess", "Cricket", "Strategy Games"],
          theme: "amber",
        },
        {
          type: "skill-group",
          title: "Tech & Innovation",
          icon: "🚀",
          items: ["Creative Coding", "UI/UX Design", "AI Systems", "Web3 Protocols"],
          theme: "cyan",
        },
        {
          type: "skill-group",
          title: "Creative & Arts",
          icon: "✍️",
          items: ["Poetry Writing", "Culinary Arts", "Visual Design"],
          theme: "pink",
        },
        {
          type: "skill-group",
          title: "Lifestyle & Exploration",
          icon: "🌍",
          items: ["Cinema & Sci-Fi", "Travel", "World History"],
          theme: "purple",
        },
      ]),

    "/motivation": () =>
      pushLines([
        {
          type: "quote-card",
          quote: "Better than yesterday, even by 0.00001%. Every single effort compounds.",
          author: "Personal Philosophy",
        },
      ]),

    "/experience": () =>
      pushLines([
        { type: "title", text: "Work Experience" },

        {
          type: "experience",
          role: "SDE 1",
          company: "PathMentor",
          duration: "Jul 2026 – Sep 2026 (2 months)",
          stack: ["React Native", "TypeScript", "Supabase"],
          desc: "Built App Blocking, DND mode & background timers for NEET prep app. Optimized APIs & network calls.",
          theme: "cyan",
        },
        {
          type: "experience",
          role: "Blockchain Developer Intern",
          company: "Metacrafters",
          duration: "Jun 2024 – Sep 2024 (4 months)",
          stack: ["Solidity", "Ethereum", "Polygon", "Web3"],
          desc: "Developed smart contracts & DApps on Ethereum and Polygon.",
          theme: "purple",
        },
      ]),

    "/skills": () =>
      pushLines([
        { type: "title", text: "Technical Skills" },

        {
          type: "skill-group",
          title: "Languages",
          icon: "💻",
          theme: "cyan",
          items: [
            "JavaScript",
            "TypeScript",
            "Python",
            "Solidity",
            "HTML5",
            "CSS3",
          ],
        },
        {
          type: "skill-group",
          title: "Frontend & Mobile",
          icon: "🎨",
          theme: "emerald",
          items: [
            "React.js",
            "Next.js",
            "React Native",
            "Tailwind CSS",
            "ShadCN UI",
            "GSAP",
            "Vite",
          ],
        },
        {
          type: "skill-group",
          title: "Backend & Cloud",
          icon: "⚡",
          theme: "amber",
          items: [
            "Node.js",
            "Express.js",
            "REST APIs",
            "AWS",
            "Vercel",
            "EAS Build",
          ],
        },
        {
          type: "skill-group",
          title: "Databases & ORM",
          icon: "🗄️",
          theme: "purple",
          items: [
            "PostgreSQL",
            "Supabase",
            "MongoDB",
            "Prisma",
            "Neon DB",
            "SQLite",
          ],
        },
        {
          type: "skill-group",
          title: "AI / ML",
          icon: "🧠",
          theme: "pink",
          items: [
            "LangChain",
            "RAG",
            "Vector DBs",
            "Semantic Search",
            "LLM APIs",
            "AI Agents",
          ],
        },
        {
          type: "skill-group",
          title: "DevOps & Infra",
          icon: "⚙️",
          theme: "orange",
          items: [
            "Docker",
            "Kubernetes",
            "Skaffold",
            "GitHub Actions",
            "CI/CD",
          ],
        },
        {
          type: "skill-group",
          title: "Blockchain & Web3",
          icon: "🔗",
          theme: "violet",
          items: [
            "Solidity",
            "Hardhat",
            "OpenZeppelin",
            "ERC-20",
            "ERC-721A",
            "MetaMask",
          ],
        },
        {
          type: "skill-group",
          title: "Tools & Ecosystem",
          icon: "🛠️",
          theme: "teal",
          items: [
            "Git",
            "GitHub",
            "Postman",
            "Clerk",
            "Inngest",
            "Expo",
            "Edge Functions",
          ],
        },
      ]),

    "/projects": () =>
      pushLines([
        { type: "title", text: "Featured Projects" },

        {
          type: "project",
          index: "1.",
          name: "MindGraph",
          intro:
            "Universal memory engine & cognitive OS for saving, indexing, and resurfacing PDFs, images, articles, tweets, and YouTube links. Features AI summarization, Pinecone vector RAG, knowledge graph visualization, and browser extension helper.",
          stack: "React, Tailwind, Node.js, Express, MongoDB, Pinecone, Mistral AI, OpenAI",
          url: "https://github.com/mannatgupta146/MindGraph",
        },
        {
          type: "project",
          index: "2.",
          name: "Buildex",
          intro:
            "AI-powered platform project focused on building and managing applications, featuring frontend sandbox runtimes and containerized infrastructure orchestration using Docker, Kubernetes, and Skaffold.",
          stack: "React, Node.js, Docker, Kubernetes, Skaffold, AI Orchestration",
          url: "https://github.com/mannatgupta146/Buildex",
        },
        {
          type: "project",
          index: "3.",
          name: "OutReach-AI (JobReach)",
          intro:
            "Intelligent full-stack AI agent automating recruiter outreach. Extracts leads from candidate PDFs, personalizes cold emails via LLMs (Mistral/OpenAI), and dispatches automated sequences with resume attachments.",
          stack: "Next.js, React, Tailwind CSS, Node.js, MongoDB, Mongoose, Mistral AI, Nodemailer",
          url: "https://github.com/mannatgupta146/OutReach-AI",
        },

        {
          type: "highlight",
          text: "See more on GitHub → ",
          cmd: "/open github",
        },
      ]),

    "/socials": () =>
      pushLines([
        { type: "title", text: "Social Profiles" },

        {
          type: "socials-grid",
          profiles: [
            {
              name: "GitHub",
              username: "@mannatgupta146",
              url: "https://github.com/mannatgupta146",
              icon: "ri-github-fill",
              theme: "github",
            },
            {
              name: "LinkedIn",
              username: "Mannat Gupta",
              url: "https://linkedin.com/in/mannatgupta146",
              icon: "ri-linkedin-box-fill",
              theme: "linkedin",
            },
            {
              name: "X (Twitter)",
              username: "@MannatGupta146",
              url: "https://x.com/MannatGupta146",
              icon: "ri-twitter-x-fill",
              theme: "twitter",
            },
            {
              name: "Instagram",
              username: "@mannat_1411",
              url: "https://instagram.com/mannat_1411",
              icon: "ri-instagram-line",
              theme: "instagram",
            },
          ],
        },
      ]),

    "/open mindgraph": () =>
      window.open("https://github.com/mannatgupta146/MindGraph", "_blank"),
    "/open buildex": () =>
      window.open("https://github.com/mannatgupta146/Buildex", "_blank"),
    "/open outreach-ai": () =>
      window.open("https://github.com/mannatgupta146/OutReach-AI", "_blank"),
    "/open manos": () =>
      window.open("https://github.com/mannatgupta146/ManOS.dev", "_blank"),
    "/open github": () =>
      window.open("https://github.com/mannatgupta146", "_blank"),
    "/open instagram": () =>
      window.open("https://instagram.com/mannat_1411", "_blank"),
    "/open x": () => window.open("https://x.com/MannatGupta146", "_blank"),
    "/open linkedin": () =>
      window.open("https://linkedin.com/in/mannatgupta146", "_blank"),

    "/contact": () =>
      pushLines([
        {
          type: "contact-grid",
          items: [
            {
              type: "email",
              label: "Email",
              value: "mannatgupta146@gmail.com",
              sub: "Click to send an email",
              icon: "ri-mail-send-line",
              action: "mailto:mannatgupta146@gmail.com",
              color: "#38bdf8",
              gradient: "rgba(56, 189, 248, 0.12)",
              borderColor: "rgba(56, 189, 248, 0.3)",
            },
            {
              type: "phone",
              label: "Phone",
              value: "+91 9541343039",
              sub: "Click to call / WhatsApp",
              icon: "ri-phone-line",
              action: "tel:+919541343039",
              color: "#34d399",
              gradient: "rgba(52, 211, 153, 0.12)",
              borderColor: "rgba(52, 211, 153, 0.3)",
            },
            {
              type: "location",
              label: "Location",
              value: "Jammu & Kashmir, India",
              sub: "Available worldwide (Remote)",
              icon: "ri-map-pin-line",
              action: null,
              color: "#f472b6",
              gradient: "rgba(244, 114, 182, 0.12)",
              borderColor: "rgba(244, 114, 182, 0.3)",
            },
          ],
        },
        { type: "spacer" },
        {
          type: "highlight",
          text: "You can also find me on → ",
          cmd: "/socials",
        },
      ]),

    "/clear": () => setLines(SYSTEM_LINES),
  }

  const handleEnter = (e) => {
    if (e.key !== "Enter") return

    const cmd = input.trim()
    if (!cmd) return

    const valid = !!actions[cmd]

    setLines((prev) => [
      ...prev,
      { type: valid ? "input-ok" : "input-error", text: cmd },
    ])

    valid
      ? actions[cmd]()
      : pushLines([
          {
            type: "error-msg",
            cmdName: cmd,
          },
        ])

    setInput("")
  }

  return (
    <MacWindow
      appId="terminal"
      title="Terminal"
      minimized={minimized}
      onClose={onClose}
      onMinimize={onMinimize}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="cli" ref={terminalRef}>
        {lines.map((l, i) =>
          l.type === "spacer" ? (
            <div key={i} className="spacer" />
          ) : l.type === "divider" ? (
            <div key={i} className="line-divider" />
          ) : l.type === "help-table" ? (
            <div key={i} className="help-table-container">
              <div className="help-table-header">
                <span className="col-cmd">Command</span>
                <span className="col-desc">Description</span>
              </div>
              <div className="help-table-body">
                {l.commands.map((c, idx) => (
                  <div key={idx} className="help-table-row">
                    <span
                      className="col-cmd cmd-green clickable-cmd"
                      onClick={() => actions[c.cmd] && actions[c.cmd]()}
                    >
                      {c.cmd}
                    </span>
                    <span className="col-desc">{c.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div
              key={i}
              className="line"
              ref={l.type.startsWith("input") ? lastInputRef : null}
            >
              {l.type.startsWith("input") && (
                <>
                  <span className="prompt">mannat@ManOS:~$</span>
                  <span className="prompt-space" />
                </>
              )}

              {l.type === "cmd" ? (
                <>
                  <span
                    className="cmd-green clickable-cmd"
                    onClick={() => actions[l.cmd] && actions[l.cmd]()}
                  >
                    {l.cmd}
                  </span>
                  <span className="cmd-sep"> - </span>
                  <span className="cmd-desc">{l.desc}</span>
                </>
              ) : l.type === "about-card" ? (
                <div className="about-card">
                  <div className="about-card-title">{l.title}</div>
                  <div className="about-card-body">
                    {l.details.map((d, idx) => (
                      <div key={idx} className="about-row">
                        <span className="about-label">{d.label}</span>
                        <span className="about-value">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : l.type === "bio-card" ? (
                <div className="bio-card">
                  <div className="bio-card-title">{l.title}</div>
                  <p className="bio-card-intro">{l.intro}</p>
                  <div className="bio-pillars">
                    {l.pillars.map((p, idx) => (
                      <div key={idx} className="bio-pillar-row">
                        <span className="pillar-icon">{p.icon}</span>
                        <div className="pillar-info">
                          <span className="pillar-title">{p.title}:</span>{" "}
                          <span className="pillar-desc">{p.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bio-highlights">
                    {l.highlights.map((h, idx) => (
                      <span key={idx} className="bio-badge">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              ) : l.type === "experience" || l.type === "exp-card" ? (
                <div className={`exp-card theme-${l.theme || "cyan"}`}>
                  <div className="exp-header">
                    <div className="exp-main-info">
                      <span className="exp-role">{l.role}</span>
                      <span className="exp-at">@</span>
                      <span className="exp-company">{l.company}</span>
                    </div>
                    <span className="exp-duration">{l.duration}</span>
                  </div>
                  <div className="exp-desc">{l.desc}</div>
                  {l.stack && (
                    <div className="exp-stack">
                      {l.stack.map((tech, idx) => (
                        <span key={idx} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ) : l.type === "skill-group" ? (
                <div className={`skill-group theme-${l.theme || "default"}`}>
                  <div className="skill-title">{l.icon || "⚡"} {l.title}</div>
                  <div className="skill-pills">
                    {l.items.map((item, idx) => (
                      <span key={idx} className="skill-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ) : l.type === "contact-grid" ? (
                <div className="contact-grid">
                  {l.items.map((item, idx) => {
                    const CardTag = item.action ? "a" : "div";
                    const cardProps = item.action
                      ? {
                          href: item.action,
                          target: item.action.startsWith("http") ? "_blank" : undefined,
                          rel: item.action.startsWith("http") ? "noopener noreferrer" : undefined,
                        }
                      : {};

                    return (
                      <CardTag
                        key={idx}
                        {...cardProps}
                        className={`contact-card ${item.action ? "clickable" : ""}`}
                        style={{
                          "--card-accent": item.color,
                          "--card-bg": item.gradient,
                          "--card-border": item.borderColor,
                        }}
                      >
                        <div className="contact-icon" style={{ color: item.color }}>
                          <i className={item.icon} />
                        </div>
                        <div className="contact-info">
                          <span className="contact-label">{item.label}</span>
                          <span className="contact-value">{item.value}</span>
                          {item.sub && <span className="contact-sub">{item.sub}</span>}
                        </div>
                        {item.action && <div className="contact-arrow">↗</div>}
                      </CardTag>
                    );
                  })}
                </div>
              ) : l.type === "quote-card" ? (
                <div className="quote-card">
                  <div className="quote-icon">“</div>
                  <div className="quote-content">
                    <p className="quote-text">{l.quote}</p>
                    <div className="quote-footer">
                      <span className="quote-author">— {l.author}</span>
                      {l.tag && <span className="quote-tag">{l.tag}</span>}
                    </div>
                  </div>
                </div>
              ) : l.type === "socials-grid" ? (
                <div className="socials-grid">
                  {l.profiles.map((p, idx) => (
                    <a
                      key={idx}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-card theme-${p.theme}`}
                    >
                      <div className="social-icon">
                        <i className={p.icon} />
                      </div>
                      <div className="social-info">
                        <span className="social-name">{p.name}</span>
                        <span className="social-username">{p.username}</span>
                      </div>
                      <div className="social-arrow">↗</div>
                    </a>
                  ))}
                </div>
              ) : l.type === "project" ? (
                <div className="project-card">
                  <div className="project-header">
                    <span className="project-name">
                      {l.index} {l.name}
                    </span>
                    {l.url && (
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        🔗 GitHub
                      </a>
                    )}
                  </div>
                  <div className="project-intro">{l.intro}</div>
                  <div className="project-stack">
                    Tech stack: <b>{l.stack}</b>
                  </div>
                </div>
              ) : l.type === "error-msg" ? (
                <span className="error">
                  zsh: command not found: <strong className="cmd-bad">{l.cmdName}</strong>. Try{" "}
                  <span
                    className="cmd-green clickable-cmd"
                    onClick={() => actions["/help"] && actions["/help"]()}
                  >
                    /help
                  </span>
                </span>
              ) : l.type === "highlight" ? (
                <span className="highlight">
                  {l.text}
                  <span
                    className="cmd-green clickable-cmd"
                    onClick={() => actions[l.cmd] && actions[l.cmd]()}
                  >
                    {l.cmd}
                  </span>
                </span>
              ) : l.type === "label" ? (
                <div className="label-line">
                  <span className="label">{l.label}:</span>
                  <span className="value">{l.value}</span>
                </div>
              ) : l.type === "system-title" ? (
                <span className="system-title">{l.text}</span>
              ) : l.type === "system-sub" ? (
                <span className="system-sub">
                  {l.parts.map((p, idx) => (
                    <span key={idx} className={p.className}>
                      {p.text}
                    </span>
                  ))}
                </span>
              ) : typeof l.text === "string" ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: highlightNumbers(l.text),
                  }}
                />
              ) : (
                l.text
              )}
            </div>
          ),
        )}

        <div className="line input-line">
          <span className="prompt">mannat@ManOS:~$</span>
          <span className="prompt-space" />
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleEnter}
            className={input && !isValidTyping ? "typing-error" : "typing-ok"}
            spellCheck={false}
          />
        </div>
      </div>
    </MacWindow>
  )
}

export default Cli
