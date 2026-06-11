import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import FlashMessage from '../../../components/common/FlashMessage';
import api from '../../../services/api';

const Profile = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);
    const [flashMessage, setFlashMessage] = useState({ show: false, message: '', type: 'success' });
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        setFormData({
            name: user.name || '',
            email: user.email || '',
            phone: user.phone || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    }, [user, navigate]);

    const showFlashMessage = (message, type = 'success') => {
        setFlashMessage({ show: true, message, type });
    };

    const handleCloseFlashMessage = () => {
        setFlashMessage({ show: false, message: '', type: 'success' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await api.put('/users/profile', {
                name: formData.name,
                phone: formData.phone
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                // Update user in localStorage and context
                const updatedUser = { ...user, name: formData.name, phone: formData.phone };
                localStorage.setItem('user', JSON.stringify(updatedUser));
                showFlashMessage('Profile updated successfully!', 'success');
                setEditing(false);
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
        } catch (err) {
            console.error('Update error:', err);
            showFlashMessage(err.response?.data?.message || 'Failed to update profile', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (formData.newPassword !== formData.confirmPassword) {
            showFlashMessage('New passwords do not match!', 'error');
            return;
        }

        if (formData.newPassword.length < 6) {
            showFlashMessage('Password must be at least 6 characters!', 'error');
            return;
        }

        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await api.put('/auth/change-password', {
                currentPassword: formData.currentPassword,
                newPassword: formData.newPassword
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                showFlashMessage('Password changed successfully!', 'success');
                setFormData({
                    ...formData,
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            }
        } catch (err) {
            console.error('Password error:', err);
            showFlashMessage(err.response?.data?.message || 'Failed to change password', 'error');
        } finally {
            setLoading(false);
        }
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f4f7f6',
            padding: '100px 0 60px'
        },
        profileCard: {
            background: '#fff',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            overflow: 'hidden'
        },
        profileHeader: {
            background: 'linear-gradient(135deg, #003366 0%, #0d6efd 100%)',
            padding: '40px',
            textAlign: 'center',
            color: '#fff'
        },
        avatar: {
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: '#ffd700',
            color: '#003366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            fontWeight: 'bold',
            margin: '0 auto 20px',
            border: '4px solid #fff',
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)'
        },
        sectionTitle: {
            fontSize: '20px',
            fontWeight: '600',
            color: '#003366',
            marginBottom: '20px',
            paddingBottom: '10px',
            borderBottom: '2px solid #ffd700'
        },
        infoRow: {
            display: 'flex',
            padding: '12px 0',
            borderBottom: '1px solid #eee'
        },
        infoLabel: {
            width: '120px',
            fontWeight: '600',
            color: '#666'
        },
        infoValue: {
            flex: 1,
            color: '#333'
        },
        input: {
            width: '100%',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '14px',
            transition: 'all 0.3s ease'
        },
        button: {
            backgroundColor: '#003366',
            color: '#ffd700',
            padding: '10px 24px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.3s ease'
        },
        buttonDanger: {
            backgroundColor: '#dc3545',
            color: '#fff'
        },
        buttonSecondary: {
            backgroundColor: '#6c757d',
            color: '#fff'
        }
    };

    if (!user) {
        return (
            <div style={styles.container}>
                <div className="container text-center">
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {flashMessage.show && (
                <FlashMessage
                    message={flashMessage.message}
                    type={flashMessage.type}
                    duration={3000}
                    onClose={handleCloseFlashMessage}
                />
            )}

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div style={styles.profileCard}>
                            {/* Profile Header */}
                            <div style={styles.profileHeader}>
                                <div style={styles.avatar}>
                                    {user.name ? user.name.charAt(0).toUpperCase() : user.email?.charAt(0).toUpperCase()}
                                </div>
                                <h2 style={{ margin: 0, fontSize: '24px' }}>{user.name}</h2>
                                <p style={{ margin: '5px 0 0', opacity: 0.9 }}>{user.role === 'admin' ? 'Administrator' : 'Member'}</p>
                            </div>

                            {/* Profile Content */}
                            <div className="p-4">
                                {/* Profile Information Section */}
                                <div className="mb-4">
                                    <h3 style={styles.sectionTitle}>
                                        <i className="bi bi-person-circle me-2"></i> Profile Information
                                    </h3>
                                    
                                    {!editing ? (
                                        <div>
                                            <div style={styles.infoRow}>
                                                <div style={styles.infoLabel}>Full Name:</div>
                                                <div style={styles.infoValue}>{user.name}</div>
                                            </div>
                                            <div style={styles.infoRow}>
                                                <div style={styles.infoLabel}>Email:</div>
                                                <div style={styles.infoValue}>{user.email}</div>
                                            </div>
                                            <div style={styles.infoRow}>
                                                <div style={styles.infoLabel}>Phone:</div>
                                                <div style={styles.infoValue}>{user.phone || 'Not provided'}</div>
                                            </div>
                                            <div style={styles.infoRow}>
                                                <div style={styles.infoLabel}>Role:</div>
                                                <div style={styles.infoValue}>
                                                    <span className={`badge ${user.role === 'admin' ? 'bg-primary' : 'bg-secondary'}`}>
                                                        {user.role === 'admin' ? 'Admin' : 'User'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={styles.infoRow}>
                                                <div style={styles.infoLabel}>Member Since:</div>
                                                <div style={styles.infoValue}>
                                                    {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                                </div>
                                            </div>
                                            <div className="mt-3">
                                                <button style={styles.button} onClick={() => setEditing(true)}>
                                                    <i className="bi bi-pencil me-2"></i> Edit Profile
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleUpdateProfile}>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Full Name</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    style={styles.input}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Email</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={formData.email}
                                                    disabled
                                                    style={{ ...styles.input, backgroundColor: '#f0f0f0' }}
                                                />
                                                <small className="text-muted">Email cannot be changed</small>
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label fw-semibold">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    className="form-control"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    style={styles.input}
                                                    placeholder="Enter your phone number"
                                                />
                                            </div>
                                            <div className="d-flex gap-2">
                                                <button type="submit" style={styles.button} disabled={loading}>
                                                    {loading ? 'Saving...' : 'Save Changes'}
                                                </button>
                                                <button type="button" style={styles.buttonSecondary} onClick={() => setEditing(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </div>

                                {/* Change Password Section */}
                                <div className="mt-4">
                                    <h3 style={styles.sectionTitle}>
                                        <i className="bi bi-shield-lock me-2"></i> Change Password
                                    </h3>
                                    <form onSubmit={handleChangePassword}>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Current Password</label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                className="form-control"
                                                value={formData.currentPassword}
                                                onChange={handleChange}
                                                style={styles.input}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">New Password</label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                className="form-control"
                                                value={formData.newPassword}
                                                onChange={handleChange}
                                                style={styles.input}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label fw-semibold">Confirm New Password</label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                className="form-control"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                style={styles.input}
                                                required
                                            />
                                        </div>
                                        <button type="submit" style={styles.button} disabled={loading}>
                                            {loading ? 'Updating...' : 'Change Password'}
                                        </button>
                                    </form>
                                </div>

                                {/* Logout Button */}
                                <div className="mt-4 pt-3 text-center">
                                    <button 
                                        onClick={() => { logout(); navigate('/'); }} 
                                        style={{ ...styles.button, ...styles.buttonDanger }}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i> Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;