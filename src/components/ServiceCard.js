import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // ១. ថែមនេះ

function ServiceCard({ title, icon, link, color, description }) {
    const { t } = useTranslation(); // ២. ហៅ Hook មកប្រើ

    return (
        <div className="col-md-4">
            <Link to={link} className="text-decoration-none">
                <div className="p-5 rounded-4 shadow-sm border bg-white card-hover h-100">
                    <div className="fs-1 mb-3">{icon}</div>
                    <h4 className="fw-bold text-dark">{title}</h4>
                    {/* ៣. កែសម្រួល description: 
                       ប្រសិនបើគ្មាន description បោះមកពី Home ទេ វានឹងប្រើអត្ថបទលំនាំដើមដែលបកប្រែតាមភាសា
                    */}
                    <p className="text-muted">
                        {description || t('default_service_desc')}
                    </p>
                </div>
            </Link>
        </div>
    );
}

export default ServiceCard;