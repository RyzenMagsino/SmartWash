import React, { useState } from 'react';
import './expense.css';
import { FaUserCircle, FaBell, FaTrash, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

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
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [passForm, setPassForm] = useState({
    oldPass: '',
    newPass: '',
    confirmPass: '',
  });

  const [formData, setFormData] = useState({
    name: '',
    by: '',
    price: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePassChange = (e) => {
    const { name, value } = e.target;
    setPassForm(prev => ({ ...prev, [name]: value }));
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

      {showChangePassModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Change Password</h2>
            <label>
              Old Password:
              <input type="password" name="oldPass" value={passForm.oldPass} onChange={handlePassChange} />
            </label>
            <label>
              New Password:
              <input type="password" name="newPass" value={passForm.newPass} onChange={handlePassChange} />
            </label>
            <label>
              Confirm Password:
              <input type="password" name="confirmPass" value={passForm.confirmPass} onChange={handlePassChange} />
            </label>
            <div className="modal-buttons">
              <button className="add-btn">Save</button>
              <button className="report-btn" onClick={() => setShowChangePassModal(false)}>Cancel</button>
            </div>
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
                <td><FaTrash className="trash-icon" /></td>
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
              <h3>Expense Report Summary</h3>
              <table className="report-table">
                <thead>
                  <tr>
                    <th>Expense Type</th>
                    <th>Amount (₱)</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp, i) => (
                    <tr key={i}>
                      <td>{exp.label}</td>
                      <td>{exp.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="report-total">
                Total: ₱{expenses.reduce((sum, exp) => sum + exp.amount, 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
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