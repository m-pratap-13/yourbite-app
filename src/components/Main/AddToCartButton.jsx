import useCartFoodsId from "../../hooks/useCartFoodsId";
import useFetchCartFoods from "../../hooks/useFetchCartFoods";
import productService from "../../supabase/supabaseListingProduct";
import { useSelector } from "react-redux";

function AddToCartButton({ foodId, stock }) {
  const userId = useSelector((state) => state.auth.currentUser).id;
  const { cartId, refreshCardBtn } = useCartFoodsId(userId);
  const { refreshCart } = useFetchCartFoods(userId);

  const isAdded = (cartId || []).includes(foodId);

  const handleAddToCart = async (foodId) => {
    if (!isAdded) {
      await productService.addToCart({ userId, foodId });
      refreshCardBtn();
      refreshCart();
    } else {
      await productService.deleteFromCart(foodId);
      refreshCardBtn();
      refreshCart();
    }
  };
  return (
    <button
      className={`mt-3 w-full  text-white font-semibold py-2 rounded-lg transition-all duration-300 cursor-pointer ${
        stock > 0
          ? "bg-green-500 hover:bg-green-600"
          : "bg-gray-400 cursor-not-allowed"
      } ${
        isAdded 
          ? "bg-indigo-400 hover:bg-indigo-500"
          : "bg-blue-500 "
      }`}
      onClick={() => handleAddToCart(foodId)}
      disabled={stock == 0}
    >
      {isAdded ? "Remove From Cart" : "Add To Cart"}
    </button>
  );
}

export default AddToCartButton;
