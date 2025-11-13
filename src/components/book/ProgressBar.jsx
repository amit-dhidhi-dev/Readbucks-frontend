import React from 'react'


const ProgressBar = ({ progress, isUploading }) => {
    if (!isUploading) return null;
    
    return (
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-1">
          Uploading... {Math.round(progress)}%
        </p>
      </div>
    );
  };
  
  export default ProgressBar
  