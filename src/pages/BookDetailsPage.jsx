import React, { useState } from 'react';
import { 
  Star, 
  BookOpen, 
  Users, 
  Clock, 
  Download, 
  Share2, 
  Heart,
  Award,
  ChevronRight,
  Calendar,
  FileText
} from 'lucide-react';
import { FaRupeeSign, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { BiPurchaseTag } from 'react-icons/bi';

const BookDetailsPage = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [quantity, setQuantity] = useState(1);

  // Sample book data
  const book = {
    id: 1,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    coverImage: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
    rating: 4.5,
    reviews: 1247,
    price: 299,
    originalPrice: 499,
    discount: 40,
    pages: 256,
    language: "English",
    publishedYear: 2020,
    category: "Finance & Investing",
    description: "Timeless lessons on wealth, greed, and happiness. Doing well with money isn't necessarily about what you know, but about how you behave.",
    features: [
      "Lifetime Access",
      "PDF & EPUB Formats",
      "Money Back Guarantee",
      "Quiz Available"
    ],
    chapters: [
      "No One's Crazy",
      "Luck & Risk",
      "Never Enough",
      "Confounding Compounding",
      "Getting Wealthy vs Staying Wealthy"
    ],
    quiz: {
      totalQuestions: 20,
      duration: "30 mins",
      prize: 5000,
      participants: 2341
    }
  };

  const relatedBooks = [
    {
      id: 2,
      title: "Rich Dad Poor Dad",
      author: "Robert Kiyosaki",
      price: 349,
      rating: 4.3,
      cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=200"
    },
    {
      id: 3,
      title: "The Intelligent Investor",
      author: "Benjamin Graham",
      price: 449,
      rating: 4.7,
      cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=200"
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <nav className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Home</span>
            <ChevronRight size={16} />
            <span>Books</span>
            <ChevronRight size={16} />
            <span>Finance</span>
            <ChevronRight size={16} />
            <span className="text-gray-900">{book.title}</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Book Cover & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              {/* Book Cover */}
              <div className="relative">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-full h-80 object-cover rounded-lg shadow-md"
                />
                {book.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {book.discount}% OFF
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-6">
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                  <BiPurchaseTag size={20} />
                  <span>Buy Now</span>
                </button>
                <button className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors">
                  <FaRupeeSign />
                  <span>Add to Cart</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {isBookmarked ? (
                    <FaBookmark className="text-blue-600" size={20} />
                  ) : (
                    <FaRegBookmark size={20} />
                  )}
                  <span>Save</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors">
                  <Heart size={20} />
                  <span>Like</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Book Header */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {book.title}
              </h1>
              <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  {renderStars(book.rating)}
                  <span className="text-gray-700 font-semibold">
                    {book.rating}/5
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-gray-600">{book.reviews.toLocaleString()} reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  <FaRupeeSign className="inline mr-1" />
                  {book.price}
                </span>
                {book.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      <FaRupeeSign className="inline mr-1" />
                      {book.originalPrice}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-semibold">
                      Save {book.discount}%
                    </span>
                  </>
                )}
              </div>

              {/* Book Features */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2 text-gray-600">
                  <FileText size={18} />
                  <span>{book.pages} pages</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <BookOpen size={18} />
                  <span>{book.language}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Calendar size={18} />
                  <span>Published {book.publishedYear}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Users size={18} />
                  <span>{book.category}</span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-gray-700 font-semibold">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Quiz Banner */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg shadow-lg p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Award size={24} />
                    <h3 className="text-xl font-bold">Take the Quiz & Win Prizes!</h3>
                  </div>
                  <p className="text-purple-100 mb-2">
                    Test your knowledge and stand a chance to win ₹{book.quiz.prize.toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center space-x-1">
                      <FileText size={16} />
                      <span>{book.quiz.totalQuestions} Questions</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{book.quiz.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users size={16} />
                      <span>{book.quiz.participants.toLocaleString()} Participants</span>
                    </span>
                  </div>
                </div>
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Quiz
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-lg">
              {/* Tab Headers */}
              <div className="border-b">
                <div className="flex space-x-8 px-6">
                  {['description', 'chapters', 'features', 'reviews'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                        activeTab === tab
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'description' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">About this Book</h3>
                    <p className="text-gray-700 leading-relaxed">{book.description}</p>
                  </div>
                )}

                {activeTab === 'chapters' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
                    <div className="space-y-3">
                      {book.chapters.map((chapter, index) => (
                        <div key={index} className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg">
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-gray-700">{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">What You Get</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {book.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                    <div className="space-y-4">
                      {/* Sample Review */}
                      <div className="border-b pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          {renderStars(5)}
                          <span className="font-semibold">Amazing Insights!</span>
                        </div>
                        <p className="text-gray-600 mb-2">
                          This book completely changed my perspective on money management. 
                          The quizzes helped reinforce the concepts beautifully.
                        </p>
                        <span className="text-sm text-gray-500">- Rajesh Kumar</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Books */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-6">You May Also Like</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedBooks.map((relatedBook) => (
                  <div key={relatedBook.id} className="flex space-x-4 p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <img
                      src={relatedBook.cover}
                      alt={relatedBook.title}
                      className="w-16 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{relatedBook.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{relatedBook.author}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {renderStars(relatedBook.rating)}
                          <span className="text-sm text-gray-600">{relatedBook.rating}</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          <FaRupeeSign className="inline mr-1" />
                          {relatedBook.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;