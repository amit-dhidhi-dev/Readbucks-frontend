import { useEffect } from 'react'
// import './App.css'
import Navbars from './components/Navbars'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FAQ from './components/FAQ'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsAndConditions from './components/TermsAndConditions'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import QuizPage from './pages/QuizPage.'
import LeaderboardPage from './pages/LeaderboardPage'
import QuizContestPage from './pages/QuizContestPage'
import UserAccountPage from './pages/UserAccountPage'
import WithdrawFunds from './components/account/WithdrawFunds'
import PremiumPage from './pages/PremiumPage'
import FeedbackWidget from './components/userFeedback/FeedbackWidget'
import SuggestionsPage from './components/userFeedback/SuggestionsPage'
import BookDetailsPage from './pages/BookDetailsPage'
import NotFoundPage from './pages/NotFoundPage'
import { apiService } from './api/services/bookApi'
import BookManagement from './components/book/BookManagement'
import BookReader from './components/book/BookReader'
import { pdfjs } from 'react-pdf';
import TestPage from './pages/TestPage'
import MainBooksPage from './pages/MainBookPage'
import PaymentSuccessPage from './pages/PaymentSuccessPage'

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function App() {

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('user'))?.access_token||null;
    if (token) {
      apiService.setToken(token);
    }
  }, []);


  

  return (
    <>
      {/* <h1>hello - {appName}</h1> */}
      <Router>
        <Navbars />

        <Routes>
          <Route path={import.meta.env.VITE_HOME_PAGE} element={<HomePage />} />
          <Route path={import.meta.env.VITE_FAQ_PAGE} element={<FAQ />} />
          <Route path={import.meta.env.VITE_PRIVACY_PAGE} element={<PrivacyPolicy />} />
          <Route path={import.meta.env.VITE_TERMS_PAGE} element={<TermsAndConditions />} />
          <Route path={import.meta.env.VITE_CONTACT_PAGE} element={<ContactPage />} />
          <Route path={import.meta.env.VITE_ABOUT_PAGE} element={<AboutPage />} />
          <Route path={import.meta.env.VITE_LOGIN_PAGE} element={<LoginPage />} />
          <Route path={import.meta.env.VITE_BOOKS_PAGE} element={<MainBooksPage />} />
          <Route path={import.meta.env.VITE_QUIZ_PAGE} element={<QuizPage />} />
          <Route path={import.meta.env.VITE_LEADERBOARD_PAGE} element={<LeaderboardPage />} />
          <Route path={import.meta.env.VITE_QUIZCONTEST_PAGE} element={<QuizContestPage />} />
          <Route path={import.meta.env.VITE_ACCOUNT_PAGE} element={<UserAccountPage />} />
          <Route path={import.meta.env.VITE_READ_BOOK_PAGE} element={<BookReader />} />
          <Route path={import.meta.env.VITE_WITHDRAW_FUNDS_PAGE} element={<WithdrawFunds />} />
          <Route path={import.meta.env.VITE_PREMIUM_PAGE} element={<PremiumPage />} />
          <Route path={import.meta.env.VITE_SUGGESTIONS_PAGE} element={<SuggestionsPage />} />
          <Route path={import.meta.env.VITE_BOOK_DETAILS_PAGE} element={<BookDetailsPage />} />
          <Route path={import.meta.env.VITE_PUBLISH_BOOK_PAGE} element={<BookManagement />} />
          <Route path={import.meta.env.VITE_EDIT_BOOK_PAGE} element={<BookManagement />} />
          <Route path={import.meta.env.VITE_PAYMENT_SUCCESS_PAGE} element={<PaymentSuccessPage />} />

         

          {/* 404 Page */}
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/test" element={<TestPage />} />

        </Routes>
        <FeedbackWidget />
        <Footer />
      </Router>





    </>
  )
}

export default App
