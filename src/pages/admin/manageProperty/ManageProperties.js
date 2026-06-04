import React from 'react';

const ManageProperties = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1a1f36', marginBottom: '20px' }}>🏠 គ្រប់គ្រងអចលនទ្រព្យ (Manage Properties)</h2>
      <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #f0f0f0', textAlign: 'left' }}>
              <th style={{ padding: '12px' }}>ឈ្មោះផ្ទះ/ដី</th>
              <th style={{ padding: '12px' }}>ប្រភេទ</th>
              <th style={{ padding: '12px' }}>តម្លៃ</th>
              <th style={{ padding: '12px' }}>សកម្មភាព</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: '12px' }}>វីឡាឃ្វីន (Queen Villa)</td>
              <td style={{ padding: '12px' }}>សម្រាប់លក់</td>
              <td style={{ padding: '12px' }}>$450,000</td>
              <td style={{ padding: '12px' }}>
                <button style={{ color: '#4f8ef7', border: 'none', background: 'none', cursor: 'pointer' }}>កែប្រែ</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProperties;