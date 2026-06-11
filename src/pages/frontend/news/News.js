import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../../../components/frontend/NewsCard';

function News() {
    const { t } = useTranslation();
    const [news, setNews] = useState([]);
    const [featuredNews, setFeaturedNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        total: 0,
        limit: 9
    });

    useEffect(() => {
        fetchNews();
    }, [pagination.currentPage]);

    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/news?page=${pagination.currentPage}&limit=${pagination.limit}`);

            if (response.data.success) {
                const newsData = response.data.news || [];
                setNews(newsData);
                setPagination({
                    ...pagination,
                    totalPages: response.data.totalPages || 1,
                    total: response.data.total || 0
                });

                // Set first news item as featured if available
                if (newsData.length > 0 && !featuredNews) {
                    setFeaturedNews(newsData[0]);
                }
            } else {
                setError('Failed to load news');
            }
        } catch (err) {
            console.error('Error fetching news:', err);
            setError('Failed to load news. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, currentPage: newPage }));
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const styles = {
        container: {
            paddingTop: '80px',
            paddingBottom: '60px'
        },
        heroSection: {
            textAlign: 'center',
            padding: '40px 0',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            marginBottom: '40px'
        },
        heroTitle: {
            fontSize: '42px',
            fontWeight: 'bold',
            color: '#003366',
            marginBottom: '16px'
        },
        heroDesc: {
            fontSize: '18px',
            color: '#666',
            maxWidth: '700px',
            margin: '0 auto'
        },
        goldLine: {
            width: '80px',
            height: '4px',
            backgroundColor: '#ffd700',
            margin: '20px auto'
        },
        featuredSection: {
            marginBottom: '50px'
        },
        featuredCard: {
            border: 'none',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease'
        },
        featuredImage: {
            objectFit: 'cover',
            minHeight: '300px',
            width: '100%'
        },
        featuredBadge: {
            backgroundColor: '#ffd700',
            color: '#003366',
            padding: '5px 15px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: 'bold',
            display: 'inline-block',
            marginBottom: '15px'
        },
        featuredTitle: {
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#003366',
            marginBottom: '15px'
        },
        featuredDesc: {
            color: '#666',
            lineHeight: '1.6',
            marginBottom: '20px'
        },
        readMoreBtn: {
            backgroundColor: '#003366',
            color: 'white',
            padding: '10px 25px',
            borderRadius: '30px',
            textDecoration: 'none',
            display: 'inline-block',
            transition: 'background 0.3s ease'
        },
        latestHeader: {
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#003366',
            marginBottom: '30px',
            borderLeft: '4px solid #ffd700',
            paddingLeft: '15px'
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px'
        },
        spinner: {
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #003366',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
        },
        errorContainer: {
            textAlign: 'center',
            padding: '60px 20px'
        },
        pagination: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            marginTop: '50px'
        },
        pageButton: {
            padding: '8px 16px',
            backgroundColor: '#003366',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s ease'
        },
        pageButtonDisabled: {
            padding: '8px 16px',
            backgroundColor: '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'not-allowed'
        },
        pageInfo: {
            fontSize: '14px',
            color: '#666'
        },
        newsletterSection: {
            marginTop: '60px',
            padding: '50px',
            borderRadius: '15px',
            backgroundColor: '#f8f9fa',
            border: '1px dashed #003366',
            textAlign: 'center'
        },
        newsletterTitle: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '15px',
            color: '#003366'
        },
        newsletterDesc: {
            color: '#666',
            marginBottom: '25px'
        },
        inputGroup: {
            maxWidth: '500px',
            margin: '0 auto'
        },
        subscribeBtn: {
            backgroundColor: '#003366',
            border: 'none',
            padding: '10px 25px'
        }
    };

    if (loading && news.length === 0) {
        return (
            <div style={styles.loadingContainer}>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <div style={styles.spinner}></div>
                <p style={{ marginTop: '20px', color: '#666' }}>{t('loading')}</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>{error}</p>
                <button onClick={fetchNews} style={styles.pageButton}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="container" style={styles.container}>
            {/* Hero Section */}
            <div style={styles.heroSection}>
                <h1 style={styles.heroTitle}>{t('news_hero_title') || 'News & Articles'}</h1>
                <p style={styles.heroDesc}>
                    {t('news_hero_desc') || 'Stay updated with the latest real estate news, market trends, and expert insights'}
                </p>
                <div style={styles.goldLine}></div>
            </div>

            {/* Featured News Section */}
            {featuredNews && (
                <div style={styles.featuredSection}>
                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm overflow-hidden" style={styles.featuredCard}>
                                <div className="row g-0">
                                    <div className="col-lg-7">
                                        <img
                                            src={featuredNews.image_url || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80'}
                                            className="img-fluid w-100"
                                            alt={featuredNews.title}
                                            style={styles.featuredImage}
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80';
                                            }}
                                        />
                                    </div>
                                    <div className="col-lg-5 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5">
                                            <span style={styles.featuredBadge}>
                                                {t('hot_news') || 'HOT NEWS'}
                                            </span>
                                            <h2 style={styles.featuredTitle}>{featuredNews.title}</h2>
                                            <p className="text-muted" style={styles.featuredDesc}>
                                                {featuredNews.content?.substring(0, 200)}...
                                            </p>
                                            <div className="d-flex align-items-center mt-4">
                                                <div className="flex-grow-1">
                                                    <small className="text-muted d-block">
                                                        {t('published_by', { author: featuredNews.author || t('analyst_team') })}
                                                    </small>
                                                    <small className="text-muted">
                                                        {formatDate(featuredNews.created_at)}
                                                    </small>
                                                </div>
                                                <Link to={`/news/${featuredNews.id}`} className="btn btn-primary rounded-pill px-4 text-decoration-none" style={styles.readMoreBtn}>
                                                    {t('read_continue') || 'Read More'}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Latest Articles Header */}
            <h3 style={styles.latestHeader}>
                {t('latest_articles') || 'Latest Articles'}
            </h3>

            {/* News Grid */}
            {news.length === 0 ? (
                <div style={styles.errorContainer}>
                    <p>{t('no_news_found') || 'No news articles found'}</p>
                </div>
            ) : (
                <div className="row g-4">
                    {news.map((item) => (
                        <NewsCard key={item.id} news={item} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            {pagination.totalPages > 1 && (
                <div style={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        style={pagination.currentPage === 1 ? styles.pageButtonDisabled : styles.pageButton}
                    >
                        {t('previous') || 'Previous'}
                    </button>
                    <span style={styles.pageInfo}>
                        {t('page') || 'Page'} {pagination.currentPage} {t('of') || 'of'} {pagination.totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        style={pagination.currentPage === pagination.totalPages ? styles.pageButtonDisabled : styles.pageButton}
                    >
                        {t('next') || 'Next'}
                    </button>
                </div>
            )}

            {/* Newsletter Subscription */}
            <div style={styles.newsletterSection}>
                <h4 style={styles.newsletterTitle}>{t('newsletter_title') || 'Subscribe to Our Newsletter'}</h4>
                <p style={styles.newsletterDesc}>
                    {t('newsletter_desc') || 'Get the latest real estate news and updates delivered to your inbox'}
                </p>
                <div className="d-flex justify-content-center">
                    <div className="input-group mb-3" style={styles.inputGroup}>
                        <input
                            type="email"
                            className="form-control py-2"
                            placeholder={t('email_placeholder') || 'Enter your email'}
                            aria-label="Email"
                        />
                        <button className="btn btn-primary px-4" type="button" style={styles.subscribeBtn}>
                            {t('subscribe_btn') || 'Subscribe'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;