// D:\realestate\frontend\src\components\common\Filter.js
import React, { useState } from 'react';

const Filter = ({ 
  onFilterChange, 
  onSearch, 
  onReset,
  statusOptions = [],
  dateRange = false,
  showSearch = true,
  placeholder = "Search...",
  initialValues = { search: '', status: 'all', startDate: '', endDate: '' },
  loading = false
}) => {
  const [searchTerm, setSearchTerm] = useState(initialValues.search);
  const [status, setStatus] = useState(initialValues.status);
  const [startDate, setStartDate] = useState(initialValues.startDate);
  const [endDate, setEndDate] = useState(initialValues.endDate);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = () => {
    if (loading) return; // ការពារការចុចច្រើនដង
    if (onSearch) {
      onSearch({ search: searchTerm, status, startDate, endDate });
    }
    if (onFilterChange) {
      onFilterChange({ search: searchTerm, status, startDate, endDate });
    }
  };

  const handleReset = () => {
    if (loading) return;
    setSearchTerm('');
    setStatus('all');
    setStartDate('');
    setEndDate('');
    if (onReset) {
      onReset();
    }
    if (onFilterChange) {
      onFilterChange({ search: '', status: 'all', startDate: '', endDate: '' });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading) {
      handleSearch();
    }
  };

  return (
    <div className="card shadow-sm mb-4 border-0" style={{ borderRadius: '15px' }}>
      <div className="card-body p-3">
        <div className="row g-2 align-items-center">
          {/* Search Input */}
          {showSearch && (
            <div className="col-md-5">
              <div className="input-group">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-search" style={{ color: '#003366' }}></i>
                </span>
                <input
                  type="text"
                  className="form-control border-start-0 ps-0"
                  placeholder={placeholder}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  style={{ boxShadow: 'none' }}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          {/* Status Filter */}
          {statusOptions.length > 0 && (
            <div className="col-md-3">
              <select
                className="form-select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                style={{ borderRadius: '8px' }}
                disabled={loading}
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date Range Toggle */}
          {dateRange && (
            <div className="col-md-auto">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setIsExpanded(!isExpanded)}
                type="button"
                disabled={loading}
              >
                <i className="bi bi-calendar3 me-1"></i>
                {isExpanded ? 'Hide Date' : 'Date Range'}
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="col-md-auto">
            <button
              className="btn btn-primary me-2"
              onClick={handleSearch}
              disabled={loading}
              style={{
                backgroundColor: '#003366',
                borderRadius: '8px',
                padding: '6px 20px',
                minWidth: '100px'
              }}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                  Loading...
                </>
              ) : (
                <>
                  <i className="bi bi-search me-1"></i> Search
                </>
              )}
            </button>
            <button
              className="btn btn-outline-secondary"
              onClick={handleReset}
              disabled={loading}
              style={{ borderRadius: '8px' }}
            >
              <i className="bi bi-arrow-repeat me-1"></i> Reset
            </button>
          </div>
        </div>

        {/* Date Range Picker - Expandable */}
        {dateRange && isExpanded && (
          <div className="row mt-3 pt-2 border-top">
            <div className="col-md-6">
              <label className="form-label small text-muted">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label small text-muted">End Date</label>
              <input
                type="date"
                className="form-control"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Filter;