// Pagination.js
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`${
            i === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          } px-4 py-2 mx-1 rounded focus:outline-none`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return (
    <div className="flex justify-center mt-4">{renderPaginationButtons()}</div>
  );
};

export default Pagination;
