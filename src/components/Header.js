import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <header className="navbar navbar-expand-lg fixed-top custom-header">
            <div className="container">
                {/* Logo & Brand Name */}
                <NavLink className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2" to="/">
                    <span className="brand-icon">🏡</span>
                    <span className="brand-text">Real Estate <span className="text-gold">MH</span></span>
                </NavLink>

                {/* Mobile Menu Toggler */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navigation Menu Links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center gap-1">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/sale">Sale</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/rent">Rent</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/news">News</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact-us">Contact Us</NavLink>
                        </li>
                        
                        {/* ប៊ូតុង Sign Up បែប Professional Action Button */}
                        <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                            <NavLink className="btn-signup-nav" to="/signup">Sign Up</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;