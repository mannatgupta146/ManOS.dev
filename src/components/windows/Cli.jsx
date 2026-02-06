import React, { useEffect, useRef, useState } from "react";
import MacWindow from "./MacWindow";
import "./Cli.scss";

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
      { text: " to see available commands", className: "" },
    ],
  },
  { type: "spacer" },
];


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
  "/open github",
  "/open instagram",
  "/open x",
  "/open linkedin",
  "/contact",
  "/clear",
];

/* =====================
   NUMBER HIGHLIGHTER
===================== */
const highlightNumbers = (text = "") =>
  text.replace(
    /(\d+(\.\d+)?%?|\d{4}–\d{4})/g,
    `<span class="number">$1</span>`
  );

const Cli = () => {
  const [lines, setLines] = useState(SYSTEM_LINES);
  const [input, setInput] = useState("");

  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    inputRef.current?.focus();
  }, [lines]);

  const isValidTyping = COMMANDS.some((c) =>
    c.startsWith(input.trim())
  );

  const pushLines = (items) =>
    setLines((prev) => [...prev, ...items, { type: "spacer" }]);

  /* =====================
     COMMAND ACTIONS
  ===================== */
  const actions = {
    "/help": () =>
      pushLines([
        { type: "title", text: "Available Commands" },

        { type: "cmd", cmd: "/about", desc: "Personal info" },
        { type: "cmd", cmd: "/description", desc: "Quick intro" },
        { type: "cmd", cmd: "/education", desc: "Academic background" },
        { type: "cmd", cmd: "/interests", desc: "Hobbies & interests" },
        { type: "cmd", cmd: "/motivation", desc: "Personal mindset" },
        { type: "cmd", cmd: "/experience", desc: "Work experience" },
        { type: "cmd", cmd: "/skills", desc: "Technical skills" },
        { type: "cmd", cmd: "/projects", desc: "Highlighted projects" },
        { type: "cmd", cmd: "/socials", desc: "Social profiles" },
        {
        type: "cmd",
        cmd: "/open github | instagram | x | linkedin",
        desc: "Open profiles",
        },
        { type: "cmd", cmd: "/contact", desc: "Contact details" },
        { type: "cmd", cmd: "/clear", desc: "Clear terminal" },

      ]),

    "/about": () =>
      pushLines([
        { type: "text", text: "Name: Mannat Gupta" },
        { type: "text", text: "Age: 21" },
        {
          type: "text",
          text: "Location: Udhampur (182101), Jammu & Kashmir, India",
        },
      ]),

    "/description": () =>
      pushLines([
        {
          type: "text",
          text: "Front-End and Blockchain Developer focused on UI, design systems, and real-world Web3 applications.",
        },
      ]),

    "/education": () =>
      pushLines([
        { type: "label", label: "10th (CBSE)", value: "88.5% (2020)" },
        { type: "label", label: "12th (CBSE)", value: "80.4% (2022)" },
        { type: "label", label: "BE CSE", value: "Chandigarh University" },
        { type: "label", label: "CGPA", value: "7.82 (2022–2026)" },
      ]),

    "/interests": () =>
      pushLines([
        { type: "label", label: "Games", value: "Competitive Chess, Cricket" },
        {
          type: "label",
          label: "Tech",
          value: "Creative Coding, UI/UX Design",
        },
        {
          type: "label",
          label: "Creative",
          value: "Cooking, Poetry Writing",
        },
        {
          type: "label",
          label: "Lifestyle",
          value: "Movies, Travel, Exploration",
        },
      ]),

    "/motivation": () =>
      pushLines([
        {
          type: "label",
          label: "Motivation",
          value:
            "Better than yesterday, even by 0.00001%. Every effort matters.",
        },
      ]),

    "/experience": () =>
      pushLines([
        {
          type: "label",
          label: "Role",
          value: "Blockchain Developer Intern – Metacrafters",
        },
        {
          type: "label",
          label: "Duration",
          value: "Jun 2024 – Sep 2024 (4 months)",
        },
        {
          type: "text",
          text: "Ethereum, Polygon, Solidity, Web3, DApps",
        },
      ]),

    "/skills": () =>
      pushLines([
        {
          type: "label",
          label: "Frontend",
          value: "React, HTML, CSS, JavaScript",
        },
        {
          type: "label",
          label: "Blockchain",
          value: "Solidity, Ethereum, Hardhat, MetaMask",
        },
        {
          type: "label",
          label: "Databases",
          value: "MongoDB, SQL, SQLite",
        },
        {
          type: "label",
          label: "Tools",
          value: "VS Code, GitHub, AWS, Postman",
        },
      ]),

    "/projects": () =>
      pushLines([
        { type: "title", text: "Projects" },

        {
          type: "project",
          index: "1.",
          name: "ManOS.dev",
          intro: "macOS-inspired portfolio OS",
          stack: "React, SCSS",
        },
        {
          type: "project",
          index: "2.",
          name: "Chess.com",
          intro: "Browser-based chess game",
          stack: "JavaScript",
        },

        {
          type: "highlight",
          text: "See more → ",
          cmd: "/open github",
        },
      ]),

    "/socials": () =>
    pushLines([
        { type: "label", label: "GitHub", value: "github.com/mannatgupta146" },
        { type: "label", label: "LinkedIn", value: "linkedin.com/in/mannatgupta146" },
        { type: "label", label: "Instagram", value: "instagram.com/mannat_1411" },
        { type: "label", label: "X", value: "x.com/MannatGupta146" },

        { type: "spacer" },

        {
        type: "highlight",
        text: "See more → ",
        cmd: "/open github | linkedin | instagram | x",
        },
    ]),


    "/open github": () =>
      window.open("https://github.com/mannatgupta146", "_blank"),
    "/open instagram": () =>
      window.open("https://instagram.com/mannat_1411", "_blank"),
    "/open x": () =>
      window.open("https://x.com/MannatGupta146", "_blank"),
    "/open linkedin": () =>
      window.open("https://linkedin.com/in/mannatgupta146", "_blank"),

    "/contact": () =>
    pushLines([
        { type: "label", label: "Email", value: "mannatgupta146@gmail.com" },
        { type: "label", label: "Phone", value: "+91 9541343039" },

        { type: "spacer" },

        {
        type: "highlight",
        text: "You can also find me on → ",
        cmd: "/socials",
        },
    ]),


    "/clear": () => setLines(SYSTEM_LINES),
  };

  const handleEnter = (e) => {
    if (e.key !== "Enter") return;

    const cmd = input.trim();
    if (!cmd) return;

    const valid = !!actions[cmd];

    setLines((prev) => [
      ...prev,
      { type: valid ? "input-ok" : "input-error", text: cmd },
    ]);

    valid
      ? actions[cmd]()
      : pushLines([
          { type: "error", text: `Command not found: ${cmd}` },
        ]);

    setInput("");
  };

  return (
    <MacWindow>
      <div className="cli" ref={terminalRef}>
        {lines.map((l, i) =>
          l.type === "spacer" ? (
            <div key={i} className="spacer" />
          ) : (
            <div key={i} className={`line ${l.type}`}>
              {l.type.startsWith("input") && (
                <>
                  <span className="prompt">mannat@ManOS:$</span>
                  <span className="prompt-space" />
                </>
              )}

              {l.type === "cmd" ? (
                <>
                  <span className="cmd-green">{l.cmd}</span>
                  <span className="cmd-desc"> — {l.desc}</span>
                </>
              ) : l.type === "project" ? (
                <div className="project">
                  <div className="project-name">
                    {l.index} {l.name}
                  </div>
                  <div className="project-intro">{l.intro}</div>
                  <div className="project-stack">
                    Tech stack: <b>{l.stack}</b>
                  </div>
                </div>
              ) : l.type === "highlight" ? (
                <span className="highlight">
                  {l.text}
                  <span className="cmd-green">{l.cmd}</span>
                </span>
              ) : l.type === "label" ? (
                <>
                  <span className="label">{l.label}:</span>{" "}
                  <span className="value">{l.value}</span>
                </>
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
          )
        )}

        <div className="line input-line">
          <span className="prompt">mannat@ManOS:$</span>
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
  );
};

export default Cli;
