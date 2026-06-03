import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
    const { t } = useTranslation();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ទិន្នន័យចូលប្រើប្រាស់:", credentials);
        // បន្ថែម Logic បញ្ជូនទៅកាន់ API Backend នៅទីនេះ
    };

    return (
        <div className="card shadow-lg p-4">
            <div className="card-body">
                <h3 className="card-title text-center mb-4">{t('login_title')}</h3>
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

                <div className="mt-4 text-center">
                    <span>{t('no_account_text')} </span>
                    <Link to="/signup" style={{ color: 'var(--gold-color)', fontWeight: 'bold' }}>
                        {t('signup_link')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;