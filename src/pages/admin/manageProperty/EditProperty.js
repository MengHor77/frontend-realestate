import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProperty = ({ propertyId, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({ title: '', price: '', type: '', location: '' });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/properties/${propertyId}`)
      .then(res => setFormData(res.data));
  }, [propertyId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/api/properties/${propertyId}`, formData);
    onRefresh();
    onClose();
  };

  return (
    <div style={modalStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h3>Edit Property</h3>
        <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        <input value={formData.price} type="number" onChange={e => setFormData({...formData, price: e.target.value})} />
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

// Reuse same styles
const modalStyle = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center' };
const formStyle = { background: '#fff', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' };

export default EditProperty;