// components/Loading/LoadingButton.jsx
import React from 'react';
import LoadingSpinner from './LoadingSpinner';

const LoadingButton = ({
  children,
  loading = false,
  loadingText = 'Loading...',
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantClasses = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
    danger: "bg-red-600 hover:bg-red-700 text-white"
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      disabled={loading}
      {...props}
    >
      {loading && (
        <>
          <LoadingSpinner 
            size="sm" 
            color={variant === 'outline' ? 'blue' : 'white'}
            text=""
            className="mr-2"
          />
          {loadingText}
        </>
      )}
      {!loading && children}
    </button>
  );
};

export default LoadingButton;