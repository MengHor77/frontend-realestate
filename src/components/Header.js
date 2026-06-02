import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {

    const navLinkStyle = ({ isActive }) =>
        isActive ? "nav-link active fw-bold border-bottom bg-gold" : "nav-link";

    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm fixed-top">
            <div className="container">
                <NavLink className="navbar-brand fw-bold fs-4" to="/">
                    🏡 Real Estate MH
                </NavLink>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <NavLink className={navLinkStyle} to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={navLinkStyle} to="/sale">Sale</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={navLinkStyle} to="/rent">Rent</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={navLinkStyle} to="/news">News</NavLink>
                        </li>
                        <li className="nav-item">
                             <NavLink className={navLinkStyle} to="/contact-us">ContactUS</NavLink>

                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;