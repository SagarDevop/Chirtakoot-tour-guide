import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import toast from "react-hot-toast";

function HotelDetail() {
  const { name } = useParams();
  const decodedName = decodeURIComponent(name);
  const [activeTab, setActiveTab] = useState("overview");

  const [hotels, setHotels] = useState([]);
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await api.get("/hotel/gethotel");
        setHotels(response.data.data);

        const found = response.data.data.find((h) => h.name === decodedName);
        setHotel(found);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, [decodedName]);

  if (!hotel) return <h2>Loading hotel details...</h2>;

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        {/* Top Banner */}
        <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={hotel.images?.[0]}
            alt={hotel.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl font-bold text-white">{hotel.name}</h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b mt-8">
          {["overview", "amenities", "reviews", "location"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-lg font-medium capitalize transition ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          {/* Left - Content */}
          <div className="md:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-xl font-semibold">Overview</h2>
                <p className="text-gray-700 leading-relaxed mt-2">
                  Welcome to <span className="font-semibold">{hotel.name}</span>
                  . Enjoy your stay with comfort and convenience. Situated at{" "}
                  <span className="italic">{hotel.location}</span>, this hotel
                  is perfect for travelers seeking both relaxation and
                  accessibility.
                </p>

                <h2 className="text-xl font-semibold mt-6">Gallery</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-3">
                  {hotel.images?.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`${hotel.name} ${i}`}
                      className="rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "amenities" && (
              <div className="mt-4">
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {hotel.amenities?.length > 0 ? (
                    hotel.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="flex items-center gap-2 text-sm bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full shadow-sm border hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        {/* Example icon - you can swap based on amenity */}
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {amenity}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400 italic">
                      No amenities listed
                    </span>
                  )}
                </div>
                <div className="mt-10 bg-white w-80 p-6 rounded-xl shadow-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    Suggest an Amenity
                  </h2>

                  <form
                    onSubmit={(e) => {
                    e.preventDefault();
                    
                    toast.success("✅ Thank you for your suggestion!")
                    e.target.reset()
                      
                    }}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      placeholder="Enter amenity (e.g. Swimming Pool)"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      placeholder="Optional description"
                      rows="2"
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Submit Suggestion
                    </button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h2 className="text-xl font-semibold">Guest Reviews</h2>
                <div className="mt-4 space-y-4">
                  <div className="p-4 border rounded-lg shadow-sm">
                    <p className="font-semibold">Ravi Kumar ⭐⭐⭐⭐</p>
                    <p className="text-gray-600">
                      Nice stay, clean rooms and polite staff. Recommended.
                    </p>
                  </div>
                  <div className="p-4 border rounded-lg shadow-sm">
                    <p className="font-semibold">Anita Sharma ⭐⭐⭐⭐⭐</p>
                    <p className="text-gray-600">
                      Amazing experience! Very close to Ramghat, food was good.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "location" && (
              <div>
                <h2 className="text-xl font-semibold">Location</h2>
                <iframe
                  src={hotel.mapLocation}
                  title="Hotel Map"
                  className="w-full h-64 rounded-lg mt-3 shadow-md"
                  allowFullScreen
                ></iframe>
              </div>
              
            )}
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg sticky top-6 h-fit space-y-4">
            <h3 className="text-lg font-semibold">{hotel.name}</h3>
            <p className="text-gray-600">{hotel.location}</p>
            <p className="text-green-600 font-bold">{hotel.priceRange}</p>
            <p className="text-yellow-500 font-semibold">⭐ {hotel.rating}</p>
            <p className="text-gray-700">📞 {hotel.contact}</p>

            <a
              href={hotel.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              View on Map
            </a>
            <a
              href="https://staybook.in/hotels/shree-bhagwat-dham-karwi/rooms?checkin=25-10-2025&checkout=26-10-2025&roomId=vfezo1nsy2rjuaq12hxp&planId=fzfnx68n5i6xp7y6zi7u&num_nights=1&num_guests=2&num_adults=2&num_children=0&num_rooms=1&user_country=IN&selection_type=hotel&hotel_ad_selection=&room_bundle_ad_selection="
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full py-3 bg-yellow-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              BookNow
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default HotelDetail;
