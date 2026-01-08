import React from 'react'
import { Edit3, Trash2, BarChart3, Share2 } from 'lucide-react'


function PublishedBookCard({ book, onEdit, onDelete, handleAnalyticsClick, handlePromoteClick }) {

    const getStatusColor = (status) => {
        return status === 'published'
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-yellow-100 text-yellow-800 border-yellow-200';
    };





return (
  <>
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Header Section */}
      <div className="flex justify-between items-start mb-4 sm:mb-6">
        <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
          {/* Enhanced Cover Image Container */}
          <div className="relative w-12 h-16 sm:w-16 sm:h-20 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform duration-300 overflow-hidden flex-shrink-0">
            {book.cover_image_url ? (
              <>
                <img 
                  src={book.cover_image_url} 
                  alt={`${book.title} cover`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                  loading="lazy"
                  onLoad={(e) => {
                    e.target.style.opacity = '1';
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling?.classList.remove('hidden');
                  }}
                  style={{ opacity: 0 }}
                />
                {/* Loading/Fallback Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 hidden">
                  <div className="flex flex-col items-center">
                    <span className="text-xl sm:text-2xl text-indigo-400 mb-1">📚</span>
                    <span className="text-xs text-indigo-300">Loading...</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <span className="text-xl sm:text-2xl text-indigo-400 mb-1">📚</span>
                <span className="text-xs text-indigo-300">No Image</span>
              </div>
            )}
          </div>
          
          {/* Title and Meta Info Section */}
          <div className="flex-1 min-w-0">
            {/* Fixed Title with proper truncation */}
            <h3 className="font-bold text-lg sm:text-xl text-gray-900 group-hover:text-indigo-600 transition-colors  leading-tight">
              {book.title}
            </h3>
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-2">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 max-w-full truncate">
                {book.categories[0]}
              </span>
              <span className="text-xs text-gray-500 hidden sm:inline">•</span>
              <span className="text-xs text-gray-500">{book.total_pages} pages</span>
              <span className="text-xs text-gray-500 hidden sm:inline">•</span>
              <span className="text-xs text-gray-500 uppercase">{book.language}</span>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-1 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0 ml-2">
          <button
            onClick={() => onEdit(book)}
            className="p-2 bg-blue-50 sm:bg-transparent hover:bg-blue-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
            title="Edit book"
          >
            <Edit3 size={16} className="sm:size-[18px] text-blue-600" />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="p-2 bg-red-50 sm:bg-transparent hover:bg-red-100 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95"
            title="Delete book"
          >
            <Trash2 size={16} className="sm:size-[18px] text-red-600" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
        {book.description}
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="text-center p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {book.total_reads || 0}
          </div>
          <div className="text-xs text-gray-600 font-medium mt-1">Readers</div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center sm:block w-full sm:w-auto">
          {/* Price Section with Discount */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              {/* Discount Price */}
              <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ₹{book.discount_price || book.price}
              </div>
              
              {/* Original Price with strikethrough if discount exists */}
              {book.discount_price && book.discount_price < book.price && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{book.price}
                </div>
              )}
            </div>
            
            {/* Discount Percentage Badge */}
            {book.discount_price && book.discount_price < book.price && (
              <div className="inline-flex items-center px-2 py-1 mt-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                {Math.round(((book.price - book.discount_price) / book.price) * 100)}% OFF
              </div>
            )}
            
            <div className="text-sm text-gray-600 font-medium mt-1">
              {book.total_purchases || 0} sales
            </div>
          </div>
        </div>
        
        <div className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold border-2 ${getStatusColor(book.status)} shadow-sm text-center w-full sm:w-auto`}>
          {book.status}
        </div>
      </div>
    </div>
  </>
);


}

export default PublishedBookCard
