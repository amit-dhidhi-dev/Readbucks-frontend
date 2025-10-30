// import React from 'react'
// import { Trophy, Book, Clock, Gift, Users } from 'lucide-react'

// function QuizCard({ title, difficulty, questions, time, prize, participants }) {
//     return (
//         <>
//             <div className="bg-gradient-to-br from-[#FF6A3D] to-[#F4B942] rounded-lg shadow-lg p-6 text-white">
//                 <div className="flex items-center justify-between mb-4">
//                     <h3 className="text-2xl font-bold">{title}</h3>
//                     <Trophy className="w-8 h-8" />
//                 </div>
//                 <div className="space-y-2 mb-4">
//                     <div className="flex items-center">
//                         <span className="bg-white/20 px-3 py-1 rounded-full text-sm">{difficulty}</span>
//                     </div>
//                     <div className="flex items-center space-x-4 text-sm">
//                         <span className="flex items-center"><Book className="w-4 h-4 mr-1" /> {questions} Questions</span>
//                         <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {time}</span>
//                     </div>
//                     <div className="flex items-center space-x-4 text-sm">
//                         <span className="flex items-center"><Gift className="w-4 h-4 mr-1" /> {prize}</span>
//                         <span className="flex items-center"><Users className="w-4 h-4 mr-1" /> {participants} Playing</span>
//                     </div>
//                 </div>
//                 <button className="w-full bg-white text-[#FF6A3D] py-3 rounded-lg font-bold hover:bg-[#1A2238] hover:text-white transition">
//                     Play Now
//                 </button>
//             </div>
//         </>
//     )
// }

// export default QuizCard


import React, { useState } from 'react'
import { Trophy, Book, Clock, Gift, Users, Zap, Crown, Star, AlertTriangle, ChevronRight } from 'lucide-react'

function QuizCard({ 
  title, 
  difficulty, 
  questions, 
  time, 
  prize, 
  participants,
  bookCover = "📚",
  timeLeft = "2h 30m",
  winners = "50+ Winners"
}) {
  const [isHovered, setIsHovered] = useState(false)

  const getDifficultyColor = (diff) => {
    switch(diff.toLowerCase()) {
      case 'easy': return 'from-green-500 to-emerald-400'
      case 'medium': return 'from-yellow-500 to-orange-400'
      case 'hard': return 'from-red-500 to-pink-400'
      case 'expert': return 'from-purple-500 to-indigo-400'
      default: return 'from-blue-500 to-cyan-400'
    }
  }

  const difficultyColor = getDifficultyColor(difficulty)

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#FF6A3D] to-[#F4B942] rounded-2xl shadow-xl transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${
        isHovered ? 'rotate-1 scale-105' : ''
      }`} />
      
      {/* Main Card Content */}
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg transition-all duration-300 group-hover:bg-white/98">
        
        {/* Header Section */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white text-2xl shadow-lg">
              {bookCover}
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-[#FF6A3D] to-[#F4B942] bg-clip-text text-transparent">
                {title}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`bg-gradient-to-r ${difficultyColor} text-white px-3 py-1 rounded-full text-xs font-bold flex items-center shadow-md`}>
                  <Zap className="w-3 h-3 mr-1" />
                  {difficulty}
                </span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center">
                  <Crown className="w-3 h-3 mr-1" />
                  {winners}
                </span>
              </div>
            </div>
          </div>
          
          {/* Trophy with Animation */}
          <div className={`transform transition-all duration-500 ${
            isHovered ? 'scale-110 rotate-12' : 'scale-100'
          }`}>
            <Trophy className="w-10 h-10 text-yellow-500 drop-shadow-lg" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 rounded-xl border border-blue-100">
            <div className="flex items-center text-blue-600 mb-1">
              <Book className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Questions</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{questions}</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 rounded-xl border border-green-100">
            <div className="flex items-center text-green-600 mb-1">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Duration</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{time}</div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-3 rounded-xl border border-amber-100">
            <div className="flex items-center text-amber-600 mb-1">
              <Gift className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Prize Pool</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{prize}</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 rounded-xl border border-purple-100">
            <div className="flex items-center text-purple-600 mb-1">
              <Users className="w-4 h-4 mr-2" />
              <span className="text-sm font-semibold">Players</span>
            </div>
            <div className="text-lg font-bold text-gray-900">{participants}</div>
          </div>
        </div>

        {/* Time Left & Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-1 text-red-500" />
              Ends in: <span className="text-red-500 font-bold ml-1">{timeLeft}</span>
            </span>
            <div className="flex items-center text-yellow-600">
              {[...Array(3)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="text-sm font-bold ml-1">Featured</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-1000 ease-out"
              style={{ width: isHovered ? '85%' : '75%' }}
            />
          </div>
        </div>

        {/* CTA Button */}
        <button className="w-full group relative overflow-hidden bg-gradient-to-r from-[#FF6A3D] to-[#F4B942] text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
          <div className="relative z-10 flex items-center justify-center">
            <span>Play Now & Win</span>
            <ChevronRight className={`w-5 h-5 ml-2 transition-transform duration-300 ${
              isHovered ? 'translate-x-1' : ''
            }`} />
          </div>
          
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F4B942] to-[#FF6A3D] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Shine Effect */}
          <div className="absolute inset-0 -left-full group-hover:left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000" />
        </button>

        {/* Floating Elements */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping opacity-75" />
        <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-orange-400 rounded-full animate-pulse" />
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF6A3D] to-[#F4B942] rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 -z-10" />
    </div>
  )
}

export default QuizCard;