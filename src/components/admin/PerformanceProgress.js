import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';

const PerformanceProgress = ({ soldPercentage = 42, rentedPercentage = 28, activePercentage = 30, loading = false }) => {
  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border spinner-border-sm text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-3">
        <div className="d-flex justify-content-between mb-1">
          <small>Properties Sold</small>
          <small className="fw-bold">{soldPercentage}%</small>
        </div>
        <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${soldPercentage}%`, backgroundColor: 'var(--primary-dark)' }}
          ></div>
        </div>
      </div>
      <div className="mb-3">
        <div className="d-flex justify-content-between mb-1">
          <small>Properties Rented</small>
          <small className="fw-bold">{rentedPercentage}%</small>
        </div>
        <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${rentedPercentage}%`, backgroundColor: 'var(--gold-color)' }}
          ></div>
        </div>
      </div>
      <div className="mb-0">
        <div className="d-flex justify-content-between mb-1">
          <small>Active Listings</small>
          <small className="fw-bold">{activePercentage}%</small>
        </div>
        <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${activePercentage}%`, backgroundColor: '#0d6efd' }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PerformanceProgress;