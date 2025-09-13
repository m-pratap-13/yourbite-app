import { useSelector } from "react-redux";
import useFetchCartFoods from "../hooks/useFetchCartFoods";
import productService from "../supabase/supabaseListingProduct";
import CartPrice from "../components/Main/CartPrice";
import EmptyResult from "../components/Home/EmptyResult";
import { FaCartPlus } from "react-icons/fa";
import ItemCard from "../components/Main/ItemCard";

function AddToCartPage() {
  const userId = useSelector((state) => state.auth.currentUser).id;
  const { cartFoods } = useFetchCartFoods(userId);
  const handleRemoveFromCart = async (foodId) => {
    await productService.deleteFromCart(foodId, userId);
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
        {cartFoods.map((cart) => (
          <ItemCard
            key={cart.foods.id}
            foodId={cart.foods.id}
            foodQuantity={cart.quantity}
            title={cart.foods.title}
            description={cart.foods.description}
            shipping={cart.foods.shippingInformation}
            category={cart.foods.category}
            price={cart.foods.price}
            type={cart.foods.type}
            stock={cart.foods.stock}
            imageURL={cart.foods.images}
            onRejected={() => handleRemoveFromCart(cart.foods.id)}
            pageType="addToCart"
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
