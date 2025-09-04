import { BsFillQuestionOctagonFill } from "react-icons/bs";
import useSellerFoods from "../hooks/useSellerFoods";
import { useSelector } from "react-redux";
import TableHead from "../components/table/TableHead";
import TableBody from "../components/table/TableBody";
import EmptyResult from "../components/Home/EmptyResult";
import { useParams } from "react-router-dom";

const ManageProductsPage = () => {
  const { pageType } = useParams();
  const userId = useSelector((state) => state.auth.currentUser)?.id;
  const { sellerFoods, sellerRejectedFoods } = useSellerFoods(userId);

  const foodItems =
    pageType === "all"
      ? sellerFoods
      : pageType === "rejected"
      ? sellerRejectedFoods
      : [];

  if (!foodItems || foodItems.length === 0) {
    return (
      <EmptyResult
        icon={<BsFillQuestionOctagonFill size={30} />}
        result={`No ${pageType} food found!`}
      />
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Products</h2>
      <div className="overflow-x-auto shadow-lg rounded-2xl bg-white ">
        <table className="w-full  text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <TableHead
              headTitle={[
                "ID",
                "Name",
                "Image",
                "Stocks",
                "Edit",
                "Status",
                "Approval",
                "Delete",
              ]}
            />
          </thead>
          <tbody>
            {foodItems.map((food) => (
              <TableBody
                key={food.id}
                id={food.id}
                name={food.title}
                image={food.images}
                stocks={food.stock}
                active={food.active}
                adminApproval={food.admin_approval}
                page="ManageProductsPage"
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProductsPage;
