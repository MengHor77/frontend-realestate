import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowLeft, 
  faSave, 
  faTimes,
  faImage,
  faTag,
  faAlignLeft,
  faHeading,
  faSpinner 
} from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api';
import FlashMessage from '../../../components/common/FlashMessage';

const EditNews = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [flashMessage, setFlashMessage] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    category: 'general',
    status: 'published'
  });

  useEffect(() => {
    fetchNewsDetails();
  }, [id]);

  const fetchNewsDetails = async () => {
    try {
      setFetching(true);
      const token = localStorage.getItem('token');
      const response = await api.get(`/news/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const newsData = response.data.news;
      setFormData({
        title: newsData.title || '',
        content: newsData.content || '',
        image_url: newsData.image_url || '',
        category: newsData.category || 'general',
        status: newsData.status || 'published'
      });
    } catch (err) {
      console.error('Error fetching news:', err);
      showFlashMessage('មិនអាចទាញយកព័ត៌មានបានទេ', 'error');
      setTimeout(() => {
        navigate('/admin/news');
      }, 2000);
    } finally {
      setFetching(false);
    }
  };

  const showFlashMessage = (message, type = 'success') => {
    setFlashMessage({ show: true, message, type });
  };

  const handleCloseFlashMessage = () => {
    setFlashMessage({ show: false, message: '', type: 'success' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content) {
      showFlashMessage('សូមបំពេញចំណងជើង និងខ្លឹមសារព័ត៌មាន', 'error');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      await api.put(`/news/${id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      showFlashMessage('ព័ត៌មានត្រូវបានកែប្រែដោយជោគជ័យ!', 'success');
      
      setTimeout(() => {
        navigate('/admin/news');
      }, 1500);
    } catch (err) {
      console.error('Error updating news:', err);
      if (err.response?.status === 401) {
        showFlashMessage('សូមកត់ឈ្មោះចូលប្រព័ន្ធម្តងទៀត', 'error');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        showFlashMessage(err.response?.data?.message || 'បរាជ័យក្នុងការកែប្រែព័ត៌មាន', 'error');
      }
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <FontAwesomeIcon icon={faSpinner} spin style={{ fontSize: '48px', color: '#003366' }} />
        <p style={{ marginTop: '20px', color: '#666' }}>កំពុងទាញយកទិន្នន័យ...</p>
      </div>
    );
  }

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

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
        <button
          onClick={() => navigate('/admin/news')}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '20px',
            color: '#003366',
            padding: '8px 12px',
            borderRadius: '8px',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#f0f0f0'}
          onMouseLeave={(e) => e.target.style.background = 'none'}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <div>
          <h1 style={{ color: '#003366', fontWeight: '700', fontSize: '28px', margin: 0 }}>
            <FontAwesomeIcon icon={faSave} style={{ marginRight: '12px', color: '#ffd700' }} />
            កែប្រែព័ត៌មាន
          </h1>
          <p style={{ color: '#666', marginTop: '5px' }}>កែប្រែព័ត៌មានលម្អិតខាងក្រោម</p>
        </div>
      </div>

      {/* Form - Same as CreateNews but with edit values */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '30px', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              <FontAwesomeIcon icon={faHeading} style={{ marginRight: '8px', color: '#ffd700' }} />
              ចំណងជើងព័ត៌មាន *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              <FontAwesomeIcon icon={faTag} style={{ marginRight: '8px', color: '#ffd700' }} />
              ប្រភេទ
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            >
              <option value="general">ទូទៅ</option>
              <option value="real-estate">អចលនទ្រព្យ</option>
              <option value="investment">វិនិយោគ</option>
              <option value="legal">ច្បាប់</option>
            </select>
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              <FontAwesomeIcon icon={faImage} style={{ marginRight: '8px', color: '#ffd700' }} />
              URL រូបភាព
            </label>
            <input
              type="text"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              <FontAwesomeIcon icon={faAlignLeft} style={{ marginRight: '8px', color: '#ffd700' }} />
              ខ្លឹមសារព័ត៌មាន *
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows="10"
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '14px',
                resize: 'vertical',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
              ស្ថានភាព
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '16px'
              }}
            >
              <option value="published">បោះពុម្ពផ្សាយ</option>
              <option value="draft">សេចក្តីព្រាង</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                flex: 1,
                background: '#003366',
                color: '#ffd700',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                opacity: loading ? 0.6 : 1
              }}
            >
              <FontAwesomeIcon icon={faSave} />
              {loading ? 'កំពុងរក្សាទុក...' : 'រក្សាទុក'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/news')}
              style={{
                flex: 1,
                background: '#f0f0f0',
                color: '#666',
                padding: '12px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <FontAwesomeIcon icon={faTimes} />
              បោះបង់
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;