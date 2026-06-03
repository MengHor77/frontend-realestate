import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SignUpForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("ទិន្នន័យចុះឈ្មោះ:", formData);
        // បន្ថែម Logic បញ្ជូនទៅកាន់ Backend នៅទីនេះ
    };

    return (
        <div className="card shadow-lg p-4">
            <div className="card-body">
                <h3 className="card-title text-center mb-4">{t('signup_card_title')}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">{t('username_label')}</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder={t('username_placeholder')}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">{t('email_label')}</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="example@gmail.com"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">{t('password_label')}</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder={t('password_placeholder')}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">{t('confirm_password_label')}</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder={t('confirm_password_placeholder')}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                        {t('signup_btn')}
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span>{t('already_have_account')} </span>
                    <Link to="/login" style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>
                        {t('login_link')}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;