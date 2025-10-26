// EnhancedLoginPage.jsx
import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaSpinner } from 'react-icons/fa';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState({
    google: false,
    facebook: false,
    email: false
  });

  const handleGoogleLogin = async () => {
    setLoading(prev => ({ ...prev, google: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Your actual Google OAuth implementation
    console.log('Google authentication');
    
    setLoading(prev => ({ ...prev, google: false }));
  };

  const handleFacebookLogin = async () => {
    setLoading(prev => ({ ...prev, facebook: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Your actual Facebook OAuth implementation
    console.log('Facebook authentication');
    
    setLoading(prev => ({ ...prev, facebook: false }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, email: true }));
    
    // Handle email login/signup logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(prev => ({ ...prev, email: false }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">RB</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {isLogin ? 'Welcome ' : 'Join Our Community'}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? 'Access your library, take quizzes, and win prizes!' 
              : 'Start your reading journey and compete for rewards'
            }
          </p>
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleGoogleLogin}
            disabled={loading.google}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading.google ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              <FcGoogle className="text-xl" />
            )}
            <span>
              {loading.google ? 'Connecting...' : (isLogin ? 'Sign in with Google' : 'Sign up with Google')}
            </span>
          </button>

          <button
            onClick={handleFacebookLogin}
            disabled={loading.facebook}
            className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading.facebook ? (
              <FaSpinner className="animate-spin text-xl" />
            ) : (
              <FaFacebook className="text-xl" />
            )}
            <span>
              {loading.facebook ? 'Connecting...' : (isLogin ? 'Sign in with Facebook' : 'Sign up with Facebook')}
            </span>
          </button>
        </div>

        {/* Rest of the component remains similar but with loading states */}
        {/* <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div> */}

          {/* Form fields */}
        {/* <form onSubmit={handleEmailSubmit} className="space-y-4">
          <button
            type="submit"
            disabled={loading.email}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading.email && <FaSpinner className="animate-spin" />}
            {loading.email ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form> */}

        {/* <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "New to our platform? " : "Already a member? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              {isLogin ? 'Create account' : 'Sign in'}
            </button>
          </p>
        </div> */}

        {/* Features */}
        <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Membership Benefits:
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Full access to purchased books
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Participate in exclusive quizzes
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Win cash prizes and rewards
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Track your reading progress
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;