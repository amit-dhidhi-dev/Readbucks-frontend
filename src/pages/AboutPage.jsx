
import React from 'react';
import {
  BookOpen,
  Trophy,
  Users,
  Target,
  Star,
  Heart,
  Zap,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useTranslateControl } from '../assets/hooks/useTranslateControl';


const AboutPage = () => {

  useTranslateControl(false);



  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Curated Book Collection',
      description: 'Carefully selected ebooks across multiple genres to kickstart your reading journey'
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Exciting Quiz Competitions',
      description: 'Test your knowledge and win real prize money with our engaging quizzes'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Prize Transfer',
      description: 'Quick and secure prize distribution to our quiz winners'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Growing Community',
      description: 'Join our founding members and be part of something special from the start'
    }
  ];

  const whyJoinNow = [
    {
      title: 'Founding Member Benefits',
      points: [
        'Special lifetime discounts for early users',
        'Direct influence on platform features',
        'Priority customer support',
        'Exclusive early access to new books'
      ]
    },
    {
      title: 'Growth Opportunities',
      points: [
        'Less competition in initial quizzes',
        'Higher chances of winning prizes',
        'Build your reading profile from start',
        'Be part of our success story'
      ]
    }
  ];

  const teamCommitment = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Passionate Team',
      description: 'We are book lovers and tech enthusiasts committed to creating the best reading experience'
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: 'Clear Vision',
      description: 'To make reading interactive, engaging, and rewarding for everyone'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: 'Quality Focus',
      description: 'Every book and quiz is carefully curated to ensure the best experience'
    }
  ];

  return (

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                Brand New Platform - Be a Founding Reader!
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Welcome to <span className="text-blue-600">{import.meta.env.VITE_WEBSITE_NAME}</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                A revolutionary platform where your reading journey meets exciting quiz competitions
                and <span className="text-blue-600 font-semibold">real prize money opportunities</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  The Beginning of Something Amazing
                </h2>
                <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                  <p>
                    <strong>{import.meta.env.VITE_WEBSITE_NAME} is born from a simple belief:</strong> reading should be more than just turning pages.
                    It should be engaging, interactive, and yes - even rewarding!
                  </p>
                  <p>
                    We're starting our journey with a carefully curated collection of books and an innovative
                    quiz system that lets you earn while you learn.
                  </p>
                  <p>
                    As a new platform, we have the flexibility to listen to our users and build exactly what
                    our reading community wants. <span className="text-blue-600 font-semibold">Your feedback will shape our future!</span>
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
                <div className="text-center">
                  <Target className="w-16 h-16 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                  <p className="text-lg opacity-90">
                    To create the most engaging reading platform where knowledge meets opportunity,
                    and every book opens doors to new learning and earning possibilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Makes {import.meta.env.VITE_WEBSITE_NAME} Special?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're building a unique reading experience from the ground up
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Join Now Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Join Us Now?
              </h2>
              <p className="text-xl text-gray-600">
                Be part of our founding community and enjoy exclusive benefits
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {whyJoinNow.map((section, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <span className="text-gray-700">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Start Your Journey in 3 Simple Steps
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Sign Up & Explore</h3>
                <p className="text-gray-600">
                  Create your free account and browse our curated book collection
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Read & Learn</h3>
                <p className="text-gray-600">
                  Dive into interesting books and prepare for the quizzes
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Quiz & Win</h3>
                <p className="text-gray-600">
                  Take quizzes based on books you've read and win prize money
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Commitment Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Commitment to You
              </h2>
              <p className="text-xl text-gray-600">
                We're dedicated to building the best platform for our readers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamCommitment.map((item, index) => (
                <div key={index} className="text-center group hover:transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mx-auto mb-4 group-hover:bg-blue-600 group-hover:text-white">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founding Community CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Join Our Founding Community
              </h2>
              <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
                Be among the first to experience {import.meta.env.VITE_WEBSITE_NAME} and help us shape the future of interactive reading
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-semibold text-lg flex items-center justify-center">
                  Start Reading Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </button>
                <button className="px-8 py-3 border border-white text-white rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200 font-semibold text-lg">
                  Explore First Quizzes
                </button>
              </div>
              <p className="text-sm opacity-80 mt-4">
                No credit card required • Free book samples • Instant quiz access
              </p>
            </div>
          </div>
        </section>

        {/* Future Vision */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Our Vision for the Future
            </h2>
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <p className="text-lg text-gray-600 leading-relaxed">
                "We envision {import.meta.env.VITE_WEBSITE_NAME} becoming the go-to platform for readers who want more from their reading experience.
                In the coming months, we'll be adding more books, introducing advanced quiz formats, and creating
                a vibrant community of readers who learn and earn together.
                <span className="text-blue-600 font-semibold"> And you'll be there from the very beginning.</span>"
              </p>
              <div className="mt-6 text-blue-600 font-semibold">
                — The {import.meta.env.VITE_WEBSITE_NAME} Team
              </div>
            </div>
          </div>
        </section>
      </div>


  );
};

export default AboutPage;