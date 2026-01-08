import React, { useState, useEffect, useRef } from 'react';
import { User, Search, Menu, X, Book } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuthenticated, logout } from '../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Navbars() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    checkTokenExp(JSON.parse(localStorage.getItem('user'))?.access_token || null);


    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // 👈 added for mobile

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);


  const checkTokenExp = (token) => {
    if (!token) {
      return;
    }
    const tokenExpiry = getTokenExpiry(token);
    if (tokenExpiry && tokenExpiry < Date.now()) {
      // logout();
      localStorage.removeItem('user');
    }
  }

  const getTokenExpiry = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000; // Convert to milliseconds
    } catch {
      return null;
    }
  };




  // handle logout
  const handleLogout = () => {
    dispatch(logout());
    navigate(import.meta.env.VITE_LOGIN_PAGE);
  }

  // hide navbar in book reading page 
  const location = useLocation();
  const hideFeedbackRoutes = [import.meta.env.VITE_LOGIN_PAGE, import.meta.env.VITE_READ_BOOK_PAGE];

  if (hideFeedbackRoutes.includes(location.pathname)) {
    return null;
  }


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
            <Link to={import.meta.env.VITE_HOME_PAGE} className="hover:text-[#F4B942] transition">Home</Link>
            <Link to={import.meta.env.VITE_BOOKS_PAGE} className="hover:text-[#F4B942] transition">Books</Link>
            {/* <Link to={import.meta.env.VITE_QUIZ_PAGE} className="hover:text-[#F4B942] transition">Quiz</Link> */}
            {/* <Link to={import.meta.env.VITE_LEADERBOARD_PAGE} className="hover:text-[#F4B942] transition">Leaderboard</Link> */}
            <Link to={import.meta.env.VITE_ABOUT_PAGE} className="hover:text-[#F4B942] transition">About</Link>
            <Link to={import.meta.env.VITE_CONTACT_PAGE} className="hover:text-[#F4B942] transition">Contact</Link>
            <Link to={import.meta.env.VITE_SUGGESTIONS_PAGE} className="hover:text-[#F4B942] transition">Suggestion</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 ml-4" ref={menuRef}>
            {/* <button className="relative hover:text-[#F4B942] transition">
              <Link to={import.meta.env.VITE_NOTIFICATION_PAGE}><Bell className="w-6 h-6" /></Link>
              <span className="absolute -top-2 -right-2 bg-[#FF6A3D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
            </button> */}

            <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} className="hover:text-[#F4B942] transition">
              {isAuthenticated ? (!JSON.parse(localStorage.getItem('user')).profile_picture ? <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white  font-bold">
                {JSON.parse(localStorage.getItem('user')).name?.charAt(0).toUpperCase()}
              </div> : <img src={JSON.parse(localStorage.getItem('user')).profile_picture} alt="User" className="w-6 h-6 rounded-full" />) : <User className="w-6 h-6" />}
            </button>

            {/* when user icon clicked */}
            {isUserMenuOpen && (
              <div onClick={() => setIsUserMenuOpen(false)} className="absolute right-0 mt-42 w-48 bg-white rounded-md shadow-lg py-1 z-50">

                <Link to={import.meta.env.VITE_ACCOUNT_PAGE} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  My Account
                </Link>


                <div className="border-t my-1"></div>

                {!isAuthenticated ?
                  (<Link to={`${import.meta.env.VITE_LOGIN_PAGE}`} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign In
                  </Link>)
                  :
                  (<Link to={`${import.meta.env.VITE_LOGIN_PAGE}`} onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    LogOut
                  </Link>)
                }

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
            <Link to={import.meta.env.VITE_HOME_PAGE} className="block hover:text-[#F4B942] transition">Home</Link>
            <Link to={import.meta.env.VITE_BOOKS_PAGE} className="block hover:text-[#F4B942] transition">Books</Link>
            <Link to={import.meta.env.VITE_QUIZ_PAGE} className="block hover:text-[#F4B942] transition">Quiz</Link>
            <Link to={import.meta.env.VITE_LEADERBOARD_PAGE} className="block hover:text-[#F4B942] transition">Leaderboard</Link>
            <Link to={import.meta.env.VITE_ABOUT_PAGE} className="block hover:text-[#F4B942] transition">About</Link>
            <Link to={import.meta.env.VITE_CONTACT_PAGE} className="block hover:text-[#F4B942] transition">Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbars

