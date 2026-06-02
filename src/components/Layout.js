import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 my-4">
        <Outlet />
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