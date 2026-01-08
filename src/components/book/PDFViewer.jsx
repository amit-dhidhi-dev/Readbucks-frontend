import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess(document) {
    setNumPages(document.numPages);
    setLoading(false);
    setError(null);
    console.log('document', document)
  }

  function onDocumentLoadError(error) {
    console.error('PDF load error:', error);
    setLoading(false);
    setError('PDF load failed. Please try again.');
  }

  const goToPreviousPage = () => {
    setPageNumber(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber(prev => Math.min(prev + 1, numPages));
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };

  const resetZoom = () => {
    setScale(1.0);
  };


  const goToPage = (page) => {
    setPageNumber(page);
  };






  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-2 sm:p-4 md:p-6">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl mb-4 sm:mb-6 overflow-hidden">       


          {/* Desktop Controls */}
          <div className="hidden md:flex items-center justify-between p-4 bg-gray-50 border-b border-gray-200">
            {/* Navigation */}
            <div className="flex items-center space-x-3">
              <button
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transition-all shadow-md disabled:shadow-none transform hover:scale-105 disabled:transform-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-medium">Previous</span>
              </button>

              <div className="flex items-center space-x-2 px-5 py-2.5 bg-white border-2 border-gray-300 rounded-xl shadow-sm">
                <span className="text-gray-600 font-medium">Page</span>
                <input
                  type="number"
                  value={pageNumber}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= numPages) {
                      goToPage(page);
                    }
                  }}
                  className="w-14 text-center font-bold text-blue-600 bg-blue-50 rounded-lg px-2 py-1 border-none outline-none focus:ring-2 focus:ring-blue-400"
                  min="1"
                  max={numPages || 1}
                />
                <span className="text-gray-400">/</span>
                <span className="font-bold text-gray-700">{numPages || '--'}</span>
              </div>

              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl disabled:from-gray-300 disabled:to-gray-300 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transition-all shadow-md disabled:shadow-none transform hover:scale-105 disabled:transform-none"
              >
                <span className="font-medium">Next</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center space-x-3">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className="p-2.5 bg-white border-2 border-gray-300 rounded-xl disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow transform hover:scale-110 disabled:transform-none"
                title="Zoom Out"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>

              <div className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-bold min-w-[80px] text-center shadow-md">
                {Math.round(scale * 100)}%
              </div>

              <button
                onClick={zoomIn}
                disabled={scale >= 3.0}
                className="p-2.5 bg-white border-2 border-gray-300 rounded-xl disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm hover:shadow transform hover:scale-110 disabled:transform-none"
                title="Zoom In"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>

              <button
                onClick={resetZoom}
                className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-md transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="font-medium">Reset</span>
              </button>
            </div>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden p-3 bg-gray-50 border-b border-gray-200 space-y-3">
            {/* Page Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={goToPreviousPage}
                disabled={pageNumber <= 1}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium shadow hover:bg-blue-600 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span>Prev</span>
              </button>

              <div className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm">
                <input
                  type="number"
                  value={pageNumber}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (page >= 1 && page <= numPages) {
                      goToPage(page);
                    }
                  }}
                  className="w-10 text-center font-bold text-blue-600 bg-blue-50 rounded px-1 py-0.5 text-sm border-none outline-none"
                  min="1"
                  max={numPages || 1}
                />
                <span className="text-gray-400 text-sm">/</span>
                <span className="font-bold text-gray-700 text-sm">{numPages || '--'}</span>
              </div>

              <button
                onClick={goToNextPage}
                disabled={pageNumber >= numPages}
                className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium shadow hover:bg-blue-600 transition-colors"
              >
                <span>Next</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className="p-2 bg-white border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-400 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                </svg>
              </button>

              <div className="px-4 py-2 bg-purple-500 text-white rounded-lg font-bold text-sm shadow min-w-[70px] text-center">
                {Math.round(scale * 100)}%
              </div>

              <button
                onClick={zoomIn}
                disabled={scale >= 3.0}
                className="p-2 bg-white border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-400 shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                </svg>
              </button>

              <button
                onClick={resetZoom}
                className="p-2 bg-green-500 text-white rounded-lg shadow-sm"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* PDF Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Loading State */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-16 sm:py-24">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200"></div>
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent absolute top-0 left-0"></div>
              </div>
              <span className="mt-4 text-gray-600 font-medium text-sm sm:text-base">Loading PDF...</span>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="m-4 sm:m-6 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6 sm:p-8 text-center">
              <div className="flex justify-center mb-4">
                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="text-red-700 font-semibold text-lg mb-3">{error}</div>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg transform hover:scale-105 font-medium"
              >
                Retry Loading
              </button>
            </div>
          )}

          {/* PDF Document */}
          {!error && (
            <div className="flex justify-center p-2 sm:p-4 bg-gray-100 overflow-auto" style={{ minHeight: '60vh', maxHeight: '80vh' }}>
              <Document
                file={pdfUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={onDocumentLoadError}
                onItemClick={({ pageNumber }) => setPageNumber(pageNumber)}
                loading={
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  scale={scale}
                  loading={
                    <div className="flex justify-center items-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    </div>
                  }
                  className="shadow-2xl rounded-lg overflow-hidden"
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                />
              </Document>

            </div>
          )}


        </div>

        {/* Footer Info */}
        <div className="mt-4 text-center text-gray-500 text-xs sm:text-sm">
          <p>Use zoom controls to adjust view • Navigate with Previous/Next buttons</p>
        </div>
      </div>
    </div>
  );



};

export default PDFViewer;


