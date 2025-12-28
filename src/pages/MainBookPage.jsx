import { useState, useEffect } from "react";
import { useMainBooks } from "../assets/hooks/useBook";
import { useNavigate } from "react-router-dom";
import { priceRanges, languages, categories } from "../data/booksData";
import {
  FaBook,
  FaSearch,
  FaFilter,
  FaTimes,
  FaSortAmountDown,
  FaTh,
  FaList
} from 'react-icons/fa';
import BooksCardView from "../components/BookCardView";

const MainBooksPage = () => {
  const navigate = useNavigate();
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 20;

  // Build API parameters from filters
  const buildFetchParams = () => {
    const params = {
      page: currentPage,
      limit: booksPerPage,
    };

    if (selectedCategory !== 'All') {
      params.category = selectedCategory;
    }
    if (selectedLanguage !== 'All') {
      params.language = selectedLanguage;
    }
    if (selectedPriceRange !== 'All') {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      if (range) {
        params.min_price = range.min;
        params.max_price = range.max;
      }
    }

    return params;
  };

  const [fetchParams, setFetchParams] = useState(buildFetchParams());
  
  const { books, loading, error, pagination, refetch } = useMainBooks(fetchParams);

  console.log("fetched books ->",books)
console.log("params ->", fetchParams)

  // Update fetch params when filters or page change
  useEffect(() => {
    setFetchParams(buildFetchParams());
  }, [currentPage, selectedCategory, selectedLanguage, selectedPriceRange]);

  // Apply client-side search and sorting (keep these on client for better UX)
  const processedBooks = (() => {
    let results = [...books];

    // Apply search filter (client-side for instant feedback)
    if (searchTerm) {
      results = results.filter(book =>
        book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low-high':
        results.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price-high-low':
        results.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'title':
        results.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
      default:
        // Default sorting by featured/bestseller
        results.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          return 0;
        });
    }

    return results;
  })();

  const totalPages = pagination.total ? Math.ceil(pagination.total / booksPerPage) : 1;

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLanguage('All');
    setSelectedPriceRange('All');
    setSortBy('default');
    setCurrentPage(1);
  };

  // Handle filter changes - reset to page 1
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range);
    setCurrentPage(1);
  };

  // Event Handlers
  const handleBookClick = (book) => {
    navigate(import.meta.env.VITE_BOOK_DETAILS_PAGE.replace(":bookId", book.id));
  };

  const handleAddToCart = (book) => {
    console.log('Add to cart:', book);
    // Implement cart logic
  };

  const handlePreview = (book) => {
    console.log('Preview book:', book);
    // Implement preview logic
  };

  const handleLibraryClick = () => {
    navigate(`${import.meta.env.VITE_ACCOUNT_PAGE}?tab=library`);
  };

  // Pagination handlers
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FaBook className="text-white text-lg" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BookStore</h1>
            </div>
            <button 
              onClick={handleLibraryClick} 
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              My Library
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Controls Bar */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
            {/* Search Bar */}
            <div className="relative flex-1 w-full lg:max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search books, authors, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>

            {/* Controls */}
            <div className="flex gap-3 w-full lg:w-auto flex-wrap">
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-label="Grid view"
                >
                  <FaTh />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-label="List view"
                >
                  <FaList />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="default">Sort: Featured</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="title">Title A-Z</option>
                </select>
                <FaSortAmountDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <FaFilter className="text-gray-600" />
                <span>Filters</span>
              </button>

              {/* Reset Filters */}
              {(selectedCategory !== 'All' || selectedLanguage !== 'All' || 
                selectedPriceRange !== 'All' || searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 hover:bg-red-100 transition-colors text-red-700"
                >
                  <FaTimes />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => handleLanguageChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {languages.map(language => (
                      <option key={language} value={language}>
                        {language}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <select
                    value={selectedPriceRange}
                    onChange={(e) => handlePriceRangeChange(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    {priceRanges.map(range => (
                      <option key={range.label} value={range.label}>
                        {range.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600">
            Showing {processedBooks.length} of {pagination.total || 0} books
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Page {currentPage} of {totalPages}</span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading books...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">Error loading books: {error}</p>
            <button
              onClick={() => refetch(fetchParams)}
              className="mt-2 text-red-600 hover:text-red-800 font-medium"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Books Display */}
        {!loading && !error && (
          <>
            <BooksCardView
              books={processedBooks}
              viewMode={viewMode}
              onBookClick={handleBookClick}
              onAddToCart={handleAddToCart}
              onPreview={handlePreview}
            />

            {/* No Results State */}
            {processedBooks.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
                <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No books found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <button
                  onClick={resetFilters}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && processedBooks.length > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {/* Page Numbers */}
            {(() => {
              const pageNumbers = [];
              const maxVisible = 5;
              let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
              let endPage = Math.min(totalPages, startPage + maxVisible - 1);

              if (endPage - startPage < maxVisible - 1) {
                startPage = Math.max(1, endPage - maxVisible + 1);
              }

              // First page
              if (startPage > 1) {
                pageNumbers.push(
                  <button
                    key={1}
                    onClick={() => handlePageChange(1)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    1
                  </button>
                );
                if (startPage > 2) {
                  pageNumbers.push(<span key="ellipsis1" className="px-2">...</span>);
                }
              }

              // Page numbers
              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                  <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`px-4 py-2 border rounded-lg transition-colors ${
                      currentPage === i
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {i}
                  </button>
                );
              }

              // Last page
              if (endPage < totalPages) {
                if (endPage < totalPages - 1) {
                  pageNumbers.push(<span key="ellipsis2" className="px-2">...</span>);
                }
                pageNumbers.push(
                  <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {totalPages}
                  </button>
                );
              }

              return pageNumbers;
            })()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainBooksPage;



