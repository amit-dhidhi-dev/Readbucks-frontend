import React, { useState } from 'react';
import { 
  Trophy, 
  Clock, 
  Users, 
  Award, 
  Calendar,
  BookOpen,
  Star,
  Zap,
  TrendingUp,
  Crown,
  Play,
  CheckCircle,
  XCircle,
  ChevronRight,
  Filter,
  Search,
  Eye
} from 'lucide-react';

const QuizContestPage = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample quiz contests data
  const quizContests = {
    live: [
      {
        id: 1,
        title: "The Great Gatsby Master Challenge",
        bookTitle: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        participants: 1247,
        prizePool: 5000,
        duration: "5:00",
        questions: 10,
        difficulty: "Medium",
        entryFee: 0,
        timeLeft: "2:15:30",
        category: "fiction",
        isFeatured: true,
        isPremium: false,
        image: "📚"
      },
      {
        id: 2,
        title: "Shakespeare Sonnets Quiz",
        bookTitle: "Complete Sonnets",
        author: "William Shakespeare",
        participants: 856,
        prizePool: 3000,
        duration: "3:00",
        questions: 8,
        difficulty: "Hard",
        entryFee: 50,
        timeLeft: "1:45:15",
        category: "poetry",
        isFeatured: false,
        isPremium: true,
        image: "🎭"
      },
      {
        id: 3,
        title: "Harry Potter Trivia Championship",
        bookTitle: "Harry Potter Series",
        author: "J.K. Rowling",
        participants: 2156,
        prizePool: 7500,
        duration: "8:00",
        questions: 15,
        difficulty: "Medium",
        entryFee: 0,
        timeLeft: "4:30:45",
        category: "fantasy",
        isFeatured: true,
        isPremium: false,
        image: "⚡"
      }
    ],
    upcoming: [
      {
        id: 4,
        title: "Classic Literature Showdown",
        bookTitle: "Pride and Prejudice",
        author: "Jane Austen",
        participants: 0,
        prizePool: 4000,
        duration: "6:00",
        questions: 12,
        difficulty: "Medium",
        entryFee: 0,
        startsIn: "3:45:00",
        category: "classic",
        isFeatured: true,
        isPremium: false,
        image: "👑"
      },
      {
        id: 5,
        title: "Mystery Masters Contest",
        bookTitle: "Sherlock Holmes Collection",
        author: "Arthur Conan Doyle",
        participants: 0,
        prizePool: 6000,
        duration: "7:00",
        questions: 14,
        difficulty: "Hard",
        entryFee: 100,
        startsIn: "12:30:15",
        category: "mystery",
        isFeatured: false,
        isPremium: true,
        image: "🔍"
      }
    ],
    completed: [
      {
        id: 6,
        title: "Science Fiction Battle",
        bookTitle: "Dune",
        author: "Frank Herbert",
        participants: 1890,
        prizePool: 5500,
        duration: "5:00",
        questions: 10,
        difficulty: "Medium",
        entryFee: 0,
        winners: ["BookWorm123", "ReadMaster", "PageTurner"],
        category: "sci-fi",
        isFeatured: false,
        isPremium: false,
        image: "🚀"
      },
      {
        id: 7,
        title: "Romance Readers Quiz",
        bookTitle: "Pride and Prejudice",
        author: "Jane Austen",
        participants: 945,
        prizePool: 2500,
        duration: "4:00",
        questions: 8,
        difficulty: "Easy",
        entryFee: 0,
        winners: ["LoveReader", "RomanticSoul", "BookLover"],
        category: "romance",
        isFeatured: false,
        isPremium: false,
        image: "❤️"
      }
    ]
  };

  const categories = [
    { id: 'all', name: 'All Categories', icon: '📚' },
    { id: 'fiction', name: 'Fiction', icon: '📖' },
    { id: 'non-fiction', name: 'Non-Fiction', icon: '📊' },
    { id: 'fantasy', name: 'Fantasy', icon: '🐉' },
    { id: 'mystery', name: 'Mystery', icon: '🕵️' },
    { id: 'sci-fi', name: 'Sci-Fi', icon: '🚀' },
    { id: 'classic', name: 'Classic', icon: '🏛️' },
    { id: 'poetry', name: 'Poetry', icon: '✍️' },
    { id: 'romance', name: 'Romance', icon: '❤️' }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredContests = quizContests[activeTab]
    .filter(contest => 
      selectedCategory === 'all' || contest.category === selectedCategory
    )
    .filter(contest =>
      contest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contest.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const ContestCard = ({ contest }) => (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all hover:shadow-xl ${
      contest.isFeatured ? 'border-yellow-400' : 'border-transparent'
    } ${contest.isPremium ? 'ring-2 ring-purple-500' : ''}`}>
      {/* Featured Badge */}
      {contest.isFeatured && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm font-bold py-1 px-4 text-center">
          ⭐ FEATURED CONTEST
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{contest.image}</span>
            <div>
              <h3 className="font-bold text-lg text-gray-900">{contest.title}</h3>
              <p className="text-gray-600 text-sm">
                Based on: <span className="font-semibold">{contest.bookTitle}</span>
              </p>
              <p className="text-gray-500 text-xs">by {contest.author}</p>
            </div>
          </div>
          {contest.isPremium && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold py-1 px-3 rounded-full">
              PREMIUM
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="text-center">
            <Users className="w-5 h-5 text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{contest.participants.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Participants</div>
          </div>
          <div className="text-center">
            <Award className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">₹{contest.prizePool.toLocaleString()}</div>
            <div className="text-xs text-gray-600">Prize Pool</div>
          </div>
          <div className="text-center">
            <Clock className="w-5 h-5 text-green-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{contest.duration}</div>
            <div className="text-xs text-gray-600">Duration</div>
          </div>
          <div className="text-center">
            <BookOpen className="w-5 h-5 text-purple-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-gray-900">{contest.questions}</div>
            <div className="text-xs text-gray-600">Questions</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(contest.difficulty)}`}>
              {contest.difficulty}
            </span>
            {contest.entryFee > 0 ? (
              <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-xs font-semibold">
                Entry Fee: ₹{contest.entryFee}
              </span>
            ) : (
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                FREE ENTRY
              </span>
            )}
          </div>
        </div>

        {/* Time/Winners Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          {activeTab === 'live' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-red-600 font-semibold">
                <Clock className="w-4 h-4 mr-2" />
                Ends in: {contest.timeLeft}
              </div>
              <div className="text-sm text-gray-600">
                Hurry up! Contest ending soon
              </div>
            </div>
          )}
          {activeTab === 'upcoming' && (
            <div className="flex items-center justify-between">
              <div className="flex items-center text-blue-600 font-semibold">
                <Calendar className="w-4 h-4 mr-2" />
                Starts in: {contest.startsIn}
              </div>
              <div className="text-sm text-gray-600">
                Get ready to compete!
              </div>
            </div>
          )}
          {activeTab === 'completed' && (
            <div>
              <div className="flex items-center text-green-600 font-semibold mb-2">
                <Trophy className="w-4 h-4 mr-2" />
                Contest Completed
              </div>
              <div className="text-sm text-gray-600">
                Winners: {contest.winners.slice(0, 3).map((winner, index) => (
                  <span key={index} className="font-semibold">
                    {winner}{index < contest.winners.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          {activeTab === 'live' && (
            <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all flex items-center justify-center">
              <Play className="w-4 h-4 mr-2" />
              Join Now
            </button>
          )}
          {activeTab === 'upcoming' && (
            <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center">
              <Calendar className="w-4 h-4 mr-2" />
              Set Reminder
            </button>
          )}
          {activeTab === 'completed' && (
            <button className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-gray-600 hover:to-gray-700 transition-all flex items-center justify-center">
              <Eye className="w-4 h-4 mr-2" />
              View Results
            </button>
          )}
          <button className="bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Trophy className="w-12 h-12 text-yellow-500 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">Quiz Contests</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compete in exciting book quizzes, win amazing prizes, and prove your literary knowledge!
            Join thousands of readers in daily contests.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <Zap className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Live Contests</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <Award className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">₹85,000</div>
                <div className="text-sm text-gray-600">Total Prize Pool</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">8,456</div>
                <div className="text-sm text-gray-600">Active Participants</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">156</div>
                <div className="text-sm text-gray-600">Contests Completed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          {/* Tabs */}
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { id: 'live', name: 'Live Contests', icon: Zap, count: 12 },
              { id: 'upcoming', name: 'Upcoming', icon: Calendar, count: 8 },
              { id: 'completed', name: 'Completed', icon: CheckCircle, count: 156 }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.name}
                <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600'
                    : 'bg-gray-300 text-gray-700'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col lg:flex-row gap-4 justify-between">
            {/* Category Filter */}
            <div className="flex items-center space-x-4 overflow-x-auto pb-2">
              <Filter className="w-5 h-5 text-gray-500 flex-shrink-0" />
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-300'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-64">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search contests..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Contest Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {filteredContests.length > 0 ? (
            filteredContests.map((contest) => (
              <ContestCard key={contest.id} contest={contest} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📚</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No contests found
              </h3>
              <p className="text-gray-500">
                Try changing your filters or search terms
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-lg p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <Crown className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-blue-200">Weekly Winners</div>
            </div>
            <div>
              <Award className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <div className="text-2xl font-bold">₹2.5L+</div>
              <div className="text-blue-200">Prize Distributed</div>
            </div>
            <div>
              <Star className="w-8 h-8 text-yellow-300 mx-auto mb-3" />
              <div className="text-2xl font-bold">98%</div>
              <div className="text-blue-200">Satisfaction Rate</div>
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            How Quiz Contests Work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: 1,
                title: "Choose a Contest",
                description: "Browse live and upcoming quiz contests based on your favorite books",
                icon: "🎯"
              },
              {
                step: 2,
                title: "Read & Prepare",
                description: "Access the book in your library and prepare for the quiz",
                icon: "📖"
              },
              {
                step: 3,
                title: "Compete & Win",
                description: "Join the quiz, answer questions quickly and accurately to win prizes",
                icon: "🏆"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.icon}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">{step.title}</div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizContestPage;