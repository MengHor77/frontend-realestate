import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/frontend/Header';
import Footer from '../components/frontend/Footer';

const FrontendLayout = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',        // បង្ខំកម្ពស់ឱ្យពេញអេក្រង់
      overflow: 'hidden'      // ដក Scrollbar ចេញពីទំព័រទាំងមូល
    }}>
      <Header />
      
      {/* កែសម្រួល main ឱ្យមាន Scrollbar លាក់ */}
      <main style={{ 
        flex: 1, 
        paddingTop: '75px', 
        overflowY: 'auto',      // ឱ្យវា Scroll នៅខាងក្នុង Main
        msOverflowStyle: 'none', // សម្រាប់ IE និង Edge
        scrollbarWidth: 'none'   // សម្រាប់ Firefox
      }}> 
        {/* លាក់ Scrollbar សម្រាប់ Chrome, Safari */}
        <style>
          {`
            main::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>
        
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default FrontendLayout;