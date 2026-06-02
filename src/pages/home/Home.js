import React from 'react';
import { Link } from 'react-router-dom';
import ServiceCard from '../../components/ServiceCard'; // Import component

function Home() {
    // រៀបចំទិន្នន័យសម្រាប់សេវាកម្ម
    const services = [
        { title: 'ផ្ទះសម្រាប់លក់', icon: '🏡', link: '/sale', color: '#e3f2fd' },
        { title: 'ផ្ទះសម្រាប់ជួល', icon: '🔑', link: '/rent', color: '#fff3e0' },
        { title: 'ដីឡូតិ៍វិនិយោគ', icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: 'construction', icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: 'decoration', icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: 'decoration', icon: '🏗️', link: '/sale', color: '#e8f5e9' },
    ];

    return (
        <div className="home-page">
            {/* ១. Hero Section - ផ្នែកខាងលើបង្អស់ */}
            <section className="hero-section text-white d-flex align-items-center py-5"
                style={{
                    background: 'linear-gradient(rgba(0, 51, 102, 0.5), rgba(0, 51, 102, 0.8)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    minHeight: '80vh'
                }}>
                <div className="container text-center">
                    <h1 className="display-3 fw-bold mb-3">ស្វែងរកផ្ទះក្នុងក្តីសុបិនរបស់អ្នក</h1>
                    <p className="lead mb-5 opacity-75">យើងផ្តល់ជូននូវសេវាកម្មទិញ លក់ និងជួលអចលនទ្រព្យដែលល្អបំផុតក្នុងប្រទេសកម្ពុជា</p>

                    {/* Search Bar */}
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="bg-white p-3 rounded-4 shadow-lg d-flex flex-column flex-md-row gap-2">
                                <input type="text" className="form-control border-0 py-3" placeholder="ស្វែងរកទីតាំង ឬប្រភេទផ្ទះ..." />
                                <select className="form-select border-0">
                                    <option>គ្រប់ប្រភេទ</option>
                                    <option>សម្រាប់លក់</option>
                                    <option>សម្រាប់ជួល</option>
                                </select>
                                <button className="btn btn-primary px-5 fw-bold rounded-3 py-3">ស្វែងរក</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ២. Categories Section - ប្រើប្រាស់ ServiceCard Component */}
            <section className="container py-5 mt-4">
                <div className="text-center mb-5">
                    <h2 className="fw-bold" style={{ color: 'var(--primary-dark)' }}>សេវាកម្មចម្បងរបស់យើង</h2>
                    <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--gold-color)', margin: '10px auto' }}></div>
                </div>

                <div className="row g-4 text-center">
                    {services.map((item, index) => (
                        <ServiceCard
                            key={index}
                            title={item.title}
                            icon={item.icon}
                            link={item.link}
                            color={item.color}
                        />
                    ))}
                </div>
            </section>

            {/* ៣. Featured Listings - អចលនទ្រព្យឆ្នើមៗ */}
            <section className="py-5" style={{ backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>គម្រោងថ្មីៗបំផុត</h2>
                            <p className="text-muted mb-0">ជ្រើសរើសដោយយកចិត្តទុកដាក់សម្រាប់អ្នក</p>
                        </div>
                        <Link to="/sale" className="btn btn-outline-primary fw-bold rounded-pill">មើលទាំងអស់</Link>
                    </div>

                    <div className="row g-4">
                        {/* Featured Cards (ឧទាហរណ៍ទី១) */}
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="position-relative">
                                    <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="House" style={{ height: '240px', objectFit: 'cover' }} />
                                    <span className="position-absolute top-0 end-0 m-3 badge bg-gold">Special Offer</span>
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title">$285,000</h5>
                                    <p className="fw-bold text-dark mb-2 text-truncate">វីឡាភ្លោះទំនើប តំបន់ជ្រោយចង្វារ</p>
                                    <p className="text-muted small">📍 ខណ្ឌជ្រោយចង្វារ, រាជធានីភ្នំពេញ</p>
                                    <hr />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>🛏️ 4 បន្ទប់គេង</span> <span>🚿 5 បន្ទប់ទឹក</span> <span>📐 120m²</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card ទី ២ */}
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="position-relative">
                                    <img src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="House" style={{ height: '240px', objectFit: 'cover' }} />
                                    <span className="position-absolute top-0 end-0 m-3 badge bg-primary">New Listing</span>
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title">$145,000</h5>
                                    <p className="fw-bold text-dark mb-2 text-truncate">ផ្ទះអាជីវកម្ម ជិតផ្សារទំនើប</p>
                                    <p className="text-muted small">📍 ខណ្ឌសែនសុខ, រាជធានីភ្នំពេញ</p>
                                    <hr />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>🛏️ 3 បន្ទប់គេង</span> <span>🚿 4 បន្ទប់ទឹក</span> <span>📐 90m²</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card ទី ៣ */}
                        <div className="col-md-4">
                            <div className="card h-100">
                                <div className="position-relative">
                                    <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80" className="card-img-top" alt="House" style={{ height: '240px', objectFit: 'cover' }} />
                                    <span className="position-absolute top-0 end-0 m-3 badge bg-danger">Hot Deal</span>
                                </div>
                                <div className="card-body p-4">
                                    <h5 className="card-title">$550 / ខែ</h5>
                                    <p className="fw-bold text-dark mb-2 text-truncate">ខុនដូទំនើប កណ្តាលក្រុង</p>
                                    <p className="text-muted small">📍 ខណ្ឌបឹងកេងកង, រាជធានីភ្នំពេញ</p>
                                    <hr />
                                    <div className="d-flex justify-content-between text-muted small">
                                        <span>🛏️ 2 បន្ទប់គេង</span> <span>🚿 2 បន្ទប់ទឹក</span> <span>📐 65m²</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ៤. Call to Action - ផ្នែកទំនាក់ទំនង */}
            <section className="container py-5 my-5">
                <div className="p-5 rounded-5 text-white text-center shadow-lg" style={{ backgroundColor: 'var(--primary-dark)', borderLeft: '10px solid var(--gold-color)' }}>
                    <h2 className="fw-bold mb-3">ចង់ដាក់លក់ ឬជួលអចលនទ្រព្យរបស់អ្នកមែនទេ?</h2>
                    <p className="mb-4 opacity-75">ភ្នាក់ងារជំនាញរបស់យើងនឹងជួយអ្នកឱ្យទទួលបានតម្លៃខ្ពស់ និងលឿនបំផុត។</p>
                    <Link to="/contact-us" className="btn btn-warning btn-lg px-5 fw-bold rounded-pill">ប្រឹក្សាយោបល់ឥឡូវនេះ</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;