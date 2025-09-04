import Card from "../components/Main/Card";
import useFetchCategoryFoods from "../hooks/useFetchCategoryFoods";
import { useParams } from "react-router-dom";
import EmptyResult from "../components/Home/EmptyResult";
import { TbMoodLookUp } from "react-icons/tb";
import useCurrentUserRole from "../hooks/useCurrentUserRole";
import { useSelector } from "react-redux";
import SearchBar from "../components/Home/SearchBar";
import CategoriesOptions from "../components/Home/CategoriesOptions";

function CategoryPage() {
  const { categoryName } = useParams();
  const { categoryFoods } = useFetchCategoryFoods(categoryName);
  const user = useSelector((state) => state.auth.currentUser);
  const { userRole } = useCurrentUserRole(user?.id);

  if (categoryFoods.length === 0) {
    return (
      <EmptyResult
        icon={<TbMoodLookUp size={50} className="text-gray-400" />}
        result="No foods available in this category !"
        suggest=" Try adjusting your filters or search again."
      />
    );
  }
  return (
    <>
      {userRole === "customer" && <SearchBar />}
      {userRole === "customer" && <CategoriesOptions />}
      <div className="flex flex-wrap gap-4 justify-start items-start">
        {categoryFoods?.map((food) => (
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
        ))}
      </div>
    </>
  );
}

export default CategoryPage;
