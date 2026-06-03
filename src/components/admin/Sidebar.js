import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const menuItems = [
  { path: '/admin/dashboard',    icon: '📊', label: 'Dashboard' },
  { path: '/admin/properties',   icon: '🏠', label: 'Properties' },
  { path: '/admin/users',        icon: '👥', label: 'Users' },
  { path: '/admin/news',         icon: '📰', label: 'News' },
  { path: '/admin/inquiries',    icon: '💬', label: 'Inquiries' },
  { path: '/admin/analytics',    icon: '📈', label: 'Analytics' },
  { path: '/admin/settings',     icon: '⚙️',  label: 'Settings' },
];

const Sidebar = ({ isOpen, onToggle }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: isOpen ? '250px' : '70px',
        background: 'linear-gradient(180deg, #1a1f36 0%, #2d3561 100%)',
        color: '#fff',
        transition: 'width 0.3s ease',
        overflow: 'hidden',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 10px rgba(0,0,0,0.2)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '20px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          minHeight: '64px',
        }}
      >
        <span style={{ fontSize: '24px', flexShrink: 0 }}>🏡</span>
        {isOpen && (
          <span style={{ fontWeight: 700, fontSize: '16px', whiteSpace: 'nowrap', color: '#fff' }}>
            RealEstate Admin
          </span>
        )}
      </div>

      {/* Menu Items */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '12px 20px',
              color: isActive ? '#fff' : 'rgba(255,255,255,0.65)',
              background: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.2s',
              borderLeft: isActive ? '3px solid #4f8ef7' : '3px solid transparent',
              whiteSpace: 'nowrap',
              fontSize: '14px',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            <span style={{ fontSize: '18px', flexShrink: 0 }}>{item.icon}</span>
            {isOpen && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: '12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            padding: '12px 8px',
            background: 'rgba(255,80,80,0.15)',
            border: 'none',
            borderRadius: '8px',
            color: '#ff6b6b',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,80,80,0.3)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,80,80,0.15)'}
        >
          <span style={{ fontSize: '18px', flexShrink: 0 }}>🚪</span>
          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;