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
    <div className="flex justify-center my-9 gap-4">
      <button
        onClick={handleAll}
        className="px-4 h-[7vh] w-[6vw] py-2 bg-green-500 text-white rounded"
      >
        All
      </button>
      <button
        onClick={() => handleFilter(4)}
        className="px-4 h-[7vh] py-2 bg-green-500 text-white rounded"
      >
        4★ & above
      </button>
      <button
        onClick={() => handleFilter(4.5)}
        className="px-4 h-[7vh] py-2 bg-green-500 text-white rounded"
      >
        4.5★ & above
      </button>
    </div>
  );
};

export default HotelFilter;


