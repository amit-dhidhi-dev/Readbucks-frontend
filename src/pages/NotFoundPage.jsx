// import React from 'react';
// import { Home, Search, BookOpen, ArrowRight, Ghost, Coffee } from 'lucide-react';
// import { FaBookReader, FaRegSadTear } from 'react-icons/fa';

// const NotFoundPage = () => {
//   const popularBooks = [
//     {
//       title: "The Psychology of Money",
//       category: "Finance & Investing",
//       url: "/books/psychology-of-money"
//     },
//     {
//       title: "Atomic Habits",
//       category: "Self Improvement",
//       url: "/books/atomic-habits"
//     },
//     {
//       title: "Ikigai",
//       category: "Lifestyle & Philosophy",
//       url: "/books/ikigai"
//     },
//     {
//       title: "The Alchemist",
//       category: "Fiction & Inspiration",
//       url: "/books/the-alchemist"
//     }
//   ];

//   const quickLinks = [
//     {
//       name: "Browse All Books",
//       description: "Explore our complete library",
//       url: "/books",
//       icon: <BookOpen size={20} />
//     },
//     {
//       name: "Take a Quiz",
//       description: "Test your knowledge & win prizes",
//       url: "/quizzes",
//       icon: <FaBookReader className="text-xl" />
//     },
//     {
//       name: "Membership Plans",
//       description: "Upgrade for unlimited access",
//       url: "/plans",
//       icon: <Coffee size={20} />
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
//       <div className="max-w-4xl w-full">
//         <div className="text-center mb-12">
//           {/* Animated 404 Number */}
//           <div className="relative mb-8">
//             <div className="text-9xl font-bold text-gray-300 opacity-50 select-none">
//               404
//             </div>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <div className="text-center">
//                 <div className="flex items-center justify-center mb-4">
//                   <Ghost size={80} className="text-purple-500 animate-float" />
//                   <FaRegSadTear className="text-6xl text-yellow-500 ml-4 animate-bounce" />
//                 </div>
//                 <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
//                   Page Lost in Stories
//                 </h1>
//               </div>
//             </div>
//           </div>

//           {/* Main Message */}
//           <div className="max-w-2xl mx-auto">
//             <h2 className="text-3xl font-bold text-gray-900 mb-4">
//               Oops! This page seems to have wandered off...
//             </h2>
//             <p className="text-xl text-gray-600 mb-8 leading-relaxed">
//               Like a missing chapter in your favorite book, this page has disappeared. 
//               But don't worry - there are plenty of other great stories waiting for you!
//             </p>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//           {/* Search Box */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
//               <Search className="mr-3 text-purple-600" size={24} />
//               Search Our Library
//             </h3>
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="What are you looking for?"
//                 className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
//               />
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//             </div>
//             <button className="w-full mt-4 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center">
//               Search Books
//               <ArrowRight size={18} className="ml-2" />
//             </button>
//           </div>

//           {/* Quick Navigation */}
//           <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
//             <h3 className="text-lg font-semibold text-gray-900 mb-4">
//               Quick Navigation
//             </h3>
//             <div className="space-y-3">
//               {quickLinks.map((link, index) => (
//                 <a
//                   key={index}
//                   href={link.url}
//                   className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all group"
//                 >
//                   <div className="p-2 bg-purple-100 rounded-lg mr-4 group-hover:bg-purple-200 transition-colors">
//                     <div className="text-purple-600">
//                       {link.icon}
//                     </div>
//                   </div>
//                   <div className="flex-1 text-left">
//                     <p className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors">
//                       {link.name}
//                     </p>
//                     <p className="text-sm text-gray-600">{link.description}</p>
//                   </div>
//                   <ArrowRight size={16} className="text-gray-400 group-hover:text-purple-600 transition-colors" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Popular Books Section */}
//         <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 mb-8">
//           <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
//             While You're Here, Explore Popular Reads
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             {popularBooks.map((book, index) => (
//               <a
//                 key={index}
//                 href={book.url}
//                 className="group p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:shadow-md transition-all"
//               >
//                 <div className="bg-gradient-to-br from-purple-100 to-blue-100 h-32 rounded-lg mb-3 flex items-center justify-center group-hover:from-purple-200 group-hover:to-blue-200 transition-colors">
//                   <BookOpen className="text-purple-600" size={32} />
//                 </div>
//                 <h4 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2 mb-1">
//                   {book.title}
//                 </h4>
//                 <p className="text-sm text-gray-600">{book.category}</p>
//               </a>
//             ))}
//           </div>
//         </div>

//         {/* Help Section */}
//         <div className="text-center">
//           <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-8 mb-6">
//             <h3 className="text-xl font-semibold text-gray-900 mb-3">
//               Still Can't Find What You're Looking For?
//             </h3>
//             <p className="text-gray-600 mb-4">
//               Our support team is here to help you find your way
//             </p>
//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <a
//                 href="/contact"
//                 className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors"
//               >
//                 Contact Support
//               </a>
//               <a
//                 href="/help"
//                 className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
//               >
//                 Visit Help Center
//               </a>
//             </div>
//           </div>

//           {/* Back to Home */}
//           <a
//             href="/"
//             className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
//           >
//             <Home size={20} className="mr-3" />
//             Back to Homepage
//           </a>
//         </div>

//         {/* Fun Footer */}
//         <div className="text-center mt-12">
//           <p className="text-gray-500 text-sm">
//             "Not all those who wander are lost" - J.R.R. Tolkien
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default NotFoundPage;


import React from 'react';
import { Home, BookOpen, ArrowRight, Search } from 'lucide-react';

const MinimalNotFoundPage = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="w-48 h-48 mx-auto bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center">
            <BookOpen className="text-purple-600" size={80} />
          </div>
        </div>

        {/* Content */}
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The page you're looking for seems to have been lost in the library. 
            Let's find you a better story to read.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <a
            href="/"
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center justify-center"
          >
            <Home size={20} className="mr-2" />
            Back to Homepage
          </a>
          
          <a
            href="/books"
            className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
          >
            <Search size={20} className="mr-2" />
            Browse Books
          </a>
        </div>

        {/* Quick Stats */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Join 50,000+ readers exploring our library
          </p>
        </div>
      </div>
    </div>
  );
};

export default MinimalNotFoundPage;