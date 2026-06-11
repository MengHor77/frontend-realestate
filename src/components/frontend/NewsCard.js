import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NewsCard = ({ news }) => {
    const { t } = useTranslation();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateText = (text, maxLength = 120) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'market': 'bg-primary',
            'knowledge': 'bg-success',
            'legal': 'bg-warning',
            'general': 'bg-secondary'
        };
        return colors[category?.toLowerCase()] || 'bg-secondary';
    };

    const getCategoryText = (category) => {
        const categories = {
            'market': t('cat_market'),
            'knowledge': t('cat_knowledge'),
            'legal': t('cat_legal'),
            'general': t('general')
        };
        return categories[category?.toLowerCase()] || category || t('general');
    };

    return (
        <div className="col-md-6 col-lg-4">
            <Link to={`/news/${news.id}`} style={{ textDecoration: 'none' }}>
                <div className="card h-100 shadow-sm border-0" style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                }}>
                    <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                        <img
                            src={news.image_url || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80'}
                            className="card-img-top"
                            alt={news.title}
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                        {news.category && (
                            <span
                                className={`badge position-absolute top-0 end-0 m-3 ${getCategoryColor(news.category)}`}
                                style={{ fontSize: '12px', padding: '6px 12px' }}
                            >
                                {getCategoryText(news.category)}
                            </span>
                        )}
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <small className="text-muted">
                                <i className="far fa-calendar-alt me-1"></i> {formatDate(news.created_at)}
                            </small>
                            {news.views > 0 && (
                                <small className="text-muted">
                                    <i className="far fa-eye me-1"></i> {news.views}
                                </small>
                            )}
                        </div>
                        <h5 className="card-title fw-bold mb-3" style={{
                            color: '#003366',
                            lineHeight: '1.4',
                            minHeight: '50px'
                        }}>
                            {news.title}
                        </h5>
                        <p className="card-text text-muted" style={{ lineHeight: '1.6' }}>
                            {truncateText(news.content?.replace(/<[^>]*>/g, '') || '')}
                        </p>
                        <div className="mt-3">
                            <span className="text-primary" style={{ fontWeight: '500' }}>
                                {t('read_more')} →
                            </span>
                        </div>
                    </div>
                    {news.author_name && (
                        <div className="card-footer bg-transparent border-0 pb-3">
                            <small className="text-muted">
                                <i className="far fa-user me-1"></i> {news.author_name}
                            </small>
                        </div>
                    )}
                </div>
            </Link>
            <style jsx>{`
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
                }
            `}</style>
        </div>
    );
};

export default NewsCard;