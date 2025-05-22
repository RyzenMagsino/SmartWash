import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // You can add login logic here (e.g., validation)
    navigate('/expense');
  };

  return (
    <div className="background">
      <div className="login-container">
        <h2>SmartWash</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Log In</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
