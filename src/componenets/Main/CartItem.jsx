import React from "react";
import { FiTrash2 } from "react-icons/fi";

function CartItem({
  foodId,
  title,
  shipping,
  price,
  type,
  imageURL,
  removeCart,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-amber-100 p-4 bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300">
      <img
        src={imageURL}
        alt={title}
        className="w-full sm:w-28 sm:h-28 h-40 rounded-xl object-cover border"
      />
      <div className="flex-1 flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
            {title}
          </h3>

          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <span
              className={`text-xs sm:text-sm font-medium px-2 py-0.5 rounded-full ${
                type?.toLowerCase() === "veg"
                  ? "bg-green-50 text-green-600"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {type}
            </span>
            {shipping && (
              <span className="text-xs text-blue-600 font-medium">
                🚚 {shipping}
              </span>
            )}
            <p className="text-lg sm:text-xl font-bold text-green-700">
              ₹{price}
            </p>
          </div>
        </div>
        <button
          onClick={removeCart}
          className="mt-3 sm:mt-0 sm:ml-4 p-2 sm:p-3 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition flex justify-center items-center cursor-pointer"
        >
          <FiTrash2 className="text-lg sm:text-xl" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
