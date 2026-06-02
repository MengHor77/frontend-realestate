import React from 'react';

function ContactUs() {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-6 bg-white p-5 shadow rounded">
                    <h2 className="text-center mb-4">📩 ទំនាក់ទំនងមកយើង</h2>
                    <form>
                        <div className="mb-3">
                            <label className="form-label">ឈ្មោះពេញ</label>
                            <input type="text" className="form-control" placeholder="បញ្ចូលឈ្មោះរបស់អ្នក" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">អ៊ីមែល/លេខទូរស័ព្ទ</label>
                            <input type="email" className="form-control" placeholder="example@gmail.com" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">សាររបស់អ្នក</label>
                            <textarea className="form-control" rows="4" placeholder="តើបងចង់សាកសួរពីផ្ទះមួយណា?"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">ផ្ញើសារឥឡូវនេះ</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;