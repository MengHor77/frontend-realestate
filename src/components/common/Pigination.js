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
    const totalNumbers = siblingCount * 2 + 3; // First + Last + Current + Siblings
    const totalBlocks = totalNumbers + 2; // Add prev/next buttons

    if (totalPages <= totalBlocks) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        items.push(i);
      }
    } else {
      const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
      const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);
      const showLeftDots = leftSiblingIndex > 2;
      const showRightDots = rightSiblingIndex < totalPages - 1;

      if (!showLeftDots && showRightDots) {
        // Show first pages then dots then last page
        for (let i = 1; i <= 3 + siblingCount * 2; i++) {
          items.push(i);
        }
        items.push('dots');
        items.push(totalPages);
      } 
      else if (showLeftDots && !showRightDots) {
        // Show first page, dots, then last pages
        items.push(1);
        items.push('dots');
        for (let i = totalPages - (3 + siblingCount * 2) + 1; i <= totalPages; i++) {
          items.push(i);
        }
      }
      else if (showLeftDots && showRightDots) {
        // Show first page, dots, middle pages, dots, last page
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

  const getButtonVariant = (isActive = false) => {
    if (isActive) {
      switch(variant) {
        case 'primary': return 'btn-primary';
        case 'danger': return 'btn-danger';
        case 'success': return 'btn-success';
        case 'warning': return 'btn-warning';
        default: return 'btn-primary';
      }
    }
    return 'btn-outline-secondary';
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
        {/* First Page Button */}
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

        {/* Previous Page Button */}
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

        {/* Page Numbers */}
        {paginationItems.map((item, index) => (
          <li key={index} className={`page-item ${item === currentPage ? 'active' : ''} ${item === 'dots' ? 'disabled' : ''}`}>
            {item === 'dots' ? (
              <span className={`page-link ${getButtonSize()}`}>...</span>
            ) : (
              <button
                className={`page-link ${getButtonSize()} ${getButtonVariant(item === currentPage)}`}
                onClick={() => handlePageChange(item)}
              >
                {item}
              </button>
            )}
          </li>
        ))}

        {/* Next Page Button */}
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

        {/* Last Page Button */}
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

      {/* Page Info */}
      <div className="ms-3 text-muted small">
        Page {currentPage} of {totalPages}
      </div>
    </nav>
  );
};

// Additional component for pagination with page size selector
export const PaginationWithSize = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50, 100],
  showTotalItems = true,
  ...props
}) => {
  return (
    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
      {/* Page Size Selector */}
      <div className="d-flex align-items-center gap-2">
        <label className="text-muted small mb-0">Show:</label>
        <select
          className="form-select form-select-sm"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          style={{ width: 'auto', borderRadius: '8px' }}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>{size} items</option>
          ))}
        </select>
      </div>

      {/* Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        {...props}
      />

      {/* Total Items Info */}
      {showTotalItems && (
        <div className="text-muted small">
          Total: <strong>{totalItems}</strong> items
        </div>
      )}
    </div>
  );
};

// Compact version for mobile
export const CompactPagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="d-flex justify-content-center gap-2">
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <i className="bi bi-chevron-left"></i>
      </button>
      <span className="align-self-center text-muted small">
        {currentPage} / {totalPages}
      </span>
      <button
        className="btn btn-sm btn-outline-secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};

export default Pagination;