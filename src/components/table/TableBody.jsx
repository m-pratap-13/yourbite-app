import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ActiveButton from "../Main/ActiveButton";
import productService from "../../supabase/supabaseListingProduct";

function TableBody({ id, name, image, stocks, active, adminApproval, page, sales,revenue }) {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  const handleStatus = async (foodId, status) => {
    const updateStatus = !status;
    await productService.updateStatus(foodId, updateStatus, "active");
  };

  const handleDeleteItem = async (foodId) => {
    await productService.deleteFoodItem(foodId);
  };

  return (
    <tr className="border-b hover:bg-gray-50 transition">
      {page === "ManageProductsPage" && <td className="p-4">{id}</td>}
      <td className="p-4 font-medium text-gray-900">{name}</td>
      {page === "ManageProductsPage" && (
        <td className="p-4">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-xl object-cover shadow-sm"
            loading="lazy"
          />
        </td>
      )}
      {page === "DashboardPage" && (
        <td className="p-4 font-semibold text-gray-700">{sales}</td>
      )}
      {page === "DashboardPage" && (
        <td className="p-4 font-semibold text-gray-700">{revenue}</td>
      )}
      <td className="p-4 font-semibold text-gray-700">{stocks}</td>
      {page === "ManageProductsPage" && (
        <td className="p-4">
          <button
            onClick={() => handleButtonClick(`/update/foodId/${id}`)}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white shadow-md transition cursor-pointer"
          >
            <FiEdit />
          </button>
        </td>
      )}
      {page === "ManageProductsPage" && (
        <td className="p-4">
          <ActiveButton
            active={active}
            handleActiveStatus={() => handleStatus(id, active)}
          />
        </td>
      )}
      {page === "ManageProductsPage" && (
        <td className="p-4">
          <ActiveButton active={adminApproval} />
        </td>
      )}
      {/* Delete Button */}
      {page === "ManageProductsPage" && (
        <td className="p-4">
          <button
            onClick={() => handleDeleteItem(id)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-medium transition cursor-pointer"
          >
            <FiTrash className="text-lg" /> Delete
          </button>
        </td>
      )}
    </tr>
  );
}

export default TableBody;
