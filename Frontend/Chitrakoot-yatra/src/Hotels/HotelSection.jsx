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
        setFilteredHotels(response.data.data)
        
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <section className="w-full min-h-screen px-6 py-10 bg-[#DBC2A6]">
      <div className="bg-white mt-[15vh] w-[100%] h-[90vh] rounded">
      <div className="flex justify-between mx-12">
    <h2 className="text-3xl font-bold mt-14 mb-6 text-center">Hotels in Chitrakoot</h2>
    <HotelFilter hotels={hotels} setFilteredHotels={setFilteredHotels} />
      </div>
      <div className=" flex flex-col lg:flex-row gap-6">
        <div className="mx-10 w-[40vw] h-[400px]">
          <HotelMap hotels={filteredHotels} />
        </div>
        
        <div className="lg:w-1/2 w-full bg-white">
          <HotelCarousel hotels={filteredHotels} />
        </div>
  
      </div>
      </div>
    </section>
  );
};

export default HotelSection;
