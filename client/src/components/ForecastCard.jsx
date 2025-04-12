import { Droplets, Thermometer, Wind } from "lucide-react"

const ForecastCard = ({ forecast }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
      {forecast.map((day, index) => (
        <div
          key={index}
          className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
        >
          <div className="bg-sky-600 text-white px-4 py-3">
            <p className="font-medium">
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex flex-col items-center py-4 bg-gradient-to-b from-sky-50 to-white">
            <div className="relative">
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt={day.description}
                className="w-20 h-20"
              />
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-1">{Math.round(day.temperature)}°</p>
            <p className="text-sm capitalize text-gray-600 mt-1">{day.description}</p>
          </div>

          <div className="px-4 py-3 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-700">
              <div className="flex items-center gap-1">
                <Thermometer size={14} className="text-red-500" />
                <span>High: {Math.round(day.maxTemp || day.temperature + 2)}°</span>
              </div>
              <div className="flex items-center gap-1">
                <Thermometer size={14} className="text-blue-500" />
                <span>Low: {Math.round(day.minTemp || day.temperature - 2)}°</span>
              </div>
              <div className="flex items-center gap-1">
                <Wind size={14} className="text-sky-500" />
                <span>Wind: {day.windSpeed || "5"}km/h</span>
              </div>
              <div className="flex items-center gap-1">
                <Droplets size={14} className="text-blue-400" />
                <span>Humidity: {day.humidity || "60"}%</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ForecastCard
