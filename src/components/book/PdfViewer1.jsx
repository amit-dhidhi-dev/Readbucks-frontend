import React, { useState } from 'react';

const PdfViewer1 = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">PDF Viewer</h2>
      
      {!pdfFile ? (
        <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-300 hover:border-blue-400">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload PDF Document</h3>
            <p className="text-gray-600 mb-6">
              Select a PDF file to view its contents. We support all standard PDF formats.
            </p>
            <label className="cursor-pointer inline-block">
              <input
                type="file"
                onChange={handleFileSelect}
                accept=".pdf,application/pdf"
                className="hidden"
              />
              <span className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105">
                Choose PDF File
              </span>
            </label>
            <p className="mt-4 text-sm text-gray-500">Maximum file size: 50MB</p>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Info */}
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-green-900 text-lg">{pdfFile.name}</p>
                  <p className="text-green-700">{(pdfFile.size / (1024 * 1024)).toFixed(2)} MB • PDF Document</p>
                </div>
              </div>
              <button
                onClick={() => setPdfFile(null)}
                className="text-gray-400 hover:text-red-500 transition duration-200 p-2 hover:bg-red-50 rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* PDF Viewer Placeholder */}
          <div className="border-2 border-gray-200 rounded-xl bg-white shadow-lg overflow-hidden">
            <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
              <span className="font-semibold">PDF Preview</span>
              <div className="flex space-x-2">
                <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm transition duration-200">
                  Zoom In
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-sm transition duration-200">
                  Zoom Out
                </button>
              </div>
            </div>
            <div className="p-12 text-center bg-gradient-to-br from-gray-50 to-blue-50 min-h-[500px] flex items-center justify-center">
              <div>
                <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">PDF Content Loaded</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Your PDF file "<span className="font-semibold">{pdfFile.name}</span>" is ready for viewing.
                  In a real implementation, you would integrate with a PDF.js library here.
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
                    Download PDF
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition duration-200">
                    Print
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfViewer1;