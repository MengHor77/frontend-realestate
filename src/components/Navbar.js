import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    🏡 Real Estate
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sale">sale</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/rent">Rent</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link btn btn-warning text-dark ms-lg-3" to="/contact-us">contact us</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;