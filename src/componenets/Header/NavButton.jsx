import { Link } from "react-router-dom";

function NavButton({ item }) {
  return (
    <Link
      to={`${item.slug}`}
      className={`flex items-center relative gap-1 text-sm border px-2 py-1 rounded-md cursor-pointer`}
    >
      {item.icon}
      {item.name}
      {item.length > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1">
          {item.length}
        </span>
      )}
    </Link>
  );
}

export default NavButton;
