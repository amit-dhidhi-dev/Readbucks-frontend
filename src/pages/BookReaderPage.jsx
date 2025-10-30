
// enhance with translate and audio
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Bookmark, 
  Search, 
  Settings, 
  Moon, 
  Sun,
  ZoomIn,
  ZoomOut,
  BookOpen,
  Award,
  Languages,
  Menu,
  X,
  Volume2,
  Play,
  Pause
} from 'lucide-react';

const EBookReader = () => {
  // State management
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(150);
  const [fontSize, setFontSize] = useState(16);
  const [theme, setTheme] = useState('light');
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [translationLang, setTranslationLang] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechProgress, setSpeechProgress] = useState(0);
  
  const contentRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const speechSynthesisRef = useRef(null);

  // Sample book content in multiple languages
  const bookContent = {
    en: `
      <h1>Chapter 1: The Beginning</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2>The Journey Starts</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
    hi: `
      <h1>अध्याय 1: शुरुआत</h1>
      <p>लोरेम इप्सम दोलोर सित अमेत, consectetur adipiscing एलिट। सेड डो ईयुस्मोद टेम्पोर इन्सिडिदुन्त उत लाबोरे एट दोलोरे मग्ना अलिकुआ। उत एनिम एड मिनिम वेनियम, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>डुइस औते इरुरे दोलोर इन reprehenderit इन वोलुप्टते वेलित एस्से cillum दोलोरे eu fugiat nulla pariatur। Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2>सफर की शुरुआत</h2>
      <p>सेड उत perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
    es: `
      <h1>Capítulo 1: El Comienzo</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2>El Viaje Comienza</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `,
    fr: `
      <h1>Chapitre 1: Le Début</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      <h2>Le Voyage Commence</h2>
      <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
    `
  };

  // Available languages for translation
  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'es', name: 'Spanish', native: 'Español' },
    { code: 'fr', name: 'French', native: 'Français' },
    { code: 'de', name: 'German', native: 'Deutsch' },
    { code: 'ja', name: 'Japanese', native: '日本語' },
    { code: 'zh', name: 'Chinese', native: '中文' },
    { code: 'ar', name: 'Arabic', native: 'العربية' }
  ];

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSpeechProgress(0);
      if (isPlaying) {
        toggleTextToSpeech();
      }
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSpeechProgress(0);
      if (isPlaying) {
        toggleTextToSpeech();
      }
    }
  };

  // Handle font size changes
  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  // Toggle theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Toggle bookmark
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Show/hide controls with timeout
  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Handle touch events for mobile
  const handleTouchStart = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      setShowControls(false);
    }, 3000);
  };

  // Change translation language
  const handleLanguageChange = (langCode) => {
    setIsTranslating(true);
    // Simulate translation delay
    setTimeout(() => {
      setTranslationLang(langCode);
      setIsTranslating(false);
    }, 800);
  };

  // Text-to-speech functionality
  const toggleTextToSpeech = () => {
    if (isPlaying) {
      // Stop speech
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      // Start speech
      const contentText = contentRef.current?.innerText || '';
      const speech = new SpeechSynthesisUtterance(contentText);
      speech.lang = translationLang;
      speech.rate = 0.8;
      
      speech.onend = () => {
        setIsPlaying(false);
        setSpeechProgress(0);
      };
      
      speechSynthesisRef.current = speech;
      window.speechSynthesis.speak(speech);
      setIsPlaying(true);
      
      // Simulate progress (in real app, you'd track actual progress)
      const progressInterval = setInterval(() => {
        setSpeechProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 10;
        });
      }, 1000);
    }
  };

  // Take quiz
  const takeQuiz = () => {
    setShowQuiz(true);
  };

  // Submit quiz
  const submitQuiz = () => {
    const score = Math.floor(Math.random() * 100);
    setQuizScore(score);
    setShowQuiz(false);
    
    if (score >= 80) {
      alert(`Congratulations! You scored ${score}% and are eligible for prize money!`);
    } else {
      alert(`You scored ${score}%. Score 80% or higher to win prize money!`);
    }
  };

  // Clean up
  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div 
      className={`min-h-screen transition-colors duration-300 ${
        theme === 'light' 
          ? 'bg-gray-50 text-gray-800' 
          : 'bg-gray-900 text-gray-200'
      }`}
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
    >
      {/* Header */}
      <header className={`p-4 border-b transition-colors duration-300 ${
        theme === 'light' ? 'bg-white border-gray-200' : 'bg-gray-800 border-gray-700'
      }`}>
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            
            <button className="hidden lg:flex p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Home size={20} />
            </button>
            <h1 className="text-xl font-bold">The Great Novel</h1>
            <span className="hidden sm:inline text-sm text-gray-500 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Text-to-speech button */}
            <button 
              onClick={toggleTextToSpeech}
              className={`p-2 rounded-full transition-colors ${
                isPlaying 
                  ? 'text-green-500 bg-green-100 dark:bg-green-900' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {isPlaying ? <Pause size={18} /> : <Volume2 size={18} />}
            </button>
            
            <button 
              onClick={takeQuiz}
              className="flex items-center space-x-1 px-2 sm:px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
            >
              <Award size={16} />
              <span className="hidden sm:inline">Take Quiz</span>
            </button>
            <button 
              onClick={toggleBookmark}
              className={`p-2 rounded-full transition-colors ${
                isBookmarked 
                  ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900' 
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Progress Bar */}
      <div className="lg:hidden px-4 py-2 border-b transition-colors duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center text-sm mb-1">
          <span>Page {currentPage} of {totalPages}</span>
          <span>{Math.round((currentPage / totalPages) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentPage / totalPages) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Text-to-speech Progress Bar */}
      {isPlaying && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 h-1">
          <div 
            className="bg-green-500 h-1 transition-all duration-300"
            style={{ width: `${speechProgress}%` }}
          ></div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="container mx-auto py-4 lg:py-8 px-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Reading Area */}
          <div className="flex-1">
            <div 
              ref={contentRef}
              className={`p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg transition-colors duration-300 min-h-[60vh] ${
                theme === 'light' ? 'bg-white' : 'bg-gray-800'
              } ${isTranslating ? 'opacity-50' : 'opacity-100'}`}
              style={{ fontSize: `${fontSize}px`, lineHeight: '1.6' }}
            >
              {isTranslating ? (
                <div className="flex justify-center items-center h-40">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <span className="ml-3">Translating...</span>
                </div>
              ) : (
                <div dangerouslySetInnerHTML={{ __html: bookContent[translationLang] || bookContent.en }} />
              )}
            </div>
            
            {/* Page Navigation */}
            <div className="flex justify-between items-center mt-6 lg:mt-8">
              <button 
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  currentPage === 1 
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <ChevronLeft size={18} />
                <span className="hidden sm:inline">Previous</span>
              </button>
              
              {/* Desktop Progress */}
              <div className="hidden lg:flex items-center space-x-4">
                <span className="text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentPage / totalPages) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <button 
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg transition-colors text-sm sm:text-base ${
                  currentPage === totalPages 
                    ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          
          {/* Sidebar with Controls - Desktop */}
          <div className={`lg:w-80 transition-all duration-300 ${
            mobileMenuOpen ? 'block' : 'hidden lg:block'
          }`}>
            <div className={`p-4 sm:p-6 rounded-lg shadow-lg lg:sticky lg:top-8 transition-colors duration-300 ${
              theme === 'light' ? 'bg-white' : 'bg-gray-800'
            }`}>
              {/* Close mobile menu button */}
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h2 className="text-lg font-bold">Reading Settings</h2>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <h2 className="text-lg font-bold mb-4 hidden lg:flex items-center">
                <Settings className="mr-2" size={20} />
                Reading Settings
              </h2>
              
              {/* Translation Section */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Languages className="mr-2" size={16} />
                  Translation
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {languages.slice(0, 4).map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      disabled={isTranslating}
                      className={`p-2 rounded-lg text-xs transition-colors ${
                        translationLang === lang.code
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      } ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
                {/* More languages dropdown for mobile */}
                <details className="mt-2 lg:hidden">
                  <summary className="text-sm text-blue-500 cursor-pointer">More languages</summary>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {languages.slice(4).map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleLanguageChange(lang.code)}
                        disabled={isTranslating}
                        className={`p-2 rounded-lg text-xs transition-colors ${
                          translationLang === lang.code
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                        } ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        {lang.native}
                      </button>
                    ))}
                  </div>
                </details>
              </div>
              
              {/* Font Size Controls */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Font Size</h3>
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={decreaseFontSize}
                    disabled={fontSize <= 12}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    <ZoomOut size={16} />
                  </button>
                  <span className="text-sm w-12 text-center">{fontSize}px</span>
                  <button 
                    onClick={increaseFontSize}
                    disabled={fontSize >= 24}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                  >
                    <ZoomIn size={16} />
                  </button>
                </div>
              </div>
              
              {/* Theme Toggle */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Theme</h3>
                <button 
                  onClick={toggleTheme}
                  className="flex items-center space-x-2 p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors w-full justify-center"
                >
                  {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                  <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                </button>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <h3 className="text-sm font-medium mb-2">Search</h3>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search in book..."
                    className="w-full p-2 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={16} />
                </div>
              </div>
              
              {/* Table of Contents */}
              <div>
                <h3 className="text-sm font-medium mb-2">Table of Contents</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(chapter => (
                    <button
                      key={chapter}
                      className={`block w-full text-left p-2 rounded transition-colors text-sm ${
                        currentPage >= (chapter * 15) && currentPage < ((chapter + 1) * 15)
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                          : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                      onClick={() => {
                        setCurrentPage(chapter * 15);
                        setMobileMenuOpen(false);
                      }}
                    >
                      Chapter {chapter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`p-6 rounded-lg shadow-xl max-w-md w-full mx-4 transition-colors duration-300 ${
            theme === 'light' ? 'bg-white' : 'bg-gray-800'
          }`}>
            <h2 className="text-xl font-bold mb-4">Chapter Quiz</h2>
            <p className="mb-4">Answer these questions based on what you've read to win prize money!</p>
            
            <div className="space-y-4 mb-6">
              <div>
                <p className="font-medium mb-2">1. What is the main theme of this chapter?</p>
                <div className="space-y-2">
                  {['Adventure', 'Romance', 'Mystery', 'Science Fiction'].map(option => (
                    <label key={option} className="flex items-center space-x-2">
                      <input type="radio" name="q1" value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="font-medium mb-2">2. Who is the protagonist in this story?</p>
                <div className="space-y-2">
                  {['John', 'Sarah', 'Michael', 'Emily'].map(option => (
                    <label key={option} className="flex items-center space-x-2">
                      <input type="radio" name="q2" value={option} />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowQuiz(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={submitQuiz}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Submit Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Controls (appear on hover/touch) */}
      <div 
        className={`fixed bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 p-3 rounded-full shadow-lg transition-all duration-300 ${
          showControls 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-10 pointer-events-none'
        } ${
          theme === 'light' ? 'bg-white' : 'bg-gray-800'
        }`}
      >
        <button 
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`p-2 sm:p-3 rounded-full transition-colors ${
            currentPage === 1 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        
        <button 
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 sm:p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors lg:hidden"
        >
          <Settings size={18} />
        </button>
        
        <button 
          onClick={toggleBookmark}
          className={`p-2 sm:p-3 rounded-full transition-colors ${
            isBookmarked 
              ? 'text-yellow-500' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <Bookmark size={18} fill={isBookmarked ? "currentColor" : "none"} />
        </button>
        
        <button 
          onClick={takeQuiz}
          className="p-2 sm:p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <Award size={18} />
        </button>
        
        <button 
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 sm:p-3 rounded-full transition-colors ${
            currentPage === totalPages 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default EBookReader;