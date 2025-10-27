// src/components/BookPreview.jsx
import React from 'react';

const BookPreview = ({ bookData, coverImage }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Book Preview</h3>
      <div className="border border-gray-200 rounded-lg p-4 text-center">
        {coverImage ? (
          <img 
            src={URL.createObjectURL(coverImage)} 
            alt="Book cover" 
            className="h-48 w-32 mx-auto rounded object-cover"
          />
        ) : (
          <div className="bg-gray-200 h-48 w-32 mx-auto rounded flex items-center justify-center">
            <i data-lucide="book" className="h-12 w-12 text-gray-400"></i>
          </div>
        )}
        <h4 className="mt-4 text-lg font-medium text-gray-900">
          {bookData.title || 'Book Title'}
        </h4>
        <p className="text-sm text-gray-500">
          by {bookData.author || 'Author Name'}
        </p>
        <div className="mt-4 flex justify-center space-x-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {bookData.genre}
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {bookData.language}
          </span>
        </div>
        <div className="mt-4">
          <span className="text-2xl font-bold text-gray-900">
            {bookData.price ? `₹${bookData.price}` : 'Free'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BookPreview;