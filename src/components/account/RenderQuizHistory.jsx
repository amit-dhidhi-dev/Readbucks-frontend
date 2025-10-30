import React from 'react'
import { Award } from 'lucide-react'


function RenderQuizHistory() {

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


    return (
        <>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Quiz History</h2>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {quizHistory.map((quiz) => (
                                    <tr key={quiz.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{quiz.bookTitle}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">{quiz.date}</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">{quiz.score}%</div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <Award className={`mr-2 ${quiz.rank === 1 ? 'text-yellow-500' : 'text-gray-400'}`} size={16} />
                                                <span className="text-sm text-gray-900">#{quiz.rank}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-green-600">₹{quiz.prize}</div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RenderQuizHistory
