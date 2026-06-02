import React from 'react';
import { Link } from 'react-router-dom';

function Rent() {
    return (
        <div className="container mt-4 pb-4">

            {/* ១. ផ្នែកចំណងជើង និងប្រអប់ស្វែងរក (Filter សម្រាប់ជួល) */}
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-top" style={{ borderColor: 'var(--gold-color)', borderWidth: '4px' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>
                        🔑 អចលនទ្រព្យសម្រាប់ជួល
                    </h2>
                    <span className="text-muted mt-2 mt-md-0">មានទីតាំងទំនេរចំនួន ៤៥ កន្លែង</span>
                </div>

                {/* Filter Bar */}
                <div className="row g-2">
                    <div className="col-md-3">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">ទីតាំង (ខណ្ឌ)</option>
                            <option value="បឹងកេងកង">បឹងកេងកង</option>
                            <option value="ទួលគោក">ទួលគោក</option>
                            <option value="ចំការមន">ចំការមន</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">ប្រភេទបន្ទប់</option>
                            <option value="ខុនដូ">ខុនដូ (Condo)</option>
                            <option value="អាផាតមិន">អាផាតមិន (Apartment)</option>
                            <option value="ផ្ទះវីឡា">ផ្ទះវីឡា</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">តម្លៃជួលប្រចាំខែ</option>
                            <option value="<300">ក្រោម $300 / ខែ</option>
                            <option value="300-800">$300 - $800 / ខែ</option>
                            <option value=">800">លើសពី $800 / ខែ</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100 py-2 fw-bold">ស្វែងរក</button>
                    </div>
                </div>
            </div>

            {/* ២. បញ្ជីកាតផ្ទះជួល (រៀបចំឱ្យមាន Scrollbar ដូចដែលបងចង់បាន) */}
            <div
                className="row g-4 pe-2 pb-3 custom-scroll-area"

            >
                {/* Card ទី ១ */}
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                        <div className="position-relative">
                            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80"
                                className="card-img-top" alt="Apartment" style={{ height: '220px', objectFit: 'cover' }} />
                            <span className="position-absolute top-0 start-0 m-3 badge bg-gold text-dark fs-6 shadow-sm">Fully Furnished</span>
                            <span className="position-absolute bottom-0 end-0 m-3 badge bg-primary fs-6 shadow-sm">ទំនេរឥឡូវនេះ</span>
                        </div>
                        <div className="card-body p-4 d-flex flex-column">
                            <h4 className="card-title mb-2 text-danger fw-bold">$500 <span className="fs-6 text-muted fw-normal">/ ខែ</span></h4>
                            <h5 className="fw-bold text-dark mb-2">ខុនដូទំនើប (Studio Room)</h5>
                            <p className="text-muted small mb-3">📍 ក្បែរផ្សារទំនើបអ៊ីអន ២, សែនសុខ</p>
                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between text-muted small mb-4">
                                <span>🛏️ ១ បន្ទប់គេង</span>
                                <span>🚿 ១ បន្ទប់ទឹក</span>
                                <span>🏊 មានអាងហែលទឹក</span>
                            </div>
                            <Link to="/contact-us" className="btn btn-outline-primary w-100 fw-bold mt-auto rounded-3 py-2">
                                កក់ទុកមុន
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Card ទី ២ */}
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                        <div className="position-relative">
                            <img src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80"
                                className="card-img-top" alt="House" style={{ height: '220px', objectFit: 'cover' }} />
                            <span className="position-absolute top-0 start-0 m-3 badge bg-dark text-white fs-6 shadow-sm">Free WiFi & Gym</span>
                        </div>
                        <div className="card-body p-4 d-flex flex-column">
                            <h4 className="card-title mb-2 text-danger fw-bold">$850 <span className="fs-6 text-muted fw-normal">/ ខែ</span></h4>
                            <h5 className="fw-bold text-dark mb-2">អាផាតមិន ២ បន្ទប់គេង</h5>
                            <p className="text-muted small mb-3">📍 បឹងកេងកង ១, រាជធានីភ្នំពេញ</p>
                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between text-muted small mb-4">
                                <span>🛏️ ២ បន្ទប់គេង</span>
                                <span>🛋️ មានគ្រឿងសង្ហារិម</span>
                                <span>🚗 ចំណតឡាន ១</span>
                            </div>
                            <Link to="/contact-us" className="btn btn-outline-primary w-100 fw-bold mt-auto rounded-3 py-2">
                                កក់ទុកមុន
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Card ទី ៣ */}
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                        <div className="position-relative">
                            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
                                className="card-img-top" alt="Villa" style={{ height: '220px', objectFit: 'cover' }} />
                            <span className="position-absolute top-0 start-0 m-3 badge bg-gold text-dark fs-6 shadow-sm">វីឡាប្រណីត</span>
                        </div>
                        <div className="card-body p-4 d-flex flex-column">
                            <h4 className="card-title mb-2 text-danger fw-bold">$2,500 <span className="fs-6 text-muted fw-normal">/ ខែ</span></h4>
                            <h5 className="fw-bold text-dark mb-2">វីឡាឃីង បុរីប៉េងហួត</h5>
                            <p className="text-muted small mb-3">📍 ច្បារអំពៅ, រាជធានីភ្នំពេញ</p>
                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between text-muted small mb-4">
                                <span>🛏️ ៥ បន្ទប់គេង</span>
                                <span>🚿 ៦ បន្ទប់ទឹក</span>
                                <span>🌳 សួនច្បារធំទូលាយ</span>
                            </div>
                            <Link to="/contact-us" className="btn btn-outline-primary w-100 fw-bold mt-auto rounded-3 py-2">
                                កក់ទុកមុន
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Card ទី ៤ (បន្ថែមដើម្បីឱ្យវាលោត Scrollbar ចេញមក) */}
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm">
                        <div className="position-relative">
                            <img src="https://images.unsplash.com/photo-1502672260266-1c1e52408437?auto=format&fit=crop&w=800&q=80"
                                className="card-img-top" alt="Room" style={{ height: '220px', objectFit: 'cover' }} />
                            <span className="position-absolute top-0 start-0 m-3 badge bg-primary fs-6 shadow-sm">តម្លៃពិសេស</span>
                        </div>
                        <div className="card-body p-4 d-flex flex-column">
                            <h4 className="card-title mb-2 text-danger fw-bold">$250 <span className="fs-6 text-muted fw-normal">/ ខែ</span></h4>
                            <h5 className="fw-bold text-dark mb-2">បន្ទប់ជួលស្អាត ទើបសាងសង់</h5>
                            <p className="text-muted small mb-3">📍 ទួលទំពូង, រាជធានីភ្នំពេញ</p>
                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between text-muted small mb-4">
                                <span>🛏️ ១ បន្ទប់គេង</span>
                                <span>🚿 ១ បន្ទប់ទឹក</span>
                                <span>🛵 ចំណតម៉ូតូសុវត្ថិភាព</span>
                            </div>
                            <Link to="/contact-us" className="btn btn-outline-primary w-100 fw-bold mt-auto rounded-3 py-2">
                                កក់ទុកមុន
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Rent;