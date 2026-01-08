import React from 'react';
import PDFViewer from './PDFViewer';
import { useParams } from 'react-router-dom';
import { useBookDetail } from '../../assets/hooks/useBook';
import { userApi } from '../../api/userApi';
import ChoosePdfOrEpub from './ChoosePdfOrEpub';
import EpubViewer from './EpubViewer';


const BookReader = () => {

  const { bookId } = useParams();
  const { book: bookData, loading, error } = useBookDetail(bookId);
  const [userHasAccess, setUserHasAccess] = React.useState(false);

  const [showFileChooser, setShowFileChooser] = React.useState(false);
  const [fileType, setFileType] = React.useState(null);

  console.log("Book Data in Reader:", bookData?.book_content_url);



  // check if book has price then check is user has purchased it
  if (bookData && bookData.price > 0) {
    const token = JSON.parse(localStorage.getItem('user'))?.access_token || null;

    const fetchUserData = async () => {
      // get current user data from server
      const user = await userApi.getCurrentUser(token);
      const userData = user.data;

      // check if user has purchased the book
      userData?.purchase_history.filter(purchase => purchase.book_id === bookData.id).length > 0 ? setUserHasAccess(true) : setUserHasAccess(false);

    }

    // check user is login or not
    if (!token) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Access Denied</h2>
            <p className="text-gray-600 mb-6">You need to log in and purchase this book to read it.</p>
            <a
              href={import.meta.env.VITE_LOGIN_PAGE}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Login Page
            </a>
          </div>
        </div>
      );
    }
    fetchUserData();

    if (!userHasAccess) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Access Denied</h2>
            <p className="text-gray-600 mb-6">You need to purchase this book to read it.</p>
            <a
              href={`${import.meta.env.VITE_BOOK_DETAILS_PAGE.replace(':bookId', bookData.id)}`}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Go to Book Details
            </a>
          </div>
        </div>
      );
    }

  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading book...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 font-medium mb-2">Error loading book</div>
        <div className="text-red-500 text-sm mb-4">{error}</div>
        <button
          //   onClick={fetchBookData}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!bookData) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-500">Book not found</div>
      </div>
    );
  }



  // check book content url
  if (bookData && bookData.book_content_url === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Book Not Available</h2>
          <p className="text-gray-600 mb-6">This book is not available for reading at the moment.</p>
          <a
            href={import.meta.env.VITE_BOOK_DETAILS_PAGE}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Book Details
          </a>
        </div>
      </div>
    );
  } else {
    const pdf = bookData.book_content_url.pdf;
    const epub = bookData.book_content_url.epub;
    console.log('pdf: ', pdf, "epub: ", epub)
    // check if pdf and epub both are available
    if (pdf && epub) {
      setShowFileChooser(true);
      return showFileChooser ? <ChoosePdfOrEpub onClose={() => setShowFileChooser(false)} setFile={setFileType} /> : null;
    } else {
      if (pdf) {
        console.log('this is pdf reader')
        return <PDFViewer pdfUrl={pdf} />;
      }
      if (epub) {
        console.log('this is epub reader')
        return <EpubViewer epubUrl={epub} />;
      }
    }

    if (pdf && fileType === 'pdf') {
      console.log('this is pdf reader')
      return <PDFViewer pdfUrl={pdf} />;
    }
    if (epub && fileType === 'epub') {
      console.log('this is epub reader')
      return <EpubViewer epubUrl={epub} />;
    }


  }

  // return (
  //   <div className="min-h-screen bg-gray-50">
  //     <div className="container mx-auto px-4 py-8 max-w-6xl">
  //       {/* Book Header with enhanced styling */}
  //       <div className="text-center mb-12 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
  //         <div className="max-w-2xl mx-auto">
  //           <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
  //             {bookData.title}
  //           </h1>

  //           {bookData.author && (
  //             <p className="text-xl text-gray-600 mb-6">by {bookData.author}</p>
  //           )}

  //           {/* Additional book metadata */}
  //           <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
  //             {bookData.publication_date && (
  //               <span className="flex items-center">
  //                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  //                 </svg>
  //                 Published {bookData.publication_date}
  //               </span>
  //             )}

  //             {bookData.total_pages && (
  //               <span className="flex items-center">
  //                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  //                 </svg>
  //                 {bookData.total_pages} pages
  //               </span>
  //             )}
  //           </div>
  //         </div>
  //       </div>

  //       {/* PDF Viewer Section */}
  //       <div className="mb-8">
  //         <div className="flex items-center justify-between mb-4">
  //           <h2 className="text-xl font-semibold text-gray-800">Book Preview</h2>
  //           <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
  //             Scroll to read
  //           </div>
  //         </div>

  //         <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
  //           <PDFViewer pdfUrl={bookData.book_content_url} />
  //         </div>
  //       </div>

  //       {/* Enhanced Book Actions */}
  //       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
  //         <div className="text-center mb-6">
  //           <h3 className="text-lg font-semibold text-gray-800 mb-2">
  //             Download or Print this Book
  //           </h3>
  //           <p className="text-gray-600 text-sm max-w-md mx-auto">
  //             Choose your preferred format to read offline or share with others
  //           </p>
  //         </div>

  //         <div className="flex flex-col sm:flex-row justify-center gap-4">
  //           <a
  //             href={bookData.book_content_url}
  //             download
  //             className="group px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
  //           >
  //             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  //             </svg>
  //             Download PDF
  //             <span className="ml-2 text-green-200 text-sm group-hover:text-green-100">
  //               ({bookData.fileSize || 'PDF'})
  //             </span>
  //           </a>

  //           <button
  //             onClick={() => window.print()}
  //             className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
  //           >
  //             <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
  //             </svg>
  //             Print Book
  //           </button>

  //           {/* Additional action button */}
  //           <button className="group px-8 py-4 bg-white text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center shadow-sm hover:shadow-md">
  //             <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  //             </svg>
  //             Share
  //           </button>
  //         </div>

  //         {/* Quick tips */}
  //         <div className="mt-6 text-center">
  //           <div className="inline-flex items-center text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">
  //             <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  //             </svg>
  //             Tip: For best printing results, use "Save as PDF" in your print dialog
  //           </div>
  //         </div>
  //       </div>

  //       {/* Additional Features Section */}
  //       {bookData.description && (
  //         <div className="mt-8 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
  //           <h3 className="text-lg font-semibold text-gray-800 mb-4">About this Book</h3>
  //           <p className="text-gray-600 leading-relaxed">{bookData.description}</p>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );






};

export default BookReader;