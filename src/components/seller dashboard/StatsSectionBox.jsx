import React from "react";

function StatsSectionBox({ name, value }) {
  return (
    <div className="shadow-md rounded-2xl p-4 text-center bg-white">
      <h3 className="text-gray-500 text-sm">{name}</h3>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

export default StatsSectionBox;
