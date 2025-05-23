// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);

  const [passForm, setPassForm] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: '',
  });

  const notifications = [
    {
      id: 1,
      title: "CUSTOMER ALERT",
      message: "You’ll need to add more employees next month.",
      timestamp: "May 23, 2025 | 3:45 PM",
    },
    {
      id: 2,
      title: "SALES REMINDER",
      message: "Weekly sales report is due tomorrow.",
      timestamp: "May 22, 2025 | 10:15 AM",
    },
    {
      id: 3,
      title: "EXPENSE UPDATE",
      message: "Monthly expense input missing.",
      timestamp: "May 21, 2025 | 8:00 AM",
    },
  ];

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setPassForm(prev => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = () => {
    const { oldPass, newPass, confirmPass } = passForm;

    if (!oldPass || !newPass || !confirmPass) {
      alert("Please fill in all fields");
      return;
    }

    if (newPass !== confirmPass) {
      alert("New passwords do not match");
      return;
    }

    alert("Password changed successfully");
    setShowChangePassModal(false);
    setPassForm({ oldPass: '', newPass: '', confirmPass: '' });
  };

  const handleNotificationClick = (msg) => {
    alert(`${msg.title}\n\n${msg.message}\n\n${msg.timestamp}`);
  };

  return (
    <>
      <div className="dashboard-header">
        <h1>E&C CARWASH</h1>
        <div className="nav-tabs">
          <button className={location.pathname === '/pos' ? 'active' : ''} onClick={() => navigate('/pos')}>POS</button>
          <button className={location.pathname === '/sales' ? 'active' : ''} onClick={() => navigate('/sales')}>SALES</button>
          <button className={location.pathname === '/expense' ? 'active' : ''} onClick={() => navigate('/expense')}>EXPENSES</button>
        </div>
        <div className="profile-area">
          <FaBell className="gold-bell" onClick={() => setShowNotificationPanel(prev => !prev)} />
          <div className="profile-dropdown-wrapper">
            <FaUserCircle onClick={() => setShowProfileDropdown(prev => !prev)} />
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <button onClick={() => setShowChangePassModal(true)}>Account</button>
                <button onClick={onLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showNotificationPanel && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button className="close-btn" onClick={() => setShowNotificationPanel(false)}>×</button>
          </div>
          <div className="notification-list">
            {notifications.map((msg) => (
              <div key={msg.id} className="notification-item" onClick={() => handleNotificationClick(msg)}>
                <strong>{msg.title}</strong>
                <p>{msg.message}</p>
                <span className="timestamp">{msg.timestamp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {showChangePassModal && (
        <div className="modal-backdrop">
          <div className="modal change-pass-modal">
            <h2>Change Password</h2>
            <div className="form-group">
              <label htmlFor="oldPass">Old Password</label>
              <input
                type="password"
                name="oldPass"
                id="oldPass"
                value={passForm.oldPass}
                onChange={handlePassChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="newPass">New Password</label>
              <input
                type="password"
                name="newPass"
                id="newPass"
                value={passForm.newPass}
                onChange={handlePassChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPass">Confirm Password</label>
              <input
                type="password"
                name="confirmPass"
                id="confirmPass"
                value={passForm.confirmPass}
                onChange={handlePassChange}
              />
            </div>
            <div className="modal-buttons">
              <button className="add-btn" onClick={handleChangePassword}>Save</button>
              <button className="report-btn" onClick={() => setShowChangePassModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
