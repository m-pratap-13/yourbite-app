import React from "react";
import { IoMdExit } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../supabase/supabaseAuth";
import { clearUser } from "../../features/authSlice";

function SignOutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    dispatch(clearUser());
    navigate("/login");
  };

  return (
    <button
      className={`flex items-center relative gap-1 text-sm border px-2 py-1 rounded-md cursor-pointer`}
      onClick={handleLogout}
    >
      Sign Out <IoMdExit />
    </button>
  );
}

export default SignOutButton;
