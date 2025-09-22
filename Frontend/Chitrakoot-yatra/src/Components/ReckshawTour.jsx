import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Component to fit map bounds
function FitBounds({ coords }) {
  const map = useMap();
  if (coords && coords.length > 0) {
    map.fitBounds(coords);
  }
  return null;
}

function RickshawTour() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

// Calculate distance in km
function haversineDistance([lat1, lon1], [lat2, lon2]) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}


  const getCoordinates = async (place) => {
    const res = await fetch(
      `https://chitrakoot-yatra.onrender.com/map/geocode?text=${encodeURIComponent(place)}`
    );
    if (!res.ok) throw new Error("Failed to get coordinates");
    const data = await res.json();
    const coords = data.features?.[0]?.geometry?.coordinates;
    console.log(coords)
    if (!coords) throw new Error(`Could not find location: ${place}`);
    return coords;
  };

  const handleSearch = async () => {
  if (!from || !to) return alert("Enter both locations");
  setLoading(true);

  try {
    const fromCoordsRaw = await getCoordinates(from); // [lon, lat]
    const toCoordsRaw = await getCoordinates(to);     // [lon, lat]

    if (!fromCoordsRaw || !toCoordsRaw) {
      alert("Could not find one of the locations");
      setLoading(false);
      return;
    }

    // Convert to [lat, lon] for Haversine
    const fromCoords = [fromCoordsRaw[1], fromCoordsRaw[0]];
    const toCoords = [toCoordsRaw[1], toCoordsRaw[0]];

    // Calculate straight-line distance
    const distance = haversineDistance(fromCoords, toCoords).toFixed(2);

    setRoute({
      fromCoords,
      toCoords,
      coords: [fromCoords, toCoords], // straight line
      distance,
      duration: Math.ceil(distance / 15 * 60), // approx: assume rickshaw 15 km/h
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#DBC2A6] flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6">Rickshaw Tour</h1>

      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">
        <input
          type="text"
          placeholder="From Location"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full p-3 mb-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="To Location"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="w-full p-3 mb-3 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="w-full bg-[#414A37] text-white p-3 rounded-lg hover:bg-[#2f3529]"
          disabled={loading}
        >
          {loading ? "Searching..." : "Find Rickshaw"}
        </button>
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </div>

      {route && (
        <div className="mt-6 w-full max-w-3xl">
          <div className="bg-white p-4 rounded-xl shadow mb-4">
            <h2 className="text-xl font-semibold">Trip Details</h2>
            <p><b>From:</b> {from}</p>
            <p><b>To:</b> {to}</p>
            <p><b>Distance:</b> {route.distance} km</p>
            <p><b>Duration:</b> {route.duration} mins</p>
          </div>

          <MapContainer
            center={route.fromCoords}
            zoom={12}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={route.fromCoords}>
              <Popup>Start: {from}</Popup>
            </Marker>
            <Marker position={route.toCoords}>
              <Popup>Destination: {to}</Popup>
            </Marker>
            <Polyline positions={route.coords} color="blue" />
            <FitBounds coords={[route.fromCoords, route.toCoords]} />
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default RickshawTour;
