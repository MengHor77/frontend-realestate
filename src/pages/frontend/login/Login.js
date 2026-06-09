import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../../components/frontend/LoginForm';
import api from '../../../services/api';

const Login = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (email, password) => {
        setLoading(true);
        setError('');
        
        try {
            const response = await api.post('/auth/login', { email, password });
            
            if (response.data.token) {
                // Save token and user data
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                console.log('Login successful! Token saved.');
                
                // Redirect based on user role
                if (response.data.user.role === 'admin') {
                    navigate('/admin/properties');
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error('Login error:', err);
            
            if (err.response?.status === 401) {
                setError(t('login_invalid_credentials') || 'Email or password is incorrect!');
            } else if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError(t('login_error') || 'Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center"
            style={{
                backgroundColor: 'var(--light-bg)',
                minHeight: '100vh',
                marginTop: '-75px',
                paddingTop: '95px',
                paddingBottom: '40px'
            }}>
            <div className="container" style={{ paddingTop: '50px' }}>
                <div className="row justify-content-center align-items-center">

                    {/* Left Side: Professional Branding & Imagery */}
                    <div className="col-md-6 d-none d-lg-block text-center mb-4 mb-lg-0">
                        <h1 style={{ color: 'var(--primary-dark)', fontWeight: '800', fontSize: '3rem' }}>
                            {t('login_welcome_title')} <br />
                            <span style={{ color: 'var(--gold-color)' }}>{t('login_platform_name')}</span>
                        </h1>
                        <p className="lead mt-3 text-secondary">
                            {t('login_welcome_desc_1')} <br />
                            {t('login_welcome_desc_2')}
                        </p>
                        <img
                            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg"
                            alt="Real Estate Login"
                            className="img-fluid"
                            style={{ maxWidth: '80%', borderRadius: '20px', marginTop: '20px' }}
                        />
                    </div>

                    {/* Right Side: Premium Form Container */}
                    <div className="col-md-8 col-lg-5">
                        <LoginForm 
                            onSubmit={handleLogin}
                            loading={loading}
                            error={error}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;