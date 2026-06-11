import React, { useState } from 'react';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave, faBuilding, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';

const CreateProperty = ({ onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        property_type: 'condo',
        listing_type: 'sale',
        status: 'active',
        bedrooms: '',
        bathrooms: '',
        size_sqm: '',
        description: '',
        features: '',
    });
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const set = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 10) {
            setError('Maximum 10 images allowed');
            return;
        }
        setImages(files);

        // Create preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(previews);
    };

    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!formData.title || !formData.price) {
            setError('Title and price are required.');
            return;
        }

        try {
            setLoading(true);
            const fd = new FormData();
            Object.keys(formData).forEach((key) => {
                if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
                    fd.append(key, formData[key]);
                }
            });

            if (images && images.length > 0) {
                for (let i = 0; i < images.length; i++) {
                    fd.append('images', images[i]);
                }
            }

            const response = await api.post('/properties', fd);

            if (response.data.success) {
                onRefresh();
                onClose();
            } else {
                setError(response.data.message || 'Error creating property.');
            }
        } catch (err) {
            console.error("Error creating property:", err);
            setError(err.response?.data?.message || err.response?.data?.error || 'Error creating property.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.container} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3 style={styles.headerTitle}>
                        <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 8 }} />
                        Add New Property
                    </h3>
                    <button type="button" onClick={onClose} style={styles.closeBtn}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.grid2}>
                        <div style={styles.group}>
                            <label style={styles.label}>Title *</label>
                            <input style={styles.input} placeholder="Property title" value={formData.title} onChange={e => set('title', e.target.value)} required />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Location</label>
                            <input style={styles.input} placeholder="City, District" value={formData.location} onChange={e => set('location', e.target.value)} />
                        </div>
                    </div>

                    <div style={styles.grid2}>
                        <div style={styles.group}>
                            <label style={styles.label}>Property Type</label>
                            <select style={styles.input} value={formData.property_type} onChange={e => set('property_type', e.target.value)}>
                                <option value="condo">Condo</option>
                                <option value="villa">Villa</option>
                                <option value="flat">Flat</option>
                                <option value="apartment">Apartment</option>
                                <option value="land">Land</option>
                            </select>
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Listing Type</label>
                            <select style={styles.input} value={formData.listing_type} onChange={e => set('listing_type', e.target.value)}>
                                <option value="sale">For Sale</option>
                                <option value="rent">For Rent</option>
                            </select>
                        </div>
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Price ($) *</label>
                        <input style={styles.input} type="number" placeholder="e.g. 150000" value={formData.price} onChange={e => set('price', e.target.value)} required />
                    </div>

                    <div style={styles.grid3}>
                        <div style={styles.group}>
                            <label style={styles.label}>Bedrooms</label>
                            <input style={styles.input} type="number" value={formData.bedrooms} onChange={e => set('bedrooms', e.target.value)} />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Bathrooms</label>
                            <input style={styles.input} type="number" value={formData.bathrooms} onChange={e => set('bathrooms', e.target.value)} />
                        </div>
                        <div style={styles.group}>
                            <label style={styles.label}>Size (m²)</label>
                            <input style={styles.input} type="number" value={formData.size_sqm} onChange={e => set('size_sqm', e.target.value)} />
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
                        <textarea style={{ ...styles.input, height: '80px' }} value={formData.description} onChange={e => set('description', e.target.value)} />
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Features</label>
                        <input style={styles.input} placeholder="e.g. Parking, Garden, Pool (comma separated)" value={formData.features} onChange={e => set('features', e.target.value)} />
                    </div>

                    <div style={styles.group}>
                        <label style={styles.label}>Images (max 10)</label>
                        <input type="file" multiple accept="image/*" style={styles.input} onChange={handleImageChange} />
                        {imagePreviews.length > 0 && (
                            <div style={styles.imagePreviewContainer}>
                                {imagePreviews.map((preview, index) => (
                                    <div key={index} style={styles.imagePreviewItem}>
                                        <img src={preview} alt={`Preview ${index + 1}`} style={styles.previewImage} />
                                        <button type="button" onClick={() => removeImage(index)} style={styles.removeImageBtn}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" style={styles.submitBtn} disabled={loading}>
                        {loading ? 'Saving...' : <><FontAwesomeIcon icon={faSave} style={{ marginRight: 8 }} /> Save Property</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999 },
    container: { background: '#fff', width: '100%', maxWidth: '560px', borderRadius: '16px', overflow: 'hidden', maxHeight: '90vh', display: 'flex', flexDirection: 'column' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', background: '#003366', color: '#ffd700' },
    headerTitle: { margin: 0, fontSize: '17px', color: '#ffd700' },
    closeBtn: { background: 'transparent', border: 'none', cursor: 'pointer', color: '#ffd700', fontSize: '18px' },
    error: { margin: '12px 24px 0', padding: '10px', background: '#fef2f2', color: '#dc2626', borderRadius: '8px', fontSize: '13px' },
    form: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '24px', overflowY: 'auto' },
    grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
    grid3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' },
    group: { display: 'flex', flexDirection: 'column', gap: '5px' },
    label: { fontSize: '13px', fontWeight: 600, color: '#444' },
    input: { padding: '10px', borderRadius: '8px', border: '1px solid #ddd', width: '100%', boxSizing: 'border-box', fontSize: '14px' },
    submitBtn: { background: '#003366', color: '#ffd700', padding: '12px', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 600, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    imagePreviewContainer: { display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' },
    imagePreviewItem: { position: 'relative', width: '80px', height: '80px' },
    previewImage: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' },
    removeImageBtn: { position: 'absolute', top: '-5px', right: '-5px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontSize: '10px' }
};

export default CreateProperty;