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
      console.log('fetch books after filters', response)
      console.log('and filters is ->', initialParams)
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



export const useMainBooks = (initialParams = {}) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    hasNext: false
  });

  const fetchBooks = async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const backendParams = {
        page: params.page || 1,
        limit: params.limit || 20,
        ...(params.category && params.category !== 'All' && { category: params.category }),
        ...(params.language && params.language !== 'All' && { language: params.language }),
        ...(params.min_price !== undefined && { min_price: params.min_price }),
        ...(params.max_price !== undefined && { max_price: params.max_price })
      };

      const response = await bookService.getBooks(backendParams);
      
      setBooks(response.books || []);
      setPagination({
        total: response.total || 0,
        page: response.page || 1,
        limit: response.limit || 20,
        hasNext: response.has_next || false
      });
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to fetch books');
      setBooks([]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(initialParams);
  }, [
    initialParams.page,
    initialParams.limit,
    initialParams.category,
    initialParams.language,
    initialParams.min_price,
    initialParams.max_price
  ]); // Specific dependencies instead of stringify

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
      // const bookData = await bookService.getBookById(id);
      // console.log('book id in in use book', id)
      const bookData = await bookService.getBookByIdNotSigned(id);
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


// for complete book details
export const useBookDetail = (bookId) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBook = async (id) => {
    try {
      setLoading(true);
      setError(null);
      // const bookData = await bookService.getBookById(id);
      // console.log('book id in in use book', id)
      const bookData = await bookService.getBookDetailsById(id);
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
