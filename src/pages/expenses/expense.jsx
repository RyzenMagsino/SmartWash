import React, { useState } from 'react';
import './expense.css';
import { FaUserCircle, FaBell, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../navbar/navbar';

const initialExpenses = [
  { label: 'MISCELLANEOUS', amount: 200 },
  { label: 'ELECTRICITY', amount: 5000 },
  { label: 'WATER', amount: 2000 },
];

const initialItems = [
  { name: 'SHAMPOO', order: '00001', by: 'jewell', time: '11:30', price: 130 },
  { name: 'WAX', order: '00002', by: 'ryzen', time: '11:30', price: 130 },
  { name: 'SHOPEE', order: '00003', by: 'vincent', time: '11:30', price: 200 },
  { name: 'TOWELS', order: '00004', by: 'topher', time: '11:30', price: 130 },
  { name: 'TIRE BLACK', order: '00005', by: 'jewell', time: '11:30', price: 130 },
  { name: 'ELECTRICITY', order: '00006', by: 'ryzen', time: '11:30', price: 5000 },
  { name: 'WATER', order: '00007', by: 'vincent', time: '11:30', price: 2000 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [expenses] = useState(initialExpenses);
  const [items, setItems] = useState(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [showReport, setShowReport] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    by: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteItem = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.by || !formData.price) {
      alert('Please fill in all fields');
      return;
    }

    const newItem = {
      name: formData.name.toUpperCase(),
      order: `0000${items.length + 1}`,
      by: formData.by,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      price: Number(formData.price),
    };

    setItems(prev => [...prev, newItem]);
    setFormData({ name: '', by: '', price: '' });
    setShowModal(false);
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const total = items.reduce((sum, item) => sum + item.price, 0);

  
  return (
    <div className="dashboard">
      <Navbar onLogout={handleLogout} />

      <div className="top-bar">
        <input type="text" placeholder="MM-DD-YYYY 📅" />

        <div className="expense-cards-wrapper">
          <div className="expense-cards">
            {expenses.map((exp, i) => (
              <div key={i} className="card">
                <h3>{exp.label}</h3>
                <p>{exp.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="actions">
          <button className="add-btn" onClick={() => setShowModal(true)}><FaPlus /> Add new</button>
          <button className="report-btn" onClick={() => setShowReport(true)}>View Report</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Add New Item</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Item Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                By:
                <input type="text" name="by" value={formData.by} onChange={handleChange} />
              </label>
              <label>
                Price:
                <input type="number" name="price" value={formData.price} onChange={handleChange} />
              </label>
              <div className="modal-buttons">
                <button type="submit" className="add-btn">Add</button>
                <button type="button" className="report-btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>ORDER NO.</th>
              <th>BY</th>
              <th>TIME</th>
              <th>PRICE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.order}</td>
                <td>{item.by}</td>
                <td>{item.time}</td>
                <td>{item.price.toLocaleString()}</td>
                <FaTrash className="trash-icon" onClick={() => handleDeleteItem(idx)} />
              </tr>
            ))}
          </tbody>
        </table>
        <div className="total">TOTAL : <strong>{total.toLocaleString()}</strong></div>
      </div>

      {showReport && (
  <div className="modal-backdrop" onClick={() => setShowReport(false)}>
    <div className="modal" id="report-modal" onClick={(e) => e.stopPropagation()}>
      <div className="report-modal-content">
        <h3>Expense Report History</h3>
        <table className="report-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Order No.</th>
              <th>By</th>
              <th>Time</th>
              <th>Price (₱)</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td>{item.order}</td>
                <td>{item.by}</td>
                <td>{item.time}</td>
                <td>{item.price.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="report-total">
          Total: ₱{total.toLocaleString()}
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
