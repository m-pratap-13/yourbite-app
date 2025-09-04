import WithoutLoginPage from "./WithoutLoginPage";
import { useSelector } from "react-redux";
import Sidebar from "../components/Home/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import useCurrentUserRole from "../hooks/useCurrentUserRole";
import { useEffect } from "react";

function HomePage() {
  const user = useSelector((state) => state.auth.currentUser);
  const { userRole } = useCurrentUserRole(user?.id);
  const navigate = useNavigate();

  if (!user) {
    return <WithoutLoginPage />;
  }

  useEffect(() => {
    if (userRole === "seller") {
      navigate("/seller/dashboard");
    }
    if (userRole === "admin") {
      navigate("/admin/pending");
    }
  }, [userRole]);

  return (
    <>
      <div className="flex bg-gray-50 min-h-screen p-4">
        <aside
          className={`${
            userRole === "seller" ? "w-15 md:w-65" : "w-15 md:w-35"
          } bg-white shadow rounded-lg flex flex-col items-center py-6 space-y-6`}
        >
          <Sidebar />
        </aside>

        <main className="flex-1 px-6">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default HomePage;
