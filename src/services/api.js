import axios from 'axios';

// Get API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

console.log('🔧 API Base URL:', API_URL);

const api = axios.create({
  baseURL: `${API_URL}/api`,
    headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 30000, // 30 second timeout
});

// ── Attach JWT token to every request ─────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // If sending FormData, remove Content-Type so browser sets it with boundary
    if (config.data instanceof FormData) {
      delete config.headers['Content-Type'];
    }
    
    // Log request for debugging (remove in production)
    console.log(`📤 ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// ── Handle responses and errors globally ───────────────────────────────────
api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error('API Error:', error.response.status, error.response.data);
      
      if (error.response.status === 401) {
        console.log('401 error - removing token and redirecting');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    } else if (error.request) {
      // Request was made but no response received
      console.error('Network Error - No response from server:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default api;