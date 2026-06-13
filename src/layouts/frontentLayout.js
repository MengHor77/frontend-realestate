import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/frontend/Header';
import Footer from '../components/frontend/Footer';

const FrontendLayout = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',        // បង្ខំកម្ពស់ឱ្យពេញអេក្រង់
      overflow: 'hidden'      // ដក Scrollbar ចេញពីទំព័រទាំងមូល
    }}>
      <Header />

     // FrontendLayout.js
     
      <main className="custom-scroll-area">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default FrontendLayout;