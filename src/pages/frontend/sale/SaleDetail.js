import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SaleDetail = () => {
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

    useEffect(() => {
        fetchPropertyDetails();
    }, [id]);

    const fetchPropertyDetails = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/properties/sale/${id}`);
            
            if (response.data.success) {
                setProperty(response.data.property);
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

    const calculateMortgage = () => {
        if (!property) return null;
        const downPayment = property.price * 0.2;
        const loanAmount = property.price - downPayment;
        const monthlyInterest = 0.04 / 12;
        const numberOfPayments = 30 * 12;
        const monthlyPayment = (loanAmount * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments)) / 
                               (Math.pow(1 + monthlyInterest, numberOfPayments) - 1);
        return {
            downPayment: downPayment.toLocaleString(),
            monthlyPayment: Math.round(monthlyPayment).toLocaleString()
        };
    };

    const handleInquiryChange = (e) => {
        const { name, value } = e.target;
        setInquiry(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitInquiry = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/inquiries', {
                ...inquiry,
                property_id: property.id,
                property_title: property.title
            });
            
            if (response.data.success) {
                alert('Inquiry sent successfully! We will contact you soon.');
                setShowContactForm(false);
                setInquiry({ name: '', email: '', phone: '', message: '' });
            }
        } catch (err) {
            console.error('Error sending inquiry:', err);
            alert('Failed to send inquiry. Please try again.');
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
            color: '#667eea',
            textDecoration: 'none',
            fontSize: '16px'
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
            overflow: 'hidden'
        },
        mainImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        content: {
            padding: '40px'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            flexWrap: 'wrap'
        },
        title: {
            fontSize: '32px',
            color: '#333',
            margin: 0
        },
        priceTag: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#667eea'
        },
        location: {
            color: '#666',
            marginBottom: '30px',
            fontSize: '18px'
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
            fontSize: '14px'
        },
        specValue: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#333'
        },
        mortgageCalculator: {
            background: '#f0f4ff',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px'
        },
        mortgageTitle: {
            marginTop: 0,
            marginBottom: '15px'
        },
        mortgageDetails: {
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px'
        },
        mortgageItem: {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
        },
        mortgageLabel: {
            color: '#666',
            fontSize: '14px'
        },
        mortgageValue: {
            fontSize: '20px',
            color: '#667eea',
            fontWeight: 'bold'
        },
        description: {
            marginBottom: '30px'
        },
        descriptionTitle: {
            fontSize: '24px',
            marginBottom: '15px',
            color: '#333'
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
            color: '#333'
        },
        featuresList: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '12px'
        },
        featureTag: {
            background: '#f0f4ff',
            color: '#667eea',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px'
        },
        contactSection: {
            marginTop: '40px',
            paddingTop: '30px',
            borderTop: '2px solid #eee'
        },
        contactButton: {
            width: '100%',
            padding: '16px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '18px',
            fontWeight: '600',
            cursor: 'pointer'
        },
        contactForm: {
            background: '#f9f9f9',
            padding: '30px',
            borderRadius: '8px'
        },
        formTitle: {
            marginTop: 0,
            marginBottom: '20px'
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
            fontSize: '16px'
        },
        formTextarea: {
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            fontFamily: 'inherit'
        },
        submitButton: {
            padding: '12px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
        },
        cancelButton: {
            padding: '12px',
            background: '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer'
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
            borderTop: '4px solid #667eea',
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
            background: '#667eea',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px'
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
                `}</style>
                <div style={styles.spinner}></div>
                <p>Loading property details...</p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div style={styles.errorContainer}>
                <p>{error || 'Property not found'}</p>
                <Link to="/sale" style={styles.backButton}>Back to Properties for Sale</Link>
            </div>
        );
    }

    const mortgage = calculateMortgage();

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.backNavigation}>
                    <Link to="/sale" style={styles.backLink}>← Back to Properties for Sale</Link>
                </div>

                <div style={styles.detailContainer}>
                    <div style={styles.gallery}>
                        <img src={property.image_url} alt={property.title} style={styles.mainImage} />
                    </div>

                    <div style={styles.content}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>{property.title}</h1>
                            <div style={styles.priceTag}>${property.price.toLocaleString()}</div>
                        </div>

                        <div style={styles.location}>
                            📍 {property.location}
                        </div>

                        <div style={styles.specs}>
                            <div style={styles.specItem}>
                                <strong style={styles.specLabel}>Property Type</strong>
                                <span style={styles.specValue}>{property.property_type}</span>
                            </div>
                            <div style={styles.specItem}>
                                <strong style={styles.specLabel}>Bedrooms</strong>
                                <span style={styles.specValue}>{property.bedrooms}</span>
                            </div>
                            <div style={styles.specItem}>
                                <strong style={styles.specLabel}>Bathrooms</strong>
                                <span style={styles.specValue}>{property.bathrooms}</span>
                            </div>
                            <div style={styles.specItem}>
                                <strong style={styles.specLabel}>Size</strong>
                                <span style={styles.specValue}>{property.size_sqm} m²</span>
                            </div>
                        </div>

                        {mortgage && (
                            <div style={styles.mortgageCalculator}>
                                <h3 style={styles.mortgageTitle}>Mortgage Estimate</h3>
                                <div style={styles.mortgageDetails}>
                                    <div style={styles.mortgageItem}>
                                        <span style={styles.mortgageLabel}>Down Payment (20%):</span>
                                        <strong style={styles.mortgageValue}>${mortgage.downPayment}</strong>
                                    </div>
                                    <div style={styles.mortgageItem}>
                                        <span style={styles.mortgageLabel}>Estimated Monthly Payment:</span>
                                        <strong style={styles.mortgageValue}>${mortgage.monthlyPayment}</strong>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div style={styles.description}>
                            <h3 style={styles.descriptionTitle}>Description</h3>
                            <p style={styles.descriptionText}>{property.description || 'No description available.'}</p>
                        </div>

                        {property.features && (
                            <div style={styles.features}>
                                <h3 style={styles.featuresTitle}>Features & Amenities</h3>
                                <div style={styles.featuresList}>
                                    {property.features.split(',').map((feature, index) => (
                                        <span key={index} style={styles.featureTag}>✓ {feature.trim()}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div style={styles.contactSection}>
                            {!showContactForm ? (
                                <button 
                                    style={styles.contactButton}
                                    onClick={() => setShowContactForm(true)}
                                >
                                    Inquire About This Property
                                </button>
                            ) : (
                                <div style={styles.contactForm}>
                                    <h3 style={styles.formTitle}>Send Inquiry</h3>
                                    <form style={styles.form} onSubmit={handleSubmitInquiry}>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={inquiry.name}
                                            onChange={handleInquiryChange}
                                            style={styles.formInput}
                                            required
                                        />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={inquiry.email}
                                            onChange={handleInquiryChange}
                                            style={styles.formInput}
                                            required
                                        />
                                        <input
                                            type="tel"
                                            name="phone"
                                            placeholder="Your Phone"
                                            value={inquiry.phone}
                                            onChange={handleInquiryChange}
                                            style={styles.formInput}
                                            required
                                        />
                                        <textarea
                                            name="message"
                                            placeholder="Your Message"
                                            rows="4"
                                            value={inquiry.message}
                                            onChange={handleInquiryChange}
                                            style={styles.formTextarea}
                                            required
                                        ></textarea>
                                        <button type="submit" style={styles.submitButton}>Send Inquiry</button>
                                        <button 
                                            type="button" 
                                            style={styles.cancelButton}
                                            onClick={() => setShowContactForm(false)}
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

export default SaleDetail;