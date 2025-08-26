import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiGrid,
  FiShoppingBag,
  FiPlusCircle,
  FiBarChart2,
  FiUser,
  FiShoppingCart,
  FiHeart,

} from "react-icons/fi";
import { useSelector } from "react-redux";
import useCurrentUserRole from "../../hooks/useCurrentUserRole";
import { CiShop } from "react-icons/ci";
import useFetchCartFoods from "../../hooks/useFetchCartFoods";

function Sidebar() {
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userId = useSelector((state) => state.auth.currentUser)?.id;
  const { userRole } = useCurrentUserRole(userId);
  const { cartFoods } = useFetchCartFoods(userId);

  const navLink = [
    {
      name: "Seller Dashboard",
      slug: "/seller/dashboard",
      active: authStatus && userRole === "seller",
      icon: <FiHome />,
    },
    {
      name: "Manage Products",
      slug: "/seller/products",
      active: authStatus && userRole === "seller",
      icon: <FiGrid />,
    },
    {
      name: "My Store",
      slug: "/seller/store",
      active: authStatus && userRole === "seller",
      icon: <FiShoppingBag />,
    },
    {
      name: "Start Selling",
      slug: "/seller/start",
      active: authStatus && userRole === "seller",
      icon: <FiPlusCircle />,
    },
    {
      name: "Seller Panel",
      slug: "/seller/panel",
      active: authStatus && userRole === "seller",
      icon: <FiUser />,
    },
    {
      name: "Add New Product",
      slug: "/seller/add-product",
      active: authStatus && userRole === "seller",
      icon: <FiPlusCircle />,
    },
    {
      name: "Orders & Sales",
      slug: "/seller/orders",
      active: authStatus && userRole === "seller",
      icon: <FiBarChart2 />,
    },
    {
      name: "Home",
      slug: "/",
      active: authStatus && userRole === "customer",
      icon: <FiHome />,
    },
    {
      name: "Shops",
      slug: "/shops",
      active: authStatus && userRole === "customer",
      icon: <CiShop />,
    },
    {
      name: "Cart",
      slug: "/addtocart",
      active: authStatus && userRole === "customer",
      icon: <FiShoppingCart />,
    },
    {
      name: "Wishlist",
      slug: "/wishlist",
      active: authStatus && userRole === "customer",
      icon: <FiHeart />,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: <FiUser />,
    },
  ];
  
  return (
    <>
      <div className="text-purple-600 font-bold text-2xl">🍽</div>
      <div className="flex flex-col space-y-2">
        {navLink.map((item) =>
          item.active ? (
            <NavLink
              key={item.name}
              to={item.slug}
              className={({ isActive }) =>
                `flex items-center space-x-2 px-3 py-2 rounded  
       ${
         isActive ? "bg-gray-400 text-white" : "text-gray-700 hover:bg-gray-200"
       }`
              }
            >
              <span>{item.icon}</span>
              <span className="relative ">
                {item.name}

                {item.name === "Cart" && cartFoods.length > 0 && (
                  <span className="absolute -top-1 -right-4 bg-red-500 text-white text-xs rounded-full px-1">
                    {cartFoods.length}
                  </span>
                )}
              </span>
            </NavLink>
          ) : null
        )}
      </div>
    </>
  );
}

export default Sidebar;
