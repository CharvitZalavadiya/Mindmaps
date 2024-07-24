import React, { useState, useEffect } from "react";

interface TopBarProps {
  onSearch: (query: string) => void;
  onCreateNote: () => void;
  onColorChange: (color: string) => void;
  selectedColor: string; // New prop
}

const TopBar: React.FC<TopBarProps> = ({
  onSearch,
  onCreateNote,
  onColorChange,
  selectedColor // Destructure the new prop
}) => {
  const [searchText, setSearchText] = useState("");

  const colorArray = [
    "black",
    "pink",
    "green",
    "yellow",
    "purple",
    "red",
    "cyan",
    "gray",
  ];

  const returnBg = (pickColor: string) => {
    const baseClass = `${pickColor === selectedColor ? "border-2" : ""}`;
    switch (pickColor) {
      case "black":
        return `${baseClass} bg-black/50 hover:bg-black/70`;
      case "pink":
        return `${baseClass} bg-pink-500/50 hover:bg-pink-500/70`;
      case "green":
        return `${baseClass} bg-green-500/50 hover:bg-green-500/70`;
      case "yellow":
        return `${baseClass} bg-yellow-500/50 hover:bg-yellow-500/70`;
      case "purple":
        return `${baseClass} bg-purple-500/50 hover:bg-purple-500/70`;
      case "red":
        return `${baseClass} bg-red-500/50 hover:bg-red-500/70`;
      case "cyan":
        return `${baseClass} bg-cyan-500/50 hover:bg-cyan-500/70`;
      case "gray":
        return `${baseClass} bg-gray-500/50 hover:bg-gray-500/70`;
      default:
        return "";
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    onSearch(event.target.value);
  };

  const handleColorClick = (color: string) => {
    onColorChange(color); // Notify parent of color change
  };

  return (
    <div className="flex gap-3 mb-3 justify-evenly backdrop-blur-lg">
      <div className="flex gap-3 w-2/3">
        <span className="w-full bg-navBlockBackground rounded-full py-1 px-1 flex">
          <span className="material-symbols-outlined rounded-full p-1 px-2 select-none hover:cursor-pointer">
            search
          </span>
          <input
            type="text"
            value={searchText}
            onChange={handleSearchChange}
            className="w-full px-2 bg-transparent focus:outline-none"
            placeholder="Search by Title"
          />
        </span>
        <button
          onClick={onCreateNote}
          className="bg-navBlockBackground rounded-full py-2 gap-2 px-3 flex place-content-center"
        >
          <span className="material-symbols-outlined rounded-full select-none hover:cursor-pointer">
            add
          </span>
          New
        </button>
      </div>
      <span className="bg-navBlockBackground rounded-full py-1 px-3 max-w-1/3 overflow-x-auto flex gap-2">
        {colorArray.map((color) => (
          <ul className="py-1" key={color}>
            <li
              className={`${returnBg(color)} w-6 h-6 rounded-full hover:cursor-pointer`}
              onClick={() => handleColorClick(color)}
            ></li>
          </ul>
        ))}
      </span>
    </div>
  );
};

export default TopBar;
