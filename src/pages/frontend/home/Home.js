import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../../../components/frontend/ServiceCard';
import HeroSection from '../../../components/frontend/HeroSection';

function Home() {
    const { t } = useTranslation();
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    const services = [
        { title: t('house sale'), icon: '🏡', link: '/sale', color: '#e3f2fd' },
        { title: t('house rent'), icon: '🔑', link: '/rent', color: '#fff3e0' },
        { title: t('land rent'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: t('construction'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: t('decoration'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: t('create web and app'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/api/properties')
            .then(res => {
                // កែសម្រួល៖ យកទិន្នន័យមកទាំងអស់ រួចកាត់យកតែ 6 ជួរដំបូង ដោយមិនតម្រង
                const allProperties = res.data.properties.slice(0, 6);

                setProperties(allProperties);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching properties:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="home-page">
            {/* ១. Hero Section */}
            <HeroSection />

            {/* ២. Categories Section */}
            <section className="container py-5 mt-4">
                <div className="text-center mb-5">
                    <h2 className="fw-bold" style={{ color: 'var(--primary-dark)' }}>{t('our_services')}</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--gold-color)', margin: '10px auto' }}></div>
                </div>
                <div className="row g-4 text-center">
                    {services.map((item, index) => (
                        <ServiceCard
                            key={index}
                            title={item.title}
                            icon={item.icon}
                            link={item.link}
                            color={item.color}
                        />
                    ))}
                </div>
            </section>

            {/* ៣. Latest Projects (បង្ហាញរាល់ Type ទាំងអស់ត្រឹម 6 កាត) */}
            <section className="py-5" style={{ backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>{t('featured_projects')}</h2>
                            <p className="text-muted mb-0">{t('curated_for_you')}</p>
                        </div>
                        <Link to="/sale" className="btn btn-outline-primary fw-bold rounded-pill">{t('view_all')}</Link>
                    </div>

                    {loading ? (
                        <p className="text-center">កំពុងផ្ទុកទិន្នន័យ...</p>
                    ) : (
                        <div className="row g-4">
                            {properties.length > 0 ? (
                                properties.map((item) => (
                                    <div className="col-md-4" key={item.id}>
                                        <div className="card h-100">
                                            <div className="position-relative">
                                                <img
                                                    src={`http://localhost:5000${item.image_url}`}
                                                    className="card-img-top"
                                                    alt={item.title}
                                                    style={{ height: '240px', objectFit: 'cover' }}
                                                />
                                                <span className="position-absolute top-0 end-0 m-3 badge bg-gold">{item.type}</span>
                                            </div>
                                            <div className="card-body p-4">
                                                <h5 className="card-title">${item.price}</h5>
                                                <p className="fw-bold text-dark mb-2 text-truncate">{item.title}</p>
                                                <p className="text-muted small">📍 {item.location}</p>
                                                <hr />
                                                <div className="d-flex justify-content-between text-muted small">
                                                    <span>🛏️ {item.bedrooms}</span>
                                                    <span>🚿 {item.bathrooms}</span>
                                                    <span>📐 {item.size_sqm}m²</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">មិនទាន់មានទិន្នន័យក្នុងប្រព័ន្ធទេ</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* ៤. Consult Section */}
            <section className="container py-5 my-5">
                <div className="p-5 rounded-5 text-white text-center shadow-lg" style={{ backgroundColor: 'var(--primary-dark)', borderLeft: '10px solid var(--gold-color)' }}>
                    <h2 className="fw-bold mb-3">{t('cta_title')}</h2>
                    <p className="mb-4 opacity-75">{t('cta_subtitle')}</p>
                    <Link to="/contact-us" className="btn btn-warning btn-lg px-5 fw-bold rounded-pill">{t('consult_now')}</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;