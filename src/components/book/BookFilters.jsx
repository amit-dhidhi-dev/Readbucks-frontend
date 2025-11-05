// components/Books/BookFilters.jsx
import React, { useState } from 'react';

const BookFilters = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    category: '',
    language: '',
    min_price: '',
    max_price: '',
    access_level: '',
    has_quizzes: '',
    is_free: '',
    sort_by: 'created_at',
    sort_order: 'desc',
    ...initialFilters
  });

  // Filter options
  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'fiction', label: 'Fiction' },
    { value: 'non_fiction', label: 'Non-Fiction' },
    { value: 'educational', label: 'Educational' },
    { value: 'self_help', label: 'Self Help' },
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'science', label: 'Science' },
    { value: 'history', label: 'History' },
    { value: 'biography', label: 'Biography' }
  ];

  const languages = [
    { value: '', label: 'All Languages' },
    { value: 'hindi', label: 'Hindi' },
    { value: 'english', label: 'English' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'kannada', label: 'Kannada' },
    { value: 'malayalam', label: 'Malayalam' },
    { value: 'punjabi', label: 'Punjabi' }
  ];

  const accessLevels = [
    { value: '', label: 'All Access' },
    { value: 'free', label: 'Free' },
    { value: 'paid', label: 'Paid' },
    { value: 'premium', label: 'Premium' }
  ];

  const sortOptions = [
    { value: 'created_at_desc', label: 'Newest First', sort_by: 'created_at', sort_order: 'desc' },
    { value: 'created_at_asc', label: 'Oldest First', sort_by: 'created_at', sort_order: 'asc' },
    { value: 'title_asc', label: 'Title A-Z', sort_by: 'title', sort_order: 'asc' },
    { value: 'title_desc', label: 'Title Z-A', sort_by: 'title', sort_order: 'desc' },
    { value: 'price_asc', label: 'Price: Low to High', sort_by: 'price', sort_order: 'asc' },
    { value: 'price_desc', label: 'Price: High to Low', sort_by: 'price', sort_order: 'desc' },
    { value: 'rating_desc', label: 'Highest Rated', sort_by: 'average_rating', sort_order: 'desc' },
    { value: 'popularity_desc', label: 'Most Popular', sort_by: 'total_purchases', sort_order: 'desc' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = {
      ...filters,
      [key]: value
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (type, value) => {
    const newFilters = {
      ...filters,
      [type]: value ? parseInt(value) : ''
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (value) => {
    const selectedSort = sortOptions.find(option => option.value === value);
    const newFilters = {
      ...filters,
      sort_by: selectedSort.sort_by,
      sort_order: selectedSort.sort_order
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      language: '',
      min_price: '',
      max_price: '',
      access_level: '',
      has_quizzes: '',
      is_free: '',
      sort_by: 'created_at',
      sort_order: 'desc'
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const hasActiveFilters = () => {
    return filters.category || filters.language || filters.min_price || 
           filters.max_price || filters.access_level || filters.has_quizzes || 
           filters.is_free;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 lg:mb-0">Filter Books</h2>
        
        <div className="flex items-center space-x-4">
          {hasActiveFilters() && (
            <button
              onClick={clearFilters}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear All Filters
            </button>
          )}
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sort by:</span>
            <select
              value={`${filters.sort_by}_${filters.sort_order}`}
              onChange={(e) => handleSortChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Language Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language
          </label>
          <select
            value={filters.language}
            onChange={(e) => handleFilterChange('language', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {languages.map(language => (
              <option key={language.value} value={language.value}>
                {language.label}
              </option>
            ))}
          </select>
        </div>

        {/* Access Level Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Access Level
          </label>
          <select
            value={filters.access_level}
            onChange={(e) => handleFilterChange('access_level', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {accessLevels.map(level => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range (₹)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.min_price}
              onChange={(e) => handlePriceChange('min_price', e.target.value)}
              className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.max_price}
              onChange={(e) => handlePriceChange('max_price', e.target.value)}
              className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="0"
            />
          </div>
        </div>
      </div>

      {/* Additional Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Quiz Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quiz Availability
          </label>
          <select
            value={filters.has_quizzes}
            onChange={(e) => handleFilterChange('has_quizzes', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Books</option>
            <option value="true">With Quizzes</option>
            <option value="false">Without Quizzes</option>
          </select>
        </div>

        {/* Free/Paid Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Type
          </label>
          <select
            value={filters.is_free}
            onChange={(e) => handleFilterChange('is_free', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Books</option>
            <option value="true">Free Only</option>
            <option value="false">Paid Only</option>
          </select>
        </div>

        {/* Active Filters Display */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Active Filters
          </label>
          <div className="flex flex-wrap gap-2">
            {filters.category && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Category: {categories.find(c => c.value === filters.category)?.label}
                <button
                  onClick={() => handleFilterChange('category', '')}
                  className="ml-1 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            
            {filters.language && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Language: {languages.find(l => l.value === filters.language)?.label}
                <button
                  onClick={() => handleFilterChange('language', '')}
                  className="ml-1 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            
            {(filters.min_price || filters.max_price) && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Price: ₹{filters.min_price || 0} - ₹{filters.max_price || '∞'}
                <button
                  onClick={() => {
                    handleFilterChange('min_price', '');
                    handleFilterChange('max_price', '');
                  }}
                  className="ml-1 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
            
            {!hasActiveFilters() && (
              <span className="text-xs text-gray-500">No active filters</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookFilters;