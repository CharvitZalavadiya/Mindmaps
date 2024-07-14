"use client";

import axios from "axios";
import { useState, useEffect } from "react";

interface Note {
  id: string;
  title: string;
  description: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>("http://localhost:8080/notes");
        setNotes(response.data);
        console.log(response)
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  return (
    <main className="bg-sidebarGradient rounded-lg tracking-wide leading-relaxed h-[95vh] p-5 -z-10 fixed">
      <ul className="grid grid-cols-4 gap-8 h-auto overflow-y-scroll">
        {notes.map((note) => (
          <li
            key={note.id}
            className="bg-noteBackgroundGradient w-46 h-32 rounded-lg p-4 select-none cursor-pointer hover:bg-opacity-50"
          >
            <h4 className="text-stone-300 font-semibold text-lgFont relative top-1/3 w-3/5 h-10 truncate">
              {note.title}
            </h4>
            <p className="text-stone-500 h-7 w-full relative top-1/3 truncate">
              {note.description}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}
