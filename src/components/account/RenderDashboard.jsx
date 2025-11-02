import React from 'react'
import { BookOpen, DollarSign, Trophy, BarChart3, Users, Wallet, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom';




function RenderDashboard({ dashboardStats, recentActivity, purchasedBooks , setActiveTab }) {
    const navigate = useNavigate();



    const StatsCard = ({ title, value, icon: Icon, change, changeType, color = 'blue' }) => {
        const isPositive = changeType === 'positive';
        const colorClasses = {
          blue: 'from-blue-500 to-blue-600',
          green: 'from-green-500 to-green-600',
          purple: 'from-purple-500 to-purple-600',
          orange: 'from-orange-500 to-orange-600'
        };
    
        return (
          <div className={`bg-gradient-to-r ${colorClasses[color]} rounded-lg p-4 text-white`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">{title}</p>
                <p className="text-2xl font-bold mt-1">{value}</p>
                {change && (
                  <div className={`flex items-center mt-2 text-sm ${isPositive ? 'text-green-200' : 'text-red-200'}`}>
                    <TrendingUp size={14} className={isPositive ? '' : 'rotate-180'} />
                    <span className="ml-1">{change}%</span>
                  </div>
                )}
              </div>
              <div className="p-2 bg-[#ffffff59] bg-opacity-90 rounded-lg">
                <Icon size={24} />             
              </div>
            </div>
          </div>
        );
      };



    return (
        <>

            <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatsCard
                        title="Total Books Read"
                        value={dashboardStats.books_completed || 0}
                        icon={BookOpen}
                        change={12}
                        changeType="positive"
                        color="blue"
                    />
                    <StatsCard
                        title="Quiz Wins"
                        value={dashboardStats.total_quiz_wins || 0}
                        icon={Trophy}
                        change={8}
                        changeType="positive"
                        color="green"
                    />
                    <StatsCard
                        title="Reading Time (mins)"
                        value={dashboardStats.total_reading_time || 0  }
                        icon={BarChart3}
                        change={-2}
                        changeType="negative"
                        color="purple"
                    />
                    <StatsCard
                        title="Total Earnings"
                        value={`₹${dashboardStats.total_prize_money || 0}`}
                        icon={DollarSign}
                        change={15.5}
                        changeType="positive"
                        color="orange"
                    />
                </div>

                {/* Rest of the dashboard content remains the same */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    {/* <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-4 p-3 border border-gray-200 rounded-lg">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.points > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                        }`}>
                                        {activity.points > 0 ? (
                                            <TrendingUp size={20} />
                                        ) : (
                                            <DollarSign size={20} />
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{activity.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {activity.date} at {activity.time}
                                        </p>
                                    </div>
                                    <div className={`text-sm font-semibold ${activity.points > 0 ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {activity.points > 0 ? '+' : ''}{activity.points} pts
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div> */}

                    {/* Reading Progress */}
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Reading Progress</h3>
                        <div className="space-y-4">
                            {purchasedBooks.slice(0, 3).map((book) => (
                                <div key={book.id} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="font-medium text-gray-700">{book.title}</span>
                                        <span className="text-gray-500">{book.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${book.progress === 100 ? 'bg-green-500' :
                                                book.progress > 50 ? 'bg-blue-500' : 'bg-yellow-500'
                                                }`}
                                            style={{ width: `${book.progress}%` }}
                                        ></div>
                                    </div>
                                    <div className="flex justify-between text-xs text-gray-500">
                                        <span>by {book.author}</span>
                                        <span>{book.quizCompleted ? 'Quiz Completed' : 'Quiz Pending'}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <button onClick={()=> setActiveTab('library')} className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition duration-200 flex flex-col items-center space-y-2">
                            <BookOpen className="text-blue-600" size={24} />
                            <span className="text-sm font-medium text-gray-700">Continue Reading</span>
                        </button>
                        <button onClick={()=> navigate(import.meta.env.VITE_QUIZCONTEST_PAGE)} className="p-4 bg-green-50 rounded-lg hover:bg-green-100 transition duration-200 flex flex-col items-center space-y-2">
                            <Trophy className="text-green-600" size={24} />
                            <span className="text-sm font-medium text-gray-700">Take Quiz</span>
                        </button>
                        <button onClick={()=> navigate(import.meta.env.VITE_LEADERBOARD_PAGE)} className="p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition duration-200 flex flex-col items-center space-y-2">
                            <Users className="text-purple-600" size={24} />
                            <span className="text-sm font-medium text-gray-700">Leaderboard</span>
                        </button>
                        <button onClick={()=> navigate(import.meta.env.VITE_WITHDRAW_FUNDS_PAGE)} className="p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition duration-200 flex flex-col items-center space-y-2">
                            <Wallet className="text-orange-600" size={24} />
                            <span className="text-sm font-medium text-gray-700">Withdraw</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RenderDashboard
