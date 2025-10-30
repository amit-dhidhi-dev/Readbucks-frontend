import React from 'react'

import { FaCoins } from 'react-icons/fa';
import { CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function RenderWallet({ userData }) {

    const navigate = useNavigate();

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
    return (
        <>

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
                        <button onClick={()=>navigate(import.meta.env.VITE_WITHDRAW_FUNDS_PAGE)} className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition duration-200">
                            Withdraw Funds
                        </button>
                        <button onClick={() => navigate(import.meta.env.VITE_BOOKS_PAGE)} className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-200">
                            Buy More Books
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default RenderWallet
