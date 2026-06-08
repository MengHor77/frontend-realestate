// D:\realestate\frontend\src\pages\admin\manageProperty\ManageProperties.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEdit, 
  faTrash, 
  faBuilding, 
  faInfoCircle, 
  faMapMarkerAlt, 
  faPlus,
  faHome,
  faKey
} from '@fortawesome/free-solid-svg-icons';
import CreateProperty from './CreateProperty';
import EditProperty from './EditProperty';
import Filter from '../../../components/common/Filter';
import Pagination from '../../../components/common/Pagination';

const ManageProperties = () => {
  const { setIsOverlayVisible } = useOutletContext();
  const [properties, setProperties] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPagesState, setTotalPagesState] = useState(0);
  
  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    startDate: '',
    endDate: ''
  });

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'sold', label: 'Sold' },
    { value: 'rented', label: 'Rented' }
  ];

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const params = {};
      if (filters.search) params.search = filters.search;
      if (filters.status && filters.status !== 'all') params.status = filters.status;
      params.page = currentPage;
      params.limit = itemsPerPage;

      const res = await axios.get('http://localhost:5000/api/properties', { ...config, params });
      
      setProperties(res.data.properties || []);
      setTotalItems(res.data.total || 0);
      setTotalPagesState(res.data.totalPages || 0);
      
    } catch (err) {
      console.error("Error fetching properties:", err);
      if (err.response && err.response.status === 401) {
        alert("Session expired. Please login again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [currentPage, itemsPerPage, filters]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await axios.delete(`http://localhost:5000/api/properties/${id}`, config);
        fetchProperties();
      } catch (err) {
        console.error("Delete error:", err);
        alert("Failed to delete property. Check your permissions.");
      }
    }
  };

  const handleOpenAdd = () => {
    setShowAdd(true);
    setIsOverlayVisible(true);
  };

  const handleClose = () => {
    setShowAdd(false);
    setEditId(null);
    setIsOverlayVisible(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ search: '', status: 'all', startDate: '', endDate: '' });
    setCurrentPage(1);
  };

  const totalPages = totalPagesState || Math.ceil(totalItems / itemsPerPage);

  return (
    <div style={{ padding: '25px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      {showAdd && <CreateProperty onClose={handleClose} onRefresh={fetchProperties} />}
      {editId && <EditProperty propertyId={editId} onClose={handleClose} onRefresh={fetchProperties} />}

      {/* Header Section */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '25px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h2 style={{ color: '#003366', fontWeight: '700', fontSize: '24px', margin: 0 }}>
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '10px' }} />
            Manage Properties
          </h2>
          <p style={{ color: '#6c757d', fontSize: '14px', marginTop: '5px' }}>
            Add, edit and delete property listings
          </p>
        </div>
        <button
          onClick={handleOpenAdd}
          style={{
            backgroundColor: '#ffd700',
            color: '#003366',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '30px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#e6c200';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#ffd700';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
          Add New Property
        </button>
      </div>

      {/* Filter Component */}
      <Filter
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        statusOptions={statusOptions}
        showSearch={true}
        placeholder="Search by title or location..."
        initialValues={filters}
        loading={loading}
      />

      {/* Properties Table */}
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        overflow: 'hidden'
      }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <div className="spinner-border text-primary" role="status" style={{ color: '#003366' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p style={{ marginTop: '15px', color: '#6c757d' }}>Loading properties...</p>
          </div>
        ) : (
          <>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontFamily: "'Segoe UI', sans-serif"
              }}>
                <thead>
                  <tr style={{
                    backgroundColor: '#f8f9fa',
                    borderBottom: '2px solid #ffd700'
                  }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#003366' }}>ID</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#003366' }}>Title</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#003366' }}>Type</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#003366' }}>Price</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#003366' }}>Location</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#003366' }}>Status</th>
                    <th style={{ padding: '16px 20px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#003366' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.length > 0 ? (
                    properties.map((item) => (
                      <tr key={item.id} style={{
                        borderBottom: '1px solid #eef2f6',
                        transition: 'background-color 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{ padding: '16px 20px', fontSize: '14px', color: '#666' }}>#{item.id}</td>
                        <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '600', color: '#333' }}>{item.title}</td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{
                            backgroundColor: item.type === 'sale' ? '#e3f2fd' : '#d4edda',
                            color: item.type === 'sale' ? '#003366' : '#155724',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {item.type === 'sale' ? '🏠 For Sale' : '🔑 For Rent'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '14px', fontWeight: '700', color: '#003366' }}>
                          ${Number(item.price).toLocaleString()}
                          {item.type === 'rent' && <span style={{ fontSize: '11px', color: '#666' }}>/month</span>}
                        </td>
                        <td style={{ padding: '16px 20px', fontSize: '14px', color: '#666' }}>
                          <FontAwesomeIcon icon={faMapMarkerAlt} style={{ marginRight: '5px', color: '#ffd700' }} />
                          {item.location || 'N/A'}
                        </td>
                        <td style={{ padding: '16px 20px' }}>
                          <span style={{
                            backgroundColor: item.status === 'active' ? '#d4edda' : item.status === 'sold' ? '#f8d7da' : '#fff3cd',
                            color: item.status === 'active' ? '#155724' : item.status === 'sold' ? '#721c24' : '#856404',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {item.status?.toUpperCase() || 'ACTIVE'}
                          </span>
                        </td>
                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                          <button
                            onClick={() => { setEditId(item.id); setIsOverlayVisible(true); }}
                            style={{
                              backgroundColor: '#4f8ef7',
                              color: '#fff',
                              border: 'none',
                              padding: '6px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: '600',
                              marginRight: '8px',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#3a7bd5'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#4f8ef7'}
                          >
                            <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            style={{
                              backgroundColor: '#dc3545',
                              color: '#fff',
                              border: 'none',
                              padding: '6px 16px',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '13px',
                              fontWeight: '600',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#c82333'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#dc3545'}
                          >
                            <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center', padding: '60px 20px' }}>
                        <FontAwesomeIcon icon={faBuilding} style={{ fontSize: '48px', color: '#ccc', display: 'block', marginBottom: '15px' }} />
                        <p style={{ fontSize: '16px', color: '#999', margin: 0 }}>No properties found</p>
                        <p style={{ fontSize: '13px', color: '#bbb', marginTop: '5px' }}>Click "Add New Property" to create one</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Section */}
            {totalPages > 1 && (
              <div style={{ padding: '20px', borderTop: '1px solid #eef2f6' }}>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  variant="primary"
                  size="md"
                  showFirstLast={true}
                  showPrevNext={true}
                />
              </div>
            )}

            {/* Items Per Page & Total Info */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '15px 20px',
              borderTop: '1px solid #eef2f6',
              backgroundColor: '#fafafa'
            }}>
              <div style={{ fontSize: '13px', color: '#666' }}>
                <FontAwesomeIcon icon={faInfoCircle} style={{ marginRight: '5px' }} />
                Showing {properties.length} of {totalItems} properties
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '13px', color: '#666' }}>Show:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => { 
                    setItemsPerPage(Number(e.target.value)); 
                    setCurrentPage(1); 
                  }}
                  style={{
                    padding: '5px 10px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    backgroundColor: '#fff',
                    cursor: 'pointer',
                    fontSize: '13px'
                  }}
                >
                  <option value={5}>5 per page</option>
                  <option value={10}>10 per page</option>
                  <option value={25}>25 per page</option>
                  <option value={50}>50 per page</option>
                </select>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;