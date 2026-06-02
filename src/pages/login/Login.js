import React from 'react';
import LoginForm from '../../components/LoginForm';

const Login = () => {
    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
            style={{ backgroundColor: 'var(--light-bg)', marginTop: '60px' }}>
            <div className="container">
                <div className="row justify-content-center align-items-center">

                    {/* ផ្នែកខាងឆ្វេង: រូបភាពបង្ហាញពីអចលនទ្រព្យ */}
                    <div className="col-md-6 d-none d-lg-block text-center mb-4 mb-lg-0">
                        <h2 style={{ color: 'var(--primary-dark)', fontWeight: '800' }}>
                            ស្វាគមន៍មកកាន់ <br />
                            <span style={{ color: 'var(--gold-color)' }}>វេទិកាអចលនទ្រព្យលេខ១</span>
                        </h2>
                        <p className="mt-3 text-muted">
                            គ្រប់គ្រងការទិញ លក់ និងជួលផ្ទះរបស់អ្នក <br />
                            ដោយភាពងាយស្រួល និងសុវត្ថិភាពបំផុត។
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