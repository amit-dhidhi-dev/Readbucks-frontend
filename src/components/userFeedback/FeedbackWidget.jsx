import React, { useState } from 'react';
import { MessageCircle, X, Send, Lightbulb, Bug, Heart, Star, Check } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('suggestion');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: 'suggestion',
      label: 'Suggestion',
      icon: <Lightbulb size={20} />,
      description: 'Share ideas to improve the platform'
    },
    {
      id: 'bug',
      label: 'Bug Report',
      icon: <Bug size={20} />,
      description: 'Report something that\'s not working'
    },
    {
      id: 'appreciation',
      label: 'Appreciation',
      icon: <Heart size={20} />,
      description: 'Share what you love about us'
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      type: feedbackType,
      message,
      rating,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    try {
      // Yahan aap API call karenge
      console.log('Feedback submitted:', feedbackData);
      setSubmitted(true);

      // 3 second baad automatically close ho jaye
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setMessage('');
        setRating(0);
      }, 3000);
    } catch (error) {
      console.error('Feedback submission failed:', error);
    }
  };

  const location = useLocation();
  const hideFeedbackRoutes = [import.meta.env.VITE_LOGIN_PAGE, '/epub'];

  if (hideFeedbackRoutes.includes(location.pathname)) {
    return null;
  }


  return (
    <>
      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 z-40 group"
      >
        <MessageCircle size={24} />
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Share Feedback
        </span>
      </button>

      {/* Feedback Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#00000060] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {!submitted ? (
              <>
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                  <h2 className="text-xl font-bold text-gray-900">Share Your Feedback</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <form onSubmit={handleSubmit} className="p-6">
                  {/* Feedback Type Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      What would you like to share?
                    </label>
                    <div className="grid grid-cols-1 gap-3">
                      {feedbackTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFeedbackType(type.id)}
                          className={`p-4 border-2 rounded-lg text-left transition-all ${feedbackType === type.id
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg mr-3 ${feedbackType === type.id ? 'bg-purple-100' : 'bg-gray-100'
                              }`}>
                              {type.icon}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{type.label}</p>
                              <p className="text-sm text-gray-600">{type.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rating (for appreciation) */}
                  {feedbackType === 'appreciation' && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        How would you rate your experience?
                      </label>
                      <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-2 hover:scale-110 transition-transform"
                          >
                            <Star
                              size={32}
                              className={star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Message Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your {feedbackType === 'bug' ? 'bug report' : feedbackType}
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        feedbackType === 'suggestion'
                          ? 'What improvements would you like to see?'
                          : feedbackType === 'bug'
                            ? 'Please describe the issue you encountered...'
                            : 'What do you love about our platform?'
                      }
                      rows="4"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                      required
                    />
                  </div>

                  {/* Email Optional */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email (optional - for follow up)
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={!message.trim()}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                  >
                    <Send size={18} className="mr-2" />
                    Send Feedback
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-green-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
                <p className="text-gray-600">
                  Your feedback has been received. We appreciate you helping us improve!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackWidget;