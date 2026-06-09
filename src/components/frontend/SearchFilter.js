import React from 'react';
import { useTranslation } from 'react-i18next';

function SearchFilter({ filters, onSearch }) {
    const { t } = useTranslation();

    return (
        <div className="bg-white p-4 rounded-4 shadow-sm mb-4 border-top" style={{ borderColor: 'var(--gold-color)', borderWidth: '4px' }}>
            <div className="row g-2">
                {filters.map((filter, index) => (
                    <div key={index} className={filter.colClass || "col-md-3"}>
                        {filter.type === 'select' ? (
                            <select className="form-select bg-light border-0 py-2" onChange={filter.onChange}>
                                <option value="">{t(filter.placeholder)}</option>
                                {filter.options.map((opt, i) => (
                                    <option key={i} value={opt.value}>{t(opt.label)}</option>
                                ))}
                            </select>
                        ) : (
                            <button className="btn btn-primary w-100 py-2 fw-bold" onClick={filter.onClick}>
                                {t(filter.label)}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchFilter;