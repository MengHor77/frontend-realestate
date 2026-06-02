import React from 'react';

function ContactUs() {
    return (
        <div className="container py-5">
            {/* ១. ចំណងជើងទំព័រ */}
            <div className="text-center mb-5">
                <h1 className="fw-bold" style={{ color: 'var(--primary-dark)' }}>ទំនាក់ទំនងយើងខ្ញុំ</h1>
                <p className="text-muted">យើងខ្ញុំត្រៀមខ្លួនជានិច្ចដើម្បីឆ្លើយតបរាល់ចម្ងល់ និងការចង់បានរបស់បង</p>
                <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--gold-color)', margin: '15px auto' }}></div>
            </div>

            <div className="row g-5">
                {/* ២. ផ្នែកព័ត៌មានទំនាក់ទំនង (ឆ្វេង) */}
                <div className="col-lg-5">
                    <div className="card border-0 shadow-sm p-4 h-100" style={{ backgroundColor: 'var(--primary-dark)', color: 'white', borderRadius: '20px' }}>
                        <h3 className="fw-bold mb-4" style={{ color: 'var(--gold-color)' }}>ព័ត៌មានលម្អិត</h3>

                        <div className="d-flex align-items-center mb-4">
                            <div className="fs-3 me-3">📍</div>
                            <div>
                                <h6 className="fw-bold mb-1">អាសយដ្ឋាន</h6>
                                <p className="mb-0 opacity-75 small">ផ្លូវលេខ ១០១, សង្កាត់បឹងកេងកង ១, រាជធានីភ្នំពេញ</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <div className="fs-3 me-3">📞</div>
                            <div>
                                <h6 className="fw-bold mb-1">លេខទូរស័ព្ទ</h6>
                                <p className="mb-0 opacity-75 small">+855 12 345 678 / +855 98 765 432</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <div className="fs-3 me-3">✉️</div>
                            <div>
                                <h6 className="fw-bold mb-1">អ៊ីមែល</h6>
                                <p className="mb-0 opacity-75 small">info@realestate-cambodia.com</p>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <h6 className="fw-bold mb-3" style={{ color: 'var(--gold-color)' }}>តាមដានយើងខ្ញុំលើបណ្តាញសង្គម</h6>
                            <div className="d-flex gap-3">
                                <div className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>f</div>
                                <div className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>t</div>
                                <div className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>in</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ៣. ផ្នែក Form ផ្ញើសារ (ស្តាំ) */}
                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm p-4 p-md-5" style={{ borderRadius: '20px' }}>
                        <h3 className="fw-bold mb-4" style={{ color: 'var(--primary-dark)' }}>ផ្ញើសារមកកាន់យើង</h3>
                        <form>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold">ឈ្មោះពេញ</label>
                                    <input type="text" className="form-control border-0 bg-light py-2" placeholder="បញ្ចូលឈ្មោះបង..." />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold">លេខទូរស័ព្ទ</label>
                                    <input type="text" className="form-control border-0 bg-light py-2" placeholder="012 345 678" />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted small fw-bold">ប្រធានបទ</label>
                                    <input type="text" className="form-control border-0 bg-light py-2" placeholder="ចង់សួរអំពីផ្ទះលក់ ឬជួល..." />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted small fw-bold">សាររបស់អ្នក</label>
                                    <textarea className="form-control border-0 bg-light py-2" rows="5" placeholder="សរសេរសារនៅទីនេះ..."></textarea>
                                </div>
                                <div className="col-12 mt-4">
                                    <button type="submit" className="btn btn-primary w-100 py-3 fw-bold rounded-pill shadow-sm">
                                        ផ្ញើសារឥឡូវនេះ 🚀
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ៤. ផ្នែកផែនទី (Google Map Embed) */}
            <div className="mt-5">
                <div className="rounded-4 overflow-hidden shadow-sm" style={{ height: '400px' }}>
                    <iframe
                        title="Real Estate Location"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7706606014493!2d104.92131931533221!3d11.568297791787132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513361225571%3A0xc3f87c9f80720612!2sIndependence%20Monument!5e0!3m2!1sen!2skh!4v1654161600000!5m2!1sen!2skh"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default ContactUs;