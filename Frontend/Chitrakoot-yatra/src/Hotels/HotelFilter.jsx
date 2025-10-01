import React from "react";

const HotelFilter = ({ hotels, setFilteredHotels }) => {
  if (!hotels || hotels.length === 0) return null;

  const handleFilter = (rating) => {
    const filtered = hotels.filter((hotel) => hotel.rating >= rating);
    setFilteredHotels(filtered);
  };

  const handleAll = () => {
    setFilteredHotels(hotels);
  };

  return (
    <div className="flex flex-wrap justify-center my-6 gap-3 sm:gap-4">
      <button
        onClick={handleAll}
        className="px-4 py-2 h-10 sm:h-12 w-24 sm:w-28 bg-green-500 text-white rounded text-sm sm:text-base"
      >
        All
      </button>
      <button
        onClick={() => handleFilter(4)}
        className="px-4 py-2 h-10 sm:h-12 w-28 sm:w-36 bg-green-500 text-white rounded text-sm sm:text-base"
      >
        4★ & above
      </button>
      <button
        onClick={() => handleFilter(4.5)}
        className="px-4 py-2 h-10 sm:h-12 w-32 sm:w-40 bg-green-500 text-white rounded text-sm sm:text-base"
      >
        4.5★ & above
      </button>
    </div>
  );
};

export default HotelFilter;
