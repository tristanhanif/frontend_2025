"use client";
import { useState } from "react";
import NoteForm from "./component/NoteForm";
import NoteList from "./component/NoteList";
import { Note } from "./component/NoteCard";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [showArchive, setShowArchive] = useState(false);
  const [search, setSearch] = useState("");

  const addNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      archived: false,
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleArchive = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-8 py-6"> {/* ✅ rapat kiri kanan */}
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Notes</h1>
        <input
          type="text"
          placeholder="Cari Catatan..."
          className="border border-gray-400 border-opacity-25 px-3 py-2 rounded w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Garis */}
      <hr className="border border-gray-400 opacity-50 mt-12" /> {/* ✅ mt-12 */}

      {/* Form */}
      <div className="mt-8">
        <NoteForm addNote={addNote} />
      </div>

      {/* Arsip toggle */}
      <div className="flex items-center mt-6">
        <input
          type="checkbox"
          checked={showArchive}
          onChange={() => setShowArchive(!showArchive)}
          className="mr-2"
        />
        <span className="text-sm">Tampilkan Arsip</span>
      </div>

      {/* List */}
      <NoteList
        notes={filteredNotes}
        deleteNote={deleteNote}
        toggleArchive={toggleArchive}
        showArchive={showArchive}
      />
    </div>
  );
}
