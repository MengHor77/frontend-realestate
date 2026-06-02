import React from 'react';
import { Link } from 'react-router-dom';

function ServiceCard({ title, icon, link, color, description }) {
    return (
        <div className="col-md-4">
            <Link to={link} className="text-decoration-none">
                <div className="p-5 rounded-4 shadow-sm border bg-white card-hover h-100">
                    <div className="fs-1 mb-3">{icon}</div>
                    <h4 className="fw-bold text-dark">{title}</h4>
                    <p className="text-muted">{description || 'ស្វែងរកជម្រើសល្អៗជាច្រើនកន្លែង'}</p>
                </div>
            </Link>
        </div>
    );
}

export default ServiceCard;