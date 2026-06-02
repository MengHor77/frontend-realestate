import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
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
                <h3 className="card-title text-center mb-4">ចូលប្រើប្រាស់</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">ឈ្មោះអ្នកប្រើប្រាស់ ឬ អ៊ីមែល</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="បញ្ចូលឈ្មោះ ឬអ៊ីមែល"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <div className="d-flex justify-content-between">
                            <label className="form-label">លេខសម្ងាត់</label>
                            <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: 'var(--primary-dark)' }}>
                                ភ្លេចលេខសម្ងាត់?
                            </Link>
                        </div>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="បញ្ចូលលេខសម្ងាត់"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
                        ចូលប្រើប្រាស់ឥឡូវនេះ
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <span>មិនទាន់មានគណនីមែនទេ? </span>
                    <Link to="/signup" style={{ color: 'var(--gold-color)', fontWeight: 'bold' }}>
                        ចុះឈ្មោះថ្មី
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;