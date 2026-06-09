// Home.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../../../components/frontend/ServiceCard';
import HeroSection from '../../../components/frontend/HeroSection';

function Home() {
    const { t } = useTranslation();
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const services = [
        { title: t('house_sale'), icon: '🏡', link: '/sale', color: '#e3f2fd' },
        { title: t('house_rent'), icon: '🔑', link: '/rent', color: '#fff3e0' },
        { title: t('land_rent'), icon: '🏗️', link: '/rent', color: '#e8f5e9' },
        { title: t('construction'), icon: '🔨', link: '/construction', color: '#e8f5e9' },
        { title: t('decoration'), icon: '🎨', link: '/decoration', color: '#e8f5e9' },
        { title: t('create_web_app'), icon: '💻', link: '/web-app', color: '#e8f5e9' },
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/api/properties')
            .then(res => {
                const data = res.data.properties || [];
                setProperties(data);
                setFilteredProperties(data.slice(0, 6));
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching properties:", err);
                setLoading(false);
            });
    }, []);

    const handleSearch = (searchTerm, type) => {
        let filtered = [...properties];

        if (type === 'sale') {
            filtered = filtered.filter(p => p.listing_type === 'sale' || p.property_type === 'sale');
        } else if (type === 'rent') {
            filtered = filtered.filter(p => p.listing_type === 'rent' || p.property_type === 'rent');
        }

        if (searchTerm) {
            filtered = filtered.filter(p =>
                p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.location?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredProperties(filtered.slice(0, 6));

        // Scroll to projects section
        document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="home-page">
            <HeroSection onSearch={handleSearch} />

            <section className="container py-5 mt-4">
                <div className="text-center mb-5">
                    <h2 className="fw-bold" style={{ color: '#003366' }}>{t('our_services')}</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: '#c9a03d', margin: '10px auto' }}></div>
                </div>
                <div className="row g-4 text-center">
                    {services.map((item, index) => (
                        <ServiceCard key={index} title={item.title} icon={item.icon} link={item.link} color={item.color} />
                    ))}
                </div>
            </section>

            <section id="projects-section" className="py-5" style={{ backgroundColor: '#ffffff' }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <h2 className="fw-bold mb-0" style={{ color: '#003366' }}>{t('featured_projects')}</h2>
                            <p className="text-muted mb-0">{t('curated_for_you')}</p>
                        </div>
                        <Link to="/sale" className="btn btn-outline-primary fw-bold rounded-pill">{t('view_all')}</Link>
                    </div>

                    {loading ? (
                        <p className="text-center">{t('loading')}</p>
                    ) : filteredProperties.length > 0 ? (
                        <div className="row g-4">
                            {filteredProperties.map((item) => (
                                <div className="col-md-4" key={item.id}>
                                    <div className="card h-100 shadow-sm">
                                        <img src={`http://localhost:5000${item.image_url || '/default-image.jpg'}`}
                                            className="card-img-top" alt={item.title} style={{ height: '220px', objectFit: 'cover' }} />
                                        <div className="card-body">
                                            <h5 className="text-primary fw-bold">${item.price?.toLocaleString() || '0'}</h5>
                                            <p className="fw-bold mb-1">{item.title}</p>
                                            <p className="text-muted small">📍 {item.location}</p>
                                            <hr className="my-2" />
                                            <div className="d-flex justify-content-between text-muted small">
                                                <span>🛏️ {item.bedrooms || 0}</span>
                                                <span>🚿 {item.bathrooms || 0}</span>
                                                <span>📐 {item.size_sqm || 0}m²</span>
                                            </div>
                                            <span className="badge mt-2" style={{ backgroundColor: item.listing_type === 'sale' ? '#28a745' : '#ffc107', color: '#000' }}>
                                                {item.listing_type || item.property_type}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center">{t('no_results')}</p>
                    )}
                </div>
            </section>

            <section className="container py-5 my-5">
                <div className="p-5 rounded-4 text-white text-center" style={{ backgroundColor: '#003366' }}>
                    <h2 className="fw-bold mb-3">{t('cta_title')}</h2>
                    <p className="mb-4">{t('cta_subtitle')}</p>
                    <Link to="/contact-us" className="btn btn-warning btn-lg px-5 fw-bold rounded-pill">{t('consult_now')}</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;