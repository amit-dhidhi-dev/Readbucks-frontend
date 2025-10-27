import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowLeft,
  CreditCard,
  Shield,
  Book,
  Award,
  Clock,
  X
} from 'lucide-react';
import { FaRupeeSign, FaBookOpen, FaTrophy } from 'react-icons/fa';

const AddToCartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 299,
      originalPrice: 499,
      image: '/api/placeholder/80/120',
      quantity: 1,
      pages: 180,
      rating: 4.5,
      quizPrize: 500,
      delivery: 'Instant'
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 349,
      originalPrice: 599,
      image: '/api/placeholder/80/120',
      quantity: 1,
      pages: 281,
      rating: 4.8,
      quizPrize: 750,
      delivery: 'Instant'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      price: 279,
      originalPrice: 449,
      image: '/api/placeholder/80/120',
      quantity: 1,
      pages: 328,
      rating: 4.7,
      quizPrize: 600,
      delivery: 'Instant'
    }
  ]);

  const [suggestedBooks] = useState([
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      price: 259,
      originalPrice: 399,
      image: '/api/placeholder/80/120',
      rating: 4.6,
      quizPrize: 450
    },
    {
      id: 5,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      price: 319,
      originalPrice: 499,
      image: '/api/placeholder/80/120',
      rating: 4.3,
      quizPrize: 550
    },
    {
      id: 6,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      price: 199,
      originalPrice: 299,
      image: '/api/placeholder/80/120',
      rating: 4.4,
      quizPrize: 400
    }
  ]);

  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discount = cartItems.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
  const total = subtotal;
  const totalQuizPrize = cartItems.reduce((total, item) => total + item.quizPrize, 0);

  // Cart actions
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const addToCart = (book) => {
    const existingItem = cartItems.find(item => item.id === book.id);
    if (existingItem) {
      updateQuantity(book.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...book, quantity: 1 }]);
    }
  };

  const proceedToCheckout = () => {
    // Handle checkout logic here
    alert('Proceeding to checkout!');
  };

  const continueShopping = () => {
    // Navigate back to books page
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
              onClick={continueShopping}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition duration-200"
            >
              <ArrowLeft size={20} />
              <span>Continue Shopping</span>
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
            <ShoppingCart className="text-blue-600" size={32} />
            <span>Shopping Cart</span>
          </h1>
          <div className="w-32"></div> {/* Spacer for alignment */}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="lg:w-2/3">
            {/* Cart Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
                </h2>
                <button 
                  onClick={continueShopping}
                  className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Add More Books
                </button>
              </div>
            </div>

            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <ShoppingCart className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some amazing books to get started!</p>
                <button 
                  onClick={continueShopping}
                  className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Browse Books
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Book Image */}
                      <div className="flex-shrink-0">
                        <div className="w-20 h-28 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm text-center p-2">
                          {item.title.split(' ').map(word => word[0]).join('')}
                        </div>
                      </div>

                      {/* Book Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 mb-2">by {item.author}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center space-x-1">
                                <Book size={14} />
                                <span>{item.pages} pages</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Award size={14} />
                                <span>Prize: ₹{item.quizPrize}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock size={14} />
                                <span>{item.delivery}</span>
                              </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-center space-x-3 mb-3">
                              <span className="text-2xl font-bold text-gray-800">
                                ₹{item.price}
                              </span>
                              <span className="text-lg text-gray-500 line-through">
                                ₹{item.originalPrice}
                              </span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">
                                Save ₹{item.originalPrice - item.price}
                              </span>
                            </div>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3 sm:space-x-4">
                            <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded hover:bg-gray-200 transition duration-200"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded hover:bg-gray-200 transition duration-200"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition duration-200"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Suggested Books */}
            {cartItems.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center space-x-2">
                  <FaBookOpen className="text-blue-600" />
                  <span>You Might Also Like</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {suggestedBooks.map((book) => (
                    <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-200">
                      <div className="p-4">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xs text-center p-1">
                              {book.title.split(' ').map(word => word[0]).join('')}
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">
                              {book.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                            
                            <div className="flex items-center space-x-2 mb-2">
                              <div className="flex items-center space-x-1">
                                <FaTrophy className="text-yellow-500 text-sm" />
                                <span className="text-xs text-gray-600">Prize: ₹{book.quizPrize}</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-800">₹{book.price}</span>
                                <span className="text-sm text-gray-500 line-through">₹{book.originalPrice}</span>
                              </div>
                              
                              <button
                                onClick={() => addToCart(book)}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition duration-200"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          {cartItems.length > 0 && (
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md sticky top-8">
                {/* Order Summary */}
                <div className="p-6 border-b">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span>₹{subtotal}</span>
                    </div>
                    
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount}</span>
                    </div>

                    <div className="flex justify-between text-blue-600">
                      <span>Total Quiz Prize Money</span>
                      <span>+₹{totalQuizPrize}</span>
                    </div>

                    <div className="border-t pt-3">
                      <div className="flex justify-between text-lg font-semibold text-gray-800">
                        <span>Total</span>
                        <span>₹{total}</span>
                      </div>
                      <p className="text-sm text-green-600 mt-1">
                        You save ₹{discount} on this order!
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefits */}
                <div className="p-6 border-b">
                  <h3 className="font-semibold text-gray-800 mb-3">Benefits</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <Shield size={16} />
                      <span>Earn up to ₹{totalQuizPrize} in quiz prizes</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-blue-600">
                      <Clock size={16} />
                      <span>Instant digital delivery</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-purple-600">
                      <Award size={16} />
                      <span>Lifetime access to purchased books</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <div className="p-6">
                  <button
                    onClick={proceedToCheckout}
                    className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-200 flex items-center justify-center space-x-2 font-semibold text-lg"
                  >
                    <CreditCard size={20} />
                    <span>Proceed to Checkout</span>
                  </button>
                  
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Secure payment · Instant access · Money-back guarantee
                  </p>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                <h3 className="font-semibold text-gray-800 mb-4 text-center">Why Shop With Us?</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="text-sm">
                    <Shield className="mx-auto text-green-500 mb-1" size={20} />
                    <span className="text-gray-600">Secure Payment</span>
                  </div>
                  <div className="text-sm">
                    <Clock className="mx-auto text-blue-500 mb-1" size={20} />
                    <span className="text-gray-600">Instant Delivery</span>
                  </div>
                  <div className="text-sm">
                    <Award className="mx-auto text-yellow-500 mb-1" size={20} />
                    <span className="text-gray-600">Quiz Prizes</span>
                  </div>
                  <div className="text-sm">
                    <Book className="mx-auto text-purple-500 mb-1" size={20} />
                    <span className="text-gray-600">Lifetime Access</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToCartPage;