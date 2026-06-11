import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

function Header() {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Get user's first name or display name
    const getUserDisplayName = () => {
        if (!user) return '';
        if (user.name) {
            return user.name.split(' ')[0];
        }
        return user.email?.split('@')[0];
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
                <NavLink className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
                    <span className="brand-icon">🏡</span>
                    <span className="brand-text">MH<span className="text-gold"> Real Estate</span></span>
                </NavLink>

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
                                    <span style={{ fontWeight: '500' }}>{getUserDisplayName()}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userDropdown">
                                    <li>
                                        <NavLink className="dropdown-item" to="/profile">
                                            <i className="bi bi-person-circle me-2"></i> Profile
                                        </NavLink>
                                    </li>
                                    {user.role === 'admin' && (
                                        <li>
                                            <NavLink className="dropdown-item" to="/admin/dashboard">
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
                                    <NavLink className="btn-signup-nav" to="/signup">{t('signup')}</NavLink>
                                </li>
                                <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                                    <NavLink className="btn-login-nav" to="/login" style={{
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