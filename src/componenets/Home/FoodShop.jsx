import useFetchAllSeller from "../../hooks/useFetchAllSeller";
import ShopCard from "../Main/ShopCard";
import LoadingPage from "../../pages/LoadingPage";
import { useSelector } from "react-redux";
import useCurrentUserRole from "../../hooks/useCurrentUserRole";
import SearchBar from "./SearchBar";
import CategoriesOptions from "./CategoriesOptions";

function FoodShop() {
  const { sellers, loading, error } = useFetchAllSeller();
  const user = useSelector((state) => state.auth.currentUser);
  const { userRole } = useCurrentUserRole(user?.id);

  if (loading) {
    return <LoadingPage />;
  }

  if (sellers.length === 0) {
    return <p className="text-red-500">No posts found</p>;
  }

  return (
    <>
      {userRole === "customer" && <SearchBar />}
      {userRole === "customer" && <CategoriesOptions />}
      <div className="flex justify-start items-center gap-2 flex-wrap">
        {sellers?.map((seller) => (
          <ShopCard
            key={seller.id}
            imageURL={seller.shopImage}
            openingHour={seller.openingHour}
            name={seller.restaurantName}
            restaurantType={seller.restaurantType}
            typeOfFood={seller.typeOfFood}
            location={seller.address}
          />
        ))}
      </div>
    </>
  );
}

export default FoodShop;
