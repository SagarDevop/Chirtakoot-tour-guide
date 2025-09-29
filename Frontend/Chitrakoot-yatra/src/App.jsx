import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Tester from './Components/Tester'
import TouristSpots from './Home/TouristSpots'
import SpotDetails from './Home/SpotDetails';
import ReckshawTour from './Components/ReckshawTour'
import AuthForm from './Components/Authform';
import Profile from './Components/Profile';
import HotelSection from './Hotels/HotelSection';
import Booking from './Components/Booking';
import HotelDetail from './Hotels/HotelDetail';

function App() {
  

  return (
    <>
     <Navbar  />
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tourist-spots" element={<TouristSpots />} />
          <Route path="/tourist-spot/:name" element={<SpotDetails />} />
          <Route path="/tester" element={<Tester />} />
          <Route path="/account" element={<AuthForm />} />
          <Route path = "/profile" element={<Profile/>} />
          <Route path = "/rickshaw-tour" element={<ReckshawTour/>} />
          <Route path = "/hotels" element={<HotelSection/>} />
          <Route path = "/booking" element={<Booking/>} />
          <Route path = "/hoteldetail/:name" element={<HotelDetail/>} />
        </Routes>
      
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 4000, // how long toast stays
          style: {
            background: 'rgba(17, 24, 39, 0.8)', // more darker glassy
            color: '#f9fafb', // almost white
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            borderRadius: '16px',
            padding: '16px 24px',
          },
          success: {
            style: {
              background: 'rgba(34, 197, 94, 0.8)', // green glass for success
              color: 'white',
            },
            iconTheme: {
              primary: '#22c55e',
              secondary: '#166534',
            },
          },
          error: {
            style: {
              background: 'rgba(239, 68, 68, 0.8)', // red glass for error
              color: 'white',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#7f1d1d',
            },
          },
        }}
      />

    </>
  )
}

export default App
