import React from "react";
import { useNavigate } from "react-router-dom";

function BookingCard({ name, image, category, description }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/booking`, {
      state: { name, image, category, description },
    });
  };

  return (
    <div
      className="
        bg-white cursor-pointer 
        backdrop-blur-md border border-gray-200 
        p-4 rounded-xl 
        transition-all duration-300 
        flex flex-col hover:scale-105 hover:shadow-lg
        w-full sm:w-[45%] md:w-[30%] lg:w-[25%] 
        h-auto
      "
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover rounded-md"
      />

      {/* Details */}
      <div className="p-3 flex justify-between items-center">
        <h2 className="text-base md:text-lg font-bold text-yellow-900">
          {name}
        </h2>
        <span className="text-xs md:text-sm bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
          {category}
        </span>
      </div>

      {/* Button */}
      <button
        onClick={handleClick}
        className="mt-auto bg-yellow-950 text-white px-4 py-2 text-sm md:text-base rounded-lg hover:bg-yellow-600 transition"
      >
        Book Now
      </button>
    </div>
  );
}

export default BookingCard;
