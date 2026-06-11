import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const SignUpForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [fieldErrors, setFieldErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        if (fieldErrors[name]) {
            setFieldErrors({ ...fieldErrors, [name]: '' });
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.username.trim()) {
            errors.username = t('username_required') || 'Username is required';
        }
        if (!formData.email.trim()) {
            errors.email = t('email_required') || 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = t('email_invalid') || 'Email is invalid';
        }
        if (!formData.password) {
            errors.password = t('password_required') || 'Password is required';
        } else if (formData.password.length < 6) {
            errors.password = t('password_min_length') || 'Password must be at least 6 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = t('password_mismatch') || 'Passwords do not match';
        }
        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) return;
        
        setLoading(true);
        
        try {
            const response = await api.post('/auth/register', {
                name: formData.username,
                email: formData.email,
                password: formData.password,
                phone: formData.phone || ''
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
            }
        } catch (err) {
            console.error('Signup error:', err);
            if (err.response?.status === 409) {
                setError(t('email_exists') || 'Email already registered. Please login instead.');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError(t('signup_failed') || 'Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        fontSize: '14px',
        transition: 'all 0.3s ease'
    };

    const inputErrorStyle = {
        borderColor: '#dc3545'
    };

    const errorTextStyle = {
        color: '#dc3545',
        fontSize: '12px',
        marginTop: '5px',
        display: 'block'
    };

    return (
        <div className="card shadow-lg p-4" style={{ borderRadius: '16px', border: 'none' }}>
            <div className="card-body">
                <h3 className="card-title text-center mb-4" style={{ color: '#003366', fontWeight: '700' }}>
                    {t('signup_card_title')}
                </h3>
                
                {error && (
                    <div className="alert alert-danger" role="alert" style={{ borderRadius: '10px', fontSize: '14px' }}>
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>
                            {t('username_label')}
                        </label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder={t('username_placeholder')}
                            onChange={handleChange}
                            style={{ ...inputStyle, ...(fieldErrors.username ? inputErrorStyle : {}) }}
                            required
                        />
                        {fieldErrors.username && <span style={errorTextStyle}>{fieldErrors.username}</span>}
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>
                            {t('email_label')}
                        </label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="example@gmail.com"
                            onChange={handleChange}
                            style={{ ...inputStyle, ...(fieldErrors.email ? inputErrorStyle : {}) }}
                            required
                        />
                        {fieldErrors.email && <span style={errorTextStyle}>{fieldErrors.email}</span>}
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>
                            {t('phone_label') || 'Phone Number'}
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            className="form-control"
                            placeholder={t('phone_placeholder') || 'Enter your phone number'}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>
                            {t('password_label')}
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder={t('password_placeholder')}
                            onChange={handleChange}
                            style={{ ...inputStyle, ...(fieldErrors.password ? inputErrorStyle : {}) }}
                            required
                        />
                        {fieldErrors.password && <span style={errorTextStyle}>{fieldErrors.password}</span>}
                    </div>
                    
                    <div className="mb-4">
                        <label className="form-label" style={{ fontWeight: '600', color: '#333' }}>
                            {t('confirm_password_label')}
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder={t('confirm_password_placeholder')}
                            onChange={handleChange}
                            style={{ ...inputStyle, ...(fieldErrors.confirmPassword ? inputErrorStyle : {}) }}
                            required
                        />
                        {fieldErrors.confirmPassword && <span style={errorTextStyle}>{fieldErrors.confirmPassword}</span>}
                    </div>
                    
                    <button 
                        type="submit" 
                        className="btn w-100 py-2 fw-bold"
                        disabled={loading}
                        style={{
                            backgroundColor: '#003366',
                            color: '#ffd700',
                            borderRadius: '8px',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.backgroundColor = '#0d6efd')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.backgroundColor = '#003366')}
                    >
                        {loading ? (
                            <span>
                                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                {t('signup_loading') || 'Creating Account...'}
                            </span>
                        ) : (
                            t('signup_btn')
                        )}
                    </button>
                </form>
                
                <div className="mt-4 text-center">
                    <span>{t('already_have_account')} </span>
                    <Link to="/login" style={{ color: '#003366', fontWeight: 'bold', textDecoration: 'none' }}
                        onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.target.style.textDecoration = 'none'}>
                        {t('login_link')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;