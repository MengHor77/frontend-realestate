import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faBuilding } from '@fortawesome/free-solid-svg-icons';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const EditProperty = ({ propertyId, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', property_type: 'condo', 
    listing_type: 'sale', status: 'active', bedrooms: '', 
    bathrooms: '', size_sqm: '', description: '', features: ''
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  useEffect(() => {
    fetchProperty();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API}/properties/${propertyId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const p = response.data.property;
      setFormData({
        title: p.title || '', price: p.price || '', location: p.location || '',
        property_type: p.property_type || 'condo', listing_type: p.listing_type || 'sale',
        status: p.status || 'active', bedrooms: p.bedrooms || '',
        bathrooms: p.bathrooms || '', size_sqm: p.size_sqm || '',
        description: p.description || '', features: p.features || ''
      });
    } catch (err) { setError('Failed to load data'); }
    finally { setLoading(false); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const fd = new FormData();
      Object.keys(formData).forEach(key => fd.append(key, formData[key]));
      if (images.length > 0) fd.append('images', images[0]);

      await axios.put(`${API}/properties/${propertyId}`, fd, {
        headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' }
      });
      onRefresh(); onClose();
    } catch (err) { setError('Error updating property.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h3><FontAwesomeIcon icon={faBuilding} /> Edit Property</h3>
          <button onClick={onClose} style={styles.closeBtn}><FontAwesomeIcon icon={faTimes} /></button>
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid2}>
            <div style={styles.group}><label>Title *</label><input style={styles.input} value={formData.title} onChange={e => set('title', e.target.value)} required /></div>
            <div style={styles.group}><label>Location</label><input style={styles.input} value={formData.location} onChange={e => set('location', e.target.value)} /></div>
          </div>
          <div style={styles.grid2}>
            <div style={styles.group}><label>Property Type</label>
              <select style={styles.input} value={formData.property_type} onChange={e => set('property_type', e.target.value)}>
                <option value="condo">Condo</option><option value="villa">Villa</option><option value="flat">Flat</option><option value="apartment">Apartment</option><option value="land">Land</option>
              </select>
            </div>
            <div style={styles.group}><label>Listing Type</label>
              <select style={styles.input} value={formData.listing_type} onChange={e => set('listing_type', e.target.value)}>
                <option value="sale">For Sale</option><option value="rent">For Rent</option>
              </select>
            </div>
          </div>
          <div style={styles.group}><label>Price ($) *</label><input style={styles.input} type="number" value={formData.price} onChange={e => set('price', e.target.value)} required /></div>
          <div style={styles.grid3}>
            <div style={styles.group}><label>Bedrooms</label><input style={styles.input} type="number" value={formData.bedrooms} onChange={e => set('bedrooms', e.target.value)} /></div>
            <div style={styles.group}><label>Bathrooms</label><input style={styles.input} type="number" value={formData.bathrooms} onChange={e => set('bathrooms', e.target.value)} /></div>
            <div style={styles.group}><label>Size (m²)</label><input style={styles.input} type="number" value={formData.size_sqm} onChange={e => set('size_sqm', e.target.value)} /></div>
          </div>
          <div style={styles.group}><label>Status</label>
            <select style={styles.input} value={formData.status} onChange={e => set('status', e.target.value)}>
              <option value="active">Active</option><option value="sold">Sold</option><option value="rented">Rented</option>
            </select>
          </div>
          <div style={styles.group}><label>Description</label><textarea style={styles.input} value={formData.description} onChange={e => set('description', e.target.value)} /></div>
          <div style={styles.group}><label>Features</label><input style={styles.input} value={formData.features} onChange={e => set('features', e.target.value)} /></div>
          <div style={styles.group}><label>Update Image</label><input type="file" style={styles.input} onChange={e => setImages(Array.from(e.target.files))} /></div>
          <button type="submit" style={styles.submitBtn}>{loading ? 'Updating...' : 'Update Property'}</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
  container: { background: '#fff', width: '90%', maxWidth: '560px', borderRadius: '12px', maxHeight: '90vh', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', padding: '15px 20px', background: '#003366', color: '#ffd700', borderRadius: '12px 12px 0 0' },
  closeBtn: { background: 'none', border: 'none', color: '#ffd700', cursor: 'pointer', fontSize: '18px' },
  error: { color: 'red', padding: '10px', fontSize: '13px' },
  form: { padding: '20px', overflowY: 'auto' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '10px' },
  grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginBottom: '10px' },
  group: { display: 'flex', flexDirection: 'column', marginBottom: '10px' },
  input: { padding: '8px', borderRadius: '5px', border: '1px solid #ccc', marginTop: '4px' },
  submitBtn: { background: '#003366', color: '#ffd700', padding: '12px', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }
};

export default EditProperty;