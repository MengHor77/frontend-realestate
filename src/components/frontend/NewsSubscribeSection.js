import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import FlashMessage from '../../components/common/FlashMessage';

const NewsSubscribeSection = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [flashMessage, setFlashMessage] = useState({ show: false, message: '', type: 'success' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setFlashMessage({ show: true, message: 'Please enter your email address', type: 'error' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setFlashMessage({ show: true, message: 'Please enter a valid email address', type: 'error' });
            return;
        }

        try {
            setLoading(true);

            const response = await api.post('/newsletter/subscribe', { email });

            if (response.data.success) {
                setFlashMessage({
                    show: true,
                    message: response.data.message || 'Successfully subscribed to newsletter!',
                    type: 'success'
                });
                setEmail('');
            } else {
                setFlashMessage({
                    show: true,
                    message: response.data.message || 'Subscription failed',
                    type: 'error'
                });
            }
        } catch (err) {
            console.error('Subscription error:', err);
            setFlashMessage({
                show: true,
                message: err.response?.data?.message || 'Failed to subscribe. Please try again.',
                type: 'error'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCloseFlashMessage = () => {
        setFlashMessage(prev => ({ ...prev, show: false }));
    };

    const styles = {
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
            margin: '0 auto',
            display: 'flex',
            gap: '10px'
        },
        emailInput: {
            flex: 1,
            padding: '12px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '16px',
            outline: 'none',
            transition: 'border-color 0.3s ease'
        },
        subscribeBtn: {
            backgroundColor: '#003366',
            color: '#ffd700',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'background 0.3s ease'
        },
        loadingText: {
            marginTop: '15px',
            color: '#003366'
        }
    };

    return (
        <div style={styles.newsletterSection}>
            {/* Flash Message */}
            {flashMessage.show && (
                <FlashMessage
                    message={flashMessage.message}
                    type={flashMessage.type}
                    duration={3000}
                    onClose={handleCloseFlashMessage}
                />
            )}

            <h4 style={styles.newsletterTitle}>
                {t('newsletter_title') || 'Subscribe to Our Newsletter'}
            </h4>
            <p style={styles.newsletterDesc}>
                {t('newsletter_desc') || 'Get the latest real estate news and updates delivered to your inbox'}
            </p>
            <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('email_placeholder') || 'Enter your email'}
                        style={styles.emailInput}
                        onFocus={(e) => e.target.style.borderColor = '#003366'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                        disabled={loading}
                    />
                    <button
                        type="submit"
                        style={styles.subscribeBtn}
                        disabled={loading}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#0d6efd'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#003366'}
                    >
                        {loading ? 'Subscribing...' : (t('subscribe_btn') || 'Subscribe')}
                    </button>
                </div>
                {loading && <div style={styles.loadingText}>Processing...</div>}
            </form>
        </div>
    );
};

export default NewsSubscribeSection;