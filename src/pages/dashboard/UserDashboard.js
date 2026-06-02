import React from 'react';
import { useSelector } from 'react-redux';

function UserDashboard() {
  const wishlistCount = useSelector((state) => state.property.wishlist.length);
  const recentlyViewed = useSelector((state) => state.ui.recentlyViewed);

  return (
    <div className="d-grid gap-3">
      <h1 className="h4">User dashboard</h1>
      <div className="row g-3">
        <div className="col-md-4"><div className="card card-body"><h2 className="h6">Saved properties</h2><p className="display-6 mb-0">{wishlistCount}</p></div></div>
        <div className="col-md-4"><div className="card card-body"><h2 className="h6">Inquiry history</h2><p className="mb-0">3 open · 7 completed</p></div></div>
        <div className="col-md-4"><div className="card card-body"><h2 className="h6">Saved searches</h2><p className="mb-0">4 active alerts</p></div></div>
      </div>
      <div className="card card-body">
        <h2 className="h6">Recently viewed properties</h2>
        <ul className="mb-0">
          {recentlyViewed.length ? recentlyViewed.map((item) => <li key={item.id}>{item.title}</li>) : <li>No recently viewed properties.</li>}
        </ul>
      </div>
      <div className="card card-body"><h2 className="h6">Account settings</h2><p className="mb-0">Manage notifications, privacy options, and document uploads.</p></div>
    </div>
  );
}

export default UserDashboard;
