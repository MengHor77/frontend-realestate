import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUsers, faTrash, faDownload } from '@fortawesome/free-solid-svg-icons';

const ManageSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        fetchSubscribers();
    }, []);

    const fetchSubscribers = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await api.get('/newsletter/subscribers', {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                setSubscribers(response.data.subscribers);
                setTotalCount(response.data.subscribers.length);
            }
        } catch (err) {
            console.error('Error fetching subscribers:', err);
            setError('Failed to load subscribers');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (email, id) => {
        if (window.confirm(`Are you sure you want to remove ${email} from the newsletter?`)) {
            try {
                const token = localStorage.getItem('token');
                await api.post('/newsletter/unsubscribe', { email }, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchSubscribers();
                alert('Subscriber removed successfully');
            } catch (err) {
                console.error('Error deleting subscriber:', err);
                alert('Failed to remove subscriber');
            }
        }
    };

    const exportToCSV = () => {
        const headers = ['ID', 'Email', 'Subscribed Date'];
        const csvData = subscribers.map(sub => [
            sub.id,
            sub.email,
            new Date(sub.subscribed_at).toLocaleString()
        ]);

        const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const styles = {
        container: {
            padding: '0px',
            backgroundColor: '#f4f7f6',
            minHeight: '100vh'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '25px',
            flexWrap: 'wrap',
            gap: '15px'
        },
        title: {
            color: '#003366',
            fontWeight: '700',
            fontSize: '24px',
            margin: 0
        },
        statCard: {
            background: 'white',
            borderRadius: '15px',
            padding: '20px',
            marginBottom: '25px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
        },
        statIcon: {
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            backgroundColor: '#003366',
            color: '#ffd700',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px'
        },
        statInfo: {
            flex: 1
        },
        statNumber: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#003366',
            margin: 0
        },
        statLabel: {
            color: '#666',
            margin: 0,
            fontSize: '14px'
        },
        exportBtn: {
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        tableContainer: {
            backgroundColor: '#fff',
            borderRadius: '15px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            overflow: 'hidden'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        th: {
            padding: '16px 20px',
            textAlign: 'left',
            color: '#003366',
            backgroundColor: '#f8f9fa',
            borderBottom: '2px solid #ffd700'
        },
        td: {
            padding: '16px 20px',
            borderBottom: '1px solid #eef2f6'
        },
        deleteBtn: {
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px'
        },
        loadingContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px'
        },
        spinner: {
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #003366',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 1s linear infinite'
        },
        emptyContainer: {
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666'
        },
        emailCell: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        }
    };

    if (loading) {
        return (
            <div style={styles.loadingContainer}>
                <style>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}</style>
                <div style={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>
                        <FontAwesomeIcon icon={faUsers} style={{ marginRight: '10px' }} />
                        Newsletter Subscribers
                    </h2>
                    <p style={{ color: '#666', marginTop: '5px' }}>Manage your email subscription list</p>
                </div>
                {subscribers.length > 0 && (
                    <button onClick={exportToCSV} style={styles.exportBtn}>
                        <FontAwesomeIcon icon={faDownload} /> Export to CSV
                    </button>
                )}
            </div>

            {/* Statistics Card */}
            <div style={styles.statCard}>
                <div style={styles.statIcon}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div style={styles.statInfo}>
                    <h3 style={styles.statNumber}>{totalCount}</h3>
                    <p style={styles.statLabel}>Total Subscribers</p>
                </div>
            </div>

            {/* Subscribers Table */}
            <div style={styles.tableContainer}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th style={styles.th}>ID</th>
                                <th style={styles.th}>Email</th>
                                <th style={styles.th}>Subscribed Date</th>
                                <th style={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subscribers.length === 0 ? (
                                <tr>
                                    <td colSpan="4" style={styles.emptyContainer}>
                                        <FontAwesomeIcon icon={faEnvelope} style={{ fontSize: '48px', color: '#ccc', marginBottom: '15px' }} />
                                        <p>No subscribers yet</p>
                                        <p style={{ fontSize: '14px', color: '#999' }}>When users subscribe to the newsletter, they will appear here.</p>
                                    </td>
                                </tr>
                            ) : (
                                subscribers.map((sub) => (
                                    <tr key={sub.id}>
                                        <td style={styles.td}>#{sub.id}</td>
                                        <td style={styles.td}>
                                            <div style={styles.emailCell}>
                                                <FontAwesomeIcon icon={faEnvelope} style={{ color: '#003366' }} />
                                                {sub.email}
                                            </div>
                                        </td>
                                        <td style={styles.td}>{formatDate(sub.subscribed_at)}</td>
                                        <td style={styles.td}>
                                            <button
                                                onClick={() => handleDelete(sub.email, sub.id)}
                                                style={styles.deleteBtn}
                                            >
                                                <FontAwesomeIcon icon={faTrash} /> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageSubscribers;