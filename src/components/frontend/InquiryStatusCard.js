import React from 'react';

const InquiryStatusCard = ({ unread, readReplied, total, loading = false }) => {
  const unreadPercent = total ? (unread / total) * 100 : 0;
  const readPercent = total ? (readReplied / total) * 100 : 0;

  return (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '20px', overflow: 'hidden' }}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="text-muted mb-0 fw-semibold">Inquiry Status</h6>
          <i className="bi bi-envelope-paper fs-4" style={{ color: 'var(--primary-dark)' }}></i>
        </div>
        
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <>
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>
                  <span className="badge bg-danger me-2" style={{ width: '10px', height: '10px', padding: '0' }}>
                    &nbsp;&nbsp;
                  </span>
                  Unread
                </span>
                <span className="fw-bold text-danger">{unread}</span>
              </div>
              <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                <div 
                  className="progress-bar bg-danger" 
                  style={{ 
                    width: `${unreadPercent}%`, 
                    borderRadius: '10px'
                  }}
                ></div>
              </div>
            </div>
            
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>
                  <span className="badge bg-success me-2" style={{ width: '10px', height: '10px', padding: '0' }}>
                    &nbsp;&nbsp;
                  </span>
                  Read/Replied
                </span>
                <span className="fw-bold text-success">{readReplied}</span>
              </div>
              <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ 
                    width: `${readPercent}%`, 
                    borderRadius: '10px'
                  }}
                ></div>
              </div>
            </div>
            
            <div className="mt-3 pt-2 border-top">
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted small">Total Inquiries</span>
                <span className="fw-bold" style={{ color: 'var(--primary-dark)' }}>{total}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryStatusCard;