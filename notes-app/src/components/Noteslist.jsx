// src/components/NotesList.jsx
import NoteCard from './notecard';

export default function NotesList({ notes, ...handlers }) {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <p>No notes here yet.</p>
      </div>
    );
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} {...handlers} />
      ))}
    </div>
  );
}