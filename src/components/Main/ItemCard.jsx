import {  FiCheck, FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";
import useCurrentUserRole from "../../hooks/useCurrentUserRole";
import Button from "./Button";
import { RxCross2 } from "react-icons/rx";

function ItemCard({
  title,
  description,
  shopName,
  category,
  shipping,
  price,
  type,
  imageURL,
  onApproved,
  onRejected,
  pageType,
}) {
  const user = useSelector((state) => state.auth.currentUser);
  const { userRole } = useCurrentUserRole(user?.id);

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-amber-100 p-4 bg-white rounded-2xl shadow-sm border hover:shadow-lg transition-all duration-300">
      {/* Image */}
      <img
        src={imageURL}
        alt={title}
        className="w-full sm:w-28 sm:h-28 h-40 rounded-xl object-cover border"
      />

      {/* Left side content */}
      <div className="flex-1 flex flex-col gap-1">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 leading-snug">
          {title}
        </h3>

        {userRole === "admin" && (
          <p className="text-sm text-gray-600 md:w-[80%]">{description}</p>
        )}

        <div className="flex items-center gap-2 flex-wrap text-sm mt-1">
          <span
            className={`px-2 py-0.5 rounded-full font-medium ${
              type?.toLowerCase() === "veg"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-500"
            }`}
          >
            {type}
          </span>
          {category && (
            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">
              {category}
            </span>
          )}
          {shipping && (
            <span className="text-blue-600 font-medium">🚚 {shipping}</span>
          )}
        </div>

        {userRole === "admin" && (
          <p className="text-xs text-gray-500">ShopName: {shopName}</p>
        )}
        <p className="text-lg sm:text-xl font-bold text-green-700">₹{price}</p>
      </div>

      {userRole === "admin" && (
        <div className="flex gap-2">
          {(pageType === "pending" || pageType === "rejected") && (
            <Button
              handleClick={onApproved}
              className="bg-green-100 text-green-700 hover:bg-green-200"
              icon={<FiCheck className="text-lg" />}
              btnText="Approve"
            />
          )}
          {(pageType === "pending" || pageType === "approved") && (
            <Button
              handleClick={onRejected}
              className="bg-red-100 text-red-800 hover:bg-red-200"
              icon={<RxCross2 className="text-lg" />}
              btnText="Reject"
            />
          )}
        </div>
      )}
      {pageType === "addToCart" && (
        <Button
          handleClick={onRejected}
          className="bg-red-100 text-red-800 hover:bg-red-200"
          icon={<FiTrash className="text-lg" />}
          btnText="Remove"
        />
      )}
    </div>
  );
}

export default ItemCard;
