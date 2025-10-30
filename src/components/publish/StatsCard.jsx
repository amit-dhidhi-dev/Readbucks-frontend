// src/components/StatsCard.jsx
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatsCard = ({ title, value, icon: Icon, change, changeType }) => {
  const isPositive = changeType === 'positive';
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <div className={`flex items-center mt-2 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="text-sm font-medium ml-1">{change}%</span>
          </div>
        </div>
        <div className="p-3 bg-primary bg-opacity-10 rounded-lg">
          <Icon size={24} className="text-primary" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;