import React, { useState } from 'react'
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  MessageCircle,
  Mail,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Share2
} from 'lucide-react';


function ContactPage() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: '',
        message: ''
      });
    }, 2000);
  };

  
  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Us',
      description: 'Send us an email anytime',
      details: import.meta.env.VITE_CONTACT_EMAIL,
      action: () => window.location.href = `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`,
      responseTime: 'Within 24 hours',
      color: 'hover:bg-blue-50 hover:border-blue-200'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Us',
      description: '24/7 Customer Support',
      details: `+91-${import.meta.env.VITE_PHONE}`,
      action: () => {
        if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
          window.open(`tel: +91-${import.meta.env.VITE_PHONE}`);
        } else {
          navigator.clipboard.writeText(`+91-${import.meta.env.VITE_PHONE}`);
          alert(`Phone number copied to clipboard:  +91-${import.meta.env.VITE_PHONE}`);
        }
      },
      responseTime: 'Instant',
      color: 'hover:bg-green-50 hover:border-green-200'
    },
    // {
    //   icon: <MessageSquare className="w-6 h-6" />,
    //   title: 'Live Chat',
    //   description: 'Instant messaging support',
    //   details: 'Available 9AM - 9PM EST',
    //   action: () => setSubmitStatus('chat'),
    //   responseTime: 'Within 5 minutes',
    //   color: 'hover:bg-purple-50 hover:border-purple-200'
    // },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: 'WhatsApp',
      description: 'Quick chat support',
      details: `+91-${import.meta.env.VITE_PHONE}`,
      action: () => window.open(`https://wa.me/91${import.meta.env.VITE_PHONE}`, '_blank'),
      responseTime: 'Within 1 hour',
      color: 'hover:bg-green-50 hover:border-green-200'
    }
  ];



  const faqQuickLinks = [
    {
      question: "How do I participate in quizzes?",
      link: "/faq#quizzes"
    },
    {
      question: "When will I receive prize money?",
      link: "/faq#prize-money"
    },
    {
      question: "How to cancel membership?",
      link: "/faq#membership"
    },
    {
      question: "Payment issues and refunds",
      link: "/faq#payments"
    }
  ];

  // social links

  const socialMedia = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: 'https://facebook.com/readwin',
      description: 'Follow for updates & community',
      handle: '@readwin',
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-5 h-5" />,
      url: 'https://instagram.com/readwin',
      description: 'Book quotes & quiz highlights',
      handle: '@readwin_books',
      color: 'hover:bg-pink-50 hover:border-pink-200 hover:text-pink-600'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: 'https://twitter.com/readwin',
      description: 'Quick updates & support',
      handle: '@readwinsupport',
      color: 'hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://linkedin.com/company/readwin',
      description: 'Professional network',
      handle: 'ReadWin Books',
      color: 'hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
    },
    {
      name: 'YouTube',
      icon: <Youtube className="w-5 h-5" />,
      url: 'https://youtube.com/readwin',
      description: 'Tutorials & book reviews',
      handle: 'ReadWin Tutorials',
      color: 'hover:bg-red-50 hover:border-red-200 hover:text-red-600'
    },
    {
      name: 'WhatsApp Channel',
      icon: <MessageCircle className="w-5 h-5" />,
      url: 'https://whatsapp.com/channel/readwin',
      description: 'Quiz alerts & new books',
      handle: 'ReadWin Updates',
      color: 'hover:bg-green-50 hover:border-green-200 hover:text-green-600'
    }
  ];


  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're here to help you with any questions about ebooks, quizzes, prize money, or membership.
              Get in touch with our support team.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Column - Contact Methods */}
            <div className="lg:col-span-1 space-y-6">

              {/* Contact Methods */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <button
                      key={index}
                      onClick={method.action}
                      className="w-full text-left p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        <span className="text-2xl">{method.icon}</span>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{method.title}</h3>
                          <p className="text-sm text-gray-600">{method.description}</p>
                          <p className="text-blue-600 font-medium mt-1">{method.details}</p>
                          <p className="text-xs text-gray-500 mt-1">Response: {method.responseTime}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Help</h2>
                <p className="text-gray-600 mb-4">Common questions answered instantly:</p>
                <div className="space-y-3">
                  {faqQuickLinks.map((faq, index) => (
                    <a
                      key={index}
                      href={faq.link}
                      className="block p-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                    >
                      {faq.question}
                    </a>
                  ))}
                </div>
              </div>

              {/* Office Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Office</h2>
                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <span>🏢</span>
                    <div>
                      <p className="font-semibold">{import.meta.env.VITE_WEBSITE_NAME} Headquarters</p>
                      <p>Raipur</p>
                      <p>Chhattisgarh, India</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span>🕒</span>
                    <div>
                      <p className="font-semibold">Business Hours</p>
                      <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                      <p>Weekend Support: Email & Chat Only</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-green-500 text-xl mr-3">✅</span>
                      <div>
                        <p className="text-green-800 font-semibold">Message Sent Successfully!</p>
                        <p className="text-green-600">We'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  </div>
                )}

                {submitStatus === 'chat' && (
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-blue-500 text-xl mr-3">💬</span>
                      <div>
                        <p className="text-blue-800 font-semibold">Live Chat Available</p>
                        <p className="text-blue-600">Our agents are ready to help you now!</p>
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        placeholder="Brief subject of your message"
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Issue Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      >
                        <option value="">Select a category</option>
                        <option value="ebook-purchase">Ebook Purchase</option>
                        <option value="quiz-participation">Quiz Participation</option>
                        <option value="prize-money">Prize Money Issue</option>
                        <option value="membership">Membership & Subscription</option>
                        <option value="technical">Technical Support</option>
                        <option value="payment">Payment Issues</option>
                        <option value="refund">Refund Request</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Detailed Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-vertical"
                      placeholder="Please describe your issue in detail. Include book titles, quiz names, or transaction IDs if applicable."
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-colors duration-200 ${isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                        }`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Sending...</span>
                        </div>
                      ) : (
                        'Send Message'
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({
                        name: '',
                        email: '',
                        subject: '',
                        category: '',
                        message: ''
                      })}
                      className="px-6 py-3 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-semibold"
                    >
                      Clear Form
                    </button>
                  </div>

                  <p className="text-sm text-gray-500">
                    By submitting this form, you agree to our{' '}
                    <a href={import.meta.env.VITE_PRIVACY_PAGE} className="text-blue-600 hover:text-blue-800">
                      Privacy Policy
                    </a>
                    . We'll use your email only to respond to your inquiry.
                  </p>
                </form>
              </div>

              {/* Support Statistics */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">24/7</div>
                  <div className="text-sm text-gray-600">Phone Support</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">1h</div>
                  <div className="text-sm text-gray-600">Avg. Response Time</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">98%</div>
                  <div className="text-sm text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="bg-white rounded-xl shadow-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">1000+</div>
                  <div className="text-sm text-gray-600">Queries Resolved</div>
                </div>
              </div>
            </div>



            {/* Social Media Section */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Join Our Community</h2>
                <Share2 className="w-5 h-5 text-gray-400" />
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-3 p-3 border border-gray-200 rounded-lg transition-all duration-200 group ${social.color}`}
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-white transition-colors duration-200">
                      {social.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate group-hover:text-gray-800">
                        {social.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate group-hover:text-gray-600">
                        {social.handle}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Community Benefits */}
              <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 text-sm mb-2 flex items-center">
                  <Youtube className="w-4 h-4 mr-2" />
                  Community Benefits
                </h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Exclusive quiz announcements</li>
                  <li>• Early bird prize opportunities</li>
                  <li>• Book reading challenges</li>
                  <li>• Live Q&A sessions with authors</li>
                </ul>
              </div>
            </div>


          </div>
        </div>
      </div>

    </>
  )
}

export default ContactPage
