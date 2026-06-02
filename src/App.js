import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/home/Home';
import Listings from './pages/listings/Listings';
import PropertyDetail from './pages/property/PropertyDetail';
import ContactUs from './pages/contact/ContactUs';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import UserDashboard from './pages/dashboard/UserDashboard';
import AgentDashboard from './pages/agent/AgentDashboard';
import SearchResults from './pages/search/SearchResults';
import CompareProperties from './pages/compare/CompareProperties';
import NotFound from './pages/errors/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="listings" element={<Listings />} />
          <Route path="sale" element={<Navigate to="/listings?listingType=buy" replace />} />
          <Route path="rent" element={<Navigate to="/listings?listingType=rent" replace />} />
          <Route path="property/:id" element={<PropertyDetail />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="agent-dashboard" element={<AgentDashboard />} />
          <Route path="search-results" element={<SearchResults />} />
          <Route path="compare" element={<CompareProperties />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
