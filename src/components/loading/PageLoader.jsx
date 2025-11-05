// components/Loading/PageLoader.jsx
import React from 'react';

const PageLoader = ({ 
  title = "Loading",
  subtitle = "Please wait while we load your content",
  showProgress = false,
  progress = 0
}) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        {/* Animated Logo/Icon */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto mb-4 animate-bounce flex items-center justify-center">
            <span className="text-white font-bold text-xl">EB</span>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
        <p className="text-gray-600 mb-8">{subtitle}</p>
        
        {/* Progress Bar */}
        {showProgress && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        {/* Loading Dots */}
        <div className="flex justify-center space-x-2">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageLoader;