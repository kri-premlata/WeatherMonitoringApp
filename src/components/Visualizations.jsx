import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Visualizations = () => {
  const [chartData, setChartData] = useState(null);
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityData = await Promise.all(
          cities.map(city =>
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
          )
        );

        const datasets = cityData.map((data, index) => ({
          label: cities[index],
          data: data.data.list.slice(0, 5).map(item => item.main.temp),
          borderColor: `hsl(${index * 60}, 70%, 50%)`,
          backgroundColor: `hsla(${index * 60}, 70%, 50%, 0.5)`,
        }));

        const labels = cityData[0].data.list.slice(0, 5).map(item => 
          new Date(item.dt * 1000).toLocaleDateString()
        );

        setChartData({
          labels,
          datasets,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Temperature Trends Across Cities',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Temperature (°C)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  return (
    <div className="bg-white hover:bg-yellow-200  p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Temperature Trends</h2>
      {chartData ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default Visualizations;
