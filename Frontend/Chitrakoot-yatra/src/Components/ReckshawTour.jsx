import React from 'react'
import BookingCard from './BookingCard.jsx'
import Spot from '../Data/Spot.js'

function ReckshawTour() {
  return (
    <div className='min-h-screen py-[20vh] px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center' style={{ backgroundColor: "#DBC2A6" }}>
      {Spot.map((spot, index) => (
        <BookingCard key={index} {...spot} />
      ))}
    </div>
  )
}

export default ReckshawTour
