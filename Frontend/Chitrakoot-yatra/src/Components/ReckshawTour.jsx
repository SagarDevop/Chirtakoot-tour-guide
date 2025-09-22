import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function RickshawTour() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [route, setRoute] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get coordinates from backend
  const getCoordinates = async (place) => {
    const res = await fetch(`https://chitrakoot-yatra.onrender.com/map/geocode?text=${encodeURIComponent(place)}`);
    if (!res.ok) throw new Error("Failed to get coordinates");
    const data = await res.json();
    return data.features[0]?.geometry.coordinates; // [lon, lat]
  };

  const handleSearch = async () => {
    if (!from || !to) return alert("Enter both locations");
    setLoading(true);

    try {
      const fromCoords = await getCoordinates(from);
      const toCoords = await getCoordinates(to);

      if (!fromCoords || !toCoords) {
        alert("Could not find one of the locations");
        setLoading(false);
        return;
      }

      // Directions API via backend
      const res = await fetch(
        `https://chitrakoot-yatra.onrender.com/map/directions?start=${fromCoords.join(",")}&end=${toCoords.join(",")}`
      );

      if (!res.ok) throw new Error("Failed to fetch route");
      const data = await res.json();

      const distanceKm = (data.routes[0].summary.distance / 1000).toFixed(2);
      const durationMin = Math.ceil(data.routes[0].summary.duration / 60);
      const coords = data.routes[0].geometry.coordinates.map((c) => [c[1], c[0]]);

      setRoute({
        fromCoords: [fromCoords[1], fromCoords[0]],
        toCoords: [toCoords[1], toCoords[0]],
        coords,
        distance: distanceKm,
        duration: durationMin,
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
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default RickshawTour;
