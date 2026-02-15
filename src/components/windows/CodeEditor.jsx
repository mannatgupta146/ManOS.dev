import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import MacWindow from "./MacWindow";
import "./CodeEditor.scss";

const CodeEditor = ({ minimized, onClose, onMinimize }) => {
  const [code, setCode] = useState(
    `console.log("Hello Mannat 👋");`
  );
  const [output, setOutput] = useState("");

  const runCode = () => {
    setOutput("");

    const originalLog = console.log;
    const originalError = console.error;

    console.log = (...args) => {
      setOutput((prev) => prev + args.join(" ") + "\n");
      originalLog(...args);
    };

    console.error = (...args) => {
      setOutput((prev) => prev + "❌ " + args.join(" ") + "\n");
      originalError(...args);
    };

    try {
      // ⚠️ JS ONLY — controlled execution
      new Function(code)();
    } catch (err) {
      setOutput("❌ Error: " + err.message);
    }

    console.log = originalLog;
    console.error = originalError;
  };

  return (
    <MacWindow title="Code Editor" minimized={minimized} onClose={onClose} onMinimize={onMinimize}>
      <div className="code-editor-app">
        {/* Toolbar */}
        <div className="editor-toolbar">
          <span className="filename">index.js</span>

          <button className="run-btn" onClick={runCode}>
            ▶ Run
          </button>
        </div>

        {/* Editor */}
        <div className="editor-container">
          <Editor
            height="100%"
            theme="vs-dark"
            language="javascript"
            value={code}
            onChange={(v) => setCode(v || "")}
            options={{
              fontSize: 14,
              minimap: { enabled: false },
              wordWrap: "on",
              automaticLayout: true,
              mouseWheelZoom: false,
            }}
          />
        </div>

        {/* Output */}
        <div className="output-panel">
          <div className="output-title">Output</div>
          <pre>{output || "—"}</pre>
        </div>
      </div>
    </MacWindow>
  );
};

export default CodeEditor;
