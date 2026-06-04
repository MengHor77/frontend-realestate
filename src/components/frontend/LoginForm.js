import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; // កុំភ្លេចដំឡើង npm install axios

const LoginForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

   const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            // ប្រើ fetch ជំនួស axios
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials) // បំប្លែងទិន្នន័យទៅជា JSON
            });

            const data = await response.json(); // បកប្រែទិន្នន័យដែល Backend ផ្ញើមក

            if (data.success) {
                // រក្សាទុក Token និងព័ត៌មាន User
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));

                // រុញទៅកាន់ Admin Dashboard
                if (data.user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setError(data.message || 'ការចូលប្រើប្រាស់មិនត្រឹមត្រូវ!');
            }
        } catch (err) {
            setError('មានបញ្ហាក្នុងការភ្ជាប់ទៅកាន់ Server!');
            console.error(err);
        }
    };

    return (
        <div className="card shadow-lg p-4">
            <div className="card-body">
                <h3 className="card-title text-center mb-4">{t('login_title')}</h3>
                
                {error && <div className="alert alert-danger">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">{t('username_or_email_label')}</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder={t('username_or_email_placeholder')}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between">
                            <label className="form-label">{t('password_label')}</label>
                            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--primary-dark)' }}>
                                {t('forgot_password_link')}
                            </Link>
                        </div>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder={t('password_placeholder')}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                        {t('login_btn')}
                    </button>
                </form>
                {/* ... (signup link) */}
            </div>
        </div>
    );
};

export default LoginForm;