// src/App.jsx
import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useNotes } from './hooks/useNotes';
import Navbar from './components/Navbar';
import NoteForm from './components/noteform';
import NotesList from './components/Noteslist';

function NotesApp() {
  const [view, setView] = useState('all');
  const {
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    getNotesByView,
    counts,
  } = useNotes();

  const visibleNotes = getNotesByView(view);

  return (
    <div className="container">
      <Navbar view={view} setView={setView} counts={counts} />

      <main>
        {view !== 'archived' && <NoteForm onAdd={addNote} />}

        <NotesList
          notes={visibleNotes}
          onUpdate={updateNote}
          onDelete={deleteNote}
          onPin={togglePin}
          onArchive={toggleArchive}
        />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <NotesApp />
    </ThemeProvider>
  );
}