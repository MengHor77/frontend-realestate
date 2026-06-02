import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Header() {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    // មុខងារសម្រាប់បង្ហាញទង់ជាតិ ឬឈ្មោះភាសាបច្ចុប្បន្ន
    const currentLanguage = i18n.language === 'kh' ? 'ខ្មែរ' : 'English';

    return (
        <header className="navbar navbar-expand-lg fixed-top custom-header">
            <div className="container">
                {/* Logo & Brand Name */}
                <NavLink className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
                    <span className="brand-icon">🏡</span>
                    <span className="brand-text">Real Estate <span className="text-gold">MH</span></span>
                </NavLink>

                {/* Mobile Menu Toggler */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-1">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">{t('home')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/sale">{t('sale')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/rent">{t('rent')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/news">{t('news')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact-us">{t('contact')}</NavLink>
                        </li>

                        {/* Dropdown សម្រាប់ប្តូរភាសា */}
                        <li className="nav-item dropdown ms-lg-3">
                            <button
                                className="btn btn-sm btn-outline-light dropdown-toggle d-flex align-items-center gap-2"
                                type="button"
                                id="languageDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ borderRadius: '20px', padding: '5px 15px' }}
                            >
                                <i className="bi bi-globe"></i> {currentLanguage}
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="languageDropdown">
                                <li>
                                    <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => changeLanguage('en')}>
                                        English
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => changeLanguage('kh')}>
                                        ខ្មែរ
                                    </button>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                            <NavLink className="btn-signup-nav" to="/signup">{t('signup')}</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;