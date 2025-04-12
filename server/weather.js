const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const [currentRes, forecastRes] = await Promise.all([
      axios.get(currentWeatherURL),
      axios.get(forecastURL),
    ]);

    const forecastList = forecastRes.data.list.filter((_, idx) => idx % 8 === 0);

    res.json({
      current: {
        city: currentRes.data.name,
        temperature: currentRes.data.main.temp,
        weather: currentRes.data.weather[0].main,
        description: currentRes.data.weather[0].description,
        icon: currentRes.data.weather[0].icon,
        humidity: currentRes.data.main.humidity,
        windSpeed: currentRes.data.wind.speed,
      },
      forecast: forecastList.map((item) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      })),
    });
  } catch (err) {
    res.status(500).json({ error: "Could not fetch weather data" });
  }
});

module.exports = router;
