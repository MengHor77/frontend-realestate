import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';

const FlashMessage = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        if (message) {
            setIsVisible(true);
            const timer = setTimeout(() => {
                setIsVisible(false);
                if (onClose) {
                    setTimeout(onClose, 300);
                }
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [message, duration, onClose]);

    if (!message || !isVisible) return null;

    const getStyles = () => {
        const baseStyle = {
            position: 'fixed',
            top: '20px',
            right: '20px',
            minWidth: '300px',
            maxWidth: '450px',
            padding: '16px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            cursor: 'pointer',
            animation: 'slideInRight 0.3s ease-out',
        };

        if (type === 'success') {
            return {
                ...baseStyle,
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                color: 'white',
                borderLeft: '4px solid #2e7d32',
            };
        } else {
            return {
                ...baseStyle,
                background: 'linear-gradient(135deg, #f44336 0%, #e53935 100%)',
                color: 'white',
                borderLeft: '4px solid #c62828',
            };
        }
    };

    const getIcon = () => {
        return type === 'success' ? faCheckCircle : faExclamationCircle;
    };

    // Add CSS animations to document if not already added
    if (!document.querySelector('#flash-message-styles')) {
        const styleSheet = document.createElement("style");
        styleSheet.id = 'flash-message-styles';
        styleSheet.textContent = `
      @keyframes slideInRight {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes shrink {
        from {
          width: 100%;
        }
        to {
          width: 0%;
        }
      }
      
      .flash-message:hover {
        transform: translateY(-2px);
        transition: transform 0.2s;
      }
    `;
        document.head.appendChild(styleSheet);
    }

    return (
        <div style={getStyles()} className="flash-message">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <FontAwesomeIcon icon={getIcon()} style={{ fontSize: '20px' }} />
                <span style={{ fontSize: '14px', fontWeight: '500', lineHeight: 1.4 }}>{message}</span>
            </div>
            <button
                onClick={() => {
                    setIsVisible(false);
                    if (onClose) setTimeout(onClose, 300);
                }}
                style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '16px',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '4px',
                }}
            >
                <FontAwesomeIcon icon={faTimes} />
            </button>

            {/* Progress bar */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    height: '3px',
                    backgroundColor: 'rgba(255,255,255,0.7)',
                    width: '100%',
                    borderRadius: '0 0 8px 8px',
                    animation: `shrink ${duration}ms linear forwards`,
                }}
            />
        </div>
    );
};

export default FlashMessage;