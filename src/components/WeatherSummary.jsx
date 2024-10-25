import { useState, useEffect } from 'react';

const WeatherSummary = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=${apiKey}`
      );
      const data = await response.json();
      setWeatherData(data);
    };
    fetchData();
  }, [apiKey]);

  return (
    <div className="bg-white hover:bg-yellow-200  p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 ">Real-Time Weather Data</h2>
      {weatherData && (
        <div>
          <p>Main: {weatherData.weather[0].main}</p>
          <p>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)} °C</p>
        </div>
      )}
    </div>
  );
};
export default WeatherSummary;
