import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import { AppProvider } from './context/AppContext';
import AgentDashboard from './pages/agent/AgentDashboard';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import UserDashboard from './pages/account/UserDashboard';
import Home from './pages/home/Home';
import ListingPage from './pages/listing/ListingPage';
import PropertyDetailPage from './pages/property/PropertyDetailPage';
import SearchResultsPage from './pages/search/SearchResultsPage';

function App() {
  return (
    <AppProvider>
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="properties" element={<ListingPage />} />
            <Route path="properties/:id" element={<PropertyDetailPage />} />
            <Route path="search" element={<SearchResultsPage />} />
            <Route path="auth/login" element={<LoginPage />} />
            <Route path="auth/signup" element={<SignupPage />} />
            <Route path="account/dashboard" element={<UserDashboard />} />
            <Route path="agent/dashboard" element={<AgentDashboard />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
