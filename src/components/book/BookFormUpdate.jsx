// components/Books/BookForm.jsx
import React, { useState, useEffect } from 'react';
import { useBookForm } from '../../assets/hooks/useBookForm';
import LoadingButton from '../loading/LoadingButton';
// import { useFileUploadWithProgress } from '../../assets/hooks/useFileUploadWithProgress';
import { useMultipleFileUpload } from '../../assets/hooks/useMultipleFileUpload';


const BookFormUpdate = ({ book = null, onSuccess, onCancel }) => {
    const { loading, error, success, createBook, updateBook, getUploadUrl, uploadImage, resetState } = useBookForm();

    // const { uploadFile, getUploadProgress, isUploading, clearUpload, uploads } = useFileUploadWithProgress();
    const {
        uploads,
        uploadFile,
        getActiveUploads,
        getOverallProgress,
        clearUpload
    } = useMultipleFileUpload();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        author: '',
        description: '',
        publisher: 'readbucks',
        long_description: '',
        categories: [],
        language: 'english',
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
        book_content_url: { docx: null, pdf: null, epub: null },
        sample_chapter_url: null,
        tags: [],
        is_free: false
    });

    const [btnEnable, setBtnEnable] = useState({
        uploadImage: false,
        uploadContent: false
    })

    const [coverImage, setCoverImage] = useState(null);
    const [bookContent, setBookContent] = useState(null);
    const [Error, setError] = useState(error)
    const [err, setErr] = useState({});
    const [touched, setTouched] = useState({})
    const [uploadImageUrl, setUploadImageUrl] = useState(null)
    const [uploadDocumentUrl, setUploadDocumentUrl] = useState(null)

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
        { value: 'english', label: 'English' },
        { value: 'hindi', label: 'Hindi' },
        { value: 'bengali', label: 'Bengali' },
        { value: 'tamil', label: 'Tamil' },
        { value: 'telugu', label: 'Telugu' },
        { value: 'marathi', label: 'Marathi' },
        { value: 'gujarati', label: 'Gujarati' },
        { value: 'kannada', label: 'Kannada' },
        { value: 'malayalam', label: 'Malayalam' },
        { value: 'punjabi', label: 'Punjabi' }
    ];

    const steps = [
        { number: 1, title: 'Basic Information', completed: false },
        { number: 2, title: 'Book Details', completed: false },
        { number: 3, title: 'Pricing & Access', completed: false },
        { number: 4, title: 'Files & Status', completed: false }
    ];

    // form value validation
    const stepValidations = {
        1: () => {
            const newErrors = {};
            if (!formData.title.trim()) newErrors.title = 'Title is required';
            if (!formData.author.trim()) newErrors.author = 'Author is required';
            if (!formData.description.trim()) newErrors.description = 'Description is required';
            if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
            return newErrors;
        },
        2: () => {
            const newErrors = {};
            if (formData.categories.length === 0) newErrors.categories = 'At least one category is required';
            if (!formData.total_pages || formData.total_pages < 1) newErrors.total_pages = 'Total pages must be at least 1';
            if (!formData.publication_date) newErrors.publication_date = 'Publication date is required';
            return newErrors;
        },
        3: () => {
            const newErrors = {};
            if (!formData.is_free && (!formData.price || formData.price < 0)) {
                newErrors.price = 'Price is required for paid books';
            }
            if (formData.discount_price && formData.discount_price > formData.price) {
                newErrors.discount_price = 'Discount price cannot be greater than original price';
            }
            return newErrors;
        },
        4: () => {
            const newErrors = {};
            if (!formData.cover_image_url) newErrors.cover_image_url = 'Cover image is required';
            if (!formData.book_content_url.docx && !formData.book_content_url.epub && !formData.book_content_url.pdf) newErrors.book_content_url = 'Book content is required';
            return newErrors;
        }
    };


    // Mark field as touched
    const handleBlur = (fieldName) => {
        setTouched(prev => ({ ...prev, [fieldName]: true }));
    };

    // Get all field names for a step
    const getStepFields = (step) => {
        const stepFields = {
            1: ['title', 'author', 'description'],
            2: ['categories', 'total_pages', 'publication_date'],
            3: ['price', 'discount_price'],
            4: ['cover_image_url', 'book_content_url']
        };
        return stepFields[step] || [];
    };

    // Update your input handlers to clear errors

    const handleInputChange = (e) => {

        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));

        // Clear error when user starts typing
        if (err[name]) {
            setErr(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value === '' ? '' : Number(value)
        }));
        // Clear error when user starts typing
        if (err[name]) {
            setErr(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleCategoryChange = (category) => {
        setFormData(prev => ({
            ...prev,
            categories: prev.categories.includes(category)
                ? prev.categories.filter(c => c !== category)
                : [...prev.categories, category]
        }));
        setErr(prev => ({ ...prev, categories: '' }));
    };

    const handleTagsChange = (e) => {
        const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
        setFormData(prev => ({ ...prev, tags }));
    };


    // Cover image aur book content ke liye alag-alag upload IDs track karna
    const [coverImageUploadId, setCoverImageUploadId] = useState(null);
    const [bookContentUploadId, setBookContentUploadId] = useState(null);


    const handleCoverImageChange = async (e) => {
        const file = e.target.files[0];
        // console.log('file_name', file.name);
        if (file) {
            setCoverImage(file);
            try {
                // Upload image and get URL
                const result = await getUploadUrl(file.name, 'image');
                // console.log('get image upload url', result)
                setFormData(prev => ({ ...prev, cover_image_url: result.fileUrl }));
                setUploadImageUrl(result.upload_url)
                // setBtnEnable(prev => ({ ...prev, uploadImage: true }))
                setErr(prev => ({ ...prev, cover_image_url: '' }));


            } catch (err) {
                console.error('Failed to upload image:', err);
            }
        }

        // setFormData(prev => ({ ...prev, cover_image_url: `https://example.com/books/${file.name}` }));
    };

    const handleBookContentChange = async (e) => {
        const file = e.target.files[0];
        const ext = file.name.split('.').pop().toLowerCase();

        if (file) {
            setBookContent(file);
            try {

                if (ext !== 'docx' && ext !== 'pdf' && ext !== 'epub') {
                    setBtnEnable(prev => ({ ...prev, uploadContent: false }))
                    setErr(prev => ({ ...prev, book_content_url: 'file format should be (docx/pdf/epub)' }));
                    return
                }

                // Upload image and get URL
                const result = await getUploadUrl(file.name, 'document');

                // console.log('get content upload url', result)
                // setFormData(prev => ({ ...prev, book_content_url: result.upload_url }));
                setFormData(prev => ({
                    ...prev,
                    book_content_url: { ...prev.book_content_url, docx: ext === 'docx' ? result.fileUrl : null, pdf: ext === 'pdf' ? result.fileUrl : null, epub: ext === 'epub' ? result.fileUrl : null }
                }));
                setUploadDocumentUrl(result.upload_url);
                // setBtnEnable(prev => ({ ...prev, uploadContent: true }))
                setErr(prev => ({ ...prev, book_content_url: '' }));

                return result.fileUrl;
             
            } catch (err) {
                console.error('Failed to upload image:', err);
            }
        }
        // setFormData(prev => ({ ...prev, book_content_url: `https://example.com/books/${file.name}` }));
    };

    const nextStep = () => {

        // Validate current step
        const validationErrors = stepValidations[currentStep]();


        if (Object.keys(validationErrors).length > 0) {
            setErr(validationErrors);
            // console.log('validation error', validationErrors)
            // Mark all fields in current step as touched
            const stepFields = getStepFields(currentStep);

            const newTouched = { ...touched };

            stepFields.forEach(field => {
                newTouched[field] = true;
            });
            setTouched(newTouched);


            return;
        }
        // Clear errors and move to next step
        setErr({});
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }

    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        nextStep();
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

            // console.log('submit data -->', submitData)

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

    // handel on upload image button clicked
    const handelOnImageUpload = async (e) => {
        // console.log('upload image clicked', e)

        if (uploadImageUrl && coverImage) {
            // console.log('image upload url', uploadImageUrl)
            // file upload
            // Upload start karo aur upload ID save karo
            const uploadId = await uploadFile(coverImage, uploadImageUrl);
            setCoverImageUploadId(uploadId);
            ;

        } else {
            setError('choose image for upload')
        }
    }

    // handel on upload content button clicked
    const handelOnContentUpload = async (e) => {
        // console.log('upload image clicked', e)

        if (bookContent && uploadDocumentUrl) {
            // console.log('image upload url', formData.book_content_url)
            const uploadId = await uploadFile(bookContent, uploadDocumentUrl);
            setBookContentUploadId(uploadId);

        } else {
            setError('choose book content for upload')
        }
    }



    // progress bar
    // Individual Progress Bar Component
    const IndividualProgressBar = ({ uploadId, label }) => {
        const upload = uploads[uploadId];

        if (!upload) return null;

        return (
            <div className="mt-2 p-3 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                        {label}: {upload.fileName}
                    </span>
                    <span className="text-xs text-gray-500">
                        {Math.round(upload.progress)}%
                    </span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className={`h-2 rounded-full transition-all duration-300 ${upload.isComplete ? 'bg-green-600' :
                            upload.error ? 'bg-red-600' : 'bg-blue-600'
                            }`}
                        style={{ width: `${upload.progress}%` }}
                    ></div>
                </div>

                <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-gray-500">
                        {upload.isComplete ? 'Completed' :
                            upload.error ? `Failed: ${upload.error}` :
                                upload.isUploading ? 'Uploading...' : 'Pending'}
                    </span>
                    <span className="text-xs text-gray-500">
                        {(upload.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </span>
                </div>

                {upload.error && (
                    <button
                        onClick={() => clearUpload(uploadId)}
                        className="mt-2 text-xs text-red-600 hover:text-red-800"
                    >
                        Clear Error
                    </button>
                )}
            </div>
        );
    };



    // Step 1: Basic Information
    const renderStep1 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Basic Information</h3>

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
                        onBlur={() => handleBlur('title')}
                        required
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${err.title && touched.title ? 'border-red-500' : 'border-gray-300'
                            }`} />
                    {err.title && touched.title && (
                        <p className="text-red-500 text-sm mt-1">{err.title}</p>
                    )}
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
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${err.author && touched.author ? 'border-red-500' : 'border-gray-300'
                        }`} />
                {err.author && touched.author && (
                    <p className="text-red-500 text-sm mt-1">{err.author}</p>
                )}
            </div>

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
                    className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${err.description && touched.description ? 'border-red-500' : 'border-gray-300'
                        }`} />
                {err.description && touched.description && (
                    <p className="text-red-500 text-sm mt-1">{err.description}</p>
                )}
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
        </div>
    );

    // Step 2: Book Details
    const renderStep2 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Book Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Categories *
                    </label>
                    <div className={`grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-gray-200 rounded-lg   ${err.categories && touched.categories ? 'border-red-500' : 'border-gray-300'
                        }`}>
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
                    {err.categories && touched.categories && (
                        <p className="text-red-500 text-sm mt-1">{err.categories}</p>
                    )}
                </div>

                <div className="space-y-6">
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
                </div>
            </div>

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
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${err.total_pages && touched.total_pages ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {err.total_pages && touched.total_pages && (
                        <p className="text-red-500 text-sm mt-1">{err.total_pages}</p>
                    )}
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${err.publication_date && touched.publication_date ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {err.publication_date && touched.publication_date && (
                        <p className="text-red-500 text-sm mt-1">{err.publication_date}</p>
                    )}
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
            </div>
        </div>
    );

    // Step 3: Pricing & Access
    const renderStep3 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Pricing & Access</h3>

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
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${err.price && touched.price ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    {err.price && touched.price && (
                        <p className="text-red-500 text-sm mt-1">{err.price}</p>
                    )}
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
    );

    // Step 4: Files & Status
    const renderStep4 = () => (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800">Files & Status</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cover Image *
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleCoverImageChange}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${err.cover_image_url && touched.cover_image_url ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    <IndividualProgressBar
                        uploadId={coverImageUploadId}
                        label="Cover Image"
                    />
                    {formData.cover_image_url && (
                        <p className="text-sm text-green-600 mt-1">Cover image URL: {formData.cover_image_url}</p>
                    )}
                    {err.cover_image_url && touched.cover_image_url && (
                        <p className="text-red-500 text-sm mt-1">{err.cover_image_url}</p>
                    )}
                    <div className='text-sm p-2'>
                        <LoadingButton
                            type="button"
                            disabled={!btnEnable.uploadImage}
                            onClick={handelOnImageUpload}
                            loadingText='uploading...'
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            upload image
                        </LoadingButton>
                    </div>

                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Book Content {formData.language === 'english' ? '(DOCX/EPUB/PDF)' : '(DOCX/EPUB)'}*
                    </label>
                    <input
                        type="file"
                        accept=".pdf,.epub,.docx"
                        onChange={handleBookContentChange}
                        className={`w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${err.book_content_url && touched.book_content_url ? 'border-red-500' : 'border-gray-300'
                            }`}
                    />
                    <IndividualProgressBar
                        uploadId={bookContentUploadId}
                        label="Book Content"
                    />
                    {/* {formData.book_content_url && (
                        <p className="text-sm text-green-600 mt-1">Book content URL: {formData.book_content_url}</p>
                    )} */}

                    {formData.book_content_url && (
                        <div className="text-sm text-green-600 mt-1">
                            {formData.book_content_url.docx && <p>DOCX: {formData.book_content_url.docx}</p>}
                            {formData.book_content_url.pdf && <p>PDF: {formData.book_content_url.pdf}</p>}
                            {formData.book_content_url.epub && <p>EPUB: {formData.book_content_url.epub}</p>}
                        </div>
                    )}

                    {err.book_content_url && touched.book_content_url && (
                        <p className="text-red-500 text-sm mt-1">{err.book_content_url}</p>
                    )}
                    <div className='text-sm p-2'>
                        <LoadingButton
                            type="button"
                            disabled={!btnEnable.uploadContent}
                            onClick={handelOnContentUpload}
                            loadingText='uploading...'
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        > upload content
                        </LoadingButton>
                    </div>
                </div>
            </div>

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
        </div>
    );

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return renderStep1();
            case 2:
                return renderStep2();
            case 3:
                return renderStep3();
            case 4:
                return renderStep4();
            default:
                return renderStep1();
        }
    };

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">
                {book ? 'Edit Book' : 'Create New Book'}
            </h2>

            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((step, index) => (
                        <React.Fragment key={step.number}>
                            <div className="flex flex-col items-center">
                                <div
                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStep >= step.number
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'border-gray-300 text-gray-500'
                                        }`}
                                >
                                    {step.number}
                                </div>
                                <span
                                    className={`text-sm mt-2 ${currentStep >= step.number ? 'text-blue-600 font-medium' : 'text-gray-500'
                                        }`}
                                >
                                    {step.title}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-1 mx-4 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}
            {/* {Error && !error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {Error}
                </div>
            )} */}

            {success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    Book {book ? 'updated' : 'created'} successfully!
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {renderCurrentStep()}

                {/* Form Actions */}
                <div className="flex justify-between pt-6 mt-8 border-t">
                    <div>
                        {currentStep > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Previous
                            </button>
                        )}
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>

                        {currentStep < steps.length ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Next
                            </button>
                        ) : (
                            <LoadingButton
                                type="submit"
                                loading={loading}
                                loadingText={book ? "Updating Book..." : "Creating Book..."}
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                {book ? 'Update Book' : 'Create Book'}
                            </LoadingButton>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BookFormUpdate;