"use client";
import React, { useState, useEffect, useMemo, useRef } from "react";
import axios from "axios";
import SideBar from "@/app/_sidebar/page";
import TopBar from "../_topbar/page";
import { useAuth } from "@clerk/nextjs";

interface Note {
  _id: string;
  id: string;
  title: string;
  description: string;
  color: string;
  userId: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const popupRef = useRef<HTMLDivElement>(null);

  const { userId } = useAuth();
  console.log(userId);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get<Note[]>("http://localhost:8080/notes");
        setNotes(response.data);
        setFilteredNotes(response.data); // Initialize filtered notes with all notes
        console.log(response);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  useEffect(() => {
    // Filter notes based on search query and selected color
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (note.color === selectedColor || selectedColor === "black")
      )
    );
  }, [searchQuery, notes, selectedColor]);

  const colorArray = [
    "pink",
    "green",
    "yellow",
    "purple",
    "red",
    "cyan",
    "gray",
  ];

  const returnBg = (pickColor: string) => {
    switch (pickColor) {
      case "pink":
        return "bg-pink-500/20 border-pink-500 hover:bg-pink-500/30";
      case "green":
        return "bg-green-500/20 border-green-500 hover:bg-green-500/30";
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

  const returnBgforPopup = (pickColor: string) => {
    switch (pickColor) {
      case "pink":
        return "bg-pink-500/40 border-pink-500 hover:bg-pink-500/60";
      case "green":
        return "bg-green-500/40 border-green-500 hover:bg-green-500/60";
      case "yellow":
        return "bg-yellow-500/40 border-yellow-500 hover:bg-yellow-500/60 ";
      case "purple":
        return "bg-purple-500/40 border-purple-500 hover:bg-purple-500/60";
      case "red":
        return "bg-red-500/40 border-red-500 hover:bg-red-500/60";
      case "cyan":
        return "bg-cyan-500/40 border-cyan-500 hover:bg-cyan-500/60";
      case "gray":
        return "bg-gray-500/40 border-gray-500 hover:bg-gray-500/60";
      default:
        return "";
    }
  };

  const sidebarComp = useMemo(() => <SideBar />, []);

  const openPopup = (note: Note) => {
    setSelectedNote(note);
    setEditedTitle(note.title);
    setEditedDescription(note.description);
    setSelectedColor(note.color);
  };

  const closePopup = () => {
    setSelectedNote(null);
    setEditedTitle("");
    setEditedDescription("");
  };

  const handleSaveChanges = async () => {
    if (!selectedNote) return;
  
    try {
      const updatedNote = {
        ...selectedNote,
        title: editedTitle,
        description: editedDescription,
        color: selectedColor,
      };
  
      await axios.post(
        `http://localhost:8080/notes/${selectedNote._id}`,
        updatedNote
      );
  
      // Update notes and reset filteredNotes to include all notes
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        )
      );
  
      // setFilteredNotes(notes); // Reset filteredNotes to include all notes
  
      closePopup();
    } catch (error) {
      console.error("Error updating note:", error);
    }
  };
  

  const handleDeleteNote = async () => {
    if (!selectedNote) return;

    try {
      await axios.delete(`http://localhost:8080/notes/${selectedNote._id}`);
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note._id !== selectedNote._id)
      );
      closePopup();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreateNewNote = async () => {
    const newNote = {
      userId: userId,
      title: "New Note Title",
      description: "New Note Description",
      color: "gray", // Default color or any other logic for color selection
    };

    try {
      const response = await axios.post<Note>(
        "http://localhost:8080/notes",
        newNote
      );
      const createdNote = response.data;
      setNotes((prevNotes) => [...prevNotes, createdNote]);
      setFilteredNotes((prevNotes) => [...prevNotes, createdNote]);
      openPopup(createdNote); // Open the newly created note for editing
    } catch (error) {
      console.error("Error creating new note:", error);
    }
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
  };

  useEffect(() => {
    // Filter notes based on search query and selected color
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (selectedColor === "black" || note.color === selectedColor)
      )
    );
  }, [searchQuery, notes, selectedColor]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
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

      <main className="bg-sidebarGradient rounded-lg tracking-wide leading-relaxed h-[95vh] overflow-y-scroll p-5 ml-3 w-full">
        <span className="top-0 sticky">
          <TopBar onSearch={handleSearch} onCreateNote={handleCreateNewNote} onColorChange={handleColorChange} />
        </span>
        <span>
          <ul className="grid grid-cols-4 gap-4 max-h-full overflow-y-scroll">
            {filteredNotes.map((note) => (
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
        </span>

        {selectedNote && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div
              ref={popupRef}
              className="bg-noteEditMode backdrop-blur-md rounded-lg p-6 w-2/3 h-3/4"
            >
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full mb-4 text-xl font-bold px-3 focus:outline-none py-2 bg-transparent rounded"
                placeholder="Title"
              />
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="w-full mb-4 px-3 py-2 border-none focus:outline-none rounded bg-transparent"
                rows={4}
                style={{ width: "100%", height: "300px", resize: "none" }}
                placeholder="Description"
              />
              <div className="flex">
                <span className="rounded py-1 px-3 w-1/2 overflow-x-auto flex gap-2">
                  {colorArray.map((color) => (
                    <ul className="py-1">
                      <li
                        key={color}
                        className={`${returnBgforPopup(
                          color
                        )} w-6 h-6 rounded-full hover:cursor-pointer ${
                          color === selectedColor ? "border-2 border-solid" : ""
                        }`}
                        onClick={() => setSelectedColor(color)}
                      ></li>
                    </ul>
                  ))}
                </span>

                <span className="flex justify-between w-1/2">
                  <button
                    onClick={handleDeleteNote}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleSaveChanges}
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={closePopup}
                    className="bg-gray-300 text-gray-700 px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Notes;
