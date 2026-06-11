// D:\realestate\frontend\src\pages\frontend\news\NewsDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const NewsDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [news, setNews] = useState(null);
    const [relatedNews, setRelatedNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchNewsDetail();
        }
        window.scrollTo(0, 0);
    }, [id]);

    const fetchNewsDetail = async () => {
        try {
            setLoading(true);
            setError(null);
            
            console.log('Fetching news with ID:', id);
            const response = await axios.get(`http://localhost:5000/api/news/${id}`);
            console.log('API Response:', response.data);
            
            if (response.data.success && response.data.news) {
                setNews(response.data.news);
                
                // Fetch related news
                try {
                    const relatedResponse = await axios.get(`http://localhost:5000/api/news/${id}/related`);
                    if (relatedResponse.data.success) {
                        setRelatedNews(relatedResponse.data.news);
                    }
                } catch (err) {
                    console.log('No related news found');
                }
            } else {
                setError('News not found');
            }
        } catch (err) {
            console.error('Error fetching news detail:', err);
            console.error('Error response:', err.response?.data);
            setError(err.response?.data?.message || 'Failed to load news. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown date';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const getCategoryColor = (category) => {
        const colors = {
            'market': '#0d6efd',
            'knowledge': '#28a745',
            'legal': '#ffc107',
            'general': '#6c757d'
        };
        return colors[category?.toLowerCase()] || '#6c757d';
    };

    const getCategoryText = (category) => {
        const categories = {
            'market': 'Market News',
            'knowledge': 'Knowledge',
            'legal': 'Legal',
            'general': 'General'
        };
        return categories[category?.toLowerCase()] || category || 'General';
    };

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '50px 20px 60px'
        },
        backNavigation: {
            marginBottom: '30px'
        },
        backLink: {
            color: '#003366',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer'
        },
        heroImage: {
            width: '100%',
            height: '500px',
            objectFit: 'cover',
            borderRadius: '15px',
            marginBottom: '30px'
        },
        metaInfo: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '20px',
            paddingBottom: '20px',
            borderBottom: '1px solid #eee'
        },
        metaItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#666',
            fontSize: '14px'
        },
        category: {
            display: 'inline-block',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '500',
            color: '#fff'
        },
        title: {
            fontSize: '42px',
            fontWeight: '700',
            color: '#003366',
            marginBottom: '20px',
            lineHeight: '1.2'
        },
        content: {
            fontSize: '18px',
            lineHeight: '1.8',
            color: '#333',
            marginTop: '30px'
        },
        contentText: {
            marginBottom: '20px'
        },
        relatedSection: {
            marginTop: '60px',
            paddingTop: '40px',
            borderTop: '2px solid #eee'
        },
        relatedTitle: {
            fontSize: '28px',
            fontWeight: '700',
            color: '#003366',
            marginBottom: '30px'
        },
        relatedGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px'
        },
        relatedCard: {
            background: 'white',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            textDecoration: 'none',
            display: 'block'
        },
        relatedImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover'
        },
        relatedContent: {
            padding: '20px'
        },
        relatedCardTitle: {
            fontSize: '18px',
            fontWeight: '600',
            color: '#003366',
            marginBottom: '10px'
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            paddingTop: '100px'
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
            padding: '100px 20px',
            minHeight: '400px'
        },
        errorButton: {
            marginTop: '20px',
            padding: '10px 20px',
            background: '#003366',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
        },
        noImages: {
            height: '500px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0',
            color: '#999',
            borderRadius: '15px',
            marginBottom: '30px'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <div style={styles.spinner}></div>
                <p style={{ marginTop: '20px', color: '#666' }}>Loading news...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={styles.errorContainer}>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>{error}</p>
                <Link to="/news" style={styles.errorButton}>
                    Back to News
                </Link>
            </div>
        );
    }

    if (!news) {
        return (
            <div style={styles.errorContainer}>
                <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>News not found</p>
                <Link to="/news" style={styles.errorButton}>
                    Back to News
                </Link>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .related-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.15);
                }
                .content p {
                    margin-bottom: 1.5em;
                }
                .content img {
                    max-width: 100%;
                    border-radius: 10px;
                    margin: 20px 0;
                }
            `}</style>

            <div style={styles.backNavigation}>
                <Link to="/news" style={styles.backLink}>
                    ← Back to News
                </Link>
            </div>

            {news.image_url ? (
                <img 
                    src={news.image_url} 
                    alt={news.title} 
                    style={styles.heroImage}
                    onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=1200&q=80';
                    }}
                />
            ) : (
                <div style={styles.noImages}>
                    <p>No image available for this news</p>
                </div>
            )}

            <div style={styles.metaInfo}>
                {news.category && (
                    <div style={styles.metaItem}>
                        <span style={{ ...styles.category, backgroundColor: getCategoryColor(news.category) }}>
                            {getCategoryText(news.category)}
                        </span>
                    </div>
                )}
                <div style={styles.metaItem}>
                    <span>📅</span> {formatDate(news.created_at)}
                </div>
                {news.author && (
                    <div style={styles.metaItem}>
                        <span>👤</span> {news.author}
                    </div>
                )}
                {news.views > 0 && (
                    <div style={styles.metaItem}>
                        <span>👁️</span> {news.views} views
                    </div>
                )}
            </div>

            <h1 style={styles.title}>{news.title}</h1>

            <div className="content" style={styles.content}>
                {news.content && news.content.split('\n').map((paragraph, index) => (
                    <p key={index} style={styles.contentText}>
                        {paragraph}
                    </p>
                ))}
            </div>

            {relatedNews.length > 0 && (
                <div style={styles.relatedSection}>
                    <h2 style={styles.relatedTitle}>Related Articles</h2>
                    <div style={styles.relatedGrid}>
                        {relatedNews.map(item => (
                            <Link 
                                to={`/news/${item.id}`} 
                                key={item.id} 
                                className="related-card"
                                style={styles.relatedCard}
                            >
                                <img 
                                    src={item.image_url || 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80'} 
                                    alt={item.title}
                                    style={styles.relatedImage}
                                    onError={(e) => {
                                        e.target.src = 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                                <div style={styles.relatedContent}>
                                    <h3 style={styles.relatedCardTitle}>{item.title}</h3>
                                    <small className="text-muted">{formatDate(item.created_at)}</small>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsDetail;