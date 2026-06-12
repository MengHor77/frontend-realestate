import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import StatCard from '../../../components/frontend/StatCard';
import PropertyTypeCard from '../../../components/frontend/PropertyTypeCard';
import PropertyStatusCard from '../../../components/frontend/PropertyStatusCard';
import InquiryStatusCard from '../../../components/frontend/InquiryStatusCard';

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
      
      const [propertiesRes, usersRes, inquiriesRes, newsRes] = await Promise.all([
        api.get('/properties'),
        api.get('/users'),
        api.get('/contact'),
        api.get('/news')
      ]);

      const properties = propertiesRes.data.properties || propertiesRes.data.data || [];
      const users = usersRes.data.users || usersRes.data.data || [];
      const inquiries = inquiriesRes.data.inquiries || inquiriesRes.data || [];
      const news = newsRes.data.news || newsRes.data.data || [];

      setStats({
        totalProperties: properties.length,
        totalUsers: users.length,
        totalInquiries: inquiries.length,
        totalNews: news.length,
        propertiesForSale: properties.filter(p => p.listing_type === 'sale' || p.type === 'sale').length,
        propertiesForRent: properties.filter(p => p.listing_type === 'rent' || p.type === 'rent').length,
        activeProperties: properties.filter(p => p.status === 'active').length,
        unreadInquiries: inquiries.filter(i => i.status === 'unread').length
      });

      setRecentActivities(inquiries.slice(0, 5));
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

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
    <div className="container-fluid">
      {/* Header */}
      <div className="mb-4">
        <h2 className="fw-bold" style={{ color: 'var(--primary-dark)' }}>
          📊 Analytics Dashboard
        </h2>
        <p className="text-muted">Real-time statistics and insights for your real estate platform</p>
      </div>

      {/* Statistics Cards Row */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <StatCard 
            title="Total Properties" 
            value={stats.totalProperties} 
            icon="bi-building" 
            color="#4f8ef7"
            trend="+12 this month"
            loading={loading}
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Total Users" 
            value={stats.totalUsers} 
            icon="bi-people" 
            color="#28a745"
            loading={loading}
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="Total Inquiries" 
            value={stats.totalInquiries} 
            icon="bi-chat-dots" 
            color="#f5a623"
            loading={loading}
          />
        </div>
        <div className="col-md-3">
          <StatCard 
            title="News Articles" 
            value={stats.totalNews} 
            icon="bi-newspaper" 
            color="#17a2b8"
            loading={loading}
          />
        </div>
      </div>

      {/* Analytics Cards Row */}
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <PropertyTypeCard 
            forSale={stats.propertiesForSale}
            forRent={stats.propertiesForRent}
            total={stats.totalProperties}
            loading={loading}
          />
        </div>
        <div className="col-md-4">
          <PropertyStatusCard 
            active={stats.activeProperties}
            inactive={stats.totalProperties - stats.activeProperties}
            total={stats.totalProperties}
            loading={loading}
          />
        </div>
        <div className="col-md-4">
          <InquiryStatusCard 
            unread={stats.unreadInquiries}
            readReplied={stats.totalInquiries - stats.unreadInquiries}
            total={stats.totalInquiries}
            loading={loading}
          />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card border-0 shadow-sm" style={{ borderRadius: '20px' }}>
        <div className="card-header bg-white border-0 pt-4 pb-0 px-4">
          <h5 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>
            <i className="bi bi-clock-history me-2"></i>
            Recent Customer Inquiries
          </h5>
        </div>
        <div className="card-body p-0">
          <div className="custom-scroll-area" style={{ maxHeight: '400px' }}>
            {recentActivities.length === 0 ? (
              <p className="text-muted text-center py-4">No recent inquiries</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr style={{ backgroundColor: '#f8f9fa' }}>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Subject</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map((inquiry) => (
                      <tr key={inquiry.id}>
                        <td className="py-3 px-4 fw-semibold">{inquiry.name}</td>
                        <td className="py-3 px-4">{inquiry.email}</td>
                        <td className="py-3 px-4">{inquiry.subject || 'No subject'}</td>
                        <td className="py-3 px-4">
                          <span className={`badge bg-${inquiry.status === 'unread' ? 'danger' : inquiry.status === 'read' ? 'warning' : 'success'}`}>
                            {inquiry.status?.toUpperCase() || 'UNREAD'}
                          </span>
                        </td>
                        <td className="py-3 px-4">{new Date(inquiry.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4">
        <div className="alert border-0" style={{ backgroundColor: '#e3f2fd', borderRadius: '20px' }}>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <i className="bi bi-graph-up fs-4 me-2" style={{ color: 'var(--primary-dark)' }}></i>
              <strong style={{ color: 'var(--primary-dark)' }}>Analytics Summary</strong>
              <p className="mb-0 small mt-1 text-muted">
                Your platform has {stats.totalProperties} properties, {stats.totalUsers} users, and {stats.totalInquiries} inquiries.
              </p>
            </div>
            <button 
              className="btn btn-sm" 
              onClick={fetchAnalytics}
              style={{ backgroundColor: 'var(--primary-dark)', color: 'var(--gold-color)' }}
            >
              <i className="bi bi-arrow-repeat me-1"></i> Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;