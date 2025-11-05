// components/Books/BookDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBook } from '../../assets/hooks/useBook';
import { bookService } from '../../api/services/bookService';
import LoadingSpinner from '../loading/LoadingSpinner';

const BookDetail = () => {
  const { bookId } = useParams();
  const { book, loading, error } = useBook(bookId);
  const [activeTab, setActiveTab] = useState('description');

  const handlePurchase = async () => {
    try {
      // Implement payment integration here
      await bookService.purchaseBook(bookId, {});
      alert('Book purchased successfully!');
    } catch (err) {
      alert('Purchase failed: ' + err.message);
    }
  };

  const handleReadBook = () => {
    // Track read and redirect to reading page
    bookService.incrementReads(bookId);
    window.open(book.book_content_url, '_blank');
  };

  if (loading) return <LoadingSpinner text="Loading book details..." />;
  if (error) return <div>Error: {error}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover & Basic Info */}
        <div className="lg:col-span-1">
          <img 
            src={book.cover_image_url} 
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
          />
          
          <div className="mt-6 space-y-4">
            {book.is_free ? (
              <button 
                onClick={handleReadBook}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600"
              >
                Read Free
              </button>
            ) : (
              <>
                <button 
                  onClick={handlePurchase}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600"
                >
                  Buy Now - ₹{book.discount_price || book.price}
                </button>
                {book.sample_chapter_url && (
                  <button className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg font-semibold hover:bg-blue-50">
                    Read Sample
                  </button>
                )}
              </>
            )}
          </div>

          {/* Book Stats */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Book Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Pages:</span>
                <span>{book.total_pages}</span>
              </div>
              <div className="flex justify-between">
                <span>Language:</span>
                <span>{book.language}</span>
              </div>
              <div className="flex justify-between">
                <span>Reading Time:</span>
                <span>{book.estimated_reading_time} mins</span>
              </div>
              <div className="flex justify-between">
                <span>Category:</span>
                <span>{book.categories.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          {book.subtitle && (
            <h2 className="text-xl text-gray-600 mb-4">{book.subtitle}</h2>
          )}
          
          <p className="text-gray-700 mb-4">by {book.author}</p>

          {/* Rating */}
          <div className="flex items-center mb-6">
            <div className="flex text-yellow-400 text-xl">
              {[...Array(5)].map((_, i) => (
                <span key={i}>
                  {i < Math.floor(book.average_rating) ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {book.average_rating} ({book.total_ratings} ratings)
            </span>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              {['description', 'chapters', 'quizzes', 'reviews'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div>
                <p className="text-gray-700 leading-relaxed">{book.long_description || book.description}</p>
              </div>
            )}

            {activeTab === 'chapters' && (
              <div className="space-y-3">
                {book.chapters.map(chapter => (
                  <div key={chapter.chapter_number} className="border rounded-lg p-4">
                    <h4 className="font-semibold">Chapter {chapter.chapter_number}: {chapter.title}</h4>
                    <p className="text-sm text-gray-600">
                      {chapter.page_count} pages • {chapter.duration_minutes} min read
                    </p>
                    {chapter.is_preview && (
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                        Free Preview
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'quizzes' && (
              <div className="space-y-4">
                {book.quizzes.filter(q => q.is_active).map(quiz => (
                  <div key={quiz.quiz_id} className="border rounded-lg p-4 bg-blue-50">
                    <h4 className="font-semibold text-lg">{quiz.title}</h4>
                    <p className="text-gray-600 mb-2">{quiz.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        <span>Prize: ₹{quiz.prize_money}</span>
                        <span className="mx-2">•</span>
                        <span>Questions: {quiz.total_questions}</span>
                      </div>
                      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Take Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {book.reviews.map(review => (
                  <div key={review.user_id} className="border-b pb-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.user_name}</p>
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;