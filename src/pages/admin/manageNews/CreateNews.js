import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faTimes,
  faImage,
  faTag,
  faAlignLeft,
  faHeading
} from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api';
import FlashMessage from '../../../components/common/FlashMessage';

const CreateNews = () => {
  const navigate = useNavigate();
  const { setIsOverlayVisible } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState({ show: false, message: '', type: 'success' });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    category: 'general',
    status: 'published'
  });

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

  const handleClose = () => {
    setIsOverlayVisible(false);
    navigate('/admin/news');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      showFlashMessage('Please fill in title and content', 'error');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        showFlashMessage('Please login again', 'error');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
        return;
      }

      await api.post('/news', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      showFlashMessage('News created successfully!', 'success');

      setTimeout(() => {
        setIsOverlayVisible(false);
        navigate('/admin/news');
      }, 1500);
    } catch (err) {
      console.error('Error creating news:', err);
      if (err.response?.status === 401) {
        showFlashMessage('Please login again', 'error');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        showFlashMessage(err.response?.data?.message || 'Failed to create news', 'error');
      }
      setLoading(false);
    }
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.7)', // Same as property
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease'
    },
    container: {
      background: '#fff',
      width: '90%',
      maxWidth: '700px',
      borderRadius: '16px',
      maxHeight: '90vh',
      display: 'flex',
      flexDirection: 'column',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      animation: 'slideIn 0.3s ease'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      background: '#003366', // --primary-dark
      color: '#ffd700', // --gold-color
      borderRadius: '16px 16px 0 0'
    },
    headerTitle: {
      margin: 0,
      fontSize: '18px',
      fontWeight: '700'
    },
    closeBtn: {
      background: 'transparent',
      border: 'none',
      color: '#ffd700',
      cursor: 'pointer',
      fontSize: '20px',
      transition: 'all 0.3s ease'
    },
    closeBtnHover: {
      transform: 'scale(1.1)'
    },
    form: {
      padding: '24px',
      overflowY: 'auto'
    },
    group: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px'
    },
    label: {
      fontSize: '13px',
      fontWeight: 600,
      color: '#444',
      marginBottom: '8px',
      display: 'flex',
      alignItems: 'center'
    },
    input: {
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'border-color 0.2s ease'
    },
    textarea: {
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
      resize: 'vertical',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s ease'
    },
    select: {
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #ddd',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
      backgroundColor: '#fff'
    },
    submitBtn: {
      background: '#003366',
      color: '#ffd700',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      transition: 'all 0.3s ease'
    },
    cancelBtn: {
      background: '#f0f0f0',
      color: '#666',
      padding: '12px 24px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      transition: 'all 0.3s ease'
    },
    buttonGroup: {
      display: 'flex',
      gap: '12px',
      marginTop: '24px'
    },
    iconGold: {
      marginRight: '8px',
      color: '#ffd700'
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(-30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          input:focus, textarea:focus, select:focus {
            outline: none;
            border-color: #003366 !important;
            box-shadow: 0 0 0 2px rgba(0,51,102,0.1);
          }
          button:hover {
            transform: translateY(-2px);
          }
        `}
      </style>

      <div style={styles.overlay}>
        <div style={styles.container}>
          <div style={styles.header}>
            <h3 style={styles.headerTitle}>
              <FontAwesomeIcon icon={faSave} style={styles.iconGold} />
              Create News
            </h3>
            <button
              type="button"
              onClick={handleClose}
              style={styles.closeBtn}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {flashMessage.show && (
            <FlashMessage
              message={flashMessage.message}
              type={flashMessage.type}
              duration={3000}
              onClose={handleCloseFlashMessage}
            />
          )}

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Title */}
            <div style={styles.group}>
              <label style={styles.label}>
                <FontAwesomeIcon icon={faHeading} style={styles.iconGold} />
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter news title..."
                required
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = '#003366'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* Category */}
            <div style={styles.group}>
              <label style={styles.label}>
                <FontAwesomeIcon icon={faTag} style={styles.iconGold} />
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="general">General</option>
                <option value="real-estate">Real Estate</option>
                <option value="investment">Investment</option>
                <option value="legal">Legal</option>
              </select>
            </div>

            {/* Image URL */}
            <div style={styles.group}>
              <label style={styles.label}>
                <FontAwesomeIcon icon={faImage} style={styles.iconGold} />
                Image URL
              </label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                style={styles.input}
                onFocus={(e) => e.target.style.borderColor = '#003366'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* Content */}
            <div style={styles.group}>
              <label style={styles.label}>
                <FontAwesomeIcon icon={faAlignLeft} style={styles.iconGold} />
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Enter news content..."
                required
                rows="8"
                style={styles.textarea}
                onFocus={(e) => e.target.style.borderColor = '#003366'}
                onBlur={(e) => e.target.style.borderColor = '#ddd'}
              />
            </div>

            {/* Status */}
            <div style={styles.group}>
              <label style={styles.label}>Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            {/* Buttons */}
            <div style={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleClose}
                style={styles.cancelBtn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#e0e0e0';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f0f0f0';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faTimes} style={{ marginRight: '8px' }} />
                Cancel
              </button>
              <button
                type="submit"
                style={styles.submitBtn}
                disabled={loading}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#004499';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.backgroundColor = '#003366';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <FontAwesomeIcon icon={faSave} style={{ marginRight: '8px' }} />
                {loading ? 'Saving...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateNews;