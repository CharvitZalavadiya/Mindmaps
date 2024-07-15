"use client";

import SideBar from "@/app/_sidebar/page";
import axios from "axios";
import Link from "next/link";
import { useState, useEffect, useMemo, useRef } from "react";

interface Note {
  _id: string;
  id: string;
  title: string;
  description: string;
  color: string;
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>("http://localhost:8080/notes");
        setNotes(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const returnBg = (pickColor: string) => {
    switch (pickColor) {
      case "pink":
        return "bg-pink-500/20 border-pink-500 hover:bg-pink-500/30";
      case "green":
        return "bg-green-500/20 boder-green-500 hover:bg-green-500/30";
      case "yellow":
        return "bg-yellow-500/20 border-yellow-500 hover:bg-yellow-500/30 ";
      case "purple":
        return "bg-purple-500/20 border-purple-500 hover:bg-purple-500/30";
      case "red":
        return "bg-red-500/20 border-red-500 hover:bg-red-500/30";
      case "cyan":
        return "bg-cyan-500/20 border-cyan-500 hover:bg-cyan-500/30";
      case "gray":
        return "bg-gray-500/20 border-gray-500 hover:bg-gray-500/30";
      default:
        return "";
    }
  };
  
  const returnTextColor = (pickColor: string) => {
    switch (pickColor) {
      case "pink":
        return "text-pink-500";
      case "green":
        return "text-green-500";
      case "yellow":
        return "text-yellow-500 ";
      case "purple":
        return "text-purple-500";
      case "red":
        return "text-red-500";
      case "cyan":
        return "text-cyan-500";
      case "gray":
        return "text-gray-500";
      default:
        return "";
    }
  };

  const sidebarComp = useMemo(() => <SideBar />, []);

  const openPopup = (note: Note) => {
    setSelectedNote(note);
  };

  const closePopup = () => {
    setSelectedNote(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (selectedNote) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedNote]);

  return (
    <div className="flex p-3">
      <span>{sidebarComp}</span>

      <main className="bg-sidebarGradient rounded-lg tracking-wide leading-relaxed h-[95vh] p-5 ml-3 w-full">
        <ul className="grid grid-cols-4 gap-4 max-h-full overflow-y-scroll">
          {notes.map((note) => (
            <li
              key={note._id}
              onClick={() => openPopup(note)}
              className={`${returnBg(
                note.color
              )} border w-46 h-32 rounded-lg p-4 select-none cursor-pointer hover:bg-opacity-50`}
            >
              <h4 className="text-slate-200 font-semibold text-lgFont relative top-1/3 w-3/5 h-10 truncate">
                {note.title}
              </h4>
              <p className="text-slate-400 h-7 w-full relative top-1/3 truncate">
                {note.description}
              </p>
            </li>
          ))}
        </ul>

        {selectedNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div ref={popupRef} className="bg-noteEditMode backdrop-blur-md rounded-lg p-6 w-1/3">
              <h2 className="text-xl font-bold mb-4">{selectedNote.title}</h2>
              <p className="text-gray-300 mb-4">{selectedNote.description}</p>
              <button
                onClick={closePopup}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
