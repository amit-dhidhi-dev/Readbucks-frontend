import React from 'react'
import { Book, Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail } from 'lucide-react'
import { useLocation } from 'react-router-dom';

function Footer() {
  const appName = import.meta.env.VITE_WEBSITE_NAME;

  const location = useLocation();
  const hideFeedbackRoutes = [import.meta.env.VITE_LOGIN_PAGE, '/epub'];

  if (hideFeedbackRoutes.includes(location.pathname)) {
    return null;
  }


  return (
    <>
      <footer className="bg-[#1A2238] text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Book className="w-8 h-8 text-[#F4B942]" />
                <h3 className="text-2xl font-bold">{appName}</h3>
              </div>
              <p className="text-gray-300 mb-4">
                Your one-stop destination for books and interactive quiz contests. Read, Play, and Win!
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-[#F4B942] transition"><Facebook className="w-6 h-6" /></a>
                <a href="#" className="hover:text-[#F4B942] transition"><Instagram className="w-6 h-6" /></a>
                <a href="#" className="hover:text-[#F4B942] transition"><Twitter className="w-6 h-6" /></a>
                <a href="#" className="hover:text-[#F4B942] transition"><Youtube className="w-6 h-6" /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#F4B942]">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href={import.meta.env.VITE_HOME_PAGE} className="text-gray-300 hover:text-[#FF6A3D] transition">Home</a></li>
                <li><a href={import.meta.env.VITE_BOOKS_PAGE} className="text-gray-300 hover:text-[#FF6A3D] transition">Books</a></li>
                <li><a href={import.meta.env.VITE_QUIZCONTEST_PAGE} className="text-gray-300 hover:text-[#FF6A3D] transition">Quiz Contests</a></li>
                <li><a href={import.meta.env.VITE_LEADERBOARD_PAGE} className="text-gray-300 hover:text-[#FF6A3D] transition">Leaderboard</a></li>
                <li><a href={import.meta.env.VITE_ACCOUNT_PAGE} className="text-gray-300 hover:text-[#FF6A3D] transition">My Account</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#F4B942]">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href={import.meta.env.VITE_FAQ_PAGE} className="text-gray-300 hover:text-[#FF6A3D] transition">FAQ</a></li>
                <li><a href={import.meta.env.VITE_PRIVACY_PAGE} className="text-gray-300 hover:text-[#FF6A3D] transition">Privacy Policy</a></li>
                <li><a href={import.meta.env.VITE_TERMS_PAGE} className="text-gray-300 hover:text-[#FF6A3D] transition">Terms & Conditions</a></li>
                {/* <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">Return Policy</a></li> */}
                <li><a href={import.meta.env.VITE_CONTACT_PAGE} className="text-gray-300 hover:text-[#FF6A3D] transition">Contact Us</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-[#F4B942]">Contact Us</h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-[#FF6A3D]" />
                  <span className="text-gray-300"> Raipur, Chhattisgarh, India</span>
                </li>
                <li className="flex items-center">
                  <Phone className="w-5 h-5 mr-2 flex-shrink-0 text-[#FF6A3D]" />
                  <span className="text-gray-300">+91-6260463111</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 mr-2 flex-shrink-0 text-[#FF6A3D]" />
                  <span className="text-gray-300">support@bookquiz.com</span>
                </li>
              </ul>
              <div className="mt-4">
                <p className="text-sm text-gray-400">We accept:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <div className="bg-white px-3 py-1 rounded text-xs text-gray-800 font-semibold">VISA</div>
                  <div className="bg-white px-3 py-1 rounded text-xs text-gray-800 font-semibold">Mastercard</div>
                  <div className="bg-white px-3 py-1 rounded text-xs text-gray-800 font-semibold">UPI</div>
                  <div className="bg-white px-3 py-1 rounded text-xs text-gray-800 font-semibold">Wallets</div>
                  <div className="bg-white px-3 py-1 rounded text-xs text-gray-800 font-semibold">Net Banking</div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Powered by Razorpay</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">© 2025 {appName}. All rights reserved. Made with ❤️ for book lovers.</p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
