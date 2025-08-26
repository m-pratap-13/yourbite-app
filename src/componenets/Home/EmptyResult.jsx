import React from "react";
import { FiSearch } from "react-icons/fi";
import SearchBar from "./SearchBar";
import CategoriesOptions from "./CategoriesOptions";
import { useSelector } from "react-redux";
import useCurrentUserRole from "../../hooks/useCurrentUserRole";

export default function EmptyResult({
  result = "No results found!",
  icon,
  suggest,
}) {
  const user = useSelector((state) => state.auth.currentUser);
  const { userRole } = useCurrentUserRole(user?.id);
  return (
    <>
      {userRole === "customer" && <SearchBar />}
      {userRole === "customer" && <CategoriesOptions />}
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="bg-gray-100 p-6 rounded-full">{icon}</div>
        <h2 className="mt-4 text-lg font-semibold text-gray-700">{result}</h2>
        <p className="text-gray-500 text-sm mt-1">{suggest}</p>
      </div>
    </>
  );
}
