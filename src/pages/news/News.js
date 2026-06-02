import React from 'react';
import { Link } from 'react-router-dom';

function News() {
    const newsItems = [
        {
            id: 1,
            title: "បច្ចុប្បន្នភាពតម្លៃដីធ្លីនៅតំបន់ជាយក្រុងភ្នំពេញ សម្រាប់ឆមាសទី១ ឆ្នាំ២០២៦",
            date: "០២ មិថុនា ២០២៦",
            category: "ទីផ្សារ",
            image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
            desc: "តម្លៃដីធ្លីនៅតាមបណ្តោយផ្លូវក្រវាត់ក្រុងទី៣ កំពុងមានសន្ទុះខ្លាំង..."
        },
        {
            id: 2,
            title: "គន្លឹះសំខាន់ៗ ៥ យ៉ាងមុននឹងសម្រេចចិត្តទិញខុនដូដំបូងរបស់អ្នក",
            date: "០១ មិថុនា ២០២៦",
            category: "ចំណេះដឹង",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
            desc: "ការទិញខុនដូមិនមែនត្រឹមតែមើលលើតម្លៃនោះទេ ប៉ុន្តែត្រូវមើលលើ..."
        },
        {
            id: 3,
            title: "ច្បាប់ភូមិបាលថ្មី៖ អ្វីខ្លះដែលម្ចាស់អចលនទ្រព្យត្រូវដឹង?",
            date: "៣០ ឧសភា ២០២៦",
            category: "ច្បាប់",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
            desc: "ការកែសម្រួលនីតិវិធីនៃការផ្ទេរសិទ្ធិកាន់កាប់អចលនទ្រព្យថ្មី..."
        }
    ];

    return (
        <div className="container pb-5">
            {/* ១. Hero Header សម្រាប់ទំព័រព័ត៌មាន */}
            <div className="py-5 text-center">
                <h1 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)' }}>ព័ត៌មាន និងចំណេះដឹងអចលនទ្រព្យ</h1>
                <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
                    តាមដានរាល់ព័ត៌មានថ្មីៗ ការវិភាគទីផ្សារ និងគន្លឹះល្អៗទាក់ទងនឹងការវិនិយោគអចលនទ្រព្យក្នុងប្រទេសកម្ពុជា។
                </p>
                <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--gold-color)', margin: '20px auto' }}></div>
            </div>

            {/* ២. Featured News (ព័ត៌មានលេចធ្លោ) */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '20px' }}>
                        <div className="row g-0">
                            <div className="col-lg-7">
                                <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                                    className="img-fluid h-100 w-100" alt="Market Trends" style={{ objectFit: 'cover', minHeight: '300px' }} />
                            </div>
                            <div className="col-lg-5 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5">
                                    <span className="badge bg-gold text-dark mb-3">ព័ត៌មានក្តៅៗ</span>
                                    <h2 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)' }}>ស្ថានភាពសេដ្ឋកិច្ច និងឥទ្ធិពលលើវិស័យសំណង់ឆ្នាំ ២០២៦</h2>
                                    <p className="text-muted">អ្នកជំនាញសេដ្ឋកិច្ចបានព្យាករណ៍ថា វិស័យអចលនទ្រព្យនឹងមានការកើនឡើងក្នុងកម្រិត ៥.៤% បន្ទាប់ពីការបើកដំណើរការព្រលានយន្តហោះថ្មី...</p>
                                    <div className="d-flex align-items-center mt-4">
                                        <div className="flex-grow-1">
                                            <small className="text-muted d-block">ចេញផ្សាយដោយ៖ ក្រុមការងារផ្នែកវិភាគ</small>
                                            <small className="text-muted">ថ្ងៃទី ០២ មិថុនា ២០២៦</small>
                                        </div>
                                        <button className="btn btn-primary rounded-pill px-4">អានបន្ត</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ៣. News Grid (បញ្ជីព័ត៌មានដទៃទៀត) */}
            <h3 className="fw-bold mb-4" style={{ color: 'var(--primary-dark)' }}>អត្ថបទថ្មីៗ</h3>
            <div className="row g-4">
                {newsItems.map((item) => (
                    <div className="col-md-4" key={item.id}>
                        <div className="card h-100 shadow-sm border-0">
                            <div className="position-relative">
                                <img src={item.image} className="card-img-top" alt="News" style={{ height: '200px', objectFit: 'cover' }} />
                                <span className="position-absolute top-0 start-0 m-3 badge bg-primary">{item.category}</span>
                            </div>
                            <div className="card-body p-4">
                                <small className="text-muted mb-2 d-block">📅 {item.date}</small>
                                <h5 className="fw-bold mb-3" style={{ lineHeight: '1.5', color: 'var(--primary-dark)' }}>{item.title}</h5>
                                <p className="text-muted small mb-4">{item.desc}</p>
                                <Link to={`/news/${item.id}`} className="text-decoration-none fw-bold" style={{ color: 'var(--gold-hover)' }}>
                                    អានលម្អិត →
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ៤. Newsletter Subscription (ផ្នែកចុះឈ្មោះតាមដានព័ត៌មាន) */}
            <div className="mt-5 p-5 rounded-4 text-center" style={{ backgroundColor: '#f8f9fa', border: '1px dashed var(--primary-dark)' }}>
                <h4 className="fw-bold mb-3">ចុះឈ្មោះដើម្បីទទួលបានព័ត៌មានថ្មីៗ</h4>
                <p className="text-muted mb-4">យើងនឹងផ្ញើព័ត៌មានទីផ្សារ និងឱកាសវិនិយោគល្អៗជូនបងតាមរយៈ Email រៀងរាល់សប្តាហ៍។</p>
                <div className="d-flex justify-content-center">
                    <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
                        <input type="email" className="form-control py-2" placeholder="អ៊ីមែលរបស់អ្នក..." aria-label="Email" />
                        <button className="btn btn-primary px-4" type="button">ចុះឈ្មោះ</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;