import React, { useState, useEffect } from "react";
import HotelFilter from "./HotelFilter";
import HotelMap from "./HotelMap";
import HotelCarousel from "./HotelCarousel";
import api from "../api.js";

const HotelSection = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get("/hotel/gethotel");
        setHotels(response.data.data);
        setFilteredHotels(response.data.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <section className="w-full min-h-screen px-4 sm:px-6 py-10 bg-[#DBC2A6]">
      <div className="bg-white mt-[12vh] w-full rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center md:text-left">
            Hotels in Chitrakoot
          </h2>
          <div className="w-full md:w-auto">
            <HotelFilter hotels={hotels} setFilteredHotels={setFilteredHotels} />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-[45%] h-[300px] md:h-[400px] px-2">
            <HotelMap hotels={filteredHotels} />
          </div>

          <div className="w-full lg:w-[55%] bg-white px-2">
            <HotelCarousel hotels={filteredHotels} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotelSection;

