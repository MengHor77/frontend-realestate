import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AdminLayout from './layouts/AdminLayout';
import FrontendLayout from './layouts/frontentLayout';

// Frontend Pages
import Home from './pages/frontend/home/Home';
import About from './pages/frontend/about/About';
import Sale from './pages/frontend/sale/Sale';
import Rent from './pages/frontend/rent/Rent';
import SaleDetail from './pages/frontend/sale/SaleDetail'; 
import RentDetail from './pages/frontend/rent/RentDetail';
import NewsDetail from './pages/frontend/news/NewsDetail';
import News from './pages/frontend/news/News';
import ContactUs from './pages/frontend/contact/ContactUs';
import Login from './pages/frontend/login/Login';
import SignUp from './pages/frontend/signUp/SignUp';
import PropertyDetail from './pages/frontend/propertyDetail/PropertyDetail';

// Admin Pages
import Dashboard from './pages/admin/dashboard/Dashboard';
import ManageProperties from './pages/admin/manageProperty/ManageProperties';
import ManageUsers from './pages/admin/manageUsers/ManageUsers';
import ManageNews from './pages/admin/manageNews/ManageNews';
import ManageInquiries from './pages/admin/manageInquiries/ManageInquiries';
import Analytics from './pages/admin/analytics/Analytics';
import Settings from './pages/admin/settings/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Frontend Public Routes */}
        <Route element={<FrontendLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/sale/:id" element={<SaleDetail />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/rent/:id" element={<RentDetail />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        {/* Admin Protected Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="properties" element={<ManageProperties />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="news" element={<ManageNews />} />
          <Route path="inquiries" element={<ManageInquiries />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;