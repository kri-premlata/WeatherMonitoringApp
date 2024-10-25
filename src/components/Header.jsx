import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [alert, setAlert] = useState(null);

  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY; // Replace with your OpenWeatherMap API key
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const alertThreshold = localStorage.getItem('alertThreshold') || 35; // Example threshold for temperature alert in Celsius

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const responses = await Promise.all(
          cities.map(city =>
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
          )
        );
        const data = responses.map(response => ({
          city: response.data.name,
          temp: response.data.main.temp - 273.15, // Convert from Kelvin to Celsius
          main: response.data.weather[0].main,
          feels_like: response.data.main.feels_like - 273.15,
          dt: response.data.dt
        }));
        setWeatherData(data);
        checkAlerts(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const intervalId = setInterval(fetchWeatherData, 300000); // Fetch data every 5 minutes
    fetchWeatherData(); // Initial fetch

    return () => clearInterval(intervalId);
  }, []);

  const checkAlerts = (data) => {
    const alerts = data.filter(item => item.temp > alertThreshold);
    if (alerts.length > 0) {
      setAlert(`Temperature alert! ${alerts.length} cities have temperatures above ${alertThreshold}°C.`);
    } else {
      setAlert(null);
    }
  };

  return (
    <header className="bg-green-600 text-white py-4 shadow-md  ">
      <nav className="container mx-auto flex justify-between items-center px-10">
        <h1 className="text-4xl font-bold hover:text-yellow-300">Weather Monitoring</h1>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline hover:text-gray-200">Home</a></li>
          <li><a href="/weather-summary" className="hover:underline hover:text-gray-200">Weather Summary</a></li>
          <li><a href="/alerts" className="hover:underline hover:text-gray-200">Alerts</a></li>
          <li><a href="/visualizations" className="hover:underline hover:text-gray-200">Visualizations</a></li>
        </ul>
      </nav>
      {alert && <p className="text-center text-red-500">{alert}</p>}
    </header>
  );
};

export default Header;


