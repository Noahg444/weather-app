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

  const handleCitySearch = (city) => {
    setLoadingWeather(true);
    getWeatherDataByCity(city)
      .then((data) => {
        setWeatherData(data);
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
      <LocationInput onSearch={handleCitySearch} />
      <p className="instructions">
        Tip: Enter a city name (e.g., "New York") to search. Temperature is displayed in Fahrenheit.
      </p>
      <p className="instructions"> Click upon any card to display more information. </p>
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