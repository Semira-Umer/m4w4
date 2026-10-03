// src/hooks/useNotes.js
import { useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

export function useNotes() {
  const [notes, setNotes] = useLocalStorage('notes-app-data', []);

  // CREATE
  const addNote = useCallback(
    ({ title, content }) => {
      const newNote = {
        id: crypto.randomUUID(),
        title: title.trim(),
        content: content.trim(),
        pinned: false,
        archived: false,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setNotes((prev) => [newNote, ...prev]);
      return newNote;
    },
    [setNotes]
  );

  // UPDATE (edit content/title)
  const updateNote = useCallback(
    (id, updates) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? { ...note, ...updates, updatedAt: Date.now() }
            : note
        )
      );
    },
    [setNotes]
  );

  // DELETE
  const deleteNote = useCallback(
    (id) => {
      setNotes((prev) => prev.filter((note) => note.id !== id));
    },
    [setNotes]
  );

  // TOGGLE PIN
  const togglePin = useCallback(
    (id) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? {
                ...note,
                pinned: !note.pinned,
                // Unpin when archiving
                archived: !note.pinned ? false : note.archived,
                updatedAt: Date.now(),
              }
            : note
        )
      );
    },
    [setNotes]
  );

  // TOGGLE ARCHIVE
  const toggleArchive = useCallback(
    (id) => {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === id
            ? {
                ...note,
                archived: !note.archived,
                // Unpin when archiving
                pinned: !note.archived ? false : note.pinned,
                updatedAt: Date.now(),
              }
            : note
        )
      );
    },
    [setNotes]
  );

  // Derived filtered lists (memoized)
  const { activeNotes, pinnedNotes, archivedNotes } = useMemo(() => {
    return {
      activeNotes: notes.filter((n) => !n.archived),
      pinnedNotes: notes.filter((n) => n.pinned && !n.archived),
      archivedNotes: notes.filter((n) => n.archived),
    };
  }, [notes]);

  // Get notes for a specific view, with pinned first
  const getNotesByView = useCallback(
    (view) => {
      switch (view) {
        case 'pinned':
          return pinnedNotes;
        case 'archived':
          return archivedNotes;
        case 'all':
        default: {
          const pinned = activeNotes.filter((n) => n.pinned);
          const others = activeNotes.filter((n) => !n.pinned);
          return [...pinned, ...others];
        }
      }
    },
    [activeNotes, pinnedNotes, archivedNotes]
  );

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    getNotesByView,
    counts: {
      all: activeNotes.length,
      pinned: pinnedNotes.length,
      archived: archivedNotes.length,
    },
  };
}