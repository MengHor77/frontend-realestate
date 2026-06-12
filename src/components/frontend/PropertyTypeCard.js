import React from 'react';

const PropertyTypeCard = ({ forSale, forRent, total, loading = false }) => {
  const forSalePercent = total ? (forSale / total) * 100 : 0;
  const forRentPercent = total ? (forRent / total) * 100 : 0;

  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '20px', overflow: 'hidden' }}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="text-muted mb-0 fw-semibold">Properties by Type</h6>
          <i className="bi bi-pie-chart fs-4" style={{ color: 'var(--primary-dark)' }}></i>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>
                  <i className="bi bi-tag-fill me-2" style={{ color: '#4f8ef7', fontSize: '12px' }}></i>
                  For Sale
                </span>
                <span className="fw-bold" style={{ color: 'var(--primary-dark)' }}>{forSale}</span>
              </div>
              <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                <div 
                  className="progress-bar" 
                  style={{ 
                    width: `${forSalePercent}%`, 
                    backgroundColor: '#4f8ef7',
                    borderRadius: '10px'
                  }}
                ></div>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>
                  <i className="bi bi-house-fill me-2" style={{ color: '#f5a623', fontSize: '12px' }}></i>
                  For Rent
                </span>
                <span className="fw-bold" style={{ color: 'var(--primary-dark)' }}>{forRent}</span>
              </div>
              <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                <div 
                  className="progress-bar bg-warning" 
                  style={{ 
                    width: `${forRentPercent}%`, 
                    borderRadius: '10px'
                  }}
                ></div>
              </div>
            </div>
            
            <div className="mt-3 pt-2 border-top">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">Total Properties</span>
                <span className="fw-bold" style={{ color: 'var(--primary-dark)' }}>{total}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyTypeCard;