import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import TopicCard from '../../../components/frontend/TopicCard';

function News() {
    const { t } = useTranslation();

    const newsItems = [
        {
            id: 1,
            titleKey: "news_1_title",
            dateKey: "news_1_date",
            categoryKey: "cat_market",
            image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80",
            descKey: "news_1_desc"
        },
        {
            id: 2,
            titleKey: "news_2_title",
            dateKey: "news_2_date",
            categoryKey: "cat_knowledge",
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
            descKey: "news_2_desc"
        },
        {
            id: 3,
            titleKey: "news_3_title",
            dateKey: "news_3_date",
            categoryKey: "cat_legal",
            image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
            descKey: "news_3_desc"
        }
    ];

    return (
        <div className="container pb-5" style={{ paddingTop: '20px' }} >
            {/* ១. Hero Header សម្រាប់ទំព័រព័ត៌មាន */}
            <div className="py-5 text-center">
                <h1 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)' }}>
                    {t('news_hero_title')}
                </h1>
                <p className="text-muted mx-auto" style={{ maxWidth: '700px' }}>
                    {t('news_hero_desc')}
                </p>
                <div style={{ width: '80px', height: '4px', backgroundColor: 'var(--gold-color)', margin: '20px auto' }}></div>
            </div>

            {/* ២. Featured News (ព័ត៌មានលេចធ្លោ) */}
            <div className="row mb-5">
                <div className="col-12">
                    <div className="card border-0 shadow-sm overflow-hidden" style={{ borderRadius: '20px' }}>
                        <div className="row g-0">
                            <div className="col-lg-7">
                                <img
                                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
                                    className="img-fluid h-100 w-100"
                                    alt="Featured Market Trends"
                                    style={{ objectFit: 'cover', minHeight: '300px' }}
                                />
                            </div>
                            <div className="col-lg-5 d-flex align-items-center">
                                <div className="card-body p-4 p-lg-5">
                                    <span className="badge bg-gold text-dark mb-3">
                                        {t('hot_news')}
                                    </span>
                                    <h2 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)' }}>
                                        {t('featured_news_title')}
                                    </h2>
                                    <p className="text-muted">
                                        {t('featured_news_desc')}
                                    </p>
                                    <div className="d-flex align-items-center mt-4">
                                        <div className="flex-grow-1">
                                            <small className="text-muted d-block">
                                                {t('published_by', { author: t('analyst_team') })}
                                            </small>
                                            <small className="text-muted">
                                                {t('featured_news_date')}
                                            </small>
                                        </div>
                                        <Link to="/news/featured" className="btn btn-primary rounded-pill px-4 text-decoration-none">
                                            {t('read_continue')}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ៣. News Grid (បញ្ជីព័ត៌មានដទៃទៀត) */}
            <h3 className="fw-bold mb-4" style={{ color: 'var(--primary-dark)' }}>
                {t('latest_articles')}
            </h3>
            <div className="row g-4">
                {newsItems.map((item) => (
                    <TopicCard key={item.id} item={item} />
                ))}
            </div>

            {/* ៤. Newsletter Subscription (ផ្នែកចុះឈ្មោះតាមដានព័ត៌មាន) */}
            <div className="mt-5 p-5 rounded-4 text-center" style={{ backgroundColor: '#f8f9fa', border: '1px dashed var(--primary-dark)' }}>
                <h4 className="fw-bold mb-3">
                    {t('newsletter_title')}
                </h4>
                <p className="text-muted mb-4">
                    {t('newsletter_desc')}
                </p>
                <div className="d-flex justify-content-center">
                    <div className="input-group mb-3" style={{ maxWidth: '500px' }}>
                        <input
                            type="email"
                            className="form-control py-2"
                            placeholder={t('email_placeholder')}
                            aria-label="Email"
                        />
                        <button className="btn btn-primary px-4" type="button">
                            {t('subscribe_btn')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;