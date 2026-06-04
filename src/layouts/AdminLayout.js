import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/admin/Sidebar';
import Navbar from '../components/admin/Navbar';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const navbarHeight = '74px'; 
  const sidebarWidth = sidebarOpen ? '260px' : '80px';

  return (
    // បន្ថែម overflow: 'hidden' នៅទីនេះ ដើម្បីដក scrollbar ចេញពីទំព័រទាំងមូល
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      background: '#f8f9fa',
      overflow: 'hidden' 
    }}>
      
      <Sidebar isOpen={sidebarOpen} />

      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: sidebarWidth,
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          minWidth: 0,
        }}
      >
        <Navbar 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          sidebarWidth={sidebarWidth}
        />

        {/* ផ្នែក Content ៖ បន្ថែម overflowY: 'auto' ដើម្បីឱ្យវាមាន Scroll បើសិនជាអត្ថបទវែង តែលាក់ Scrollbar */}
        <main 
          style={{ 
            flex: 1, 
            padding: '25px', 
            marginTop: navbarHeight,
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            overflowY: 'auto', // ឱ្យវា Scroll នៅខាងក្នុង Main
            msOverflowStyle: 'none',  // សម្រាប់ IE និង Edge
            scrollbarWidth: 'none',  // សម្រាប់ Firefox
          }}
        >
          {/* កូដសម្រាប់លាក់ Scrollbar លើ Chrome, Safari, Edge */}
          <style>
            {`
              main::-webkit-scrollbar {
                display: none;
              }
            `}
          </style>

          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;