// D:\realestate\frontend\src\pages\frontend\rent\RentDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const RentDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [inquiry, setInquiry] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        fetchPropertyDetails();
        window.scrollTo(0, 0);
    }, [id]);

    const fetchPropertyDetails = async () => {
        try {
            setLoading(true);
            // Try both endpoints - first try rent specific, then fallback to general properties
            let response;
            try {
                response = await axios.get(`http://localhost:5000/api/properties/rent/${id}`);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    response = await axios.get(`http://localhost:5000/api/properties/${id}`);
                } else {
                    throw err;
                }
            }
            
            if (response.data.success || response.data.property) {
                setProperty(response.data.property || response.data);
            } else {
                setError('Property not found');
            }
        } catch (err) {
            console.error('Error fetching property details:', err);
            setError('Failed to load property details. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleInquiryChange = (e) => {
        const { name, value } = e.target;
        setInquiry(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitInquiry = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:5000/api/inquiries', {
                ...inquiry,
                property_id: property.id,
                property_title: property.title,
                property_type: 'rent'
            });
            
            if (response.data.success) {
                alert('Inquiry sent successfully! We will contact you soon.');
                setShowContactForm(false);
                setInquiry({ name: '', email: '', phone: '', message: '' });
            }
        } catch (err) {
            console.error('Error sending inquiry:', err);
            alert('Failed to send inquiry. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const styles = {
        page: {
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            padding: '40px 0'
        },
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
        },
        backNavigation: {
            marginBottom: '30px'
        },
        backLink: {
            color: '#003366',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
        },
        detailContainer: {
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        gallery: {
            width: '100%',
            height: '500px',
            overflow: 'hidden',
            position: 'relative'
        },
        mainImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        propertyTypeBadge: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#ffd700',
            color: '#003366',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: 'bold',
            textTransform: 'capitalize'
        },
        content: {
            padding: '40px'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '20px'
        },
        title: {
            fontSize: '32px',
            color: '#003366',
            margin: 0,
            fontWeight: '700'
        },
        priceTag: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#0d6efd'
        },
        pricePeriod: {
            fontSize: '16px',
            fontWeight: 'normal',
            color: '#666'
        },
        location: {
            color: '#666',
            marginBottom: '30px',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        specs: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '20px',
            padding: '20px 0',
            borderTop: '1px solid #eee',
            borderBottom: '1px solid #eee',
            marginBottom: '30px'
        },
        specItem: {
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
        },
        specLabel: {
            color: '#666',
            fontSize: '14px',
            fontWeight: '500'
        },
        specValue: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#333'
        },
        description: {
            marginBottom: '30px'
        },
        descriptionTitle: {
            fontSize: '24px',
            marginBottom: '15px',
            color: '#003366',
            fontWeight: '600'
        },
        descriptionText: {
            lineHeight: '1.6',
            color: '#666'
        },
        features: {
            marginBottom: '30px'
        },
        featuresTitle: {
            fontSize: '24px',
            marginBottom: '15px',
            color: '#003366',
            fontWeight: '600'
        },
        featuresList: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px'
        },
        featureTag: {
            background: '#f0f4ff',
            color: '#003366',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '500'
        },
        contactSection: {
            marginTop: '40px',
            paddingTop: '30px',
            borderTop: '2px solid #eee'
        },
        contactButton: {
            width: '100%',
            padding: '16px',
            background: '#003366',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
        },
        contactForm: {
            background: '#f9f9f9',
            padding: '30px',
            borderRadius: '8px'
        },
        formTitle: {
            marginTop: 0,
            marginBottom: '20px',
            color: '#003366'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        formInput: {
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'border-color 0.3s ease'
        },
        formTextarea: {
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            fontFamily: 'inherit',
            resize: 'vertical'
        },
        submitButton: {
            padding: '12px',
            background: '#003366',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background 0.3s ease'
        },
        cancelButton: {
            padding: '12px',
            background: '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px'
        },
        spinner: {
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #003366',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
        },
        errorContainer: {
            textAlign: 'center',
            padding: '100px 20px'
        },
        backButton: {
            display: 'inline-block',
            marginTop: '20px',
            padding: '12px 24px',
            background: '#003366',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            transition: 'background 0.3s ease'
        },
        similarProperties: {
            marginTop: '60px'
        },
        similarTitle: {
            fontSize: '28px',
            marginBottom: '30px',
            color: '#003366'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    input:focus, textarea:focus {
                        outline: none;
                        border-color: #003366 !important;
                    }
                    button:hover:not(:disabled) {
                        opacity: 0.9;
                        transform: translateY(-2px);
                    }
                `}</style>
                <div style={styles.spinner}></div>
                <p style={{ marginTop: '20px', color: '#666' }}>Loading property details...</p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div style={styles.errorContainer}>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                    {error || 'Property not found'}
                </p>
                <Link to="/rent" style={styles.backButton}>Back to Rentals</Link>
            </div>
        );
    }

    return (
        <div style={styles.page}>
            <style>{`
                input:focus, textarea:focus {
                    outline: none;
                    border-color: #003366 !important;
                }
                button:hover:not(:disabled) {
                    opacity: 0.9;
                    transform: translateY(-2px);
                }
            `}</style>
            <div style={styles.container}>
                <div style={styles.backNavigation}>
                    <Link to="/rent" style={styles.backLink}>
                        ← Back to Rentals
                    </Link>
                </div>

                <div style={styles.detailContainer}>
                    <div style={styles.gallery}>
                        <img 
                            src={property.image_url || property.images?.[0] || '/api/placeholder/800/500'} 
                            alt={property.title} 
                            style={styles.mainImage} 
                        />
                        <div style={styles.propertyTypeBadge}>
                            For Rent
                        </div>
                    </div>

                    <div style={styles.content}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>{property.title}</h1>
                            <div style={styles.priceTag}>
                                ${(property.price || 0).toLocaleString()}
                                <span style={styles.pricePeriod}>/month</span>
                            </div>
                        </div>

                        <div style={styles.location}>
                            <span>📍</span> {property.location || 'Location not specified'}
                        </div>

                        <div style={styles.specs}>
                            <div style={styles.specItem}>
                                <span style={styles.specLabel}>Property Type</span>
                                <span style={styles.specValue}>
                                    {(property.property_type || property.type || 'N/A')}
                                </span>
                            </div>
                            <div style={styles.specItem}>
                                <span style={styles.specLabel}>Bedrooms</span>
                                <span style={styles.specValue}>{property.bedrooms || 'N/A'}</span>
                            </div>
                            <div style={styles.specItem}>
                                <span style={styles.specLabel}>Bathrooms</span>
                                <span style={styles.specValue}>{property.bathrooms || 'N/A'}</span>
                            </div>
                            <div style={styles.specItem}>
                                <span style={styles.specLabel}>Size</span>
                                <span style={styles.specValue}>
                                    {property.size_sqm || property.area || 'N/A'} m²
                                </span>
                            </div>
                        </div>

                        {property.description && (
                            <div style={styles.description}>
                                <h3 style={styles.descriptionTitle}>Description</h3>
                                <p style={styles.descriptionText}>{property.description}</p>
                            </div>
                        )}

                        {(property.features || property.amenities) && (
                            <div style={styles.features}>
                                <h3 style={styles.featuresTitle}>Features & Amenities</h3>
                                <div style={styles.featuresList}>
                                    {(property.features || property.amenities || '')
                                        .split(',')
                                        .map((feature, index) => (
                                            <span key={index} style={styles.featureTag}>
                                                ✓ {feature.trim()}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        )}

                        <div style={styles.contactSection}>
                            {!showContactForm ? (
                                <button 
                                    style={styles.contactButton}
                                    onClick={() => setShowContactForm(true)}
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#0d6efd'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#003366'}
                                >
                                    📞 Inquire About This Property
                                </button>
                            ) : (
                                <div style={styles.contactForm}>
                                    <h3 style={styles.formTitle}>Send Inquiry for {property.title}</h3>
                                    <form style={styles.form} onSubmit={handleSubmitInquiry}>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name *"
                                            value={inquiry.name}
                                            onChange={handleInquiryChange}
                                            style={styles.formInput}
                                            required
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email *"
                                            value={inquiry.email}
                                            onChange={handleInquiryChange}
                                            style={styles.formInput}
                                            required
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Your Phone *"
                                            value={inquiry.phone}
                                            onChange={handleInquiryChange}
                                            style={styles.formInput}
                                            required
                                        />
                                        <textarea
                                            name="message"
                                            placeholder="Your Message *"
                                            rows="4"
                                            value={inquiry.message}
                                            onChange={handleInquiryChange}
                                            style={styles.formTextarea}
                                            required
                                        ></textarea>
                                        <button 
                                            type="submit" 
                                            style={styles.submitButton}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Inquiry'}
                                        </button>
                                        <button 
                                            type="button" 
                                            style={styles.cancelButton}
                                            onClick={() => setShowContactForm(false)}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentDetail;