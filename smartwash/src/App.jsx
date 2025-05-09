import React from 'react';
import './style.css';

console.log("✅ App.jsx is loaded"); // Check if this prints

function App() {
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

export default App;
