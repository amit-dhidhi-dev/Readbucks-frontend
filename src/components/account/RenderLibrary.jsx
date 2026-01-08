import React from 'react'
import { Eye, Download, Trash2, Search, BookOpen, Star, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { userApi } from '../../api/userApi';

function RenderLibrary({ purchasedBooks }) {
    const navigate = useNavigate();



    const removeBook = async (bookId) => {
        const userId = JSON.parse(localStorage.getItem('user'))?.user_id;
        console.log('Removing book:', bookId, 'for user:', userId);
        await userApi.removeBookFromUserLibrary(userId, bookId)
    }



    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Header */}
                <div className="mb-12">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">My Library</h1>
                            <p className="text-lg text-gray-600">
                                You have <span className="font-semibold text-indigo-600">{purchasedBooks.length} </span>
                                book{purchasedBooks.length !== 1 ? 's' : ''} in your collection
                            </p>
                        </div>
                    </div>
                </div>

                {/* Books Grid - Enhanced for Large Screens */}
                {purchasedBooks.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                        {purchasedBooks.map((book) => (
                            <div
                                key={book._id}
                                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:border-indigo-100 hover:-translate-y-1"
                            >
                                {/* Book Cover with Overlay */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-100">
                                    {book.cover_image_url ? (
                                        <>
                                            <img
                                                src={book.cover_image_url}
                                                alt={`${book.title} cover`}
                                                className="w-full h-full object-cover transition-opacity duration-300"
                                                loading="lazy"
                                                onLoad={(e) => {
                                                    e.target.style.opacity = '1';
                                                }}
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling?.classList.remove('hidden');
                                                }}
                                                style={{ opacity: 0 }}
                                            />
                                            {/* Loading/Fallback Placeholder */}
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 hidden">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-xl sm:text-2xl text-indigo-400 mb-1">📚</span>
                                                    <span className="text-xs text-indigo-300">Loading...</span>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <span className="text-xl sm:text-2xl text-indigo-400 mb-1">📚</span>
                                            <span className="text-xs text-indigo-300">No Image</span>
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-indigo-700 text-xs font-semibold rounded-full">
                                            {book.language}
                                        </span>
                                    </div>
                                </div>

                                {/* Book Content */}
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2 group-hover:text-indigo-700 transition-colors duration-200">
                                            {book.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

                                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
                                            <span className="px-2 py-1 bg-gray-100 rounded-md">{book.categories[0]}</span>
                                            <span>•</span>
                                            <span className="flex items-center">
                                                <BookOpen size={14} className="mr-1" />
                                                {book.total_pages} pages
                                            </span>
                                        </div>


                                    </div>


                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => navigate(import.meta.env.VITE_READ_BOOK_PAGE.replace(':bookId', book._id))}
                                            className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                                        >
                                            <Eye size={18} />
                                            <span> Read</span>
                                        </button>
                                        <div className="flex space-x-1">
                                            <button
                                                onClick={() => navigate(import.meta.env.VITE_PAYMENT_SUCCESS_PAGE.replace(':bookId', book._id))}
                                                className="p-3 border border-gray-300 hover:border-green-400 text-gray-700 hover:text-green-900 rounded-lg transition-all duration-200 hover:shadow hover:bg-green-50"
                                                title="Download"
                                            >
                                                <Download size={18} />
                                            </button>
                                            <button
                                                onClick={() => removeBook(book._id)}
                                                className="p-3 border border-gray-300 hover:border-red-300 text-gray-700 hover:text-red-600 rounded-lg transition-all duration-200 hover:shadow hover:bg-red-50"
                                                title="Remove from library"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Enhanced Empty State */
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 max-w-2xl mx-auto overflow-hidden">
                        <div className="px-8 py-16 text-center">
                            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
                                <span className="text-5xl text-indigo-400">📚</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Your library is waiting</h3>
                            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                                Books you purchase will appear here. Start your reading journey today!
                            </p>

                        </div>
                    </div>
                )}


            </div>
        </div>
    );


}







export default RenderLibrary
