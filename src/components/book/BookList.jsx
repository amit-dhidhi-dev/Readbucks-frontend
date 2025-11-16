// components/Books/BookList.jsx
import React, { useState } from 'react';
import { useBooks } from '../../assets/hooks/useBook';
import BookCard from './BookCard';
import BookFilters from './BookFilters';
import BookFiltersMobile from './BookFiltersMobile';
import LoadingSpinner from '../loading/LoadingSpinner';

const BookList = () => {
  const [filters, setFilters] = useState({
    page: 1,
    limit: 12,
    category: '',
    language: '',
    min_price: '',
    max_price: '',
    access_level: ''
  });

  const { books, loading, error, pagination, refetch } = useBooks(filters);


// console.log('books', books[0]);
  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <button 
          onClick={() => refetch(filters)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Books Collection</h1>
      
      {/* <BookFilters onFilterChange={handleFilterChange} /> */}

       {/* Mobile Filters */}
      <BookFiltersMobile onFilterChange={handleFilterChange} initialFilters={filters} />

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <BookFilters onFilterChange={handleFilterChange} initialFilters={filters} />
      </div>

      
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {books.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {books.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No books found matching your criteria.</p>
            </div>
          )}

          {/* Pagination */}
          {pagination.total > 0 && (
            <div className="flex justify-center items-center space-x-4">
              <button
                disabled={filters.page === 1}
                onClick={() => handlePageChange(filters.page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Previous
              </button>
              
              <span className="text-gray-600">
                Page {filters.page} of {Math.ceil(pagination.total / pagination.limit)}
              </span>
              
              <button
                disabled={!pagination.hasNext}
                onClick={() => handlePageChange(filters.page + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BookList;