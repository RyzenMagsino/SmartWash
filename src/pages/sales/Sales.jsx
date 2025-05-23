import React, { useState } from 'react';
import './sales.css';
import { FaUserCircle, FaBell, FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/navbar';

const initialSales = [
  { customer: 'Pedro Penduko', plate: '00001', service: 'EC1', time: '11:30', price: 130, status: 'blue' },
  { customer: 'Juan Dela Cruz', plate: '00002', service: 'EC2', time: '12:00', price: 180, status: 'yellow' },
  { customer: 'Maria Clara', plate: '00003', service: 'EC3', time: '12:30', price: 220, status: 'red' },
];

export default function Sales() {
  const navigate = useNavigate();
  const [sales, setSales] = useState(initialSales);
  const [showReport, setShowReport] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempStatus, setTempStatus] = useState(null);

  const handleLogout = () => navigate('/login');
  const handleForecastClick = () => navigate('/forecast');

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

  const openStatusPicker = (index) => {
    setEditingIndex(index);
    setTempStatus(sales[index].status);
  };

  const confirmStatusChange = () => {
    if (editingIndex !== null) {
      const updated = [...sales];
      updated[editingIndex].status = tempStatus;
      setSales(updated);
      setEditingIndex(null);
      setTempStatus(null);
    }
  };

  const cancelStatusChange = () => {
    setEditingIndex(null);
    setTempStatus(null);
  };

  return (
    <div className="dashboard">
      <Navbar onLogout={handleLogout} />

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
          <button className="report-btn" onClick={handleForecastClick}>View Forecast</button>
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
          <div className="modal" id="report-modal" onClick={(e) => e.stopPropagation()}>
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
    </div>
  );
}
