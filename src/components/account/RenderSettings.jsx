import React, { useState } from 'react'
import { LogOut } from 'lucide-react'
import UpgradePlanModal from '../account/UpgradePlanModal';

function RenderSettings({ userData }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>

            <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">Account Settings</h2>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Membership</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                        <div>
                            <p className="text-gray-600">Current Plan: <span className="font-semibold">{userData.membership_tier}</span></p>
                            <p className="text-sm text-gray-500">Member since {new Date(userData.created_at).toLocaleString()} </p>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200 w-full sm:w-auto">
                            Upgrade Plan
                        </button>
                    </div>
                    <UpgradePlanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
                    <div className="space-y-3">
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded text-blue-500" defaultChecked />
                            <span className="ml-2 text-gray-700">Quiz reminders</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded text-blue-500" defaultChecked />
                            <span className="ml-2 text-gray-700">New book releases</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="rounded text-blue-500" />
                            <span className="ml-2 text-gray-700">Promotional emails</span>
                        </label>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Danger Zone</h3>
                    <button className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 flex items-center justify-center space-x-2 w-full sm:w-auto">
                        <LogOut size={16} />
                        <span>Log Out</span>
                    </button>
                </div>
            </div>


        </>
    )
}

export default RenderSettings
