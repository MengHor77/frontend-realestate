import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const NotificationDropdown = ({
    isOpen,
    onClose,
    notifications,
    unreadCount,
    onMarkAllAsRead,
    onNotificationClick
}) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="shadow-lg border-0 p-2"
            style={{
                position: 'absolute',
                right: 0,
                top: '50px',
                background: '#fff',
                borderRadius: '15px',
                minWidth: '320px',
                maxWidth: '380px',
                zIndex: 1100,
                overflow: 'hidden'
            }}>
            <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom">
                <h6 className="mb-0 fw-bold" style={{ color: '#003366' }}>Notifications</h6>
                {unreadCount > 0 && (
                    <button
                        onClick={onMarkAllAsRead}
                        className="btn btn-sm btn-link text-decoration-none"
                        style={{ color: '#ffd700', fontSize: '12px' }}
                    >
                        Mark all as read
                    </button>
                )}
            </div>

            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {notifications.length === 0 ? (
                    <div className="text-center py-4 text-muted">
                        <FontAwesomeIcon icon={faBell} style={{ fontSize: '30px', opacity: 0.3 }} />
                        <p className="mb-0 mt-2 small">No notifications</p>
                    </div>
                ) : (
                    notifications.map(notif => {
                        // Get the original background color
                        const originalBgColor = notif.read ? 'transparent' : '#f0f7ff';

                        return (
                            <div
                                key={notif.id}
                                onClick={() => onNotificationClick(notif.id)}
                                className="dropdown-item p-3 border-bottom"
                                style={{
                                    cursor: 'pointer',
                                    borderRadius: '10px',
                                    backgroundColor: originalBgColor,
                                    transition: 'background 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#78aae3';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = originalBgColor;
                                }}
                            >
                                <div className="d-flex gap-3">
                                    <div className="flex-shrink-0">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center"
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                backgroundColor: notif.read ? '#e9ecef' : '#ffd70020'
                                            }}>
                                            <FontAwesomeIcon
                                                icon={notif.title.includes('inquiry') ? faEnvelope : faBell}
                                                style={{ color: notif.read ? '#6c757d' : '#ffd700', fontSize: '16px' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex-grow-1">
                                        <div className="d-flex justify-content-between align-items-start">
                                            <strong className="small" style={{ color: '#003366' }}>{notif.title}</strong>
                                            {!notif.read && (
                                                <span className="badge bg-danger rounded-pill" style={{ width: '8px', height: '8px', padding: '0' }}></span>
                                            )}
                                        </div>
                                        <p className="text-muted small mb-1">{notif.message}</p>
                                        <small className="text-muted" style={{ fontSize: '10px' }}>{notif.time}</small>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            <div className="border-top p-2 text-center">
                <button
                    className="btn btn-sm w-100"
                    style={{ color: '#ffd700', fontSize: '12px', transition: 'background 0.2s ease', background: 'transparent' }}
                    onClick={() => { onClose(); navigate('/admin/inquiries'); }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#78aae3'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                    View All Notifications
                </button>
            </div>
        </div>
    );
};

export default NotificationDropdown;