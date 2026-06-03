import React from 'react';
import { useTranslation } from 'react-i18next';

function HeroSection() {
    const { t } = useTranslation();

    return (
        <section 
            className="hero-section text-white d-flex align-items-center py-5"
            style={{
                background: 'linear-gradient(rgba(0, 51, 102, 0.5), rgba(0, 51, 102, 0.8)), url("https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1073&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '85vh',
                marginTop: '-75px', // Pulls the background image up to eliminate the white bar
                paddingTop: '120px' // Pushes text content down safely below the header elements
            }}
        >
            <div className="container text-center">
                <h1 className="display-3 fw-bold mb-3">{t('hero_title')}</h1>
                <p className="lead mb-5 opacity-75">{t('hero_subtitle')}</p>

                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="bg-white p-3 rounded-4 shadow-lg d-flex flex-column flex-md-row gap-2">
                            <input 
                                type="text" 
                                className="form-control border-0 py-3" 
                                placeholder={t('search_placeholder')} 
                            />
                            <select className="form-select border-0 text-dark">
                                <option>{t('all_types')}</option>
                                <option>{t('sale')}</option>
                                <option>{t('rent')}</option>
                            </select>
                            <button className="btn btn-primary px-5 fw-bold rounded-3 py-3">
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