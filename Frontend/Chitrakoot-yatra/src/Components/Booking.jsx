import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaWhatsapp,
} from "react-icons/fa";
import toast from "react-hot-toast";
import api from "../api.js";
import Loader from "./Loader.jsx";

function Booking() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const {
    name: locName,
    image: locImage,
    description: locDescription,
  } = location.state || {};

  const [formData, setFormData] = useState({
    phone: "",
    from: "",
    passengers: 1,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await api.post("/booker/booking", {
        phone: formData.phone,
        from: formData.from,
        to: locName,
        passengers: formData.passengers,
      });
      toast.success("✅ Booking submitted! We’ll contact you soon.");
      console.log(res.data);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage, { duration: 3000 });
    } finally {
      setLoading(false);
      setFormData({ phone: "", from: "", passengers: "" });
    }
  };

  return (
    <div
      style={{ backgroundImage: `url(${locImage})` }}
      className="relative bg-cover bg-center min-h-screen w-full flex justify-center items-start"
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative w-full px-4 sm:px-6 md:px-12 mt-12 py-12">
       
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl text-white drop-shadow-lg text-center mb-10">
          🚖 Book Your Rickshaw Ride
        </h1>

      
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 sm:p-8 text-white mb-14 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto">
          <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
            Fill Your Details
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="+91 xxxxxxxxxx"
                className="w-full p-3 rounded-lg text-black"
              />
            </div>

           
            <div>
              <label className="block mb-1 font-medium">From Location</label>
              <input
                type="text"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
                placeholder="Enter your pickup location"
                className="w-full p-3 rounded-lg text-black"
              />
            </div>

            
            <div>
              <label className="block mb-1 font-medium">To Location</label>
              <input
                type="text"
                value={locName || ""}
                disabled
                className="w-full p-3 rounded-lg bg-gray-200 text-black"
              />
            </div>

          
            <div>
              <label className="block mb-1 font-medium">
                Number of Passengers
              </label>
              <select
                name="passengers"
                value={formData.passengers}
                onChange={handleChange}
                className="w-full p-3 rounded-lg text-black"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>

          
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader /> <span>Processing...</span>
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
          
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b border-white/30 pb-2">
              <FaPhoneAlt /> Rider Contacts
            </h2>
            <ul className="space-y-2 text-left text-sm sm:text-base">
              <li>📞 +91 7887263984</li>
              <li>📞 +91 9123456789</li>
              <li>📞 +91 9876543210</li>
            </ul>
          </div>

         
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b border-white/30 pb-2">
              <FaMapMarkerAlt /> About {locName}
            </h2>
            <p className="text-sm sm:text-base leading-relaxed">
              {locDescription}
            </p>
          </div>

         
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6">
            <h2 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b border-white/30 pb-2">
              <FaInfoCircle /> Why Choose Us?
            </h2>
            <ul className="space-y-2 text-left text-sm sm:text-base">
              <li>✅ Affordable Fares</li>
              <li>✅ Experienced Riders</li>
              <li>✅ Covering All Tourist Spots</li>
              <li>✅ 24/7 Availability</li>
            </ul>
          </div>
        </div>
      </div>

      
      <a
        href="https://wa.me/917887263984"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-xl text-base sm:text-lg font-semibold transition-transform transform hover:scale-110"
      >
        <FaWhatsapp className="text-xl sm:text-2xl" /> Chat
      </a>
    </div>
  );
}

export default Booking;
