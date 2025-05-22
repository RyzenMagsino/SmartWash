// src/pages/dashboard/LoginPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  return (
    <div className="background">
      <div className="login-container">
        <h2>SmartWash</h2>
        <form className="login-form">
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
