import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faBuilding, faImage, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const EditProperty = ({ propertyId, onClose, onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '', price: '', location: '', property_type: 'condo', 
    listing_type: 'sale', status: 'active', bedrooms: '', 
    bathrooms: '', size_sqm: '', description: '', features: ''
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [newImagePreviews, setNewImagePreviews] = useState([]);
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
      
      const response = await axios.get(`${API}/properties/${propertyId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
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
      
      // Set existing images
      if (p.images && p.images.length > 0) {
        setExistingImages(p.images);
      } else if (p.image_url) {
        setExistingImages([{ id: null, url: p.image_url, is_primary: true }]);
      }
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError(`Failed to load data: ${err.response?.data?.message || err.message}`);
    } finally { 
      setLoading(false); 
    }
  };

  const handleNewImages = (e) => {
    const files = Array.from(e.target.files);
    if (existingImages.length + newImages.length + files.length > 10) {
      setError('Maximum 10 images allowed');
      return;
    }
    setNewImages([...newImages, ...files]);
    
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setNewImagePreviews([...newImagePreviews, ...previews]);
  };

  const removeExistingImage = async (imageId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API}/properties/${propertyId}/images/${imageId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      // Refresh property data
      await fetchProperty();
      setSuccess('Image removed successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      console.error('Error removing image:', err);
      setError('Failed to remove image');
    }
  };

  const removeNewImage = (index) => {
    const newImagesList = newImages.filter((_, i) => i !== index);
    const newPreviewsList = newImagePreviews.filter((_, i) => i !== index);
    setNewImages(newImagesList);
    setNewImagePreviews(newPreviewsList);
  };

// Update the setPrimaryImage function in EditProperty.js
const setPrimaryImage = async (imageId) => {
    try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        console.log(`Setting image ${imageId} as primary for property ${propertyId}`);
        
        const response = await axios.put(
            `${API}/properties/${propertyId}/images/${imageId}/primary`,
            {},
            {
                headers: { 
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        
        console.log('Set primary response:', response.data);
        
        if (response.data.success) {
            setSuccess('Primary image updated successfully');
            // Refresh property data to show updated primary image
            await fetchProperty();
            setTimeout(() => setSuccess(''), 3000);
        } else {
            setError(response.data.message || 'Failed to set primary image');
        }
    } catch (err) {
        console.error('Error setting primary image:', err);
        const errorMsg = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to set primary image';
        setError(errorMsg);
        setTimeout(() => setError(''), 5000);
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
      
      // Append new images
      if (newImages.length > 0) {
        for (let i = 0; i < newImages.length; i++) {
          fd.append('images', newImages[i]);
        }
      }
      
      const response = await axios.put(`${API}/properties/${propertyId}`, fd, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data.success) {
        setSuccess('Property updated successfully!');
        setTimeout(() => {
          onRefresh();
          onClose();
        }, 1500);
      } else {
        setError('Update failed');
      }
      
    } catch (err) {
      console.error('Update error:', err);
      setError(err.response?.data?.message || err.response?.data?.error || 'Error updating property');
    } finally { 
      setLoading(false); 
    }
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
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div style={styles.imageSection}>
                <label>Current Images ({existingImages.length}/10)</label>
                <div style={styles.imageGrid}>
                  {existingImages.map((img) => (
                    <div key={img.id} style={styles.imageItem}>
                      <img src={img.url} alt="Property" style={styles.imageThumb} />
                      <div style={styles.imageActions}>
                        {!img.is_primary && (
                          <button type="button" onClick={() => setPrimaryImage(img.id)} style={styles.setPrimaryBtn}>
                            Set as Primary
                          </button>
                        )}
                        {img.is_primary && <span style={styles.primaryBadge}>Primary</span>}
                        <button type="button" onClick={() => removeExistingImage(img.id)} style={styles.removeImageBtn}>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* New Images Preview */}
            {newImagePreviews.length > 0 && (
              <div style={styles.imageSection}>
                <label>New Images to Add ({newImagePreviews.length})</label>
                <div style={styles.imageGrid}>
                  {newImagePreviews.map((preview, index) => (
                    <div key={index} style={styles.imageItem}>
                      <img src={preview} alt="New preview" style={styles.imageThumb} />
                      <button type="button" onClick={() => removeNewImage(index)} style={styles.removeImageBtn}>
                        <FontAwesomeIcon icon={faTrash} /> Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div style={styles.group}>
              <label>Add More Images</label>
              <input type="file" multiple accept="image/*" style={styles.input} onChange={handleNewImages} />
              <small style={styles.helperText}>You can add up to {10 - (existingImages.length + newImages.length)} more images</small>
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
    background: '#fff', width: '90%', maxWidth: '700px', 
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
  imageSection: {
    marginBottom: '15px',
    padding: '10px',
    background: '#f8f9fa',
    borderRadius: '8px'
  },
  imageGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
    gap: '15px',
    marginTop: '10px'
  },
  imageItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px'
  },
  imageThumb: {
    width: '100%',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '2px solid #ddd'
  },
  imageActions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    width: '100%'
  },
  setPrimaryBtn: {
    background: '#28a745',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '11px'
  },
  primaryBadge: {
    background: '#ffd700',
    color: '#003366',
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  removeImageBtn: {
    background: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '11px'
  },
  helperText: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px'
  },
  submitBtn: { 
    background: '#003366', color: '#ffd700', padding: '12px', 
    border: 'none', borderRadius: '5px', cursor: 'pointer', 
    width: '100%', fontWeight: 'bold', fontSize: '16px',
    marginTop: '10px'
  }
};

export default EditProperty;