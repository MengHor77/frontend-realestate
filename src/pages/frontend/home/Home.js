import React, { useState, useEffect, useRef } from 'react'; // បន្ថែម useRef
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ServiceCard from '../../../components/frontend/ServiceCard';
import HeroSection from '../../../components/frontend/HeroSection';

function Home() {
    const { t } = useTranslation();
    const [allProperties, setAllProperties] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // បង្កើត ref ដើម្បីសម្គាល់ផ្នែក Latest Projects
    const projectsSectionRef = useRef(null);

    const services = [
        { title: t('house sale'), icon: '🏡', link: '/sale', color: '#e3f2fd' },
        { title: t('house rent'), icon: '🔑', link: '/rent', color: '#fff3e0' },
        { title: t('land rent'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: t('construction'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: t('decoration'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
        { title: t('create web and app'), icon: '🏗️', link: '/sale', color: '#e8f5e9' },
    ];

    useEffect(() => {
        axios.get('http://localhost:5000/api/properties')
            .then(res => {
                setAllProperties(res.data.properties);
                setProperties(res.data.properties.slice(0, 6));
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching properties:", err);
                setLoading(false);
            });
    }, []);

    const handleSearch = (searchTerm, type) => {
        let filtered = allProperties;

        if (searchTerm) {
            filtered = filtered.filter(p => 
                p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                p.location.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        if (type && type !== t('all_types') && type !== "") {
            filtered = filtered.filter(p => p.type.toLowerCase() === type.toLowerCase());
        }

        setProperties(filtered.slice(0, 6));

        // បញ្ជាឱ្យ Scroll ទៅកាន់ផ្នែកដែលបានកំណត់
        if (projectsSectionRef.current) {
            projectsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="home-page">
            <HeroSection onSearch={handleSearch} />

            {/* ... Categories Section ... */}

            {/* បញ្ចូល ref នៅទីនេះ */}
            <section ref={projectsSectionRef} className="py-5" style={{ backgroundColor: 'var(--white)' }}>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-end mb-4">
                        <div>
                            <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>{t('featured_projects')}</h2>
                            <p className="text-muted mb-0">{t('curated_for_you')}</p>
                        </div>
                        <Link to="/sale" className="btn btn-outline-primary fw-bold rounded-pill">{t('view_all')}</Link>
                    </div>

                    {loading ? <p className="text-center">កំពុងផ្ទុក...</p> : (
                        <div className="row g-4">
                            {properties.length > 0 ? properties.map((item) => (
                                <div className="col-md-4" key={item.id}>
                                    <div className="card h-100">
                                        <div className="position-relative">
                                            <img src={`http://localhost:5000${item.image_url}`} className="card-img-top" alt={item.title} style={{ height: '240px', objectFit: 'cover' }} />
                                            <span className="position-absolute top-0 end-0 m-3 badge bg-gold">{item.type}</span>
                                        </div>
                                        <div className="card-body p-4">
                                            <h5 className="card-title">${item.price}</h5>
                                            <p className="fw-bold text-dark mb-2 text-truncate">{item.title}</p>
                                            <p className="text-muted small">📍 {item.location}</p>
                                        </div>
                                    </div>
                                </div>
                            )) : <p className="text-center">មិនមានទិន្នន័យសម្រាប់លទ្ធផលស្វែងរកនេះទេ</p>}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Home;