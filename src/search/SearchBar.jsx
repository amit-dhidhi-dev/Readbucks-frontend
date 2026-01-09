// components/SearchBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    Search, X, Filter 
} from 'lucide-react';
import axios from 'axios';
import BookSuggestionItem from './BookSuggestionItem';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const searchRef = useRef(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounced search for suggestions
    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length < 2) {
                setSuggestions([]);
                return;
            }

            setLoading(true);
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/autocomplete`, {
                    params: { q: searchTerm, limit: 8 }
                });
                setSuggestions(response.data);
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchSuggestions();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search-page?q=${encodeURIComponent(searchTerm)}`);
            setShowSuggestions(false);
            setSearchTerm('');
        }
    };

    const handleSuggestionClick = (book) => {
        navigate(import.meta.env.VITE_BOOK_DETAILS_PAGE.replace(":bookId", book._id));
        setShowSuggestions(false);
        setSearchTerm('');
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
                <div className="relative flex items-center">
                    <div className="absolute left-3 text-gray-400">
                        <Search size={20} />
                    </div>
                    
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        placeholder="Search books by title, author, categories..."
                        className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all duration-300 shadow-sm"
                    />
                    
                    {searchTerm && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-12 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    )}
                    
                    <button
                        type="submit"
                        className="absolute right-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
                    >
                        <Search size={18} />
                    </button>
                </div>

                {/* Loading Indicator */}
                {loading && (
                    <div className="absolute right-20 top-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    </div>
                )}
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && (suggestions.length > 0 || loading) && (
                <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-y-auto">
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">
                            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <p className="mt-2">Searching...</p>
                        </div>
                    ) : (
                        <>
                            <div className="px-4 py-2 border-b border-gray-100">
                                <h3 className="text-sm font-semibold text-gray-600">
                                    Search Results ({suggestions.length})
                                </h3>
                            </div>
                            
                            {suggestions.map((book) => (
                                <BookSuggestionItem book={book} onClick={handleSuggestionClick} />
                            ))}
                                   
                            
                            <div className="px-4 py-3 bg-gray-50 rounded-b-lg">
                                <button
                                    onClick={handleSearch}
                                    className="w-full text-center text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center justify-center gap-2"
                                >
                                    <Filter size={14} />
                                    View all results for "{searchTerm}"
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchBar;