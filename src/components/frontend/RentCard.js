// D:\realestate\frontend\src\components\frontend\RentCard.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RentCard = ({ property, onFavoriteToggle, isFavorite = false, featured = false }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onFavoriteToggle) {
            onFavoriteToggle(property.id);
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const styles = {
        card: {
            position: 'relative',
            background: '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: isHovered 
                ? '0 8px 20px rgba(0,0,0,0.15)' 
                : '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
            cursor: 'pointer',
            textDecoration: 'none',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        },
        imageContainer: {
            position: 'relative',
            height: '250px',
            overflow: 'hidden',
            backgroundColor: '#f5f5f5'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered ? 'scale(1.05)' : 'scale(1)'
        },
        imagePlaceholder: {
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#999',
            fontSize: '14px'
        },
        favoriteButton: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            border: 'none',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 10,
            fontSize: '18px'
        },
        featuredBadge: {
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: '#ffd700',
            color: '#003366',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            zIndex: 10
        },
        propertyType: {
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            textTransform: 'capitalize',
            zIndex: 10
        },
        content: {
            padding: '16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        },
        title: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#003366',
            marginBottom: '8px',
            lineHeight: 1.4
        },
        location: {
            color: '#666',
            fontSize: '14px',
            marginBottom: '12px'
        },
        price: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#0d6efd',
            marginBottom: '12px'
        },
        details: {
            display: 'flex',
            gap: '16px',
            color: '#666',
            fontSize: '14px',
            paddingTop: '12px',
            borderTop: '1px solid #eee'
        },
        viewButton: {
            background: '#003366',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            marginTop: '12px',
            textAlign: 'center'
        }
    };

    return (
        <Link 
            to={`/rent/${property.id}`} 
            style={{ textDecoration: 'none' }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={styles.card}>
                <div style={styles.imageContainer}>
                    {!imageLoaded && !imageError && (
                        <div style={styles.imagePlaceholder}>
                            Loading...
                        </div>
                    )}
                    {!imageError ? (
                        <img 
                            src={property.image_url || property.images?.[0] || '/api/placeholder/400/300'}
                            alt={property.title}
                            style={styles.image}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                        />
                    ) : (
                        <div style={styles.imagePlaceholder}>
                            No Image Available
                        </div>
                    )}
                    <div 
                        style={styles.favoriteButton}
                        onClick={handleFavoriteClick}
                    >
                        {isFavorite ? '❤️' : '🤍'}
                    </div>
                    {featured && (
                        <div style={styles.featuredBadge}>
                            Featured
                        </div>
                    )}
                    <div style={styles.propertyType}>
                        {property.property_type || property.type}
                    </div>
                </div>

                <div style={styles.content}>
                    <h3 style={styles.title}>
                        {property.title}
                    </h3>
                    <p style={styles.location}>
                        📍 {property.location}
                    </p>
                    <p style={styles.price}>
                        {formatPrice(property.price)}/month
                    </p>
                    <div style={styles.details}>
                        <span>🛏️ {property.bedrooms} beds</span>
                        <span>🚿 {property.bathrooms} baths</span>
                        <span>📏 {property.size_sqm || property.area} m²</span>
                    </div>
                    <div style={styles.viewButton}>
                        View Details →
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RentCard;