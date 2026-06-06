import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import CreateProperty from './CreateProperty';
import EditProperty from './EditProperty';

const ManageProperties = () => {
  const { setIsOverlayVisible } = useOutletContext();
  const [properties, setProperties] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchProperties = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/properties');
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`http://localhost:5000/api/properties/${id}`);
        fetchProperties();
      } catch (err) {
        alert("Failed to delete property.");
      }
    }
  };

  const handleOpenAdd = () => {
    setShowAdd(true);
    setIsOverlayVisible(true);
  };

  const handleClose = () => {
    setShowAdd(false);
    setEditId(null);
    setIsOverlayVisible(false);
  };

  return (
    <div style={{ padding: '20px', fontFamily: "'Segoe UI', sans-serif" }}>
      {showAdd && <CreateProperty onClose={handleClose} onRefresh={fetchProperties} />}
      {editId && <EditProperty propertyId={editId} onClose={handleClose} onRefresh={fetchProperties} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#003366', fontWeight: '700', fontSize: '28px' }}>🏠 Manage Properties</h2>
        <button
          onClick={handleOpenAdd}
          className="btn-signup-nav" // ប្រើ CSS class ដែលអ្នកមានស្រាប់ក្នុង index.css
          style={{ cursor: 'pointer', border: 'none' }}
        >
          + Add New Property
        </button>
      </div>

      <div className="card" style={{ background: '#fff', padding: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 10px' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#666', fontSize: '14px', textTransform: 'uppercase' }}>
              <th style={{ padding: '15px' }}>Title</th>
              <th style={{ padding: '15px' }}>Type</th>
              <th style={{ padding: '15px' }}>Price</th>
              <th style={{ padding: '15px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((item) => (
              <tr key={item.id} style={{ background: '#f8f9fa', borderRadius: '10px' }}>
                <td style={{ padding: '15px', fontWeight: '600', color: '#333' }}>{item.title}</td>
                <td style={{ padding: '15px' }}>
                  <span style={{ background: '#e1e8f0', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', color: '#003366' }}>
                    {item.type}
                  </span>
                </td>
                <td style={{ padding: '15px', fontWeight: '700', color: '#003366' }}>${Number(item.price).toLocaleString()}</td>
                <td style={{ padding: '15px' }}>
                  <button
                    onClick={() => { setEditId(item.id); setIsOverlayVisible(true); }}
                    style={{ color: '#0d6efd', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600', marginRight: '15px' }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    style={{ color: '#ff4757', border: 'none', background: 'none', cursor: 'pointer', fontWeight: '600' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;