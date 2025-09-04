import React from "react";

function Graph({ section }) {
  return (
    <div className="shadow-md rounded-2xl bg-white p-4">
      <h3 className="text-lg font-semibold mb-2">{section} Graph</h3>
      <div className="w-full h-44 flex items-center justify-center text-gray-400">
        <p className="italic">[Graph Placeholder]</p>
      </div>
    </div>
  );
}

export default Graph;
