"use client";

export interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
  archived: boolean;
}

interface NoteCardProps {
  note: Note;
  deleteNote: (id: number) => void;
  toggleArchive: (id: number) => void;
}

export default function NoteCard({ note, deleteNote, toggleArchive }: NoteCardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h3 className="font-bold text-lg mb-1">{note.title}</h3>
      <p className="text-sm text-gray-500">{note.date}</p>
      <p className="mt-2 text-gray-700">{note.content}</p>

      <div className="flex gap-2 mt-4">
        <button
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
          onClick={() => deleteNote(note.id)}
        >
          Delete
        </button>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded"
          onClick={() => toggleArchive(note.id)}
        >
          {note.archived ? "Tidak Arsip" : "Arsip"}
        </button>
      </div>
    </div>
  );
}
