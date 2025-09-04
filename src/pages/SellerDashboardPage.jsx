import StatsSectionBox from "../components/seller dashboard/StatsSectionBox";
import { useSelector } from "react-redux";
import useSellerFoods from "../hooks/useSellerFoods";
import Graph from "../components/seller dashboard/Graph";
import { Link } from "react-router-dom";
import TableHead from "../components/table/TableHead";
import TableBody from "../components/table/TableBody";

export default function SellerDashboardPage() {
  const userId = useSelector((state) => state.auth.currentUser)?.id;
  const { sellerFoods } = useSellerFoods(userId);

  // "Right now hardcoded data is being used. Later, when order handling is implemented, these will be changed." ✅
  const sellStats = [
    {
      name: "Total Foods",
      value: sellerFoods.length,
    },

    {
      name: "Total Orders",
      value: "1200",
    },
    {
      name: "Total Sales",
      value: "30K",
    },
    {
      name: "Total Revenue",
      value: "20K",
    },
    {
      name: "Net Profit",
      value: "8K",
    },
    {
      name: "Total Customers",
      value: "450",
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        {sellStats.map((stats) => (
          <StatsSectionBox name={stats.name} value={stats.value} />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Graph section={"Orders"} />
        <Graph section={"Sales"} />
      </div>
      <div className="shadow-lg rounded-2xl bg-white p-6 overflow-x-auto mt-3">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-800">Top Products</h3>
          <Link
            to={"/seller/products"}
            className="text-sm px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            View All
          </Link>
        </div>

        {/* Table */}
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <TableHead
              headTitle={["Product", "Sales", "Revenue", "Stock Left"]}
            />
          </thead>
          {/*  when handle data from backed:: Loop */}
          <tbody className="text-gray-700">
            <TableBody
              name="Biriyani"
              sales="40K"
              revenue="25k"
              stocks={`${"40"} Left`}
              page="DashboardPage"
            />
            <TableBody
              name="Biriyani"
              sales="40K"
              revenue="25k"
              stocks={`${"40"} Left`}
              page="DashboardPage"
            />
            <TableBody
              name="Biriyani"
              sales="40K"
              revenue="25k"
              stocks={`${"40"} Left`}
              page="DashboardPage"
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
