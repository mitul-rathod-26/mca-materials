import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const LAT = 20.5937;
const LON = 72.6301;

const WMO_CODES = {
  0: "Clear Sky",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Foggy",
  61: "Light Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  80: "Rain Showers",
  95: "Thunderstorm",
};

app.get("/", async (req, res) => {
  try {
    const params = new URLSearchParams({
      latitude: LAT,
      longitude: LON,
      current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode",
      timezone: "Asia/Kolkata",
    });

    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params}`,
    );
    const data = await response.json();
    const c = data.current;
    console.log("Current weather data:", c);

    res.render("weather", {
      location: "Navsari, India",
      temperature: c.temperature_2m,
      humidity: c.relative_humidity_2m,
      wind: c.wind_speed_10m,
      condition: WMO_CODES[c.weathercode] || "Unknown",
      updated_at: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
    });
  } catch (err) {
    res.status(500).send(`Error: ${err.message}`);
  }
});

app.listen(PORT, () => console.log(`Running at http://localhost:${PORT}`));
