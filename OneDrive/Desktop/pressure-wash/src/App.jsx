import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CompactLandingPage from './pages/CompactLandingPage';
import BookPage from './pages/BookPage';
import SocialPage from './pages/SocialPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <main>
        <Routes>
          <Route path="/" element={<CompactLandingPage />} />
          <Route path="/book" element={<BookPage />} />
          <Route path="/social" element={<SocialPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
