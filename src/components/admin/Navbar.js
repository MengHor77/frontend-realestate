import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onToggleSidebar, sidebarWidth }) => {
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
      className="custom-header fixed-top d-flex align-items-center justify-content-between px-4 shadow-sm"
      style={{
        left: sidebarWidth, // រុញ Navbar មកស្ដាំតាមទំហំ Sidebar
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)', // ឱ្យដើរស្របគ្នាជាមួយ Sidebar
        height: '74px',
        width: 'auto', // ឱ្យវាគណនាទទឹងដែលនៅសល់ដោយស្វ័យប្រវត្តិ
      }}
    >
      <div className="d-flex align-items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="btn border-0 text-white p-0 d-flex align-items-center justify-content-center"
          style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}
        >
          <span style={{ fontSize: '24px' }}>☰</span>
        </button>
        
        <div className="text-white ms-2">
          <span className="text-white-50 small d-block" style={{ lineHeight: 1 }}>រីករាយដែលបានជួបម្ដងទៀត,</span>
          <strong style={{ fontSize: '15px' }}>{user.name || 'Admin'}</strong>
        </div>
      </div>

      <div className="d-flex align-items-center gap-3">
        {/* Profile Dropdown */}
        <div className="dropdown" style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn rounded-pill d-flex align-items-center gap-2 px-2 py-1 border-0"
            style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff' }}
          >
            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
              style={{ width: '35px', height: '35px', background: 'linear-gradient(135deg, #ffd700, #b8860b)', color: '#003366' }}>
              {(user.name || 'A').charAt(0).toUpperCase()}
            </div>
            <span className="text-gold">▼</span>
          </button>

          {dropdownOpen && (
            <div className="shadow-lg border-0 p-2 show" 
               style={{ 
                 position: 'absolute', right: 0, top: '55px', background: '#fff',
                 borderRadius: '12px', minWidth: '200px', zIndex: 1000 
               }}>
              <div className="px-3 py-2 border-bottom">
                <div className="fw-bold text-dark">{user.name || 'Admin'}</div>
                <div className="small text-muted">{user.email || 'admin@example.com'}</div>
              </div>
              <button className="dropdown-item py-2 mt-1" onClick={() => navigate('/admin/settings')}>⚙️ ការកំណត់</button>
              <button className="dropdown-item py-2 text-danger fw-bold" onClick={handleLogout}>🚪 ចាកចេញ</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;