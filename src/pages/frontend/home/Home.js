import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../../../components/frontend/ServiceCard';
import HeroSection from '../../../components/frontend/HeroSection'; // 1. Import your new clean component

function Home() {
    const { t } = useTranslation();

    const services = [
        { title: t('house_sale'), icon: '🏡', link: '/sale', color: '#e3f2fd' },
        { title: t('house_rent'), icon: '🔑', link: '/rent', color: '#fff3e0' },
        { title: t('land_investment'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: t('construction'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: t('decoration'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: t('decoration'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
    ];

    return (
        <div className="home-page">
            {/* ១. Hero Section - Swapped with the optimized standalone component */}
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

            {/* ៣. Featured Listings */}
            <section className="py-5" style={{ backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>{t('featured_projects')}</h2>
                            <p className="text-muted mb-0">{t('curated_for_you')}</p>
                        </div>
                        <Link to="/sale" className="btn btn-outline-primary fw-bold rounded-pill">{t('view_all')}</Link>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="position-relative">
                                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="House" style={{ height: '240px', objectFit: 'cover' }} />
                                    <span className="position-absolute top-0 end-0 m-3 badge bg-gold">{t('special_offer')}</span>
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title">$285,000</h5>
                                    <p className="fw-bold text-dark mb-2 text-truncate">{t('villa_title')}</p>
                                    <p className="text-muted small">📍 {t('phnom_penh')}</p>
                                    <hr />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>🛏️ {t('bed_count', { count: 4 })}</span> <span>🚿 {t('bath_count', { count: 5 })}</span> <span>📐 120m²</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="position-relative">
                                    <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="House" style={{ height: '240px', objectFit: 'cover' }} />
                                    <span className="position-absolute top-0 end-0 m-3 badge bg-primary">{t('new_listing')}</span>
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title">$145,000</h5>
                                    <p className="fw-bold text-dark mb-2 text-truncate">{t('shophouse_title')}</p>
                                    <p className="text-muted small">📍 {t('phnom_penh')}</p>
                                    <hr />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>🛏️ {t('bed_count', { count: 3 })}</span> <span>🚿 {t('bath_count', { count: 4 })}</span> <span>📐 90m²</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="position-relative">
                                    <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="House" style={{ height: '240px', objectFit: 'cover' }} />
                                    <span className="position-absolute top-0 end-0 m-3 badge bg-danger">{t('hot_deal')}</span>
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title">$550 / {t('rent')}</h5>
                                    <p className="fw-bold text-dark mb-2 text-truncate">{t('condo_title')}</p>
                                    <p className="text-muted small">📍 {t('phnom_penh')}</p>
                                    <hr />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>🛏️ {t('bed_count', { count: 2 })}</span> <span>🚿 {t('bath_count', { count: 2 })}</span> <span>📐 65m²</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ៤. Call to Action */}
            <section className="container py-5 my-5">
                <div className="p-5 rounded-5 text-white text-center shadow-lg" style={{ backgroundColor: 'var(--primary-dark)', borderLeft: '10px solid var(--gold-color)' }}>
                    <h2 className="fw-bold mb-3">{t('cta_title')}</h2>
                    <p className="mb-4 opacity-75">{t('cta_subtitle')}</p>
                    <Link to="/contact" className="btn btn-warning btn-lg px-5 fw-bold rounded-pill">{t('consult_now')}</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;