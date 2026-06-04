import React, { useState } from 'react';

const Settings = () => {
  const [profile, setProfile] = useState({
    name: 'Taing PengSreng',
    email: 'admin@example.com',
    phone: '012 345 678'
  });

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#1a1f36', marginBottom: '20px' }}>⚙️ ការកំណត់ (Settings)</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        
        {/* ផ្នែកទី ១: ព័ត៌មានគណនី */}
        <div style={cardStyle}>
          <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>ព័ត៌មានគណនី</h4>
          <div style={inputGroupStyle}>
            <label>ឈ្មោះអ្នកប្រើប្រាស់</label>
            <input type="text" value={profile.name} style={inputStyle} readOnly />
          </div>
          <div style={inputGroupStyle}>
            <label>អ៊ីមែល</label>
            <input type="email" value={profile.email} style={inputStyle} readOnly />
          </div>
          <button style={btnStyle}>កែប្រែព័ត៌មាន</button>
        </div>

        {/* ផ្នែកទី ២: សុវត្ថិភាព (ប្តូរលេខសម្ងាត់) */}
        <div style={cardStyle}>
          <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>សុវត្ថិភាព</h4>
          <div style={inputGroupStyle}>
            <label>លេខសម្ងាត់ចាស់</label>
            <input type="password" placeholder="បញ្ចូលលេខសម្ងាត់ចាស់" style={inputStyle} />
          </div>
          <div style={inputGroupStyle}>
            <label>លេខសម្ងាត់ថ្មី</label>
            <input type="password" placeholder="បញ្ចូលលេខសម្ងាត់ថ្មី" style={inputStyle} />
          </div>
          <button style={{ ...btnStyle, background: '#28a745' }}>ប្តូរលេខសម្ងាត់</button>
        </div>

        {/* ផ្នែកទី ៣: ការកំណត់ប្រព័ន្ធ */}
        <div style={{ ...cardStyle, gridColumn: 'span 2' }}>
          <h4 style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>ការកំណត់វេបសាយ</h4>
          <div style={{ display: 'flex', gap: '40px' }}>
            <label style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked /> បើកដំណើរការ Email Notification
            </label>
            <label style={{ cursor: 'pointer' }}>
              <input type="checkbox" checked /> បង្ហាញតម្លៃអចលនទ្រព្យជា (USD)
            </label>
            <label style={{ cursor: 'pointer' }}>
              <input type="checkbox" /> របៀបងងឹត (Dark Mode)
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Styles ---
const cardStyle = {
  background: '#fff',
  padding: '25px',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
};

const inputGroupStyle = {
  marginBottom: '15px'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '8px',
  border: '1px solid #ddd',
  outline: 'none'
};

const btnStyle = {
  marginTop: '10px',
  padding: '10px 20px',
  background: '#4f8ef7',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

// ⚠️ កុំភ្លេចនាំចេញ (Export) ដាច់ខាត
export default Settings;