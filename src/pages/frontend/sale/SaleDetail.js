// D:\realestate\frontend\src\pages\frontend\sale\SaleDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const SaleDetail = () => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showLightbox, setShowLightbox] = useState(false);
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
                setCurrentImageIndex(0);
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

    const nextImage = () => {
        if (property && property.images && property.images.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === property.images.length - 1 ? 0 : prev + 1
            );
        }
    };

    const prevImage = () => {
        if (property && property.images && property.images.length > 0) {
            setCurrentImageIndex((prev) =>
                prev === 0 ? property.images.length - 1 : prev - 1
            );
        }
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    const openLightbox = () => {
        setShowLightbox(true);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setShowLightbox(false);
        document.body.style.overflow = 'auto';
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
            padding: '0 20px',
            paddingTop: '10px'
        },
        backNavigation: {
            marginBottom: '30px'
        },
        backLink: {
            color: '#003366',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'color 0.3s ease'
        },
        detailContainer: {
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        gallery: {
            width: '100%',
            background: '#000',
            position: 'relative'
        },
        mainImageContainer: {
            position: 'relative',
            height: '500px',
            overflow: 'hidden',
            cursor: 'pointer'
        },
        mainImage: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease'
        },
        navButton: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.6)',
            color: 'white',
            border: 'none',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            zIndex: 10
        },
        prevButton: {
            left: '20px'
        },
        nextButton: {
            right: '20px'
        },
        thumbnailContainer: {
            display: 'flex',
            gap: '10px',
            padding: '15px 20px',
            overflowX: 'auto',
            backgroundColor: '#f8f9fa',
            borderTop: '1px solid #eee'
        },
        thumbnail: {
            width: '80px',
            height: '80px',
            objectFit: 'cover',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: '2px solid transparent'
        },
        activeThumbnail: {
            border: '2px solid #003366',
            transform: 'scale(1.05)'
        },
        imageCounter: {
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '5px 12px',
            borderRadius: '20px',
            fontSize: '14px',
            zIndex: 10
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
            textTransform: 'capitalize',
            zIndex: 10
        },
        // Lightbox styles
        lightboxOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        lightboxContent: {
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh'
        },
        lightboxImage: {
            maxWidth: '90vw',
            maxHeight: '90vh',
            objectFit: 'contain'
        },
        closeLightbox: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: 'none',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease'
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
            color: '#003366',
            margin: 0,
            fontWeight: '700'
        },
        priceTag: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#0d6efd'
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
        mortgageCalculator: {
            background: '#f0f4ff',
            padding: '20px',
            borderRadius: '8px',
            marginBottom: '30px'
        },
        mortgageTitle: {
            marginTop: 0,
            marginBottom: '15px',
            color: '#003366'
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
            color: '#0d6efd',
            fontWeight: 'bold'
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
            background: '#003366',
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
            borderRadius: '8px'
        },
        noImages: {
            position: 'relative',
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#999',
            fontSize: '16px'
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
                    button:hover:not(:disabled) {
                        opacity: 0.9;
                        transform: scale(1.05);
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
                <Link to="/sale" style={styles.backButton}>Back to Properties for Sale</Link>
            </div>
        );
    }

    const mortgage = calculateMortgage();
    const images = property.images && property.images.length > 0 ? property.images :
        (property.image_url ? [{ id: 0, url: property.image_url, is_primary: true }] : []);
    const hasImages = images.length > 0;

    return (
        <div style={styles.page}>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                button:hover:not(:disabled) {
                    opacity: 0.9;
                    transform: scale(1.05);
                }
                .thumbnail:hover {
                    transform: scale(1.1);
                }
                ::-webkit-scrollbar {
                    height: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                ::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 4px;
                }
            `}</style>
            <div style={styles.container}>
                <div style={styles.backNavigation}>
                    <Link
                        to="/sale"
                        style={styles.backLink}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#0d6efd'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#003366'}
                    >
                        ← Back to Properties for Sale
                    </Link>                </div>

                <div style={styles.detailContainer}>
                    {/* Image Gallery */}
                    <div style={styles.gallery}>
                        {hasImages ? (
                            <>
                                <div style={styles.mainImageContainer}>
                                    <img
                                        src={images[currentImageIndex].url}
                                        alt={`${property.title} - Image ${currentImageIndex + 1}`}
                                        style={styles.mainImage}
                                        onClick={openLightbox}
                                    />
                                    {images.length > 1 && (
                                        <>
                                            <button
                                                onClick={prevImage}
                                                style={{ ...styles.navButton, ...styles.prevButton }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)'}
                                            >
                                                ❮
                                            </button>
                                            <button
                                                onClick={nextImage}
                                                style={{ ...styles.navButton, ...styles.nextButton }}
                                                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'}
                                                onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)'}
                                            >
                                                ❯
                                            </button>
                                            <div style={styles.imageCounter}>
                                                {currentImageIndex + 1} / {images.length}
                                            </div>
                                        </>
                                    )}
                                    {/* For Sale Badge */}
                                    <div style={styles.propertyTypeBadge}>
                                        For Sale
                                    </div>
                                </div>

                                {images.length > 1 && (
                                    <div style={styles.thumbnailContainer}>
                                        {images.map((image, index) => (
                                            <img
                                                key={image.id || index}
                                                src={image.url}
                                                alt={`Thumbnail ${index + 1}`}
                                                style={{
                                                    ...styles.thumbnail,
                                                    ...(currentImageIndex === index ? styles.activeThumbnail : {})
                                                }}
                                                className="thumbnail"
                                                onClick={() => goToImage(index)}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <div style={styles.noImages}>
                                <p>No images available for this property</p>
                                <div style={styles.propertyTypeBadge}>
                                    For Sale
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Lightbox */}
                    {showLightbox && hasImages && (
                        <div style={styles.lightboxOverlay} onClick={closeLightbox}>
                            <div style={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
                                <img
                                    src={images[currentImageIndex].url}
                                    alt="Full size view"
                                    style={styles.lightboxImage}
                                />
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            style={{ ...styles.navButton, ...styles.prevButton, top: '50%' }}
                                        >
                                            ❮
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            style={{ ...styles.navButton, ...styles.nextButton, top: '50%' }}
                                        >
                                            ❯
                                        </button>
                                    </>
                                )}
                                <button
                                    onClick={closeLightbox}
                                    style={styles.closeLightbox}
                                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    )}

                    <div style={styles.content}>
                        <div style={styles.header}>
                            <h1 style={styles.title}>{property.title}</h1>
                            <div style={styles.priceTag}>${property.price.toLocaleString()}</div>
                        </div>

                        <div style={styles.location}>
                            <span>📍</span> {property.location}
                        </div>

                        <div style={styles.specs}>
                            <div style={styles.specItem}>
                                <span style={styles.specLabel}>Property Type</span>
                                <span style={styles.specValue}>{property.property_type}</span>
                            </div>
                            <div style={styles.specItem}>
                                <span style={styles.specLabel}>Bedrooms</span>
                                <span style={styles.specValue}>{property.bedrooms}</span>
                            </div>
                            <div style={styles.specItem}>
                                <span style={styles.specLabel}>Bathrooms</span>
                                <span style={styles.specValue}>{property.bathrooms}</span>
                            </div>
                            <div style={styles.specItem}>
                                <span style={styles.specLabel}>Size</span>
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
                                    onMouseEnter={(e) => e.currentTarget.style.background = '#0d6efd'}
                                    onMouseLeave={(e) => e.currentTarget.style.background = '#003366'}
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