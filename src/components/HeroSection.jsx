import React, { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, ShoppingBag, Star, Award, X, Video, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom';


function HeroSection() {

  const navigate = useNavigate();

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showDemo, setShowDemo] = useState(false);
  const [demoContent, setDemoContent] = useState(null);

  const slides = [
    {
      title: "Read Books. Win Cash Prizes!",
      subtitle: "Buy any book & participate in exclusive quizzes to win real money",
      cta: "Shop Books",
      bg: "bg-gradient-to-r from-[#1A2238] to-[#3D5A80]",
      icon: <ShoppingBag className="w-8 h-8" />,
      image: "📚",
      badge: "BESTSELLERS",
      url: import.meta.env.VITE_BOOKS_PAGE,
      demo: {
        title: "How to Earn from Reading",
        steps: [
          {
            icon: "📚",
            title: "Browse & Buy Book",
            description: "Choose from 5000+ books across all genres"
          },
          {
            icon: "🎯",
            title: "Unlock Exclusive Quiz",
            description: "Get automatic access to book-specific quiz after purchase"
          },
          {
            icon: "🧠",
            title: "Test Your Knowledge",
            description: "Answer questions based on the book you just read"
          },
          {
            icon: "💰",
            title: "Win Cash Prizes",
            description: "Top performers get real money rewards instantly"
          }
        ],
        video: "/demos/book-to-quiz-flow.mp4",
        features: [
          "Instant quiz access after purchase",
          "Multiple difficulty levels",
          "Real-time leaderboard",
          "Instant prize distribution"
        ]
      }
    },
    {
      title: "Play Quiz & Win Up to ₹10,000!",
      subtitle: "Test your knowledge and earn amazing rewards with every book purchase",
      cta: "Play Quiz",
      bg: "bg-gradient-to-r from-[#FF6A3D] to-[#F4B942]",
      icon: <Award className="w-8 h-8" />,
      image: "🏆",
      badge: "HOT CONTESTS",
      url: import.meta.env.VITE_QUIZCONTEST_PAGE,
      demo: {
        title: "Quiz Contest Experience",
        steps: [
          {
            icon: "🏆",
            title: "Join Contest",
            description: "Enter free or paid quiz contests with big prize pools"
          },
          {
            icon: "⏱️",
            title: "Real-time Challenge",
            description: "Answer questions against the clock with live competitors"
          },
          {
            icon: "📊",
            title: "Live Leaderboard",
            description: "Watch your ranking change in real-time during the quiz"
          },
          {
            icon: "🎉",
            title: "Claim Your Winnings",
            description: "Get prize money transferred to your wallet instantly"
          }
        ],
        video: "/demos/quiz-gameplay.mp4",
        features: [
          "Live competition with other readers",
          "Time-based challenges",
          "Multiple prize categories",
          "Instant wallet transfer"
        ]
      }
    },
    {
      title: "Premium Membership Benefits",
      subtitle: "Unlimited reading access + Higher prize pools + Exclusive content",
      cta: "Learn More",
      bg: "bg-gradient-to-r from-[#06D6A0] to-[#118AB2]",
      icon: <Star className="w-8 h-8" />,
      image: "👑",
      badge: "PREMIUM",
      url: import.meta.env.VITE_PREMIUM_PAGE,
      demo: {
        title: "Premium Member Advantages",
        steps: [
          {
            icon: "👑",
            title: "Unlimited Access",
            description: "Read any book in our library without additional costs"
          },
          {
            icon: "💰",
            title: "Higher Prize Pools",
            description: "Access exclusive quizzes with bigger cash rewards"
          },
          {
            icon: "⚡",
            title: "Early Access",
            description: "Get new books and quizzes before regular members"
          },
          {
            icon: "🎁",
            title: "Extra Benefits",
            description: "Personalized recommendations & dedicated support"
          }
        ],
        video: "/demos/premium-features.mp4",
        features: [
          "No additional book purchase costs",
          "Premium-only quiz contests",
          "Ad-free reading experience",
          "Priority customer support"
        ]
      }
    }
  ];

  // Handle demo click
  const handleDemoClick = () => {
    console.log('watch demo clicked for slide:', currentSlide);
    setDemoContent(slides[currentSlide].demo);
    setShowDemo(true);
    setIsAutoPlaying(false);
  };

  // Demo Modal Component
  const DemoModal = () => {
    if (!showDemo || !demoContent) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <Video className="w-6 h-6 text-[#FF6A3D]" />
              <h2 className="text-2xl font-bold text-gray-900">{demoContent.title}</h2>
            </div>
            <button
              onClick={() => setShowDemo(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Video Placeholder */}
            <div className="bg-gray-200 rounded-xl h-64 mb-6 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 text-[#FF6A3D] mx-auto mb-4" />
                <p className="text-gray-600">Demo video playing...</p>
              </div>
            </div>

            {/* Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {demoContent.steps.map((step, index) => (
                <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl">{step.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="bg-gradient-to-r from-[#1A2238] to-[#3D5A80] rounded-xl p-6 text-white">
              <h3 className="font-bold text-lg mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {demoContent.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-[#06D6A0]" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 mt-8">
              <button className="flex-1 bg-[#FF6A3D] text-white py-3 rounded-lg font-bold hover:bg-[#1A2238] transition">
                {currentSlide === 0 && "Start Reading & Earning"}
                {currentSlide === 1 && "Join Quiz Contest"}
                {currentSlide === 2 && "Become Premium Member"}
              </button>
              <button
                onClick={() => setShowDemo(false)}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-bold hover:bg-gray-50 transition"
              >
                Close Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Auto slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative h-[700px] overflow-hidden rounded-b-3xl">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-in-out ${currentSlide === index
                ? 'opacity-100 translate-x-0'
                : index < currentSlide
                  ? 'opacity-0 -translate-x-full'
                  : 'opacity-0 translate-x-full'
              }`}
          >
            <div className={`${slide.bg} h-full flex items-center`}>
              <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className="text-white space-y-6">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      {slide.icon}
                      <span className="font-bold text-sm">{slide.badge}</span>
                    </div>

                    <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                      {slide.title}
                    </h1>

                    <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                      {slide.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button onClick={()=>{navigate(slide.url)}} className="bg-white text-gray-900 px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg">
                        {slide.cta}
                      <Play className="w-5 h-5" />
                      </button>
                      <button
                        onClick={handleDemoClick}
                        className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-sm"
                      >
                        Watch Demo
                      </button>
                    </div>

                    {/* Quick Stats */}
                    <div className="flex gap-6 pt-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold">5000+</div>
                        <div className="text-white/70 text-sm">Books</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">₹2L+</div>
                        <div className="text-white/70 text-sm">Prize Money</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">10K+</div>
                        <div className="text-white/70 text-sm">Winners</div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="hidden lg:flex justify-center">
                    <div className="relative">
                      <div className="text-9xl transform hover:scale-110 transition-transform duration-300">
                        {slide.image}
                      </div>
                      {/* Floating elements */}
                      <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full p-4 animate-bounce">
                        <Star className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-sm rounded-full p-4 animate-pulse">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <button onClick={handleDemoClick}> demo </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${currentSlide === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
              }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-10">
        <div
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{
            width: isAutoPlaying ? '100%' : '0%'
          }}
        />
      </div> 

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

      {/* Background Pattern */}
      {/* <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:20px_20px]"></div>
      </div> */}

      {/* Demo Modal */}
      <DemoModal />
    </div>
  )
}
export default HeroSection;