import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer } from '../components';
import { 
  BackgroundLayers, 
  HeroSection, 
  ChatWidget, 
  CallToAction 
} from '../components/landing';

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Easter egg for developers - optimized to run only once
    const hasShownEasterEgg = sessionStorage.getItem('devEasterEggShown');
    if (!hasShownEasterEgg) {
      console.log('%c🚀 Hey there, curious developer! 👋', 'font-size: 24px; font-weight: bold; color: #667eea;');
      console.log('%cKunal here! Since you\'re checking out the console, you\'re clearly a person of culture! 🧐', 'font-size: 16px; color: #764ba2;');
      console.log('%c• This site is built with React 18 + TypeScript + Vite 6 + Tailwind CSS', 'color: #10b981;');
      console.log('%c• Every animation is GPU-accelerated for buttery smooth 60fps', 'color: #10b981;');
      console.log('%c• Try typing "konami" or "coffee" in the chat widget! ☕', 'color: #f59e0b;');
      console.log('%c• Fun fact: Variable names in this codebase include "ticking", "mv", and "iv" (I\'m a minimalist) 😄', 'color: #8b5cf6;');
      console.log('%cWant to chat about the tech stack? Hit me up: kunal@kunalis.me', 'font-size: 14px; color: #ef4444;');
      console.log('%c\n💡 Pro tip: Press Ctrl+Shift+I to close this and pretend you were never here 😉', 'font-style: italic; color: #6b7280;');
      sessionStorage.setItem('devEasterEggShown', 'true');
    }
  }, []);
  
  // OPTIMIZED: Simplified keyboard easter egg with proper cleanup
  useEffect(() => {
    let sequence = '';
    let activeTimer: ReturnType<typeof setTimeout> | null = null;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence += e.key.toLowerCase();
      if (sequence.length > 10) sequence = sequence.slice(-10);
      
      // Clear any existing timer before setting a new one
      if (activeTimer) {
        clearTimeout(activeTimer);
        activeTimer = null;
      }
      
      if (sequence.includes('awesome')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        activeTimer = setTimeout(() => { 
          document.body.style.filter = 'none';
          activeTimer = null;
        }, 2000);
        console.log('🌈 Rainbow mode activated! Kunal approves of your typing skills!');
      }
      
      if (sequence.includes('pasta')) {
        document.body.style.animation = 'shake 0.5s';
        activeTimer = setTimeout(() => { 
          document.body.style.animation = '';
          activeTimer = null;
        }, 500);
        console.log('🍝 Mamma mia! You triggered the pasta protocol!');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress, { passive: true });
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      if (activeTimer) {
        clearTimeout(activeTimer);
      }
      // Reset any active effects on cleanup
      document.body.style.filter = 'none';
      document.body.style.animation = '';
    };
  }, []);

  return (
    <motion.main 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        ease: "easeOut",
        delay: 0 // Start immediately when loading ends - no delay
      }}
      className="relative min-h-screen w-full overflow-hidden text-white font-inter gpu-layer"
      style={{
        contain: 'layout style paint',
        willChange: 'auto'
      }}
    >
      <BackgroundLayers />
      <Navbar />

      <HeroSection />

      {/* Chat Widget section with GPU optimization */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20 gpu-layer" style={{ contain: 'layout style' }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Showcase header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-full border border-indigo-500/30 mb-8 sm:mb-10 shadow-lg"
              style={{
                background: 'linear-gradient(45deg,rgb(99, 102, 241, 0.4) 0%,rgb(139, 92, 246, 0.3) 50%',  
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></span>
              <span className="text-xs sm:text-sm font-semibold text-white">Live AI Assistant Demo</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/60 text-xs sm:text-sm max-w-md mx-auto px-4"
            >
              This isn't just a portfolio piece — it's a working AI that knows everything about my experience. Go ahead, test it!
            </motion.p>
          </div>
          
          <ChatWidget />
          
          <CallToAction />
        </motion.div>
      </section>

      <Footer />
    </motion.main>
  );
}
