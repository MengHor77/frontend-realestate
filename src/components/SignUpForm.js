import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUpForm = () => {
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
                <h3 className="card-title text-center mb-4">បង្កើតគណនីថ្មី</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">ឈ្មោះអ្នកប្រើប្រាស់</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="បញ្ចូលឈ្មោះរបស់អ្នក"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">អ៊ីមែល</label>
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
                        <label className="form-label">លេខសម្ងាត់</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="បញ្ចូលលេខសម្ងាត់"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label">បញ្ជាក់លេខសម្ងាត់</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            placeholder="វាយលេខសម្ងាត់ម្ដងទៀត"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                        ចុះឈ្មោះឥឡូវនេះ
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span>មានគណនីរួចហើយមែនទេ? </span>
                    <Link to="/login" style={{ color: 'var(--primary-dark)', fontWeight: 'bold' }}>
                        ចូលប្រើប្រាស់
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;