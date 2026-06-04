import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartPie, 
  faBuilding, 
  faUsers, 
  faNewspaper, 
  faComments, 
  faChartLine, 
  faGear, 
  faSignOutAlt 
} from '@fortawesome/free-solid-svg-icons';

const menuItems = [
  { path: '/admin/dashboard', icon: faChartPie, label: 'ផ្ទាំងគ្រប់គ្រង' },
  { path: '/admin/properties', icon: faBuilding, label: 'អចលនទ្រព្យ' },
  { path: '/admin/users', icon: faUsers, label: 'អ្នកប្រើប្រាស់' },
  { path: '/admin/news', icon: faNewspaper, label: 'ព័ត៌មាន' },
  { path: '/admin/inquiries', icon: faComments, label: 'ការសាកសួរ' },
  { path: '/admin/analytics', icon: faChartLine, label: 'របាយការណ៍' },
  { path: '/admin/settings', icon: faGear, label: 'ការកំណត់' },
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
        zIndex: 1050,
        display: 'flex', flexDirection: 'column',
        boxShadow: '4px 0 15px rgba(0,0,0,0.1)',
        borderRight: '2px solid #ffd700',
        overflow: 'hidden'
      }}
    >
      {/* Logo Section */}
      <div style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '15px', minHeight: '74px', background: 'rgba(0,0,0,0.1)' }}>
        <div style={{ 
          fontSize: '20px', 
          background: '#fff', 
          borderRadius: '8px', 
          width: '40px', 
          height: '40px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <FontAwesomeIcon icon={faBuilding} style={{ color: '#003366' }} />
        </div>
        {isOpen && <span style={{ fontWeight: 800, color: '#ffd700', whiteSpace: 'nowrap', letterSpacing: '1px' }}>REAL ESTATE</span>}
      </div>

      {/* Navigation Links */}
      <nav style={{ flex: 1, padding: '20px 10px' }}>
        {menuItems.map((item) => (
         // កែសម្រួលត្រង់ផ្នែក NavLink ក្នុង Sidebar.js
<NavLink
  key={item.path}
  to={item.path}
  className="nav-link-hover" // ដាក់ Class សម្រាប់កែសម្រួលបន្ថែមតាម CSS
  style={({ isActive }) => ({
    display: 'flex', 
    alignItems: 'center', 
    gap: '18px',
    padding: '12px 18px', 
    marginBottom: '8px', 
    borderRadius: '12px',
    textDecoration: 'none', 
    transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)', // Transition ល្បឿនលឿននិងរលូន
    color: isActive ? '#ffd700' : 'rgba(255,255,255,0.6)',
    background: isActive ? 'rgba(255,215,0,0.1)' : 'transparent',
    borderLeft: isActive ? '4px solid #ffd700' : '4px solid transparent',
    whiteSpace: 'nowrap',
    // បន្ថែម Hover State តាមរយៈ JavaScript Object
    ':hover': { 
      background: 'rgba(255, 255, 255, 0.05)',
      transform: 'translateX(5px)', // រុញមេនុយទៅស្តាំតិចៗពេល Hover
      color: '#fff' 
    }
  })}
  // ប្រើប្រាស់ onMouseEnter និង onMouseLeave ដើម្បីគ្រប់គ្រង Hover Effect តាមរយៈ Style
  onMouseEnter={(e) => {
    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
    e.currentTarget.style.transform = 'translateX(5px)';
  }}
  onMouseLeave={(e) => {
    // ពិនិត្យមើលថាតើវាជា Active Link ឬអត់ ដើម្បីកុំឱ្យបាត់ពណ៌ Active
    const isActive = e.currentTarget.classList.contains('active'); 
    e.currentTarget.style.backgroundColor = isActive ? 'rgba(255,215,0,0.1)' : 'transparent';
    e.currentTarget.style.transform = 'translateX(0px)';
  }}
>
  <div style={{ width: '25px', textAlign: 'center' }}>
    <FontAwesomeIcon icon={item.icon} style={{ fontSize: '18px' }} />
  </div>
  {isOpen && <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.label}</span>}
</NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div style={{ padding: '20px', borderTop: '1px solid rgba(255,215,0,0.1)' }}>
        <button
          onClick={() => { localStorage.clear(); navigate('/login'); }}
          style={{ 
            width: '100%', display: 'flex', alignItems: 'center', gap: '18px', 
            padding: '12px 18px', background: 'rgba(255,71,71,0.1)', border: 'none', 
            borderRadius: '12px', color: '#ff7675', cursor: 'pointer', transition: '0.3s'
          }}
        >
          <div style={{ width: '25px', textAlign: 'center' }}>
            <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '18px' }} />
          </div>
          {isOpen && <span style={{ fontWeight: 600 }}>ចាកចេញ</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;