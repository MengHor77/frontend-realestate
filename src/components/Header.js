import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold fs-4" to="/">
                    🏡 Real Estate
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sale">Sale</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/rent">Rent</Link>
                        </li>
                         <li className="nav-item">
                            <Link className="nav-link" to="/news">News</Link>
                        </li>
                        <li className="nav-item ms-lg-3 mt-2 mt-lg-0">
                            {/* កែប៊ូតុង Contact Us ឱ្យមានរាងមូលស្អាត */}
                            <Link className="btn btn-warning text-dark fw-bold px-4 rounded-pill shadow-sm" to="/contact-us">
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}

export default Header;