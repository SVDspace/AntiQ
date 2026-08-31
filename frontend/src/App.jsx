import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/NavBar.jsx';
import { connectSocket, disconnectSocket } from './socket.js';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import BookToken from './pages/BookToken.jsx';
import CheckStatus from './pages/CheckStatus.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import FAQs from './pages/FAQs.jsx';
import HelpCenter from './pages/HelpCenter.jsx';
import Feedback from './pages/Feedback.jsx';
import Profile from './pages/Profile.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import Terms from './pages/Terms.jsx';
import NotFound from './pages/NotFound.jsx';

function AppShell() {
  const location = useLocation();
  const [theme, setTheme] = useState('light');
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const nextTheme = saved === 'dark' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.body.classList.toggle('dark', nextTheme === 'dark');
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.body.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setShowScroll(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const animatedElements = document.querySelectorAll('.animate-up, .animate-fade');

    if (!animatedElements.length) return undefined;

    const timers = Array.from(animatedElements).map((element, index) => {
      return setTimeout(() => {
        element.classList.remove('show');
        void element.offsetWidth;
        element.classList.add('show');
      }, index * 80 + 80);
    });

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [location.pathname]);

  useEffect(() => {
    if (localStorage.getItem('antiq_token')) {
      connectSocket();
    }

    return () => {
      disconnectSocket();
    };
  }, []);

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book-token" element={<BookToken />} />
          <Route path="/check-status" element={<CheckStatus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <button
        className={`scroll-top-btn ${showScroll ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        ⬆
      </button>
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}

export default App;
