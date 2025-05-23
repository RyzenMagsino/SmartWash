import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pos.css';
import Navbar from '../../navbar/navbar';

const services = [
  { id: 'EC1', price: 150 }, { id: 'EC2', price: 200 }, { id: 'EC3', price: 250 }, { id: 'EC4', price: 300 },
  { id: 'EC5', price: 350 }, { id: 'EC6', price: 400 }, { id: 'EC7', price: 450 }, { id: 'EC8', price: 500 },
  { id: 'EC9', price: 550 }, { id: 'EC10', price: 600 }, { id: 'EC11', price: 650 }, { id: 'EC12', price: 1600 },
];

const carTypes = [
  { type: 'SUV', priceAdd: 50 },
  { type: 'Sedan', priceAdd: 20 },
  { type: 'Truck', priceAdd: 70 },
];

export default function POS() {
  const navigate = useNavigate();
  const [carType, setCarType] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [plateNumber, setPlateNumber] = useState('');
  const [cash, setCash] = useState('');
  const [showReceipt, setShowReceipt] = useState(false);


  const handleSelectService = (service) => {
    if (!selectedServices.find(s => s.id === service.id)) {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleRemoveService = (id) => {
    setSelectedServices(selectedServices.filter(s => s.id !== id));
  };

  // Find priceAdd based on selected carType
  const priceAdd = carTypes.find(c => c.type === carType)?.priceAdd || 0;

  // Calculate total with carType price add
  const total = selectedServices.reduce((sum, s) => sum + s.price + priceAdd, 0);

const numericCash = parseFloat(cash);
const change = numericCash >= 0 ? numericCash - total : null;


  const handleLogout = () => {
    navigate('/');
  };

const handlePayment = () => {
  if (selectedServices.length === 0 || !customerName || !plateNumber || !carType) {
    alert('Please fill in all details and select at least one service.');
    return;
  }
  if (!cash || parseFloat(cash) < total) {
    alert('Cash is insufficient.');
    return;
  }
  setShowReceipt(true);
};




  return (
    <div className="pos-screen">
      <Navbar onLogout={handleLogout} />

      <div className="top-row">
        <div className="inputs-group">
          <select
            value={carType}
            onChange={(e) => setCarType(e.target.value)}
            className="car-type-dropdown"
          >
            <option value="">Select Car Type</option>
            {carTypes.map(c => (
              <option key={c.type} value={c.type}>{c.type}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="CUSTOMER NAME"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          <input
            type="text"
            placeholder="ADD PLATE NUMBER"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />
        </div>

        <div className="time-info">
          <div className="time">11:45 am</div>
          <div className="date">October 30, 2026</div>
        </div>
      </div>

      <div className="main-panel">
        <div className="services-grid">
          {services.map((s) => (
            <button key={s.id} className="service-btn" onClick={() => handleSelectService(s)}>
              {s.id}
            </button>
          ))}
        </div>

        <div className="summary-panel">
          <div className="summary-box">
            <h3>Service Type/s</h3>

            {/* Show summary header only if all three inputs have values */}
            {carType && customerName && plateNumber && (
              <h3 className="summary-header">
                {carType} - {customerName} - {plateNumber}
              </h3>
            )}

            <div className="summary-list">
              {selectedServices.map((s, i) => (
                <div className="summary-item" key={i}>
                  <span onClick={() => handleRemoveService(s.id)}>✖</span>
                  <span className="item-line">
                    <span className="item-label">{s.id}</span>
                    <span className="item-dots" />
                    {/* Show adjusted price */}
                    <span className="item-price">{(s.price + priceAdd).toFixed(2)}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="total-row">
              <span>TOTAL:</span>
              <span>{total.toFixed(2)}</span>
            </div>

            <div className="cash-row">
              <span>CASH:</span>
              <input
                type="number"
                min="0"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
                className="cash-input"
              />
            </div>

            <div className="change-row">
  <span>CHANGE:</span>
  <span className={change !== null && change < 0 ? 'negative-change' : ''}>
    {change !== null ? change.toFixed(2) : '-'}
  </span>
</div>


            <button className="payment-btn" onClick={handlePayment}>PAYMENT</button>





          </div>
        </div>

{showReceipt && (
  <div className="receipt-overlay">
    <div className="receipt-box">
      <h2>Receipt</h2>
      <p><strong>{carType} - {customerName} - {plateNumber}</strong></p>
      <hr />
      {selectedServices.map((s) => (
        <div key={s.id} className="receipt-item">
          <span>{s.id}</span>
          <span>{s.price.toFixed(2)}</span>
        </div>
      ))}
      <hr />
      <div className="receipt-total">
        <span>Total:</span>
        <span>{total.toFixed(2)}</span>
      </div>
      <div className="receipt-cash">
        <span>Cash:</span>
        <span>{parseFloat(cash).toFixed(2)}</span>
      </div>
      <div className="receipt-change">
        <span>Change:</span>
        <span>{change.toFixed(2)}</span>
      </div>
      <button onClick={() => {
        setShowReceipt(false);
        // Reset form here
        setSelectedServices([]);
        setCustomerName('');
        setPlateNumber('');
        setCash('');
        setCarType('');
      }}>
        Done
      </button>
    </div>
  </div>
)}





      </div>
    </div>
  );
}
