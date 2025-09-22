export const geocode = async(req, res) =>{
    const { text } = req.query; // ?text=Chitrakoot
  if (!text) return res.status(400).json({ error: "Missing text parameter" });

  try {
    const response = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${process.env.ORS_API_KEY}&text=${encodeURIComponent(text)}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const direction = async(req, res) =>{
    const { start, end } = req.query; // ?start=LONG,LAT&end=LONG,LAT
  if (!start || !end)
    return res.status(400).json({ error: "Missing start or end parameter" });

  try {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.ORS_API_KEY}&start=${start}&end=${end}`
    );
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}