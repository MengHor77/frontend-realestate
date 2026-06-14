import React, { useState } from 'react';
import api from '../../services/api';  // CHANGE: import api instead of axios

const SaleInquiriesForm = ({ property, onClose, onSuccess }) => {
    const [inquiry, setInquiry] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInquiry(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        console.log('========== FRONTEND DEBUG ==========');
        console.log('Inquiry state:', inquiry);
        console.log('Property:', property);

        if (!inquiry.name || !inquiry.email || !inquiry.message) {
            setError('Please fill in all required fields');
            setLoading(false);
            return;
        }

        const finalSubject = inquiry.subject || `Inquiry about ${property.title} (Sale)`;
        console.log('Final subject:', finalSubject);

        const payload = {
            name: inquiry.name,
            email: inquiry.email,
            phone: inquiry.phone,
            subject: finalSubject,
            message: inquiry.message,
            property_id: property.id,
            property_title: property.title,
            property_type: property.listing_type || 'sale'
        };

        console.log('Sending payload:', payload);

        try {
            // CHANGE: use api instance instead of axios
            const response = await api.post('/inquiries', payload);
            console.log('Response:', response.data);

            if (response.data.success) {
                if (onSuccess) onSuccess();
                setInquiry({ name: '', email: '', phone: '', subject: '', message: '' });
                if (onClose) onClose();
            } else {
                setError(response.data.message || 'Failed to send inquiry');
            }
        } catch (err) {
            console.error('Error sending inquiry:', err);
            console.error('Error response:', err.response?.data);
            setError(err.response?.data?.message || 'Failed to send inquiry. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        contactForm: {
            background: '#f9f9f9',
            padding: '30px',
            borderRadius: '8px'
        },
        formTitle: {
            marginTop: 0,
            marginBottom: '20px',
            color: '#003366'
        },
        errorMessage: {
            background: '#f8d7da',
            color: '#721c24',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '15px',
            fontSize: '14px'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        formGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
        },
        formLabel: {
            fontSize: '14px',
            fontWeight: '600',
            color: '#333'
        },
        requiredStar: {
            color: '#dc3545',
            marginLeft: '4px'
        },
        formInput: {
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            transition: 'border-color 0.3s ease'
        },
        formTextarea: {
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            fontFamily: 'inherit',
            resize: 'vertical'
        },
        buttonGroup: {
            display: 'flex',
            gap: '10px',
            marginTop: '10px'
        },
        submitButton: {
            padding: '12px 24px',
            background: '#003366',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            flex: 1
        },
        cancelButton: {
            padding: '12px 24px',
            background: '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background 0.3s ease',
            flex: 1
        },
        submitDisabled: {
            opacity: 0.7,
            cursor: 'not-allowed'
        }
    };

    return (
        <div style={styles.contactForm}>
            <h3 style={styles.formTitle}>Inquire About {property.title}</h3>

            {error && <div style={styles.errorMessage}>{error}</div>}

            <form style={styles.form} onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                        Full Name <span style={styles.requiredStar}>*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={inquiry.name}
                        onChange={handleChange}
                        style={styles.formInput}
                        required
                        disabled={loading}
                        onFocus={(e) => e.target.style.borderColor = '#003366'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                        Email Address <span style={styles.requiredStar}>*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={inquiry.email}
                        onChange={handleChange}
                        style={styles.formInput}
                        required
                        disabled={loading}
                        onFocus={(e) => e.target.style.borderColor = '#003366'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={inquiry.phone}
                        onChange={handleChange}
                        style={styles.formInput}
                        disabled={loading}
                        onFocus={(e) => e.target.style.borderColor = '#003366'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Subject</label>
                    <input
                        type="text"
                        name="subject"
                        placeholder={`e.g., Interested in ${property.title}`}
                        value={inquiry.subject}
                        onChange={handleChange}
                        style={styles.formInput}
                        disabled={loading}
                        onFocus={(e) => e.target.style.borderColor = '#003366'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    />
                </div>

                <div style={styles.formGroup}>
                    <label style={styles.formLabel}>
                        Message <span style={styles.requiredStar}>*</span>
                    </label>
                    <textarea
                        name="message"
                        placeholder="Please provide details about your inquiry..."
                        rows="4"
                        value={inquiry.message}
                        onChange={handleChange}
                        style={styles.formTextarea}
                        required
                        disabled={loading}
                        onFocus={(e) => e.target.style.borderColor = '#003366'}
                        onBlur={(e) => e.target.style.borderColor = '#ddd'}
                    ></textarea>
                </div>

                <div style={styles.buttonGroup}>
                    <button
                        type="submit"
                        style={{
                            ...styles.submitButton,
                            ...(loading ? styles.submitDisabled : {})
                        }}
                        disabled={loading}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#0d6efd')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#003366')}
                    >
                        {loading ? 'Sending...' : 'Send Inquiry'}
                    </button>
                    <button
                        type="button"
                        style={styles.cancelButton}
                        onClick={onClose}
                        disabled={loading}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#999'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#ccc'}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SaleInquiriesForm;