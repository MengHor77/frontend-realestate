import React from 'react';

const ManageNews = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1a1f36', marginBottom: '20px' }}>📰 គ្រប់គ្រងព័ត៌មាន (Manage News)</h2>
      <button style={{ marginBottom: '15px', padding: '8px 16px', background: '#4f8ef7', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        + បន្ថែមព័ត៌មានថ្មី
      </button>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <p>តារាងបញ្ជីអត្ថបទព័ត៌មាន...</p>
      </div>
    </div>
  );
};

export default ManageNews;