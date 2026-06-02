import React from 'react';

function AgentDashboard() {
  return (
    <div className="d-grid gap-3">
      <h1 className="h4">Agent / Seller dashboard</h1>
      <div className="row g-3">
        <div className="col-md-3"><div className="card card-body"><h2 className="h6">Total listings</h2><p className="display-6 mb-0">16</p></div></div>
        <div className="col-md-3"><div className="card card-body"><h2 className="h6">Views this month</h2><p className="display-6 mb-0">2,440</p></div></div>
        <div className="col-md-3"><div className="card card-body"><h2 className="h6">Inquiries</h2><p className="display-6 mb-0">84</p></div></div>
        <div className="col-md-3"><div className="card card-body"><h2 className="h6">Commission</h2><p className="display-6 mb-0">$12.2k</p></div></div>
      </div>

      <div className="card card-body">
        <h2 className="h6">Property management</h2>
        <ul>
          <li>Add / edit / delete listings with status control (active, pending, sold)</li>
          <li>Bulk upload support placeholder and photo reorder flow</li>
          <li>Document and video upload placeholders</li>
        </ul>
      </div>

      <div className="card card-body">
        <h2 className="h6">Inquiry and lead management</h2>
        <p className="mb-0">Track leads, add notes, mark contacted, and export CSV from this dashboard module.</p>
      </div>

      <div className="card card-body">
        <h2 className="h6">Payments and reporting</h2>
        <p className="mb-0">Monthly trends, ROI overview, invoice generation, and payment history are surfaced here.</p>
      </div>
    </div>
  );
}

export default AgentDashboard;
