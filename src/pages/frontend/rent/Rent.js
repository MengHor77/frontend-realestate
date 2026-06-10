import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import RentCard from '../../../components/frontend/RentCard';
import RentSearchFilter from '../../../components/frontend/RentSearchFilter';

function Rent() {
    const { t } = useTranslation();
    const [rentList, setRentList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);

    const fetchRentProperties = async (searchFilters = {}) => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            
            if (searchFilters.location) params.append('location', searchFilters.location);
            if (searchFilters.type) params.append('type', searchFilters.type);
            if (searchFilters.price_range) params.append('price_range', searchFilters.price_range);
            
            const url = `http://localhost:5000/api/properties/rent-search${params.toString() ? `?${params.toString()}` : ''}`;
            const response = await axios.get(url);
            
            setRentList(response.data.properties || []);
            setTotalCount(response.data.total || 0);
        } catch (error) {
            console.error("Error fetching rent properties:", error);
            setRentList([]);
            setTotalCount(0);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (newFilters) => {
        fetchRentProperties(newFilters);
    };

    useEffect(() => {
        fetchRentProperties();
    }, []);

    return (
        <div className="container mt-4 pb-4" style={{ paddingTop: '50px' }}>
            <RentSearchFilter onSearch={handleSearch} totalCount={totalCount} />

            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : rentList.length > 0 ? (
                <div className="row g-4">
                    {rentList.map((item) => (
                        <div className="col-12 col-md-6 col-lg-4" key={item.id}>
                            <RentCard item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-5">
                    <p className="text-muted">{t('no_properties_found')}</p>
                </div>
            )}
        </div>
    );
}

export default Rent;