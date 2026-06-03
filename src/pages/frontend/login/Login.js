import React from 'react';
import { useTranslation } from 'react-i18next';
import LoginForm from '../../../components/frontend/LoginForm';

const Login = () => {
    const { t } = useTranslation();

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center"
            style={{
                backgroundColor: 'var(--light-bg)',
                minHeight: '100vh',         // Takes up the full view height
                marginTop: '-75px',          // Pulls the background up behind the navbar completely
                paddingTop: '95px',          // 75px layout clearance + 20px extra breathing room for content
                paddingBottom: '40px'
            }}>
            <div className="container">
                <div className="row justify-content-center align-items-center">

                    {/* ផ្នែកខាងឆ្វេង: រូបភាពបង្ហាញពីអចលនទ្រព្យ */}
                    <div className="col-md-6 d-none d-lg-block text-center mb-4 mb-lg-0">
                        <h2 style={{ color: 'var(--primary-dark)', fontWeight: '800' }}>
                            {t('login_welcome_title')} <br />
                            <span style={{ color: 'var(--gold-color)' }}>{t('login_platform_name')}</span>
                        </h2>
                        <p className="mt-3 text-muted">
                            {t('login_welcome_desc_1')} <br />
                            {t('login_welcome_desc_2')}
                        </p>
                        <img
                            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept_335657-3180.jpg"
                            alt="Real Estate Login"
                            className="img-fluid"
                            style={{ maxWidth: '70%', borderRadius: '20px' }}
                        />
                    </div>

                    {/* ផ្នែកខាងស្តាំ: Form ចូលប្រើប្រាស់ */}
                    <div className="col-md-8 col-lg-4">
                        <LoginForm />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Login;