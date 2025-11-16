import React, { useEffect, useState } from 'react'
import { Plus, FileText } from 'lucide-react'
import PublishedBookCard from './PublishedBookCard'
import { useUserBooks } from '../../assets/hooks/useBook'
import { useNavigate } from 'react-router-dom'
import { bookService } from '../../api/services/bookService'

function RenderPublishedBooks({ setEditingBook, setShowBookForm, handleAnalyticsClick, handlePromoteClick }) {

    const navigate = useNavigate();

    const { books: publishedBooks, loading: bookLoading, error: bookError, refetch } = useUserBooks();



    // mock data for published books stats
    // const [publishedBooks, setPublishedBooks] = useState([
    //     {
    //         id: 1,
    //         title: "The JavaScript Mastery",
    //         cover: "📘",
    //         category: "Programming",
    //         price: 29.99,
    //         sales: 245,
    //         earnings: 735.00,
    //         rating: 4.8,
    //         status: "published",
    //         lastUpdated: "2024-01-15",
    //         readers: 1200,
    //         quizParticipants: 345,
    //         pages: 320,
    //         language: "English",
    //         description: "A comprehensive guide to mastering JavaScript programming"
    //     },
    //     {
    //         id: 2,
    //         title: "React Patterns",
    //         cover: "⚛️",
    //         category: "Web Development",
    //         price: 24.99,
    //         sales: 189,
    //         earnings: 472.50,
    //         rating: 4.6,
    //         status: "published",
    //         lastUpdated: "2024-01-10",
    //         readers: 890,
    //         quizParticipants: 234,
    //         pages: 280,
    //         language: "English",
    //         description: "Advanced React patterns and best practices"
    //     },
    //     {
    //         id: 3,
    //         title: "AI for Beginners",
    //         cover: "🤖",
    //         category: "Artificial Intelligence",
    //         price: 34.99,
    //         sales: 156,
    //         earnings: 545.44,
    //         rating: 4.9,
    //         status: "draft",
    //         lastUpdated: "2024-01-05",
    //         readers: 670,
    //         quizParticipants: 189,
    //         pages: 450,
    //         language: "English",
    //         description: "Introduction to Artificial Intelligence concepts"
    //     }
    // ]);

    // Published Books Stats
    const publishedBooksStats = {
        totalBooks: publishedBooks?.length,
        publishedBooks: publishedBooks?.filter(book => book.status === 'published').length,
        totalPurchased: publishedBooks?.reduce((sum, book) => sum + (book.total_purchases || 0), 0) || 0,
        totalReaders: publishedBooks?.reduce((sum, book) => sum + (book.total_reads || 0), 0) || 0,
        totalQuizParticipants: publishedBooks?.reduce((sum, book) => sum + (book.quizParticipants || 0), 0) || 0
    };

    // handleAddBook function
    const handleAddBook = () => {
        setEditingBook(null);
        navigate(import.meta.env.VITE_PUBLISH_BOOK_PAGE);
    };

    const handleDeleteBook = (book) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            // Call API to delete book here
            bookService.deleteBook(book._id)
                .then(() => {
                    refetch();
                })
                .catch((error) => {
                    console.error('Error deleting book:', error);
                });
        }
    };

    const handleEditBook = (book) => {
        setEditingBook(book);

        navigate(import.meta.env.VITE_EDIT_BOOK_PAGE.replace(':bookId', book._id));
    };

    return (
        <>
            <div className="space-y-6">
                {/* Header with Stats */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Published Books</h2>
                        <p className="text-gray-600">Manage your published books and track performance</p>
                    </div>
                    <button
                        onClick={handleAddBook}
                        className="flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        <Plus size={20} />
                        <span>Publish New Book</span>
                    </button>
                </div>

                {/* Publishing Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{publishedBooksStats.totalBooks}</div>
                        <div className="text-sm text-gray-600">Total Books</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{publishedBooksStats.publishedBooks}</div>
                        <div className="text-sm text-gray-600">Published</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{publishedBooksStats.totalPurchased}</div>
                        <div className="text-sm text-gray-600">Total Purchase</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <div className="text-2xl font-bold text-gray-900">{publishedBooksStats.totalReaders}</div>
                        <div className="text-sm text-gray-600">Total Readers</div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {publishedBooks?.map((book) => (
                        <PublishedBookCard
                            key={book.id}
                            book={book}
                            onEdit={handleEditBook}
                            onDelete={() => handleDeleteBook(book)}
                            handleAnalyticsClick={handleAnalyticsClick}
                            handlePromoteClick={handlePromoteClick}
                        />
                    ))}
                </div>

                {publishedBooks?.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                        <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No books published yet</h3>
                        <p className="text-gray-600 mb-4">Start your publishing journey by adding your first book.</p>
                        <button
                            onClick={handleAddBook}
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Publish Your First Book
                        </button>
                    </div>
                )}
            </div>

        </>
    )
}

export default RenderPublishedBooks
