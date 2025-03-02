import React, { useState } from 'react';

interface PaginationWithElipsisProps {
  totalPages: number;
  onPageChanges: (page: number) => void;
  initialPage?: number;
  maxVisiblePages?: number;
}

export const PaginationWithElipsis: React.FC<PaginationWithElipsisProps> = ({
  totalPages,
  initialPage = 1,
  onPageChanges,
  maxVisiblePages = 7,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(initialPage);

  const handlePageChange = (page: number): void => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChanges(page);
  };

  // Function which return react component which is page button and elipsis.
  const renderPageNumbers = (): React.ReactElement[] => {
    const pages: React.ReactElement[] = [];
    const middlePagesCount = maxVisiblePages - 2;

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_: unknown, i: number) => (
        <PageButton
          key={i + 1}
          currentPage={currentPage}
          page={i + 1}
          handlePageChange={handlePageChange}
        />
      ));
    }

    // Always show the first page
    pages.push(
      <PageButton
        key={1}
        currentPage={currentPage}
        page={1}
        handlePageChange={handlePageChange}
      />,
    );

    // Other pages to show
    // then the first and last page part.

    // Half the middle portion (rounded down)
    const half = Math.floor(middlePagesCount / 2);

    let startPage = currentPage - half;
    let endPage = currentPage + half;

    // If `middlePagesCount` is even, we might want to shift one more
    // to the right of currentPage. This is optional—just a tweak:
    if (middlePagesCount % 2 === 0) {
      endPage -= 1;
    }

    // Make sure that start page won't go below 2
    // as we already render the first page.
    if (startPage < 2) {
      startPage = 2;
      endPage = startPage + (middlePagesCount - 1);
    }

    // Make sure that end page won't go beyond last page.
    if (endPage > totalPages - 1) {
      endPage = totalPages - 1;
      startPage = endPage - (middlePagesCount - 1);
    }

    if (startPage > 2) {
      pages.push(
        <span key="elipsis" className="mx-1">
          ...
        </span>,
      );
    }

    console.log('start page', startPage);
    console.log('end page', endPage);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton
          key={i}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          page={i}
        />,
      );
    }

    if (endPage < totalPages - 1) {
      pages.push(
        <span key="elipsis" className="mx-1">
          ...
        </span>,
      );
    }

    if (totalPages > 1) {
      pages.push(
        <PageButton
          key={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
          page={totalPages}
        />,
      );
    }
    return pages;
  };

  return (
    <div className="my-4 flex items-center justify-center">
      {/* Previous page button*/}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="mx-1 h-8 w-8 rounded bg-gray-200 disabled:opacity-50"
        aria-label="Previous page"
      >
        &lt;
      </button>

      {/* Render the updated page numbers */}
      {renderPageNumbers()}

      {/* Next page  button*/}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="mx-1 h-8 w-8 rounded bg-gray-200 disabled:opacity-50"
        aria-label="Next page"
      >
        &gt;
      </button>
    </div>
  );
};

interface PageButtonProps {
  currentPage: number;
  page: number;
  handlePageChange: (page: number) => void;
}

const PageButton: React.FC<PageButtonProps> = ({
  currentPage,
  handlePageChange,
  page,
}) => {
  return (
    <button
      className={`mx-1 flex h-8 w-8 items-center justify-center rounded ${page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      onClick={() => handlePageChange(page)}
    >
      {page}
    </button>
  );
};
