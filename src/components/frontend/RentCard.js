import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function RentCard({ item }) {
    const { t } = useTranslation();

    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 card-hover">
                <div className="position-relative">
                    <img
                        src={item.image}
                        className="card-img-top"
                        alt={t(item.titleKey)}
                        style={{ height: '220px', objectFit: 'cover' }}
                    />
                    {/* Badge ផ្នែកខាងលើឆ្វេង (ឧទាហរណ៍៖ Fully Furnished) */}
                    {item.topBadgeKey && (
                        <span className={`position-absolute top-0 start-0 m-3 badge fs-6 shadow-sm ${item.topBadgeClass || 'bg-gold text-dark'}`}>
                            {t(item.topBadgeKey)}
                        </span>
                    )}
                    {/* Badge ផ្នែកខាងក្រោមស្តាំ (ឧទាហរណ៍៖ ទំនេរឥឡូវនេះ) */}
                    {item.statusKey && (
                        <span className="position-absolute bottom-0 end-0 m-3 badge bg-primary fs-6 shadow-sm">
                            {t(item.statusKey)}
                        </span>
                    )}
                </div>

                <div className="card-body p-4 d-flex flex-column">
                    <h4 className="card-title mb-2 text-danger fw-bold">
                        {item.price} <span className="fs-6 text-muted fw-normal">/ {t('per_month')}</span>
                    </h4>
                    <h5 className="fw-bold text-dark mb-2">
                        {t(item.titleKey)}
                    </h5>
                    <p className="text-muted small mb-3">
                        📍 {t(item.locationKey)}, {t('phnom_penh')}
                    </p>
                    <hr className="mt-0 opacity-25" />

                    <div className="d-flex justify-content-between text-muted small mb-4">
                        {/* បង្ហាញព័ត៌មានបន្ទប់គេង បន្ទប់ទឹក និងលក្ខណៈពិសេស */}
                        <span>🛏️ {t('bed_count', { count: item.beds })}</span>
                        <span>🚿 {t('bath_count', { count: item.baths })}</span>
                        <span>{item.featureIcon} {t(item.featureKey)}</span>
                    </div>

                    <Link to="/contact-us" className="btn btn-outline-primary w-100 fw-bold mt-auto rounded-3 py-2">
                        {t('book_now_btn')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default RentCard;