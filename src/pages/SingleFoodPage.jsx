import useSingleFood from "../hooks/useSingleFood";
import { useParams } from "react-router-dom";
import { FaStore, FaMapMarkerAlt } from "react-icons/fa";
import AddToCartButton from "../components/Main/AddToCartButton";
import { CiMail } from "react-icons/ci";

export default function SingleFoodPage() {
  const { foodId } = useParams();
  const { food } = useSingleFood(foodId);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 md:p-8">
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6 md:flex gap-6">
        <img
          src={food.images}
          alt={food.title}
          className="w-full md:w-1/2 h-60 md:h-90 object-cover rounded-xl"
        />
        <div className="flex flex-col justify-between mt-4 md:mt-0 md:w-1/2">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {food.title}
            </h2>
            <p className="text-lg text-gray-600 mb-1">
              <span className="font-semibold">Price:</span> ₹{food.price}
            </p>
            <p className="text-lg text-gray-600 mb-1">
              <span className="font-semibold">Category:</span> {food.category}
            </p>

            <p className="text-gray-700 mt-3 text-base leading-relaxed mb-1">
              {food.description}
            </p>
            <p className="text-lg text-gray-600 mb-1">
              <span className="font-semibold">Ingredients:</span>{" "}
              {food?.ingredients?.[0]}
            </p>
          </div>
          <AddToCartButton foodId={food.id} stock={food.stock} />
        </div>
      </div>

      {/* Shop Section */}
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-2xl p-6 mt-8 md:flex gap-6">
        <img
          src={food.users?.shopImage}
          alt="Shop"
          className="w-full md:w-1/3 h-48 object-cover rounded-xl"
        />
        <div className="flex flex-col justify-center mt-4 md:mt-0 md:w-2/3 space-y-3">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Shop Details</h3>

          <div className="flex items-center gap-3 text-gray-700">
            <FaStore className="text-green-600 text-lg" />
            <span className="text-base md:text-lg">
              {food.users?.restaurantName}
            </span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <CiMail className="text-blue-600 text-lg" />
            <span className="text-base md:text-lg">{food.users?.email}</span>
          </div>

          <div className="flex items-center gap-3 text-gray-700">
            <FaMapMarkerAlt className="text-red-600 text-lg" />
            <span className="text-base md:text-lg">
              {`${food.users?.address}, ${food.users?.city}, ${food.users?.state}`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
