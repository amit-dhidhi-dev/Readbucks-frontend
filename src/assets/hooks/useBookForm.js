// hooks/useBookForm.js
import { useState } from 'react';
import { bookFormService } from '../../api/services/bookFormService';

export const useBookForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const createBook = async (bookData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await bookFormService.createBook(bookData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateBook = async (bookId, bookData) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const result = await bookFormService.updateBook(bookId, bookData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    try {
      setLoading(true);
      const result = await bookFormService.uploadCoverImage(file);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUploadUrl = async (file_name, file_type) => {
    try {
      setLoading(true);
      const result = await bookFormService.getUploadUrl(file_name, file_type);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const resetState = () => {
    setLoading(false);
    setError(null);
    setSuccess(false);
  };

  return {
    loading,
    error,
    success,
    createBook,
    updateBook,
    uploadImage,
    resetState,
    getUploadUrl
  };
};