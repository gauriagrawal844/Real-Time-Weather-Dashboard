import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-md text-center">
      <h2 className="text-2xl font-bold mb-2">{weather.city}</h2>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt={weather.description}
        className="mx-auto"
      />
      <p className="text-xl">{weather.weather}</p>
      <p>{weather.description}</p>
      <p className="text-lg font-medium">🌡 {weather.temperature} °C</p>
      <p>💧 Humidity: {weather.humidity}%</p>
      <p>🌬 Wind: {weather.windSpeed} m/s</p>
    </div>
  );
};

export default WeatherCard;
