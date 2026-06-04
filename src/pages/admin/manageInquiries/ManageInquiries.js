import React from 'react';

const ManageInquiries = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1a1f36', marginBottom: '20px' }}>📩 ការសួរនាំពីអតិថិជន (Manage Inquiries)</h2>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <p>បញ្ជីសារដែលអតិថិជនបានផ្ញើមកនឹងបង្ហាញនៅទីនេះ...</p>
        {/* អ្នកអាចបន្ថែម Table នៅទីនេះនៅពេលក្រោយ */}
      </div>
    </div>
  );
};

export default ManageInquiries;