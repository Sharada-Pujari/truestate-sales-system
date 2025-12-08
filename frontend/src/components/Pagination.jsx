import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function Pagination({ pagination, onPageChange }) {
  if (!pagination) return null;

  const { currentPage, totalPages, totalRecords, hasNext, hasPrevious } = pagination;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing page {currentPage} of {totalPages} ({totalRecords} total records)
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevious}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              hasPrevious
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <FiChevronLeft /> Previous
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNext}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
              hasNext
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            Next <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Pagination;