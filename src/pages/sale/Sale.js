import React from 'react';
import { Link } from 'react-router-dom';

function Sale() {
    return (
        <div className="container pb-5">
            {/* ១. ផ្នែកចំណងជើង និងប្រអប់ស្វែងរក (Header & Filter) */}
            <div className="bg-white p-4 rounded-4 shadow-sm mb-5 mt-4 border-top" style={{ borderColor: 'var(--gold-color)', borderWidth: '4px' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>
                        🏠 អចលនទ្រព្យសម្រាប់លក់
                    </h2>
                    <span className="text-muted mt-2 mt-md-0">បង្ហាញលទ្ធផល: ១២ ទីតាំង</span>
                </div>
                
                {/* Filter Bar */}
                <div className="row g-2">
                    <div className="col-md-3">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">គ្រប់ទីតាំង</option>
                            <option value="ភ្នំពេញ">ភ្នំពេញ</option>
                            <option value="កណ្តាល">កណ្តាល</option>
                            <option value="សៀមរាប">សៀមរាប</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">ប្រភេទអចលនទ្រព្យ</option>
                            <option value="វីឡា">វីឡា</option>
                            <option value="ផ្ទះល្វែង">ផ្ទះល្វែង</option>
                            <option value="ដីឡូតិ៍">ដីឡូតិ៍</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">កម្រិតតម្លៃ</option>
                            <option value="ក្រោម ៥ម៉ឺនដុល្លារ">ក្រោម $50,000</option>
                            <option value="៥ម៉ឺន - ១០ម៉ឺនដុល្លារ">$50,000 - $100,000</option>
                            <option value="លើសពី ១០ម៉ឺនដុល្លារ">លើសពី $100,000</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100 py-2 fw-bold">ស្វែងរក</button>
                    </div>
                </div>
            </div>

            {/* ២. បញ្ជីអចលនទ្រព្យ (Property Grid) */}
            <div className="row g-4">
                
                {/* ផ្ទះទី ១ */}
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100">
                        <div className="position-relative">
                            <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80" 
                                 className="card-img-top" alt="Villa" style={{ height: '250px', objectFit: 'cover' }} />
                            <span className="position-absolute top-0 start-0 m-3 badge bg-gold text-dark fs-6 shadow-sm">ប្លង់រឹង</span>
                            <span className="position-absolute top-0 end-0 m-3 badge bg-danger fs-6 shadow-sm">លក់បន្ទាន់</span>
                        </div>
                        <div className="card-body p-4 d-flex flex-column">
                            <h4 className="card-title mb-2">$350,000</h4>
                            <h5 className="fw-bold text-dark mb-2">វីឡាឃីង បុរីប៉េងហួត (បឹងស្នោរ)</h5>
                            <p className="text-muted small mb-3">📍 ច្បារអំពៅ, រាជធានីភ្នំពេញ</p>
                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between text-muted small mb-4">
                                <span>🛏️ ៥ បន្ទប់គេង</span>
                                <span>🚿 ៦ បន្ទប់ទឹក</span>
                                <span>📐 ២០ x ៣០ ម៉ែត្រ</span>
                            </div>
                            {/* ប៊ូតុងរុញមកក្រោមគេ (mt-auto) */}
                            <Link to="/contact-us" className="btn btn-outline-primary w-100 fw-bold mt-auto rounded-3 py-2">
                                ទាក់ទងសួរព័ត៌មាន
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ផ្ទះទី ២ */}
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100">
                        <div className="position-relative">
                            <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" 
                                 className="card-img-top" alt="House" style={{ height: '250px', objectFit: 'cover' }} />
                            <span className="position-absolute top-0 start-0 m-3 badge bg-primary fs-6 shadow-sm">គម្រោងថ្មី</span>
                        </div>
                        <div className="card-body p-4 d-flex flex-column">
                            <h4 className="card-title mb-2">$120,000</h4>
                            <h5 className="fw-bold text-dark mb-2">ផ្ទះអាជីវកម្ម (Shop House)</h5>
                            <p className="text-muted small mb-3">📍 សែនសុខ, រាជធានីភ្នំពេញ</p>
                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between text-muted small mb-4">
                                <span>🛏️ ៤ បន្ទប់គេង</span>
                                <span>🚿 ៥ បន្ទប់ទឹក</span>
                                <span>📐 ៤.២ x ១៦ ម៉ែត្រ</span>
                            </div>
                            <Link to="/contact-us" className="btn btn-outline-primary w-100 fw-bold mt-auto rounded-3 py-2">
                                ទាក់ទងសួរព័ត៌មាន
                            </Link>
                        </div>
                    </div>
                </div>

                {/* ដីឡូតិ៍ទី ៣ */}
                <div className="col-md-6 col-lg-4">
                    <div className="card h-100">
                        <div className="position-relative">
                            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80" 
                                 className="card-img-top" alt="Land" style={{ height: '250px', objectFit: 'cover' }} />
                            <span className="position-absolute top-0 start-0 m-3 badge bg-gold text-dark fs-6 shadow-sm">ប្លង់រឹង</span>
                            <span className="position-absolute bottom-0 end-0 m-3 badge bg-success fs-6 shadow-sm">អាចចរចាបាន</span>
                        </div>
                        <div className="card-body p-4 d-flex flex-column">
                            <h4 className="card-title mb-2">$45,000</h4>
                            <h5 className="fw-bold text-dark mb-2">ដីឡូតិ៍ក្បែរព្រលានយន្តហោះថ្មី</h5>
                            <p className="text-muted small mb-3">📍 ក្រុងតាខ្មៅ, ខេត្តកណ្តាល</p>
                            <hr className="mt-0" />
                            <div className="d-flex justify-content-between text-muted small mb-4">
                                <span>🛣️ ជាប់ផ្លូវរដ្ឋ ១៥ម</span>
                                <span>📐 ១០ x ២០ ម៉ែត្រ</span>
                                <span>⚡ មានទឹកភ្លើងរដ្ឋ</span>
                            </div>
                            <Link to="/contact-us" className="btn btn-outline-primary w-100 fw-bold mt-auto rounded-3 py-2">
                                ទាក់ទងសួរព័ត៌មាន
                            </Link>
                        </div>
                    </div>
                </div>

            </div>

            {/* ៣. ប៊ូតុងរំកិលទំព័រ (Pagination) */}
            <nav className="mt-5 d-flex justify-content-center">
                <ul className="pagination">
                    <li className="page-item disabled">
                        <button className="page-link px-4 fw-bold text-muted">ថយក្រោយ</button>
                    </li>
                    <li className="page-item active">
                        <button className="page-link px-3 bg-primary border-primary">1</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link px-3 text-dark">2</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link px-3 text-dark">3</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link px-4 fw-bold" style={{ color: 'var(--primary-dark)' }}>បន្ទាប់</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sale;