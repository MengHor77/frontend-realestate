import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding,
  faDollarSign,
  faUser,
  faEye,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api';
import DashboardStatCard from '../../../components/admin/DashboardStatCard';
import RecentPropertiesTable from '../../../components/admin/RecentPropertiesTable';
import PerformanceProgress from '../../../components/admin/PerformanceProgress';
import QuickActions from '../../../components/admin/QuickActions';

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
      const res = await api.get('/properties');
      const properties = res.data.properties || [];

      const total = properties.length;
      const totalValue = properties.reduce((sum, p) => sum + (p.price || 0), 0);
      const recent = properties.slice(0, 5);

      setStats({
        totalProperties: total,
        totalUsers: 128,
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

  return (
    <div style={{ padding: '0px', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 className="display-6 fw-bold" style={{ color: 'var(--primary-dark)' }}>
            Dashboard
          </h1>
          <p className="text-muted">Welcome back! Here's what's happening with your real estate platform.</p>
        </div>
        <div>
          <span className="badge px-3 py-2" style={{ backgroundColor: 'var(--gold-color)', color: 'var(--primary-dark)' }}>
            <FontAwesomeIcon icon={faChartLine} className="me-2" />
            Last 30 days
          </span>
        </div>
      </div>

      {/* Stats Row */}
      <div className="row g-4 mb-5">
        <div className="col-sm-6 col-xl-3">
          <DashboardStatCard
            title="Total Properties"
            value={stats.totalProperties}
            icon={faBuilding}
            color="#003366"
            trend={stats.trend}
            loading={loading}
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <DashboardStatCard
            title="Total Value"
            value={`$${stats.revenue.toLocaleString()}`}
            icon={faDollarSign}
            color="#ffd700"
            trend="+8%"
            loading={loading}
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <DashboardStatCard
            title="Active Users"
            value={stats.totalUsers}
            icon={faUser}
            color="#0d6efd"
            trend="+5%"
            loading={loading}
          />
        </div>
        <div className="col-sm-6 col-xl-3">
          <DashboardStatCard
            title="Total Views"
            value={stats.totalViews}
            icon={faEye}
            color="#28a745"
            trend="+32%"
            loading={loading}
          />
        </div>
      </div>

      {/* Charts & Recent Activity */}
      <div className="row g-4">
        {/* Recent Properties Table */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0" style={{ borderRadius: '20px' }}>
            <div className="card-header bg-white border-0 pt-4 pb-0">
              <h5 className="fw-bold" style={{ color: 'var(--primary-dark)' }}>
                <FontAwesomeIcon icon={faBuilding} className="me-2" />
                Recently Added Properties
              </h5>
            </div>
            <div className="card-body p-0">
              <RecentPropertiesTable properties={recentProperties} loading={loading} />
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
          <div className="card shadow-sm border-0 mb-4" style={{ borderRadius: '20px' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)' }}>
                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                Performance
              </h5>
              <PerformanceProgress 
                soldPercentage={42}
                rentedPercentage={28}
                activePercentage={30}
                loading={loading}
              />
            </div>
          </div>

          <div className="card shadow-sm border-0" style={{ borderRadius: '20px' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)' }}>
                <FontAwesomeIcon icon={faUser} className="me-2" />
                Quick Actions
              </h5>
              <div className="d-grid gap-2">
                <QuickActions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;