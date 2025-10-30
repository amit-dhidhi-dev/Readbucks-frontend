import React, { useState } from 'react';
import {
  User,
  Book,
  Trophy,
  CreditCard,
  Settings,
  LogOut,
  Eye,
  LayoutDashboard,
  Star,
  Calendar,
  Award,
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
  Filter,
  RefreshCw,
  Link,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Copy,
  CheckCircle,
  Eye as EyeIcon,
  Users as UsersIcon,
  TrendingUp as TrendingUpIcon
} from 'lucide-react';
import { FaBookReader, FaMedal, FaCoins } from 'react-icons/fa';
import { useLocation } from "react-router-dom";

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
    }
  ]);

  // Mock analytics data for books
  const generateAnalyticsData = (bookId) => {
    return {
      bookId,
      overview: {
        totalViews: 12500,
        uniqueReaders: 3200,
        completionRate: 68,
        avgReadingTime: '45min',
        shares: 450
      },
      salesData: {
        daily: [65, 59, 80, 81, 56, 55, 40, 45, 60, 75, 80, 90],
        monthly: [245, 189, 210, 195, 230, 245, 260, 240, 255, 270, 285, 300],
        revenue: [735, 472, 630, 585, 690, 735, 780, 720, 765, 810, 855, 900]
      },
      readerDemographics: {
        ageGroups: {
          '18-24': 25,
          '25-34': 45,
          '35-44': 20,
          '45+': 10
        },
        regions: {
          'North America': 40,
          'Europe': 30,
          'Asia': 20,
          'Other': 10
        }
      },
      quizPerformance: {
        participationRate: 72,
        averageScore: 78,
        topScores: [95, 92, 90, 88, 85],
        completionRate: 65
      }
    };
  };

  // Analytics Modal Component
  const AnalyticsModal = ({ book, onClose }) => {
    const analyticsData = generateAnalyticsData(book.id);
    const [timeFrame, setTimeFrame] = useState('monthly');

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Book Analytics</h2>
              <p className="text-gray-600">{book.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Overview Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <EyeIcon size={20} className="text-blue-600" />
                  <span className="text-sm text-blue-600">Views</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData.overview.totalViews.toLocaleString()}
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <UsersIcon size={20} className="text-green-600" />
                  <span className="text-sm text-green-600">Readers</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData.overview.uniqueReaders.toLocaleString()}
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <TrendingUpIcon size={20} className="text-purple-600" />
                  <span className="text-sm text-purple-600">Completion</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData.overview.completionRate}%
                </div>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <DollarSign size={20} className="text-orange-600" />
                  <span className="text-sm text-orange-600">Sales</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">
                  {book.sales}
                </div>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Share2 size={20} className="text-red-600" />
                  <span className="text-sm text-red-600">Shares</span>
                </div>
                <div className="text-2xl font-bold text-gray-900 mt-2">
                  {analyticsData.overview.shares}
                </div>
              </div>
            </div>

            {/* Time Frame Selector */}
            <div className="flex space-x-2">
              {['daily', 'weekly', 'monthly'].map((frame) => (
                <button
                  key={frame}
                  onClick={() => setTimeFrame(frame)}
                  className={`px-4 py-2 rounded-lg capitalize ${
                    timeFrame === frame
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {frame}
                </button>
              ))}
            </div>

            {/* Sales Chart */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Performance</h3>
              <div className="h-64 flex items-end space-x-1">
                {analyticsData.salesData[timeFrame].map((value, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-600 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-700"
                      style={{ height: `${(value / Math.max(...analyticsData.salesData[timeFrame])) * 80}%` }}
                    ></div>
                    <div className="text-xs text-gray-500 mt-2">{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Reader Demographics */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Reader Demographics</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Age Groups</h4>
                    {Object.entries(analyticsData.readerDemographics.ageGroups).map(([age, percent]) => (
                      <div key={age} className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{age}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{percent}%</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Regions</h4>
                    {Object.entries(analyticsData.readerDemographics.regions).map(([region, percent]) => (
                      <div key={region} className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{region}</span>
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${percent}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8 text-right">{percent}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quiz Performance */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quiz Performance</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">
                        {analyticsData.quizPerformance.participationRate}%
                      </div>
                      <div className="text-sm text-blue-600">Participation</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">
                        {analyticsData.quizPerformance.averageScore}%
                      </div>
                      <div className="text-sm text-green-600">Avg Score</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Top Scores</h4>
                    <div className="flex space-x-2">
                      {analyticsData.quizPerformance.topScores.map((score, index) => (
                        <div key={index} className="flex-1 text-center p-2 bg-gray-50 rounded">
                          <div className="font-semibold text-gray-900">{score}%</div>
                          <div className="text-xs text-gray-500">#{index + 1}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="flex justify-end space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Download size={16} />
                <span>Export PDF</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <RefreshCw size={16} />
                <span>Refresh Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Promote Modal Component
  const PromoteModal = ({ book, onClose }) => {
    const shareableLink = `https://bookhub.com/books/${book.id}`;
    const referralCode = `BOOKHUB${book.id}REF`;

    const handleCopyLink = async () => {
      try {
        await navigator.clipboard.writeText(shareableLink);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } catch (err) {
        console.error('Failed to copy link:', err);
      }
    };

    const shareOnSocialMedia = (platform) => {
      const text = `Check out "${book.title}" on BookHub! ${shareableLink}`;
      let url = '';
      
      switch (platform) {
        case 'twitter':
          url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
          break;
        case 'facebook':
          url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableLink)}`;
          break;
        case 'linkedin':
          url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableLink)}`;
          break;
        case 'whatsapp':
          url = `https://wa.me/?text=${encodeURIComponent(text)}`;
          break;
      }
      
      window.open(url, '_blank', 'width=600,height=400');
    };

    const promotionMaterials = [
      {
        title: "Social Media Posts",
        description: "Pre-written posts for different platforms",
        content: [
          `📚 Just published "${book.title}" on BookHub! Check it out and take the quiz to win prizes! ${shareableLink}`,
          `🔥 New book alert! "${book.title}" is now available. Read, take the quiz, and earn rewards! ${shareableLink}`
        ]
      },
      {
        title: "Email Template",
        description: "Template for email marketing",
        content: [
          `Subject: Discover "${book.title}" - New on BookHub!\n\nHi there,\n\nI'm excited to share my new book "${book.title}" is now available on BookHub! Read it, take the quiz, and you could win exciting prizes.\n\nGet your copy here: ${shareableLink}\n\nUse referral code: ${referralCode} for special benefits!\n\nBest regards,\n${userData.name}`
        ]
      },
      {
        title: "Referral Program",
        description: "Share your unique referral code",
        content: [
          `Referral Code: ${referralCode}`,
          `Share this code with friends for special discounts and rewards!`
        ]
      }
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Promote Your Book</h2>
              <p className="text-gray-600">{book.title}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-6">
            {/* Shareable Link */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Shareable Link</h3>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={shareableLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-white"
                />
                <button
                  onClick={handleCopyLink}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  {copiedLink ? <CheckCircle size={16} /> : <Copy size={16} />}
                  <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Quick Share Buttons */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Share on Social Media</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => shareOnSocialMedia('twitter')}
                  className="flex items-center justify-center space-x-2 p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition-colors"
                >
                  <Twitter size={20} />
                  <span>Twitter</span>
                </button>
                <button
                  onClick={() => shareOnSocialMedia('facebook')}
                  className="flex items-center justify-center space-x-2 p-3 bg-[#4267B2] text-white rounded-lg hover:bg-[#365899] transition-colors"
                >
                  <Facebook size={20} />
                  <span>Facebook</span>
                </button>
                <button
                  onClick={() => shareOnSocialMedia('linkedin')}
                  className="flex items-center justify-center space-x-2 p-3 bg-[#0077B5] text-white rounded-lg hover:bg-[#00669c] transition-colors"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </button>
                <button
                  onClick={() => shareOnSocialMedia('whatsapp')}
                  className="flex items-center justify-center space-x-2 p-3 bg-[#25D366] text-white rounded-lg hover:bg-[#20bd59] transition-colors"
                >
                  <MessageCircle size={20} />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>

            {/* Promotion Materials */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800">Promotion Materials</h3>
              {promotionMaterials.map((material, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-1">{material.title}</h4>
                  <p className="text-sm text-gray-600 mb-3">{material.description}</p>
                  <div className="space-y-2">
                    {material.content.map((content, contentIndex) => (
                      <div key={contentIndex} className="relative">
                        <textarea
                          value={content}
                          readOnly
                          rows={content.split('\n').length + 1}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(content)}
                          className="absolute top-2 right-2 p-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Promotion Tips */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h3 className="font-semibold text-yellow-900 mb-2">Promotion Tips</h3>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Share during peak hours (9-11 AM, 7-9 PM)</li>
                <li>• Use relevant hashtags for better reach</li>
                <li>• Engage with readers in the comments</li>
                <li>• Share quiz results and winner announcements</li>
                <li>• Collaborate with other authors for cross-promotion</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handler functions for buttons
  const handleAnalyticsClick = (book) => {
    setSelectedBookForAnalytics(book);
    setShowAnalytics(true);
  };

  const handlePromoteClick = (book) => {
    setSelectedBookForPromotion(book);
    setShowPromoteModal(true);
  };

  // ... (rest of the code remains the same, including BookForm, PublishedBookCard, etc.)

  // Updated PublishedBookCard with button handlers
  const PublishedBookCard = ({ book, onEdit, onDelete }) => {
    const getStatusColor = (status) => {
      return status === 'published' 
        ? 'bg-green-100 text-green-800 border-green-200' 
        : 'bg-yellow-100 text-yellow-800 border-yellow-200';
    };

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div className="text-4xl">{book.cover}</div>
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{book.title}</h3>
              <p className="text-gray-600 text-sm">{book.category}</p>
              <p className="text-xs text-gray-500 mt-1">{book.pages} pages • {book.language}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(book)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Edit3 size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => onDelete(book.id)}
              className="p-2 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 size={16} className="text-red-600" />
            </button>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{book.description}</p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{book.readers}</div>
            <div className="text-xs text-gray-600">Readers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{book.quizParticipants}</div>
            <div className="text-xs text-gray-600">Quiz Participants</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xl font-bold text-gray-900">₹{book.price}</div>
            <div className="text-sm text-gray-600">{book.sales} sales</div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(book.status)}`}>
            {book.status}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div>
            <div className="font-semibold text-gray-900">₹{book.earnings}</div>
            <div className="text-gray-600">Earnings</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900 flex items-center justify-center">
              <span>{book.rating}</span>
              <span className="text-yellow-500 ml-1">★</span>
            </div>
            <div className="text-gray-600">Rating</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">{book.sales}</div>
            <div className="text-gray-600">Sales</div>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <button 
            onClick={() => handleAnalyticsClick(book)}
            className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <BarChart3 size={16} />
            <span>Analytics</span>
          </button>
          <button 
            onClick={() => handlePromoteClick(book)}
            className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Share2 size={16} />
            <span>Promote</span>
          </button>
        </div>
      </div>
    );
  };

  // ... (rest of the component code remains the same)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header and main content */}
        {/* ... (same as before) */}

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
    </div>
  );
};

export default UserAccountPage;