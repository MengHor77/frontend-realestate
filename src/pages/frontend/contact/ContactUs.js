import React from 'react';
import { useTranslation } from 'react-i18next';

function ContactUs() {
    const { t } = useTranslation();

    const styles = {
        container: {
            paddingTop: '80px',
            paddingBottom: '60px'
        },
        heroTitle: {
            color: '#003366',
            fontWeight: 'bold'
        },
        goldLine: {
            width: '60px',
            height: '4px',
            backgroundColor: '#ffd700',
            margin: '15px auto'
        },
        infoCard: {
            backgroundColor: '#003366',
            color: 'white',
            borderRadius: '20px'
        },
        goldText: {
            color: '#ffd700'
        },
        formCard: {
            borderRadius: '20px'
        },
        formLabel: {
            fontSize: '12px',
            fontWeight: 'bold'
        },
        formControl: {
            border: 'none',
            backgroundColor: '#f8f9fa',
            padding: '10px'
        },
        submitBtn: {
            backgroundColor: '#003366',
            color: 'white',
            padding: '12px',
            fontWeight: 'bold',
            borderRadius: '30px'
        },
        mapContainer: {
            height: '400px',
            borderRadius: '15px',
            overflow: 'hidden',
            marginTop: '40px'
        },
        socialIcon: {
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            color: '#003366',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'all 0.3s ease'
        }
    };

    return (
        <div className="container" style={styles.container}>
            {/* ១. ចំណងជើងទំព័រ */}
            <div className="text-center mb-5">
                <h1 className="fw-bold" style={styles.heroTitle}>
                    {t('contact_title')}
                </h1>
                <p className="text-muted">
                    {t('contact_subtitle')}
                </p>
                <div style={styles.goldLine}></div>
            </div>

            <div className="row g-5">
                {/* ២. ផ្នែកព័ត៌មានទំនាក់ទំនង (ឆ្វេង) */}
                <div className="col-lg-5">
                    <div className="card border-0 shadow-sm p-4 h-100" style={styles.infoCard}>
                        <h3 className="fw-bold mb-4" style={styles.goldText}>
                            {t('contact_details')}
                        </h3>

                        <div className="d-flex align-items-center mb-4">
                            <div className="fs-3 me-3">📍</div>
                            <div>
                                <h6 className="fw-bold mb-1">{t('address_label')}</h6>
                                <p className="mb-0 opacity-75 small">{t('address_value')}</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <div className="fs-3 me-3">📞</div>
                            <div>
                                <h6 className="fw-bold mb-1">{t('phone_label')}</h6>
                                <p className="mb-0 opacity-75 small">+855 12 345 678 / +855 98 765 432</p>
                            </div>
                        </div>

                        <div className="d-flex align-items-center mb-4">
                            <div className="fs-3 me-3">✉️</div>
                            <div>
                                <h6 className="fw-bold mb-1">{t('email_label')}</h6>
                                <p className="mb-0 opacity-75 small">info@realestate-cambodia.com</p>
                            </div>
                        </div>

                        <div className="mt-auto">
                            <h6 className="fw-bold mb-3" style={styles.goldText}>
                                {t('follow_us')}
                            </h6>
                            <div className="d-flex gap-3">
                                <a href="#" className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center text-decoration-none" style={styles.socialIcon}>
                                    f
                                </a>
                                <a href="#" className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center text-decoration-none" style={styles.socialIcon}>
                                    t
                                </a>
                                <a href="#" className="rounded-circle bg-white text-dark d-flex align-items-center justify-content-center text-decoration-none" style={styles.socialIcon}>
                                    in
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ៣. ផ្នែក Form ផ្ញើសារ (ស្តាំ) */}
                <div className="col-lg-7">
                    <div className="card border-0 shadow-sm p-4 p-md-5" style={styles.formCard}>
                        <h3 className="fw-bold mb-4" style={styles.heroTitle}>
                            {t('send_message_title')}
                        </h3>
                        <form onSubmit={(e) => e.preventDefault()}>
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold">{t('full_name_label')}</label>
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-light py-2"
                                        placeholder={t('full_name_placeholder')}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label text-muted small fw-bold">{t('phone_label')}</label>
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-light py-2"
                                        placeholder="012 345 678"
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted small fw-bold">{t('subject_label')}</label>
                                    <input
                                        type="text"
                                        className="form-control border-0 bg-light py-2"
                                        placeholder={t('subject_placeholder')}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label text-muted small fw-bold">{t('message_label')}</label>
                                    <textarea
                                        className="form-control border-0 bg-light py-2"
                                        rows="5"
                                        placeholder={t('message_placeholder')}
                                    ></textarea>
                                </div>
                                <div className="col-12 mt-4">
                                    <button
                                        type="submit"
                                        className="btn w-100 py-3 fw-bold rounded-pill shadow-sm"
                                        style={styles.submitBtn}
                                    >
                                        {t('send_button')} 🚀
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* ៤. ផ្នែកផែនទី (Google Map Embed) */}
            <div style={styles.mapContainer}>
                <iframe
                    title="Real Estate Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3908.7706606014493!2d104.92131931533221!3d11.568297791787132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3109513361225571%3A0xc3f87c9f80720612!2sIndependence%20Monument!5e0!3m2!1sen!2skh!4v1654161600000!5m2!1sen!2skh"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}

export default ContactUs;