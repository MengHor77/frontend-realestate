import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NewsCard = ({ news }) => {
    const { t } = useTranslation();

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const truncateText = (text, maxLength = 120) => {
        if (!text) return '';
        // Remove HTML tags
        const cleanText = text.replace(/<[^>]*>/g, '');
        if (cleanText.length <= maxLength) return cleanText;
        return cleanText.substring(0, maxLength) + '...';
    };

    const getCategoryColor = (category) => {
        const colors = {
            'market': '#0d6efd',
            'knowledge': '#198754',
            'legal': '#ffc107',
            'general': '#6c757d',
            'Market': '#0d6efd',
            'Knowledge': '#198754',
            'Legal': '#ffc107',
            'General': '#6c757d'
        };
        return colors[category] || '#6c757d';
    };

    const getCategoryText = (category) => {
        const categories = {
            'market': t('cat_market'),
            'knowledge': t('cat_knowledge'),
            'legal': t('cat_legal'),
            'general': t('general'),
            'Market': t('cat_market'),
            'Knowledge': t('cat_knowledge'),
            'Legal': t('cat_legal'),
            'General': t('general')
        };
        return categories[category] || category || t('general');
    };

    // Get image URL with fallback
    const getImageUrl = () => {
        if (news.image_url && news.image_url !== 'null' && news.image_url !== '') {
            // Check if it's a full URL or relative path
            if (news.image_url.startsWith('http')) {
                return news.image_url;
            }
            // If it's a relative path, prepend API URL
            if (news.image_url.startsWith('/uploads')) {
                const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
                const baseUrl = API_URL.replace('/api', '');
                return `${baseUrl}${news.image_url}`;
            }
            return news.image_url;
        }
        return 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80';
    };

    // Handle image error
    const handleImageError = (e) => {
        e.target.src = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80';
    };

    // Get author name
    const getAuthorName = () => {
        return news.author_name || news.author || 'Admin';
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
                            src={getImageUrl()}
                            className="card-img-top"
                            alt={news.title || 'News image'}
                            style={{
                                height: '100%',
                                width: '100%',
                                objectFit: 'cover',
                                transition: 'transform 0.5s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            onError={handleImageError}
                        />
                        {news.category && (
                            <span
                                className="badge position-absolute top-0 end-0 m-3"
                                style={{ 
                                    fontSize: '12px', 
                                    padding: '6px 12px',
                                    backgroundColor: getCategoryColor(news.category),
                                    color: news.category === 'legal' || news.category === 'Legal' ? '#000' : '#fff'
                                }}
                            >
                                {getCategoryText(news.category)}
                            </span>
                        )}
                    </div>
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <small className="text-muted">
                                <i className="far fa-calendar-alt me-1"></i> {formatDate(news.created_at || news.createdAt)}
                            </small>
                            {(news.views !== undefined && news.views > 0) && (
                                <small className="text-muted">
                                    <i className="far fa-eye me-1"></i> {news.views}
                                </small>
                            )}
                        </div>
                        <h5 className="card-title fw-bold mb-3" style={{
                            color: '#003366',
                            lineHeight: '1.4',
                            minHeight: '50px',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {news.title}
                        </h5>
                        <p className="card-text text-muted" style={{ 
                            lineHeight: '1.6',
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}>
                            {truncateText(news.content || news.description || '')}
                        </p>
                        <div className="mt-3">
                            <span className="text-primary" style={{ fontWeight: '500' }}>
                                {t('read_more') || 'Read More'} →
                            </span>
                        </div>
                    </div>
                    {(news.author_name || news.author) && (
                        <div className="card-footer bg-transparent border-0 pb-3">
                            <small className="text-muted">
                                <i className="far fa-user me-1"></i> {getAuthorName()}
                            </small>
                        </div>
                    )}
                </div>
            </Link>
            <style>{`
                .card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.15) !important;
                }
            `}</style>
        </div>
    );
};

export default NewsCard;