"use client";
import NoteCard, { Note } from "./NoteCard";

interface NoteListProps {
  notes: Note[];
  deleteNote: (id: number) => void;
  toggleArchive: (id: number) => void;
  showArchive: boolean;
}

export default function NoteList({
  notes,
  deleteNote,
  toggleArchive,
  showArchive,
}: NoteListProps) {
  return (
    <div className="mt-6">
      {notes.filter((note) => note.archived === showArchive).length === 0 ? (
        <p className="text-gray-500">Belum ada catatan</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {notes
            .filter((note) => note.archived === showArchive)
            .map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                deleteNote={deleteNote}
                toggleArchive={toggleArchive}
              />
            ))}
        </div>
      )}
    </div>
  );
}
