import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import productService from "../../supabase/supabaseListingProduct";
import { useSelector } from "react-redux";

function QuantityButton({ foodId, stock, foodQuantity, min = 1, max = stock }) {
  const userId = useSelector((state) => state.auth.currentUser).id;
  const [quantity, setQuantity] = useState(foodQuantity);

  const handleChange = async (value) => {
    setQuantity((prev) => {
      const newValue = prev + value;
      if (newValue < min) return prev;
      if (newValue > max) return prev;
      productService.updateCartsQuantity(userId, foodId, newValue);
      return newValue;
    });
  };

  return (
    <div className="flex items-center gap-2 bg-white rounded-lg shadow-sm border border-gray-200 px-2 py-1 w-fit">
      <button
        onClick={() => handleChange(-1)}
        disabled={quantity <= min}
        className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
      >
        <FiMinus className="w-4 h-4" />
      </button>

      <span className="text-sm font-medium w-6 text-center select-none">
        {quantity}
      </span>

      <button
        onClick={() => handleChange(+1)}
        disabled={quantity >= max}
        className="flex items-center justify-center w-7 h-7 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition cursor-pointer"
      >
        <FiPlus className="w-4 h-4" />
      </button>
    </div>
  );
}

export default QuantityButton;
