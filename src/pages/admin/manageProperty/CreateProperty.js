import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faBuilding } from '@fortawesome/free-solid-svg-icons';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const CreateProperty = ({ onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        title:       '',
        price:       '',
        location:    '',
        type:        'sale',
        status:      'active',
        bedrooms:    '',
        bathrooms:   '',
        size_sqm:    '',
        description: '',
        features:    '',
    });
    const [images, setImages]   = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError]     = useState('');

    const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

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
            const fd    = new FormData();

            Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
            images.forEach(img => fd.append('images', img));

            await axios.post(`${API}/properties`, fd, {
                headers: {
                    'Content-Type':  'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                }
            });

            onRefresh();
            onClose();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || err.response?.data?.error || 'Error creating property.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <h3 style={styles.headerTitle}>
                        <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 8 }} />
                        Add New Property
                    </h3>
                    <button type="button" onClick={onClose} style={styles.closeBtn}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {/* Error */}
                {error && (
                    <div style={styles.error}>{error}</div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Row 1 */}
                    <div style={styles.grid2}>
                        <div style={styles.group}>
                            <label style={styles.label}>Title *</label>
                            <input style={styles.input} placeholder="Property title"
                                value={formData.title} onChange={e => set('title', e.target.value)} required />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Location</label>
                            <input style={styles.input} placeholder="City, District"
                                value={formData.location} onChange={e => set('location', e.target.value)} />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div style={styles.grid2}>
                        <div style={styles.group}>
                            <label style={styles.label}>Price ($) *</label>
                            <input style={styles.input} type="number" placeholder="e.g. 150000"
                                value={formData.price} onChange={e => set('price', e.target.value)} required />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Type</label>
                            <select style={styles.input} value={formData.type} onChange={e => set('type', e.target.value)}>
                                <option value="sale">For Sale</option>
                                <option value="rent">For Rent</option>
                            </select>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div style={styles.grid3}>
                        <div style={styles.group}>
                            <label style={styles.label}>Bedrooms</label>
                            <input style={styles.input} type="number" placeholder="0"
                                value={formData.bedrooms} onChange={e => set('bedrooms', e.target.value)} />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Bathrooms</label>
                            <input style={styles.input} type="number" placeholder="0"
                                value={formData.bathrooms} onChange={e => set('bathrooms', e.target.value)} />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Size (m²)</label>
                            <input style={styles.input} type="number" placeholder="0"
                                value={formData.size_sqm} onChange={e => set('size_sqm', e.target.value)} />
                        </div>
                    </div>

                    {/* Status */}
                    <div style={styles.group}>
                        <label style={styles.label}>Status</label>
                        <select style={styles.input} value={formData.status} onChange={e => set('status', e.target.value)}>
                            <option value="active">Active</option>
                            <option value="sold">Sold</option>
                            <option value="rented">Rented</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div style={styles.group}>
                        <label style={styles.label}>Description</label>
                        <textarea style={{ ...styles.input, height: '80px', resize: 'vertical' }}
                            placeholder="Property description..."
                            value={formData.description} onChange={e => set('description', e.target.value)} />
                    </div>

                    {/* Features */}
                    <div style={styles.group}>
                        <label style={styles.label}>Features (comma-separated)</label>
                        <input style={styles.input} placeholder="Pool, Garden, Parking..."
                            value={formData.features} onChange={e => set('features', e.target.value)} />
                    </div>

                    {/* Images */}
                    <div style={styles.group}>
                        <label style={styles.label}>Images (max 10)</label>
                        <input type="file" multiple accept="image/*" style={styles.input}
                            onChange={e => setImages(Array.from(e.target.files))} />
                        {images.length > 0 && (
                            <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                                ✅ {images.length} image(s) selected
                            </p>
                        )}
                    </div>

                    {/* Submit */}
                    <button type="submit" style={styles.submitBtn} disabled={loading}>
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: 8 }} />
                        {loading ? 'Saving...' : 'Save Property'}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay:    { position:'fixed', top:0, left:0, width:'100%', height:'100%', background:'rgba(0,51,102,0.6)', display:'flex', justifyContent:'center', alignItems:'center', zIndex:9999, padding:'20px' },
    container:  { background:'#fff', width:'100%', maxWidth:'560px', borderRadius:'16px', overflow:'hidden', maxHeight:'90vh', display:'flex', flexDirection:'column' },
    header:     { display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px 24px', background:'#003366', color:'#ffd700' },
    headerTitle:{ margin:0, fontSize:'17px', fontWeight:600, color:'#ffd700' },
    closeBtn:   { background:'transparent', border:'none', cursor:'pointer', color:'#ffd700', fontSize:'18px' },
    error:      { margin:'12px 24px 0', padding:'10px 14px', background:'#fef2f2', color:'#dc2626', borderRadius:'8px', fontSize:'13px', border:'1px solid #fecaca' },
    form:       { display:'flex', flexDirection:'column', gap:'14px', padding:'24px', overflowY:'auto' },
    grid2:      { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'14px' },
    grid3:      { display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'14px' },
    group:      { display:'flex', flexDirection:'column', gap:'5px' },
    label:      { fontSize:'13px', fontWeight:600, color:'#444' },
    input:      { padding:'10px 12px', borderRadius:'8px', border:'1px solid #ddd', fontSize:'14px', outline:'none', color:'#333', background:'#fff', width:'100%', boxSizing:'border-box' },
    submitBtn:  { background:'#003366', color:'#ffd700', padding:'12px', border:'none', borderRadius:'10px', cursor:'pointer', fontSize:'15px', fontWeight:600, marginTop:'4px' },
};

export default CreateProperty;