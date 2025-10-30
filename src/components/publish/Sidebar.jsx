// src/components/Sidebar.jsx
import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  BarChart3, 
  Users, 
  Award,
  Settings,
  LogOut,
  Plus
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, onAddBook }) => {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'my-books', icon: BookOpen, label: 'My Books' },
    { id: 'analytics', icon: BarChart3, label: 'Analytics' },
    { id: 'readers', icon: Users, label: 'Readers' },
    { id: 'quiz-winners', icon: Award, label: 'Quiz Winners' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <BookOpen className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">BookHub</h1>
            <p className="text-sm text-gray-600">Author Dashboard</p>
          </div>
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={onAddBook}
          className="w-full flex items-center justify-center space-x-2 bg-primary text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors mb-6"
        >
          <Plus size={20} />
          <span>Add New Book</span>
        </button>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;