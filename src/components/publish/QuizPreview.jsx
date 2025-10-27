// src/components/QuizPreview.jsx
import React from 'react';

const QuizPreview = ({ bookData }) => {
  if (!bookData.enableQuiz) {
    return null;
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quiz Preview</h3>
      <div className="bg-indigo-50 rounded-lg p-4">
        <div className="flex items-center mb-3">
          <i data-lucide="award" className="h-5 w-5 text-indigo-500 mr-2"></i>
          <span className="font-medium text-indigo-800">
            {bookData.quizTitle || 'Book Quiz'}
          </span>
        </div>
        <p className="text-sm text-indigo-700 mb-2">
          Test your knowledge about this book
        </p>
        <div className="flex items-center text-sm text-indigo-600">
          <i data-lucide="trophy" className="h-4 w-4 mr-1"></i>
          <span>
            Prize: ₹{bookData.prizeAmount || '0'} for {bookData.winnersCount || 1} winner{bookData.winnersCount > 1 ? 's' : ''}
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuizPreview;// src/components/QuizPreview.jsx
