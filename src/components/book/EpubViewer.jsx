import React, { useState, useRef } from 'react';
import PdfViewer from './PdfViewer1';
import EpubReader from './EpubReader';

const EpubViewer = () => {
    const [activeTab, setActiveTab] = useState('pdf');
    const fileInputRef = useRef(null);

    const handleEpubTabClick = () => {
        setActiveTab('epub');
        fileInputRef.current?.click();
    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Smart Document Viewer</h1>
                    <p className="text-gray-600">View PDF and EPUB files in one place</p>
                </div>
                <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white p-6">
                        <h1 className="text-3xl font-bold">Document Viewer</h1>
                        <p className="text-blue-100 mt-1">View and read your documents with ease</p>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white border-b border-gray-200">
                        <nav className="flex">
                            <button
                                onClick={() => setActiveTab('pdf')}
                                className={`flex-1 py-5 px-6 text-center font-semibold text-lg transition-all duration-300 ${activeTab === 'pdf'
                                        ? 'bg-blue-50 text-blue-700 border-b-4 border-blue-600'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-center space-x-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>PDF Viewer</span>
                                </div>
                            </button>

                            <button
                                onClick={handleEpubTabClick}
                                className={`flex-1 py-5 px-6 text-center font-semibold text-lg transition-all duration-300 ${activeTab === 'epub'
                                        ? 'bg-blue-50 text-blue-700 border-b-4 border-blue-600'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-center space-x-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                    <span>EPUB Viewer</span>
                                </div>
                            </button>
                        </nav>
                    </div>

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        accept=".epub,application/epub+zip"
                        className="hidden"
                    />

                    {/* Content Area */}
                    <div className="min-h-[700px]">
                        {activeTab === 'pdf' && <PdfViewer />}
                        {activeTab === 'epub' && <EpubReader fileInputRef={fileInputRef} />}
                    </div>

                    {/* Footer */}
                    <div className="bg-gray-50 border-t border-gray-200 px-6 py-4">
                        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                            <span className="mb-2 sm:mb-0">© 2024 Document Viewer v2.0</span>
                            <div className="flex space-x-4">
                                <span>Supported: PDF</span>
                                <span>•</span>
                                <span>EPUB</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default EpubViewer;