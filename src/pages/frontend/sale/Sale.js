import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import SaleCard from '../../../components/frontend/SaleCard';
import SaleSearchFilter from '../../../components/frontend/SaleSearchFilter';

function Sale() {
    const { t } = useTranslation();
    const [properties, setProperties] = useState([]);
    const [filters, setFilters] = useState({ location: '', type: '', price_range: '' });
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalResults, setTotalResults] = useState(0);

    const fetchProperties = useCallback(async (resetPage = false) => {
        setLoading(true);
        try {
            const pageToFetch = resetPage ? 1 : page;
            const res = await axios.get('http://localhost:5000/api/properties/sale', {
                params: { ...filters, page: pageToFetch, limit: 12 }
            });

            setProperties(prev => resetPage ? res.data.properties : [...prev, ...res.data.properties]);
            setTotalPages(res.data.totalPages);
            setTotalResults(res.data.total || 0);
            if (resetPage) setPage(1);
        } catch (err) {
            console.error("Error fetching properties:", err);
        } finally {
            setLoading(false);
        }
    }, [filters, page]);

    useEffect(() => {
        fetchProperties(true);
    }, [fetchProperties]);

    const saleFilters = [
        { key: 'location', type: 'select', placeholder: 'all_locations', colClass: 'col-md-3', options: [{ value: 'Phnom Penh', label: 'phnom_penh' }, { value: 'Kandal', label: 'kandal' }], onChange: (e) => setFilters(prev => ({ ...prev, location: e.target.value })) },
        { key: 'type', type: 'select', placeholder: 'property_type', colClass: 'col-md-3', options: [{ value: 'villa', label: 'villa' }, { value: 'flat', label: 'flate' }, { value: 'condo', label: 'condo' }, { value: 'land', label: 'land' }], onChange: (e) => setFilters(prev => ({ ...prev, type: e.target.value })) },
        { key: 'price_range', type: 'select', placeholder: 'price_range', colClass: 'col-md-4', options: [{ value: '0-50000', label: 'under_50k' }, { value: '50000-100000', label: '50k_100k' }, { value: '100000-200000', label: '100k_200k' }, { value: '200001-999999999', label: 'above_200k' }], onChange: (e) => setFilters(prev => ({ ...prev, price_range: e.target.value })) },
        { type: 'button', label: 'search_btn', colClass: 'col-md-2', onClick: () => fetchProperties(true) }
    ];

    return (
        <div className="container mt-4 pb-4"  style={{ paddingTop: '50px' }}>
            {/* ១. ផ្នែកចំណងជើង និង Filter (ស្ទីលដូចទំព័រជួល) */}
            <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-top" style={{ borderColor: 'var(--gold-color)', borderWidth: '4px' }}>
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                    <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>
                        🔑 {t('properties_for_sale')}
                    </h2>
                    <span className="text-muted mt-2 mt-md-0">
                        {t('available_units_count', { count: totalResults })}
                    </span>
                </div>

                <SaleSearchFilter filters={saleFilters} currentValues={filters} />
            </div>

            {/* ២. បញ្ជីកាតសម្រាប់លក់ */}
            <div className="row g-4 pe-2 pb-3 custom-scroll-area">
                {properties.map((p) => (
                    <SaleCard key={`${p.id}-${p.created_at}`} item={p} />
                ))}
            </div>

            {/* ៣. ប៊ូតុង Load More */}
            {page < totalPages && !loading && (
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={() => setPage(p => p + 1)}>
                        {t('load_more')}
                    </button>
                </div>
            )}

            {loading && <div className="text-center mt-4"><p>{t('loading')}...</p></div>}
        </div>
    );
}

export default Sale;