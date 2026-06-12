import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="text-white pt-5 pb-3 border-top" style={{ backgroundColor: 'var(--primary-dark)', borderTop: '4px solid var(--gold-color) !important' }}>
            <div className="container">
                <div className="row g-4">
                    {/* Section 1: About Company */}
                    <div className="col-lg-4 col-md-6">
                        <h4 className="fw-bold mb-4" style={{ color: 'var(--gold-color)' }}>MH Real Estate</h4>
                        <p className="opacity-75" style={{ fontSize: '14px', lineHeight: '1.8' }}>
                            {t('footer_about')}
                        </p>
                        <div className="d-flex gap-3 mt-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
                            <a href="https://telegram.org" target="_blank" rel="noopener noreferrer" className="text-white fs-5"><i className="bi bi-telegram"></i></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-white fs-5"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    {/* Section 2: Quick Links */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="fw-bold mb-4">{t('quick_links')}</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-white text-decoration-none opacity-75 footer-link">
                                    {t('home')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/sale" className="text-white text-decoration-none opacity-75 footer-link">
                                    {t('sale')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/rent" className="text-white text-decoration-none opacity-75 footer-link">
                                    {t('rent')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/news" className="text-white text-decoration-none opacity-75 footer-link">
                                    {t('news')}
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/contact-us" className="text-white text-decoration-none opacity-75 footer-link">
                                    {t('contact')}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Section 3: Services */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-4">{t('our_services_footer')}</h5>
                        <ul className="list-unstyled opacity-75" style={{ fontSize: '14px' }}>
                            <li className="mb-2">✓ {t('service_1')}</li>
                            <li className="mb-2">✓ {t('service_2')}</li>
                            <li className="mb-2">✓ {t('service_3')}</li>
                            <li className="mb-2">✓ {t('service_4')}</li>
                        </ul>
                    </div>

                    {/* Section 4: Contact */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-4">{t('contact_us_footer')}</h5>
                        <p className="opacity-75 small mb-2">📍 {t('address')}</p>
                        <p className="opacity-75 small mb-2">📞 096 316 77 44</p>
                        <p className="opacity-75 small mb-0">✉️ menghor215215@gmail.com</p>
                    </div>
                </div>

                <hr className="my-4 opacity-25" />

                {/* Copyright Section */}
                <div className="text-center opacity-75">
                    <small>{t('copyright')}</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;