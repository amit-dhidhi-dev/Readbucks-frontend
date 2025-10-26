import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Award, 
  TrendingUp, 
  Users, 
  Calendar,
  BookOpen,
  Filter,
  Search,
  Medal,
  ChevronDown,
  ChevronUp,
  Clock,
  Target
} from 'lucide-react';

const LeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rank');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isMobile, setIsMobile] = useState(false);

  // Sample leaderboard data - replace with actual API data
  const sampleData = {
    'all-time': [
      {
        id: 1,
        rank: 1,
        userName: 'BookWorm123',
        score: 950,
        timeTaken: '4:30',
        accuracy: 95,
        quizzesCompleted: 47,
        prizesWon: 12,
        joinDate: '2024-01-15',
        avatar: '👑',
        isCurrentUser: false
      },
      {
        id: 2,
        rank: 2,
        userName: 'ReadMaster',
        score: 920,
        timeTaken: '4:45',
        accuracy: 92,
        quizzesCompleted: 42,
        prizesWon: 8,
        joinDate: '2024-02-10',
        avatar: '🎯',
        isCurrentUser: false
      },
      {
        id: 3,
        rank: 3,
        userName: 'PageTurner',
        score: 890,
        timeTaken: '4:20',
        accuracy: 89,
        quizzesCompleted: 38,
        prizesWon: 6,
        joinDate: '2024-01-28',
        avatar: '📖',
        isCurrentUser: true
      },
      {
        id: 4,
        rank: 4,
        userName: 'LiteraryGenius',
        score: 870,
        timeTaken: '4:55',
        accuracy: 87,
        quizzesCompleted: 35,
        prizesWon: 5,
        joinDate: '2024-03-05',
        avatar: '🌟',
        isCurrentUser: false
      },
      {
        id: 5,
        rank: 5,
        userName: 'QuizChamp',
        score: 850,
        timeTaken: '4:35',
        accuracy: 85,
        quizzesCompleted: 32,
        prizesWon: 4,
        joinDate: '2024-02-20',
        avatar: '🏆',
        isCurrentUser: false
      }
    ],
    'monthly': [
      {
        id: 1,
        rank: 1,
        userName: 'PageTurner',
        score: 890,
        timeTaken: '4:20',
        accuracy: 89,
        quizzesCompleted: 12,
        prizesWon: 3,
        joinDate: '2024-01-28',
        avatar: '📖',
        isCurrentUser: true
      },
      {
        id: 2,
        rank: 2,
        userName: 'BookWorm123',
        score: 870,
        timeTaken: '4:30',
        accuracy: 87,
        quizzesCompleted: 10,
        prizesWon: 2,
        joinDate: '2024-01-15',
        avatar: '👑',
        isCurrentUser: false
      }
    ],
    'weekly': [
      {
        id: 1,
        rank: 1,
        userName: 'PageTurner',
        score: 450,
        timeTaken: '4:20',
        accuracy: 90,
        quizzesCompleted: 5,
        prizesWon: 1,
        joinDate: '2024-01-28',
        avatar: '📖',
        isCurrentUser: true
      },
      {
        id: 2,
        rank: 2,
        userName: 'LiteraryGenius',
        score: 420,
        timeTaken: '4:55',
        accuracy: 84,
        quizzesCompleted: 4,
        prizesWon: 0,
        joinDate: '2024-03-05',
        avatar: '🌟',
        isCurrentUser: false
      }
    ]
  };

  useEffect(() => {
    // Check screen size for mobile
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Simulate API call
    setLeaderboardData(sampleData[timeFilter]);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, [timeFilter]);

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredData = leaderboardData
    .filter(user => 
      user.userName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'userName') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 fill-current" />;
      case 2:
        return <Medal className="w-5 h-5 md:w-6 md:h-6 text-gray-400 fill-current" />;
      case 3:
        return <Medal className="w-5 h-5 md:w-6 md:h-6 text-orange-500 fill-current" />;
      default:
        return <span className="text-sm md:text-lg font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankBadgeColor = (rank) => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-orange-500 text-white';
      case 2:
        return 'from-gray-400 to-gray-600 text-white';
      case 3:
        return 'from-orange-400 to-red-500 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Mobile Card View
  const MobileUserCard = ({ user }) => (
    <div className={`bg-white rounded-xl shadow-md p-4 mb-3 border-l-4 ${
      user.isCurrentUser 
        ? 'border-blue-500 bg-blue-50' 
        : user.rank <= 3 
          ? 'border-yellow-400' 
          : 'border-gray-200'
    }`}>
      {/* Header with Rank and User */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
            user.rank <= 3 ? `bg-gradient-to-r ${getRankBadgeColor(user.rank)}` : 'bg-gray-100'
          }`}>
            {getRankIcon(user.rank)}
          </div>
          <div className="ml-3">
            <div className="flex items-center">
              <span className="font-semibold text-gray-900">{user.userName}</span>
              {user.isCurrentUser && (
                <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                  You
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="font-bold text-gray-900">{user.score}</div>
          <div className="text-xs text-gray-600 flex items-center justify-center">
            <Target className="w-3 h-3 mr-1" />
            Score
          </div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="font-bold text-gray-900">{user.accuracy}%</div>
          <div className="text-xs text-gray-600">Accuracy</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center">
            <BookOpen className="w-3 h-3 mr-1 text-gray-600" />
            <span className="font-bold text-gray-900">{user.quizzesCompleted}</span>
          </div>
          <div className="text-xs text-gray-600">Quizzes</div>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center">
            <Award className="w-3 h-3 mr-1 text-yellow-500" />
            <span className="font-bold text-gray-900">{user.prizesWon}</span>
          </div>
          <div className="text-xs text-gray-600">Prizes</div>
        </div>
      </div>

      {/* Time Taken */}
      <div className="mt-3 flex items-center justify-center text-xs text-gray-500 bg-gray-50 py-2 rounded-lg">
        <Clock className="w-3 h-3 mr-1" />
        Avg. Time: {user.timeTaken}
      </div>
    </div>
  );

  // Desktop Table Row
  const DesktopTableRow = ({ user }) => (
    <div className={`grid grid-cols-12 gap-4 p-4 md:p-6 items-center transition-all ${
      user.isCurrentUser
        ? 'bg-blue-50 border-l-4 border-blue-500'
        : 'hover:bg-gray-50'
    }`}>
      {/* Rank */}
      <div className="col-span-1 flex justify-center">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-bold ${
          user.rank <= 3 ? `bg-gradient-to-r ${getRankBadgeColor(user.rank)}` : ''
        }`}>
          {getRankIcon(user.rank)}
        </div>
      </div>

      {/* User Info */}
      <div className="col-span-4 md:col-span-3">
        <div className="flex items-center">
          <span className="text-2xl mr-3">{user.avatar}</span>
          <div>
            <div className="flex items-center">
              <span className={`font-semibold ${
                user.isCurrentUser ? 'text-blue-600' : 'text-gray-900'
              }`}>
                {user.userName}
              </span>
              {user.isCurrentUser && (
                <span className="ml-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                  You
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-3 h-3 mr-1" />
              Joined {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className="col-span-3 md:col-span-2 text-center">
        <div className="text-lg md:text-2xl font-bold text-gray-900">{user.score}</div>
        <div className="text-xs md:text-sm text-gray-500 flex items-center justify-center">
          <Clock className="w-3 h-3 mr-1" />
          {user.timeTaken}
        </div>
      </div>

      {/* Accuracy */}
      <div className="col-span-2 md:col-span-2 text-center">
        <div className="flex items-center justify-center space-x-1 md:space-x-2">
          <div className="text-lg font-bold text-gray-900">{user.accuracy}%</div>
          <div className={`w-2 h-2 rounded-full ${
            user.accuracy >= 90 ? 'bg-green-500' :
            user.accuracy >= 80 ? 'bg-yellow-500' : 'bg-red-500'
          }`}></div>
        </div>
        <div className="text-xs md:text-sm text-gray-500">Accuracy</div>
      </div>

      {/* Quizzes Completed */}
      <div className="col-span-2 text-center hidden md:block">
        <div className="flex items-center justify-center">
          <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-lg font-semibold text-gray-900">{user.quizzesCompleted}</span>
        </div>
        <div className="text-sm text-gray-500">Completed</div>
      </div>

      {/* Prizes Won */}
      <div className="col-span-2 text-center hidden md:block">
        <div className="flex items-center justify-center">
          <Award className="w-4 h-4 text-yellow-500 mr-2" />
          <span className="text-lg font-semibold text-gray-900">{user.prizesWon}</span>
        </div>
        <div className="text-sm text-gray-500">Prizes</div>
      </div>

      {/* Mobile View Additional Info */}
      <div className="col-span-4 md:hidden text-center">
        <div className="flex justify-center space-x-4">
          <div>
            <BookOpen className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <span className="text-sm font-semibold text-gray-900">{user.quizzesCompleted}</span>
          </div>
          <div>
            <Award className="w-4 h-4 text-yellow-500 mx-auto mb-1" />
            <span className="text-sm font-semibold text-gray-900">{user.prizesWon}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-4 md:py-8 px-3 md:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 md:w-12 md:h-12 text-yellow-500 mr-3 md:mr-4" />
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">Leaderboard</h1>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Compete with readers worldwide and climb to the top! Top performers win exciting prizes.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex items-center">
              <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-500 mr-2 md:mr-3" />
              <div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">1,247</div>
                <div className="text-xs md:text-sm text-gray-600">Total Participants</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex items-center">
              <Award className="w-6 h-6 md:w-8 md:h-8 text-green-500 mr-2 md:mr-3" />
              <div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">₹25,000</div>
                <div className="text-xs md:text-sm text-gray-600">Total Prize Pool</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex items-center">
              <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-purple-500 mr-2 md:mr-3" />
              <div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">156</div>
                <div className="text-xs md:text-sm text-gray-600">Quizzes Completed</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-red-500 mr-2 md:mr-3" />
              <div>
                <div className="text-lg md:text-2xl font-bold text-gray-900">Top 10</div>
                <div className="text-xs md:text-sm text-gray-600">Win Prizes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row gap-4 justify-between items-center">
            {/* Time Filter */}
            <div className="flex items-center space-x-3 w-full md:w-auto">
              <Filter className="w-4 h-4 md:w-5 md:h-5 text-gray-500" />
              <div className="flex bg-gray-100 rounded-lg p-1 flex-1 md:flex-none">
                {['weekly', 'monthly', 'all-time'].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setTimeFilter(filter)}
                    className={`px-3 py-2 text-sm md:px-4 md:py-2 md:text-base rounded-md font-medium capitalize transition-all flex-1 ${
                      timeFilter === filter
                        ? 'bg-white shadow text-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {filter.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 md:w-5 md:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden">
          {/* Desktop Table Header */}
          {!isMobile && (
            <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b border-gray-200 font-semibold text-gray-700">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-3">User</div>
              <div 
                className="col-span-2 text-center cursor-pointer hover:text-blue-600 flex items-center justify-center"
                onClick={() => handleSort('score')}
              >
                Score
                {sortBy === 'score' && (
                  sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </div>
              <div 
                className="col-span-2 text-center cursor-pointer hover:text-blue-600 flex items-center justify-center"
                onClick={() => handleSort('accuracy')}
              >
                Accuracy
                {sortBy === 'accuracy' && (
                  sortOrder === 'asc' ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />
                )}
              </div>
              <div className="col-span-2 text-center">Quizzes</div>
              <div className="col-span-2 text-center">Prizes</div>
            </div>
          )}

          {/* Mobile Header */}
          {isMobile && (
            <div className="md:hidden p-4 bg-gray-50 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 text-center">
                {timeFilter.replace('-', ' ').toUpperCase()} LEADERBOARD
              </h3>
              <p className="text-sm text-gray-500 text-center mt-1">
                {filteredData.length} participants
              </p>
            </div>
          )}

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No users found matching your search.
              </div>
            ) : isMobile ? (
              // Mobile Card View
              filteredData.map((user) => (
                <MobileUserCard key={user.id} user={user} />
              ))
            ) : (
              // Desktop Table View
              filteredData.map((user) => (
                <DesktopTableRow key={user.id} user={user} />
              ))
            )}
          </div>
        </div>

        {/* Current User Stats */}
        {filteredData.find(user => user.isCurrentUser) && (
          <div className="mt-6 md:mt-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
              <div className="mb-3 md:mb-0">
                <h3 className="text-lg md:text-xl font-bold mb-1 md:mb-2">Your Current Standing</h3>
                <p className="text-blue-100 text-sm md:text-base">
                  You are ranked #{filteredData.find(user => user.isCurrentUser).rank} in the {timeFilter} leaderboard
                </p>
              </div>
              <div className="text-center md:text-right">
                <div className="text-2xl md:text-3xl font-bold">
                  #{filteredData.find(user => user.isCurrentUser).rank}
                </div>
                <div className="text-blue-100 text-sm md:text-base">Current Rank</div>
              </div>
            </div>
          </div>
        )}

        {/* Prize Information */}
        <div className="mt-6 md:mt-8 bg-white rounded-xl md:rounded-2xl shadow-lg p-4 md:p-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4 flex items-center justify-center md:justify-start">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-yellow-500 mr-2" />
            Prize Distribution
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {[
              { rank: '1st', prize: '₹10,000', color: 'from-yellow-400 to-orange-500' },
              { rank: '2nd', prize: '₹6,000', color: 'from-gray-400 to-gray-600' },
              { rank: '3rd', prize: '₹4,000', color: 'from-orange-400 to-red-500' },
              { rank: '4th-5th', prize: '₹2,000', color: 'from-blue-400 to-blue-600' },
              { rank: '6th-10th', prize: '₹1,000', color: 'from-green-400 to-green-600' }
            ].map((prize, index) => (
              <div key={index} className="text-center">
                <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-r ${prize.color} flex items-center justify-center text-white font-bold text-xs md:text-sm mx-auto mb-2`}>
                  {prize.rank}
                </div>
                <div className="font-semibold text-gray-900 text-sm md:text-base">{prize.prize}</div>
                <div className="text-xs md:text-sm text-gray-600">Each</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;