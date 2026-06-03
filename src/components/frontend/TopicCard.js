import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function TopicCard({ item }) {
    const { t } = useTranslation();

    return (
        <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0 card-hover">
                <div className="position-relative">
                    <img 
                        src={item.image} 
                        className="card-img-top" 
                        alt={t(item.titleKey)} 
                        style={{ height: '200px', objectFit: 'cover' }} 
                    />
                    <span className="position-absolute top-0 start-0 m-3 badge bg-primary">
                        {t(item.categoryKey)}
                    </span>
                </div>
                <div className="card-body p-4 d-flex flex-column">
                    <small className="text-muted mb-2 d-block">
                        📅 {t(item.dateKey)}
                    </small>
                    <h5 className="fw-bold mb-3" style={{ lineHeight: '1.5', color: 'var(--primary-dark)' }}>
                        {t(item.titleKey)}
                    </h5>
                    <p className="text-muted small mb-4">
                        {t(item.descKey)}
                    </p>
                    <Link to={`/news/${item.id}`} className="text-decoration-none fw-bold mt-auto" style={{ color: 'var(--gold-hover)' }}>
                        {t('read_more')} →
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default TopicCard;