// components/BooksCardView.jsx
import React from 'react';
import { FaStar, FaBook, FaShoppingCart, FaEye, FaRupeeSign } from 'react-icons/fa';
import './css/BookCardView.css'
const BooksCardView = ({ 
  books, 
  onBookClick, 
  onAddToCart, 
  onPreview,
  viewMode = 'grid' // 'grid' or 'list'
}) => {
  
  // Render star rating
  const renderRating = (rating) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`text-sm ${
              i < Math.floor(rating) 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  // Grid View
  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map(book => (
        <div
          key={book.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200 cursor-pointer group"
          onClick={() => onBookClick && onBookClick(book)}
        >
          {/* Book Image/Thumbnail */}
          <div className="relative">
            <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-xl flex items-center justify-center">
              <FaBook className="text-4xl text-blue-400" />
            </div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {book.isFeatured && (
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
              {book.isBestseller && (
                <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                  Bestseller
                </span>
              )}
            </div>

            {/* Quiz Badge */}
            <div className="absolute top-3 right-3">
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                <FaStar className="text-xs" />
                Quiz
              </span>
            </div>
          </div>

          {/* Book Content */}
          <div className="p-5">
            {/* Title and Author */}
            <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {book.title}
            </h3>
            <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

            {/* Rating */}
            <div className="mb-3">
              {renderRating(book.rating)}
            </div>

            {/* Description */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-2">
              {book.description}
            </p>

            {/* Meta Info */}
            <div className="flex justify-between text-xs text-gray-500 mb-4">
              <span>{book.pages} pages</span>
              <span>{book.language}</span>
              <span>{book.category}</span>
            </div>

            {/* Price and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <FaRupeeSign className="text-gray-700" />
                <span className="text-2xl font-bold text-gray-900">
                  {book.price}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview && onPreview(book);
                  }}
                  className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors tooltip"
                  title="Preview Book"
                >
                  <FaEye className="text-gray-600" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart && onAddToCart(book);
                  }}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaShoppingCart className="text-sm" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // List View
  const ListView = () => (
    <div className="space-y-4">
      {books.map(book => (
        <div
          key={book.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200 cursor-pointer group"
          onClick={() => onBookClick && onBookClick(book)}
        >
          <div className="flex">
            {/* Book Image/Thumbnail */}
            <div className="w-32 flex-shrink-0">
              <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-l-xl flex items-center justify-center">
                <FaBook className="text-3xl text-blue-400" />
              </div>
            </div>

            {/* Book Content */}
            <div className="flex-1 p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                    {book.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                </div>
                
                {/* Badges */}
                <div className="flex gap-2 ml-4">
                  {book.isFeatured && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      Featured
                    </span>
                  )}
                  {book.isBestseller && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                      Bestseller
                    </span>
                  )}
                  <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap flex items-center gap-1">
                    <FaStar className="text-xs" />
                    Quiz
                  </span>
                </div>
              </div>

              <div className="flex gap-8">
                {/* Left Section - Details */}
                <div className="flex-1">
                  <div className="mb-3">
                    {renderRating(book.rating)}
                  </div>
                  
                  <p className="text-gray-700 text-sm mb-3">
                    {book.description}
                  </p>

                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>{book.pages} pages</span>
                    <span>{book.language}</span>
                    <span>{book.category}</span>
                  </div>
                </div>

                {/* Right Section - Price and Actions */}
                <div className="w-48 flex-shrink-0 flex flex-col justify-between">
                  <div className="flex items-center gap-1 justify-end mb-3">
                    <FaRupeeSign className="text-gray-700" />
                    <span className="text-2xl font-bold text-gray-900">
                      {book.price}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPreview && onPreview(book);
                      }}
                      className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <FaEye className="text-sm" />
                      <span>Preview</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart && onAddToCart(book);
                      }}
                      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <FaShoppingCart className="text-sm" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="books-card-view">
      {viewMode === 'grid' ? <GridView /> : <ListView />}
    </div>
  );
};

export default BooksCardView;