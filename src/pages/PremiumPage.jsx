import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Users, BookOpen,Book, Award,  TrendingUp,  X } from 'lucide-react';
import { FaBookReader, FaTrophy,  FaShieldAlt } from 'react-icons/fa';

const PremiumPage = () => {
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const plans = [
    {
      id: 'free',
      name: 'Free Reader',
      price: '₹0',
      period: 'forever',
      icon: <BookOpen className="text-gray-500" size={24} />,
      popular: false,
      ctaText: 'Continue Free',
      ctaVariant: 'outline',
      features: [
        'Access to 3 free e-books monthly',
        'Basic quiz participation',
        'Standard reading experience',
        'Limited prize money (up to ₹500)',
        'Community support'
      ],
      limitations: [
        'No premium books access',
        'Limited quiz entries',
        'Ads supported',
        'Basic reading features only'
      ]
    },
    {
      id: 'premium',
      name: 'Premium Member',
      price: '₹599',
      period: '/month',
      icon: <Crown className="text-yellow-500" size={24} />,
      popular: true,
      ctaText: 'Start Premium Journey',
      ctaVariant: 'primary',
      features: [
        'Unlimited e-book access',
        'Priority quiz participation',
        'Enhanced reading experience',
        '2x prize money multiplier',
        'Early access to new books',
        'Offline reading',
        'Personalized recommendations',
        'Ad-free experience'
      ],
      bonus: '7-day free trial • Cancel anytime'
    },
    {
      id: 'pro',
      name: 'Pro Scholar',
      price: '₹999',
      period: '/month',
      icon: <Zap className="text-purple-500" size={24} />,
      popular: false,
      ctaText: 'Go Pro & Win Big',
      ctaVariant: 'premium',
      features: [
        'All Premium features',
        '4x prize money multiplier',
        'Exclusive pro-only quizzes',
        'Guaranteed monthly rewards',
        'Dedicated support manager',
        'Advanced analytics',
        'Book download & keep',
        'VIP community access',
        'Monthly cashback rewards'
      ],
      bonus: 'Most profitable for serious readers'
    }
  ];

  const successStories = [
    {
      name: 'Priya Sharma',
      earnings: '₹12,500',
      text: 'Upgraded to Premium and won 3 quizzes in my first month! The unlimited access helped me prepare better.',
      avatar: 'PS'
    },
    {
      name: 'Rahul Verma',
      earnings: '₹45,000',
      text: 'As a Pro member, I earn consistently from quizzes. The 4x multiplier makes a huge difference!',
      avatar: 'RV'
    },
    {
      name: 'Anita Patel',
      earnings: '₹8,700',
      text: 'Best investment for my reading habit. Recovered my subscription cost in the first week itself.',
      avatar: 'AP'
    }
  ];

  const benefits = [
    {
      icon: <FaTrophy className="text-yellow-500 text-2xl" />,
      title: 'Higher Prize Money',
      description: 'Win up to 4x more in every quiz with premium multipliers',
      stats: 'Premium members earn 3.2x more on average'
    },
    {
      icon: <FaBookReader className="text-blue-500 text-2xl" />,
      title: 'Unlimited Access',
      description: 'Read any book in our library without restrictions',
      stats: '10,000+ books available instantly'
    },
    {
      icon: <TrendingUp className="text-green-500 text-2xl" />,
      title: 'Better Winning Chances',
      description: 'Priority entry and exclusive quizzes for paid members',
      stats: '68% higher win rate for Premium members'
    },
    {
      icon: <FaShieldAlt className="text-purple-500 text-2xl" />,
      title: 'Risk-Free Investment',
      description: 'Earn back your subscription through quiz winnings',
      stats: '92% of members recover costs within 2 months'
    }
  ];

  const handleUpgrade = (planId) => {
    // Simulate upgrade process
    setSelectedPlan(planId);
    setShowSuccessModal(true);
  };

  const calculateSavings = (plan) => {
    if (plan.id === 'premium') return 'Save ₹4,800 yearly';
    if (plan.id === 'pro') return 'Save ₹9,000 yearly';
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
             <Book className="w-8 h-8 text-[#F4B942]" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{import.meta.env.VITE_WEBSITE_NAME}</h1>
                <p className="text-gray-600">Read. Win. Grow.</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Current Plan</p>
              <p className="font-semibold text-gray-900">Free Reader</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 text-yellow-800 text-sm font-medium mb-6">
            <Star size={16} className="mr-2" />
            Join 50,000+ Successful Readers Earning Daily
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Turn Your Reading into
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"> Earnings</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Upgrade your membership and unlock exclusive benefits that help you earn more, learn more, and grow more. 
            Our paid members earn <span className="font-semibold text-green-600">3x more prize money</span> on average.
          </p>
          
          {/* Social Proof */}
          <div className="flex justify-center items-center space-x-8 text-sm text-gray-600">
            <div className="flex items-center">
              <Users className="mr-2" size={18} />
              <span>50K+ Active Members</span>
            </div>
            <div className="flex items-center">
              <Award className="mr-2" size={18} />
              <span>₹2.5Cr+ Prize Distributed</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="mr-2" size={18} />
              <span>4.8/5 Member Rating</span>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{benefit.description}</p>
              <p className="text-green-600 text-sm font-medium">{benefit.stats}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Success Path
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the plan that matches your reading goals and earning ambitions. 
              Every paid plan comes with a <span className="font-semibold text-green-600">7-day money-back guarantee</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-8 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white transform scale-105 shadow-2xl'
                    : 'bg-white border border-gray-200 shadow-lg hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full text-sm font-bold flex items-center">
                      <Star size={16} className="mr-2" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-xl ${
                      plan.popular ? 'bg-white bg-opacity-20' : 'bg-gray-100'
                    }`}>
                      {plan.icon}
                    </div>
                  </div>
                  <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={`text-lg ${plan.popular ? 'text-white text-opacity-80' : 'text-gray-600'}`}>
                      {plan.period}
                    </span>
                  </div>
                  {calculateSavings(plan) && (
                    <p className={`text-sm font-medium ${plan.popular ? 'text-yellow-300' : 'text-green-600'}`}>
                      {calculateSavings(plan)}
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check
                        size={20}
                        className={`mr-3 mt-0.5 flex-shrink-0 ${
                          plan.popular ? 'text-white' : 'text-green-500'
                        }`}
                      />
                      <span className={plan.popular ? 'text-white' : 'text-gray-700'}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Limitations for Free Plan */}
                {plan.limitations && (
                  <div className="mb-6 p-4 bg-red-50 rounded-lg">
                    <p className="text-red-800 text-sm font-medium mb-2">Limitations:</p>
                    <ul className="space-y-1">
                      {plan.limitations.map((limitation, index) => (
                        <li key={index} className="text-red-700 text-sm flex items-start">
                          <X size={16} className="mr-2 mt-0.5 flex-shrink-0" />
                          {limitation}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Bonus */}
                {plan.bonus && (
                  <div className="mb-6 p-3 bg-white bg-opacity-20 rounded-lg text-center">
                    <p className="text-sm font-medium">{plan.bonus}</p>
                  </div>
                )}

                {/* CTA Button */}
                <button
                  onClick={() => handleUpgrade(plan.id)}
                  className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                    plan.ctaVariant === 'primary'
                      ? 'bg-white text-purple-600 hover:bg-gray-100 hover:scale-105'
                      : plan.ctaVariant === 'premium'
                      ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 hover:scale-105'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  {plan.ctaText}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-2xl p-8 shadow-lg mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Real Members, Real Earnings
            </h2>
            <p className="text-gray-600">
              See how our members transformed their reading experience into consistent earnings
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {story.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{story.name}</h4>
                    <p className="text-green-600 font-bold">Earned {story.earnings}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{story.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Can I really earn back my subscription?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Yes! 92% of our paid members recover their subscription cost within 2 months through quiz winnings and exclusive rewards.
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h4>
              <p className="text-gray-600 text-sm mb-4">
                All paid plans come with a 7-day free trial. No credit card required for the trial period.
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
              <p className="text-gray-600 text-sm">
                Absolutely! You can cancel your subscription anytime and continue using paid features until the billing period ends.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How does the prize money work?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Premium members get 2x multiplier, Pro members get 4x multiplier on all quiz winnings. Plus exclusive high-value quizzes.
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-2">What if I don't win any quizzes?</h4>
              <p className="text-gray-600 text-sm mb-4">
                Pro members get guaranteed monthly rewards. Plus, unlimited book access itself is worth the subscription for avid readers.
              </p>
              
              <h4 className="font-semibold text-gray-900 mb-2">Are there any hidden fees?</h4>
              <p className="text-gray-600 text-sm">
                No hidden fees. The price you see is what you pay. We're transparent about all costs upfront.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="text-green-600" size={32} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Premium!</h3>
            <p className="text-gray-600 mb-6">
              You've successfully upgraded to {plans.find(p => p.id === selectedPlan)?.name}. 
              Start exploring premium features and boost your earnings immediately!
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition-colors"
            >
              Start Earning Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumPage;