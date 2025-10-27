// src/components/BookContentUpload.jsx
import React, { useRef } from 'react';

const BookContentUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Book Content</h3>
      <div className="rounded-md bg-gray-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <i data-lucide="file-text" className="h-5 w-5 text-gray-400"></i>
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-gray-700">Upload your manuscript in PDF, DOCX, or EPUB format</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="mt-3 text-sm md:mt-0 md:ml-6"
            >
              <span className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                Upload File
              </span>
              <input 
                ref={fileInputRef}
                type="file" 
                className="sr-only" 
                onChange={handleFileUpload}
                accept=".pdf,.docx,.epub"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookContentUpload;