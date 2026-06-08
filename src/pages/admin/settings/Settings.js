// D:\realestate\frontend\src\pages\admin\settings\Settings.js
import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const Settings = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/me');
      if (response.data.user) {
        setProfile({
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      await api.put(`/users/${localStorage.getItem('userId')}`, profile);
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      setEditMode(false);
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      setMessage({ text: 'Failed to update profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      setMessage({ text: 'New passwords do not match!', type: 'error' });
      return;
    }
    if (passwords.new.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters', type: 'error' });
      return;
    }

    try {
      setLoading(true);
      await api.put('/auth/change-password', {
        currentPassword: passwords.current,
        newPassword: passwords.new
      });
      setMessage({ text: 'Password changed successfully!', type: 'success' });
      setPasswords({ current: '', new: '', confirm: '' });
      setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    } catch (error) {
      setMessage({ text: error.response?.data?.message || 'Failed to change password', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid px-4 py-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: '#003366' }}>
          <i className="bi bi-gear-fill me-2"></i> Settings
        </h2>
        <p className="text-muted">Manage your account settings and preferences</p>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'} alert-dismissible fade show mb-3`} role="alert">
          {message.text}
          <button type="button" className="btn-close" onClick={() => setMessage({ text: '', type: '' })}></button>
        </div>
      )}

      <div className="row g-4">
        {/* Account Information */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: '#003366' }}>
                <i className="bi bi-person-circle me-2"></i> Account Information
              </h5>
              
              <div className="mb-3">
                <label className="form-label text-muted small">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  disabled={!editMode}
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted small">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  disabled={!editMode}
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted small">Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  disabled={!editMode}
                  style={{ borderRadius: '10px' }}
                />
              </div>

              {!editMode ? (
                <button className="btn btn-primary w-100" onClick={() => setEditMode(true)} style={{ borderRadius: '10px' }}>
                  <i className="bi bi-pencil me-2"></i> Edit Profile
                </button>
              ) : (
                <div className="d-flex gap-2">
                  <button className="btn btn-success flex-grow-1" onClick={handleUpdateProfile} disabled={loading}>
                    {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-check-lg me-2"></i>}
                    Save Changes
                  </button>
                  <button className="btn btn-secondary" onClick={() => setEditMode(false)}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="col-md-6">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: '#003366' }}>
                <i className="bi bi-shield-lock me-2"></i> Security
              </h5>

              <div className="mb-3">
                <label className="form-label text-muted small">Current Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter current password"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted small">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <div className="mb-3">
                <label className="form-label text-muted small">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <button className="btn btn-warning w-100" onClick={handleChangePassword} disabled={loading}>
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-key me-2"></i>}
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="col-12">
          <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: '#003366' }}>
                <i className="bi bi-sliders2 me-2"></i> Preferences
              </h5>

              <div className="row">
                <div className="col-md-4">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="notifications"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                    />
                    <label className="form-check-label ms-2" htmlFor="notifications">
                      <i className="bi bi-bell me-1"></i> Email Notifications
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="darkMode"
                      checked={darkMode}
                      onChange={(e) => setDarkMode(e.target.checked)}
                    />
                    <label className="form-check-label ms-2" htmlFor="darkMode">
                      <i className="bi bi-moon me-1"></i> Dark Mode
                    </label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-check">
                    <input className="form-check-input" type="radio" name="currency" id="usd" defaultChecked />
                    <label className="form-check-label ms-2" htmlFor="usd">
                      <i className="bi bi-currency-dollar me-1"></i> USD ($)
                    </label>
                  </div>
                  <div className="form-check mt-1">
                    <input className="form-check-input" type="radio" name="currency" id="khr" />
                    <label className="form-check-label ms-2" htmlFor="khr">
                      <i className="bi bi-currency-exchange me-1"></i> KHR (៛)
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;