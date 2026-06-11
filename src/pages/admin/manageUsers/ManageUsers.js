import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faUserPlus,
  faEdit,
  faTrash,
  faTimes,
  faSave,
  faEnvelope,
  faPhone,
  faUserTag,
  faCalendar,
  faSearch,
  faFilter,
  faShieldAlt,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';
import api from '../../../services/api';
import FlashMessage from '../../../components/common/FlashMessage';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'user',
  });
  const [currentUser, setCurrentUser] = useState(null);

  // Only use flashMessage state - remove error and success states
  const [flashMessage, setFlashMessage] = useState({ show: false, message: '', type: 'success' });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
    getCurrentUser();
  }, []);

  const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users');
      setUsers(response.data.users || []);
    } catch (err) {
      console.error('Error fetching users:', err);
      if (err.response?.status === 401) {
        showFlashMessage('Session expired. Please login again.', 'error');
      } else {
        showFlashMessage('Failed to load users', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  // Helper function to show flash messages
  const showFlashMessage = (message, type = 'success') => {
    setFlashMessage({ show: true, message, type });
  };

  const handleCloseFlashMessage = () => {
    setFlashMessage({ show: false, message: '', type: 'success' });
  };

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '',
        phone: user.phone || '',
        role: user.role || 'user',
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'user',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
    setFormData({
      name: '',
      email: '',
      password: '',
      phone: '',
      role: 'user',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      showFlashMessage('Name and email are required', 'error');
      return;
    }

    if (!editingUser && !formData.password) {
      showFlashMessage('Password is required for new users', 'error');
      return;
    }

    try {
      if (editingUser) {
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password;

        await api.put(`/users/${editingUser.id}`, updateData);
        showFlashMessage('User updated successfully!', 'success');
      } else {
        await api.post('/users', formData);
        showFlashMessage('User created successfully!', 'success');
      }

      // Refresh users and close modal
      await fetchUsers();
      handleCloseModal();

    } catch (err) {
      console.error('Error saving user:', err);
      if (err.response?.data?.message) {
        showFlashMessage(err.response.data.message, 'error');
      } else {
        showFlashMessage('Failed to save user', 'error');
      }
    }
  };

  const handleDelete = async (user) => {
    // Prevent deleting admin users
    if (user.role === 'admin') {
      showFlashMessage('Cannot delete admin users!', 'error');
      return;
    }

    // Prevent deleting yourself
    if (currentUser && user.id === currentUser.id) {
      showFlashMessage('You cannot delete your own account!', 'error');
      return;
    }

    if (window.confirm(`Are you sure you want to delete user "${user.name}"?`)) {
      try {
        await api.delete(`/users/${user.id}`);
        showFlashMessage('User deleted successfully!', 'success');
        await fetchUsers();
      } catch (err) {
        console.error('Error deleting user:', err);
        showFlashMessage('Failed to delete user', 'error');
      }
    }
  };

  // Check if delete button should be disabled
  const canDelete = (user) => {
    if (user.role === 'admin') return false;
    if (currentUser && user.id === currentUser.id) return false;
    return true;
  };

  // Filter users based on search and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role) => {
    if (role === 'admin') {
      return {
        text: 'Admin',
        style: { backgroundColor: '#003366', color: '#ffd700' },
        icon: faShieldAlt,
      };
    }
    return {
      text: 'User',
      style: { backgroundColor: '#e1e8f0', color: '#003366' },
      icon: faUserGraduate,
    };
  };

  return (
    <div style={{ padding: '20px', fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Flash Message Component - Only this for notifications */}
      {flashMessage.show && (
        <FlashMessage
          message={flashMessage.message}
          type={flashMessage.type}
          duration={3000}
          onClose={handleCloseFlashMessage}
        />
      )}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '30px',
          flexWrap: 'wrap',
          gap: '15px',
        }}
      >
        <div>
          <h1 style={{ color: '#003366', fontWeight: '700', fontSize: '28px' }}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '12px', color: '#ffd700' }} />
            Manage Users
          </h1>
          <p>Manage administrators and client accounts</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          style={{
            background: '#003366',
            color: '#ffd700',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          <FontAwesomeIcon icon={faUserPlus} style={{ marginRight: '8px' }} />
          Add New User
        </button>
      </div>

      <div
        style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '15px',
          marginBottom: '25px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ flex: 2, position: 'relative' }}>
            <FontAwesomeIcon
              icon={faSearch}
              style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
              }}
            />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '10px',
                border: '1px solid #ddd',
              }}
            />
          </div>
          <div style={{ flex: 1, position: 'relative' }}>
            <FontAwesomeIcon
              icon={faFilter}
              style={{
                position: 'absolute',
                left: '15px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#999',
              }}
            />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                borderRadius: '10px',
                border: '1px solid #ddd',
              }}
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin Only</option>
              <option value="user">Users Only</option>
            </select>
          </div>
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          padding: '20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
          borderRadius: '15px',
        }}
      >
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <div>Loading...</div>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <p>No users found</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ padding: '15px' }}>User</th>
                  <th style={{ padding: '15px' }}>Email</th>
                  <th style={{ padding: '15px' }}>Role</th>
                  <th style={{ padding: '15px' }}>Joined</th>
                  <th style={{ padding: '15px' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const roleBadge = getRoleBadge(user.role);
                  const disableDelete = !canDelete(user);

                  return (
                    <tr key={user.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <td style={{ padding: '15px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              background: user.role === 'admin' ? '#003366' : '#e1e8f0',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: user.role === 'admin' ? '#ffd700' : '#003366',
                            }}
                          >
                            <FontAwesomeIcon icon={roleBadge.icon} />
                          </div>
                          <div>
                            <div style={{ fontWeight: '600' }}>{user.name}</div>
                            <div style={{ fontSize: '12px', color: '#999' }}>ID: {user.id}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '15px' }}>{user.email}</td>
                      <td style={{ padding: '15px' }}>
                        <span
                          style={{
                            background: roleBadge.style.backgroundColor,
                            color: roleBadge.style.color,
                            padding: '5px 12px',
                            borderRadius: '20px',
                            fontSize: '12px',
                            fontWeight: '600',
                          }}
                        >
                          <FontAwesomeIcon icon={roleBadge.icon} style={{ marginRight: '6px' }} />
                          {roleBadge.text}
                        </span>
                      </td>
                      <td style={{ padding: '15px' }}>
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td style={{ padding: '15px' }}>
                        <button
                          onClick={() => handleOpenModal(user)}
                          style={{
                            color: '#0d6efd',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            marginRight: '15px',
                          }}
                        >
                          <FontAwesomeIcon icon={faEdit} style={{ marginRight: '5px' }} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          disabled={disableDelete}
                          style={{
                            color: disableDelete ? '#ccc' : '#ff4757',
                            border: 'none',
                            background: 'none',
                            cursor: disableDelete ? 'not-allowed' : 'pointer',
                            opacity: disableDelete ? 0.5 : 1,
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} style={{ marginRight: '5px' }} />
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit User Modal */}
      {showModal && (
        <div style={styles.overlay} onClick={handleCloseModal}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>
                <FontAwesomeIcon icon={editingUser ? faEdit : faUserPlus} style={{ marginRight: '10px' }} />
                {editingUser ? 'Edit User' : 'Add New User'}
              </h3>
              <button onClick={handleCloseModal} style={styles.closeBtn}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FontAwesomeIcon icon={faUser} style={{ marginRight: '8px', color: '#ffd700' }} />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter full name"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: '8px', color: '#ffd700' }} />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="Enter email address"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FontAwesomeIcon icon={faPhone} style={{ marginRight: '8px', color: '#ffd700' }} />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={styles.input}
                  placeholder="Enter phone number"
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FontAwesomeIcon icon={faUserTag} style={{ marginRight: '8px', color: '#ffd700' }} />
                  Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  style={styles.input}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>
                  <FontAwesomeIcon icon={faShieldAlt} style={{ marginRight: '8px', color: '#ffd700' }} />
                  Password {!editingUser && '*'}
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required={!editingUser}
                  style={styles.input}
                  placeholder={editingUser ? 'Leave blank to keep current password' : 'Enter password'}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                <button type="submit" style={styles.submitBtn}>
                  <FontAwesomeIcon icon={faSave} style={{ marginRight: '8px' }} />
                  {editingUser ? 'Update User' : 'Create User'}
                </button>
                <button type="button" onClick={handleCloseModal} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'rgba(0,51,102,0.8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  modal: {
    background: '#fff',
    width: '100%',
    maxWidth: '500px',
    borderRadius: '16px',
    overflow: 'hidden',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    background: '#003366',
    color: '#ffd700',
  },
  modalTitle: {
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: '#ffd700',
  },
  closeBtn: {
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#ffd700',
    fontSize: '18px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
    padding: '24px',
    overflowY: 'auto',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#444',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    width: '100%',
    boxSizing: 'border-box',
    fontSize: '14px',
  },
  submitBtn: {
    background: '#003366',
    color: '#ffd700',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    flex: 1,
  },
  cancelBtn: {
    background: '#f0f0f0',
    color: '#666',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '14px',
    flex: 1,
  },
};

export default ManageUsers;