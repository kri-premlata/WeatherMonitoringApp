import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherSummary from './WeatherSummary';
import AlertThresholds from './AlertThresholds';
import Visualizations from './Visualizations';

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [forecastData, setForecastData] = useState([]);
  const [dailySummary, setDailySummary] = useState(null);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const alertThreshold = localStorage.getItem('alertThreshold') || 35;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch current weather data
        const currentWeatherResponses = await Promise.all(
          cities.map(city =>
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
          )
        );
        const currentWeatherData = currentWeatherResponses.map(response => ({
          city: response.data.name,
          temp: response.data.main.temp,
          feels_like: response.data.main.feels_like,
          humidity: response.data.main.humidity,
          wind_speed: response.data.wind.speed,
          main: response.data.weather[0].main,
          description: response.data.weather[0].description,
          dt: response.data.dt
        }));
        setWeatherData(currentWeatherData);

        // Fetch forecast data for visualizations
        const forecastResponses = await Promise.all(
          cities.map(city =>
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
          )
        );
        const forecastData = forecastResponses.map((response, index) => ({
          city: cities[index],
          forecast: response.data.list.slice(0, 5).map(item => ({
            dt: item.dt,
            temp: item.main.temp,
            description: item.weather[0].description
          }))
        }));
        setForecastData(forecastData);

        processDailySummary(currentWeatherData);
        checkAlerts(currentWeatherData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Failed to fetch weather data. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 300000); // Fetch data every 5 minutes

    return () => clearInterval(intervalId);
  }, [apiKey]);

  const processDailySummary = (data) => {
    const avgTemp = data.reduce((sum, item) => sum + item.temp, 0) / data.length;
    const maxTemp = Math.max(...data.map(item => item.temp));
    const minTemp = Math.min(...data.map(item => item.temp));
    const dominantCondition = data.reduce((acc, item) => {
      acc[item.main] = (acc[item.main] || 0) + 1;
      return acc;
    }, {});
    const dominantWeather = Object.keys(dominantCondition).reduce((a, b) => dominantCondition[a] > dominantCondition[b] ? a : b);

    setDailySummary({
      date: new Date().toISOString().split('T')[0],
      avgTemp,
      maxTemp,
      minTemp,
      dominantWeather
    });
  };

  const checkAlerts = (data) => {
    const alerts = data.filter(item => item.temp > alertThreshold);
    if (alerts.length > 0) {
      setAlert(`Temperature alert! ${alerts.length} cities have temperatures above ${alertThreshold}°C.`);
    } else {
      setAlert(null);
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading weather data...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="bg-gradient-to-r from-blue-500 to-green-500 text-4xl hover:text-yellow-300 text-blue-800 font-bold text-center mb-8 p-5 w-[50%] rounded-lg mx-auto">Weather Monitoring Dashboard</h1>
      {alert && <p className="text-center text-red-500 text-lg mb-4">{alert}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <WeatherSummary dailySummary={dailySummary} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <AlertThresholds currentThreshold={alertThreshold} onSave={(newThreshold) => localStorage.setItem('alertThreshold', newThreshold)} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <Visualizations forecastData={forecastData} />
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-4xl ml-10 hover:text-blue-500 text-green-600 font-bold mb-4">Detailed Weather Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weatherData.map((data, index) => (
            <div key={index} className="bg-white p-4 rounded shadow-md">
              <h3 className="text-xl font-bold">{data.city}</h3>
              <p>Temperature: {data.temp.toFixed(1)}°C</p>
              <p>Feels Like: {data.feels_like.toFixed(1)}°C</p>
              <p>Humidity: {data.humidity}%</p>
              <p>Wind Speed: {data.wind_speed} m/s</p>
              <p>Condition: {data.description}</p>
              <p>Last Updated: {new Date(data.dt * 1000).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;