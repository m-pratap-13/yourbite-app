import React from "react";
import ProductListingForm from "../components/Main/ProductListingForm";

function ProductListingPage() {
  return (
    <div className="w-full mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        <ProductListingForm />
      </div>
    </div>
  );
}

export default ProductListingPage;
