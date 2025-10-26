import React, { useState } from 'react'
import ContactModal from './ContactModal';

function FAQ() {


  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I purchase books on the website?",
      answer: "To purchase books, first create an account, then select your desired book and click the 'Buy Now' button. You can make payments using credit card, debit card, UPI, or digital wallets."
    },
    {
      question: "How can I participate in quiz competitions?",
      answer: "After purchasing any book, you automatically become eligible to participate in the related quiz. The quiz will be available in the last chapter of the book or you'll receive an email notification with quiz access."
    },
    {
      question: "How do quiz winners receive prize money?",
      answer: "Quiz winners receive prize money directly in their bank account or digital wallet. Payments are processed within 7 working days after results are declared."
    },
    {
      question: "What are the benefits of paid membership?",
      answer: "Paid members get full access to read complete books, exclusive quizzes, higher prize money opportunities, early access to new book releases, and special discounts on purchases."
    },
    {
      question: "What is the membership fee structure?",
      answer: "We offer different plans: Monthly ($4.99), Quarterly ($12.99), and Yearly ($39.99). The yearly plan offers the best value with maximum savings."
    },
    {
      question: "Can I download books for offline reading?",
      answer: "Paid members can read books online through our platform. Download feature for offline reading is currently not available, but we are working on implementing this feature soon."
    },
    {
      question: "When are quizzes conducted?",
      answer: "Quizzes are conducted 2 weeks after each new book launch. We also have monthly quizzes for regular members with separate prize pools."
    },
    {
      question: "Can I participate in quizzes for multiple books?",
      answer: "Yes, you can participate in quizzes for all the books you purchase. Each book has its own separate quiz and you can enter all of them."
    },
    {
      question: "What is your refund policy?",
      answer: "If you're not satisfied with a book, you can claim a refund within 7 days of purchase. However, refunds are not available once you have participated in the book's quiz competition."
    },
    {
      question: "What should I do if I face technical issues?",
      answer: `You can email our support team at ${import.meta.env.VITE_CONTACT_EMAIL} or contact our 24x7 helpline at ${import.meta.env.VITE_PHONE}. `
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, we offer a 7-day free trial where you can access limited books and participate in one free quiz to experience our platform."
    },
    {
      question: "How can I check quiz results?",
      answer: "Quiz results are available on your dashboard and are also sent via email. Results are typically declared within 48 hours after the quiz ends."
    },
    {
      question: "What types of payment methods do you accept?",
      answer: "We accept all major credit cards, debit cards, PayPal, UPI payments, and popular digital wallets. All transactions are secure and encrypted."
    },
    {
      question: "How are quiz winners selected?",
      answer: "Winners are selected based on highest scores in the shortest time. In case of ties, the participant who completed the quiz earlier wins."
    },
    {
      question: "Can I cancel my membership anytime?",
      answer: "Yes, you can cancel your membership at any time. Your membership benefits will remain active until the end of your current billing cycle."
    },
    {
      question: "Are there any age restrictions for participation?",
      answer: "Participants must be at least 13 years old to create an account. For users under 18, parental consent is required for prize money transactions."
    }
  ];

  const filteredFaqs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // for contact support  button/
  const [showContactModal, setShowContactModal] = useState(false);


  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find answers to all your questions about book purchases, quiz competitions, prize money, and membership benefits
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search your question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
              />
              <div className="absolute right-3 top-3">
                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Purchase', 'Quiz', 'Membership', 'Payment', 'Technical'].map((category) => (
              <button
                key={category}
                className="px-6 py-2 bg-white border border-gray-300 rounded-full text-gray-700 hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200"
              >
                {category}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-xl"
              >
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleFAQ(index)}
                >
                  <span className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <svg
                    className={`w-6 h-6 text-blue-600 transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''
                      }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {activeIndex === index && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-200 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Our support team is always ready to help you with any queries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold">
                Contact Support
              </button> */}
              <button onClick={()=>setShowContactModal(true)} className={`px-8 py-3 ${import.meta.env.VITE_BTN_BG} text-white rounded-lg hover:${import.meta.env.VITE_BTN_HOVER} transition-colors duration-200 font-semibold`}>
                Contact Support
              </button>

              {/* show contact modal */}
              {showContactModal && <ContactModal setShowContactModal={setShowContactModal} />}



              {/* <button className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-semibold">
                Live Chat
              </button> */}
            </div>
            <div className="mt-6 text-sm text-gray-500">
              <p>Email: {import.meta.env.VITE_CONTACT_EMAIL} | Phone: +91-{import.meta.env.VITE_PHONE}</p>
              <p>Average response time: 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FAQ
