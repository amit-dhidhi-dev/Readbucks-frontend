// // components/BooksPage.jsx
// import React, { useState, useEffect } from 'react';
// import { 
//   FaSearch, 
//   FaFilter, 
//   FaStar, 
//   FaShoppingCart, 
//   FaBook,
//   FaTimes,
//   FaSortAmountDown,
//   FaSortAmountUp
// } from 'react-icons/fa';
// import { booksData, categories, languages, priceRanges } from '../data/booksData';

// const BooksPage = () => {
//   // State management
//   const [books, setBooks] = useState(booksData);
//   const [filteredBooks, setFilteredBooks] = useState(booksData);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [selectedLanguage, setSelectedLanguage] = useState('All');
//   const [selectedPriceRange, setSelectedPriceRange] = useState('All');
//   const [sortBy, setSortBy] = useState('default');
//   const [showFilters, setShowFilters] = useState(false);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [booksPerPage] = useState(6);

//   // Filter and search logic
//   useEffect(() => {
//     let results = booksData;

//     // Search filter
//     if (searchTerm) {
//       results = results.filter(book =>
//         book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         book.description.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Category filter
//     if (selectedCategory !== 'All') {
//       results = results.filter(book => book.category === selectedCategory);
//     }

//     // Language filter
//     if (selectedLanguage !== 'All') {
//       results = results.filter(book => book.language === selectedLanguage);
//     }

//     // Price range filter
//     if (selectedPriceRange !== 'All') {
//       const range = priceRanges.find(r => r.label === selectedPriceRange);
//       results = results.filter(book => book.price >= range.min && book.price <= range.max);
//     }

//     // Sorting
//     switch (sortBy) {
//       case 'price-low-high':
//         results = [...results].sort((a, b) => a.price - b.price);
//         break;
//       case 'price-high-low':
//         results = [...results].sort((a, b) => b.price - a.price);
//         break;
//       case 'rating':
//         results = [...results].sort((a, b) => b.rating - a.rating);
//         break;
//       case 'title':
//         results = [...results].sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       default:
//         // Default sorting - featured first, then bestsellers
//         results = [...results].sort((a, b) => {
//           if (a.isFeatured && !b.isFeatured) return -1;
//           if (!a.isFeatured && b.isFeatured) return 1;
//           if (a.isBestseller && !b.isBestseller) return -1;
//           if (!a.isBestseller && b.isBestseller) return 1;
//           return 0;
//         });
//     }

//     setFilteredBooks(results);
//     setCurrentPage(1);
//   }, [searchTerm, selectedCategory, selectedLanguage, selectedPriceRange, sortBy]);

//   // Pagination
//   const indexOfLastBook = currentPage * booksPerPage;
//   const indexOfFirstBook = indexOfLastBook - booksPerPage;
//   const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

//   // Reset filters
//   const resetFilters = () => {
//     setSearchTerm('');
//     setSelectedCategory('All');
//     setSelectedLanguage('All');
//     setSelectedPriceRange('All');
//     setSortBy('default');
//   };

//   // Render star rating
//   const renderRating = (rating) => {
//     return (
//       <div className="flex items-center gap-1">
//         {[...Array(5)].map((_, i) => (
//           <FaStar
//             key={i}
//             className={`text-sm ${
//               i < Math.floor(rating) 
//                 ? 'text-yellow-400 fill-current' 
//                 : 'text-gray-300'
//             }`}
//           />
//         ))}
//         <span className="text-sm text-gray-600 ml-1">({rating})</span>
//       </div>
//     );
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
//                 <FaBook className="text-white text-lg" />
//               </div>
//               <h1 className="text-2xl font-bold text-gray-900">BookStore</h1>
//             </div>
//             <div className="flex items-center gap-4">
//               <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
//                 My Library
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Search and Controls Bar */}
//         <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
//           <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
//             {/* Search Bar */}
//             <div className="relative flex-1 w-full lg:max-w-md">
//               <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search books, authors, or topics..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//               />
//             </div>

//             {/* Controls */}
//             <div className="flex gap-3 w-full lg:w-auto">
//               {/* Sort Dropdown */}
//               <div className="relative">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                 >
//                   <option value="default">Sort by: Featured</option>
//                   <option value="price-low-high">Price: Low to High</option>
//                   <option value="price-high-low">Price: High to Low</option>
//                   <option value="rating">Highest Rated</option>
//                   <option value="title">Title A-Z</option>
//                 </select>
//                 <FaSortAmountDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
//               </div>

//               {/* Filter Toggle Button */}
//               <button
//                 onClick={() => setShowFilters(!showFilters)}
//                 className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
//               >
//                 <FaFilter className="text-gray-600" />
//                 <span>Filters</span>
//               </button>

//               {/* Reset Filters */}
//               <button
//                 onClick={resetFilters}
//                 className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-200 transition-colors text-gray-700"
//               >
//                 <FaTimes className="text-gray-600" />
//                 <span>Reset</span>
//               </button>
//             </div>
//           </div>

//           {/* Filters Panel */}
//           {showFilters && (
//             <div className="mt-6 pt-6 border-t border-gray-200">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 {/* Category Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Category
//                   </label>
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                   >
//                     {categories.map(category => (
//                       <option key={category} value={category}>
//                         {category}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Language Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Language
//                   </label>
//                   <select
//                     value={selectedLanguage}
//                     onChange={(e) => setSelectedLanguage(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                   >
//                     {languages.map(language => (
//                       <option key={language} value={language}>
//                         {language}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Price Range Filter */}
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Price Range
//                   </label>
//                   <select
//                     value={selectedPriceRange}
//                     onChange={(e) => setSelectedPriceRange(e.target.value)}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
//                   >
//                     {priceRanges.map(range => (
//                       <option key={range.label} value={range.label}>
//                         {range.label}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Results Summary */}
//         <div className="flex justify-between items-center mb-6">
//           <p className="text-gray-600">
//             Showing {filteredBooks.length} of {booksData.length} books
//           </p>
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span>Page {currentPage} of {totalPages}</span>
//           </div>
//         </div>

//         {/* Books Grid */}
//         {currentBooks.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {currentBooks.map(book => (
//               <div
//                 key={book.id}
//                 className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-300"
//               >
//                 <div className="p-6">
//                   {/* Book Header */}
//                   <div className="flex gap-4 mb-4">
//                     <div className="w-20 h-28 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
//                       <FaBook className="text-gray-400 text-2xl" />
//                     </div>
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-start justify-between mb-2">
//                         <h3 className="font-semibold text-gray-900 text-lg leading-tight truncate">
//                           {book.title}
//                         </h3>
//                         {book.isFeatured && (
//                           <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex-shrink-0 ml-2">
//                             Featured
//                           </span>
//                         )}
//                       </div>
//                       <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
//                       {renderRating(book.rating)}
//                     </div>
//                   </div>

//                   {/* Book Details */}
//                   <div className="space-y-2 mb-4">
//                     <p className="text-gray-700 text-sm line-clamp-2">
//                       {book.description}
//                     </p>
//                     <div className="flex justify-between text-sm text-gray-500">
//                       <span>{book.pages} pages</span>
//                       <span>{book.language}</span>
//                       <span>{book.category}</span>
//                     </div>
//                   </div>

//                   {/* Price and Actions */}
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <span className="text-2xl font-bold text-gray-900">
//                         ₹{book.price}
//                       </span>
//                     </div>
//                     <div className="flex gap-2">
//                       <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
//                         Buy Now
//                       </button>
//                       <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
//                         Preview
//                       </button>
//                     </div>
//                   </div>

//                   {/* Quiz Badge */}
//                   <div className="mt-3 pt-3 border-t border-gray-100">
//                     <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
//                       <FaStar className="text-xs" />
//                       Quiz Available - Win Prizes!
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
//             <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
//             <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
//             <p className="text-gray-600 mb-4">
//               Try adjusting your search or filters to find what you're looking for.
//             </p>
//             <button
//               onClick={resetFilters}
//               className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               Reset Filters
//             </button>
//           </div>
//         )}

//         {/* Pagination */}
//         {totalPages > 1 && (
//           <div className="flex justify-center items-center gap-2">
//             <button
//               onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Previous
//             </button>

//             {[...Array(totalPages)].map((_, index) => (
//               <button
//                 key={index + 1}
//                 onClick={() => setCurrentPage(index + 1)}
//                 className={`px-4 py-2 border rounded-lg transition-colors ${
//                   currentPage === index + 1
//                     ? 'bg-blue-600 text-white border-blue-600'
//                     : 'border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 {index + 1}
//               </button>
//             ))}

//             <button
//               onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//               disabled={currentPage === totalPages}
//               className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BooksPage;

// components/BooksPage.jsx (Updated)
import React, { useState, useEffect } from 'react';
import { 
    FaBook,
  FaSearch, 
  FaFilter, 
  FaTimes,
  FaSortAmountDown,
  FaTh,
  FaList
} from 'react-icons/fa';
import { booksData, categories, languages, priceRanges } from '../data/booksData';
import BooksCardView from '../components/BookCardView';

const BooksPage = () => {
  // State management
  const [books, setBooks] = useState(booksData);
  const [filteredBooks, setFilteredBooks] = useState(booksData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(8);

  // Filter and search logic (same as before)
  useEffect(() => {
    let results = booksData;
    
    if (searchTerm) {
      results = results.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      results = results.filter(book => book.category === selectedCategory);
    }

    if (selectedLanguage !== 'All') {
      results = results.filter(book => book.language === selectedLanguage);
    }

    if (selectedPriceRange !== 'All') {
      const range = priceRanges.find(r => r.label === selectedPriceRange);
      results = results.filter(book => book.price >= range.min && book.price <= range.max);
    }

    switch (sortBy) {
      case 'price-low-high':
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results = [...results].sort((a, b) => b.rating - a.rating);
        break;
      case 'title':
        results = [...results].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        results = [...results].sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isBestseller && !b.isBestseller) return -1;
          if (!a.isBestseller && b.isBestseller) return 1;
          return 0;
        });
    }

    setFilteredBooks(results);
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLanguage, selectedPriceRange, sortBy]);

  // Pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLanguage('All');
    setSelectedPriceRange('All');
    setSortBy('default');
  };

  // Card View Event Handlers
  const handleBookClick = (book) => {
    console.log('Book clicked:', book);
    // Navigate to book detail page or show modal
  };

  const handleAddToCart = (book) => {
    console.log('Add to cart:', book);
    // Add to cart logic
  };

  const handlePreview = (book) => {
    console.log('Preview book:', book);
    // Show book preview
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header (same as before) */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <FaBook className="text-white text-lg" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">BookStore</h1>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                My Library
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Controls Bar - UPDATED */}
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
            <div className="flex gap-3 w-full lg:w-auto">
              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${
                    viewMode === 'grid' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
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
                >
                  <FaList />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                >
                  <option value="default">Sort by: Featured</option>
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
              <button
                onClick={resetFilters}
                className="flex items-center gap-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-200 transition-colors text-gray-700"
              >
                <FaTimes className="text-gray-600" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Filters Panel (same as before) */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
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
                    onChange={(e) => setSelectedLanguage(e.target.value)}
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
                    onChange={(e) => setSelectedPriceRange(e.target.value)}
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
            Showing {filteredBooks.length} of {booksData.length} books
            {viewMode === 'grid' ? ' in grid view' : ' in list view'}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Page {currentPage} of {totalPages}</span>
          </div>
        </div>

        {/* BOOKS CARD VIEW COMPONENT */}
        <BooksCardView
          books={currentBooks}
          viewMode={viewMode}
          onBookClick={handleBookClick}
          onAddToCart={handleAddToCart}
          onPreview={handlePreview}
        />

        {/* No Results State */}
        {currentBooks.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
            <FaSearch className="mx-auto text-4xl text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
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

        {/* Pagination (same as before) */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 border rounded-lg transition-colors ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
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

export default BooksPage;