import React from "react";
import ProductListingForm from "../components/Main/ProductListingForm";
import { useParams } from "react-router-dom";
import useSingleFood from "../hooks/useSingleFood";

function UpdatePage() {
  const { foodId } = useParams();
  const { food } = useSingleFood(foodId);

  return (
    <div className="w-full mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <ProductListingForm food={food} />
      </div>
    </div>
  );
}

export default UpdatePage;
