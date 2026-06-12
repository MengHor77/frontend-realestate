import React, { useState, useEffect, useCallback } from 'react';
import Filter from '../../../components/admin/Filter';
import api from '../../../services/api';

const ManageInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
    replied: 0
  });
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    startDate: '',
    endDate: ''
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'unread', label: 'Unread' },
    { value: 'read', label: 'Read' },
    { value: 'replied', label: 'Replied' }
  ];

  // Fetch inquiries function wrapped in useCallback
  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: page + 1,
        limit: rowsPerPage
      };

      if (filters.status !== 'all') {
        params.status = filters.status;
      }

      if (filters.search) {
        params.search = filters.search;
      }

      const response = await api.get('/contact', { params });

      if (response.data) {
        setInquiries(response.data.inquiries || []);
        setTotalCount(response.data.total || 0);
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoading(false);
    }
  }, [page, rowsPerPage, filters]);

  // Fetch stats function
  const fetchStats = useCallback(async () => {
    try {
      const response = await api.get('/contact', { params: { limit: 1000 } });
      if (response.data && response.data.inquiries) {
        const allInquiries = response.data.inquiries;
        setStats({
          total: allInquiries.length,
          unread: allInquiries.filter(i => i.status === 'unread').length,
          read: allInquiries.filter(i => i.status === 'read').length,
          replied: allInquiries.filter(i => i.status === 'replied').length
        });
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }, []);

  // Effect for fetching inquiries
  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  // Effect for fetching stats
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const handleResetFilters = () => {
    setFilters({ search: '', status: 'all', startDate: '', endDate: '' });
    setPage(0);
  };

  const handleViewInquiry = async (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);

    if (inquiry.status === 'unread') {
      try {
        await api.put(`/contact/${inquiry.id}/status`, { status: 'read' });
        await fetchInquiries();
        await fetchStats();
      } catch (err) {
        console.error('Error marking as read:', err);
      }
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) {
      alert('Please enter a reply message');
      return;
    }

    try {
      await api.put(`/contact/${selectedInquiry.id}/status`, { status: 'replied' });
      alert('Reply sent successfully!');
      setShowReplyModal(false);
      setReplyMessage('');
      fetchInquiries();
      fetchStats();
    } catch (err) {
      console.error('Error sending reply:', err);
      alert('Failed to send reply');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await api.delete(`/contact/${id}`);
        alert('Inquiry deleted successfully');
        fetchInquiries();
        fetchStats();
      } catch (err) {
        console.error('Error deleting inquiry:', err);
        alert('Failed to delete inquiry');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'unread':
        return <span className="badge bg-danger">UNREAD</span>;
      case 'read':
        return <span className="badge bg-warning">READ</span>;
      case 'replied':
        return <span className="badge bg-success">REPLIED</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };

  if (loading && inquiries.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid ">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: '#003366' }}>
          📩 Customer Inquiries Management
        </h2>
        <p className="text-muted">Manage and respond to customer inquiries from the contact form</p>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Total Inquiries</h6>
                  <h2 className="mb-0">{stats.total}</h2>
                </div>
                <i className="bi bi-envelope fs-1"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Unread</h6>
                  <h2 className="mb-0">{stats.unread}</h2>
                </div>
                <i className="bi bi-envelope-exclamation fs-1"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Read</h6>
                  <h2 className="mb-0">{stats.read}</h2>
                </div>
                <i className="bi bi-eye fs-1"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="card-title">Replied</h6>
                  <h2 className="mb-0">{stats.replied}</h2>
                </div>
                <i className="bi bi-reply fs-1"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Component */}
      <Filter
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        statusOptions={statusOptions}
        showSearch={true}
        placeholder="Search by name, email, or subject..."
        initialValues={filters}
      />

      {/* Inquiries Table */}
      <div className="card shadow-sm border-0" style={{ borderRadius: '15px' }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th className="py-3 px-4">ID</th>
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    className="border-bottom"
                  >
                    <td className="py-3 px-4">#{inquiry.id}</td>
                    <td className="py-3 px-4">
                      <strong>{inquiry.name}</strong><br />
                      <small className="text-muted">{inquiry.email}</small>
                      {inquiry.phone && <small className="text-muted d-block">{inquiry.phone}</small>}
                    </td>
                    <td className="py-3 px-4">
                      <span className="fw-semibold">{inquiry.subject || 'No subject'}</span>
                    </td>
                    <td className="py-3 px-4">
                      {inquiry.message?.length > 50 ? `${inquiry.message.substring(0, 50)}...` : inquiry.message}
                    </td>
                    <td className="py-3 px-4">{getStatusBadge(inquiry.status)}</td>
                    <td className="py-3 px-4">{formatDate(inquiry.created_at)}</td>
                    <td className="py-3 px-4 text-center">
                      {/* View Button */}
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleViewInquiry(inquiry)}
                        style={{ borderRadius: '8px' }}
                        title="View Details"
                      >
                        <i className="bi bi-eye"></i> View
                      </button>
                      {/* Delete Button */}
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(inquiry.id)}
                        style={{ borderRadius: '8px' }}
                        title="Delete Inquiry"
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {inquiries.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-5">
                      <i className="bi bi-inbox fs-1 text-muted"></i>
                      <p className="text-muted mt-2 mb-0">No inquiries found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <div>
              <select
                className="form-select form-select-sm"
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(parseInt(e.target.value));
                  setPage(0);
                }}
                style={{ width: 'auto', borderRadius: '8px' }}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>
            <div>
              <button
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => setPage(Math.max(0, page - 1))}
                disabled={page === 0}
                style={{ borderRadius: '8px' }}
              >
                <i className="bi bi-chevron-left"></i> Previous
              </button>
              <span className="mx-2 text-muted">
                Page {page + 1} of {Math.ceil(totalCount / rowsPerPage) || 1}
              </span>
              <button
                className="btn btn-sm btn-outline-secondary ms-2"
                onClick={() => setPage(page + 1)}
                disabled={page + 1 >= Math.ceil(totalCount / rowsPerPage)}
                style={{ borderRadius: '8px' }}
              >
                Next <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View Inquiry Modal */}
      {showModal && selectedInquiry && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }} onClick={() => setShowModal(false)}>
          <div className="modal-dialog modal-lg" style={{ marginTop: '50px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ borderRadius: '15px' }}>
              <div className="modal-header" style={{ borderBottom: '2px solid #ffd700' }}>
                <h5 className="modal-title">
                  Inquiry Details #{selectedInquiry.id}
                  <span className="ms-2">{getStatusBadge(selectedInquiry.status)}</span>
                </h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <h6 className="text-primary mb-3">Customer Information</h6>
                  <div className="border rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
                    <p className="mb-2"><strong>Name:</strong> {selectedInquiry.name}</p>
                    <p className="mb-2"><strong>Email:</strong> {selectedInquiry.email}</p>
                    {selectedInquiry.phone && <p className="mb-0"><strong>Phone:</strong> {selectedInquiry.phone}</p>}
                  </div>
                </div>

                <div className="mb-3">
                  <h6 className="text-primary mb-3">Message Details</h6>
                  <div className="border rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
                    <p className="mb-2"><strong>Subject:</strong> {selectedInquiry.subject || 'No subject'}</p>
                    <p className="mb-2"><strong>Date:</strong> {formatDate(selectedInquiry.created_at)}</p>
                    <p className="mb-0"><strong>Message:</strong></p>
                    <div className="bg-white p-3 rounded mt-2" style={{ border: '1px solid #dee2e6' }}>
                      {selectedInquiry.message}
                    </div>
                  </div>
                </div>

                {/* Property Info if exists */}
                {selectedInquiry.property_title && (
                  <div className="mb-3">
                    <h6 className="text-primary mb-3">Property Information</h6>
                    <div className="border rounded p-3" style={{ backgroundColor: '#f8f9fa' }}>
                      <p className="mb-0"><strong>Property:</strong> {selectedInquiry.property_title}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                {selectedInquiry.status !== 'replied' && (
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      setShowModal(false);
                      setShowReplyModal(true);
                    }}
                  >
                    <i className="bi bi-reply me-2"></i>Reply to Customer
                  </button>
                )}
                <button
                  className="btn btn-success"
                  onClick={() => {
                    api.put(`/contact/${selectedInquiry.id}/status`, { status: 'replied' })
                      .then(() => {
                        fetchInquiries();
                        fetchStats();
                        alert('Marked as replied');
                        setShowModal(false);
                      });
                  }}
                >
                  <i className="bi bi-check-circle me-2"></i>Mark as Replied
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {showReplyModal && selectedInquiry && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 1050 }} onClick={() => setShowReplyModal(false)}>
          <div className="modal-dialog modal-lg" style={{ marginTop: '50px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={{ borderRadius: '15px' }}>
              <div className="modal-header" style={{ borderBottom: '2px solid #ffd700' }}>
                <h5 className="modal-title">Reply to Customer</h5>
                <button type="button" className="btn-close" onClick={() => setShowReplyModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="alert alert-info">
                  <strong>To:</strong> {selectedInquiry.email}<br />
                  <strong>Subject:</strong> Re: {selectedInquiry.subject || 'Inquiry about property'}
                </div>
                <textarea
                  className="form-control"
                  rows="8"
                  placeholder="Type your reply message here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  style={{ borderRadius: '10px' }}
                ></textarea>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowReplyModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleReply}>
                  <i className="bi bi-send me-2"></i>Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageInquiries;