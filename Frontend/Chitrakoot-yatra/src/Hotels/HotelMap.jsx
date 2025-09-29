import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const HotelMap = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return (
      <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-400">No hotels to display on map</p>
      </div>
    );
  }

  // Fallback to Chitrakoot center if no valid coords
  const validHotels = hotels.filter(
    (h) => h.latitude !== undefined && h.longitude !== undefined
  );

  const center = validHotels.length
    ? [validHotels[0].latitude, validHotels[0].longitude]
    : [25.2017, 80.8595]; // Default: Chitrakoot

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="w-full h-full rounded-lg"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />

      {validHotels.map((hotel, index) => (
        <Marker key={index} position={[hotel.latitude, hotel.longitude]}>
          <Popup>
            <strong>{hotel.name}</strong>
            <br />
            Rating: {hotel.rating}★
            <br />
            {hotel.location}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HotelMap;

