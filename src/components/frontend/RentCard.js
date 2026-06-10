import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RentCard({ item }) {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    const styles = {
        card: {
            borderRadius: '20px',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
            boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
            border: 'none',
            cursor: 'pointer'
        },
        imageContainer: {
            overflow: 'hidden',
            borderRadius: '20px 20px 0 0'
        },
        image: {
            height: '240px',
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        },
        shadowPrimary: {
            boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)'
        }
    };

    if (!item || !item.id) {
        return null;
    }

    return (
        <div
            className="h-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="card h-100 overflow-hidden" style={styles.card}>
                <div style={styles.imageContainer}>
                    <img
                        src={item.image_url || '/default-image.jpg'}
                        className="card-img-top"
                        alt={item.title}
                        style={styles.image}
                        onError={(e) => {
                            e.target.src = '/default-image.jpg';
                        }}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-between p-3">
                        <div className="d-flex justify-content-between">
                            {item.status && (
                                <span className="badge px-3 py-2 bg-white text-dark rounded-pill shadow-sm">
                                    {item.status}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: '1px' }}>
                            {item.property_type || 'Property'}
                        </span>
                        <span className="text-warning">★★★★★</span>
                    </div>

                    <h5 className="fw-bold text-dark mb-1">{item.title}</h5>
                    <p className="text-muted small mb-3">
                        <i className="bi bi-geo-alt-fill me-1"></i> {item.location}
                    </p>

                    <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mb-4">
                        <div className="text-center">
                            <small className="d-block text-muted">Beds</small>
                            <span className="fw-bold">{item.bedrooms || 0}</span>
                        </div>
                        <div className="text-center border-start border-end px-3">
                            <small className="d-block text-muted">Baths</small>
                            <span className="fw-bold">{item.bathrooms || 0}</span>
                        </div>
                        <div className="text-center">
                            <small className="d-block text-muted">Size</small>
                            <span className="fw-bold">{item.size_sqm || 0}m²</span>
                        </div>
                    </div>

                    <div className="mt-auto d-flex align-items-center justify-content-between">
                        <div className="h4 text-dark fw-bolder mb-0">
                            ${item.price}<span className="fs-6 text-muted fw-normal">/mo</span>
                        </div>
                        {/* FIXED ROUTE - Now matches your backend route */}
                        <Link
                            to={item.id ? `/rent/${item.id}` : "#"}
                            className="btn btn-primary px-4 py-2 rounded-pill"
                            style={styles.shadowPrimary}
                            onClick={(e) => {
                                if (!item.id) {
                                    e.preventDefault();
                                    alert("Error: Property ID is missing or invalid.");
                                }
                            }}
                        >
                            {t('view_details')}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RentCard;