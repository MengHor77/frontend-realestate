import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="text-white pt-5 pb-3 border-top" style={{ backgroundColor: 'var(--primary-dark)', borderTop: '4px solid var(--gold-color) !important' }}>
            <div className="container">
                <div className="row g-4">
                    {/* ផ្នែកទី ១: អំពីក្រុមហ៊ុន */}
                    <div className="col-lg-4 col-md-6">
                        <h4 className="fw-bold mb-4" style={{ color: 'var(--gold-color)' }}>Real Estate MH</h4>
                        <p className="opacity-75" style={{ fontSize: '14px', lineHeight: '1.8' }}>
                            យើងគឺជាភ្នាក់ងារអចលនទ្រព្យឈានមុខគេក្នុងប្រទេសកម្ពុជា ដែលផ្តល់ជូននូវសេវាកម្មទិញ លក់ និងជួល ប្រកបដោយទំនុកចិត្ត និងតម្លាភាពខ្ពស់បំផុតសម្រាប់អតិថិជន។
                        </p>
                        <div className="d-flex gap-3 mt-4">
                            <a href="#" className="text-white fs-5"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-white fs-5"><i className="bi bi-telegram"></i></a>
                            <a href="#" className="text-white fs-5"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>

                    {/* ផ្នែកទី ២: តំណភ្ជាប់រហ័ស */}
                    <div className="col-lg-2 col-md-6">
                        <h5 className="fw-bold mb-4">តំណភ្ជាប់រហ័ស</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2"><Link to="/" className="text-white text-decoration-none opacity-75">ទំព័រដើម</Link></li>
                            <li className="mb-2"><Link to="/sale" className="text-white text-decoration-none opacity-75">សម្រាប់លក់</Link></li>
                            <li className="mb-2"><Link to="/rent" className="text-white text-decoration-none opacity-75">សម្រាប់ជួល</Link></li>
                            <li className="mb-2"><Link to="/news" className="text-white text-decoration-none opacity-75">ព័ត៌មានថ្មីៗ</Link></li>
                        </ul>
                    </div>

                    {/* ផ្នែកទី ៣: សេវាកម្ម */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-4">សេវាកម្មរបស់យើង</h5>
                        <ul className="list-unstyled opacity-75" style={{ fontSize: '14px' }}>
                            <li className="mb-2">✓ វាយតម្លៃអចលនទ្រព្យ</li>
                            <li className="mb-2">✓ ប្រឹក្សាយោបល់ផ្នែកវិនិយោគ</li>
                            <li className="mb-2">✓ សេវាកម្មផ្ទេរសិទ្ធិកាន់កាប់</li>
                            <li className="mb-2">✓ គ្រប់គ្រងការជួលផ្ទះ/ខុនដូ</li>
                        </ul>
                    </div>

                    {/* ផ្នែកទី ៤: ទំនាក់ទំនង */}
                    <div className="col-lg-3 col-md-6">
                        <h5 className="fw-bold mb-4">ទំនាក់ទំនង</h5>
                        <p className="opacity-75 small mb-2">📍 បឹងកេងកង ១, រាជធានីភ្នំពេញ</p>
                        <p className="opacity-75 small mb-2">📞 096 316 77 44</p>
                        <p className="opacity-75 small mb-0">✉️ menghor2152152gmail.com</p>
                    </div>
                </div>

                <hr className="my-4 opacity-25" />

                {/* ផ្នែករក្សាសិទ្ធិ */}
                <div className="text-center opacity-75">
                    <small>© 2026 គ្រប់គ្រងដោយលោក Meng Hor រក្សាសិទ្ធិគ្រប់យ៉ាង</small>
                </div>
            </div>
        </footer>
    );
}

export default Footer;