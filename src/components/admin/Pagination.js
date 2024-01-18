import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationLinks = () => {
    const links = [];

    // Previous button
    links.push(
      <button
        key="prev"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="pagination-btn"
      >
        Previous
      </button>
    );

    // Page numbers or ellipsis
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        // Display the first, last, or nearby page numbers
        links.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-btn ${
              currentPage === i ? "bg-blue-500 text-white" : "bg-gray-200"
            } px-4 py-2 mx-1 rounded focus:outline-none`}
          >
            {i}
          </button>
        );
      } else if (Math.abs(i - currentPage) === 2) {
        // Display ellipsis (...) for skipped pages
        links.push(
          <span key={`ellipsis${i}`} className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    // Next button
    links.push(
      <button
        key="next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="pagination-btn"
      >
        Next
      </button>
    );

    return links;
  };

  return (
    <div className="flex justify-center mt-4">{renderPaginationLinks()}</div>
  );
};

export default Pagination;
