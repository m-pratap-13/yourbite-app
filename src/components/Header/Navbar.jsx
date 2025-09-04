import { Link} from "react-router-dom";
import NavButton from "./NavButton";
import { GiCampCookingPot } from "react-icons/gi";
import { useSelector } from "react-redux";
import SignOutButton from "./SignOutButton";
import { FiUser } from "react-icons/fi";

export default function Navbar() {
  const authStatus = useSelector((state) => state.auth.authStatus);

  const navLink = [
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: <FiUser />,
    },
  ];

  return (
    <nav className="bg-[#D6EAF8] text-[#2C3E50] p-4 fixed w-[100%] z-10">
      <div className="container mx-auto flex flex-wrap md:flex-nowrap lg:flex-nowrap items-center justify-between gap-4">
        <div className="flex items-center justify-between w-full">
          <Link
            to="/"
            className="w-40 h-[80%] flex justify-start gap-2 items-center cursor-pointer"
          >
            <GiCampCookingPot size={40} />
            <h1 className="text-2xl font-bold">YourBite</h1>
          </Link>

          <div className="flex items-center gap-4">
            {navLink.map((item) =>
              item.active ? <NavButton key={item.name} item={item} /> : null
            )}
            {authStatus ? <SignOutButton /> : null}
          </div>
        </div>
      </div>
    </nav>
  );
}
