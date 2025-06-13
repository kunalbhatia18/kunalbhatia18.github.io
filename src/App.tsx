import { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ScrollProgress, CustomCursor } from './components';
import { PageLoader } from './components/ui/PageTransition';
import { addPerformanceHelpers } from './utils/performance';
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
    // Make performance helpers available immediately
    addPerformanceHelpers();
    
    // Start FPS monitoring (only if not already started)
    if (!(window as any).fpsStarted) {
      let frameCount = 0;
      let lastFrameTime = performance.now();
      
      const measureFPS = () => {
        const currentTime = performance.now();
        const deltaTime = currentTime - lastFrameTime;
        
        if (deltaTime >= 3000) { // Log every 3 seconds
          const fps = Math.round((frameCount * 1000) / deltaTime);
          
          // Color-coded console logging based on FPS
          if (fps >= 55) {
            console.log(`%c🟢 FPS: ${fps} (Excellent)`, 'color: #10b981; font-weight: bold;');
          } else if (fps >= 45) {
            console.log(`%c🟡 FPS: ${fps} (Good)`, 'color: #f59e0b; font-weight: bold;');
          } else if (fps >= 30) {
            console.log(`%c🟠 FPS: ${fps} (Fair)`, 'color: #f97316; font-weight: bold;');
          } else {
            console.log(`%c🔴 FPS: ${fps} (Poor)`, 'color: #ef4444; font-weight: bold;');
          }
          
          frameCount = 0;
          lastFrameTime = currentTime;
        }
        
        frameCount++;
        requestAnimationFrame(measureFPS);
      };
      
      requestAnimationFrame(measureFPS);
      (window as any).fpsStarted = true;
    }
  }, []);
  
  useEffect(() => {
    // Fast, smart loading coordination
    const minLoadTime = 600;
    const maxLoadTime = 1200;
    const startTime = performance.now();
    
    const checkReadiness = () => {
      const elapsed = performance.now() - startTime;
      if (elapsed >= minLoadTime) {
        setLoading(false);
      } else {
        setTimeout(() => setLoading(false), minLoadTime - elapsed);
      }
    };
    
    const maxTimer = setTimeout(() => setLoading(false), maxLoadTime);
    
    if (document.readyState === 'complete') {
      checkReadiness();
    } else {
      const readyTimer = setTimeout(checkReadiness, 400);
      return () => {
        clearTimeout(maxTimer);
        clearTimeout(readyTimer);
      };
    }
    
    return () => clearTimeout(maxTimer);
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