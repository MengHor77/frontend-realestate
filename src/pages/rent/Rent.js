import React from 'react';
import { useTranslation } from 'react-i18next';
import RentCard from '../../components/RentCard';

function Rent() {
    const { t } = useTranslation();

    // បញ្ជីទិន្នន័យអចលនទ្រព្យសម្រាប់ជួល
    const rentList = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
            price: "$500",
            titleKey: "modern_condo_studio",
            locationKey: "sen_sokh_aeon2",
            beds: 1,
            baths: 1,
            featureIcon: "🏊",
            featureKey: "has_pool",
            topBadgeKey: "fully_furnished",
            statusKey: "available_now",
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
            price: "$850",
            titleKey: "apartment_2_beds",
            locationKey: "bkk1",
            beds: 2,
            baths: 2,
            featureIcon: "🚗",
            featureKey: "parking_1",
            topBadgeKey: "free_wifi_gym",
            topBadgeClass: "bg-dark text-white"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
            price: "$2,500",
            titleKey: "villa_king_ph",
            locationKey: "chbar_ampov",
            beds: 5,
            baths: 6,
            featureIcon: "🌳",
            featureKey: "large_garden",
            topBadgeKey: "luxury_villa",
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1502672260266-1c1e52408437?auto=format&fit=crop&w=800&q=80",
            price: "$250",
            titleKey: "new_room_rent",
            locationKey: "toul_tom_poung",
            beds: 1,
            baths: 1,
            featureIcon: "🛵",
            featureKey: "secure_parking",
            topBadgeKey: "special_price",
            topBadgeClass: "bg-primary text-white"
        }
    ];

    return (
        <div className="container mt-4 pb-4">
            {/* ១. ផ្នែកចំណងជើង និង Filter */}
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-top" style={{ borderColor: 'var(--gold-color)', borderWidth: '4px' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>
                        🔑 {t('properties_for_rent')}
                    </h2>
                    <span className="text-muted mt-2 mt-md-0">
                        {t('available_units_count', { count: 45 })}
                    </span>
                </div>

                <div className="row g-2">
                    <div className="col-md-3">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">{t('location_district')}</option>
                            <option value="BKK">{t('bkk')}</option>
                            <option value="Toul Kork">{t('toul_kork')}</option>
                            <option value="Chamkarmon">{t('chamkarmon')}</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">{t('room_type')}</option>
                            <option value="Condo">{t('condo')}</option>
                            <option value="Apartment">{t('apartment')}</option>
                            <option value="Villa">{t('villa')}</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">{t('monthly_rent')}</option>
                            <option value="<300">{t('under_300')}</option>
                            <option value="300-800">{t('300_800')}</option>
                            <option value=">800">{t('over_800')}</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100 py-2 fw-bold">{t('search_btn')}</button>
                    </div>
                </div>
            </div>

            {/* ២. បញ្ជីកាតផ្ទះជួល */}
            <div className="row g-4 pe-2 pb-3 custom-scroll-area">
                {rentList.map((item) => (
                    <RentCard key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
}

export default Rent;