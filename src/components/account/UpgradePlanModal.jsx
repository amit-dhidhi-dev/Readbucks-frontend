import React, { useState } from 'react';
import { X, Check, Star, Crown, Zap, Users } from 'lucide-react';
import { FaBook, FaAward, FaMedal } from 'react-icons/fa';

const UpgradePlanModal = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: '₹299',
      period: '/month',
      icon: <FaBook className="text-blue-500 text-xl" />,
      features: [
        'Access to 5 e-books per month',
        'Basic quiz participation',
        'Standard reading experience'
      ],
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '₹599',
      period: '/month',
      icon: <Crown className="text-yellow-500" />,
      features: [
        'Unlimited e-book access',
        'Priority quiz participation',
        'Enhanced reading experience',
        'Double prize money in quizzes',
        'Early access to new books'
      ],
      popular: true
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '₹999',
      period: '/month',
      icon: <Zap className="text-purple-500" />,
      features: [
        'All Premium features',
        'Personalized book recommendations',
        'Exclusive pro-only quizzes',
        '4x prize money multiplier',
        'Dedicated support',
        'Offline reading'
      ],
      popular: false
    }
  ];

  const handleUpgrade = () => {
    // Handle upgrade logic here
    alert(`Upgrading to ${selectedPlan} plan!`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#00000066]  flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Upgrade Your Reading Experience</h2>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="text-gray-500" size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Unlock Premium Features & Win Big!
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Upgrade your membership to access exclusive books, enhanced reading features, 
              and increase your chances to win exciting prize money in our quizzes!
            </p>
          </div>

          {/* Plan Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <div 
                key={plan.id}
                className={`relative rounded-xl border-2 p-6 transition-all ${
                  selectedPlan === plan.id 
                    ? 'border-purple-500 bg-purple-50 transform scale-105' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-500 text-white text-sm font-medium px-3 py-1 rounded-full flex items-center">
                      <Star size={14} className="mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    {plan.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-800">{plan.name}</h4>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="text-green-500 mt-0.5 mr-2 flex-shrink-0" size={18} />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-lg font-medium transition-colors ${
                    selectedPlan === plan.id
                      ? 'bg-purple-600 text-white hover:bg-purple-700'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                </button>
              </div>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
              Premium Membership Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <FaAward className="text-yellow-500 text-xl mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Higher Prize Money</h4>
                  <p className="text-sm text-gray-600">Win up to 4x more in quizzes</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaBook className="text-blue-500 text-xl mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Unlimited Access</h4>
                  <p className="text-sm text-gray-600">Read all books without restrictions</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaMedal className="text-green-500 text-xl mr-3" />
                <div>
                  <h4 className="font-medium text-gray-800">Exclusive Content</h4>
                  <p className="text-sm text-gray-600">Early access to new releases</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="border-t pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h4 className="font-semibold text-gray-800">
                  Selected: {plans.find(p => p.id === selectedPlan)?.name} Plan
                </h4>
                <p className="text-gray-600">
                  {plans.find(p => p.id === selectedPlan)?.price}
                  {plans.find(p => p.id === selectedPlan)?.period}
                </p>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Maybe Later
                </button>
                <button
                  onClick={handleUpgrade}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-colors shadow-lg flex items-center"
                >
                  <Crown size={18} className="mr-2" />
                  Upgrade Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default UpgradePlanModal;
