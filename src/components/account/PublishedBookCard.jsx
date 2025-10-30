import React from 'react'
import { Edit3, Trash2, BarChart3, Share2 } from 'lucide-react'


function PublishedBookCard({ book, onEdit, onDelete, handleAnalyticsClick, handlePromoteClick }) {

    const getStatusColor = (status) => {
        return status === 'published'
            ? 'bg-green-100 text-green-800 border-green-200'
            : 'bg-yellow-100 text-yellow-800 border-yellow-200';
    };


 

    return (
        <>        
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
                    <button onClick={handleAnalyticsClick} className="flex-1 flex items-center justify-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
                        <BarChart3 size={16} />
                        <span>Analytics</span>
                    </button>
                    <button onClick={handlePromoteClick} className="flex-1 flex items-center justify-center space-x-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
                        <Share2 size={16} />
                        <span>Promote</span>
                    </button>
                </div>
            </div>

        </>
    )
}

export default PublishedBookCard
