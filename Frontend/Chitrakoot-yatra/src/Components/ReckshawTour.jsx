import React from 'react'
import BookingCard from './BookingCard.jsx'
import Spot from '../Data/Spot.js'

function ReckshawTour() {
  return (
    <>
    <div className="w-full min-h-screen bg-[#DBC2A6] flex flex-col items-center pt-[15vh] px-4">
  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-10">
    Choose the Destiny
  </h1>
  <div className="w-full flex flex-wrap justify-center gap-6">
    {Spot.map((spot, index) => (
      <BookingCard key={index} {...spot} />
    ))}
  </div>
</div>

    </>
  )
}

export default ReckshawTour
