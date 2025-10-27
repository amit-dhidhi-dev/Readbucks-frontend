import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Search, Menu, X, Book, Bell } from 'lucide-react';

function Navbars() {
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [searchQuery, setSearchQuery] = useState('');
      const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); 
      
  return (
    <nav className="bg-[#1A2238] text-white sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-[#FF6A3D] py-2 px-4 text-center text-sm">
        <p>🎉 New Quiz Contest Live! Play Now & Win 500 Points + Free Book!</p>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Book className="w-8 h-8 text-[#F4B942]" />
            <div>
              <h1 className="text-2xl font-bold">{import.meta.env.VITE_WEBSITE_NAME}</h1>
              <p className="text-xs text-gray-300">Read. Play. Win.</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for books, authors, genres..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg text-white-800 focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 ">
            <a href={import.meta.env.VITE_HOME_PAGE} className="hover:text-[#F4B942] transition">Home</a>
            <a href={import.meta.env.VITE_BOOKS_PAGE} className="hover:text-[#F4B942] transition">Books</a>
            <a href={import.meta.env.VITE_QUIZ_PAGE} className="hover:text-[#F4B942] transition">Quiz</a>
            <a href={import.meta.env.VITE_LEADERBOARD_PAGE} className="hover:text-[#F4B942] transition">Leaderboard</a>
            <a href={import.meta.env.VITE_ABOUT_PAGE} className="hover:text-[#F4B942] transition">About</a>
            <a href={import.meta.env.VITE_CONTACT_PAGE} className="hover:text-[#F4B942] transition">Contact</a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 ml-4">
            {/* <button className="relative hover:text-[#F4B942] transition">
              <Heart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#FF6A3D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            <button className="relative hover:text-[#F4B942] transition">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#FF6A3D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
            </button> */}
             <button className="relative hover:text-[#F4B942] transition">
            <a href={import.meta.env.VITE_NOTIFICATION_PAGE}><Bell className="w-6 h-6" /></a>
              <span className="absolute -top-2 -right-2 bg-[#FF6A3D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </button>
            <button onClick={()=> setIsUserMenuOpen(!isUserMenuOpen)} className="hover:text-[#F4B942] transition">
              <User className="w-6 h-6" />
            </button>

            {/* when user icon clicked */}
           {isUserMenuOpen && (
                <div onClick={()=> setIsUserMenuOpen(false)} className="absolute right-0 mt-42 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                   <a href={import.meta.env.VITE_NOTIFICATION_PAGE} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Notification
                  </a>
                  <a href={import.meta.env.VITE_ACCOUNT_PAGE} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Account
                  </a>
                  <a href={import.meta.env.VITE_CART_PAGE} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Add to Cart
                  </a>
                  <a href={import.meta.env.VITE_WISHLIST_PAGE} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Wishlist
                  </a>
                 <a href={import.meta.env.VITE_PUBLISH_BOOK_PAGE} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Publish your Book
                  </a>
                  <div className="border-t my-1"></div>
                  <a href={`${import.meta.env.VITE_LOGIN_PAGE}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign In
                  </a>
                </div>
              )}




            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 pr-10 rounded-lg text-white-800 focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href={import.meta.env.VITE_HOME_PAGE} className="block hover:text-[#F4B942] transition">Home</a>
            <a href={import.meta.env.VITE_BOOKS_PAGE} className="block hover:text-[#F4B942] transition">Books</a>
            <a href={import.meta.env.VITE_QUIZ_PAGE} className="block hover:text-[#F4B942] transition">Quiz</a>
            <a href={import.meta.env.VITE_LEADERBOARD_PAGE} className="block hover:text-[#F4B942] transition">Leaderboard</a>
            <a href={import.meta.env.VITE_ABOUT_PAGE} className="block hover:text-[#F4B942] transition">About</a>
            <a href={import.meta.env.VITE_CONTACT_PAGE} className="block hover:text-[#F4B942] transition">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbars


// import { useState } from 'react';

// import {
//   Search,        // MagnifyingGlassIcon
//   ShoppingBag,   // ShoppingBagIcon
//   User,          // UserIcon
//   Menu,          // Bars3Icon
//   X              // XMarkIcon
// } from 'lucide-react';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

//   const navigation = [
//     { name: 'Home', href: '/' },
//     { name: 'Categories', href: '/categories' },
//     { name: 'Bestsellers', href: '/bestsellers' },
//     { name: 'New Releases', href: '/new-releases' },
//     { name: 'Deals', href: '/deals' },
//   ];

//   const categories = [
//     'Fiction', 'Non-Fiction', 'Science', 'Technology', 
//     'Business', 'Self-Help', 'Children', 'Romance'
//   ];

//   return (
//     <nav className="bg-white shadow-lg sticky top-0 z-50">
//       {/* Top Bar */}
//       <div className="bg-amber-900 text-white py-2">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <p className="text-sm">Free shipping on orders over $25!</p>
//             <div className="hidden md:flex space-x-4 text-sm">
//               <a href="#" className="hover:text-amber-200">Store Locator</a>
//               <a href="#" className="hover:text-amber-200">Help Center</a>
//               <a href="#" className="hover:text-amber-200">Contact Us</a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <a href="/" className="flex items-center">
//               <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center">
//                 <span className="text-white font-bold text-lg">B</span>
//               </div>
//               <span className="ml-2 text-2xl font-serif font-bold text-gray-800">
//                 BookNook
//               </span>
//             </a>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-baseline space-x-8">
//               {navigation.map((item) => (
//                 <a
//                   key={item.name}
//                   href={item.href}
//                   className="text-gray-700 hover:text-amber-600 px-3 py-2 text-sm font-medium transition duration-300"
//                 >
//                   {item.name}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="hidden lg:block flex-1 max-w-lg mx-8">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search books, authors, categories..."
//                 className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
//               />
//               {/* <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" /> */}
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>

//           {/* Right Side Icons */}
//           <div className="flex items-center space-x-4">
//             {/* Search Icon for Mobile */}
//             <button className="lg:hidden p-2">
//               {/* <MagnifyingGlassIcon className="h-6 w-6 text-gray-600" /> */}
//               <Search className="h-6 w-6 text-gray-600" />
//             </button>

//             {/* User Account */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
//                 className="p-2 hover:bg-gray-100 rounded-full transition duration-300"
//               >
//                 {/* <UserIcon className="h-6 w-6 text-gray-600" /> */}
//                 <User className="h-6 w-6 text-gray-600" />
//               </button>
              
//               {isUserDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     My Account
//                   </a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     My Orders
//                   </a>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     Wishlist
//                   </a>
//                   <div className="border-t my-1"></div>
//                   <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                     Sign In
//                   </a>
//                 </div>
//               )}
//             </div>

//             {/* Shopping Cart */}
//             <button className="relative p-2 hover:bg-gray-100 rounded-full transition duration-300">
//               {/* <ShoppingBagIcon className="h-6 w-6 text-gray-600" /> */}
//               <ShoppingBag className="h-6 w-6 text-gray-600" />
//               <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 3
//               </span>
//             </button>

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               className="md:hidden p-2"
//             >
//               {isMobileMenuOpen ? (
//                 // <XMarkIcon className="h-6 w-6 text-gray-600" />
//                 <X className="h-6 w-6 text-gray-600" />
//               ) : (
//                 // <Bars3Icon className="h-6 w-6 text-gray-600" />
//                 <Menu className="h-6 w-6 text-gray-600" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Categories Bar */}
//         <div className="hidden md:flex justify-center space-x-6 py-3 border-t border-gray-200">
//           {categories.slice(0, 8).map((category) => (
//             <a
//               key={category}
//               href="#"
//               className="text-sm text-gray-600 hover:text-amber-600 transition duration-300"
//             >
//               {category}
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
//             {/* Mobile Search */}
//             <div className="px-3 py-2">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Search books..."
//                   className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
//                 />
//                 <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//               </div>
//             </div>
            
//             {navigation.map((item) => (
//               <a
//                 key={item.name}
//                 href={item.href}
//                 className="text-gray-700 hover:text-amber-600 block px-3 py-2 text-base font-medium"
//               >
//                 {item.name}
//               </a>
//             ))}
            
//             {/* Mobile Categories */}
//             <div className="px-3 py-2">
//               <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
//                 Categories
//               </h3>
//               <div className="grid grid-cols-2 gap-2">
//                 {categories.map((category) => (
//                   <a
//                     key={category}
//                     href="#"
//                     className="text-sm text-gray-600 hover:text-amber-600 block py-1"
//                   >
//                     {category}
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;