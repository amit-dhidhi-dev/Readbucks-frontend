import React, { useState } from 'react';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ArrowLeft,
  Book,
  Award,
  Clock,
  Share2,
  Eye,
  TrendingUp
} from 'lucide-react';
import { FaRupeeSign, FaBookOpen, FaTrophy, FaRegHeart } from 'react-icons/fa';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 299,
      originalPrice: 499,
      image: '/api/placeholder/80/120',
      pages: 180,
      rating: 4.5,
      quizPrize: 500,
      delivery: 'Instant',
      isInCart: false,
      addedDate: '2024-02-20'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 349,
      originalPrice: 599,
      image: '/api/placeholder/80/120',
      pages: 281,
      rating: 4.8,
      quizPrize: 750,
      delivery: 'Instant',
      isInCart: true,
      addedDate: '2024-02-18'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      price: 279,
      originalPrice: 449,
      image: '/api/placeholder/80/120',
      pages: 328,
      rating: 4.7,
      quizPrize: 600,
      delivery: 'Instant',
      isInCart: false,
      addedDate: '2024-02-15'
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 259,
      originalPrice: 399,
      image: '/api/placeholder/80/120',
      pages: 432,
      rating: 4.6,
      quizPrize: 450,
      delivery: 'Instant',
      isInCart: false,
      addedDate: '2024-02-10'
    }
  ]);

  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  // Add to cart
  const addToCart = (id) => {
    setWishlistItems(wishlistItems.map(item =>
      item.id === id ? { ...item, isInCart: true } : item
    ));
  };

  // Move all to cart
  const moveAllToCart = () => {
    setWishlistItems(wishlistItems.map(item => ({ ...item, isInCart: true })));
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlistItems([]);
  };

  // Share wishlist
  const shareWishlist = () => {
    // In a real app, this would open a share dialog
    alert('Share your wishlist with friends!');
  };

  // Sort and filter functions
  const getSortedAndFilteredItems = () => {
    let filtered = wishlistItems;
    
    // Apply filters
    if (filterBy === 'inCart') {
      filtered = filtered.filter(item => item.isInCart);
    } else if (filterBy === 'notInCart') {
      filtered = filtered.filter(item => !item.isInCart);
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
        default:
          return new Date(b.addedDate) - new Date(a.addedDate);
      }
    });
    
    return sorted;
  };

  const sortedItems = getSortedAndFilteredItems();

  // Calculate totals
  const totalSavings = wishlistItems.reduce((total, item) => 
    total + (item.originalPrice - item.price), 0
  );
  const totalQuizPrize = wishlistItems.reduce((total, item) => 
    total + item.quizPrize, 0
  );
  const itemsInCart = wishlistItems.filter(item => item.isInCart).length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition duration-200"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <Heart className="text-red-500" size={32} />
            <span>My Wishlist</span>
          </h1>
          <div className="w-32"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-gray-800">{wishlistItems.length}</p>
              </div>
              <Heart className="text-red-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Cart</p>
                <p className="text-2xl font-bold text-green-600">{itemsInCart}</p>
              </div>
              <ShoppingCart className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Savings</p>
                <p className="text-2xl font-bold text-blue-600">₹{totalSavings}</p>
              </div>
              <TrendingUp className="text-blue-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Quiz Prize Pool</p>
                <p className="text-2xl font-bold text-yellow-600">₹{totalQuizPrize}</p>
              </div>
              <Award className="text-yellow-500" size={24} />
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="recent">Recently Added</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="title">Title A-Z</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by</label>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Items</option>
                  <option value="inCart">In Cart</option>
                  <option value="notInCart">Not in Cart</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={moveAllToCart}
                disabled={wishlistItems.length === 0 || wishlistItems.every(item => item.isInCart)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 flex items-center space-x-2"
              >
                <ShoppingCart size={16} />
                <span>Move All to Cart</span>
              </button>

              <button
                onClick={shareWishlist}
                disabled={wishlistItems.length === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 flex items-center space-x-2"
              >
                <Share2 size={16} />
                <span>Share Wishlist</span>
              </button>

              <button
                onClick={clearWishlist}
                disabled={wishlistItems.length === 0}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 flex items-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaRegHeart className="mx-auto text-gray-400 text-6xl mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-500 mb-6">Start adding books you love to your wishlist!</p>
            <button 
              onClick={() => window.location.href = '/books'}
              className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Browse Books
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-xs text-center p-1">
                        {item.title.split(' ').map(word => word[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 line-clamp-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">by {item.author}</p>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition duration-200"
                      title="Remove from wishlist"
                    >
                      <Heart className="fill-current" size={20} />
                    </button>
                  </div>

                  {/* Book Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Book size={14} />
                        <span>{item.pages} pages</span>
                      </div>
                      <div className="flex items-center space-x-1 text-yellow-600">
                        <Award size={14} />
                        <span>Prize: ₹{item.quizPrize}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-1 text-gray-600">
                        <Clock size={14} />
                        <span>{item.delivery}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(item.rating)
                                  ? 'text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-600 text-sm">({item.rating})</span>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-800">₹{item.price}</span>
                      <span className="text-lg text-gray-500 line-through">₹{item.originalPrice}</span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                        Save ₹{item.originalPrice - item.price}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => addToCart(item.id)}
                      disabled={item.isInCart}
                      className={`flex-1 py-2 px-4 rounded-md transition duration-200 flex items-center justify-center space-x-2 ${
                        item.isInCart
                          ? 'bg-green-500 text-white cursor-not-allowed'
                          : 'bg-blue-500 text-white hover:bg-blue-600'
                      }`}
                    >
                      <ShoppingCart size={16} />
                      <span>{item.isInCart ? 'Added to Cart' : 'Add to Cart'}</span>
                    </button>

                    <button
                      onClick={() => {/* Navigate to book details */}}
                      className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-200 flex items-center justify-center space-x-2"
                    >
                      <Eye size={16} />
                      <span>View</span>
                    </button>
                  </div>

                  {/* Added Date */}
                  <div className="text-xs text-gray-500 mt-3 text-center">
                    Added on {new Date(item.addedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Actions Footer */}
        {wishlistItems.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                <p>You have {wishlistItems.length} items in your wishlist</p>
                <p>Total potential savings: <span className="font-semibold text-green-600">₹{totalSavings}</span></p>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={moveAllToCart}
                  disabled={wishlistItems.every(item => item.isInCart)}
                  className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200"
                >
                  Add All to Cart
                </button>
                <button
                  onClick={() => window.location.href = '/books'}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;