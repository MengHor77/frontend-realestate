// D:\realestate\frontend\src\pages\admin\analytics\Analytics.js
import React, { useState, useEffect } from 'react';
import api from '../../../services/api';

const Analytics = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalInquiries: 0,
    totalNews: 0,
    propertiesForSale: 0,
    propertiesForRent: 0,
    activeProperties: 0,
    unreadInquiries: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [propertiesRes, usersRes, inquiriesRes, newsRes] = await Promise.all([
        api.get('/properties'),
        api.get('/users'),
        api.get('/contact'),
        api.get('/news')
      ]);

      const properties = propertiesRes.data.data || [];
      const users = usersRes.data.data || [];
      const inquiries = inquiriesRes.data.inquiries || [];
      const news = newsRes.data.data || [];

      setStats({
        totalProperties: properties.length,
        totalUsers: users.length,
        totalInquiries: inquiries.length,
        totalNews: news.length,
        propertiesForSale: properties.filter(p => p.type === 'sale').length,
        propertiesForRent: properties.filter(p => p.type === 'rent').length,
        activeProperties: properties.filter(p => p.status === 'active').length,
        unreadInquiries: inquiries.filter(i => i.status === 'unread').length
      });

      // Get recent inquiries for activity
      setRecentActivities(inquiries.slice(0, 5));
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px', borderLeft: `4px solid ${color}` }}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1 small">{title}</p>
            <h3 className="mb-0 fw-bold">{loading ? '...' : value}</h3>
            {trend && <small className="text-success">{trend}</small>}
          </div>
          <div className="rounded-circle p-3" style={{ backgroundColor: `${color}15` }}>
            <i className={`bi ${icon} fs-4`} style={{ color: color }}></i>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
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
          📊 Analytics Dashboard
        </h2>
        <p className="text-muted">Real-time statistics and insights for your real estate platform</p>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <StatCard 
            title="Total Properties" 
            value={stats.totalProperties} 
            icon="bi-building" 
            color="#4f8ef7"
            trend="+12 this month"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon="bi-people" 
            color="#28a745"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Total Inquiries" 
            value={stats.totalInquiries} 
            icon="bi-chat-dots" 
            color="#f5a623"
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="News Articles" 
            value={stats.totalNews} 
            icon="bi-newspaper" 
            color="#17a2b8"
          />
        </div>
      </div>

      {/* Property Statistics */}
      <div className="row g-3 mb-4">
        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
            <div className="card-body">
              <h6 className="text-muted mb-3">Properties by Type</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>For Sale</span>
                <span className="fw-bold">{stats.propertiesForSale}</span>
              </div>
              <div className="progress mb-3" style={{ height: '8px' }}>
                <div className="progress-bar bg-primary" style={{ width: `${(stats.propertiesForSale / stats.totalProperties) * 100}%` }}></div>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>For Rent</span>
                <span className="fw-bold">{stats.propertiesForRent}</span>
              </div>
              <div className="progress" style={{ height: '8px' }}>
                <div className="progress-bar bg-warning" style={{ width: `${(stats.propertiesForRent / stats.totalProperties) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
            <div className="card-body">
              <h6 className="text-muted mb-3">Property Status</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Active</span>
                <span className="fw-bold text-success">{stats.activeProperties}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Inactive/Sold</span>
                <span className="fw-bold text-danger">{stats.totalProperties - stats.activeProperties}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 shadow-sm h-100" style={{ borderRadius: '15px' }}>
            <div className="card-body">
              <h6 className="text-muted mb-3">Inquiry Status</h6>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Unread</span>
                <span className="fw-bold text-danger">{stats.unreadInquiries}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Read/Replied</span>
                <span className="fw-bold text-success">{stats.totalInquiries - stats.unreadInquiries}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
        <div className="card-header bg-white border-0 pt-4 pb-0">
          <h5 className="fw-bold mb-0">Recent Customer Inquiries</h5>
        </div>
        <div className="card-body">
          {recentActivities.length === 0 ? (
            <p className="text-muted text-center py-4">No recent inquiries</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((inquiry) => (
                    <tr key={inquiry.id}>
                      <td>{inquiry.name}</td>
                      <td>{inquiry.email}</td>
                      <td>{inquiry.subject}</td>
                      <td>
                        <span className={`badge bg-${inquiry.status === 'unread' ? 'danger' : inquiry.status === 'read' ? 'warning' : 'success'}`}>
                          {inquiry.status?.toUpperCase()}
                        </span>
                      </td>
                      <td>{new Date(inquiry.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4">
        <div className="alert alert-info border-0" style={{ backgroundColor: '#e3f2fd', borderRadius: '15px' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <i className="bi bi-graph-up fs-4 me-2"></i>
              <strong>Analytics Summary</strong>
              <p className="mb-0 small mt-1">Your platform has {stats.totalProperties} properties, {stats.totalUsers} users, and {stats.totalInquiries} inquiries.</p>
            </div>
            <button className="btn btn-sm btn-primary" onClick={fetchAnalytics}>
              <i className="bi bi-arrow-repeat me-1"></i> Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;