import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() === "") {
      setError("Please enter a city name."); 
    } else {
      setError("");
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-center my-4">
        <input
          type="text"
          value={city}
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 rounded-l-lg w-64 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="my-8 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
      )}
    </div>
  );
};

export default SearchBar;
