import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';

const NewsSubscribeSection = () => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setMessage({ type: 'error', text: 'Please enter your email address' });
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage({ type: 'error', text: 'Please enter a valid email address' });
            return;
        }

        try {
            setLoading(true);
            setMessage({ type: '', text: '' });

            const response = await api.post('/newsletter/subscribe', { email });

            if (response.data.success) {
                setMessage({ type: 'success', text: response.data.message || 'Successfully subscribed!' });
                setEmail('');
            } else {
                setMessage({ type: 'error', text: response.data.message || 'Subscription failed' });
            }
        } catch (err) {
            console.error('Subscription error:', err);
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to subscribe. Please try again.' });
        } finally {
            setLoading(false);
        }
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
        messageSuccess: {
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#d4edda',
            color: '#155724',
            borderRadius: '8px',
            fontSize: '14px'
        },
        messageError: {
            marginTop: '15px',
            padding: '10px',
            backgroundColor: '#f8d7da',
            color: '#721c24',
            borderRadius: '8px',
            fontSize: '14px'
        },
        loadingText: {
            marginTop: '15px',
            color: '#003366'
        }
    };

    return (
        <div style={styles.newsletterSection}>
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
                {message.text && (
                    <div style={message.type === 'success' ? styles.messageSuccess : styles.messageError}>
                        {message.text}
                    </div>
                )}
                {loading && <div style={styles.loadingText}>Processing...</div>}
            </form>
        </div>
    );
};

export default NewsSubscribeSection;