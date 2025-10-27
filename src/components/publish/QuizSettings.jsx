// src/components/QuizSettings.jsx
import React, { useState } from 'react';

const QuizSettings = ({ bookData, onChange }) => {
  const [showQuizSettings, setShowQuizSettings] = useState(false);

  const handleQuizToggle = (e) => {
    const isChecked = e.target.checked;
    onChange(e);
    setShowQuizSettings(isChecked);
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Quiz Settings</h3>
      <div className="bg-indigo-50 p-4 rounded-md mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <i data-lucide="award" className="h-5 w-5 text-indigo-400"></i>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-indigo-800">Engage Readers with Quizzes</h3>
            <div className="mt-2 text-sm text-indigo-700">
              <p>Create quizzes for your book readers. Winners can earn prize money!</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="enableQuiz"
              name="enableQuiz"
              type="checkbox"
              checked={bookData.enableQuiz}
              onChange={handleQuizToggle}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="enableQuiz" className="font-medium text-gray-700">
              Enable Quiz for this Book
            </label>
            <p className="text-gray-500">Readers will be able to take a quiz after reading your book.</p>
          </div>
        </div>
        
        {showQuizSettings && (
          <div className="ml-7 space-y-4">
            <div>
              <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-700">
                Quiz Title
              </label>
              <input
                type="text"
                id="quizTitle"
                name="quizTitle"
                value={bookData.quizTitle}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter quiz title"
              />
            </div>
            <div>
              <label htmlFor="prizeAmount" className="block text-sm font-medium text-gray-700">
                Prize Amount (₹)
              </label>
              <input
                type="number"
                id="prizeAmount"
                name="prizeAmount"
                value={bookData.prizeAmount}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="0.00"
                min="0"
              />
            </div>
            <div>
              <label htmlFor="winnersCount" className="block text-sm font-medium text-gray-700">
                Number of Winners
              </label>
              <input
                type="number"
                id="winnersCount"
                name="winnersCount"
                value={bookData.winnersCount}
                onChange={onChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="1"
                min="1"
              />
            </div>
            <div>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <i data-lucide="plus" className="mr-2 h-4 w-4"></i>
                Add Questions
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSettings;