import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faBuilding, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const EditProperty = ({ propertyId, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', property_type: 'condo', 
    listing_type: 'sale', status: 'active', bedrooms: '', 
    bathrooms: '', size_sqm: '', description: '', features: ''
  });
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (propertyId) {
      fetchProperty();
    }
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      
      console.log('Fetching property ID:', propertyId);
      
      const response = await axios.get(`${API}/properties/${propertyId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('API Response:', response.data);
      
      const p = response.data.property;
      setFormData({
        title: p.title || '', 
        price: p.price || '', 
        location: p.location || '',
        property_type: p.property_type || 'condo', 
        listing_type: p.listing_type || 'sale',
        status: p.status || 'active', 
        bedrooms: p.bedrooms || '',
        bathrooms: p.bathrooms || '', 
        size_sqm: p.size_sqm || '',
        description: p.description || '', 
        features: p.features || ''
      });
      
      // Set current image URL
      if (p.image_url) {
        setCurrentImage(p.image_url);
      }
      
    } catch (err) {
      console.error('Fetch error:', err);
      if (err.response) {
        setError(`Failed to load data: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        setError('Cannot connect to server. Make sure backend is running.');
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally { 
      setLoading(false); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You are not logged in. Please login again.');
        setLoading(false);
        return;
      }
      
      const fd = new FormData();
      
      // Append all form data
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
          fd.append(key, formData[key]);
        }
      });
      
      // Append new image if selected
      if (images.length > 0) {
        fd.append('images', images[0]);
        console.log('Uploading new image:', images[0].name);
      }
      
      console.log('Updating property ID:', propertyId);
      console.log('Form data:', Object.fromEntries(fd));
      
      const response = await axios.put(`${API}/properties/${propertyId}`, fd, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Update response:', response.data);
      
      if (response.data.success || response.data.message) {
        setSuccess('Property updated successfully!');
        setTimeout(() => {
          onRefresh();
          onClose();
        }, 1500);
      } else {
        setError('Update failed: No success message from server');
      }
      
    } catch (err) {
      console.error('Update error:', err);
      
      if (err.response) {
        // Server responded with error
        const errorMsg = err.response.data?.message || err.response.data?.error || err.response.statusText;
        setError(`Error: ${errorMsg} (Status: ${err.response.status})`);
      } else if (err.request) {
        // Request was made but no response
        setError('Cannot connect to server. Please check if backend is running on port 5000');
      } else {
        // Something else happened
        setError(`Error: ${err.message}`);
      }
    } finally { 
      setLoading(false); 
    }
  };

  const handleRemoveImage = () => {
    setCurrentImage('');
    setImages([]);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h3><FontAwesomeIcon icon={faBuilding} /> Edit Property #{propertyId}</h3>
          <button onClick={onClose} style={styles.closeBtn}><FontAwesomeIcon icon={faTimes} /></button>
        </div>
        
        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
        
        {loading && !formData.title ? (
          <div style={styles.loading}>Loading property data...</div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.grid2}>
              <div style={styles.group}>
                <label>Title *</label>
                <input style={styles.input} value={formData.title} onChange={e => set('title', e.target.value)} required />
              </div>
              <div style={styles.group}>
                <label>Location</label>
                <input style={styles.input} value={formData.location} onChange={e => set('location', e.target.value)} />
              </div>
            </div>
            
            <div style={styles.grid2}>
              <div style={styles.group}>
                <label>Property Type</label>
                <select style={styles.input} value={formData.property_type} onChange={e => set('property_type', e.target.value)}>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                  <option value="flat">Flat</option>
                  <option value="apartment">Apartment</option>
                  <option value="land">Land</option>
                </select>
              </div>
              <div style={styles.group}>
                <label>Listing Type</label>
                <select style={styles.input} value={formData.listing_type} onChange={e => set('listing_type', e.target.value)}>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
            </div>
            
            <div style={styles.group}>
              <label>Price ($) *</label>
              <input style={styles.input} type="number" step="0.01" value={formData.price} onChange={e => set('price', e.target.value)} required />
            </div>
            
            <div style={styles.grid3}>
              <div style={styles.group}>
                <label>Bedrooms</label>
                <input style={styles.input} type="number" value={formData.bedrooms} onChange={e => set('bedrooms', e.target.value)} />
              </div>
              <div style={styles.group}>
                <label>Bathrooms</label>
                <input style={styles.input} type="number" value={formData.bathrooms} onChange={e => set('bathrooms', e.target.value)} />
              </div>
              <div style={styles.group}>
                <label>Size (m²)</label>
                <input style={styles.input} type="number" value={formData.size_sqm} onChange={e => set('size_sqm', e.target.value)} />
              </div>
            </div>
            
            <div style={styles.group}>
              <label>Status</label>
              <select style={styles.input} value={formData.status} onChange={e => set('status', e.target.value)}>
                <option value="active">Active</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>
            
            <div style={styles.group}>
              <label>Description</label>
              <textarea style={{...styles.input, minHeight: '80px'}} value={formData.description} onChange={e => set('description', e.target.value)} />
            </div>
            
            <div style={styles.group}>
              <label>Features</label>
              <input style={styles.input} placeholder="e.g., Parking, Pool, Garden" value={formData.features} onChange={e => set('features', e.target.value)} />
            </div>
            
            {/* Current Image Preview */}
            {currentImage && (
              <div style={styles.imagePreview}>
                <label>Current Image:</label>
                <div style={styles.imageContainer}>
                  <img 
                    src={currentImage} 
                    alt="Current property" 
                    style={styles.previewImage}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/100x100?text=No+Image';
                    }}
                  />
                  <button type="button" onClick={handleRemoveImage} style={styles.removeImageBtn}>
                    <FontAwesomeIcon icon={faTrash} /> Remove
                  </button>
                </div>
              </div>
            )}
            
            <div style={styles.group}>
              <label>Update Image (optional)</label>
              <input type="file" accept="image/*" style={styles.input} onChange={e => setImages(Array.from(e.target.files))} />
              {images.length > 0 && (
                <div style={styles.newImageInfo}>
                  <FontAwesomeIcon icon={faImage} /> New image selected: {images[0].name}
                </div>
              )}
            </div>
            
            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Updating...' : <><FontAwesomeIcon icon={faSave} /> Update Property</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: { 
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', 
    background: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', 
    alignItems: 'center', zIndex: 9999 
  },
  container: { 
    background: '#fff', width: '90%', maxWidth: '600px', 
    borderRadius: '12px', maxHeight: '90vh', display: 'flex', 
    flexDirection: 'column', boxShadow: '0 10px 40px rgba(0,0,0,0.2)'
  },
  header: { 
    display: 'flex', justifyContent: 'space-between', 
    padding: '15px 20px', background: '#003366', 
    color: '#ffd700', borderRadius: '12px 12px 0 0' 
  },
  closeBtn: { 
    background: 'none', border: 'none', color: '#ffd700', 
    cursor: 'pointer', fontSize: '20px' 
  },
  error: { 
    color: 'white', background: '#dc3545', padding: '10px', 
    fontSize: '13px', margin: '10px', borderRadius: '5px' 
  },
  success: { 
    color: 'white', background: '#28a745', padding: '10px', 
    fontSize: '13px', margin: '10px', borderRadius: '5px' 
  },
  loading: { 
    textAlign: 'center', padding: '40px', color: '#003366' 
  },
  form: { padding: '20px', overflowY: 'auto' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '10px' },
  grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', marginBottom: '10px' },
  group: { display: 'flex', flexDirection: 'column', marginBottom: '15px' },
  input: { 
    padding: '10px', borderRadius: '5px', border: '1px solid #ccc', 
    marginTop: '5px', fontSize: '14px' 
  },
  imagePreview: {
    marginBottom: '15px',
    padding: '10px',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  imageContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginTop: '10px'
  },
  previewImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid #003366'
  },
  removeImageBtn: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '12px'
  },
  newImageInfo: {
    marginTop: '5px',
    fontSize: '12px',
    color: '#28a745'
  },
  submitBtn: { 
    background: '#003366', color: '#ffd700', padding: '12px', 
    border: 'none', borderRadius: '5px', cursor: 'pointer', 
    width: '100%', fontWeight: 'bold', fontSize: '16px',
    marginTop: '10px'
  }
};

export default EditProperty;