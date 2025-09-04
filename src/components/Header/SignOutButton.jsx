import React, { useState } from "react";
import { IoMdExit } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../../supabase/supabaseAuth";
import { clearUser } from "../../features/authSlice";

function SignOutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      dispatch(clearUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`flex items-center gap-1 text-sm border px-2 py-1 rounded-md transition cursor-pointer
        ${
          loading
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "hover:bg-red-500 hover:text-white"
        }`}
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? "Signing out..." : "Sign Out"} {!loading && <IoMdExit />}
    </button>
  );
}

export default SignOutButton;
