// src/components/BookCard.jsx
import React, { useState } from 'react';
import { 
  Edit3, 
  Trash2, 
  BarChart3, 
  Users, 
  Award,
  Eye,
  BookOpen
} from 'lucide-react';

const BookCard = ({ book, onEdit, onDelete, onViewStats }) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusColor = (status) => {
    return status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-4">
          <div className="text-4xl">{book.cover}</div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{book.title}</h3>
            <p className="text-gray-600 text-sm">{book.category}</p>
          </div>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowActions(!showActions)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Edit3 size={16} className="text-gray-600" />
          </button>
          
          {showActions && (
            <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
              <button
                onClick={() => onEdit(book)}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-gray-50 rounded-t-lg"
              >
                <Edit3 size={16} />
                <span>Edit Book</span>
              </button>
              <button
                onClick={() => onViewStats(book)}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm hover:bg-gray-50"
              >
                <BarChart3 size={16} />
                <span>View Stats</span>
              </button>
              <button
                onClick={() => onDelete(book.id)}
                className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-b-lg"
              >
                <Trash2 size={16} />
                <span>Delete Book</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users size={16} />
          <span>{book.readers} readers</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Award size={16} />
          <span>{book.quizParticipants} quiz participants</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-2xl font-bold text-gray-900">${book.price}</div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(book.status)}`}>
          {book.status}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="text-sm text-gray-600">Sales</div>
          <div className="font-semibold text-gray-900">{book.sales}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Earnings</div>
          <div className="font-semibold text-gray-900">${book.earnings}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Rating</div>
          <div className="font-semibold text-gray-900 flex items-center justify-center">
            <span>{book.rating}</span>
            <span className="text-yellow-500 ml-1">★</span>
          </div>
        </div>
      </div>

      <div className="flex space-x-2 mt-4">
        <button className="flex-1 flex items-center justify-center space-x-2 bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
          <Eye size={16} />
          <span>Preview</span>
        </button>
        <button className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
          <BookOpen size={16} />
          <span>Read</span>
        </button>
      </div>
    </div>
  );
};

export default BookCard;