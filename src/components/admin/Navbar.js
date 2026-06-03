import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        height: '64px',
        background: '#fff',
        borderBottom: '1px solid #e8ecf0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        zIndex: 999,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      }}
    >
      {/* Left: Toggle + Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button
          onClick={onToggleSidebar}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: '6px',
            color: '#555',
          }}
        >
          ☰
        </button>
        <span style={{ color: '#888', fontSize: '14px' }}>
          Welcome back, <strong style={{ color: '#333' }}>{user.name || 'Admin'}</strong>
        </span>
      </div>

      {/* Right: Actions + Avatar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Notification Bell */}
        <button
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            position: 'relative',
            padding: '4px',
          }}
        >
          🔔
          <span
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '8px',
              height: '8px',
              background: '#f44',
              borderRadius: '50%',
            }}
          />
        </button>

        {/* Avatar Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'none',
              border: '1px solid #e0e0e0',
              borderRadius: '24px',
              padding: '6px 12px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#333',
            }}
          >
            <div
              style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #4f8ef7, #2d3561)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 700,
                fontSize: '13px',
              }}
            >
              {(user.name || 'A').charAt(0).toUpperCase()}
            </div>
            <span>{user.name || 'Admin'}</span>
            <span style={{ color: '#999' }}>▾</span>
          </button>

          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                top: '48px',
                right: 0,
                background: '#fff',
                border: '1px solid #e0e0e0',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                minWidth: '180px',
                zIndex: 1000,
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                <div style={{ fontWeight: 600, fontSize: '14px' }}>{user.name || 'Admin'}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>{user.email || ''}</div>
              </div>
              <button
                onClick={() => { setDropdownOpen(false); navigate('/admin/settings'); }}
                style={dropdownBtnStyle}
              >
                ⚙️ Settings
              </button>
              <button
                onClick={handleLogout}
                style={{ ...dropdownBtnStyle, color: '#f44' }}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const dropdownBtnStyle = {
  display: 'block',
  width: '100%',
  padding: '10px 16px',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  cursor: 'pointer',
  fontSize: '14px',
  color: '#333',
  transition: 'background 0.15s',
};

export default Navbar;