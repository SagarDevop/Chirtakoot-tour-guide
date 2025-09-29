import React from "react";
import { useState,  } from "react";
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

const HotelCard = ({ hotel }) => {
   const navigate = useNavigate();

  const click = ()=>{
    navigate(`/hoteldetail/${encodeURIComponent(hotel.name)}`)
  }
  return (

    <motion.div
     onClick={click}
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
    >
      <img
        src={hotel.images?.[0] || "https://via.placeholder.com/400x200"}
        alt={hotel.name}
        className="w-full h-32 object-cover"
      />
      <div className="pl-7">
        <h3 className="text-l font-semibold">{hotel.name}</h3>
        <p className="mt-1 text-yellow-500 font-bold">⭐ {hotel.rating}</p>
        <p className="mt-1 text-green-600 font-semibold">{hotel.priceRange}</p>
      </div>
     <a
  href={hotel.mapLink}
  target="_blank"
  rel="noopener noreferrer"
  className="w-[9.8vw] h-7 my-2 ml-7 pl-2 flex items-center justify-center bg-yellow-950 text-white rounded"
  onClick={(e) => e.stopPropagation()}
>
  On Map
</a>

    </motion.div>
  );
};

export default HotelCard;
