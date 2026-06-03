import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/frontend/Header';
import Footer from '../components/frontend/Footer';

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 my-4">
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}

export default Layout;