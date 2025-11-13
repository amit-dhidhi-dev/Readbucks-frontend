// components/Books/BookCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img 
          src={book.cover_image_url} 
          alt={book.title}
          className="w-full h-48 object-cover"
        />
        {book.discount_price && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm">
            Sale
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{book.title}</h3>
        <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
        
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <span key={i}>
                {i < Math.floor(book.average_rating) ? '★' : '☆'}
              </span>
            ))}
          </div>
          <span className="text-gray-500 text-sm ml-2">
            ({book.total_ratings})
          </span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {book.is_free ? (
              <span className="text-green-600 font-semibold">Free</span>
            ) : (
              <>
                {book.discount_price ? (
                  <>
                    <span className="text-lg font-bold">₹{book.discount_price}</span>
                    <span className="text-gray-400 line-through">₹{book.price}</span>
                  </>
                ) : (
                  <span className="text-lg font-bold">₹{book.price}</span>
                )}
              </>
            )}
          </div>
          
          {book.has_quizzes && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              Quiz
            </span>
          )}
        </div>

        <div className="flex space-x-2">
          <Link 
            to={`/book/${book.id}`}
            className="flex-1 bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition-colors"
          >
            View Details
          </Link>
          
          {book.is_free || book.access_level === 'free' ? (
            <button className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 transition-colors">
              Read Free
            </button>
          ) : (
            <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors">
              Buy Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;