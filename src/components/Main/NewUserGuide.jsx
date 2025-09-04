import React from "react";
import { Link } from "react-router-dom";

function NewUserGuide({ name, image, description, buttonText, slug }) {
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-2xl rounded-xl space-y-6">
      <div className="w-full h-56 overflow-hidden rounded-lg border-2  border-gray-300 flex items-center justify-center">
        <img src={image} alt={name} className="object-cover h-full w-full" />
      </div>

      {/* Seller Info */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">
          If You Are a <span className="text-green-600">{name}</span>
        </h2>
      </div>

      {/* Description Box */}
      <div className="w-full bg-gray-50 border border-gray-300 p-4 rounded-md shadow-sm">
        <p className="text-gray-700 leading-relaxed text-sm">{description}</p>
      </div>

      {/* Create Button */}
      <div className="text-center">
        <Link
          to={slug}
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-6 py-2 rounded-md transition duration-300 shadow cursor-pointer"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}

export default NewUserGuide;
