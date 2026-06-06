import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Navbar from '../components/admin/Navbar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const navbarHeight = '74px';
  const sidebarWidth = sidebarOpen ? '260px' : '80px';

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f8f9fa', overflow: 'hidden' }}>
      {/* Overlay សម្រាប់ធ្វើឱ្យស្រអាប់នៅពេលបើក Modal */}
      {isOverlayVisible && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0, 51, 102, 0.1)', // ដាក់ពណ៌ស្រអាប់ត្រឹមនេះ
          zIndex: 9998,
          backdropFilter: 'blur(3px)'
        }} />
      )}

      <Sidebar isOpen={sidebarOpen} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', marginLeft: sidebarWidth, transition: 'margin-left 0.3s', minWidth: 0 }}>
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarWidth={sidebarWidth} />

        <main style={{ flex: 1, padding: '25px', marginTop: navbarHeight, overflowY: 'auto' }}>
          <Outlet context={{ setIsOverlayVisible }} />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;