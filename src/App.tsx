import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageLoader, ScrollProgress, CustomCursor } from './components';
import './index.css';

// Import your pages
import Landing from './pages/Landing';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Reduced loading time for better performance
    setTimeout(() => setLoading(false), 800);
  }, []);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>

      {/* Custom Cursor (desktop only) */}
      <CustomCursor />
      
      {/* Scroll progress */}
      <ScrollProgress />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && <PageLoader />}
      </AnimatePresence>

      {/* Main content */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;