// src/pages/Forecast/forecast.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './forecast.css';
import Navbar from '../../navbar/navbar';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const profitData = [
  { month: 'Jan', value: 2000 },
  { month: 'Feb', value: 2500 },
  { month: 'Mar', value: 2200 },
  { month: 'Apr', value: 18000 },
  { month: 'May', value: 40000 },
  { month: 'Jun', value: 38000 },
  { month: 'Jul', value: 36000 },
  { month: 'Aug', value: 34000 },
  { month: 'Sep', value: 35000 },
  { month: 'Oct', value: 32000 },
  { month: 'Nov', value: 17000 },
  { month: 'Dec', value: 15000 },
];

const customerData = [
  { month: 'Jan', value: 80 },
  { month: 'Feb', value: 90 },
  { month: 'Mar', value: 100 },
  { month: 'Apr', value: 180 },
  { month: 'May', value: 220 },
  { month: 'Jun', value: 240 },
  { month: 'Jul', value: 260 },
  { month: 'Aug', value: 250 },
  { month: 'Sep', value: 245 },
  { month: 'Oct', value: 230 },
  { month: 'Nov', value: 180 },
  { month: 'Dec', value: 160 },
];

const staffSalesData = [
  { month: 'Jan', value: 20 },
  { month: 'Feb', value: 22 },
  { month: 'Mar', value: 24 },
  { month: 'Apr', value: 26 },
  { month: 'May', value: 28 },
  { month: 'Jun', value: 30 },
  { month: 'Jul', value: 32 },
  { month: 'Aug', value: 33 },
  { month: 'Sep', value: 31 },
  { month: 'Oct', value: 29 },
  { month: 'Nov', value: 27 },
  { month: 'Dec', value: 25 },
];

const Forecast = () => {
  const navigate = useNavigate();
  const [selectedAnalysis, setSelectedAnalysis] = useState('profit');
  

  const getTitle = () => {
    switch (selectedAnalysis) {
      case 'profit':
        return 'Profit Margin Analysis';
      case 'customer':
        return 'Customer Growth Analysis';
      case 'staff':
        return 'Sales and Staff Analysis';
      default:
        return '';
    }
  };

  const getData = () => {
    switch (selectedAnalysis) {
      case 'profit':
        return profitData;
      case 'customer':
        return customerData;
      case 'staff':
        return staffSalesData;
      default:
        return [];
    }
  };


const handleLogout = () => {
  navigate('/login');
};


  return (
  <div className="forecast-body">
    <div className="forecast-wrapper">
      <div className="forecast-container">
        <Navbar onLogout={handleLogout} />

        <div className="filter-section">
          <select id="year-select">
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>

          <select
            onChange={(e) => setSelectedAnalysis(e.target.value)}
            value={selectedAnalysis}
          >
            <option value="profit">Profit Margin Analysis</option>
            <option value="customer">Customer Growth</option>
            <option value="staff">Sales and Staff Analysis</option>
          </select>
        </div>

        <div className="chart-section">
          <h2>{getTitle()}</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getData()}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="footer-banner">
        {selectedAnalysis === 'profit' && 'THERE IS A 30% INCREASE IN PROFIT IN 2024'}
        {selectedAnalysis === 'customer' && 'CUSTOMER BASE GREW BY 50% IN 2024'}
        {selectedAnalysis === 'staff' && 'STAFF SALES PERFORMANCE IMPROVED BY 20% IN 2024'}
      </div>
    </div>
  </div>
);

};

export default Forecast;
