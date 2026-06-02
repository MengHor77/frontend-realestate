import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />


      <main className="flex-grow-1 container my-4">
        <div className="bg-white p-4 shadow-sm rounded">
          <Outlet />
        </div>
      </main>

      <footer className="bg-light py-3 border-top mt-auto">
        <div className="container text-center">
          <span className="text-muted">© 2026 គ្រប់គ្រងដោយលោក Meng hor</span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;