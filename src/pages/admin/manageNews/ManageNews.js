import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNewspaper,
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faSearch,
  faCalendarAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';
import FlashMessage from '../../../components/common/FlashMessage';

const ManageNews = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [flashMessage, setFlashMessage] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/news');
      setNews(response.data.news || []);
    } catch (err) {
      console.error('Error fetching news:', err);
      showFlashMessage('Failed to load news', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showFlashMessage = (message, type = 'success') => {
    setFlashMessage({ show: true, message, type });
  };

  const handleCloseFlashMessage = () => {
    setFlashMessage({ show: false, message: '', type: 'success' });
  };

  const handleDelete = async (newsItem) => {
    if (window.confirm(`Are you sure you want to delete "${newsItem.title}"?`)) {
      try {
        await api.delete(`/news/${newsItem.id}`);
        showFlashMessage('News deleted successfully!', 'success');
        await fetchNews();
      } catch (err) {
        console.error('Error deleting news:', err);
        showFlashMessage('Failed to delete news', 'error');
      }
    }
  };

  const filteredNews = news.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: "'Segoe UI', sans-serif" }}>
      {flashMessage.show && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          duration={3000}
          onClose={handleCloseFlashMessage}
        />
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#003366', fontWeight: '700', fontSize: '28px' }}>
            <FontAwesomeIcon icon={faNewspaper} style={{ marginRight: '12px', color: '#ffd700' }} />
            Manage News
          </h1>
          <p style={{ color: '#666' }}>add, edit and delete</p>
        </div>
        <button
          onClick={() => navigate('/admin/news/create')}
          style={{
            background: '#003366',
            color: '#ffd700',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FontAwesomeIcon icon={faPlus} />
          add news </button>
      </div>

      {/* Search Bar */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ position: 'relative' }}>
          <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            type="text"
            placeholder="search by title or article..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 20px 12px 45px',
              borderRadius: '10px',
              border: '1px solid #ddd',
              fontSize: '14px'
            }}
          />
        </div>
      </div>

      {/* News List */}
      <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <div>Loading...</div>
          </div>
        ) : filteredNews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }} />
            <p style={{ color: '#999' }}>no news</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e0e0e0' }}>
                  <th style={{ padding: '15px', textAlign: 'left' }}>ID</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Title</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Author</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNews.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s' }}>
                    <td style={{ padding: '15px' }}>#{item.id}</td>
                    <td style={{ padding: '15px' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#333', marginBottom: '5px' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          {item.content?.substring(0, 100)}...
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FontAwesomeIcon icon={faUser} style={{ color: '#999' }} />
                        <span>{item.author || 'Admin'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#999' }} />
                        <span>{new Date(item.created_at).toLocaleDateString('km-KH')}</span>
                      </div>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button
                          onClick={() => navigate(`/admin/news/edit/${item.id}`)}
                          style={{
                            color: '#0d6efd',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#e3f2fd'}
                          onMouseLeave={(e) => e.target.style.background = 'none'}
                        >
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          style={{
                            color: '#ff4757',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            transition: 'background 0.2s'
                          }}
                          onMouseEnter={(e) => e.target.style.background = '#ffe5e5'}
                          onMouseLeave={(e) => e.target.style.background = 'none'}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageNews;