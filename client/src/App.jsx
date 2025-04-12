import { useState } from "react"
import axios from "axios"
import SearchBar from "./components/SearchBar"
import WeatherCard from "./components/WeatherCard"
import ForecastCard from "./components/ForecastCard"

export default function WeatherDashboard() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState([])

  const handleSearch = async (query) => {
    if (!query) return
    setLoading(true)
    setError("")
    setWeatherData(null)
    setForecastData([])

    try {
      const res = await axios.get(`http://localhost:5000/weather?city=${query}`)
      setWeatherData(res.data.current)
      setForecastData(res.data.forecast)
    } catch (err) {
      setError("City not found. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-sky-800 mb-2 flex items-center justify-center">
            <span className="text-3xl mr-2">🌤</span>
            Weather Dashboard
          </h1>
          <p className="text-sky-600 text-lg">Get real-time weather updates for any location</p>
        </div>

        <SearchBar onSearch={handleSearch} />

        {loading && (
          <div className="flex justify-center my-8">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-12 w-12 bg-sky-200 rounded-full mb-2"></div>
              <div className="h-4 w-32 bg-sky-200 rounded mb-2"></div>
              <div className="h-3 w-24 bg-sky-100 rounded"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="my-8 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-500 font-medium">{error}</p>
            <p className="text-red-400 text-sm mt-1">Please try searching for a different location</p>
          </div>
        )}

        {weatherData && <WeatherCard weather={weatherData} />}

        {forecastData.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 px-1">5-Day Forecast</h2>
            <ForecastCard forecast={forecastData} />
          </div>
        )}
      </div>
    </div>
  )
}
