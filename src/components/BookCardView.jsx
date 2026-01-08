// components/BooksCardView.jsx
import React from 'react';
import { FaBook, FaShare, FaEye, FaRupeeSign, FaShoppingBag } from 'react-icons/fa';
import './css/BookCardView.css'
import { useNavigate } from 'react-router-dom';
import PromoteModal from './account/PromoteModal';
import { userApi } from '../api/userApi';
import { selectIsAuthenticated } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
import { displayRazorpay } from '../assets/utils/razorpay';


const BooksCardView = ({
  books,
  onBookClick,
  viewMode = 'grid' // 'grid' or 'list'
}) => {


  // when preview or read button click
  const navigate = useNavigate();


  const [share, setShare] = React.useState(false);

  const onShareHandle = () => {
    setShare(!share)
  }
  const [bookData, setBookData] = React.useState(null);

  const [loadingStates, setLoadingStates] = React.useState({});

  const isAuthenticated = useSelector(selectIsAuthenticated);


  const handlePaymentSuccess = async (response) => {
    if (bookData && isAuthenticated) {
      const token = JSON.parse(localStorage.getItem('user'))?.access_token || null;
      try {
        const history_dict = {
          "book_id": bookData.id || 'book id',
          "amount_paid": bookData.discount_price || bookData.price || 0,
          "transaction_id": response?.razorpay_payment_id || 'transaction id',
          "book_name": bookData.title,
          "book_author": bookData.author,
          "book_cover": bookData.cover_image_url || "cover image",
          "book_reading_progress": 0.0,
        }

        await userApi.addPurchaseHistory(token, history_dict);

        navigate(import.meta.env.VITE_PAYMENT_SUCCESS_PAGE.replace(":bookId", bookData.id));
      } catch (error) {
        console.error('error adding purchase history: ', error)
      }

    }

  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  const onReadHandle = async () => {
    // if user not login than redirect to login page
    if (!isAuthenticated) {
      navigate(import.meta.env.VITE_LOGIN_PAGE)
    }


    // send to book reader page
    if (bookData) {

      // check if book is already in user library
      if (bookData.price > 0) {
        const token = JSON.parse(localStorage.getItem('user'))?.access_token || null;
        const user = await userApi.getCurrentUser(token);
        const userData = user.data;

        // check if user has purchased the book
        userData?.purchase_history?.filter(purchase => purchase.book_id === bookData.id).length > 0 ?  navigate(import.meta.env.VITE_READ_BOOK_PAGE.replace(':bookId', bookData.id)) :  navigate(import.meta.env.VITE_BOOK_DETAILS_PAGE.replace(':bookId', bookData.id));

      } else {
        // update user library
        try {
          const token = JSON.parse(localStorage.getItem('user'))?.access_token || null;
          const book_dict = {
            "book_id": bookData.id || 'book id',
            "book_name": bookData.title,
            "book_author": bookData.author,
            "book_cover": bookData.cover_image_url || "cover image",
            "book_reading_progress": 0.0,
          }

          console.log('book_dict', book_dict);

          await userApi.addBookToUserLibrary(token, book_dict);
          // navigate to book read page
          navigate(import.meta.env.VITE_READ_BOOK_PAGE.replace(':bookId', bookData.id))
        } catch (error) {
          console.error("Error adding book to library:", error);
        }
      }     
    }
  }



  const onCardClick = (book, e) => {
    if (e.target.innerText.toLowerCase() === 'share') {
      setBookData(book);
      onShareHandle();
    }
    else if (e.target.innerText.toLowerCase() === 'buy') {
      setBookData(book);
      // if user not authenticate 
      if (!isAuthenticated) {
        navigate(import.meta.env.VITE_LOGIN_PAGE);
      }
      // initialize payment
      displayRazorpay(book?.discount_price || book?.price, book?.title, handlePaymentSuccess, handlePaymentError, null, setLoadingStates, book.id);

    }
    else if (e.target.innerText.toLowerCase() === 'read') {
      setBookData(book);
      onReadHandle();
    }
    else {
      onBookClick(book);
    }
  }


  const GridView = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map(book => (
        <>
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200 cursor-pointer group flex flex-col"
            onClick={(e) => onBookClick && onCardClick(book, e)}
          >
            {/* Book Image/Thumbnail */}
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-t-xl overflow-hidden">
                {book.cover_image_url ? (
                  <>
                    <img
                      src={book.cover_image_url}
                      alt={`${book.title} cover`}
                      className="w-full h-full object-cover transition-opacity duration-300"
                      loading="lazy"
                      onLoad={(e) => {
                        e.target.style.opacity = '1';
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling?.classList.remove('hidden');
                      }}
                      style={{ opacity: 0 }}
                    />
                    {/* Fallback placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 hidden">
                      <div className="flex flex-col items-center text-blue-400">
                        <FaBook className="text-4xl mb-2" />
                        <span className="text-xs"> {import.meta.env.VITE_WEBSITE_NAME} </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="flex flex-col items-center text-blue-400">
                      <FaBook className="text-4xl mb-2" />
                      <span className="text-xs">No Cover Image</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Discount Badge */}
              {book.discount_price && book.discount_price < book.price && (
                <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                  {Math.round(((book.price - book.discount_price) / book.price) * 100)}% OFF
                </div>
              )}
            </div>

            {/* Book Content */}
            <div className="p-5 flex-1 flex flex-col">
              {/* Title and Author */}
              <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">by {book.author}</p>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-1">
                {book.description}
              </p>

              {/* Meta Info */}
              <div className="flex justify-between text-xs text-gray-500 mb-4">
                <span>{book.pages} pages</span>
                <span>{book.language}</span>
                <span>{book.categories[0]}</span>
              </div>

              {/* Price and Actions */}
              <div className="space-y-3">
                {/* Price Section */}
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <FaRupeeSign className="text-gray-700 text-sm" />
                    <span className="text-2xl font-bold text-gray-900">
                      {book.discount_price || book.price}
                    </span>
                    {book.discount_price && book.discount_price < book.price && (
                      <>
                        <span className="text-sm text-gray-500 line-through ml-1">
                          ₹{book.price}
                        </span>
                        <span className="text-xs text-red-500 font-semibold ml-1">
                          Save ₹{book.price - book.discount_price}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Buttons Section */}
                <div className="flex gap-2 flex-wrap">
                  {/* Read Button - Conditionally rendered */}
                  {book.access_level !== "premium" && (
                    <button
                      className="flex items-center gap-1 px-3 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors flex-1 min-w-0 justify-center"
                      title="Read Book"
                    >
                      <FaEye className="text-sm" />
                      <span className="text-xs font-medium">Read</span>
                    </button>
                  )}

                  {/* Add to Share Button */}
                  <button
                    className="flex items-center gap-1 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex-1 min-w-0 justify-center"
                    title="Share"
                  >
                    <FaShare className="text-sm" />
                    <span className="text-xs font-medium">Share</span>
                  </button>

                  {/* Buy Now Button */}
                  <button
                    className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex-1 min-w-0 justify-center"
                    title="Buy"
                  >
                    {loadingStates[book.id] ? 'Processing...' : <><FaShoppingBag className="text-sm" />
                      <span className="text-xs font-medium">Buy</span></>}

                  </button>


                </div>
              </div>
            </div>
          </div>
          {/* share modal */}
          {book && share &&
            <PromoteModal book={bookData} onClose={onShareHandle} isShare={true} />
          }

        </>
      ))}


    </div>
  );





  //List View
  const ListView = () => (
    <div className="space-y-4">
      {books.map(book => (
        <>
          <div
            key={book.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 hover:border-blue-200 cursor-pointer group"
            onClick={(e) => onBookClick && onCardClick(book, e)}
          >
            <div className="flex">
              {/* Book Image/Thumbnail */}
              <div className="w-32 flex-shrink-0 relative">
                <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 rounded-l-xl overflow-hidden">
                  {book.cover_image_url ? (
                    <>
                      <img
                        src={book.cover_image_url}
                        alt={`${book.title} cover`}
                        className="w-full h-full object-cover transition-opacity duration-300"
                        loading="lazy"
                        onLoad={(e) => {
                          e.target.style.opacity = '1';
                        }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling?.classList.remove('hidden');
                        }}
                        style={{ opacity: 0 }}
                      />
                      {/* Fallback placeholder */}
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 hidden">
                        <div className="flex flex-col items-center text-blue-400">
                          <FaBook className="text-2xl mb-1" />
                          <span className="text-xs">Cover Image</span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="flex flex-col items-center text-blue-400">
                        <FaBook className="text-2xl mb-1" />
                        <span className="text-xs">No Cover</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Discount Badge for List View */}
                {book.discount_price && book.discount_price < book.price && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                    {Math.round(((book.price - book.discount_price) / book.price) * 100)}% OFF
                  </div>
                )}

              </div>

              {/* Book Content */}
              <div className="flex-1 p-5">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">by {book.author}</p>
                  </div>

                </div>

                <div className="flex gap-8">
                  {/* Left Section - Details */}
                  <div className="flex-1">


                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                      {book.description}
                    </p>

                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>{book.pages} pages</span>
                      <span>{book.language}</span>
                      <span>{book.category}</span>
                    </div>
                  </div>

                  {/* Right Section - Price and Actions */}
                  <div className="w-56 flex-shrink-0 flex flex-col justify-between">
                    <div className="flex flex-col items-end mb-3">
                      <div className="flex items-center gap-1">
                        <FaRupeeSign className="text-gray-700 text-sm" />
                        <span className="text-2xl font-bold text-gray-900">
                          {book.discount_price || book.price}
                        </span>
                      </div>

                      {book.discount_price && book.discount_price < book.price && (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-sm text-gray-500 line-through">
                            ₹{book.price}
                          </span>
                          <span className="text-xs text-red-500 font-semibold">
                            Save ₹{book.price - book.discount_price}
                          </span>
                        </div>
                      )}

                    </div>

                    <div className="flex gap-2 justify-end">
                      {/* Read Button */}
                      <button
                        className="flex items-center gap-2 px-3 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                        title="Read"
                      >
                        <FaEye className="text-sm" />
                        <span className="text-xs font-medium">Read</span>
                      </button>

                      {/* Add to Share Button */}
                      <button
                        className="flex items-center gap-2 px-3 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        title="Share"
                      >
                        <FaShare className="text-sm" />
                        <span className="text-xs font-medium">Share</span>
                      </button>


                      {/* Buy Now Button */}
                      <button
                        className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Buy"
                      >
                        {loadingStates[book.id] ? 'Processing...' : <> <FaShoppingBag className="text-sm" />
                          <span className="text-xs font-medium">Buy</span></>}

                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* share modal */}
          {book && share &&
            <PromoteModal book={book} onClose={onShareHandle} isShare={true} />
          }
        </>
      ))}
    </div>
  );






  return (
    <div className="books-card-view">
      {viewMode === 'grid' ? <GridView /> : <ListView />}
    </div>
  );
};

export default BooksCardView;