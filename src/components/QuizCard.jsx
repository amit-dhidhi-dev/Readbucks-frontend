import React from 'react'
import { Trophy, Book, Clock, Gift, Users } from 'lucide-react'

function QuizCard({ title, difficulty, questions, time, prize, participants }) {
    return (
        <>
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
        </>
    )
}

export default QuizCard
