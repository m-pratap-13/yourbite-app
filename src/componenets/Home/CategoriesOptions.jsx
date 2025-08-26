import {
  FaUtensils,
  FaIceCream,
  FaHamburger,
  FaPizzaSlice,
  FaDrumstickBite,
  FaBreadSlice,
  FaCookieBite,
  FaFish,
} from "react-icons/fa";
import { FaBowlFood, FaBowlRice } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

function CategoriesOptions() {
  const categories = [
    { name: "All", icon: <FaUtensils />, slug: "/" },
    {
      name: "Biryani",
      icon: <FaBowlRice />,
      slug: `/category/Biryani`,
    },
    { name: "Pizza", icon: <FaPizzaSlice />, slug: `/category/Pizza` },
    { name: "Burger", icon: <FaHamburger />, slug: `/category/Burger` },
    { name: "Pasta", icon: <FaBowlFood />, slug: `/category/Pasta` },
    {
      name: "Momos",
      icon: <FaDrumstickBite />,
      slug: `/category/Momos`,
    },
    {
      name: "Sandwiches",
      icon: <FaBreadSlice />,
      slug: `/category/Sandwiches`,
    },
    {
      name: "Desserts",
      icon: <FaIceCream />,
      slug: `/category/Desserts`,
    },
    {
      name: "Snacks",
      icon: <FaCookieBite />,
      slug: `/category/Snacks`,
    },
    { name: "Bengali", icon: <FaFish />, slug: `/category/Bengali` },
  ];

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    navigate(`${value}`);
  };

  return (
    <>
      {/* For Desktop  */}
      <div className="md:flex space-x-4 mb-6 flex-wrap hidden">
        {categories.map((option) => (
          <NavLink
            key={option.name}
            to={`${option.slug}`}
            className={({ isActive }) =>
              `flex flex-col mb-2 items-center text-sm cursor-pointer rounded-lg shadow px-4 py-2    border border-gray-300
       ${
         isActive ? "bg-blue-200 text-white" : "text-gray-700 hover:bg-gray-200"
       }`
            }
          >
            <div className="text-xl">{option.icon}</div>
            <span>{option.name}</span>
          </NavLink>
        ))}
      </div>

      {/* For Mobile  */}
      <div className="flex items-center bg-white rounded-lg shadow px-4 py-2 mb-4 md:hidden">
        <select className="w-full outline-none" onChange={handleChange}>
          {categories.map((option) => (
            <option key={option.name} value={option.slug}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default CategoriesOptions;
