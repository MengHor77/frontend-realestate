import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const menuItems = [
  { path: '/admin/dashboard', icon: '📊', label: 'ផ្ទាំងគ្រប់គ្រង' },
  { path: '/admin/properties', icon: '🏠', label: 'អចលនទ្រព្យ' },
  { path: '/admin/users', icon: '👥', label: 'អ្នកប្រើប្រាស់' },
  { path: '/admin/news', icon: '📰', label: 'ព័ត៌មាន' },
  { path: '/admin/inquiries', icon: '💬', label: 'ការសាកសួរ' },
  { path: '/admin/analytics', icon: '📈', label: 'របាយការណ៍' },
  { path: '/admin/settings', icon: '⚙️', label: 'ការកំណត់' },
];

const Sidebar = ({ isOpen }) => {
  const navigate = useNavigate();

  return (
    <aside
      style={{
        position: 'fixed',
        top: 0, left: 0, height: '100vh',
        width: isOpen ? '260px' : '80px',
        background: '#003366',
        color: '#fff',
        transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 1050, // ខ្ពស់ជាង Navbar ជានិច្ច
        display: 'flex', flexDirection: 'column',
        boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
        borderRight: '2px solid #ffd700',
        overflow: 'hidden' // សំខាន់៖ ការពារអក្សររញ៉េរញ៉ៃពេលបិទបើក
      }}
    >
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', minHeight: '74px', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ fontSize: '24px', background: '#fff', borderRadius: '8px', padding: '5px' }}>🏡</div>
        {isOpen && <span style={{ fontWeight: 800, color: '#ffd700', whiteSpace: 'nowrap' }}>REAL ESTATE</span>}
      </div>

      <nav style={{ flex: 1, padding: '20px 10px' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '15px',
              padding: '12px 15px', marginBottom: '5px', borderRadius: '10px',
              textDecoration: 'none', transition: '0.2s',
              color: isActive ? '#ffd700' : 'rgba(255,255,255,0.7)',
              background: isActive ? 'rgba(255,215,0,0.1)' : 'transparent',
              borderLeft: isActive ? '4px solid #ffd700' : '4px solid transparent',
              whiteSpace: 'nowrap'
            })}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            {isOpen && <span style={{ fontSize: '14px' }}>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,215,0,0.1)' }}>
        <button
          onClick={() => { localStorage.clear(); navigate('/login'); }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '15px', padding: '12px', background: 'rgba(255,0,0,0.1)', border: 'none', borderRadius: '10px', color: '#ff7675', cursor: 'pointer' }}
        >
          <span>🚪</span>
          {isOpen && <span style={{ whiteSpace: 'nowrap' }}>ចាកចេញ</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;