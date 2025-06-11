import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ScrollProgress, CustomCursor } from './components';
import { PageLoader } from './components/ui/PageTransition';
import { PerformanceMonitor, measureCoreWebVitals, addPerformanceHelpers } from './utils/performance';
import './index.css';

// Lazy load pages for better bundle splitting
import Landing from './pages/Landing';
import About from './pages/About';
import Projects from './pages/Projects';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Show the beautiful loading screen for a coordinated time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1900); // Optimized timing for seamless loader→content transition
    
    // PERFORMANCE: Initialize monitoring with zero blocking - schedule after transition
    const initPerformanceAsync = () => {
      // Use requestIdleCallback for truly non-blocking initialization
      const scheduleWork = () => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            const monitor = PerformanceMonitor.getInstance();
            monitor.init();
            measureCoreWebVitals();
            addPerformanceHelpers();
          }, { timeout: 5000 });
        } else {
          // Fallback for browsers without requestIdleCallback
          setTimeout(() => {
            const monitor = PerformanceMonitor.getInstance();
            monitor.init();
            measureCoreWebVitals();
            addPerformanceHelpers();
          }, 2500); // After transition completes
        }
      };
      
      // Schedule work for after loading completes
      setTimeout(scheduleWork, 2000);
    };
    
    // Start completely non-blocking performance monitoring
    initPerformanceAsync();
    
    // Cleanup
    return () => {
      clearTimeout(timer);
      // Cleanup will happen when component unmounts
      const monitor = PerformanceMonitor.getInstance();
      monitor.cleanup();
    };
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

      {/* Loading screen with AnimatePresence for smooth exit */}
      <AnimatePresence>
        {loading && <PageLoader />}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </AnimatePresence>
      )}
    </>
  );
}

export default App;