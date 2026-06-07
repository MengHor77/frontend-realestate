import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const LoginForm = ({ onSubmit, loading, error: externalError }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [internalError, setInternalError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setInternalError('');

        if (!email || !password) {
            setInternalError(t('login_all_fields_required') || 'Please fill in all fields');
            return;
        }

        onSubmit(email, password);
    };

    const displayError = externalError || internalError;

    return (
        <div className="card shadow-lg border-0 rounded-4" style={{ backdropFilter: 'blur(10px)', backgroundColor: 'rgba(255,255,255,0.98)' }}>
            <div className="card-body p-5">
                <div className="text-center mb-4">
                    <h2 className="fw-bold" style={{ color: 'var(--primary-dark)' }}>
                        {t('login_title') || 'Welcome Back'}
                    </h2>
                    <p className="text-muted">
                        {t('login_subtitle') || 'Sign in to your account'}
                    </p>
                </div>

                {displayError && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="fas fa-exclamation-circle me-2"></i>
                        {displayError}
                        <button type="button" className="btn-close" onClick={() => {
                            setInternalError('');
                        }}></button>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            <i className="fas fa-envelope me-2" style={{ color: 'var(--gold-color)' }}></i>
                            {t('email') || 'Email Address'}
                        </label>
                        <input
                            type="email"
                            className="form-control form-control-lg"
                            placeholder={t('email_placeholder') || 'Enter your email'}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                            style={{
                                borderRadius: '12px',
                                border: '1px solid #e0e0e0',
                                padding: '12px'
                            }}
                        />
                    </div>

                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            <i className="fas fa-lock me-2" style={{ color: 'var(--gold-color)' }}></i>
                            {t('password') || 'Password'}
                        </label>
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder={t('password_placeholder') || 'Enter your password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={loading}
                            style={{
                                borderRadius: '12px',
                                border: '1px solid #e0e0e0',
                                padding: '12px'
                            }}
                        />
                    </div>

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="remember" />
                            <label className="form-check-label text-muted" htmlFor="remember">
                                {t('remember_me') || 'Remember Me'}
                            </label>
                        </div>
                        <Link to="/forgot-password" style={{ color: 'var(--gold-color)', textDecoration: 'none' }}>
                            {t('forgot_password') || 'Forgot Password?'}
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 mb-3"
                        disabled={loading}
                        style={{
                            backgroundColor: 'var(--primary-dark)',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px',
                            fontWeight: '600'
                        }}
                    >
                        {loading ? (
                            <>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {t('logging_in') || 'Logging in...'}
                            </>
                        ) : (
                            <>{t('login_btn') || 'Login'}</>
                        )}
                    </button>

                    <div className="text-center">
                        <p className="text-muted">
                            {t('no_account') || "Don't have an account?"}{' '}
                            <Link to="/signup" style={{ color: 'var(--gold-color)', textDecoration: 'none', fontWeight: '600' }}>
                                {t('signup')}
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;