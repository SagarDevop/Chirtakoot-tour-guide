import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Tester from './Components/Tester'
import TouristSpots from './Home/TouristSpots'
import SpotDetails from './Home/SpotDetails';
import AuthForm from './Components/Authform';

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
        </Routes>
      
     
    </>
  )
}

export default App
