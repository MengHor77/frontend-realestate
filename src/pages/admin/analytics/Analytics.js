import React from 'react';

const Analytics = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1a1f36', marginBottom: '20px' }}>📊 របាយការណ៍ និងការវិភាគ (Analytics)</h2>
      
      {/* ផ្នែក Stats Cards សម្រាប់ការវិភាគសង្ខេប */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={statCardStyle}>
          <span style={{ fontSize: '14px', color: '#666' }}>ចំនួនអ្នកចូលមើលសរុប</span>
          <h3 style={{ margin: '10px 0', color: '#4f8ef7' }}>12,450</h3>
          <span style={{ color: '#28a745', fontSize: '12px' }}>↑ 15% ធៀបនឹងខែមុន</span>
        </div>
        
        <div style={statCardStyle}>
          <span style={{ fontSize: '14px', color: '#666' }}>អចលនទ្រព្យដែលពេញនិយម</span>
          <h3 style={{ margin: '10px 0', color: '#f5a623' }}>វីឡាទោល</h3>
          <span style={{ color: '#666', fontSize: '12px' }}>មានការសាកសួរច្រើនជាងគេ</span>
        </div>

        <div style={statCardStyle}>
          <span style={{ fontSize: '14px', color: '#666' }}>អត្រាការលក់ចេញ</span>
          <h3 style={{ margin: '10px 0', color: '#28a745' }}>85%</h3>
          <span style={{ color: '#28a745', fontSize: '12px' }}>↑ 5% ក្នុងសប្តាហ៍នេះ</span>
        </div>
      </div>

      {/* ផ្នែកក្រាហ្វិក (Placeholder) */}
      <div style={{ background: '#fff', padding: '40px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', textAlign: 'center' }}>
        <h4 style={{ color: '#ccc' }}>[ កន្លែងសម្រាប់ដាក់ក្រាហ្វិក ឬតារាងវិភាគលម្អិត ]</h4>
        <p style={{ color: '#999' }}>អ្នកអាចប្រើ Library ដូចជា Chart.js ឬ Recharts ដើម្បីបង្ហាញទិន្នន័យនៅទីនេះ</p>
      </div>
    </div>
  );
};

// ស្ទីលសម្រាប់កាតសង្ខេប
const statCardStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  borderLeft: '5px solid #4f8ef7'
};

// ⚠️ សំខាន់បំផុត៖ ហាមភ្លេចបន្ទាត់នាំចេញនេះ
export default Analytics;