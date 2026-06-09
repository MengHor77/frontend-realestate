import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import SaleCard from '../../../components/frontend/SaleCard';
import SaleSearchFilter from '../../../components/frontend/SaleSearchFilter';

function Sale() {
    const { t } = useTranslation();
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({ location: '', type: '', price_range: '' });

    const fetchProperties = async () => {
        try {
            // Note: Added listing_type: 'sale' to ensure we only get sale items
            const res = await axios.get('http://localhost:5000/api/properties', {
                params: { ...filters, listing_type: 'sale' }
            });
            setProperties(res.data.properties || []);
        } catch (err) { console.error("Error fetching:", err); }
    };

    // Trigger fetch on load
    useEffect(() => { fetchProperties(); }, []);

    const saleFilters = [
        {
            key: 'location',
            type: 'select',
            placeholder: 'all_locations',
            colClass: 'col-md-3',
            options: [
                { value: 'Phnom Penh', label: 'phnom_penh' },
                { value: 'Kandal', label: 'kandal' }
            ],
            onChange: (e) => setFilters({ ...filters, location: e.target.value })
        },
        {
            key: 'type',
            type: 'select',
            placeholder: 'property_type',
            colClass: 'col-md-3',
            options: [
                { value: 'villa', label: 'villa' },
                { value: 'flat', label: 'flate' },
                { value: 'condo', label: 'condo' },
                { value: 'land_lot', label: 'land' }
            ],
            onChange: (e) => setFilters({ ...filters, type: e.target.value })
        },
        {
            key: 'price_range',
            type: 'select',
            placeholder: 'price_range',
            colClass: 'col-md-4',
            options: [
                { value: '50k', label: 'under_50k' },
                { value: '100k', label: '50k_100k' },
                { value: '200k', label: '100k_200k' },
                { value: 'above_200k', label: 'above_200k' }
            ],
            onChange: (e) => setFilters({ ...filters, price_range: e.target.value })
        },
        {
            type: 'button',
            label: 'search_btn',
            colClass: 'col-md-2',
            onClick: fetchProperties
        }
    ];
    return (
        <div className="container pb-5">
            <div className="d-flex justify-content-between align-items-center mb-4 mt-4">
                <h2 className="fw-bold" style={{ color: 'var(--primary-dark)' }}>🏠 {t('properties_for_sale')}</h2>
                <span className="text-muted">{t('showing_results', { count: properties.length })}</span>
            </div>

            <SaleSearchFilter filters={saleFilters} currentValues={filters} />

            <div className="row g-4">
                {properties.map((property) => (
                    <SaleCard key={property.id} item={property} />
                ))}
            </div>
        </div>
    );
}
export default Sale;