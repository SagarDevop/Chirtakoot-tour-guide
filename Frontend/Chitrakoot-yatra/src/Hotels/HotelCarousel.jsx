import React from "react";
import HotelCard from "./HotelCard";

const HotelCarousel = ({ hotels }) => {
  return (
    <div className="h-[400px] w-full overflow-y-auto">
      <div className="grid grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <HotelCard key={hotel._id || hotel.name} hotel={hotel} />
        ))}
      </div>
    </div>
  );
};

export default HotelCarousel;
