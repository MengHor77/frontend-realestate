import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Navbar from '../components/admin/Navbar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // កម្ពស់ Navbar និង ទទឹង Sidebar
  const navbarHeight = '74px'; 
  const sidebarWidth = sidebarOpen ? '260px' : '80px';

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f9fa' }}>
      
      {/* Sidebar - Fixed Position */}
      <Sidebar isOpen={sidebarOpen} />

      {/* Main Wrapper */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: sidebarWidth,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minWidth: 0, // ការពារ Layout រុញចេញក្រៅ screen
        }}
      >
        {/* Navbar - Pass sidebarWidth ដើម្បីឱ្យវាដឹងពីគម្លាតឆ្វេង */}
        <Navbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarWidth={sidebarWidth}
        />

        {/* Page Content */}
        <main 
          style={{ 
            flex: 1, 
            padding: '25px', 
            marginTop: navbarHeight,
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          }}
        >
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;