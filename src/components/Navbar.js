import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/uiSlice';

function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.ui.theme);
  const wishlistCount = useSelector((state) => state.property.wishlist.length);
  const compareCount = useSelector((state) => state.property.compare.length);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top" aria-label="Main navigation">
      <div className="container">
        <NavLink className="navbar-brand fw-bold" to="/">
          🏡 RealEstate Pro
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <NavLink className="nav-link" to="/listings">
                Listings
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/search-results">
                Map Search
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/agent-dashboard">
                Agent
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/compare">
                Compare ({compareCount})
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-sm btn-light"
                onClick={() => dispatch(toggleTheme())}
                aria-label="Toggle dark mode"
              >
                {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
              </button>
            </li>
            <li className="nav-item">
              <NavLink className="btn btn-warning btn-sm" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item text-white small ms-lg-2" aria-live="polite">
              ❤️ {wishlistCount}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
