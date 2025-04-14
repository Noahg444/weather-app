// src/components/App.js

import React, { useState, useEffect } from 'react';
import WeatherDisplay from './WeatherDisplay';
import LocationInput from './LocationInput';
import MonthlyForecast from './MonthlyForecast';
import '../styles/App.css';
import { 
  getWeatherData, 
  getWeatherDataByCity, 
  getMonthlyForecastData 
} from '../services/WeatherService';

function App() {
  const [coords, setCoords] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [monthlyForecast, setMonthlyForecast] = useState(null);
  const [error, setError] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingMonthly, setLoadingMonthly] = useState(false);

  // Get user's location on mount.
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoords({ lat: latitude, lon: longitude });
          setLoadingLocation(false);
        },
        (err) => {
          setError("Error getting geolocation: " + err.message);
          setLoadingLocation(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoadingLocation(false);
    }
  }, []);

  // Fetch current weather based on coordinates.
  useEffect(() => {
    if (coords) {
      setLoadingWeather(true);
      getWeatherData(coords.lat, coords.lon)
        .then((data) => {
          setWeatherData(data);
          setLoadingWeather(false);
        })
        .catch((err) => {
          setError("Error fetching weather data: " + err.message);
          setLoadingWeather(false);
        });
    }
  }, [coords]);

  // When weatherData updates and includes a city name, fetch the monthly forecast automatically.
  useEffect(() => {
    if (weatherData && weatherData.name) {
      setLoadingMonthly(true);
      getMonthlyForecastData(weatherData.name)
        .then((data) => {
          setMonthlyForecast(data);
          setLoadingMonthly(false);
        })
        .catch((err) => {
          setError("Error fetching monthly forecast: " + err.message);
          setLoadingMonthly(false);
        });
    }
  }, [weatherData]);

  // Handler for manual city search.
  const handleCitySearch = (city) => {
    setLoadingWeather(true);
    getWeatherDataByCity(city)
      .then((data) => {
        setWeatherData(data);
        // Update coordinates based on the city search result.
        if (data.coord) {
          setCoords({ lat: data.coord.lat, lon: data.coord.lon });
        }
        setLoadingWeather(false);
      })
      .catch((err) => {
        setError("Error fetching weather data for city: " + err.message);
        setLoadingWeather(false);
      });
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <LocationInput onSearch={handleCitySearch} />
      <p className="instructions">
        Tip: Enter a city name (e.g., "New York") to search. Temperature is displayed in Fahrenheit.
      </p>
      {loadingLocation ? (
        <p>Loading location...</p>
      ) : error ? (
        <p>{error}</p>
      ) : loadingWeather ? (
        <p>Loading weather data...</p>
      ) : (
        <>
          <WeatherDisplay weatherData={weatherData} />
          {loadingMonthly ? (
            <p>Loading monthly forecast...</p>
          ) : (
            <MonthlyForecast forecastData={monthlyForecast} />
          )}
        </>
      )}
    </div>
  );
}

export default App;