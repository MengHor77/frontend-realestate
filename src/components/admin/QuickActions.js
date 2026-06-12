import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const QuickActions = ({ onAddProperty, onWriteNews, onViewInquiries }) => {
  const navigate = useNavigate();

  const handleAddProperty = () => {
    if (onAddProperty) {
      onAddProperty();
    } else {
      navigate('/admin/properties?action=add');
    }
  };

  const handleWriteNews = () => {
    if (onWriteNews) {
      onWriteNews();
    } else {
      navigate('/admin/news');
    }
  };

  const handleViewInquiries = () => {
    if (onViewInquiries) {
      onViewInquiries();
    } else {
      navigate('/admin/inquiries');
    }
  };

  return (
    <>
      <button
        className="btn btn-signup-nav w-100 mb-2"
        onClick={handleAddProperty}
        style={{ textAlign: 'center' }}
      >
        + Add New Property
      </button>
      <button
        className="btn w-100 mb-2"
        style={{ borderColor: 'var(--primary-dark)', color: 'var(--primary-dark)', backgroundColor: 'transparent', borderWidth: '2px' }}
        onClick={handleWriteNews}
      >
        Write News Article
      </button>
      <button
        className="btn w-100"
        style={{ borderColor: '#6c757d', color: '#6c757d', backgroundColor: 'transparent', borderWidth: '2px' }}
        onClick={handleViewInquiries}
      >
        View Inquiries
      </button>
    </>
  );
};

export default QuickActions;