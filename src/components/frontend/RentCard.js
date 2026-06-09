import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RentCard({ item }) {
    const { t } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);

    // Inline style object for premium effects
    const styles = {
        card: {
            borderRadius: '20px',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transform: isHovered ? 'translateY(-10px)' : 'translateY(0)',
            boxShadow: isHovered ? '0 20px 40px rgba(0,0,0,0.15)' : '0 0.125rem 0.25rem rgba(0,0,0,0.075)',
            border: 'none'
        },
        imageContainer: {
            overflow: 'hidden',
            borderRadius: '20px 20px 0 0'
        },
        image: {
            height: '240px',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        },
        shadowPrimary: {
            boxShadow: '0 4px 15px rgba(13, 110, 253, 0.3)'
        }
    };

    return (
        <div 
            className="h-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="card h-100 overflow-hidden" style={styles.card}>
                <div style={styles.imageContainer}>
                    <img
                        src={item.image}
                        className="card-img-top"
                        alt={t(item.titleKey)}
                        style={styles.image}
                    />
                    <div className="card-img-overlay d-flex flex-column justify-content-between p-3">
                        <div className="d-flex justify-content-between">
                            {item.topBadgeKey && (
                                <span className="badge px-3 py-2 bg-white text-dark rounded-pill shadow-sm">
                                    {t(item.topBadgeKey)}
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="text-primary fw-bold text-uppercase small" style={{ letterSpacing: '1px' }}>
                            {t(item.typeKey || 'property')}
                        </span>
                        <span className="text-warning">★★★★★</span>
                    </div>

                    <h5 className="fw-bold text-dark mb-1">{t(item.titleKey)}</h5>
                    <p className="text-muted small mb-3">
                        <i className="bi bi-geo-alt-fill me-1"></i> {t(item.locationKey)}
                    </p>

                    <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mb-4">
                        <div className="text-center">
                            <small className="d-block text-muted">Beds</small>
                            <span className="fw-bold">{item.beds}</span>
                        </div>
                        <div className="text-center border-start border-end px-3">
                            <small className="d-block text-muted">Baths</small>
                            <span className="fw-bold">{item.baths}</span>
                        </div>
                        <div className="text-center">
                            <small className="d-block text-muted">Size</small>
                            <span className="fw-bold">{item.size}m²</span>
                        </div>
                    </div>

                    <div className="mt-auto d-flex align-items-center justify-content-between">
                        <div className="h4 text-dark fw-bolder mb-0">
                            ${item.price}<span className="fs-6 text-muted fw-normal">/mo</span>
                        </div>
                        <Link 
                            to={`/properties/${item.id}`} 
                            className="btn btn-primary px-4 py-2 rounded-pill"
                            style={styles.shadowPrimary}
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