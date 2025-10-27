import React, { useState } from 'react';
import { 
  Bell,
  Check,
  Trash2,
  Settings,
  Filter,
  Book,
  Trophy,
  Wallet,
  Star,
  Clock,
  AlertCircle,
  Info,
  Award,
  ShoppingCart,
  Heart,
  Users,
  Calendar,
  Zap
} from 'lucide-react';
import { FaRupeeSign, FaBookReader, FaMedal } from 'react-icons/fa';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'quiz',
      title: 'Quiz Result: The Great Gatsby',
      message: 'Congratulations! You scored 85% and won ₹500 prize money.',
      timestamp: '2024-02-25T10:30:00',
      isRead: false,
      priority: 'high',
      action: {
        type: 'view_quiz',
        label: 'View Results'
      }
    },
    {
      id: 2,
      type: 'book',
      title: 'New Book Recommendation',
      message: 'Based on your reading history, you might enjoy "Pride and Prejudice"',
      timestamp: '2024-02-25T09:15:00',
      isRead: false,
      priority: 'medium',
      action: {
        type: 'view_book',
        label: 'View Book'
      }
    },
    {
      id: 3,
      type: 'wallet',
      title: 'Prize Money Credited',
      message: '₹1000 has been credited to your wallet from 1984 quiz.',
      timestamp: '2024-02-24T16:45:00',
      isRead: true,
      priority: 'high',
      action: {
        type: 'view_wallet',
        label: 'Check Wallet'
      }
    },
    {
      id: 4,
      type: 'achievement',
      title: 'New Achievement Unlocked!',
      message: 'You have earned the "Book Worm" badge for reading 10 books.',
      timestamp: '2024-02-24T14:20:00',
      isRead: true,
      priority: 'medium',
      action: {
        type: 'view_achievement',
        label: 'See Badge'
      }
    },
    {
      id: 5,
      type: 'system',
      title: 'Weekly Reading Report',
      message: 'You read for 8 hours this week. Keep up the good work!',
      timestamp: '2024-02-24T08:00:00',
      isRead: true,
      priority: 'low',
      action: {
        type: 'view_report',
        label: 'View Report'
      }
    },
    {
      id: 6,
      type: 'promotion',
      title: 'Special Discount Alert!',
      message: 'Get 30% off on classic literature books this weekend.',
      timestamp: '2024-02-23T18:30:00',
      isRead: true,
      priority: 'medium',
      action: {
        type: 'view_offer',
        label: 'Shop Now'
      }
    },
    {
      id: 7,
      type: 'friend',
      title: 'Friend Activity',
      message: 'Sarah just finished reading "To Kill a Mockingbird"',
      timestamp: '2024-02-23T12:15:00',
      isRead: true,
      priority: 'low',
      action: {
        type: 'view_friend',
        label: 'See Profile'
      }
    },
    {
      id: 8,
      type: 'reminder',
      title: 'Quiz Reminder',
      message: 'Don\'t forget to take the quiz for "The Alchemist" to win prizes!',
      timestamp: '2024-02-23T10:00:00',
      isRead: true,
      priority: 'medium',
      action: {
        type: 'take_quiz',
        label: 'Take Quiz'
      }
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter notifications based on selection
  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.isRead;
    return notification.type === filter;
  });

  // Sort notifications
  const sortedNotifications = [...filteredNotifications].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.timestamp) - new Date(a.timestamp);
    } else {
      return new Date(a.timestamp) - new Date(b.timestamp);
    }
  });

  // Mark as read
  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };

  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      isRead: true
    })));
  };

  // Delete notification
  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // Get notification icon based on type
  const getNotificationIcon = (type, priority) => {
    const baseClass = "p-2 rounded-full";
    const priorityClass = {
      high: "bg-red-100 text-red-600",
      medium: "bg-blue-100 text-blue-600",
      low: "bg-gray-100 text-gray-600"
    }[priority];

    const icons = {
      quiz: <Trophy size={20} className={priorityClass ? priorityClass : ''} />,
      book: <Book size={20} className={priorityClass ? priorityClass : ''} />,
      wallet: <Wallet size={20} className={priorityClass ? priorityClass : ''} />,
      achievement: <Award size={20} className={priorityClass ? priorityClass : ''} />,
      system: <Info size={20} className={priorityClass ? priorityClass : ''} />,
      promotion: <Zap size={20} className={priorityClass ? priorityClass : ''} />,
      friend: <Users size={20} className={priorityClass ? priorityClass : ''} />,
      reminder: <Clock size={20} className={priorityClass ? priorityClass : ''} />
    };

    return (
      <div className={`${baseClass} ${priorityClass}`}>
        {icons[type]}
      </div>
    );
  };

  // Get notification type label
  const getTypeLabel = (type) => {
    const labels = {
      quiz: 'Quiz',
      book: 'Book',
      wallet: 'Wallet',
      achievement: 'Achievement',
      system: 'System',
      promotion: 'Promotion',
      friend: 'Social',
      reminder: 'Reminder'
    };
    return labels[type];
  };

  // Handle notification action
  const handleAction = (actionType) => {
    // In a real app, this would navigate to different pages
    switch (actionType) {
      case 'view_quiz':
        alert('Navigating to quiz results...');
        break;
      case 'view_book':
        alert('Navigating to book details...');
        break;
      case 'view_wallet':
        alert('Opening wallet...');
        break;
      case 'view_achievement':
        alert('Showing achievement...');
        break;
      case 'view_report':
        alert('Showing reading report...');
        break;
      case 'view_offer':
        alert('Showing special offers...');
        break;
      case 'view_friend':
        alert('Opening friend profile...');
        break;
      case 'take_quiz':
        alert('Starting quiz...');
        break;
      default:
        break;
    }
  };

  // Stats
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const quizNotifications = notifications.filter(n => n.type === 'quiz').length;
  const prizeNotifications = notifications.filter(n => n.type === 'wallet').length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-lg shadow-md p-3">
              <Bell className="text-blue-600" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Stay updated with your reading journey</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition duration-200 flex items-center space-x-2">
              <Settings size={18} />
              <span>Settings</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Unread</p>
                <p className="text-2xl font-bold text-blue-600">{unreadCount}</p>
              </div>
              <Bell className="text-blue-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Quiz Results</p>
                <p className="text-2xl font-bold text-green-600">{quizNotifications}</p>
              </div>
              <Trophy className="text-green-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Prize Alerts</p>
                <p className="text-2xl font-bold text-yellow-600">{prizeNotifications}</p>
              </div>
              <Wallet className="text-yellow-500" size={24} />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total</p>
                <p className="text-2xl font-bold text-purple-600">{notifications.length}</p>
              </div>
              <Award className="text-purple-500" size={24} />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Filter by</label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Notifications</option>
                  <option value="unread">Unread Only</option>
                  <option value="quiz">Quiz Results</option>
                  <option value="wallet">Prize Money</option>
                  <option value="book">Book Recommendations</option>
                  <option value="achievement">Achievements</option>
                  <option value="promotion">Promotions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 flex items-center space-x-2"
              >
                <Check size={16} />
                <span>Mark All as Read</span>
              </button>

              <button
                onClick={clearAllNotifications}
                disabled={notifications.length === 0}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-200 flex items-center space-x-2"
              >
                <Trash2 size={16} />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {sortedNotifications.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up! New notifications will appear here.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {sortedNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-6 hover:bg-gray-50 transition duration-200 ${
                    !notification.isRead ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    {getNotificationIcon(notification.type, notification.priority)}

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
                              {getTypeLabel(notification.type)}
                            </span>
                            {notification.priority === 'high' && (
                              <span className="inline-block bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-medium">
                                Important
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              {new Date(notification.timestamp).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="text-gray-400 hover:text-green-500 transition duration-200"
                              title="Mark as read"
                            >
                              <Check size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="text-gray-400 hover:text-red-500 transition duration-200"
                            title="Delete notification"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-3">{notification.message}</p>

                      {notification.action && (
                        <button
                          onClick={() => handleAction(notification.action.type)}
                          className="inline-flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 text-sm"
                        >
                          <span>{notification.action.label}</span>
                          <Zap size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Notification Types Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-red-100 rounded-full">
                <Trophy className="text-red-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-800">Quiz Results</h3>
            </div>
            <p className="text-gray-600 text-sm">Get instant updates on your quiz performance and prize winnings</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-100 rounded-full">
                <Wallet className="text-blue-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-800">Prize Money</h3>
            </div>
            <p className="text-gray-600 text-sm">Notifications when prize money is credited to your wallet</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-100 rounded-full">
                <Book className="text-green-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-800">Book Alerts</h3>
            </div>
            <p className="text-gray-600 text-sm">Personalized book recommendations and new releases</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-100 rounded-full">
                <Award className="text-purple-600" size={20} />
              </div>
              <h3 className="font-semibold text-gray-800">Achievements</h3>
            </div>
            <p className="text-gray-600 text-sm">Celebrate your reading milestones and earned badges</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPage;