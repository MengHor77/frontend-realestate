import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const navbarCollapseRef = useRef(null);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
        closeNavbar();
    };

    // Function to close the navbar collapse
    const closeNavbar = () => {
        if (navbarCollapseRef.current && navbarCollapseRef.current.classList.contains('show')) {
            // Use Bootstrap's collapse method if available
            const bsCollapse = window.bootstrap?.Collapse?.getInstance(navbarCollapseRef.current);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                // Fallback: manually remove the show class
                navbarCollapseRef.current.classList.remove('show');
            }
        }
    };

    // Handle link click - close menu and scroll to top
    const handleLinkClick = () => {
        closeNavbar();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Get user initial for avatar
    const getUserInitial = () => {
        if (!user) return '?';
        if (user.name) {
            return user.name.charAt(0).toUpperCase();
        }
        return user.email?.charAt(0).toUpperCase() || 'U';
    };

    const currentLanguage = i18n.language === 'kh' ? 'ខ្មែរ' : 'English';

    return (
        <header className="navbar navbar-expand-lg fixed-top custom-header">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/" onClick={handleLinkClick}>
                    <span className="brand-icon">
                        <i className="fa fa-home" aria-hidden="true" style={{ color: '#ffd700', marginRight: '5px' }}></i>
                    </span>
                    <span className="brand-text" style={{ color: '#ffd700', marginRight: '5px' }}>MH Real Estate</span>
                </NavLink>

                <button 
                    className="navbar-toggler custom-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav" ref={navbarCollapseRef}>
                    <ul className="navbar-nav ms-auto align-items-center gap-1">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={handleLinkClick}>{t('home')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/sale" onClick={handleLinkClick}>{t('sale')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/rent" onClick={handleLinkClick}>{t('rent')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/news" onClick={handleLinkClick}>{t('news')}</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact-us" onClick={handleLinkClick}>{t('contact')}</NavLink>
                        </li>

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
                                    <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => {
                                        changeLanguage('en');
                                        closeNavbar();
                                    }}>
                                        English
                                    </button>
                                </li>
                                <li>
                                    <button className="dropdown-item d-flex align-items-center gap-2" onClick={() => {
                                        changeLanguage('kh');
                                        closeNavbar();
                                    }}>
                                        ខ្មែរ
                                    </button>
                                </li>
                            </ul>
                        </li>

                        {user ? (
                            <li className="nav-item dropdown ms-lg-3">
                                <button
                                    className="btn btn-link nav-link dropdown-toggle d-flex align-items-center gap-2"
                                    type="button"
                                    id="userDropdown"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                    style={{ color: '#fff', textDecoration: 'none' }}
                                >
                                    <div
                                        className="user-avatar"
                                        style={{
                                            width: '35px',
                                            height: '35px',
                                            borderRadius: '50%',
                                            backgroundColor: '#ffd700',
                                            color: '#003366',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '16px'
                                        }}
                                    >
                                        {getUserInitial()}
                                    </div>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userDropdown">
                                    <li>
                                        <NavLink className="dropdown-item" to="/profile" onClick={handleLinkClick}>
                                            <i className="bi bi-person-circle me-2"></i> Profile
                                        </NavLink>
                                    </li>
                                    {user.role === 'admin' && (
                                        <li>
                                            <NavLink className="dropdown-item" to="/admin/dashboard" onClick={handleLinkClick}>
                                                <i className="bi bi-speedometer2 me-2"></i> Dashboard
                                            </NavLink>
                                        </li>
                                    )}
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item" onClick={handleLogout} style={{ color: '#dc3545' }}>
                                            <i className="bi bi-box-arrow-right me-2"></i> Logout
                                        </button>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                                    <NavLink className="btn-signup-nav" to="/signup" onClick={handleLinkClick}>{t('signup')}</NavLink>
                                </li>
                                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                                    <NavLink className="btn-login-nav" to="/login" onClick={handleLinkClick} style={{
                                        backgroundColor: 'transparent',
                                        color: '#ffd700',
                                        border: '1px solid #ffd700',
                                        padding: '8px 22px',
                                        borderRadius: '30px',
                                        fontWeight: '700',
                                        textDecoration: 'none',
                                        transition: 'all 0.3s ease'
                                    }}>
                                        {t('login')}
                                    </NavLink>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;