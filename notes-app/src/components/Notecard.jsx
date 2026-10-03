// src/components/NoteCard.jsx
import { useState } from 'react';

export default function NoteCard({ note, onUpdate, onDelete, onPin, onArchive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    onUpdate(note.id, { title: title || 'Untitled', content });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="note-card editing">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={4}
          placeholder="Content"
        />
        <div className="card-actions">
          <button onClick={handleCancel}>Cancel</button>
          <button className="primary" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`note-card ${note.pinned ? 'pinned' : ''}`}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <div className="card-actions">
        <button
          onClick={() => onPin(note.id)}
          title={note.pinned ? 'Unpin' : 'Pin'}
        >
          {note.pinned ? '📌' : '📍'}
        </button>
        <button onClick={() => setIsEditing(true)} title="Edit">
          ✏️
        </button>
        <button
          onClick={() => onArchive(note.id)}
          title={note.archived ? 'Unarchive' : 'Archive'}
        >
          {note.archived ? '📤' : '📥'}
        </button>
        <button
          onClick={() => {
            if (window.confirm('Delete this note?')) onDelete(note.id);
          }}
          title="Delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}