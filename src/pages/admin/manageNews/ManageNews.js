import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faNewspaper,
  faPlus,
  faEdit,
  faTrash,
  faSearch,
  faCalendarAlt,
  faUser,
  faTimes,
  faSave,
  faImage,
  faTag,
  faAlignLeft,
  faHeading,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useOutletContext } from 'react-router-dom';
import api from '../../../services/api';
import FlashMessage from '../../../components/common/FlashMessage';

const ManageNews = () => {
  const { setIsOverlayVisible } = useOutletContext();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [flashMessage, setFlashMessage] = useState({ show: false, message: '', type: 'success' });

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedNews, setSelectedNews] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Form data for create/edit
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    category: 'general',
    status: 'published'
  });

  useEffect(() => {
    fetchNews();
  }, [currentPage, searchTerm]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const response = await api.get('/news', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchTerm
        }
      });
      setNews(response.data.news || []);
      setTotalItems(response.data.total || 0);
      setTotalPages(response.data.totalPages || 0);
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

  // Open Create Modal
  const handleOpenCreateModal = () => {
    setFormData({
      title: '',
      content: '',
      image_url: '',
      category: 'general',
      status: 'published'
    });
    setShowCreateModal(true);
    setIsOverlayVisible(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = async (newsItem) => {
    try {
      setModalLoading(true);
      const token = localStorage.getItem('token');
      const response = await api.get(`/news/${newsItem.id}`, {
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
      setSelectedNews(newsItem);
      setShowEditModal(true);
      setIsOverlayVisible(true);
    } catch (err) {
      console.error('Error fetching news details:', err);
      showFlashMessage('Failed to load news details', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  // Close modals
  const handleCloseModals = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setIsOverlayVisible(false);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle Create Submit
  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      showFlashMessage('Please fill in title and content', 'error');
      return;
    }

    try {
      setModalLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        showFlashMessage('Please login again', 'error');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
        return;
      }

      await api.post('/news', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      showFlashMessage('News created successfully!', 'success');
      handleCloseModals();
      await fetchNews();
    } catch (err) {
      console.error('Error creating news:', err);
      if (err.response?.status === 401) {
        showFlashMessage('Please login again', 'error');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        showFlashMessage(err.response?.data?.message || 'Failed to create news', 'error');
      }
    } finally {
      setModalLoading(false);
    }
  };

  // Handle Edit Submit
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.content) {
      showFlashMessage('Please fill in title and content', 'error');
      return;
    }

    try {
      setModalLoading(true);
      const token = localStorage.getItem('token');
      await api.put(`/news/${selectedNews.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      showFlashMessage('News updated successfully!', 'success');
      handleCloseModals();
      await fetchNews();
    } catch (err) {
      console.error('Error updating news:', err);
      if (err.response?.status === 401) {
        showFlashMessage('Please login again', 'error');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      } else {
        showFlashMessage(err.response?.data?.message || 'Failed to update news', 'error');
      }
    } finally {
      setModalLoading(false);
    }
  };

  // Modal Styles with higher z-index for overlay
  const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,51,102,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease'
  };

  const modalContentStyle = {
    backgroundColor: '#fff',
    borderRadius: '15px',
    width: '90%',
    maxWidth: '700px',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    animation: 'slideIn 0.3s ease'
  };

  const modalHeaderStyle = {
    padding: '20px 25px',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003366',
    color: '#ffd700',
    borderRadius: '15px 15px 0 0'
  };

  const modalBodyStyle = {
    padding: '25px'
  };

  const modalFooterStyle = {
    padding: '20px 25px',
    borderTop: '1px solid #e0e0e0',
    display: 'flex',
    gap: '15px',
    justifyContent: 'flex-end'
  };

  return (
    <div style={{ padding: '25px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      {flashMessage.show && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          duration={3000}
          onClose={handleCloseFlashMessage}
        />
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ color: '#003366', fontWeight: '700', fontSize: '24px', margin: 0 }}>
            <FontAwesomeIcon icon={faNewspaper} style={{ marginRight: '10px' }} />
            Manage News
          </h2>
          <p style={{ color: '#666', marginTop: '5px' }}>Add, edit and delete news articles</p>
        </div>
        <button
          onClick={handleOpenCreateModal}
          style={{
            backgroundColor: '#ffd700',
            color: '#003366',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
          Add News
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ background: '#fff', padding: '20px', borderRadius: '15px', marginBottom: '25px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ position: 'relative' }}>
          <FontAwesomeIcon icon={faSearch} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#999' }} />
          <input
            type="text"
            placeholder="Search by title or content..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
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
      <div style={{ backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ffd700' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>ID</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Title</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Author</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Category</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Date</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Status</th>
                <th style={{ padding: '16px 20px', textAlign: 'center', color: '#003366' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '50px' }}>
                    <div>Loading...</div>
                  </td>
                </tr>
              ) : news.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '50px' }}>
                    <FontAwesomeIcon icon={faNewspaper} style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }} />
                    <p style={{ color: '#999' }}>No news found</p>
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #eef2f6' }}>
                    <td style={{ padding: '16px 20px' }}>#{item.id}</td>
                    <td style={{ padding: '16px 20px' }}>
                      <div>
                        <div style={{ fontWeight: '600', color: '#333', marginBottom: '5px' }}>{item.title}</div>
                        <div style={{ fontSize: '12px', color: '#999' }}>
                          {item.content?.substring(0, 80)}...
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FontAwesomeIcon icon={faUser} style={{ color: '#999' }} />
                        <span>{item.author || 'Admin'}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px', textTransform: 'capitalize' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        backgroundColor: '#e3f2fd',
                        color: '#1976d2'
                      }}>
                        {item.category || 'general'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <FontAwesomeIcon icon={faCalendarAlt} style={{ color: '#999' }} />
                        <span>{new Date(item.created_at).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '12px',
                        backgroundColor: item.status === 'published' ? '#d4edda' : '#fff3cd',
                        color: item.status === 'published' ? '#155724' : '#856404'
                      }}>
                        {item.status?.toUpperCase() || 'PUBLISHED'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                        <button
                          onClick={() => handleOpenEditModal(item)}
                          style={{
                            backgroundColor: '#4f8ef7',
                            color: '#fff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: '#fff',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            fontWeight: '600'
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create News Modal */}
      {showCreateModal && (
        <div style={modalOverlayStyle} onClick={handleCloseModals}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '20px' }}>
                <FontAwesomeIcon icon={faPlus} style={{ marginRight: '10px' }} />
                Create News
              </h3>
              <button
                onClick={handleCloseModals}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffd700',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0'
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleCreateSubmit}>
              <div style={modalBodyStyle}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    <FontAwesomeIcon icon={faHeading} style={{ marginRight: '8px', color: '#003366' }} />
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter news title..."
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

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    <FontAwesomeIcon icon={faTag} style={{ marginRight: '8px', color: '#003366' }} />
                    Category
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
                    <option value="general">General</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="investment">Investment</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    <FontAwesomeIcon icon={faImage} style={{ marginRight: '8px', color: '#003366' }} />
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    <FontAwesomeIcon icon={faAlignLeft} style={{ marginRight: '8px', color: '#003366' }} />
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter news content..."
                    required
                    rows="8"
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

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    Status
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
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div style={modalFooterStyle}>
                <button
                  type="button"
                  onClick={handleCloseModals}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f0f0f0',
                    color: '#666',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#003366',
                    color: '#ffd700',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: modalLoading ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: modalLoading ? 0.6 : 1
                  }}
                >
                  {modalLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSave} />}
                  {modalLoading ? 'Saving...' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit News Modal */}
      {showEditModal && (
        <div style={modalOverlayStyle} onClick={handleCloseModals}>
          <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeaderStyle}>
              <h3 style={{ margin: 0, fontSize: '20px' }}>
                <FontAwesomeIcon icon={faEdit} style={{ marginRight: '10px' }} />
                Edit News
              </h3>
              <button
                onClick={handleCloseModals}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffd700',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '0'
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div style={modalBodyStyle}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    <FontAwesomeIcon icon={faHeading} style={{ marginRight: '8px', color: '#003366' }} />
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter news title..."
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

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    <FontAwesomeIcon icon={faTag} style={{ marginRight: '8px', color: '#003366' }} />
                    Category
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
                    <option value="general">General</option>
                    <option value="real-estate">Real Estate</option>
                    <option value="investment">Investment</option>
                    <option value="legal">Legal</option>
                  </select>
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    <FontAwesomeIcon icon={faImage} style={{ marginRight: '8px', color: '#003366' }} />
                    Image URL
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #ddd',
                      fontSize: '16px'
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    <FontAwesomeIcon icon={faAlignLeft} style={{ marginRight: '8px', color: '#003366' }} />
                    Content *
                  </label>
                  <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder="Enter news content..."
                    required
                    rows="8"
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

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                    Status
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
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div style={modalFooterStyle}>
                <button
                  type="button"
                  onClick={handleCloseModals}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#f0f0f0',
                    color: '#666',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalLoading}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#003366',
                    color: '#ffd700',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: modalLoading ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    opacity: modalLoading ? 0.6 : 1
                  }}
                >
                  {modalLoading ? <FontAwesomeIcon icon={faSpinner} spin /> : <FontAwesomeIcon icon={faSave} />}
                  {modalLoading ? 'Updating...' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNews;