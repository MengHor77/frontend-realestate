import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const RentSearchFilter = ({ onSearch, totalCount = 0 }) => {
    const { t } = useTranslation();
    const [filters, setFilters] = useState({
        location: '',
        type: '',
        price_range: ''
    });

    const handleFilterChange = (field, value) => {
        const newFilters = { ...filters, [field]: value };
        setFilters(newFilters);
        if (onSearch) {
            onSearch(newFilters);
        }
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(filters);
        }
    };

    const handleReset = () => {
        const resetFilters = { location: '', type: '', price_range: '' };
        setFilters(resetFilters);
        if (onSearch) {
            onSearch(resetFilters);
        }
    };

    return (
        <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-top"
            style={{ borderColor: 'var(--gold-color)', borderWidth: '4px' }}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
                <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>
                    🔑 {t('properties_for_rent')}
                </h2>
                <span className="text-muted mt-2 mt-md-0">
                    {t('available_units_count', { count: totalCount })}
                </span>
            </div>

            <div className="row g-2">
                <div className="col-md-3">
                    <select 
                        className="form-select bg-light border-0 py-2"
                        value={filters.location}
                        onChange={(e) => handleFilterChange('location', e.target.value)}>
                        <option value="">{t('location_district')}</option>
                        <option value="BKK">{t('bkk')}</option>
                        <option value="Toul Kork">{t('toul_kork')}</option>
                        <option value="Chamkarmon">{t('chamkarmon')}</option>
                        <option value="Chbar Ampov">{t('chbar_ampov')}</option>
                        <option value="Sen Sok">{t('sensokh')}</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select 
                        className="form-select bg-light border-0 py-2"
                        value={filters.type}
                        onChange={(e) => handleFilterChange('type', e.target.value)}>
                        <option value="">{t('room_type')}</option>
                        <option value="condo">{t('condo')}</option>
                        <option value="apartment">{t('apartment')}</option>
                        <option value="villa">{t('villa')}</option>
                        <option value="flat">{t('flat')}</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <select 
                        className="form-select bg-light border-0 py-2"
                        value={filters.price_range}
                        onChange={(e) => handleFilterChange('price_range', e.target.value)}>
                        <option value="">{t('monthly_rent')}</option>
                        <option value="0-300">{t('under_300')}</option>
                        <option value="300-800">{t('300_800')}</option>
                        <option value="800-2000">{t('800_2000')}</option>
                        <option value="2000-999999">{t('over_2000')}</option>
                    </select>
                </div>
                <div className="col-md-3">
                    <div className="d-flex gap-2">
                        <button className="btn btn-primary w-100 py-2 fw-bold" onClick={handleSearch}>
                            {t('search_btn')}
                        </button>
                        <button className="btn btn-outline-secondary w-100 py-2 fw-bold" onClick={handleReset}>
                            {t('reset')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RentSearchFilter;