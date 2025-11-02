
import React from 'react'
import { FaBookReader, FaMedal, FaCoins } from 'react-icons/fa';

function RenderProfile({ userData, setUserData }) {
    return (
        <>
            <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                value={userData.display_name}
                                // onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                value={userData.email}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-100">Membership</p>
                                <p className="text-2xl font-bold">{userData.membership_tier}</p>
                            </div>
                            <FaBookReader className="text-3xl" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-100">Quiz Points</p>
                                <p className="text-2xl font-bold">{userData.quizPoints || 0}</p>
                            </div>
                            <FaMedal className="text-3xl" />
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-purple-100">Wallet Balance</p>
                                <p className="text-2xl font-bold">₹{userData.walletBalance || 0}</p>
                            </div>
                            <FaCoins className="text-3xl" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RenderProfile;
