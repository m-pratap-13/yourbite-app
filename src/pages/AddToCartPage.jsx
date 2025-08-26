import { useSelector } from "react-redux";
import useFetchCartFoods from "../hooks/useFetchCartFoods";
import CartItem from "../componenets/Main/CartItem";
import productService from "../supabase/supabaseListingProduct";
import CartPrice from "../componenets/Main/CartPrice";
import EmptyResult from "../componenets/Home/EmptyResult";
import { FaCartPlus } from "react-icons/fa";

function AddToCartPage() {
  const userId = useSelector((state) => state.auth.currentUser).id;
  const { cartFoods, refreshCart } = useFetchCartFoods(userId);
  const handleRemoveFromCart = async (foodId) => {
    await productService.deleteFromCart(foodId);
    refreshCart();
  };

  if (cartFoods.length === 0) {
    return (
      <EmptyResult
        icon={<FaCartPlus size={50} className="text-gray-400" />}
        result=" Your CART is empty !"
        suggest="Explore our wide selection and find something you like"
      />
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex gap-2 flex-col lg:w-[60%]">
        {cartFoods.map((food) => (
          <CartItem
            key={food.foods.id}
            title={food.foods.title}
            shipping={food.foods.shippingInformation}
            price={food.foods.price}
            type={food.foods.type}
            stock={food.foods.stock}
            imageURL={food.foods.images}
            removeCart={() => handleRemoveFromCart(food.foods.id)}
          />
        ))}
      </div>
      <div className="lg:w-[40%]">
        <CartPrice cartFoods={cartFoods} />
      </div>
    </div>
  );
}

export default AddToCartPage;
