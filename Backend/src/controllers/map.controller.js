import fetch from "node-fetch";

// Geocode with Google Places API
export const geocode = async (req, res) => {
  const { text } = req.query; // ?text=Chitrakoot
  if (!text) return res.status(400).json({ error: "Missing text parameter" });

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        text
      )}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Directions with Google Maps Directions API
export const direction = async (req, res) => {
  const { start, end } = req.query; // ?start=LAT,LNG&end=LAT,LNG
  if (!start || !end)
    return res.status(400).json({ error: "Missing start or end parameter" });

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&mode=driving&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
