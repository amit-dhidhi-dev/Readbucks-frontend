
// import './App.css'
import Navbars from './components/Navbars'
import HomePage from './pages/HomePage'
import Footer from './components/footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import FAQ from './components/FAQ'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsAndConditions from './components/TermsAndConditions'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import LoginPage from './pages/LoginPage'
import BooksPage from './pages/BooksPage'
import QuizPage from './pages/QuizPage.'
import LeaderboardPage from './pages/LeaderboardPage'
import TestPage from './pages/TestPage'
import QuizContestPage from './pages/QuizContestPage'


function App() {

  // const appName = import.meta.env.VITE_WEBSITE_NAME;

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
          <Route path={import.meta.env.VITE_BOOKS_PAGE} element={<BooksPage />} />
          <Route path={import.meta.env.VITE_QUIZ_PAGE} element={<QuizPage />} />
          <Route path={import.meta.env.VITE_LEADERBOARD_PAGE} element={<LeaderboardPage />} />
          <Route path={import.meta.env.VITE_QUIZCONTEST_PAGE} element={<QuizContestPage />} />
        </Routes>

        <Footer />
      </Router>





    </>
  )
}

export default App
