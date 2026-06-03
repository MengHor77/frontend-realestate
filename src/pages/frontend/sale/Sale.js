import React from 'react';
import { useTranslation } from 'react-i18next';
import SaleCard from '../../../components/frontend/SaleCard';

function Sale() {
    const { t } = useTranslation();

    const propertyList = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
            price: "$350,000",
            titleKey: "villa_king_title",
            locationKey: "chbar_ampov",
            beds: 5,
            baths: 6,
            size: "20 x 30", // ដាក់ត្រឹមតែលេខ វានឹងបង្ហាញពាក្យ "ម៉ែត្រ" តាមក្រោយដោយស្វ័យប្រវត្តិ
            isHardTitle: true,
            badgeKey: "urgent_sale",
            badgeClass: "bg-danger",
            isLand: false
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
            price: "$120,000",
            titleKey: "shophouse_title_sale",
            locationKey: "sensokh",
            beds: 4,
            baths: 5,
            size: "4.2 x 16",
            isHardTitle: false,
            badgeKey: "new_listing",
            badgeClass: "bg-primary",
            isLand: false
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
            price: "$45,000",
            titleKey: "land_near_airport",
            locationKey: "ta_khmao",
            size: "10 x 20",
            isHardTitle: true,
            bottomBadgeKey: "negotiable",
            isLand: true,
            roadSize: 15
        }
    ];

    return (
        <div className="container pb-5">
            {/* ១. ផ្នែកចំណងជើង និងប្រអប់ស្វែងរក */}
            <div className="bg-white p-4 rounded-4 shadow-sm mb-5 mt-4 border-top" style={{ borderColor: 'var(--gold-color)', borderWidth: '4px' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>
                        🏠 {t('properties_for_sale')}
                    </h2>
                    <span className="text-muted mt-2 mt-md-0">{t('showing_results', { count: propertyList.length })}</span>
                </div>

                <div className="row g-2">
                    <div className="col-md-3">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">{t('all_locations')}</option>
                            <option value="ភ្នំពេញ">{t('phnom_penh')}</option>
                            <option value="កណ្តាល">{t('kandal')}</option>
                            <option value="សៀមរាប">{t('siem_reap')}</option>
                        </select>
                    </div>
                    <div className="col-md-3">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">{t('property_type')}</option>
                            <option value="វីឡា">{t('villa')}</option>
                            <option value="ផ្ទះល្វែង">{t('flat')}</option>
                            <option value="ដីឡូតិ៍">{t('land_lot')}</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <select className="form-select bg-light border-0 py-2">
                            <option value="">{t('price_range')}</option>
                            <option value="under_50k">{t('under_50k')}</option>
                            <option value="50k_100k">{t('50k_100k')}</option>
                            <option value="over_100k">{t('over_100k')}</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <button className="btn btn-primary w-100 py-2 fw-bold">{t('search_btn')}</button>
                    </div>
                </div>
            </div>

            {/* ២. បញ្ជីអចលនទ្រព្យ */}
            <div className="row g-4">
                {propertyList.map((property) => (
                    <SaleCard key={property.id} item={property} />
                ))}
            </div>

            {/* ៣. ប៊ូតុងរំកិលទំព័រ */}
            <nav className="mt-5 d-flex justify-content-center">
                <ul className="pagination">
                    <li className="page-item disabled">
                        <button className="page-link px-4 fw-bold text-muted">{t('prev')}</button>
                    </li>
                    <li className="page-item active">
                        <button className="page-link px-3 bg-primary border-primary">1</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link px-3 text-dark">2</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link px-3 text-dark">3</button>
                    </li>
                    <li className="page-item">
                        <button className="page-link px-4 fw-bold" style={{ color: 'var(--primary-dark)' }}>{t('next')}</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sale;