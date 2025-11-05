// services/bookFormService.js
import { apiService } from './bookApi';

export const bookFormService = {
  // Create new book
  async createBook(bookData) {
    // return apiService.post('/books/', bookData);
     console.log("bookData in service",bookData);
    return apiService.post('/books-create/', bookData);
  },

  // Update existing book
  async updateBook(bookId, bookData) {
   
    return apiService.put(`/books/${bookId}`, bookData);
  },

  // Get book for editing
  async getBookForEdit(bookId) {
    return apiService.get(`/books/${bookId}/edit`);
  },

  // Upload cover image
  async uploadCoverImage(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${apiService.baseUrl}/upload/cover`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiService.token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    return response.json();
  },

  // Upload book content
  async uploadBookContent(file) {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${apiService.baseUrl}/upload/book-content`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiService.token}`
      },
      body: formData
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload book content');
    }
    
    return response.json();
  },

  // Delete book
  async deleteBook(bookId) {
    return apiService.delete(`/books/${bookId}`);
  }
};