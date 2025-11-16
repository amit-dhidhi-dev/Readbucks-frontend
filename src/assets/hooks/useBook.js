// hooks/useBooks.js
import { useState, useEffect } from 'react';
import { bookService } from '../../api/services/bookService';

export const useBooks = (initialParams = {}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const fetchBooks = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookService.getBooks(params);
      setBooks(response.books);
      setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
        hasNext: response.has_next
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(initialParams);
  }, []);

  return {
    books,
    loading,
    error,
    pagination,
    refetch: fetchBooks
  };
};

export const useBook = (bookId) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBook = async (id) => {
    try {
      setLoading(true);
      setError(null);
      const bookData = await bookService.getBookById(id);
      setBook(bookData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchBook(bookId);
    }
  }, [bookId]);

  return {
    book,
    loading,
    error,
    refetch: () => fetchBook(bookId)
  };
};


export const useUserBooks = () => {
  const [books, setBooks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBook = async () => {
    try {
      setLoading(true);
      setError(null);
      const bookData = await bookService.getUserBooks();     
      setBooks(bookData.books || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  },[]);

  return {
    books,
    loading,
    error,
    refetch: () => fetchBook()
  };
};

