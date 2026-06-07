import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faDollarSign,
  faUser,
  faEye,
  faBed,
  faBath,
  faRuler,
  faArrowUp,
  faArrowDown,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalUsers: 0,
    totalViews: 0,
    revenue: 0,
    trend: '+12%',
  });
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch properties for stats and recent list
      const res = await api.get('/properties');
      const properties = res.data.properties || [];

      // Calculate stats
      const total = properties.length;
      const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);
      const recent = properties.slice(0, 5);

      setStats({
        totalProperties: total,
        totalUsers: 128, // mock, replace with actual user count from API
        totalViews: 3450,
        revenue: totalValue,
        trend: '+18%',
      });
      setRecentProperties(recent);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, trend }) => (
    <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: '20px' }}>
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <p className="text-muted mb-1 small fw-semibold text-uppercase">{title}</p>
            <h2 className="display-6 fw-bold mb-0" style={{ color: 'var(--primary-dark)' }}>
              {typeof value === 'number' ? value.toLocaleString() : value}
            </h2>
            {trend && (
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
            }}
          >
            <FontAwesomeIcon icon={icon} />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding: '20px', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="display-6 fw-bold" style={{ color: 'var(--primary-dark)' }}>
            Dashboard
          </h1>
          <p className="text-muted">Welcome back! Here's what's happening with your real estate platform.</p>
        </div>
        <div>
          <span className="badge bg-gold px-3 py-2">
            <FontAwesomeIcon icon={faChartLine} className="me-2" />
            Last 30 days
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row g-4 mb-5">
        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Total Properties"
            value={stats.totalProperties}
            icon={faBuilding}
            color="#003366"
            trend={stats.trend}
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Total Value"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={faDollarSign}
            color="#ffd700"
            trend="+8%"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Active Users"
            value={stats.totalUsers}
            icon={faUser}
            color="#0d6efd"
            trend="+5%"
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <StatCard
            title="Total Views"
            value={stats.totalViews}
            icon={faEye}
            color="#28a745"
            trend="+32%"
          />
        </div>
      </div>

      {/* Charts & Recent Activity */}
      <div className="row g-4">
        {/* Recent Properties Table */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-header bg-white border-0 pt-4 pb-0">
              <h5 className="fw-bold" style={{ color: 'var(--primary-dark)' }}>
                <FontAwesomeIcon icon={faBuilding} className="me-2" />
                Recently Added Properties
              </h5>
            </div>
            <div className="card-body p-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : recentProperties.length === 0 ? (
                <div className="text-center py-5 text-muted">No properties found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover align-middle mb-0">
                    <thead style={{ backgroundColor: '#f8f9fa' }}>
                      <tr>
                        <th className="ps-4">Title</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Details</th>
                        <th className="pe-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentProperties.map((prop) => (
                        <tr key={prop.id}>
                          <td className="ps-4 fw-semibold">{prop.title}</td>
                          <td>
                            <span
                              className="badge"
                              style={{
                                backgroundColor:
                                  prop.type === 'sale' ? '#003366' : '#ffd700',
                                color: prop.type === 'sale' ? 'white' : '#003366',
                                padding: '6px 12px',
                                borderRadius: '20px',
                              }}
                            >
                              {prop.type === 'sale' ? 'For Sale' : 'For Rent'}
                            </span>
                          </td>
                          <td className="fw-bold" style={{ color: 'var(--primary-dark)' }}>
                            ${Number(prop.price).toLocaleString()}
                          </td>
                          <td>
                            <div className="d-flex gap-3 small text-muted">
                              {prop.bedrooms > 0 && (
                                <span>
                                  <FontAwesomeIcon icon={faBed} className="me-1" /> {prop.bedrooms}
                                </span>
                              )}
                              {prop.bathrooms > 0 && (
                                <span>
                                  <FontAwesomeIcon icon={faBath} className="me-1" /> {prop.bathrooms}
                                </span>
                              )}
                              {prop.size_sqm > 0 && (
                                <span>
                                  <FontAwesomeIcon icon={faRuler} className="me-1" /> {prop.size_sqm} m²
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="pe-4">
                            <span
                              className="badge"
                              style={{
                                backgroundColor:
                                  prop.status === 'active'
                                    ? '#d4edda'
                                    : prop.status === 'sold'
                                    ? '#f8d7da'
                                    : '#fff3cd',
                                color:
                                  prop.status === 'active'
                                    ? '#155724'
                                    : prop.status === 'sold'
                                    ? '#721c24'
                                    : '#856404',
                                padding: '5px 12px',
                                borderRadius: '20px',
                              }}
                            >
                              {prop.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="card-footer bg-white border-0 pt-0 pb-3 text-end">
              <button
                className="btn btn-link text-decoration-none"
                style={{ color: 'var(--gold-color)' }}
                onClick={() => (window.location.href = '/admin/properties')}
              >
                View All Properties →
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Quick Stats / Activity */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 mb-4">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)' }}>
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                Performance
              </h5>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Properties Sold</small>
                  <small className="fw-bold">42%</small>
                </div>
                <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '42%', backgroundColor: 'var(--primary-dark)' }}
                  ></div>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between mb-1">
                  <small>Properties Rented</small>
                  <small className="fw-bold">28%</small>
                </div>
                <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '28%', backgroundColor: 'var(--gold-color)' }}
                  ></div>
                </div>
              </div>
              <div className="mb-0">
                <div className="d-flex justify-content-between mb-1">
                  <small>Active Listings</small>
                  <small className="fw-bold">30%</small>
                </div>
                <div className="progress" style={{ height: '8px', borderRadius: '10px' }}>
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: '30%', backgroundColor: '#0d6efd' }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)' }}>
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Quick Actions
              </h5>
              <div className="d-grid gap-2">
                <button
                  className="btn btn-signup-nav"
                  onClick={() => (window.location.href = '/admin/properties?action=add')}
                >
                  + Add New Property
                </button>
                <button
                  className="btn btn-outline-primary"
                  style={{ borderColor: 'var(--primary-dark)', color: 'var(--primary-dark)' }}
                  onClick={() => (window.location.href = '/admin/news')}
                >
                  Write News Article
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => (window.location.href = '/admin/inquiries')}
                >
                  View Inquiries
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;