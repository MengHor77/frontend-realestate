// D:\realestate\frontend\src\components\common\Pagination.js
import React from 'react';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  showPrevNext = true,
  size = 'md',
  variant = 'primary',
  className = ''
}) => {
  
  const generatePaginationItems = () => {
    const items = [];
    const totalNumbers = siblingCount * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 1;

      if (!showLeftDots && showRightDots) {
        for (let i = 1; i <= 3 + siblingCount * 2; i++) {
          items.push(i);
        }
        items.push('dots');
        items.push(totalPages);
      } 
      else if (showLeftDots && !showRightDots) {
        items.push(1);
        items.push('dots');
        for (let i = totalPages - (3 + siblingCount * 2) + 1; i <= totalPages; i++) {
          items.push(i);
        }
      }
      else if (showLeftDots && showRightDots) {
        items.push(1);
        items.push('dots');
        for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
          items.push(i);
        }
        items.push('dots');
        items.push(totalPages);
      }
    }
    return items;
  };

  const getButtonSize = () => {
    switch(size) {
      case 'sm': return 'btn-sm px-2 py-1';
      case 'lg': return 'btn-lg px-4 py-2';
      default: return 'btn-md px-3 py-1';
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;

  const paginationItems = generatePaginationItems();

  return (
    <nav className={`d-flex justify-content-center align-items-center ${className}`}>
      <ul className="pagination mb-0">
        {showFirstLast && (
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className={`page-link ${getButtonSize()}`}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
              title="First Page"
            >
              <i className="bi bi-chevron-double-left"></i>
            </button>
          </li>
        )}

        {showPrevNext && (
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button
              className={`page-link ${getButtonSize()}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              title="Previous Page"
            >
              <i className="bi bi-chevron-left"></i>
            </button>
          </li>
        )}

        {paginationItems.map((item, index) => (
          <li key={index} className={`page-item ${item === currentPage ? 'active' : ''} ${item === 'dots' ? 'disabled' : ''}`}>
            {item === 'dots' ? (
              <span className={`page-link ${getButtonSize()}`}>...</span>
            ) : (
              <button
                className={`page-link ${getButtonSize()} ${item === currentPage ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => handlePageChange(item)}
                style={item === currentPage ? { backgroundColor: '#003366', borderColor: '#003366', color: 'white' } : {}}
              >
                {item}
              </button>
            )}
          </li>
        ))}

        {showPrevNext && (
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className={`page-link ${getButtonSize()}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              title="Next Page"
            >
              <i className="bi bi-chevron-right"></i>
            </button>
          </li>
        )}

        {showFirstLast && (
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button
              className={`page-link ${getButtonSize()}`}
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
              title="Last Page"
            >
              <i className="bi bi-chevron-double-right"></i>
            </button>
          </li>
        )}
      </ul>
      
      <div className="ms-3 text-muted small">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
};

export default Pagination;