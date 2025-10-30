import React, { useState } from 'react';
import { ArrowLeft, Lightbulb, TrendingUp, Users, CheckCircle, Vote, MessageCircle } from 'lucide-react';

const SuggestionsPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: 'Add audio book feature',
      description: 'It would be great to have audio versions of books for listening while commuting',
      category: 'feature',
      votes: 156,
      userVoted: true,
      status: 'under_review',
      comments: 23,
      createdAt: '2024-01-10'
    },
    {
      id: 2,
      title: 'Improve quiz timer design',
      description: 'The quiz timer should be more visible and have color changes as time runs out',
      category: 'ui',
      votes: 89,
      userVoted: false,
      status: 'planned',
      comments: 12,
      createdAt: '2024-01-12'
    },
    {
      id: 3,
      title: 'Add book categories filter',
      description: 'Please add more specific categories and sub-categories for better book discovery',
      category: 'feature',
      votes: 203,
      userVoted: true,
      status: 'completed',
      comments: 45,
      createdAt: '2024-01-05'
    }
  ]);

  const [newSuggestion, setNewSuggestion] = useState({
    title: '',
    description: '',
    category: 'feature'
  });

  const categories = [
    { id: 'feature', label: 'New Feature', color: 'bg-blue-100 text-blue-800' },
    { id: 'ui', label: 'UI/UX Improvement', color: 'bg-purple-100 text-purple-800' },
    { id: 'bug', label: 'Bug Fix', color: 'bg-red-100 text-red-800' },
    { id: 'content', label: 'Content Request', color: 'bg-green-100 text-green-800' }
  ];

  const statuses = {
    under_review: { label: 'Under Review', color: 'bg-yellow-100 text-yellow-800' },
    planned: { label: 'Planned', color: 'bg-blue-100 text-blue-800' },
    in_progress: { label: 'In Progress', color: 'bg-purple-100 text-purple-800' },
    completed: { label: 'Completed', color: 'bg-green-100 text-green-800' },
    declined: { label: 'Declined', color: 'bg-red-100 text-red-800' }
  };

  const handleVote = (suggestionId) => {
    setSuggestions(prev => prev.map(suggestion => {
      if (suggestion.id === suggestionId) {
        const voteChange = suggestion.userVoted ? -1 : 1;
        return {
          ...suggestion,
          votes: suggestion.votes + voteChange,
          userVoted: !suggestion.userVoted
        };
      }
      return suggestion;
    }));
  };

  const handleSubmitSuggestion = (e) => {
    e.preventDefault();
    const suggestion = {
      id: suggestions.length + 1,
      ...newSuggestion,
      votes: 1,
      userVoted: true,
      status: 'under_review',
      comments: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setSuggestions(prev => [suggestion, ...prev]);
    setNewSuggestion({ title: '', description: '', category: 'feature' });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-gray-800 mb-4">
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Suggestions & Feedback</h1>
              <p className="text-gray-600 mt-2">Help us improve by sharing your ideas and voting on others</p>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Users size={16} className="mr-1" />
                <span>1,234 suggestions</span>
              </div>
              <div className="flex items-center">
                <TrendingUp size={16} className="mr-1" />
                <span>89 implemented</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex border-b border-gray-200">
                {['all', 'under_review', 'planned', 'completed'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors capitalize ${
                      activeTab === tab
                        ? 'border-purple-600 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.replace('_', ' ')}
                  </button>
                ))}
              </div>

              {/* Suggestions List */}
              <div className="divide-y divide-gray-200">
                {suggestions
                  .filter(suggestion => activeTab === 'all' || suggestion.status === activeTab)
                  .map(suggestion => (
                    <div key={suggestion.id} className="p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${categories.find(c => c.id === suggestion.category)?.color}`}>
                            {categories.find(c => c.id === suggestion.category)?.label}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${statuses[suggestion.status].color}`}>
                            {statuses[suggestion.status].label}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {suggestion.createdAt}
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {suggestion.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {suggestion.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button
                            onClick={() => handleVote(suggestion.id)}
                            className={`flex items-center space-x-1 ${
                              suggestion.userVoted ? 'text-purple-600' : 'hover:text-gray-700'
                            }`}
                          >
                            <Vote size={16} className={suggestion.userVoted ? 'fill-current' : ''} />
                            <span>{suggestion.votes} votes</span>
                          </button>
                          <span className="flex items-center space-x-1">
                            <MessageCircle size={16} />
                            <span>{suggestion.comments} comments</span>
                          </span>
                        </div>
                        
                        {suggestion.status === 'completed' && (
                          <div className="flex items-center text-green-600 text-sm">
                            <CheckCircle size={16} className="mr-1" />
                            Implemented
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* New Suggestion Form */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Lightbulb size={20} className="mr-2 text-yellow-500" />
                Share Your Idea
              </h3>
              
              <form onSubmit={handleSubmitSuggestion} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Suggestion Title
                  </label>
                  <input
                    type="text"
                    value={newSuggestion.title}
                    onChange={(e) => setNewSuggestion(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Brief description of your idea"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newSuggestion.category}
                    onChange={(e) => setNewSuggestion(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    value={newSuggestion.description}
                    onChange={(e) => setNewSuggestion(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your suggestion in detail. How would it work? Why is it useful?"
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Submit Suggestion
                </button>
              </form>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Community Impact</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Suggestions Implemented</span>
                  <span className="font-semibold text-green-600">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Under Review</span>
                  <span className="font-semibold text-yellow-600">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Planned Features</span>
                  <span className="font-semibold text-blue-600">67</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Total Votes Cast</span>
                  <span className="font-semibold text-purple-600">12,845</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPage;