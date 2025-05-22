import React, { useState } from 'react';
import './sales.css';
import { FaUserCircle, FaBell, FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const initialSales = [
  { customer: 'Pedro Penduko', plate: '00001', service: 'EC1', time: '11:30', price: 130, status: 'blue' },
  { customer: 'Juan Dela Cruz', plate: '00002', service: 'EC2', time: '12:00', price: 180, status: 'yellow' },
  { customer: 'Maria Clara', plate: '00003', service: 'EC3', time: '12:30', price: 220, status: 'red' },
];

export default function Sales() {
  const navigate = useNavigate();
  const [sales, setSales] = useState(initialSales);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showForecast, setShowForecast] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [passForm, setPassForm] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: '',
  });

  // New states for status edit popup
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempStatus, setTempStatus] = useState(null);

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setPassForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLogout = () => navigate('/login');

  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, s) => sum + s.price, 0);
  const estimatedProfit = totalRevenue * 0.65;

  const getColorClass = (status) => {
    switch (status) {
      case 'red': return 'status-red';
      case 'blue': return 'status-blue';
      case 'yellow': return 'status-yellow';
      case 'green': return 'status-green';
      default: return '';
    }
  };

  const handleDelete = (index) => {
    const updated = [...sales];
    updated.splice(index, 1);
    setSales(updated);
  };

  // Open status picker popup
  const openStatusPicker = (index) => {
    setEditingIndex(index);
    setTempStatus(sales[index].status);
  };

  // Confirm status change and update state
  const confirmStatusChange = () => {
    if (editingIndex !== null) {
      const updated = [...sales];
      updated[editingIndex].status = tempStatus;
      setSales(updated);
      setEditingIndex(null);
      setTempStatus(null);
    }
  };

  // Cancel popup without changing
  const cancelStatusChange = () => {
    setEditingIndex(null);
    setTempStatus(null);
  };

  const getForecastData = () => {
    const avgDailyRevenue = totalRevenue / 7;
    const forecast = [];
    const today = new Date();

    for (let i = 1; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      forecast.push({
        date: date.toISOString().split('T')[0],
        projected: Math.round(avgDailyRevenue + (Math.random() - 0.5) * 50),
      });
    }
    return forecast;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>E&C CARWASH</h1>
        <div className="tabs">
          <button onClick={() => navigate('/pos')}>POS</button>
          <button onClick={() => navigate('/sales')}>SALES</button>
          <button onClick={() => navigate('/expense')}>EXPENSES</button>
        </div>
        <div className="icons">
          <FaBell />
          <div className="profile-dropdown-wrapper">
            <FaUserCircle onClick={() => setShowProfileDropdown(prev => !prev)} />
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <button onClick={() => setShowChangePassModal(true)}>Account</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="top-bar">
        <input type="text" placeholder="MM-DD-YYYY 📅" />
        <div className="expense-cards-wrapper">
          <div className="expense-cards">
            <div className="card">
              <h3>SALES</h3>
              <p>{totalSales.toString().padStart(2, '0')}</p>
            </div>
            <div className="card">
              <h3>REVENUE</h3>
              <p>{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="card">
              <h3>PROFIT</h3>
              <p>{estimatedProfit.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>
        <div className="actions">
          <button className="report-btn" onClick={() => setShowReport(true)}>View Report</button>
          <button className="report-btn" onClick={() => setShowForecast(true)}>View Forecast</button>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>CUSTOMER</th>
              <th>PLATE NO.</th>
              <th>SERVICE</th>
              <th>TIME</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, idx) => (
              <tr key={idx}>
                <td>{sale.customer}</td>
                <td>{sale.plate}</td>
                <td>{sale.service}</td>
                <td>{sale.time}</td>
                <td>
                  <span className={`status-circle ${getColorClass(sale.status)}`}></span>
                  ₱{sale.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </td>
                <td>
                  <FaEdit className="edit-icon" onClick={() => openStatusPicker(idx)} />
                  <FaTrash className="trash-icon" onClick={() => handleDelete(idx)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">
          TOTAL: <strong>₱{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
        </div>
      </div>

      {/* Status picker modal */}
      {editingIndex !== null && (
        <div className="modal-backdrop" onClick={cancelStatusChange}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Choose Service Status</h3>
            <div className="status-list">
  {[
    { label: 'Pending', value: 'red' },
    { label: 'Ongoing', value: 'yellow' },
    { label: 'Completed', value: 'blue' },
    { label: 'Picked up', value: 'green' },
  ].map(({ label, value }) => (
    <div
      key={value}
      className="status-item"
      onClick={() => setTempStatus(value)}
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === 'Enter') setTempStatus(value); }}
    >
      <span className={`status-bullet ${tempStatus === value ? 'selected' : ''}`}></span>
      <span>{label}</span>
    </div>
  ))}
</div>

            <div className="modal-buttons">
              <button className="add-btn" onClick={confirmStatusChange}>Confirm</button>
              <button className="report-btn" onClick={cancelStatusChange}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {showReport && (
        <div className="modal-backdrop" onClick={() => setShowReport(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="report-modal-content">
              <h3>Sales Report Summary</h3>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Price (₱)</th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale, i) => (
                    <tr key={i}>
                      <td>{sale.customer}</td>
                      <td>{sale.service}</td>
                      <td>₱{sale.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="report-total">
                Total: ₱{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="modal-buttons">
                <button className="add-btn" onClick={() => window.print()}>Print</button>
                <button className="report-btn" onClick={() => setShowReport(false)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showForecast && (
        <div className="modal-backdrop" onClick={() => setShowForecast(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="report-modal-content">
              <h3>7-Day Sales Forecast</h3>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Projected Revenue (₱)</th>
                  </tr>
                </thead>
                <tbody>
                  {getForecastData().map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.date}</td>
                      <td>₱{item.projected.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="modal-buttons">
                <button className="report-btn" onClick={() => setShowForecast(false)}>Close</button>
              </div>
            </div>
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
              <button className="add-btn">Save</button>
              <button className="report-btn" onClick={() => setShowChangePassModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
