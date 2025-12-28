import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Users,
  Calendar,
  FileText  
} from 'lucide-react';
import {  FaEye, FaShoppingBag, FaShare, FaBook } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { useBook } from '../assets/hooks/useBook';
import PromoteModal from '../components/account/PromoteModal';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, fetchUserData } from '../features/auth/userSlice';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import { userApi } from '../api/userApi';
import { displayRazorpay } from '../assets/utils/razorpay';


const BookDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('description');

  const [share, setShare] = useState(false)

  const [loading, setLoading] = useState(false);

  const { bookId } = useParams();

  const { book } = useBook(bookId);

  const navigate = useNavigate()



  const onShareHandle = () => {
    setShare(!share)
  }

  const onReadHandle = async () => {
    // if user not login than redirect to login page
    if (!isAuthenticated) {
      navigate(import.meta.env.VITE_LOGIN_PAGE)
    }


    // send to book reader page
    if (book) {

      // update user library
      try {
        const token = JSON.parse(localStorage.getItem('user'))?.access_token || null;
        const book_dict = {
          "book_id": book.id || 'book id',
          "book_name": book.title,
          "book_author": book.author,
          "book_cover": book.cover_image_url || "cover image",
          "book_reading_progress": 0.0,
        }

        console.log('book_dict', book_dict);

        await userApi.addBookToUserLibrary(token, book_dict);

      } catch (error) {
        console.error("Error adding book to library:", error);
      }



      navigate(import.meta.env.VITE_BOOK_DETAILS_PAGE.replace(":bookId", book.id));
    }
  }



 const handlePaymentSuccess = async (response) => {
    // console.log('Payment successful:', response);
    // Save payment details to your database
    // Update user subscription/purchase

    if (book && isAuthenticated) {
      const token = JSON.parse(localStorage.getItem('user'))?.access_token || null;
      try {
        const history_dict = {
          "book_id": book.id || 'book id',
          "amount_paid": book.discount_price || book.price || 0,
          "transaction_id": response?.razorpay_payment_id || 'transaction id',
          "book_name": book.title,
          "book_author": book.author,
          "book_cover": book.cover_image_url || "cover image",
          "book_reading_progress": 0.0,
        }

        await userApi.addPurchaseHistory(token, history_dict);

        navigate(import.meta.env.VITE_PAYMENT_SUCCESS_PAGE.replace(":bookId", book.id));
      } catch (error) {
        console.error('error adding purchase history: ', error)
      }

    }

  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    // Handle error
  };


  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserData())
    }
  }, [dispatch, isAuthenticated]);


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Book Cover & Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6 border border-gray-100">
              {/* Book Image/Thumbnail */}
              <div className="relative group">
                <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl overflow-hidden shadow-lg">
                  {book?.cover_image_url ? (
                    <>
                      <img
                        src={book?.cover_image_url}
                        alt={`${book?.title} cover`}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling?.classList.remove('hidden');
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 hidden">
                        <div className="flex flex-col items-center text-blue-400">
                          <FaBook className="text-4xl mb-2" />
                          <span className="text-xs">{import.meta.env.VITE_WEBSITE_NAME}</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="flex flex-col items-center text-blue-400">
                        <FaBook className="text-4xl mb-2" />
                        <span className="text-xs">{import.meta.env.VITE_WEBSITE_NAME}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Discount Badge */}
                {book?.discount_price && book?.discount_price < book?.price && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                    {Math.round(((book?.price - book?.discount_price) / book?.price) * 100)}% OFF
                  </div>
                )}

               
              </div>


              {/* Action Buttons */}
              <div className="space-y-3 my-6">
                <button onClick={() => { displayRazorpay(book?.discount_price || book?.price, book?.title, handlePaymentSuccess, handlePaymentError, setLoading) }} disabled={loading} className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
                  {loading ? 'Processing...' : <>
                    <FaShoppingBag className="text-lg" />
                    <span>Buy Now for ₹{book?.discount_price || book?.price}</span>
                  </>}
                </button>

                <div className="grid grid-cols-2 gap-3">
                  {book?.access_level !== "premium" ? (<button onClick={onReadHandle} className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium">
                    <FaEye className="text-lg" />
                    <span>Read </span>
                  </button>) : (<button className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-colors font-medium">
                    <FaEye className="text-lg" />
                    <span>add to cart </span>
                  </button>)}


                  <button
                    onClick={onShareHandle}
                    className="flex items-center justify-center gap-2 py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">
                    <FaShare className="text-lg" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
          </div>


          {/* share modal */}
          {book && share &&
            <PromoteModal book={book} userData={user} onClose={onShareHandle} isShare={true} />
          }




          {/* Right Column - Book Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Book Header */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {book?.title}
                  </h1>
                  <p className="text-2xl text-gray-600 mb-2">by {book?.author}</p>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6">
                <div className="flex items-center space-x-6">
                  <div className="flex items-baseline space-x-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{book?.discount_price || book?.price}
                    </span>
                    {book?.discount_price && book?.discount_price < book?.price && (
                      <>
                        <span className="text-2xl text-gray-500 line-through">
                          ₹{book?.price}
                        </span>
                        <span className="bg-green-500 text-white px-4 py-2 rounded-full text-lg font-semibold shadow-lg">
                          Save ₹{book?.price - book?.discount_price}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Book Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
                  <FileText size={24} className="mx-auto mb-3 text-blue-600" />
                  <div className="text-sm text-gray-600 font-medium">Pages</div>
                  <div className="font-bold text-gray-900 text-lg">{book?.total_pages}</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-green-50 rounded-2xl border border-gray-200">
                  <BookOpen size={24} className="mx-auto mb-3 text-green-600" />
                  <div className="text-sm text-gray-600 font-medium">Language</div>
                  <div className="font-bold text-gray-900 text-lg">{book?.language}</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-purple-50 rounded-2xl border border-gray-200">
                  <Calendar size={24} className="mx-auto mb-3 text-purple-600" />
                  <div className="text-sm text-gray-600 font-medium">Published</div>
                  <div className="font-bold text-gray-900 text-lg">
                    {book?.publication_date ? new Date(book?.publication_date).getFullYear() : 'N/A'}
                  </div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-orange-50 rounded-2xl border border-gray-200">
                  <Users size={24} className="mx-auto mb-3 text-orange-600" />
                  <div className="text-sm text-gray-600 font-medium">Category</div>
                  <div className="font-bold text-gray-900 text-lg">{book?.categories?.[0]}</div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Tab Headers */}
              <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-blue-50">
                <div className="flex space-x-1 px-6">
                  {[
                    { id: 'description', label: 'Description', icon: FileText },
                    { id: 'chapters', label: 'Chapters', icon: BookOpen }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-3 py-5 px-6 font-semibold border-b-2 transition-all ${activeTab === tab.id
                        ? 'border-blue-600 text-blue-600 bg-white shadow-sm'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-white/50'
                        } rounded-t-lg`}
                    >
                      <tab.icon size={20} />
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'description' && (
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      About this Book
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg border-l-4 border-blue-500 pl-6 bg-blue-50/50 py-4 rounded-r-2xl">
                      {book?.description}
                    </p>
                  </div>
                )}

                {activeTab === 'chapters' && (
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      Table of Contents
                    </h3>
                    <div className="space-y-4">
                      {book?.chapters?.map((chapter, index) => (

                        <div
                          key={index}
                          className="flex items-center justify-between p-5 hover:bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl transition-all group border border-gray-200 hover:border-blue-200 hover:shadow-md"
                        >
                          <div className="flex items-center space-x-5">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform shadow-lg">
                              {index + 1}
                            </div>
                            <span className="text-gray-900 font-semibold text-lg group-hover:text-blue-700 transition-colors">
                              {chapter}
                            </span>
                          </div>
                          {/* <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-xl transition-colors">
                            Preview
                          </button> */}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Info Card */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Why Choose This Book?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <FileText className="text-white" size={28} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Comprehensive Content</h4>
                  <p className="text-blue-100 text-sm">Detailed insights with practical examples</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <BookOpen className="text-white" size={28} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Easy to Understand</h4>
                  <p className="text-blue-100 text-sm">Clear language with real-world applications</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
                    <Users className="text-white" size={28} />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Expert Author</h4>
                  <p className="text-blue-100 text-sm">Written by industry professionals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
