const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const MONTHLY_BASE_URL = "https://pro.openweathermap.org/data/2.5/forecast/climate";

/**
 * Fetch current weather data based on latitude and longitude.
 * @param {number} lat - Latitude.
 * @param {number} lon - Longitude.
 * @returns {Promise<object>} - The weather data returned by the API.
 */
export async function getWeatherData(lat, lon) {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch current weather data based on city name.
 * @param {string} city - Name of the city.
 * @returns {Promise<object>} - The weather data returned by the API.
 */
export async function getWeatherDataByCity(city) {
  const url = `${BASE_URL}?q=${city}&units=imperial&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to fetch weather data for the specified city");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}

/**
 * Fetch the monthly (30-day) climate forecast based on a city name.
 *
 * @param {string} city - The city for which to fetch the forecast.
 * @returns {Promise<object>} - The forecast data.
 */
export async function getMonthlyForecastData(city) {
  const url = `${MONTHLY_BASE_URL}?q=${encodeURIComponent(city)}&units=imperial&appid=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Unable to fetch monthly forecast. " + response.statusText);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}