import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

function SearchBar() {
   const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.length === 0) {
      navigate("/");
    } else {
      navigate(`/search/${query}`);
    }
  };

  return (
    <form
      className="flex items-center bg-white rounded-lg shadow px-4 py-2 mb-4"
      onSubmit={handleSubmit}
    >
      <FiSearch className="text-gray-500" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search menu..."
        className="flex-1 px-2 outline-none"
      />
      <button type="submit" className="hidden">
        <FiSearch />
      </button>
    </form>
  );
}

export default SearchBar;
