import React, { useState } from 'react';
import { ShoppingCart, User, Heart, Search, Menu, X, Book, Trophy, Star, Clock, Users, Gift, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

// Navbar Component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
              <h1 className="text-2xl font-bold">BookQuiz</h1>
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
                className="w-full px-4 py-2 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#home" className="hover:text-[#F4B942] transition">Home</a>
            <a href="#books" className="hover:text-[#F4B942] transition">Books</a>
            <a href="#quiz" className="hover:text-[#F4B942] transition">Quiz</a>
            <a href="#leaderboard" className="hover:text-[#F4B942] transition">Leaderboard</a>
            <a href="#about" className="hover:text-[#F4B942] transition">About</a>
            <a href="#contact" className="hover:text-[#F4B942] transition">Contact</a>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="relative hover:text-[#F4B942] transition">
              <Heart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#FF6A3D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            <button className="relative hover:text-[#F4B942] transition">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-[#FF6A3D] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
            </button>
            <button className="hover:text-[#F4B942] transition">
              <User className="w-6 h-6" />
            </button>
            
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
              className="w-full px-4 py-2 pr-10 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF6A3D]"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <a href="#home" className="block hover:text-[#F4B942] transition">Home</a>
            <a href="#books" className="block hover:text-[#F4B942] transition">Books</a>
            <a href="#quiz" className="block hover:text-[#F4B942] transition">Quiz</a>
            <a href="#leaderboard" className="block hover:text-[#F4B942] transition">Leaderboard</a>
            <a href="#about" className="block hover:text-[#F4B942] transition">About</a>
            <a href="#contact" className="block hover:text-[#F4B942] transition">Contact</a>
          </div>
        )}
      </div>
    </nav>
  );
};


const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Biggest Book Sale of the Year!",
      subtitle: "Up to 60% OFF on all categories",
      cta: "Shop Now",
      bg: "bg-gradient-to-r from-[#1A2238] to-[#3D5A80]"
    },
    {
      title: "Play Quiz & Win Amazing Prizes!",
      subtitle: "Earn points with every quiz and get discounts",
      cta: "Play Quiz",
      bg: "bg-gradient-to-r from-[#FF6A3D] to-[#F4B942]"
    },
    {
      title: "New Arrivals - Latest Books",
      subtitle: "Explore trending books this month",
      cta: "Explore",
      bg: "bg-gradient-to-r from-[#06D6A0] to-[#118AB2]"
    }
  ];

  return (
    <div className="relative h-96 overflow-hidden">
      <div className={`${slides[currentSlide].bg} h-full flex items-center justify-center text-white transition-all duration-500`}>
        <div className="text-center px-4">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">{slides[currentSlide].title}</h2>
          <p className="text-xl md:text-2xl mb-8">{slides[currentSlide].subtitle}</p>
          <button className="bg-white text-[#1A2238] px-8 py-3 rounded-full font-bold hover:bg-[#F4B942] hover:text-white transition transform hover:scale-105">
            {slides[currentSlide].cta}
          </button>
        </div>
      </div>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${currentSlide === index ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Book Card Component
const BookCard = ({ title, author, price, originalPrice, rating, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
      <div className="relative">
        <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          <Book className="w-20 h-20 text-gray-400" />
        </div>
        <span className="absolute top-2 right-2 bg-[#FF6A3D] text-white px-3 py-1 rounded-full text-sm font-bold">SALE</span>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 text-[#2D3142] line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-2">{author}</p>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < rating ? 'text-[#F4B942] fill-current' : 'text-gray-300'}`} />
          ))}
          <span className="text-sm text-gray-600 ml-2">({rating}.0)</span>
        </div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-2xl font-bold text-[#FF6A3D]">₹{price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">₹{originalPrice}</span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="flex-1 bg-[#FF6A3D] text-white py-2 rounded-lg hover:bg-[#1A2238] transition font-semibold">
            Add to Cart
          </button>
          <button className="p-2 border-2 border-[#FF6A3D] text-[#FF6A3D] rounded-lg hover:bg-[#FF6A3D] hover:text-white transition">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// Quiz Card Component
const QuizCard = ({ title, difficulty, questions, time, prize, participants }) => {
  return (
    <div className="bg-gradient-to-br from-[#FF6A3D] to-[#F4B942] rounded-lg shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold">{title}</h3>
        <Trophy className="w-8 h-8" />
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center">
          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{difficulty}</span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center"><Book className="w-4 h-4 mr-1" /> {questions} Questions</span>
          <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {time}</span>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center"><Gift className="w-4 h-4 mr-1" /> {prize}</span>
          <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {participants} Playing</span>
        </div>
      </div>
      <button className="w-full bg-white text-[#FF6A3D] py-3 rounded-lg font-bold hover:bg-[#1A2238] hover:text-white transition">
        Play Now
      </button>
    </div>
  );
};

// Home Page Component
const HomePage = () => {
  const featuredBooks = [
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 299, originalPrice: 499, rating: 5 },
    { title: "To Kill a Mockingbird", author: "Harper Lee", price: 349, originalPrice: 599, rating: 5 },
    { title: "1984", author: "George Orwell", price: 399, originalPrice: 699, rating: 4 },
    { title: "Pride and Prejudice", author: "Jane Austen", price: 279, originalPrice: 449, rating: 5 },
  ];

  return (
    <div className="bg-[#F8F9FA]">
      <HeroSection />

      {/* Featured Books Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#1A2238] mb-2">Featured Books</h2>
          <p className="text-gray-600">Bestsellers & Editor's Choice</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book, index) => (
            <BookCard key={index} {...book} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="bg-[#FF6A3D] text-white px-8 py-3 rounded-full font-bold hover:bg-[#1A2238] transition">
            View All Books
          </button>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[#1A2238] mb-2">Today's Quiz Contests</h2>
            <p className="text-gray-600">Play, Learn & Earn Rewards!</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <QuizCard
              title="Daily Literature Quiz"
              difficulty="Medium"
              questions={10}
              time="5 min"
              prize="100 Points"
              participants={234}
            />
            <QuizCard
              title="General Knowledge"
              difficulty="Easy"
              questions={15}
              time="7 min"
              prize="150 Points"
              participants={189}
            />
            <QuizCard
              title="Weekly Mega Contest"
              difficulty="Hard"
              questions={20}
              time="10 min"
              prize="500 Points + Book"
              participants={1520}
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-[#1A2238] mb-2">Shop by Category</h2>
          <p className="text-gray-600">Find your favorite genre</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {['Fiction', 'Non-Fiction', 'Academic', 'Comics', 'Self-Help', 'Children'].map((category) => (
            <div key={category} className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition text-center cursor-pointer group">
              <Book className="w-12 h-12 mx-auto mb-3 text-[#FF6A3D] group-hover:text-[#F4B942] transition" />
              <h3 className="font-bold text-[#1A2238]">{category}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gradient-to-r from-[#1A2238] to-[#3D5A80] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-2">How It Works</h2>
            <p className="text-gray-300">Simple steps to start earning</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#FF6A3D] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-2">Browse & Buy Books</h3>
              <p className="text-gray-300">Explore thousands of books across all genres</p>
            </div>
            <div className="text-center">
              <div className="bg-[#F4B942] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-2">Play Quiz & Earn Points</h3>
              <p className="text-gray-300">Test your knowledge and win exciting rewards</p>
            </div>
            <div className="text-center">
              <div className="bg-[#06D6A0] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-2">Redeem for Discounts</h3>
              <p className="text-gray-300">Use earned points to get amazing discounts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-[#1A2238] mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 mb-6">Get updates on new books, quiz contests & exclusive offers!</p>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-[#FF6A3D]"
              />
              <button className="bg-[#FF6A3D] text-white px-8 py-3 rounded-lg font-bold hover:bg-[#1A2238] transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-[#1A2238] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Book className="w-8 h-8 text-[#F4B942]" />
              <h3 className="text-2xl font-bold">BookQuiz</h3>
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
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">Home</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">Books</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">Quiz Contests</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">Leaderboard</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">My Account</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#F4B942]">Customer Service</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">Return Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#FF6A3D] transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4 text-[#F4B942]">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-[#FF6A3D]" />
                <span className="text-gray-300">123 Book Street, Indore, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-2 flex-shrink-0 text-[#FF6A3D]" />
                <span className="text-gray-300">+91-9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-2 flex-shrink-0 text-[#FF6A3D]" />
                <span className="text-gray-300">support@bookquiz.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <p className="text-sm text-gray-400">We accept:</p>
              <div className="flex space-x-2 mt-2">
                <div className="bg-white px-3 py-1 rounded text-xs text-gray-800 font-semibold">VISA</div>
                <div className="bg-white px-3 py-1 rounded text-xs text-gray-800 font-semibold">UPI</div>
                <div className="bg-white px-3 py-1 rounded text-xs text-gray-800 font-semibold">COD</div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">© 2025 BookQuiz. All rights reserved. Made with ❤️ for book lovers.</p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}