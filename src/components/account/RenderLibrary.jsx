import React from 'react'
import { Eye, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function RenderLibrary({ purchasedBooks }) {
    const navigate = useNavigate();

    return (
        <>
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
                                    <button onClick={()=> navigate(import.meta.env.VITE_READ_BOOK_PAGE)} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center space-x-2">
                                        <Eye size={16} />
                                        <span>Read</span>
                                    </button>
                                    <button onClick={()=> navigate(import.meta.env.VITE_QUIZ_PAGE)} className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 flex items-center justify-center space-x-2">
                                        <Trophy size={16} />
                                        <span>Take Quiz</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default RenderLibrary
