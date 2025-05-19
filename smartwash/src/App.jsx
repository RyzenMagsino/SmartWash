// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login/LoginPage';
import Sales from './pages/sales/Sales';
import Expense from './pages/expenses/expense';
import Pos from './pages/pos/Pos';

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Redirect from / to login (or dashboard if logged in) */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Main Routes */}
        <Route path="/pos" element={<Pos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/expense" element={<Expense />} />

        {/* 404 fallback */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
