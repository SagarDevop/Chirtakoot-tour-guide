import React from 'react'
import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

function BookingCard({name, image, category, description}){
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/booking`, {
      state: { name, image, category, description },
    });
  }
  return (
    <>
    <div
      className="w-[28vw] h-[60vh] bg-white cursor-pointer 
                 backdrop-blur-md border border-white/20 p-4 
                 rounded-xl text-white transition-all duration-300 
                 flex flex-col hover:scale-105 hover:shadow-lg"
    >
      <img
        src={image}
        alt={name}
        className="w-full h-[40vh] object-cover rounded-md"
      />

      <div className="p-3 flex justify-between">
        <h2 className="text-lg font-bold text-yellow-900">{name}</h2>
          <h2 className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
            {category}
          </h2>
        </div>
        <button onClick={handleClick} className="mt-auto bg-yellow-950 text-white px-4 py-1 rounded hover:bg-yellow-600 transition">
         Book Now
        </button>
      </div>
       
    </>
  )
}

export default BookingCard
