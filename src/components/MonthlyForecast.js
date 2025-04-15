import React, { useState } from 'react';
import '../styles/MonthlyForecast.css';

const MonthlyForecast = ({ forecastData }) => {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null); 

  if (!forecastData || !forecastData.list) {
    return <p>No monthly forecast data available.</p>;
  }

  const toggleExpand = (index) => {
    setExpandedCardIndex(expandedCardIndex === index ? null : index);
  };

  return (
    <div className="monthly-forecast">
      <h2>Monthly Forecast</h2>
      <div className="forecast-cards">
        {forecastData.list.map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString();
          const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;

          return (
            <div
              key={index}
              className="forecast-card"
              onClick={() => toggleExpand(index)} 
            >
              <p className="forecast-date">{date}</p>
              <img src={iconUrl} alt={day.weather[0].description} />
              <p className="forecast-temp">{Math.round(day.temp.day)}°F</p>
              <p>H:{Math.round(day.temp.max)}° L:{Math.round(day.temp.min)}°</p>

              {expandedCardIndex === index && (
                <div className="forecast-details">
                  <p><strong>Condition:</strong> {day.weather[0].description}</p>
                  <p><strong>Feels Like:</strong> {Math.round(day.feels_like.day)}°F</p>
                  <p><strong>Humidity:</strong> {day.humidity}%</p>
                  <p><strong>Wind Speed:</strong> {Math.round(day.speed)} mph</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyForecast;