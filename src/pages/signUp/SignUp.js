import React from 'react';
import SignUpForm from '../../components/SignUpForm';

const SignUp = () => {
    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center py-5"
            style={{ backgroundColor: 'var(--light-bg)', marginTop: '60px' }}>
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    {/* ផ្នែកខាងឆ្វេង: រូបភាព ឬ អត្ថបទស្វាគមន៍ */}
                    <div className="col-md-6 d-none d-lg-block text-center mb-4 mb-lg-0">
                        <h1 style={{ color: 'var(--primary-dark)', fontWeight: '800', fontSize: '3rem' }}>
                            ស្វែងរកផ្ទះក្នុងក្តីសុបិន <br />
                            <span style={{ color: 'var(--gold-color)' }}>ជាមួយយើង!</span>
                        </h1>
                        <p className="lead mt-3 text-secondary">
                            ចុះឈ្មោះដើម្បីទទួលបានព័ត៌មានអចលនទ្រព្យថ្មីៗ <br />
                            និងការផ្ដល់ជូនពិសេសមុនគេ។
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