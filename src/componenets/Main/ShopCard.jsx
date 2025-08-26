import React from "react";

function ShopCard({
  imageURL,
  openingHour,
  name,
  restaurantType,
  typeOfFood,
  location,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden w-62 md:w-72 hover:border">
      <div className="relative">
        <img
          src={imageURL}
          alt={name}
          className="w-full h-40 object-cover"
          loading="lazy"
        />
        {openingHour && (
          <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {`Open : ${openingHour}`}
          </span>
        )}
      </div>

      <div className="p-3">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-600 text-sm truncate mt-1">{`${typeOfFood} is available here.`}</p>
        <p className="text-gray-500 text-sm mt-1">{location}</p>
      </div>
      <div className="flex items-center mt-1 space-x-2 mb-2 ml-2 flex-wrap">
        {restaurantType.map((type) => (
          <span
            key={type}
            className="text-gray-500 text-sm bg-blue-200 mr-1 p-1 rounded mb-2"
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default ShopCard;
