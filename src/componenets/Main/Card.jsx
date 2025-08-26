import { BiBowlRice } from "react-icons/bi";
import { GiChickenOven } from "react-icons/gi";
import AddToCartButton from "./AddToCartButton";
import { useNavigate } from "react-router-dom";

function Card({ foodId, title, shipping, price, type, stock, imageURL }) {
  const navigate = useNavigate();
  const handleClick = (id, foodName) => {
    navigate(`/food/${id}/${foodName}`);
  };

  return (
    <div className="max-w-xs rounded-2xl overflow-hidden shadow-md p-4 transition-all duration-300 border border-gray-300  hover:border-green-500">
      <img
        src={imageURL}
        alt={title}
        className="rounded-xl md:object-cover md:w-38 md:h-24 border cursor-pointer border-gray-200"
        loading="lazy"
        onClick={() => handleClick(foodId, title)}
      />
      <h3 className="mt-2 font-semibold text-lg">{title}</h3>
      <p className="text-gray-500 text-xs">{`Delivered within ${shipping}`}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-600 font-bold">₹{price}</p>
        <span className="text-red-500 flex items-center gap-1 text-sm">
          {type === "Veg" ? (
            <BiBowlRice size={20} />
          ) : (
            <GiChickenOven size={20} />
          )}{" "}
          {type}
        </span>
      </div>
      <p className="text-gray-500 text-xs">
        Only <span className="font-bold text-red-500">{stock}</span> left in
        stock!
      </p>
      <AddToCartButton key={foodId} foodId={foodId} stock={stock} />
    </div>
  );
}

export default Card;
