import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { useOutletContext } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faBuilding,
  faMapMarkerAlt,
  faPlus,
  faImage
} from '@fortawesome/free-solid-svg-icons';
import CreateProperty from './CreateProperty';
import EditProperty from './EditProperty';
import Filter from '../../../components/admin/Filter';
import Pagination from '../../../components/common/Pagination';

const ManageProperties = () => {
  const { setIsOverlayVisible } = useOutletContext();
  const [properties, setProperties] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPagesState, setTotalPagesState] = useState(0);

  const [filters, setFilters] = useState({
    search: '',
    status: 'all'
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
      
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        ...filters
      };
      if (filters.status === 'all') delete params.status;

      const res = await api.get('/properties', { 
        params,
        headers: { Authorization: `Bearer ${token}` }
      });

      setProperties(res.data.properties || []);
      setTotalItems(res.data.total || 0);
      setTotalPagesState(res.data.totalPages || 0);
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProperties(); }, [currentPage, itemsPerPage, filters]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/properties/${id}`, { 
          headers: { Authorization: `Bearer ${token}` } 
        });
        fetchProperties();
      } catch (err) {
        alert("Failed to delete property.");
      }
    }
  };

  const handleClose = () => {
    setShowAdd(false);
    setEditId(null);
    setIsOverlayVisible(false);
  };

  const totalPages = totalPagesState || Math.ceil(totalItems / itemsPerPage);

  const getImageUrl = (property) => {
    if (property.images && property.images.length > 0) {
      const primaryImage = property.images.find(img => img.is_primary === true || img.is_primary === 1) || property.images[0];
      if (primaryImage && primaryImage.url) {
        return primaryImage.url;
      }
    }
    if (property.image_url) {
      return property.image_url;
    }
    return 'https://via.placeholder.com/50x50?text=No+Image';
  };

  const getImageCount = (property) => {
    if (property.images && property.images.length > 0) {
      return property.images.length;
    }
    return property.image_url ? 1 : 0;
  };

  const formatPrice = (price) => {
    if (!price) return '$0';
    return `$${Number(price).toLocaleString()}`;
  };

  return (
    <div style={{ padding: '0px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      {showAdd && <CreateProperty onClose={handleClose} onRefresh={fetchProperties} />}
      {editId && <EditProperty propertyId={editId} onClose={handleClose} onRefresh={fetchProperties} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ color: '#003366', fontWeight: '700', fontSize: '24px', margin: 0 }}>
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: '10px' }} /> Manage Properties
          </h2>
        </div>
        <button onClick={() => { setShowAdd(true); setIsOverlayVisible(true); }} style={{ backgroundColor: '#ffd700', color: '#003366', border: 'none', padding: '10px 24px', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}>
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} /> Add New Property
        </button>
      </div>

      <Filter onFilterChange={setFilters} statusOptions={statusOptions} initialValues={filters} loading={loading} />

      <div style={{ backgroundColor: '#fff', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #ffd700' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>ID</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Images</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Title</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Type</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Listing</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Price</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Location</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', color: '#003366' }}>Status</th>
                <th style={{ padding: '16px 20px', textAlign: 'center', color: '#003366' }}>Actions</th>
               </tr>
            </thead>
            <tbody>
              {properties.map((item) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #eef2f6' }}>
                  <td style={{ padding: '16px 20px' }}>#{item.id}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <img
                        src={getImageUrl(item)}
                        alt={item.title}
                        style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/50x50?text=No+Image';
                        }}
                      />
                      {getImageCount(item) > 1 && (
                        <div style={{
                          position: 'absolute',
                          bottom: '-5px',
                          right: '-5px',
                          background: '#003366',
                          color: '#ffd700',
                          borderRadius: '50%',
                          width: '18px',
                          height: '18px',
                          fontSize: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold'
                        }}>
                          <FontAwesomeIcon icon={faImage} size="xs" />
                          <span style={{ marginLeft: '2px' }}>{getImageCount(item)}</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '16px 20px', fontWeight: '600' }}>{item.title}</td>
                  <td style={{ padding: '16px 20px', textTransform: 'capitalize' }}>{item.property_type}</td>
                  <td style={{ padding: '16px 20px' }}>{item.listing_type}</td>
                  <td style={{ padding: '16px 20px', fontWeight: '700' }}>{formatPrice(item.price)}</td>
                  <td style={{ padding: '16px 20px' }}>
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: '#ffd700', marginRight: '5px' }} /> {item.location}
                  </td>
                  <td style={{ padding: '16px 20px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      backgroundColor: item.status === 'active' ? '#d4edda' : item.status === 'sold' ? '#f8d7da' : '#fff3cd',
                      color: item.status === 'active' ? '#155724' : item.status === 'sold' ? '#721c24' : '#856404'
                    }}>
                      {item.status?.toUpperCase() || 'ACTIVE'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button
                        onClick={() => { setEditId(item.id); setIsOverlayVisible(true); }}
                        style={{
                          backgroundColor: '#4f8ef7',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        style={{
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: '600',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div style={{ padding: '20px', borderTop: '1px solid #eef2f6' }}>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageProperties;