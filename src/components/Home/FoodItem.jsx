import Card from "../Main/Card";
import useFetchAllFoodItems from "../../hooks/useFetchAllFoodItems";
import LoadingPage from "../../pages/LoadingPage";
import EmptyResult from "./EmptyResult";
import { useSelector } from "react-redux";
import useCurrentUserRole from "../../hooks/useCurrentUserRole";
import SearchBar from "./SearchBar";
import CategoriesOptions from "./CategoriesOptions";
import { BsFillQuestionOctagonFill } from "react-icons/bs";

function FoodItem() {
  const user = useSelector((state) => state.auth.currentUser);
  const { userRole } = useCurrentUserRole(user?.id);
  const { foods, loading } = useFetchAllFoodItems();

  if (loading) {
    return <LoadingPage />;
  }

  if (foods.length === 0) {
    return (
      <EmptyResult
        icon={<BsFillQuestionOctagonFill size={30} />}
        message="No food found !"
      />
    );
  }
  return (
    <>
      {userRole === "customer" && <SearchBar />}
      {userRole === "customer" && <CategoriesOptions />}
      <div className="flex flex-wrap gap-4 justify-center items-start">
        {foods?.map(
          (food) =>
            userRole === "customer" && (
              <Card
                key={food.id}
                title={food.title}
                shipping={food.shippingInformation}
                price={food.price}
                type={food.type}
                stock={food.stock}
                imageURL={food.images}
                foodId={food.id}
              />
            )
        )}
      </div>
    </>
  );
}

export default FoodItem;
