import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

const DashboardStatCard = ({ title, value, icon, color, trend, loading = false }) => {
  return (
    <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '20px', transition: 'transform 0.3s ease' }}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1 small fw-semibold text-uppercase">{title}</p>
            <h2 className="display-6 fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>
              {loading ? '...' : (typeof value === 'number' ? value.toLocaleString() : value)}
            </h2>
            {trend && !loading && (
              <p className="mb-0 mt-2 small">
                <span className="text-success">
                  <FontAwesomeIcon icon={faArrowUp} className="me-1" />
                  {trend}
                </span>
                <span className="text-muted ms-1">vs last month</span>
              </p>
            )}
          </div>
          <div
            className="rounded-circle d-flex align-items-center justify-content-center"
            style={{
              width: '48px',
              height: '48px',
              backgroundColor: color,
              color: 'white',
              fontSize: '24px',
              transition: 'transform 0.3s ease',
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStatCard;