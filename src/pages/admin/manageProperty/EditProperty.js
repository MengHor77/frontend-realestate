import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faBuilding } from '@fortawesome/free-solid-svg-icons';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const EditProperty = ({ propertyId, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    location: '',
    type: 'sale',
    status: 'active',
    bedrooms: '',
    bathrooms: '',
    size_sqm: '',
    description: '',
    features: '',
  });
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  // Fetch property data when component mounts
  useEffect(() => {
    fetchProperty();
  }, [propertyId]);

  const fetchProperty = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await axios.get(`${API}/properties/${propertyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const property = response.data.property;
      setFormData({
        title: property.title || '',
        price: property.price || '',
        location: property.location || '',
        type: property.type || 'sale',
        status: property.status || 'active',
        bedrooms: property.bedrooms || '',
        bathrooms: property.bathrooms || '',
        size_sqm: property.size_sqm || '',
        description: property.description || '',
        features: property.features || '',
      });

      if (property.image_url) {
        setExistingImages([property.image_url]);
      }
    } catch (err) {
      console.error('Error fetching property:', err);
      setError('Failed to load property data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.price || !formData.type) {
      setError('Title, price and type are required.');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Check if token exists
      if (!token) {
        setError('You are not logged in. Please login first.');
        setLoading(false);
        return;
      }

      const fd = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
          fd.append(key, formData[key]);
        }
      });

      // Append new images
      if (images && images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          fd.append('images', images[i]);
        }
      }

      const response = await axios.put(`${API}/properties/${propertyId}`, fd, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      console.log('Update success:', response.data);
      onRefresh();
      onClose();
    } catch (err) {
      console.error("Update error:", err);

      if (err.response) {
        if (err.response.status === 401) {
          setError('Your session has expired. Please login again.');
          setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
          }, 2000);
        } else if (err.response.data?.message) {
          setError(err.response.data.message);
        } else if (err.response.data?.error) {
          setError(err.response.data.error);
        } else {
          setError('Error updating property.');
        }
      } else if (err.request) {
        setError('Cannot connect to server.');
      } else {
        setError('Error: ' + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <div style={styles.header}>
          <h3 style={styles.headerTitle}>
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 8 }} />
            Edit Property
          </h3>
          <button type="button" onClick={onClose} style={styles.closeBtn}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {loading && !formData.title ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading property data...</div>
        ) : (
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.grid2}>
              <div style={styles.group}>
                <label style={styles.label}>Title *</label>
                <input
                  style={styles.input}
                  placeholder="Property title"
                  value={formData.title}
                  onChange={e => set('title', e.target.value)}
                  required
                />
              </div>
              <div style={styles.group}>
                <label style={styles.label}>Location</label>
                <input
                  style={styles.input}
                  placeholder="City, District"
                  value={formData.location}
                  onChange={e => set('location', e.target.value)}
                />
              </div>
            </div>

            <div style={styles.grid2}>
              <div style={styles.group}>
                <label style={styles.label}>Price ($) *</label>
                <input
                  style={styles.input}
                  type="number"
                  placeholder="e.g. 150000"
                  value={formData.price}
                  onChange={e => set('price', e.target.value)}
                  required
                />
              </div>
              <div style={styles.group}>
                <label style={styles.label}>Type</label>
                <select style={styles.input} value={formData.type} onChange={e => set('type', e.target.value)}>
                  <option value="sale">For Sale</option>
                  <option value="rent">For Rent</option>
                </select>
              </div>
            </div>

            <div style={styles.grid3}>
              <div style={styles.group}>
                <label style={styles.label}>Bedrooms</label>
                <input
                  style={styles.input}
                  type="number"
                  value={formData.bedrooms}
                  onChange={e => set('bedrooms', e.target.value)}
                />
              </div>
              <div style={styles.group}>
                <label style={styles.label}>Bathrooms</label>
                <input
                  style={styles.input}
                  type="number"
                  value={formData.bathrooms}
                  onChange={e => set('bathrooms', e.target.value)}
                />
              </div>
              <div style={styles.group}>
                <label style={styles.label}>Size (m²)</label>
                <input
                  style={styles.input}
                  type="number"
                  value={formData.size_sqm}
                  onChange={e => set('size_sqm', e.target.value)}
                />
              </div>
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Status</label>
              <select style={styles.input} value={formData.status} onChange={e => set('status', e.target.value)}>
                <option value="active">Active</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Description</label>
              <textarea
                style={{ ...styles.input, height: '80px' }}
                value={formData.description}
                onChange={e => set('description', e.target.value)}
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Features</label>
              <input
                style={styles.input}
                placeholder="e.g. Parking, Garden, Pool"
                value={formData.features}
                onChange={e => set('features', e.target.value)}
              />
            </div>

            <div style={styles.group}>
              <label style={styles.label}>Images (max 10)</label>
              {existingImages.length > 0 && (
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                  Current image: {existingImages[0].split('/').pop()}
                </div>
              )}
              <input
                type="file"
                multiple
                accept="image/*"
                style={styles.input}
                onChange={e => setImages(Array.from(e.target.files))}
              />
              {images.length > 0 && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                  {images.length} new file(s) selected
                </div>
              )}
            </div>

            <button type="submit" style={styles.submitBtn} disabled={loading}>
              {loading ? 'Updating...' : <><FontAwesomeIcon icon={faSave} style={{ marginRight: 8 }} /> Update Property</>}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,51,102,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  container: {
    background: '#fff',
    width: '100%',
    maxWidth: '560px',
    borderRadius: '16px',
    overflow: 'hidden',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    background: '#003366',
    color: '#ffd700'
  },
  headerTitle: {
    margin: 0,
    fontSize: '17px',
    color: '#ffd700'
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#ffd700',
    fontSize: '18px'
  },
  error: {
    margin: '12px 24px 0',
    padding: '10px',
    background: '#fef2f2',
    color: '#dc2626',
    borderRadius: '8px',
    fontSize: '13px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    padding: '24px',
    overflowY: 'auto'
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px'
  },
  grid3: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '14px'
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#444'
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '14px'
  },
  submitBtn: {
    background: '#003366',
    color: '#ffd700',
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '15px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default EditProperty;