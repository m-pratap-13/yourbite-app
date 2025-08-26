import { FaTag, FaTruck, FaRupeeSign } from "react-icons/fa";

export default function CartPrice({ cartFoods }) {

  const cartPrices = cartFoods.map((food) => Number(food.foods.price));
  const totalCartPrice = cartPrices
    .reduce((acc, price) => acc + price, 0)
    .toFixed(2);
  const discountPrice = ((totalCartPrice * 10) / 100).toFixed(2);
  const PLATFORM_FEE = "5";
  const grandTotal = (
    totalCartPrice -
    discountPrice +
    Number(PLATFORM_FEE)
  ).toFixed(2);
  const saveAmount = (totalCartPrice - grandTotal).toFixed(2);

  return (
    <div className="w-full border border-amber-100 rounded-2xl shadow-sm p-4 bg-white text-sm md:text-base">
      <h2 className="text-gray-500 font-semibold border-b pb-2 mb-3">
        PRICE DETAILS
      </h2>

      <div className="flex justify-between mb-2">
        <span className="flex items-center gap-1">
          <FaTag className="text-gray-400" />{" "}
          {`Price (${cartFoods.length} items)`}
        </span>
        <span>₹{totalCartPrice}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="flex items-center gap-1">
          <FaTag className="text-gray-400" /> Discount
        </span>
        {/* DISCOUNT IS CONSTANT NOW BUT WILL BE TAKEN FROM THE BACKEND LATER  */}
        <span className="text-green-600">₹{discountPrice}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="flex items-center gap-1">
          <FaRupeeSign className="text-gray-400" /> Platform Fee
        </span>
        <span>₹{Number(PLATFORM_FEE).toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="flex items-center gap-1">
          <FaTruck className="text-gray-400" /> Delivery Charges
        </span>
        <span className="text-green-600">Free</span>
      </div>

      <hr className="my-3 border-dashed" />

      <div className="flex justify-between font-semibold text-base">
        <span>Total Amount</span>
        <span>₹{grandTotal}</span>
      </div>

      <p className="text-green-600 text-sm mt-2 font-medium">
        You will save ₹ {saveAmount} on this order
      </p>

      <div className="w-full mt-4">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
