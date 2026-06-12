import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBell,
  faChevronDown,
  faGear,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import NotificationDropdown from './NotificationDropdown';

const Navbar = ({ onToggleSidebar, sidebarWidth, isSidebarCollapsed }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New inquiry received', message: 'Someone inquired about property #123', time: '5 min ago', read: false },
    { id: 2, title: 'Property sold', message: 'Property "Luxury Villa" has been sold', time: '1 hour ago', read: false },
    { id: 3, title: 'New user registered', message: 'A new user joined the platform', time: '3 hours ago', read: false },
    { id: 4, title: 'System update', message: 'System will be updated at 2 AM', time: '1 day ago', read: true },
  ]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    // Count unread notifications
    const count = notifications.filter(n => !n.read).length;
    setUnreadCount(count);
  }, [notifications]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNotificationClick = (notificationId) => {
    // Mark notification as read
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
    
    // Navigate based on notification type
    const notification = notifications.find(n => n.id === notificationId);
    if (notification && notification.title.includes('inquiry')) {
      navigate('/admin/inquiries');
    } else if (notification && notification.title.includes('property')) {
      navigate('/admin/properties');
    } else if (notification && notification.title.includes('user')) {
      navigate('/admin/users');
    }
    
    setNotificationOpen(false);
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  return (
    <header
      className="custom-header d-flex align-items-center justify-content-between px-4 shadow-sm"
      style={{
        position: 'fixed',
        top: 0,
        left: sidebarWidth,
        right: 0,
        height: '74px',
        zIndex: 1000,
        background: '#003366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}
    >
      {/* Left Section: Toggle + Welcome Text */}
      <div className="d-flex align-items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="btn border-0 text-white p-0 d-flex align-items-center justify-content-center"
          style={{
            width: '42px',
            height: '42px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '12px',
            transition: '0.3s',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.25)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
        >
          <FontAwesomeIcon icon={faBars} style={{ fontSize: '20px' }} />
        </button>

        <div className="text-white ms-2 d-none d-sm-block">
          <span className="text-white-50 small d-block" style={{ lineHeight: 1, marginBottom: '2px', fontSize: '11px' }}>
            welcome to admin
          </span>
          <strong style={{ fontSize: '15px', letterSpacing: '0.5px' }}>Dashboard</strong>
        </div>
      </div>

      {/* Right Section: Notifications + Profile */}
      <div className="d-flex align-items-center gap-4">

        {/* Notification Bell */}
        <div ref={notificationRef} style={{ position: 'relative' }}>
          <button 
            className="btn border-0 p-0 text-white position-relative" 
            style={{ opacity: 0.8, transition: '0.3s', cursor: 'pointer' }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
            onClick={() => setNotificationOpen(!notificationOpen)}
          >
            <FontAwesomeIcon icon={faBell} style={{ fontSize: '20px' }} />
            {unreadCount > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-2 border-primary-dark"
                style={{ fontSize: '10px', padding: '4px 6px', marginTop: '2px' }}>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown Component */}
          <NotificationDropdown 
            isOpen={notificationOpen}
            onClose={() => setNotificationOpen(false)}
            notifications={notifications}
            unreadCount={unreadCount}
            onMarkAllAsRead={markAllAsRead}
            onNotificationClick={handleNotificationClick}
          />
        </div>

        {/* Profile Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="btn rounded-pill d-flex align-items-center gap-3 px-3 py-1 border-0"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              border: '1px solid rgba(255, 215, 0, 0.2)',
              transition: '0.3s',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          >
            {/* Avatar Circle */}
            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold shadow-sm"
              style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #ffd700, #b8860b)',
                color: '#003366',
                fontSize: '14px'
              }}>
              {(user.name || user.email || 'A').charAt(0).toUpperCase()}
            </div>

            {/* Full Name */}
            <span className="fw-semibold d-none d-md-block" style={{ fontSize: '14px' }}>
              {user.name || (user.email ? user.email.split('@')[0] : 'Admin')}
            </span>

            <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '10px', color: '#ffd700' }} />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="shadow-lg border-0 p-2"
              style={{
                position: 'absolute',
                right: 0,
                top: '55px',
                background: '#fff',
                borderRadius: '15px',
                minWidth: '240px',
                zIndex: 1100,
                overflow: 'hidden'
              }}>
              <div className="px-3 py-3 border-bottom bg-light mb-2" style={{ borderRadius: '10px' }}>
                <div className="fw-bold text-dark" style={{ fontSize: '14px' }}>{user.name || 'Administrator'}</div>
                <div className="small text-muted" style={{ fontSize: '12px' }}>{user.email || 'admin@example.com'}</div>
              </div>

              <button 
                className="dropdown-item py-2 d-flex align-items-center gap-3"
                style={{ borderRadius: '8px', cursor: 'pointer' }}
                onClick={() => { setDropdownOpen(false); navigate('/admin/settings'); }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <FontAwesomeIcon icon={faGear} className="text-muted" />
                <span style={{ fontSize: '14px' }}>Settings</span>
              </button>

              <div className="dropdown-divider mx-2"></div>

              <button 
                className="dropdown-item py-2 d-flex align-items-center gap-3 text-danger fw-bold"
                style={{ borderRadius: '8px', cursor: 'pointer' }}
                onClick={handleLogout}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fee'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span style={{ fontSize: '14px' }}>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;