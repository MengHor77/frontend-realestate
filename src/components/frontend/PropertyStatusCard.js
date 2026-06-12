import React from 'react';

const PropertyStatusCard = ({ active, inactive, total, loading = false }) => {
  const activePercent = total ? (active / total) * 100 : 0;

  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '20px', overflow: 'hidden' }}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="text-muted mb-0 fw-semibold">Property Status</h6>
          <i className="bi bi-check-circle-fill fs-4" style={{ color: 'var(--primary-dark)' }}></i>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <>
            <div className="mb-4">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>
                  <span className="badge bg-success me-2" style={{ width: '10px', height: '10px', padding: '0' }}>
                    &nbsp;&nbsp;
                  </span>
                  Active
                </span>
                <span className="fw-bold text-success">{active}</span>
              </div>
              <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ 
                    width: `${activePercent}%`, 
                    borderRadius: '10px'
                  }}
                ></div>
              </div>
            </div>
            
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>
                <span className="badge bg-danger me-2" style={{ width: '10px', height: '10px', padding: '0' }}>
                  &nbsp;&nbsp;
                </span>
                Inactive/Sold
              </span>
              <span className="fw-bold text-danger">{inactive}</span>
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

export default PropertyStatusCard;