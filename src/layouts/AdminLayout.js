import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Navbar from '../components/admin/Navbar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check auth from localStorage
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (!token) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/" replace />;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f0f2f5' }}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: sidebarOpen ? '250px' : '70px',
          transition: 'margin-left 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Top Navbar */}
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main style={{ flex: 1, padding: '24px', marginTop: '64px' }}>
          <Outlet />
        </main>

        {/* Footer */}
        <footer
          style={{
            textAlign: 'center',
            padding: '16px',
            fontSize: '13px',
            color: '#888',
            borderTop: '1px solid #e0e0e0',
            background: '#fff',
          }}
        >
          © {new Date().getFullYear()} RealEstate Admin Panel. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;