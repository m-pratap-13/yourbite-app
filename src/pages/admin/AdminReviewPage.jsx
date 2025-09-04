import ItemCard from "../../components/Main/ItemCard";
import useFetchAllFoodItems from "../../hooks/useFetchAllFoodItems";
import { BsFillQuestionOctagonFill } from "react-icons/bs";
import LoadingPage from "../LoadingPage";
import EmptyResult from "../../components/Home/EmptyResult";
import productService from "../../supabase/supabaseListingProduct";
import { useParams } from "react-router-dom";

function AdminReviewPage() {
  const { pageType } = useParams();

  const { pendingFoods, rejectedFoods, foods, loading } =
    useFetchAllFoodItems();

  const handleApproved = async (foodId) => {
    await productService.updateStatus(foodId, "approved", "admin_approval");
  };

  const handleRejected = async (foodId) => {
    await productService.updateStatus(foodId, "rejected", "admin_approval");
  };

  if (loading) {
    return <LoadingPage />;
  }

  const foodItems =
    pageType === "pending"
      ? pendingFoods
      : pageType === "approved"
      ? foods
      : rejectedFoods;

  if (!foodItems || foodItems.length === 0) {
    return (
      <EmptyResult
        icon={<BsFillQuestionOctagonFill size={30} />}
        result={`No ${pageType} food found!`}
      />
    );
  }
  return (
    <div className="p-6 flex flex-col justify-center  gap-3">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 ">
        {pageType === "pending"
          ? "Pending Products"
          : pageType === "approved"
          ? "Approved Products"
          : "Rejected Products"}
      </h2>
      {foodItems.map((food) => (
        <ItemCard
          key={food.id}
          title={food.title}
          description={food.description}
          shipping={food.shippingInformation}
          category={food.category}
          price={food.price}
          type={food.type}
          stock={food.stock}
          imageURL={food.images}
          shopName={food.users.restaurantName}
          onApproved={() => handleApproved(food.id)}
          onRejected={() => handleRejected(food.id)}
          adminApproval={food.admin_approval}
          pageType={pageType}
        />
      ))}
    </div>
  );
}

export default AdminReviewPage;
