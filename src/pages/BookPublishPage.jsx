// src/components/BookPublishPage.jsx
import React, { useState } from 'react';
import BookInfoForm from '../components/publish/BookInfoForm';
import BookCoverUpload from '../components/publish/BookCoverUpload';
import BookContentUpload from '../components/publish/BookContentUpload';
import PricingAccess from '../components/publish/PricingAccess';
import QuizSettings from '../components/publish/QuizSettings';
import BookPreview from '../components/publish/BookPreview';
import PublishingGuidelines from '../components/publish/PublishingGuidelines';
import QuizPreview from '../components/publish/QuizPreview';


import { BookOpen, UploadCloud } from "lucide-react";


const BookPublishPage = () => {
    const [bookData, setBookData] = useState({
        title: '',
        author: '',
        description: '',
        genre: 'Fiction',
        language: 'English',
        price: '',
        accessType: 'Paid Members Only',
        enableQuiz: false,
        quizTitle: '',
        prizeAmount: '',
        winnersCount: 1
    });

    const [coverImage, setCoverImage] = useState(null);
    const [manuscriptFile, setManuscriptFile] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setBookData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCoverUpload = (file) => {
        setCoverImage(file);
    };

    const handleManuscriptUpload = (file) => {
        setManuscriptFile(file);
    };

    const handleSaveDraft = () => {
        console.log('Saving draft:', { bookData, coverImage, manuscriptFile });
        // Add API call here
    };

    const handlePublish = () => {
        console.log('Publishing book:', { bookData, coverImage, manuscriptFile });
        // Add API call here
    };

    return (
        <div className="min-h-screen bg-gray-50">
           
            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">


                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    {/* Left Section */}
                    <div className="flex items-center space-x-4">
                        {/* Icon Card */}
                        <div className="bg-white rounded-lg shadow-md p-3 flex items-center justify-center">
                            <div className="relative">
                                <BookOpen className="text-indigo-600" size={32} />
                                <UploadCloud
                                    className="absolute -top-1 -right-1 text-blue-500 bg-white rounded-full p-0.5 shadow-sm"
                                    size={16}
                                />
                            </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Publish Your Book</h1>
                            <p className="text-gray-600">Upload, preview, and share your creations with readers worldwide</p>
                        </div>
                    </div>

                    {/* Right Section - Button */}
                    <div className="flex items-center space-x-3">
                        <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 flex items-center">
                            <UploadCloud className="h-4 w-4 mr-2" />
                            Publish New Book
                        </button>
                    </div>
                </div>

                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left Column - Book Details Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white shadow rounded-lg p-6">
                                {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Publish Your Book</h2> */}

                                <BookInfoForm bookData={bookData} onChange={handleInputChange} />
                                <BookCoverUpload onFileUpload={handleCoverUpload} />
                                <BookContentUpload onFileUpload={handleManuscriptUpload} />
                                <PricingAccess bookData={bookData} onChange={handleInputChange} />
                                <QuizSettings bookData={bookData} onChange={handleInputChange} />

                                {/* Publish Actions */}
                                <div className="flex justify-end space-x-3 mt-8">
                                    <button
                                        onClick={handleSaveDraft}
                                        className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Save as Draft
                                    </button>
                                    <button
                                        onClick={handlePublish}
                                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
                                        Publish Book
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Preview & Guidelines */}
                        <div className="space-y-6">
                            <BookPreview bookData={bookData} coverImage={coverImage} />
                            <PublishingGuidelines />
                            <QuizPreview bookData={bookData} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookPublishPage;