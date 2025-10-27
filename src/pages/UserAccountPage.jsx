import React, { useState } from 'react';
import { 
  User, 
  Book, 
  Trophy, 
  CreditCard, 
  Settings, 
  LogOut,
  Eye,
  Download,
  Star,
  Calendar,
  Award,
  Wallet
} from 'lucide-react';
import { FaBookReader, FaMedal, FaCoins } from 'react-icons/fa';

const UserAccountPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
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
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      purchaseDate: '2024-02-15',
      progress: 100,
      quizCompleted: true,
      quizScore: 92
    }
  ];

  // Mock quiz history
  const quizHistory = [
    {
      id: 1,
      bookTitle: 'The Great Gatsby',
      date: '2024-02-10',
      score: 85,
      prize: 500,
      rank: 2
    },
    {
      id: 2,
      bookTitle: '1984',
      date: '2024-02-20',
      score: 92,
      prize: 1000,
      rank: 1
    }
  ];

  // Mock wallet transactions
  const walletTransactions = [
    {
      id: 1,
      type: 'credit',
      amount: 500,
      description: 'Quiz Prize - The Great Gatsby',
      date: '2024-02-10'
    },
    {
      id: 2,
      type: 'credit',
      amount: 1000,
      description: 'Quiz Prize - 1984',
      date: '2024-02-20'
    },
    {
      id: 3,
      type: 'debit',
      amount: 200,
      description: 'Book Purchase - To Kill a Mockingbird',
      date: '2024-02-05'
    }
  ];

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'library', label: 'My Library', icon: Book },
    { id: 'quizzes', label: 'Quiz History', icon: Trophy },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({...userData, name: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={userData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Membership</p>
              <p className="text-2xl font-bold">{userData.membership}</p>
            </div>
            <FaBookReader className="text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Quiz Points</p>
              <p className="text-2xl font-bold">{userData.quizPoints}</p>
            </div>
            <FaMedal className="text-3xl" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Wallet Balance</p>
              <p className="text-2xl font-bold">₹{userData.walletBalance}</p>
            </div>
            <FaCoins className="text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderLibrary = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">My Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {purchasedBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-4">by {book.author}</p>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-medium">{book.progress}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${book.progress}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Quiz Status</span>
                  <span className={`font-medium ${book.quizCompleted ? 'text-green-600' : 'text-yellow-600'}`}>
                    {book.quizCompleted ? `Score: ${book.quizScore}%` : 'Pending'}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2">
                  <Eye size={16} />
                  <span>Read</span>
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 flex items-center justify-center space-x-2">
                  <Trophy size={16} />
                  <span>Take Quiz</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuizHistory = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Quiz History</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {quizHistory.map((quiz) => (
              <tr key={quiz.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{quiz.bookTitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{quiz.date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{quiz.score}%</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Award className={`mr-2 ${quiz.rank === 1 ? 'text-yellow-500' : 'text-gray-400'}`} size={16} />
                    <span className="text-sm text-gray-900">#{quiz.rank}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-green-600">₹{quiz.prize}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Wallet Balance</h2>
        <p className="text-4xl font-bold">₹{userData.walletBalance}</p>
        <p className="text-purple-100 mt-2">Available for withdrawal or book purchases</p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Transaction History</h3>
        <div className="space-y-4">
          {walletTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'}`}>
                  {transaction.type === 'credit' ? (
                    <FaCoins className="text-green-600" />
                  ) : (
                    <CreditCard className="text-red-600" size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{transaction.description}</p>
                  <p className="text-sm text-gray-500">{transaction.date}</p>
                </div>
              </div>
              <div className={`text-lg font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="flex space-x-4">
          <button className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200">
            Withdraw Funds
          </button>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200">
            Buy More Books
          </button>
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Membership</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">Current Plan: <span className="font-semibold">{userData.membership}</span></p>
            <p className="text-sm text-gray-500">Member since {userData.joinDate}</p>
          </div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
            Upgrade Plan
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-500" defaultChecked />
            <span className="ml-2 text-gray-700">Quiz reminders</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-500" defaultChecked />
            <span className="ml-2 text-gray-700">New book releases</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="rounded text-blue-500" />
            <span className="ml-2 text-gray-700">Promotional emails</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Danger Zone</h3>
        <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 flex items-center space-x-2">
          <LogOut size={16} />
          <span>Delete Account</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userData.name.charAt(0)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{userData.name}</h1>
              <p className="text-gray-600">{userData.email}</p>
              <div className="flex items-center space-x-4 mt-2">
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
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-md transition duration-200 ${
                      activeTab === tab.id
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
          <div className="flex-1">
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'library' && renderLibrary()}
            {activeTab === 'quizzes' && renderQuizHistory()}
            {activeTab === 'wallet' && renderWallet()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;