// EnhancedLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaSpinner } from 'react-icons/fa';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState({
    google: false,
    facebook: false,
    email: false
  });

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(import.meta.env.VITE_ACCOUNT_PAGE || '/my-account');
      // setIsLogin(true)
    }
  }, [navigate, isAuthenticated])

  const location = useLocation();
  // Get the previous page from state or default to account page
  const from = location.state?.from?.pathname || (import.meta.env.VITE_ACCOUNT_PAGE || '/my-account');



  // Google Login Handler
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(prev => ({ ...prev, google: true }));
        const access_token = tokenResponse.access_token;

        // 🔹 Send token to backend FastAPI
        const res = await axios.post("http://127.0.0.1:8000/auth/google", {
          access_token: access_token,
        });


        // 🔹 Optionally save in Redux or localStorage
        localStorage.setItem("user", JSON.stringify(res.data));

        alert("Login successful!");
        // Optionally navigate to a different page or update UI
        // navigate(import.meta.env.VITE_ACCOUNT_PAGE || '/my-account');
        // 🔹 Navigate back to previous page
        navigate(from, { replace: true });
      } catch (error) {
        // console.error("Google sign in error:", error);

        // 🔍 LOG THE BACKEND ERROR DETAILS
        // if (error.response) {
        //   console.error("Status:", error.response.status);
        //   console.error("Error detail:", error.response.data);
        //   console.error("Headers:", error.response.headers);

        //   // Show the actual backend error
        //   // const errorMsg = error.response.data?.detail || JSON.stringify(error.response.data);
        //   // alert(`Login failed: ${errorMsg}`);
        // } else if (error.request) {
        //   console.error("No response received:", error.request);
        //   alert("No response from server. Please check your connection.");
        // } else {
        //   console.error("Error:", error.message);
        //   alert("Login failed, please try again.");
        // }
      } finally {
        setLoading(prev => ({ ...prev, google: false }));
      }
    },
    onError: () => {
      alert("Google login failed!");
    },
  });


  // facebook login handler

  const [fbLoaded, setFbLoaded] = useState(false);

  useEffect(() => {
    // Check if script is already loaded
    if (window.FB) {
      setFbLoaded(true);
      return;
    }

    // Load Facebook SDK
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: import.meta.env.VITE_FACEBOOK_APP_ID, // Replace with your App ID
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });

      setFbLoaded(true);
      // console.log('Facebook SDK loaded');
    };

    // Load the SDK script if not already present
    if (!document.getElementById('facebook-jssdk')) {
      const script = document.createElement('script');
      script.id = 'facebook-jssdk';
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  const handleFacebookLogin = () => {
    if (!fbLoaded || !window.FB) {
      setLoading(prev => ({ ...prev, facebook: true }));
      alert('Facebook SDK is still loading. Please wait a moment and try again.');
      return;
    }

    window.FB.login(
      function (response) {
        setLoading(prev => ({ ...prev, facebook: true }));
        console.log('Facebook login response:', response);
        if (response.authResponse) {
          const accessToken = response.authResponse.accessToken;
          // console.log("facebook_access_token", accessToken);

          axios.post(`http://localhost:8000/auth/facebook?access_token=${accessToken}`)
            .then(res => {
              // 🔹 Optionally save in Redux or localStorage
              localStorage.setItem("user", JSON.stringify(res.data));
              // navigate(import.meta.env.VITE_ACCOUNT_PAGE || '/my-account');
              // 🔹 Navigate back to previous page
              navigate(from, { replace: true });
              // console.log("User:", res.data);
              // alert(`Welcome ${res.data}`);
            })
            .catch(error => {
              // console.error("Login error:", error);

              // // Log the backend error response
              // if (error.response) {
              //   console.error("Error status:", error.response.status);
              //   console.error("Error data:", error.response.data);
              //   console.error("Error headers:", error.response.headers);

              //   // Show the actual error message from backend
              //   // alert(`Login failed: ${error.response.data.message || JSON.stringify(error.response.data)}`);
              // } else {
              //   // alert('Login failed. Please try again.');
              // }
            });
          setLoading(prev => ({ ...prev, facebook: false }));
        } else {
          alert("Facebook login cancelled.");
           setLoading(prev => ({ ...prev, facebook: false }));
        }
      },
      { scope: "public_profile,email" }

    );
  };



  // handle email form submit
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(prev => ({ ...prev, email: true }));

    // Handle email login/signup logic
    // await new Promise(resolve => setTimeout(resolve, 1500));
    try {
      // console.log("Form data submitted:", form);
      const response = isLogin
        ? await axios.post(`${import.meta.env.VITE_API_BASE_URL}users/login`, form)
        : await axios.post(`${import.meta.env.VITE_API_BASE_URL}users/register`, form);

      localStorage.setItem("user", JSON.stringify(response.data));
      // navigate(import.meta.env.VITE_ACCOUNT_PAGE || '/my-account');
      // 🔹 Navigate back to previous page
      navigate(from, { replace: true });

      setLoading(prev => ({ ...prev, email: false }));
    } catch (error) {
      if (error.response) {
        alert(error.response.data.detail);  // e.g. "User already exists"
        // console.error("Login/Register error:", error);
        setLoading(prev => ({ ...prev, email: false }));
      } else {
        alert("Server connection failed");
        setLoading(prev => ({ ...prev, email: false }));
      }
    }
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
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        {/* Form fields */}
        <form onSubmit={handleEmailSubmit} className="space-y-4">

          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              placeholder="Enter your password"
            />
          </div>

          {/* {isLogin && (
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </a>
            </div>
          )} */}


          <button
            type="submit"
            disabled={loading.email}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading.email && <FaSpinner className="animate-spin" />}
            {loading.email ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {isLogin ? "New to our platform? " : "Already a member? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:text-blue-500 font-semibold"
            >
              {isLogin ? 'Create account' : 'Sign in'}
            </button>
          </p>
        </div>

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