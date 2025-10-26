import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Award, 
  BookOpen, 
  CheckCircle, 
  XCircle, 
  Star,
  Trophy,
  Users,
  Calendar
} from 'lucide-react';

const QuizPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Sample quiz data - replace with actual data from your API
  const quizData = {
    bookTitle: "The Great Gatsby",
    bookAuthor: "F. Scott Fitzgerald",
    questions: [
      {
        id: 1,
        question: "What is the primary setting of The Great Gatsby?",
        options: [
          "New York City",
          "Long Island",
          "Chicago",
          "Los Angeles"
        ],
        correctAnswer: 1
      },
      {
        id: 2,
        question: "What does the green light symbolize in the novel?",
        options: [
          "Wealth and prosperity",
          "Daisy's love and Gatsby's dreams",
          "The American Dream",
          "Jealousy and envy"
        ],
        correctAnswer: 1
      },
      {
        id: 3,
        question: "What is Gatsby's real name?",
        options: [
          "James Gatz",
          "Jay Gold",
          "John Gatsby",
          "Jason Gates"
        ],
        correctAnswer: 0
      },
      {
        id: 4,
        question: "What is Tom Buchanan's background?",
        options: [
          "Self-made millionaire",
          "Old money from a wealthy family",
          "Middle-class businessman",
          "Immigrant entrepreneur"
        ],
        correctAnswer: 1
      },
      {
        id: 5,
        question: "Who is the narrator of the story?",
        options: [
          "Gatsby himself",
          "Tom Buchanan",
          "Nick Carraway",
          "Daisy Buchanan"
        ],
        correctAnswer: 2
      }
    ],
    prizeMoney: 5000,
    totalParticipants: 1247,
    endDate: "2024-12-31"
  };

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      handleQuizCompletion();
    }
  }, [timeLeft, quizCompleted]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === quizData.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      handleQuizCompletion();
    }
  };

  const handleQuizCompletion = () => {
    setQuizCompleted(true);
    setTimeout(() => setShowResults(true), 1000);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setTimeLeft(300);
    setQuizCompleted(false);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Quiz Results
            </h1>
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <BookOpen className="w-5 h-5" />
              <span>{quizData.bookTitle}</span>
              <span>•</span>
              <span>By {quizData.bookAuthor}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-12 h-12 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Congratulations!
              </h2>
              
              <div className="text-5xl font-bold text-gray-900 mb-2">
                {score}/{quizData.questions.length}
              </div>
              
              <div className="text-lg text-gray-600 mb-6">
                You scored {Math.round((score / quizData.questions.length) * 100)}%
              </div>

              {/* Performance Rating */}
              <div className="flex justify-center items-center mb-6">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-6 h-6 ${
                      index < Math.ceil((score / quizData.questions.length) * 5)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Prize Information */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg p-6 mb-6">
                <Award className="w-12 h-12 text-white mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white mb-2">
                  Prize Pool: ₹{quizData.prizeMoney.toLocaleString()}
                </h3>
                <p className="text-white/90">
                  Winners will be announced after the quiz period ends
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <Users className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {quizData.totalParticipants.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Participants</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-gray-900">
                    {new Date(quizData.endDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-600">Ends On</div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    Top 10
                  </div>
                  <div className="text-sm text-gray-600">Will Win Prizes</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestartQuiz}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
                <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  Read Book Again
                </button>
                <button className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors">
                  Browse More Quizzes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Book Quiz Challenge
          </h1>
          <div className="flex items-center justify-center space-x-4 text-gray-600">
            <BookOpen className="w-5 h-5" />
            <span>{quizData.bookTitle}</span>
            <span>•</span>
            <span>By {quizData.bookAuthor}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Quiz Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              {/* Progress and Timer */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {currentQuestion + 1}/{quizData.questions.length}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-lg">
                  <Clock className="w-5 h-5 text-red-500" />
                  <span className="font-mono font-bold text-red-600">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {quizData.questions[currentQuestion].question}
                </h2>
                
                {/* Options */}
                <div className="space-y-4">
                  {quizData.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-50 transform scale-105'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                          selectedAnswer === index
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-400'
                        }`}>
                          {selectedAnswer === index && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          )}
                        </div>
                        <span className="text-lg font-medium text-gray-900">
                          {option}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1)}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-3 rounded-lg font-semibold ${
                    currentQuestion === 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-600 text-white hover:bg-gray-700'
                  }`}
                >
                  Previous
                </button>
                
                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className={`px-8 py-3 rounded-lg font-semibold ${
                    selectedAnswer === null
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {currentQuestion === quizData.questions.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prize Card */}
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl p-6 text-white">
              <div className="flex items-center mb-3">
                <Award className="w-8 h-8 mr-3" />
                <h3 className="text-xl font-bold">Win Prize Money</h3>
              </div>
              <div className="text-3xl font-bold mb-2">
                ₹{quizData.prizeMoney.toLocaleString()}
              </div>
              <p className="text-white/90 text-sm">
                Top performers will share the prize pool
              </p>
            </div>

            {/* Quiz Info */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quiz Information
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Participants</span>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 text-gray-400 mr-1" />
                    <span className="font-semibold">{quizData.totalParticipants.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Questions</span>
                  <span className="font-semibold">{quizData.questions.length}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time Limit</span>
                  <span className="font-semibold">5:00</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ends On</span>
                  <span className="font-semibold">
                    {new Date(quizData.endDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quiz Rules
              </h3>
              
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Complete all questions within time limit</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>No going back after submitting answers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Top 10 participants win prizes</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Ties will be broken by submission time</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;