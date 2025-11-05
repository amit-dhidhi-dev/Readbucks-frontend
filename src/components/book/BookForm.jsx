// components/Books/BookForm.jsx
import React, { useState, useEffect } from 'react';
import { useBookForm } from '../../assets/hooks/useBookForm';
import LoadingButton from '../loading/LoadingButton';

const BookForm = ({ book = null, onSuccess, onCancel }) => {
  const { loading, error, success, createBook, updateBook, uploadImage, resetState } = useBookForm();
  
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    author: '',
    description: '',
    publisher: 'readbucks',
    long_description: '',
    categories: [],
    language: 'hindi',
    price: 0,
    discount_price: '',
    total_pages: 0,
    word_count: 0,
    publication_date: '',
    edition: '1st',
    estimated_reading_time: 0,
    difficulty_level: 'beginner',
    access_level: 'paid',
    status: 'draft',
    cover_image_url: '',
    book_content_url: '',
    sample_chapter_url: null,
    tags: [],
    is_free: false
  });

  const [coverImage, setCoverImage] = useState(null);
  const [bookContent, setBookContent] = useState(null);

  // Pre-fill form if editing
  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        subtitle: book.subtitle || '',
        author: book.author || '',
        description: book.description || '',
        long_description: book.long_description || '',
        categories: book.categories || [],
        language: book.language || 'hindi',
        price: book.price || 0,
        discount_price: book.discount_price || '',
        total_pages: book.total_pages || 0,
        word_count: book.word_count || 0,
        publication_date: book.publication_date ? book.publication_date.split('T')[0] : '',
        edition: book.edition || '1st',
        estimated_reading_time: book.estimated_reading_time || 0,
        difficulty_level: book.difficulty_level || 'beginner',
        access_level: book.access_level || 'paid',
        status: book.status || 'draft',
        cover_image_url: book.cover_image_url || '',
        book_content_url: book.book_content_url || '',
        sample_chapter_url: book.sample_chapter_url || '',
        tags: book.tags || [],
        is_free: book.is_free || false
      });
    }
  }, [book]);

  const categories = [
    'fiction', 'non_fiction', 'educational', 'self_help', 
    'business', 'technology', 'science', 'history', 'biography'
  ];

  const languages = [
    { value: 'hindi', label: 'Hindi' },
    { value: 'english', label: 'English' },
    { value: 'bengali', label: 'Bengali' },
    { value: 'tamil', label: 'Tamil' },
    { value: 'telugu', label: 'Telugu' },
    { value: 'marathi', label: 'Marathi' },
    { value: 'gujarati', label: 'Gujarati' },
    { value: 'kannada', label: 'Kannada' },
    { value: 'malayalam', label: 'Malayalam' },
    { value: 'punjabi', label: 'Punjabi' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  };

  const handleCategoryChange = (category) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({ ...prev, tags }));
  };

  const handleCoverImageChange = async (e) => {
    const file = e.target.files[0];
    // if (file) {
    //   setCoverImage(file);
    //   try {
    //     // Upload image and get URL
    //     const result = await uploadImage(file);
    //     setFormData(prev => ({ ...prev, cover_image_url: result.url }));
    //   } catch (err) {
    //     console.error('Failed to upload image:', err);
    //   }
    // }

    setFormData(prev => ({ ...prev, cover_image_url: `https://example.com/books/${file.name}` }));
  };

  const handleBookContentChange = async (e) => {
    const file = e.target.files[0];
    // if (file) {
    //   setBookContent(file);
    //   // In real implementation, you would upload and get URL
    //   // For now, we'll just set a placeholder
    //   setFormData(prev => ({ ...prev, book_content_url: `https://example.com/books/${file.name}` }));
    // }
     setFormData(prev => ({ ...prev, book_content_url: `https://example.com/books/${file.name}` }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Prepare data for API
      const submitData = {
        ...formData,
        price: parseFloat(formData.price),
        discount_price: formData.discount_price ? parseFloat(formData.discount_price) : null,
        total_pages: parseInt(formData.total_pages),
        word_count: parseInt(formData.word_count),
        estimated_reading_time: parseInt(formData.estimated_reading_time),
        publication_date: new Date(formData.publication_date).toISOString()
      };

      if (book) {
        // Update existing book
        await updateBook(book.id, submitData);
      } else {
        // Create new book
        await createBook(submitData);
      }

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Form submission error:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {book ? 'Edit Book' : 'Create New Book'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          Book {book ? 'updated' : 'created'} successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Author *
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Short Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="3"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Long Description
          </label>
          <textarea
            name="long_description"
            value={formData.long_description}
            onChange={handleInputChange}
            rows="5"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Categories and Language */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categories *
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm capitalize">{category.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Language *
            </label>
            <select
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {languages.map(lang => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price (₹) *
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleNumberChange}
              min="0"
              step="0.01"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount Price (₹)
            </label>
            <input
              type="number"
              name="discount_price"
              value={formData.discount_price}
              onChange={handleNumberChange}
              min="0"
              step="0.01"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex items-center">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="is_free"
                checked={formData.is_free}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">Free Book</span>
            </label>
          </div>
        </div>

        {/* Book Details */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Total Pages *
            </label>
            <input
              type="number"
              name="total_pages"
              value={formData.total_pages}
              onChange={handleNumberChange}
              required
              min="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Word Count
            </label>
            <input
              type="number"
              name="word_count"
              value={formData.word_count}
              onChange={handleNumberChange}
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reading Time (mins)
            </label>
            <input
              type="number"
              name="estimated_reading_time"
              value={formData.estimated_reading_time}
              onChange={handleNumberChange}
              min="0"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Edition
            </label>
            <input
              type="text"
              name="edition"
              value={formData.edition}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Publication Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Publication Date *
            </label>
            <input
              type="date"
              name="publication_date"
              value={formData.publication_date}
              onChange={handleInputChange}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty Level
            </label>
            <select
              name="difficulty_level"
              value={formData.difficulty_level}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Level
            </label>
            <select
              name="access_level"
              value={formData.access_level}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="premium">Premium</option>
            </select>
          </div>
        </div>

        {/* File Uploads */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image *
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {formData.cover_image_url && (
              <p className="text-sm text-green-600 mt-1">Cover image URL: {formData.cover_image_url}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Book Content (PDF/EPUB) *
            </label>
            <input
              type="file"
              accept=".pdf,.epub,.doc,.docx"
              onChange={handleBookContentChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {formData.book_content_url && (
              <p className="text-sm text-green-600 mt-1">Book content URL: {formData.book_content_url}</p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma separated)
          </label>
          <input
            type="text"
            placeholder="fiction, romance, bestseller"
            value={formData.tags.join(', ')}
            onChange={handleTagsChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          
          <LoadingButton
            type="submit"
            loading={loading}
            loadingText={book ? "Updating Book..." : "Creating Book..."}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {book ? 'Update Book' : 'Create Book'}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default BookForm;