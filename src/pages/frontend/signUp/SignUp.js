import React from 'react';
import { useTranslation } from 'react-i18next';
import SignUpForm from '../../../components/frontend/SignUpForm';

const SignUp = () => {
    const { t } = useTranslation();

    return (
        /* REMOVED marginTop: '60px' here */
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
                    {/* ផ្នែកខាងឆ្វេង: រូបភាព ឬ អត្ថបទស្វាគមន៍ */}
                    <div className="col-md-6 d-none d-lg-block text-center mb-4 mb-lg-0">
                        <h1 style={{ color: 'var(--primary-dark)', fontWeight: '800', fontSize: '3rem' }}>
                            {t('signup_hero_title_1')} <br />
                            <span style={{ color: 'var(--gold-color)' }}>{t('signup_hero_title_2')}</span>
                        </h1>
                        <p className="lead mt-3 text-secondary">
                            {t('signup_hero_desc_1')} <br />
                            {t('signup_hero_desc_2')}
                        </p>
                        <img
                            src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7885.jpg"
                            alt="Sign Up Real Estate"
                            className="img-fluid"
                            style={{ maxWidth: '80%', borderRadius: '20px' }}
                        />
                    </div>

                    {/* ផ្នែកខាងស្តាំ: Form ចុះឈ្មោះ */}
                    <div className="col-md-8 col-lg-5">
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;