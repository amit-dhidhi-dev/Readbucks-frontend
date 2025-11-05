// services/bookService.js
import { apiService } from './bookApi';

export const bookService = {
  // Get all books with pagination and filters
  async getBooks(params = {}) {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        queryParams.append(key, params[key]);
      }
    });

    return apiService.get(`/books?${queryParams}`);
  },

  // Get single book by ID
  async getBookById(bookId) {
    return apiService.get(`/books/${bookId}`);
  },

  // Create new book (admin only)
  async createBook(bookData) {
    return apiService.post('/books/', bookData);
  },

  // Update book (admin only)
  async updateBook(bookId, bookData) {
    return apiService.put(`/books/${bookId}`, bookData);
  },

  // Search books
  async searchBooks(searchData) {
    return apiService.post('/books/search', searchData);
  },

  // Add quiz to book
  async addQuizToBook(bookId, quizData) {
    return apiService.post(`/books/${bookId}/quizzes`, quizData);
  },

  // Add review to book
  async addReview(bookId, reviewData) {
    return apiService.post(`/books/${bookId}/reviews`, reviewData);
  },

  // Increment read count
  async incrementReads(bookId) {
    return apiService.post(`/books/${bookId}/increment-reads`);
  },

  // Get user's purchased books
  async getMyBooks() {
    return apiService.get('/user/books');
  },

  // Purchase a book
  async purchaseBook(bookId, paymentData) {
    return apiService.post(`/books/${bookId}/purchase`, paymentData);
  }
  
};