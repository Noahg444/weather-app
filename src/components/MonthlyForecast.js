import React from 'react';
import '../styles/MonthlyForecast.css';

const MonthlyForecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) {
    return <p>No monthly forecast data available.</p>;
  }

  return (
    <div className="monthly-forecast">
      <h2>Monthly Forecast</h2>
      <div className="forecast-cards">
        {forecastData.list.map((day, index) => {
          const date = new Date(day.dt * 1000).toLocaleDateString();
          const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
          return (
            <div key={index} className="forecast-card">
              <p className="forecast-date">{date}</p>
              <img src={iconUrl} alt={day.weather[0].description} />
              <p className="forecast-description">{day.weather[0].description}</p>
              <p className="forecast-temp">Day: {day.temp.day} °F</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MonthlyForecast;