import React from 'react';
import { Link } from 'react-router-dom';
import WeatherSummary from './WeatherSummary';
import Visualizations from './Visualizations';
import AlertThresholds from './AlertThresholds';

const Home = () => {
  return (
    <div className="min-h-screen  bg-gradient-to-r mt-10 from-blue-500 to-green-500 text-white ">
      <header className="bg-blue-800 text-white p-6 shadow-lg  ">
        <h1 className="text-4xl font-bold text-center hover:text-yellow-300">Welcome to the Weather Monitoring App</h1>
        <p className="text-center mt-2">Real-Time Weather Data Processing System</p>
      </header>
      
      <main className="container mx-auto py-10">
        <section className="mb-10 bg-white text-black p-6 rounded-lg shadow-lg">
        <Link to="/dashboard" className="mt-4 inline-block ml-[40%] bg-green-600 text-white py-2 px-4 font-semibold rounded hover:bg-yellow-300 hover:text-blue-600">
            View Full Dashboard
          </Link>
          <h2 className="text-4xl font-bold mb-4">Dashboard Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <WeatherSummary />
            <AlertThresholds />
            <Visualizations />
          </div>
          <Link to="/dashboard" className="mt-4 inline-block  bg-blue-600 text-white py-2 px-4 rounded hover:bg-green-600">
            View Full Dashboard
          </Link>
        </section>
      </main>
    </div>
  );
};

export default Home;
