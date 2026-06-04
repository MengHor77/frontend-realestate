import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBars, 
  faBell, 
  faChevronDown, 
  faGear, 
  faSignOutAlt, 
  faUserCircle 
} from '@fortawesome/free-solid-svg-icons';

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
        left: sidebarWidth,
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        height: '74px',
        width: 'auto',
        zIndex: 1000,
      }}
    >
      {/* ផ្នែកខាងឆ្វេង: Toggle + Welcome Text */}
      <div className="d-flex align-items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="btn border-0 text-white p-0 d-flex align-items-center justify-content-center"
          style={{ 
            width: '42px', 
            height: '42px', 
            background: 'rgba(255,255,255,0.15)', 
            borderRadius: '12px',
            transition: '0.3s' 
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        >
          <FontAwesomeIcon icon={faBars} style={{ fontSize: '20px' }} />
        </button>
        
        <div className="text-white ms-2 d-none d-sm-block">
          <span className="text-white-50 small d-block" style={{ lineHeight: 1, marginBottom: '2px' }}>
            welcome to admin
          </span>
          <strong style={{ fontSize: '16px', letterSpacing: '0.5px' }}>{user.name || 'Admin User'}</strong>
        </div>
      </div>

      {/* ផ្នែកខាងស្តាំ: Notifications + Profile */}
      <div className="d-flex align-items-center gap-4">
        
        {/* Notification Bell */}
        <button className="btn border-0 p-0 text-white position-relative" style={{ opacity: 0.8 }}>
          <FontAwesomeIcon icon={faBell} style={{ fontSize: '20px' }} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-primary-dark" 
                style={{ fontSize: '10px', padding: '4px 6px', marginTop: '2px' }}>
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <div className="dropdown" style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn rounded-pill d-flex align-items-center gap-3 px-2 py-1 border-0"
            style={{ 
              background: 'rgba(255, 255, 255, 0.1)', 
              color: '#fff',
              border: '1px solid rgba(255, 215, 0, 0.2)' 
            }}
          >
            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style={{ 
                width: '38px', 
                height: '38px', 
                background: 'linear-gradient(135deg, #ffd700, #b8860b)', 
                color: '#003366',
                fontSize: '15px'
              }}>
              {(user.name || 'A').charAt(0).toUpperCase()}
            </div>
            <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '12px', color: '#ffd700' }} />
          </button>

          {dropdownOpen && (
            <div className="shadow-lg border-0 p-2 show animate__animated animate__fadeIn" 
               style={{ 
                 position: 'absolute', 
                 right: 0, 
                 top: '60px', 
                 background: '#fff',
                 borderRadius: '15px', 
                 minWidth: '220px', 
                 zIndex: 1100,
                 overflow: 'hidden'
               }}>
              
              <div className="px-3 py-3 border-bottom bg-light mb-2" style={{ borderRadius: '10px' }}>
                <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>{user.name || 'Administrator'}</div>
                <div className="small text-muted" style={{ fontSize: '12px' }}>{user.email || 'admin@example.com'}</div>
              </div>

              <button className="dropdown-item py-2 d-flex align-items-center gap-3" 
                      style={{ borderRadius: '8px' }}
                      onClick={() => { setDropdownOpen(false); navigate('/admin/settings'); }}>
                <FontAwesomeIcon icon={faGear} className="text-muted" />
                <span style={{ fontSize: '14px' }}>Setting</span>
              </button>

              <div className="dropdown-divider mx-2"></div>

              <button className="dropdown-item py-2 d-flex align-items-center gap-3 text-danger fw-bold" 
                      style={{ borderRadius: '8px' }}
                      onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span style={{ fontSize: '14px' }}>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* បិទ Dropdown ពេលចុចខាងក្រៅ */}
      {dropdownOpen && (
        <div 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }} 
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;