import React from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar() {
  return (
    <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 mb-4">
      <FiSearch className="text-gray-500" />
      <input
        type="text"
        placeholder="Search menu..."
        className="flex-1 px-2 outline-none"
      />
    </div>
  );
}

export default SearchBar;
