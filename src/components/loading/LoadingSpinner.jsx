// components/Loading/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ 
  size = 'md',
  variant = 'spinner', // 'spinner', 'dots', 'pulse'
  color = 'blue',
  text = 'Loading...',
  fullScreen = false,
  overlay = false,
  className = ''
}) => {
  // Size classes
  const sizeClasses = {
    sm: { spinner: 'w-4 h-4', dots: 'w-2 h-2', text: 'text-xs' },
    md: { spinner: 'w-8 h-8', dots: 'w-3 h-3', text: 'text-sm' },
    lg: { spinner: 'w-12 h-12', dots: 'w-4 h-4', text: 'text-base' },
    xl: { spinner: 'w-16 h-16', dots: 'w-5 h-5', text: 'text-lg' }
  };

  // Color classes
  const colorClasses = {
    blue: 'bg-blue-500 border-blue-500',
    gray: 'bg-gray-500 border-gray-500',
    white: 'bg-white border-white',
    green: 'bg-green-500 border-green-500',
    red: 'bg-red-500 border-red-500',
    yellow: 'bg-yellow-500 border-yellow-500',
    indigo: 'bg-indigo-500 border-indigo-500'
  };

  // Render different spinner variants
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-2 mb-3">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className={`${sizeClasses[size].dots} ${colorClasses[color].split(' ')[0]} rounded-full animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        );

      case 'pulse':
        return (
          <div
            className={`${sizeClasses[size].spinner} ${colorClasses[color].split(' ')[0]} rounded-full animate-pulse mb-3`}
          />
        );

      case 'spinner':
      default:
        return (
          <div
            className={`
              ${sizeClasses[size].spinner}
              border-4 border-t-transparent rounded-full
              animate-spin
              mb-3
              ${colorClasses[color].split(' ')[1]} // border color
            `}
          />
        );
    }
  };

  const content = (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      {renderSpinner()}
      
      {text && (
        <p className={`${sizeClasses[size].text} ${color === 'white' ? 'text-white' : 'text-gray-600'} font-medium`}>
          {text}
        </p>
      )}
    </div>
  );

  // Full screen overlay
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 z-50 flex items-center justify-center">
        {content}
      </div>
    );
  }

  // Overlay without full screen
  if (overlay) {
    return (
      <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex items-center justify-center rounded-lg">
        {content}
      </div>
    );
  }

  return content;
};

export default LoadingSpinner;