// HeroSection.jsx
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function HeroSection({ onSearch }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState("");
    const [type, setType] = useState("");

    return (
        <section className="hero-section text-white d-flex align-items-center"
            style={{
                background: 'linear-gradient(rgba(0, 51, 102, 0.7), rgba(0, 51, 102, 0.9)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '70vh'
            }}>
            <div className="container text-center py-5">
                <h1 className="display-4 fw-bold mb-3">{t('hero_title')}</h1>
                <p className="lead mb-5">{t('hero_subtitle')}</p>
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="bg-white p-2 rounded-4 shadow d-flex flex-column flex-md-row gap-2">
                            <input type="text" className="form-control border-0 py-3"
                                placeholder={t('search_placeholder')}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)} />
                            <select className="form-select border-0 w-auto"
                                value={type}
                                onChange={(e) => setType(e.target.value)}>
                                <option value="">{t('all_types')}</option>
                                <option value="sale">{t('sale')}</option>
                                <option value="rent">{t('rent')}</option>
                            </select>
                            <button className="btn btn-primary px-4 fw-bold"
                                onClick={() => onSearch(searchTerm, type)}>
                                {t('search_btn')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;