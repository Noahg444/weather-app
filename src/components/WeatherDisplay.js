import React, { useState } from 'react';
import '../styles/WeatherDisplay.css';

const WeatherDisplay = ({ weatherData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!weatherData) {
    return <p>No weather data available. Please check back later.</p>;
  }

  const { main, weather, wind, name } = weatherData;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="weather-display" onClick={toggleExpand}>
      <img src={iconUrl} alt={weather[0].description} />
      <h5>My Location</h5>
      <h3>{name}</h3>
      <p id='mainTemp'>{Math.round(main.temp)}°</p>
      <p id='HL'>Feels Like: {Math.round(main.feels_like)}°</p>
      <p id='HL'>H:{Math.round(main.temp_max)}° L:{Math.round(main.temp_min)}°</p>

      {isExpanded && (
        <div className="weather-details">
          <p><strong>Condition:</strong> {weather[0].description}</p>
          <p><strong>Feels Like:</strong> {Math.round(main.feels_like)}°F</p>
          <p><strong>Humidity:</strong> {main.humidity}%</p>
          <p><strong>Wind Speed:</strong> {Math.round(wind.speed)} mph</p>
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;