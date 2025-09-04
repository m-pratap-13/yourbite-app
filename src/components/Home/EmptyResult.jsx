import React from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import SearchBar from "./SearchBar";
import CategoriesOptions from "./CategoriesOptions";
import { useSelector } from "react-redux";
import useCurrentUserRole from "../../hooks/useCurrentUserRole";
import { Link } from "react-router-dom";
import { PiMaskSadBold } from "react-icons/pi";

export default function EmptyResult({
  result = "No results found!",
  icon=<PiMaskSadBold size={40} />,
  suggest,
}) {
  const user = useSelector((state) => state.auth.currentUser);
  const { userRole } = useCurrentUserRole(user?.id);
  return (
    <>
      {userRole === "customer" && <SearchBar />}
      {userRole === "customer" && <CategoriesOptions />}
      <div className="flex flex-col items-center justify-center text-center py-12 gap-5">
        <div className="bg-gray-100 p-6 rounded-full">{icon}</div>
        <h2 className="mt-4 text-lg font-semibold text-gray-700">{result}</h2>
        <p className="text-gray-500 text-sm mt-1">{suggest}</p>
        {userRole === "seller" && (
          <Link
            to="/seller/add-product"
            className="flex items-center gap-2 px-5 py-3 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-green-600 shadow-lg hover:from-green-500 hover:to-green-700 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <FiPlus className="w-6 h-6" />
            Add Your Product
          </Link>
        )}
      </div>
    </>
  );
}
