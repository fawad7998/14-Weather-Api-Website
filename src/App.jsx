import React, { useState } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake, faSun } from "@fortawesome/free-solid-svg-icons";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [invalid, setInvalid] = useState(false); // Added state for invalid message

  const API_KEY = "ee2e378cabe7c9009a73492104c4388a";

  const fetchWeatherData = async (city) => {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
        setInvalid(false); // Reset invalid message on success
      } else {
        console.error("Error fetching weather data");
        setWeatherData(null);
        setInvalid(true); // Set invalid message on failure
      }
    } catch (error) {
      console.error("An error occurred while fetching weather data", error);
      setWeatherData(null);
      setInvalid(true); // Set invalid message on error
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeatherData(city);
    }
  };

  const temperatureIcon = (temp) => {
    if (temp <= 10) {
      return <FontAwesomeIcon icon={faSnowflake} color="blue" />;
    } else if (temp >= 30) {
      return <FontAwesomeIcon icon={faSun} color="red" />;
    }
    return null;
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center text-shadow">Weather App</h2>
      <div className="w-full flex items-center justify-center">
        <div className="flex search1">
          <input
            type="text"
            placeholder="Enter city"
            className="px-2 py-1 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="px-4 py-1 bg-blue-500 text-white"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}

      {invalid && <div className="text-red-600 text-center">Invalid city name. Please try again.</div>}

      {weatherData && (
        <div className="flex justify-center text-center mt-16">
          <div className="bg-green-100 w-3/4 md:w-1/2 lg:w-1/3 rounded-lg p-6 shadow-lg">
            <h1 className="text-2xl font-semibold mb-4">{weatherData.name}</h1>
            <div className="flex items-center justify-center my-4">
              <span className="text-lg font-thin border w-32 py-2 px-4">
                {temperatureIcon(weatherData.main.temp)} {weatherData.main.temp}°C
              </span>
              <span className="text-lg font-thin border w-32 py-2 px-4 ml-4">
                {((weatherData.main.temp * 9/5) + 32).toFixed(2)}°F
              </span>
            </div>
            
          </div>
          
        </div>
      )}
    </div>
  );
};

export default Weather;
