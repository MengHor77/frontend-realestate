import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Sale = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        location: '',
        type: '',
        minPrice: '',
        maxPrice: ''
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        total: 0,
        limit: 12
    });

    useEffect(() => {
        fetchSaleProperties();
    }, [filters, pagination.currentPage]);

    const fetchSaleProperties = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: pagination.currentPage,
                limit: pagination.limit,
                ...(filters.location && { location: filters.location }),
                ...(filters.type && { type: filters.type }),
                ...(filters.minPrice && { minPrice: filters.minPrice }),
                ...(filters.maxPrice && { maxPrice: filters.maxPrice })
            });

            const response = await axios.get(`http://localhost:5000/api/properties/sale?${params}`);
            
            if (response.data.success) {
                setProperties(response.data.properties);
                setPagination({
                    ...pagination,
                    totalPages: response.data.totalPages,
                    total: response.data.total
                });
            }
        } catch (err) {
            console.error('Error fetching sale properties:', err);
            setError('Failed to load properties. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, currentPage: newPage }));
            window.scrollTo(0, 0);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f5f5f5'
        },
        heroSection: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '60px 20px',
            textAlign: 'center'
        },
        heroTitle: {
            fontSize: '48px',
            marginBottom: '16px'
        },
        heroSubtitle: {
            fontSize: '20px',
            opacity: 0.9
        },
        filtersSection: {
            background: 'white',
            padding: '30px 0',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        containerWidth: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 20px'
        },
        filtersGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
        },
        input: {
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px'
        },
        select: {
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: 'white'
        },
        propertiesSection: {
            padding: '60px 0'
        },
        propertiesHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '40px',
            flexWrap: 'wrap'
        },
        propertiesGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '30px'
        },
        propertyCard: {
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
        },
        propertyImage: {
            position: 'relative',
            height: '250px',
            overflow: 'hidden'
        },
        image: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        propertyType: {
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(0,0,0,0.7)',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px'
        },
        propertyInfo: {
            padding: '20px'
        },
        title: {
            fontSize: '20px',
            marginBottom: '8px',
            color: '#333'
        },
        location: {
            color: '#666',
            marginBottom: '12px'
        },
        price: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#667eea',
            marginBottom: '12px'
        },
        propertyDetails: {
            display: 'flex',
            gap: '16px',
            color: '#666',
            fontSize: '14px'
        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            marginTop: '40px'
        },
        button: {
            padding: '10px 20px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s'
        },
        buttonDisabled: {
            padding: '10px 20px',
            background: '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'not-allowed'
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
        noProperties: {
            textAlign: 'center',
            padding: '60px 20px',
            fontSize: '18px',
            color: '#666'
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
                <p>Loading properties...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <p>{error}</p>
                <button onClick={fetchSaleProperties} style={styles.button}>Try Again</button>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <style>{`
                .property-card:hover {
                    transform: translateY(-5px);
                }
                .pagination-button:hover:not(:disabled) {
                    background: #5a67d8 !important;
                }
            `}</style>
            
            <div style={styles.heroSection}>
                <h1 style={styles.heroTitle}>Properties for Sale</h1>
                <p style={styles.heroSubtitle}>Find your dream home</p>
            </div>

            <div style={styles.filtersSection}>
                <div style={styles.containerWidth}>
                    <div style={styles.filtersGrid}>
                        <div>
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={filters.location}
                                onChange={handleFilterChange}
                                style={styles.input}
                            />
                        </div>
                        <div>
                            <select name="type" value={filters.type} onChange={handleFilterChange} style={styles.select}>
                                <option value="">Property Type</option>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="villa">Villa</option>
                                <option value="commercial">Commercial</option>
                            </select>
                        </div>
                        <div>
                            <input
                                type="number"
                                name="minPrice"
                                placeholder="Min Price"
                                value={filters.minPrice}
                                onChange={handleFilterChange}
                                style={styles.input}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                name="maxPrice"
                                placeholder="Max Price"
                                value={filters.maxPrice}
                                onChange={handleFilterChange}
                                style={styles.input}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div style={styles.propertiesSection}>
                <div style={styles.containerWidth}>
                    <div style={styles.propertiesHeader}>
                        <h2>Available Properties for Sale</h2>
                        <p>Showing {properties.length} of {pagination.total} properties</p>
                    </div>

                    {properties.length === 0 ? (
                        <div style={styles.noProperties}>
                            <p>No properties found matching your criteria.</p>
                        </div>
                    ) : (
                        <>
                            <div style={styles.propertiesGrid}>
                                {properties.map(property => (
                                    <Link to={`/sale/${property.id}`} key={property.id} style={{ textDecoration: 'none' }}>
                                        <div className="property-card" style={styles.propertyCard}>
                                            <div style={styles.propertyImage}>
                                                <img src={property.image_url} alt={property.title} style={styles.image} />
                                                <span style={styles.propertyType}>{property.property_type}</span>
                                            </div>
                                            <div style={styles.propertyInfo}>
                                                <h3 style={styles.title}>{property.title}</h3>
                                                <p style={styles.location}>{property.location}</p>
                                                <p style={styles.price}>${property.price.toLocaleString()}</p>
                                                <div style={styles.propertyDetails}>
                                                    <span>{property.bedrooms} beds</span>
                                                    <span>{property.bathrooms} baths</span>
                                                    <span>{property.size_sqm} m²</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {pagination.totalPages > 1 && (
                                <div style={styles.pagination}>
                                    <button 
                                        className="pagination-button"
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        disabled={pagination.currentPage === 1}
                                        style={pagination.currentPage === 1 ? styles.buttonDisabled : styles.button}
                                    >
                                        Previous
                                    </button>
                                    <span>Page {pagination.currentPage} of {pagination.totalPages}</span>
                                    <button 
                                        className="pagination-button"
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        disabled={pagination.currentPage === pagination.totalPages}
                                        style={pagination.currentPage === pagination.totalPages ? styles.buttonDisabled : styles.button}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Sale;