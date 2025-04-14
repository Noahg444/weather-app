// src/components/WeatherDisplay.js

import React from 'react';
import '../styles/WeatherDisplay.css';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return <p>No weather data available. Please check back later.</p>;
  }

  const { main, weather, wind, name } = weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  return (
    <div className="weather-display">
      <h2>Current Weather in {name}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <p><strong>Condition:</strong> {weather[0].description}</p>
      <p><strong>Temperature:</strong> {main.temp} °F</p>
      <p><strong>Humidity:</strong> {main.humidity}%</p>
      <p><strong>Wind Speed:</strong> {wind.speed} mph</p>
    </div>
  );
};

export default WeatherDisplay;