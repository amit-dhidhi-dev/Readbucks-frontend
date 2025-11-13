// pages/BookManagement.jsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import BookForm from './BookForm';
import BookFormUpdate from './BookFormUpdate';
import { useBook } from '../../assets/hooks/useBook';
import LoadingSpinner from '../loading/LoadingSpinner';

const BookManagement = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const isEditMode = Boolean(bookId);
  
  const { book, loading: bookLoading, error: bookError } = useBook(bookId);

  const handleSuccess = () => {
    // Redirect to books list or show success message
    setTimeout(() => {
      navigate('/admin/books');
    }, 2000);
  };

  const handleCancel = () => {
    navigate('/admin/books');
  };

  if (isEditMode && bookLoading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <LoadingSpinner text="Loading book details..." />
      </div>
    );
  }

  if (isEditMode && bookError) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Error loading book: {bookError}</div>
        <button 
          onClick={() => navigate('/admin/books')}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        >
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BookFormUpdate 
        book={book}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default BookManagement;