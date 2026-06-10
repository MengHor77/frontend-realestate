import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function RentDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRentDetail = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/api/properties/rent-detail/${id}`);
                if (response.data.success) {
                    setProperty(response.data.property);
                } else {
                    setError('Property not found');
                }
            } catch (err) {
                console.error("Error fetching rent property details:", err);
                if (err.response?.status === 404) {
                    setError('Rent property not found');
                } else {
                    setError('Failed to load property details');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchRentDetail();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="container mt-5 pt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading property details...</p>
            </div>
        );
    }

    if (error || !property) {
        return (
            <div className="container mt-5 pt-5 text-center">
                <div className="alert alert-danger">
                    <h4 className="alert-heading">Error!</h4>
                    <p>{error || 'Property not found'}</p>
                    <button className="btn btn-primary" onClick={() => navigate('/rent')}>
                        Back to Rent Listings
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4 pb-5" style={{ paddingTop: '80px' }}>
            <button className="btn btn-outline-primary mb-4" onClick={() => navigate('/rent')}>
                ← Back to Rent Listings
            </button>

            <div className="row">
                {/* Image Gallery Section */}
                <div className="col-lg-7 mb-4">
                    <div className="card border-0 shadow-sm">
                        <img 
                            src={property.image_url || '/default-property.jpg'} 
                            className="card-img-top rounded-3" 
                            alt={property.title}
                            style={{ maxHeight: '500px', objectFit: 'cover', borderRadius: '15px' }}
                            onError={(e) => {
                                e.target.src = '/default-property.jpg';
                            }}
                        />
                    </div>
                </div>

                {/* Property Info Section */}
                <div className="col-lg-5 mb-4">
                    <div className="card border-0 shadow-sm p-4 rounded-4">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <span className="badge bg-primary mb-2 px-3 py-2">
                                    {property.property_type}
                                </span>
                                <h2 className="fw-bold mb-2">{property.title}</h2>
                            </div>
                            <div className="text-warning">
                                ★★★★★ <span className="text-muted">(5 reviews)</span>
                            </div>
                        </div>

                        <p className="text-muted mb-3">
                            <i className="bi bi-geo-alt-fill me-2 text-primary"></i>
                            {property.location}
                        </p>

                        <div className="bg-light p-3 rounded-3 mb-4">
                            <div className="row text-center">
                                <div className="col-4">
                                    <small className="text-muted d-block">Bedrooms</small>
                                    <strong className="fs-5">{property.bedrooms || 0}</strong>
                                </div>
                                <div className="col-4">
                                    <small className="text-muted d-block">Bathrooms</small>
                                    <strong className="fs-5">{property.bathrooms || 0}</strong>
                                </div>
                                <div className="col-4">
                                    <small className="text-muted d-block">Size</small>
                                    <strong className="fs-5">{property.size_sqm || 0} m²</strong>
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h5 className="fw-bold">Price</h5>
                            <div className="d-flex align-items-baseline">
                                <span className="display-6 fw-bold text-primary">${property.price}</span>
                                <span className="text-muted ms-2">/ month</span>
                            </div>
                        </div>

                        {property.description && (
                            <div className="mb-4">
                                <h5 className="fw-bold">Description</h5>
                                <p className="text-muted">{property.description}</p>
                            </div>
                        )}

                        {property.features && (
                            <div className="mb-4">
                                <h5 className="fw-bold">Features</h5>
                                <p className="text-muted">{property.features}</p>
                            </div>
                        )}

                        <div className="d-grid gap-2">
                            <button className="btn btn-primary btn-lg rounded-pill">
                                <i className="bi bi-calendar-check me-2"></i>
                                Request to View
                            </button>
                            <button className="btn btn-outline-primary rounded-pill">
                                <i className="bi bi-chat-dots me-2"></i>
                                Contact Agent
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RentDetail;