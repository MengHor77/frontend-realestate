import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUser,
    faEnvelope,
    faLock,
    faKey,
    faEdit,
    faSave,
    faGear,
    faBell,
    faDollarSign,
    faMoon
} from '@fortawesome/free-solid-svg-icons';

const Settings = () => {
    const [profile, setProfile] = useState({
        name: 'Taing PengSreng',
        email: 'admin@example.com',
        phone: '012 345 678'
    });

    return (
        <div style={{ padding: '25px' }}>
            <h2 style={{ color: '#1a1f36', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FontAwesomeIcon icon={faGear} /> Settings
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' }}>

                {/* Account Information */}
                <div style={cardStyle}>
                    <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <FontAwesomeIcon icon={faUser} /> Account Information
                    </h4>
                    <div style={inputGroupStyle}>
                        <label>Username</label>
                        <input type="text" value={profile.name} style={inputStyle} readOnly />
                    </div>
                    <div style={inputGroupStyle}>
                        <label>Email Address</label>
                        <input type="email" value={profile.email} style={inputStyle} readOnly />
                    </div>
                    <button style={btnStyle}>
                        <FontAwesomeIcon icon={faEdit} /> Edit Profile
                    </button>
                </div>

                {/* Security */}
                <div style={cardStyle}>
                    <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <FontAwesomeIcon icon={faLock} /> Security
                    </h4>
                    <div style={inputGroupStyle}>
                        <label>Current Password</label>
                        <input type="password" placeholder="Enter old password" style={inputStyle} />
                    </div>
                    <div style={inputGroupStyle}>
                        <label>New Password</label>
                        <input type="password" placeholder="Enter new password" style={inputStyle} />
                    </div>
                    <button style={{ ...btnStyle, background: '#28a745' }}>
                        <FontAwesomeIcon icon={faKey} /> Change Password
                    </button>
                </div>

                {/* System Settings */}
                <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
                    <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                        <FontAwesomeIcon icon={faGear} /> System Preferences
                    </h4>
                    <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
                        <label style={{ cursor: 'pointer' }}>
                            <input type="checkbox" checked readOnly /> <FontAwesomeIcon icon={faBell} /> Enable Email Notifications
                        </label>
                        <label style={{ cursor: 'pointer' }}>
                            <input type="checkbox" checked readOnly /> <FontAwesomeIcon icon={faDollarSign} /> Show Price in (USD)
                        </label>
                        <label style={{ cursor: 'pointer' }}>
                            <input type="checkbox" /> <FontAwesomeIcon icon={faMoon} /> Enable Dark Mode
                        </label>
                    </div>
                </div>

            </div>
        </div>
    );
};

// --- Styles ---
const cardStyle = {
    background: '#fff',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
};

const inputGroupStyle = {
    marginBottom: '15px'
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: '0.3s'
};

const btnStyle = {
    marginTop: '10px',
    padding: '10px 20px',
    background: '#4f8ef7',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: '0.3s'
};

export default Settings;