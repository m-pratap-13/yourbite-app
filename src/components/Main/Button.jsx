import React from "react";

function Button({ handleClick, className, icon, btnText }) {
  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 flex items-center gap-2 rounded-xl transition cursor-pointer ${className}`}
    >
      {icon} {btnText}
    </button>
  );
}
export default Button;
