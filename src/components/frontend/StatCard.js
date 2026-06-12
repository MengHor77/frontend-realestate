import React from 'react';

const StatCard = ({ title, value, icon, color, trend, loading = false }) => {
  return (
    <div className="card border-0 shadow-sm h-100" style={{ 
      borderRadius: '20px', 
      borderLeft: `4px solid ${color}`,
      transition: 'all 0.3s ease',
      overflow: 'hidden'
    }}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1 small text-uppercase fw-semibold">{title}</p>
            <h2 className="mb-0 fw-bold" style={{ 
              color: 'var(--primary-dark)', 
              fontSize: '32px',
              letterSpacing: '-0.5px'
            }}>
              {loading ? '...' : value}
            </h2>
            {trend && (
              <small className="text-success mt-2 d-block">
                <i className="bi bi-arrow-up-short me-1"></i>
                {trend}
              </small>
            )}
          </div>
          <div className="rounded-circle d-flex align-items-center justify-content-center" style={{ 
            width: '55px', 
            height: '55px', 
            backgroundColor: `${color}15`,
            transition: 'transform 0.3s ease'
          }}>
            <i className={`bi ${icon} fs-3`} style={{ color: color }}></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;