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
        className={`elative inline-flex items-center rounded-l-md px-2 py-2  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
          currentPage === 1 ? "text-gray-400" : "text-black font-semibold"
        }`}
      >
        Previous
      </button>
    );

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
        links.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`pagination-btn ${
              currentPage === i
                ? "relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                : "relative  items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            } `}
          >
            {i}
          </button>
        );
      } else if (Math.abs(i - currentPage) === 2) {
        // Display ellipsis (...) for skipped pages
        links.push(
          <span
            key={`ellipsis${i}`}
            className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
          >
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
        className={`relative inline-flex items-center rounded-r-md px-2 py-2  ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${
          currentPage === totalPages ? "text-gray-400" : "text-black font-semibold"
        }`}
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
