import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import WeatherSummary from "../components/WeatherSummary";
import Visualizations from "../components/Visualizations";
import AlertThresholds from "../components/AlertThresholds";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/weather-summary" element={<WeatherSummary />} />
      <Route path="/alerts" element={<AlertThresholds />} />
      <Route path="/visualizations" element={<Visualizations />} />
    </Routes>
  );
};

export default MainRoutes;
