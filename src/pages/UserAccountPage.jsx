import React, { useState } from 'react';
import {
  User,
  Book,
  Trophy,
  Settings,
  LayoutDashboard,
  Star,
  Calendar,
  Wallet,
  BarChart3,
  Users,
  DollarSign,
  BookOpen,
  TrendingUp,
  Edit3,
  Trash2,
  Plus,
  FileText,
  Download,
  Share2,
  X,
  EyeIcon,
  UsersIcon,
  TrendingUpIcon,
  RefreshCw,
  Copy,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  CheckCircle
} from 'lucide-react';
import { useLocation } from "react-router-dom";
import RenderProfile from '../components/account/renderProfile';
import RenderDashboard from '../components/account/RenderDashboard';
import RenderLibrary from '../components/account/RenderLibrary';
import RenderPublishedBooks from '../components/account/RenderPublishedBooks';
import RenderQuizHistory from '../components/account/RenderQuizHistory';
import RenderWallet from '../components/account/RenderWallet';
import RenderSettings from '../components/account/RenderSettings';
import AnalyticsModal from '../components/account/AnalyticsModal';
import PromoteModal from '../components/account/PromoteModal';
import BookForm from '../components/account/BookForm';

const UserAccountPage = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const Tab = params.get("tab");
  let initialTab = "profile"
  const options = ["profile", "dashboard", "library", "published-books", "quizzes", "wallet", "settings"];
  if (Tab && options.includes(Tab)) {
    initialTab = Tab;
  }
  const [activeTab, setActiveTab] = useState(initialTab);
  const [showBookForm, setShowBookForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [selectedBookForAnalytics, setSelectedBookForAnalytics] = useState(null);
  const [showPromoteModal, setShowPromoteModal] = useState(false);
  const [selectedBookForPromotion, setSelectedBookForPromotion] = useState(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Mock user data
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    membership: 'Premium',
    joinDate: '2024-01-15',
    quizPoints: 1250,
    walletBalance: 2500,
    readingStreak: 15
  });

  // Dashboard stats data
  const dashboardStats = {
    totalBooks: 12,
    totalSales: 2450,
    totalEarnings: 1850.75,
    totalReaders: 1560,
    monthlyGrowth: 15.5,
    activeQuizzes: 8,
    booksRead: 23,
    quizWins: 15
  };

  // Mock published books data
  const [publishedBooks, setPublishedBooks] = useState([
    {
      id: 1,
      title: "The JavaScript Mastery",
      cover: "📘",
      category: "Programming",
      price: 29.99,
      sales: 245,
      earnings: 735.00,
      rating: 4.8,
      status: "published",
      lastUpdated: "2024-01-15",
      readers: 1200,
      quizParticipants: 345,
      pages: 320,
      language: "English",
      description: "A comprehensive guide to mastering JavaScript programming"
    },
    {
      id: 2,
      title: "React Patterns",
      cover: "⚛️",
      category: "Web Development",
      price: 24.99,
      sales: 189,
      earnings: 472.50,
      rating: 4.6,
      status: "published",
      lastUpdated: "2024-01-10",
      readers: 890,
      quizParticipants: 234,
      pages: 280,
      language: "English",
      description: "Advanced React patterns and best practices"
    },
    {
      id: 3,
      title: "AI for Beginners",
      cover: "🤖",
      category: "Artificial Intelligence",
      price: 34.99,
      sales: 156,
      earnings: 545.44,
      rating: 4.9,
      status: "draft",
      lastUpdated: "2024-01-05",
      readers: 670,
      quizParticipants: 189,
      pages: 450,
      language: "English",
      description: "Introduction to Artificial Intelligence concepts"
    }
  ]);


  // Promote Modal Component
  // const PromoteModal = ({ book, onClose }) => {
  //   const shareableLink = `https://bookhub.com/books/${book.id}`;
  //   const referralCode = `BOOKHUB${book.id}REF`;

  //   const handleCopyLink = async () => {
  //     try {
  //       await navigator.clipboard.writeText(shareableLink);
  //       setCopiedLink(true);
  //       setTimeout(() => setCopiedLink(false), 2000);
  //     } catch (err) {
  //       console.error('Failed to copy link:', err);
  //     }
  //   };

  //   const shareOnSocialMedia = (platform) => {
  //     const text = `Check out "${book.title}" on BookHub! ${shareableLink}`;
  //     let url = '';

  //     switch (platform) {
  //       case 'twitter':
  //         url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
  //         break;
  //       case 'facebook':
  //         url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`;
  //         break;
  //       case 'linkedin':
  //         url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`;
  //         break;
  //       case 'whatsapp':
  //         url = `https://wa.me/?text=${encodeURIComponent(text)}`;
  //         break;
  //     }

  //     window.open(url, '_blank', 'width=600,height=400');
  //   };

  //   const promotionMaterials = [
  //     {
  //       title: "Social Media Posts",
  //       description: "Pre-written posts for different platforms",
  //       content: [
  //         `📚 Just published "${book.title}" on BookHub! Check it out and take the quiz to win prizes! ${shareableLink}`,
  //         `🔥 New book alert! "${book.title}" is now available. Read, take the quiz, and earn rewards! ${shareableLink}`
  //       ]
  //     },
  //     {
  //       title: "Email Template",
  //       description: "Template for email marketing",
  //       content: [
  //         `Subject: Discover "${book.title}" - New on BookHub!\n\nHi there,\n\nI'm excited to share my new book "${book.title}" is now available on BookHub! Read it, take the quiz, and you could win exciting prizes.\n\nGet your copy here: ${shareableLink}\n\nUse referral code: ${referralCode} for special benefits!\n\nBest regards,\n${userData.name}`
  //       ]
  //     },
  //     {
  //       title: "Referral Program",
  //       description: "Share your unique referral code",
  //       content: [
  //         `Referral Code: ${referralCode}`,
  //         `Share this code with friends for special discounts and rewards!`
  //       ]
  //     }
  //   ];

  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  //       <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
  //         <div className="flex justify-between items-center p-6 border-b border-gray-200">
  //           <div>
  //             <h2 className="text-xl font-semibold text-gray-900">Promote Your Book</h2>
  //             <p className="text-gray-600">{book.title}</p>
  //           </div>
  //           <button
  //             onClick={onClose}
  //             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
  //           >
  //             <X size={20} />
  //           </button>
  //         </div>

  //         <div className="p-6 space-y-6">
  //           {/* Shareable Link */}
  //           <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
  //             <h3 className="font-semibold text-blue-900 mb-2">Shareable Link</h3>
  //             <div className="flex space-x-2">
  //               <input
  //                 type="text"
  //                 value={shareableLink}
  //                 readOnly
  //                 className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white"
  //               />
  //               <button
  //                 onClick={handleCopyLink}
  //                 className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
  //               >
  //                 {copiedLink ? <CheckCircle size={16} /> : <Copy size={16} />}
  //                 <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
  //               </button>
  //             </div>
  //           </div>

  //           {/* Quick Share Buttons */}
  //           <div>
  //             <h3 className="font-semibold text-gray-800 mb-3">Share on Social Media</h3>
  //             <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
  //               <button
  //                 onClick={() => shareOnSocialMedia('twitter')}
  //                 className="flex items-center justify-center space-x-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
  //               >
  //                 <Twitter size={20} />
  //                 <span>Twitter</span>
  //               </button>
  //               <button
  //                 onClick={() => shareOnSocialMedia('facebook')}
  //                 className="flex items-center justify-center space-x-2 p-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
  //               >
  //                 <Facebook size={20} />
  //                 <span>Facebook</span>
  //               </button>
  //               <button
  //                 onClick={() => shareOnSocialMedia('linkedin')}
  //                 className="flex items-center justify-center space-x-2 p-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#00669c] transition-colors"
  //               >
  //                 <Linkedin size={20} />
  //                 <span>LinkedIn</span>
  //               </button>
  //               <button
  //                 onClick={() => shareOnSocialMedia('whatsapp')}
  //                 className="flex items-center justify-center space-x-2 p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd59] transition-colors"
  //               >
  //                 <MessageCircle size={20} />
  //                 <span>WhatsApp</span>
  //               </button>
  //             </div>
  //           </div>

  //           {/* Promotion Materials */}
  //           <div className="space-y-4">
  //             <h3 className="font-semibold text-gray-800">Promotion Materials</h3>
  //             {promotionMaterials.map((material, index) => (
  //               <div key={index} className="border border-gray-200 rounded-lg p-4">
  //                 <h4 className="font-semibold text-gray-800 mb-1">{material.title}</h4>
  //                 <p className="text-sm text-gray-600 mb-3">{material.description}</p>
  //                 <div className="space-y-2">
  //                   {material.content.map((content, contentIndex) => (
  //                     <div key={contentIndex} className="relative">
  //                       <textarea
  //                         value={content}
  //                         readOnly
  //                         rows={content.split('\n').length + 1}
  //                         className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
  //                       />
  //                       <button
  //                         onClick={() => navigator.clipboard.writeText(content)}
  //                         className="absolute top-2 right-2 p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
  //                       >
  //                         <Copy size={14} />
  //                       </button>
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             ))}
  //           </div>

  //           {/* Promotion Tips */}
  //           <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
  //             <h3 className="font-semibold text-yellow-900 mb-2">Promotion Tips</h3>
  //             <ul className="text-sm text-yellow-800 space-y-1">
  //               <li>• Share during peak hours (9-11 AM, 7-9 PM)</li>
  //               <li>• Use relevant hashtags for better reach</li>
  //               <li>• Engage with readers in the comments</li>
  //               <li>• Share quiz results and winner announcements</li>
  //               <li>• Collaborate with other authors for cross-promotion</li>
  //             </ul>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // Handler functions for buttons
  const handleAnalyticsClick = (book) => {
    setSelectedBookForAnalytics(book);
    setShowAnalytics(true);
  };

  const handlePromoteClick = (book) => {
    setSelectedBookForPromotion(book);
    setShowPromoteModal(true);
  };


  // Mock purchased books
  const purchasedBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      purchaseDate: '2024-01-20',
      progress: 75,
      quizCompleted: true,
      quizScore: 85
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      purchaseDate: '2024-02-05',
      progress: 30,
      quizCompleted: false,
      quizScore: null
    }
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: 'quiz_completed',
      title: 'Completed "The Great Gatsby" quiz',
      points: 50,
      date: '2024-02-10',
      time: '14:30'
    },
    {
      id: 2,
      type: 'book_purchased',
      title: 'Purchased "To Kill a Mockingbird"',
      points: -200,
      date: '2024-02-05',
      time: '10:15'
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'library', label: 'My Library', icon: Book },
    { id: 'published-books', label: 'Published Books', icon: FileText },
    { id: 'quizzes', label: 'Quiz History', icon: Trophy },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  // Book Form Component
  // const BookForm = ({ book, onSave, onClose }) => {
  //   const [formData, setFormData] = useState(book || {
  //     title: '',
  //     category: '',
  //     price: '',
  //     description: '',
  //     pages: '',
  //     language: 'English',
  //     status: 'draft'
  //   });

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     onSave(formData);
  //   };

  //   const handleChange = (e) => {
  //     setFormData({
  //       ...formData,
  //       [e.target.name]: e.target.value
  //     });
  //   };

  //   return (
  //     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
  //       <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
  //         <div className="flex justify-between items-center p-6 border-b border-gray-200">
  //           <h2 className="text-xl font-semibold text-gray-900">
  //             {book ? 'Edit Book' : 'Add New Book'}
  //           </h2>
  //           <button
  //             onClick={onClose}
  //             className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
  //           >
  //             <Trash2 size={20} />
  //           </button>
  //         </div>

  //         <form onSubmit={handleSubmit} className="p-6 space-y-4">
  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Book Title *
  //             </label>
  //             <input
  //               type="text"
  //               name="title"
  //               value={formData.title}
  //               onChange={handleChange}
  //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //               required
  //             />
  //           </div>

  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-2">
  //                 Category *
  //               </label>
  //               <select
  //                 name="category"
  //                 value={formData.category}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                 required
  //               >
  //                 <option value="">Select Category</option>
  //                 <option value="Programming">Programming</option>
  //                 <option value="Web Development">Web Development</option>
  //                 <option value="Artificial Intelligence">Artificial Intelligence</option>
  //                 <option value="Fiction">Fiction</option>
  //                 <option value="Non-Fiction">Non-Fiction</option>
  //               </select>
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-2">
  //                 Price (₹) *
  //               </label>
  //               <input
  //                 type="number"
  //                 name="price"
  //                 value={formData.price}
  //                 onChange={handleChange}
  //                 step="0.01"
  //                 min="0"
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //                 required
  //               />
  //             </div>
  //           </div>

  //           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-2">
  //                 Pages
  //               </label>
  //               <input
  //                 type="number"
  //                 name="pages"
  //                 value={formData.pages}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //               />
  //             </div>

  //             <div>
  //               <label className="block text-sm font-medium text-gray-700 mb-2">
  //                 Language
  //               </label>
  //               <select
  //                 name="language"
  //                 value={formData.language}
  //                 onChange={handleChange}
  //                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //               >
  //                 <option value="English">English</option>
  //                 <option value="Hindi">Hindi</option>
  //                 <option value="Spanish">Spanish</option>
  //                 <option value="French">French</option>
  //               </select>
  //             </div>
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Description
  //             </label>
  //             <textarea
  //               name="description"
  //               value={formData.description}
  //               onChange={handleChange}
  //               rows="4"
  //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //             />
  //           </div>

  //           <div>
  //             <label className="block text-sm font-medium text-gray-700 mb-2">
  //               Status
  //             </label>
  //             <select
  //               name="status"
  //               value={formData.status}
  //               onChange={handleChange}
  //               className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
  //             >
  //               <option value="draft">Draft</option>
  //               <option value="published">Published</option>
  //             </select>
  //           </div>

  //           <div className="flex justify-end space-x-3 pt-4">
  //             <button
  //               type="button"
  //               onClick={onClose}
  //               className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
  //             >
  //               Cancel
  //             </button>
  //             <button
  //               type="submit"
  //               className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
  //             >
  //               <Plus size={16} />
  //               <span>{book ? 'Update Book' : 'Publish Book'}</span>
  //             </button>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   );
  // };

 

  const handleSaveBook = (bookData) => {
    if (editingBook) {
      setPublishedBooks(publishedBooks.map(book =>
        book.id === editingBook.id
          ? { ...book, ...bookData, lastUpdated: new Date().toISOString().split('T')[0] }
          : book
      ));
    } else {
      const newBook = {
        id: publishedBooks.length + 1,
        ...bookData,
        cover: '📚',
        sales: 0,
        earnings: 0,
        rating: 0,
        readers: 0,
        quizParticipants: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setPublishedBooks([...publishedBooks, newBook]);
    }
    setShowBookForm(false);
    setEditingBook(null);
  };


 
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userData.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
              <p className="text-gray-600">{userData.email}</p>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mt-2">
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Calendar size={16} />
                  <span>Joined {userData.joinDate}</span>
                </div>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <Star size={16} />
                  <span>{userData.readingStreak} day streak</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64 bg-white rounded-lg shadow-md p-4 h-fit">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition duration-200 ${activeTab === tab.id
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    <IconComponent size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {activeTab === 'profile' && <RenderProfile userData={userData} setUserData={setUserData} />}
            {activeTab === 'dashboard' && <RenderDashboard recentActivity={recentActivity} purchasedBooks={purchasedBooks} dashboardStats={dashboardStats} />}
            {activeTab === 'library' && <RenderLibrary purchasedBooks={purchasedBooks} />}
            {activeTab === 'published-books' && <RenderPublishedBooks setEditingBook={setEditingBook} setShowBookForm={setShowBookForm} handleAnalyticsClick={handleAnalyticsClick} handlePromoteClick={handlePromoteClick} />}
            {activeTab === 'quizzes' && <RenderQuizHistory />}
            {activeTab === 'wallet' &&  <RenderWallet userData={userData} /> }
            {activeTab === 'settings' && <RenderSettings userData={userData}  />}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAnalytics && selectedBookForAnalytics && (
        <AnalyticsModal
          book={selectedBookForAnalytics}
          onClose={() => {
            setShowAnalytics(false);
            setSelectedBookForAnalytics(null);
          }}
        />
      )}

      {showPromoteModal && selectedBookForPromotion && (
        <PromoteModal
          book={selectedBookForPromotion}
          userData={userData}
          onClose={() => {
            setShowPromoteModal(false);
            setSelectedBookForPromotion(null);
            setCopiedLink(false);
          }}
        />
      )}




      {/* Book Form Modal */}
      {showBookForm && (
        <BookForm
          book={editingBook}
          onSave={handleSaveBook}
          onClose={() => {
            setShowBookForm(false);
            setEditingBook(null);
          }}
        />
      )}
    </div>
  );
};

export default UserAccountPage;