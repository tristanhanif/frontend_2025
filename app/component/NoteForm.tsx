"use client";
import { useState } from "react";

interface NoteFormProps {
  addNote: (title: string, content: string) => void;
}

export default function NoteForm({ addNote }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    addNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-12 max-w-2xl mx-auto">
      {/* Judul rata tengah */}
      <h2 className="text-xl font-semibold text-center mb-4">Buat Catatan</h2>

      {/* Input Judul dengan counter */}
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Judul"
          maxLength={50}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />
        <span className="absolute right-2 top-2 text-sm text-gray-500">
          {title.length}/50
        </span>
      </div>

      {/* Textarea besar */}
      <textarea
        placeholder="Catatan"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border px-3 py-3 w-full h-40 rounded mb-4 resize-none"
      />

      {/* Tombol hijau full width */}
      <button
        type="submit"
        className="bg-green-700 hover:bg-green-800 text-white font-semibold px-4 py-2 w-full rounded"
      >
        Simpan
      </button>
    </form>
  );
}
