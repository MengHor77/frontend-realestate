import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';

function Layout() {
  const location = useLocation();
  const theme = useSelector((state) => state.ui.theme);

  const crumbs = location.pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, all) => ({
      label: segment.replace(/-/g, ' '),
      path: `/${all.slice(0, index + 1).join('/')}`
    }));

  return (
    <div className={`d-flex flex-column min-vh-100 ${theme === 'dark' ? 'theme-dark' : 'theme-light'}`}>
      <Navbar />

      <main className="flex-grow-1 container py-4">
        <nav aria-label="Breadcrumb" className="mb-3">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            {crumbs.map((crumb, index) => (
              <li
                key={crumb.path}
                className={`breadcrumb-item ${index === crumbs.length - 1 ? 'active' : ''}`}
                aria-current={index === crumbs.length - 1 ? 'page' : undefined}
              >
                {index === crumbs.length - 1 ? crumb.label : <Link to={crumb.path}>{crumb.label}</Link>}
              </li>
            ))}
          </ol>
        </nav>

        <div className="bg-body p-3 p-md-4 rounded shadow-sm">
          <Outlet />
        </div>
      </main>

      <footer className="bg-light border-top mt-auto py-4">
        <div className="container">
          <div className="row g-3 align-items-center">
            <div className="col-md-7">
              <h2 className="h6 mb-2">RealEstate Pro</h2>
              <p className="mb-1">Find homes, condos, land, and commercial properties with confidence.</p>
              <p className="mb-0 small">Contact: +855 12 345 678 · support@realestatepro.com</p>
            </div>
            <div className="col-md-5">
              <form className="d-flex gap-2" aria-label="Newsletter subscription form">
                <label className="visually-hidden" htmlFor="newsletter-email">Email</label>
                <input id="newsletter-email" className="form-control" type="email" placeholder="Subscribe to newsletter" aria-label="Email" />
                <button className="btn btn-success" type="submit">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
