import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBed, faBath, faRuler } from '@fortawesome/free-solid-svg-icons';

const RecentPropertiesTable = ({ properties, loading = false }) => {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (properties.length === 0) {
    return <div className="text-center py-5 text-muted">No properties found.</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead style={{ backgroundColor: '#f8f9fa' }}>
          <tr>
            <th className="ps-4">Title</th>
            <th>Type</th>
            <th>Price</th>
            <th>Details</th>
            <th className="pe-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((prop) => (
            <tr key={prop.id}>
              <td className="ps-4 fw-semibold">{prop.title}</td>
              <td>
                <span
                  className="badge"
                  style={{
                    backgroundColor: prop.listing_type === 'sale' ? '#003366' : '#ffd700',
                    color: prop.listing_type === 'sale' ? 'white' : '#003366',
                    padding: '6px 12px',
                    borderRadius: '20px',
                  }}
                >
                  {prop.listing_type === 'sale' ? 'For Sale' : 'For Rent'}
                </span>
              </td>
              <td className="fw-bold" style={{ color: 'var(--primary-dark)' }}>
                ${Number(prop.price).toLocaleString()}
              </td>
              <td>
                <div className="d-flex gap-3 small text-muted">
                  {prop.bedrooms > 0 && (
                    <span>
                      <FontAwesomeIcon icon={faBed} className="me-1" /> {prop.bedrooms}
                    </span>
                  )}
                  {prop.bathrooms > 0 && (
                    <span>
                      <FontAwesomeIcon icon={faBath} className="me-1" /> {prop.bathrooms}
                    </span>
                  )}
                  {prop.size_sqm > 0 && (
                    <span>
                      <FontAwesomeIcon icon={faRuler} className="me-1" /> {prop.size_sqm} m²
                    </span>
                  )}
                </div>
              </td>
              <td className="pe-4">
                <span
                  className="badge"
                  style={{
                    backgroundColor:
                      prop.status === 'active'
                        ? '#d4edda'
                        : prop.status === 'sold'
                        ? '#f8d7da'
                        : '#fff3cd',
                    color:
                      prop.status === 'active'
                        ? '#155724'
                        : prop.status === 'sold'
                        ? '#721c24'
                        : '#856404',
                    padding: '5px 12px',
                    borderRadius: '20px',
                  }}
                >
                  {prop.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentPropertiesTable;