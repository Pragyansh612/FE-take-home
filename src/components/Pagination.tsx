import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];

    // Always include the first page
    pageNumbers.push(1);

    if (totalPages <= 10) {
      // Handle small number of pages
      if (currentPage <= 3) {
        pageNumbers.push(2, 3);
        if (totalPages > 4) pageNumbers.push("...");
        if (totalPages > 3) pageNumbers.push(totalPages);
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        pageNumbers.push("...");
        pageNumbers.push(currentPage);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else {
        pageNumbers.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    } else {
      // Handle large number of pages
      if (currentPage <= 3) {
        pageNumbers.push(2, 3);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else if (currentPage > 3 && currentPage < totalPages - 2) {
        pageNumbers.push("...");
        pageNumbers.push(currentPage);
        pageNumbers.push("...");
        pageNumbers.push(totalPages);
      } else {
        pageNumbers.push("...");
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }

    return pageNumbers;
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-start space-x-2">
      <button
        className="px-4 py-2 rounded hover:bg-gray-100 disabled:bg-gray-100"
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        &lt;
      </button>

      {/* Page buttons */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          className={`px-4 py-2 rounded ${
            page === currentPage
              ? "bg-violet-500 text-white"
              : page === "..."
              ? "cursor-default"
              : " hover:bg-gray-200"
          }`}
          onClick={() => typeof page === "number" && handlePageChange(page)}
          disabled={page === "..."}
        >
          {page}
        </button>
      ))}
      <button
        className="px-4 py-2  rounded hover:bg-gray-100 disabled:bg-gray-100"
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
