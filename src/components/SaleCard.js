import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function SaleCard({ item }) {
    const { t } = useTranslation();

    return (
        <div className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0 card-hover">
                <div className="position-relative">
                    <img
                        src={item.image}
                        className="card-img-top"
                        alt={t(item.titleKey)}
                        style={{ height: '250px', objectFit: 'cover' }}
                    />
                    {/* Badge ផ្នែកខាងឆ្វេង (ប្លង់រឹង) */}
                    {item.isHardTitle && (
                        <span className="position-absolute top-0 start-0 m-3 badge bg-gold text-dark fs-6 shadow-sm">
                            {t('hard_title')}
                        </span>
                    )}
                    {/* Badge ផ្នែកខាងស្តាំ (លក់បន្ទាន់/ថ្មី) */}
                    {item.badgeKey && (
                        <span className={`position-absolute top-0 end-0 m-3 badge fs-6 shadow-sm ${item.badgeClass || 'bg-primary'}`}>
                            {t(item.badgeKey)}
                        </span>
                    )}
                    {/* Badge ផ្នែកខាងក្រោម (អាចចរចាបាន) */}
                    {item.bottomBadgeKey && (
                        <span className="position-absolute bottom-0 end-0 m-3 badge bg-success fs-6 shadow-sm">
                            {t(item.bottomBadgeKey)}
                        </span>
                    )}
                </div>

                <div className="card-body p-4 d-flex flex-column">
                    <h4 className="card-title mb-2 text-primary fw-bold">
                        {item.price}
                    </h4>
                    <h5 className="fw-bold text-dark mb-2">
                        {t(item.titleKey)}
                    </h5>
                    <p className="text-muted small mb-3">
                        📍 {t(item.locationKey)}, {t('phnom_penh')}
                    </p>
                    <hr className="mt-0 opacity-25" />

                    <div className="d-flex justify-content-between text-muted small mb-4">
                        {item.isLand ? (
                            <>
                                <span>{t('road_size', { size: item.roadSize })}</span>
                                <span>📐 {t('size_format', { value: item.size })}</span>
                                <span>{t('water_electricity')}</span>
                            </>
                        ) : (
                            <>
                                <span>🛏️ {t('bed_count', { count: item.beds })}</span>
                                <span>🚿 {t('bath_count', { count: item.baths })}</span>
                                <span>📐 {t('size_format', { value: item.size })}</span>
                            </>
                        )}
                    </div>

                    <Link to="/contact-us" className="btn btn-outline-primary w-100 fw-bold mt-auto rounded-3 py-2">
                        {t('contact_info_btn')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SaleCard;