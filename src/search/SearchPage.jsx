// pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import {
    Search, Filter, X, ChevronLeft, ChevronRight,
    Book,
} from 'lucide-react';
import { FaTh, FaList } from 'react-icons/fa';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import BooksCardView from '../components/BookCardView';

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [filters, setFilters] = useState({
        q: queryParams.get('q') || '',
        category: queryParams.get('category') || '',
        author: queryParams.get('author') || '',
        language: queryParams.get('language') || '',
        access_level: queryParams.get('access_level') || '',
        status: queryParams.get('status') || '',
        is_free: queryParams.get('is_free') || '',
        difficulty_level: queryParams.get('difficulty_level') || '',
        tags: queryParams.get('tags') || '',
        min_price: queryParams.get('min_price') || '',
        max_price: queryParams.get('max_price') || '',
        sort_by: queryParams.get('sort_by') || 'relevance',
        page: parseInt(queryParams.get('page')) || 1,
        limit: 12
    });

    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [searchFilters, setSearchFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [totalBooks, setTotalBooks] = useState(0);
    const [showFilters, setShowFilters] = useState(false);
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

    useEffect(() => {
        fetchFiltersData();
        searchBooks();
    }, [filters.page, filters.sort_by]);

    useEffect(() => {
        // Update URL when filters change
        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (value) params.append(key, value.toString());
        });
        window.history.replaceState({}, '', `${location.pathname}?${params}`);
    }, [filters]);

    const fetchFiltersData = async () => {
        try {
            const [categoriesRes, languagesRes, filtersRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/categories`),
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/languages`),
                axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/search-filters`)
            ]);

            setCategories(categoriesRes.data.categories);
            setLanguages(languagesRes.data.languages);
            setSearchFilters(filtersRes.data);
        } catch (error) {
            console.error('Error fetching filters:', error);
        }
    };

    const searchBooks = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== '' && value !== null) {
                    params.append(key, value.toString());
                }
            });

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/books/search?${params}`
            );

            setBooks(response.data.books || response.data);
            setTotalBooks(response.data.total || 0);
        } catch (error) {
            console.error('Error searching books:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            page: 1 // Reset to first page on new search
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        searchBooks();
    };

    const handleReset = () => {
        setFilters({
            q: '',
            category: '',
            author: '',
            language: '',
            access_level: '',
            status: '',
            is_free: '',
            difficulty_level: '',
            tags: '',
            min_price: '',
            max_price: '',
            sort_by: 'relevance',
            page: 1,
            limit: 12
        });
    };

    const totalPages = Math.ceil(totalBooks / filters.limit);

    const navigate = useNavigate();


    const handleBookClick = (book) => {
        navigate(import.meta.env.VITE_BOOK_DETAILS_PAGE.replace(":bookId", book._id));
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Search Header */}
            <div className="max-w-4xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl border border-white/20">
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                        role="search"
                        aria-label="Book search"
                    >
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="flex-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Search
                                        size={22}
                                        className="text-gray-400"
                                        aria-hidden="true"
                                    />
                                </div>
                                <input
                                    type="search"
                                    name="q"
                                    value={filters.q}
                                    onChange={handleInputChange}
                                    placeholder="Search by title, author, genre, or keywords..."
                                    className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-3 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
                                    aria-label="Search books"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 active:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 min-w-[140px]"
                                aria-label="Submit search"
                            >
                                <Search size={20} aria-hidden="true" />
                                <span>Search</span>
                            </button>
                        </div>


                    </form>
                </div>
            </div>
        

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    {/* Filters Sidebar */}
                    <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Filter size={20} />
                                    Filters
                                </h2>
                                <button
                                    onClick={() => setShowFilters(false)}
                                    className="lg:hidden text-gray-500 hover:text-gray-700"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            {/* View Mode Toggle */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    View Mode
                                </label>
                                <div className="flex border border-gray-300 rounded-lg overflow-hidden">

                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-3 transition-colors ${viewMode === 'grid'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                            }`}
                                        aria-label="Grid view"
                                    >
                                        <FaTh />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-3 transition-colors ${viewMode === 'list'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-600 hover:bg-gray-50'
                                            }`}
                                        aria-label="List view"
                                    >
                                        <FaList />
                                    </button>
                                </div>
                            </div>


                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Search Query */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Search
                                    </label>
                                    <input
                                        type="text"
                                        name="q"
                                        value={filters.q}
                                        onChange={handleInputChange}
                                        placeholder="Title, author, description..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        name="category"
                                        value={filters.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All Categories</option>
                                        {categories.map((cat) => (
                                            <option key={cat._id} value={cat._id}>
                                                {cat._id} ({cat.count})
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Author Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Author
                                    </label>
                                    <input
                                        type="text"
                                        name="author"
                                        value={filters.author}
                                        onChange={handleInputChange}
                                        placeholder="Search by author..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>

                                {/* Language Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Language
                                    </label>
                                    <select
                                        name="language"
                                        value={filters.language}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All Languages</option>
                                        {languages.map((lang) => (
                                            <option key={lang} value={lang.toLowerCase()}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Access Level */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Access Level
                                    </label>
                                    <select
                                        name="access_level"
                                        value={filters.access_level}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All Access</option>
                                        <option value="free">Free</option>
                                        <option value="paid">Paid</option>
                                        <option value="premium">Premium</option>
                                    </select>
                                </div>

                                {/* Free Books Only */}
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="is_free"
                                        name="is_free"
                                        checked={filters.is_free === 'true'}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            is_free: e.target.checked ? 'true' : ''
                                        }))}
                                        className="h-4 w-4 text-blue-600 rounded"
                                    />
                                    <label htmlFor="is_free" className="ml-2 text-sm text-gray-700">
                                        Free Books Only
                                    </label>
                                </div>

                                {/* Price Range */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Price Range
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            name="min_price"
                                            value={filters.min_price}
                                            onChange={handleInputChange}
                                            placeholder="Min"
                                            min="0"
                                            step="0.01"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        <input
                                            type="number"
                                            name="max_price"
                                            value={filters.max_price}
                                            onChange={handleInputChange}
                                            placeholder="Max"
                                            min="0"
                                            step="0.01"
                                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                    {searchFilters.price_range && (
                                        <p className="text-xs text-gray-500 mt-1">
                                            Range: ₹ {searchFilters.price_range[0]?.min_price || 0} -
                                            ₹ {searchFilters.price_range[0]?.max_price || 0}
                                        </p>
                                    )}
                                </div>

                                {/* Difficulty Level */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Difficulty Level
                                    </label>
                                    <select
                                        name="difficulty_level"
                                        value={filters.difficulty_level}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="">All Levels</option>
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sort By
                                    </label>
                                    <select
                                        name="sort_by"
                                        value={filters.sort_by}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="relevance">Relevance</option>
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="price_low">Price: Low to High</option>
                                        <option value="price_high">Price: High to Low</option>
                                        <option value="title_asc">Title A-Z</option>
                                        <option value="title_desc">Title Z-A</option>
                                    </select>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-4">
                                    <button
                                        type="submit"
                                        className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                    >
                                        Apply Filters
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="px-4 py-2.5 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </form>

                            {/* Results Count */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Found <span className="font-bold text-blue-600">{totalBooks}</span> books
                                </p>
                                {searchFilters.price_range && (
                                    <p className="text-xs text-gray-500 mt-1">
                                        Average price: ₹ {(searchFilters.price_range[0]?.avg_price || 0).toFixed(2)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="lg:w-3/4">
                        {/* Mobile Filter Toggle */}
                        <div className="lg:hidden mb-4">
                            <button
                                onClick={() => setShowFilters(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                            >
                                <Filter size={18} />
                                Show Filters
                            </button>
                        </div>

                        {/* Results Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
                                {filters.q && (
                                    <p className="text-gray-600 mt-1">
                                        Results for: <span className="font-semibold">"{filters.q}"</span>
                                    </p>
                                )}
                            </div>

                            <div className="text-sm text-gray-500">
                                Page {filters.page} of {totalPages}
                            </div>
                        </div>

                        {/* Loading State */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                                    <p className="mt-4 text-gray-600">Searching books...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Books Grid */}
                                {books.length > 0 ? (
                                    <BooksCardView
                                        books={books}
                                        viewMode={viewMode}
                                        onBookClick={handleBookClick}
                                        searchBook={true}
                                    />

                                ) : (
                                    <div className="text-center py-16 bg-white rounded-xl shadow">
                                        <Book size={64} className="mx-auto text-gray-400 mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                            No books found
                                        </h3>
                                        <p className="text-gray-600 max-w-md mx-auto mb-6">
                                            Try adjusting your search or filter criteria to find what you're looking for.
                                        </p>
                                        <div className="flex gap-3 justify-center">
                                            <button
                                                onClick={handleReset}
                                                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            >
                                                Clear All Filters
                                            </button>
                                            <button
                                                onClick={() => setFilters(prev => ({ ...prev, is_free: 'true' }))}
                                                className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                                            >
                                                Show Free Books
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Pagination */}
                                {books.length > 0 && totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-4 mt-10">
                                        <button
                                            onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                                            disabled={filters.page === 1}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${filters.page === 1
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                }`}
                                        >
                                            <ChevronLeft size={18} />
                                            Previous
                                        </button>

                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                                let pageNum;
                                                if (totalPages <= 5) {
                                                    pageNum = i + 1;
                                                } else if (filters.page <= 3) {
                                                    pageNum = i + 1;
                                                } else if (filters.page >= totalPages - 2) {
                                                    pageNum = totalPages - 4 + i;
                                                } else {
                                                    pageNum = filters.page - 2 + i;
                                                }

                                                return (
                                                    <button
                                                        key={pageNum}
                                                        onClick={() => setFilters(prev => ({ ...prev, page: pageNum }))}
                                                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${filters.page === pageNum
                                                            ? 'bg-blue-600 text-white'
                                                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                            }`}
                                                    >
                                                        {pageNum}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <button
                                            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                                            disabled={filters.page === totalPages}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${filters.page === totalPages
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                                                }`}
                                        >
                                            Next
                                            <ChevronRight size={18} />
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchPage;