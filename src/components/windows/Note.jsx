import React, { useEffect, useMemo, useState } from "react"
import MacWindow from "./MacWindow"
import "./Note.scss"

const STORAGE_KEY = "mac_notes_v5"

const makeFileName = (title) => {
  if (!title) return "untitled"
  return title.trim().slice(0, 15)
}

const Note = ({ minimized, onClose, onMinimize, zIndex, onFocus }) => {
  const [notes, setNotes] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [search, setSearch] = useState("")
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const [showList, setShowList] = useState(true)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (!isMobile) {
      setShowList(true)
    }
  }, [isMobile])

  /* LOAD */
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (saved?.length) {
      setNotes(saved)
      setActiveId(saved[0].id)
    }
  }, [])

  /* SAVE */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  const filteredNotes = useMemo(() => {
    return notes.filter((n) =>
      n.title.toLowerCase().includes(search.toLowerCase()),
    )
  }, [notes, search])

  const activeNote = notes.find((n) => n.id === activeId)

  const createNote = () => {
    const title = "Untitled Note"
    const newNote = {
      id: crypto.randomUUID(),
      title,
      fileName: makeFileName(title),
      content: "",
      updatedAt: Date.now(),
    }
    setNotes([newNote, ...notes])
    setActiveId(newNote.id)
    if (isMobile) setShowList(false)
  }

  const updateNote = (field, value) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === activeId
          ? {
              ...n,
              [field]: value,
              fileName: field === "title" ? makeFileName(value) : n.fileName,
              updatedAt: Date.now(),
            }
          : n,
      ),
    )
  }

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id))
    if (id === activeId) {
      setActiveId(null)
      if (isMobile) setShowList(true)
    }
  }

  return (
    <MacWindow
      appId="notes"
      title="Notes"
      minimized={minimized}
      onClose={onClose}
      onMinimize={onMinimize}
      zIndex={zIndex}
      onFocus={onFocus}
    >
      <div className="note-app">
        {/* SIDEBAR */}
        <aside
          className={`sidebar ${isMobile && !showList ? "hidden-mobile" : ""}`}
        >
          <div className="sidebar-toolbar">
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={createNote}>＋</button>
          </div>

          <div className="note-list">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`note-card ${note.id === activeId ? "active" : ""}`}
                onClick={() => {
                  setActiveId(note.id)
                  if (isMobile) setShowList(false)
                }}
              >
                <div className="note-main">
                  <span className="title">{note.fileName}</span>
                  <span className="time">
                    {new Date(note.updatedAt).toLocaleDateString()}
                  </span>
                </div>

                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteNote(note.id)
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </aside>

        {/* EDITOR */}
        <div
          className={`editor-area ${isMobile && showList ? "hidden-mobile" : ""}`}
        >
          {activeNote ? (
            <div className="editor-container">
              {isMobile && (
                <div className="mobile-note-bar">
                  <button onClick={() => setShowList(true)}>← All Notes</button>
                  <span>{activeNote.fileName}</span>
                </div>
              )}

              <span className="timestamp">
                LAST EDITED {new Date(activeNote.updatedAt).toLocaleString()}
              </span>

              <input
                className="title-input"
                value={activeNote.title}
                onChange={(e) => updateNote("title", e.target.value)}
                placeholder="Title"
              />

              <textarea
                className="content-input"
                value={activeNote.content}
                onChange={(e) => updateNote("content", e.target.value)}
                placeholder="Start writing…"
              />
            </div>
          ) : (
            <div className="empty-state">Create or select a note</div>
          )}
        </div>
      </div>
    </MacWindow>
  )
}

export default Note
