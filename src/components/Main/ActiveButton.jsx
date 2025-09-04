import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { FiClock } from "react-icons/fi";
import { ImCross } from "react-icons/im";

function ActiveButton({ handleActiveStatus, active }) {
  return (
    <>
      {active === "approved" || active === true ? (
        <button
          onClick={handleActiveStatus}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 font-medium transition cursor-pointer"
        >
          <BsCheckCircleFill className="text-lg" />
          {active === true && "Active"}
          {active === "approved" && "Approved"}
        </button>
      ) : active === "pending" ? (
        <button
          onClick={handleActiveStatus}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-yellow-100 text-yellow-600 hover:bg-yellow-200 font-medium transition cursor-pointer"
        >
          <FiClock className="text-lg" />
          Pending
        </button>
      ) : active === "rejected" ? (
        <button
          onClick={handleActiveStatus}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-medium transition cursor-pointer"
        >
          <ImCross className="text-lg" />
          Rejected
        </button>
      ) : (
        <button
          onClick={handleActiveStatus}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 font-medium transition cursor-pointer"
        >
          <BsXCircleFill className="text-lg" />
          Inactive
        </button>
      )}
    </>
  );
}

export default ActiveButton;
