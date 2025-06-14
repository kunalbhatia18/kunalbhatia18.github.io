import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer, SEO } from '../components';
// REMOVED: AnimatedBackground - was 100% hidden behind solid background, causing massive FPS drop
import { 
  HeroSection, 
  ChatWidget, 
  CallToAction 
} from '../components/landing';

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Easter egg for developers
    const hasShownEasterEgg = sessionStorage.getItem('devEasterEggShown');
    if (!hasShownEasterEgg) {
      setTimeout(() => {
        console.log('%c🚀 Hey developer! Built with React 18 + TypeScript + Vite 6. Try typing "coffee" in the chat! ☕', 'color: #667eea; font-weight: bold;');
        console.log('%c🔧 Available: performanceReport() | analyzeBundleSize() | clearEasterEgg()', 'color: #8b5cf6; font-size: 12px;');
        sessionStorage.setItem('devEasterEggShown', 'true');
        
        // Add helper functions
        (window as any).clearEasterEgg = () => {
          sessionStorage.removeItem('devEasterEggShown');
          console.log('🎉 Easter egg cleared! Refresh to see it again.');
        };
      }, 500);
    }
  }, []);
  
  // COMMENTED OUT: Easter egg effects for FPS testing
  // useEffect(() => {
  //   let sequence = '';
  //   let activeTimer: ReturnType<typeof setTimeout> | null = null;
  //   
  //   const handleKeyPress = (e: KeyboardEvent) => {
  //     sequence += e.key.toLowerCase();
  //     if (sequence.length > 10) sequence = sequence.slice(-10);
  //     
  //     // Clear any existing timer before setting a new one
  //     if (activeTimer) {
  //       clearTimeout(activeTimer);
  //       activeTimer = null;
  //     }
  //     
  //     if (sequence.includes('awesome')) {
  //       document.body.style.filter = 'hue-rotate(180deg)';
  //       activeTimer = setTimeout(() => { 
  //         document.body.style.filter = 'none';
  //         activeTimer = null;
  //       }, 2000);
  //       console.log('🌈 Rainbow mode activated! Kunal approves of your typing skills!');
  //     }
  //     
  //     if (sequence.includes('pasta')) {
  //       document.body.style.animation = 'shake 0.5s';
  //       activeTimer = setTimeout(() => { 
  //         document.body.style.animation = '';
  //         activeTimer = null;
  //       }, 500);
  //       console.log('🍝 Mamma mia! You triggered the pasta protocol!');
  //     }
  //   };
  //   
  //   window.addEventListener('keydown', handleKeyPress, { passive: true });
  //   
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyPress);
  //     if (activeTimer) {
  //       clearTimeout(activeTimer);
  //     }
  //     // Reset any active effects on cleanup
  //     document.body.style.filter = 'none';
  //     document.body.style.animation = '';
  //   };
  // }, []);

  return (
    <>
      <SEO 
        title="Kunal B - AI/ML Engineer"
        description="Kunal Bhatia - AI/ML Engineer building lightning-fast products. 35ms inference, 3M+ users served. React, FastAPI, GPT-4. Based in Bangalore."
        keywords={['AI Engineer', 'ML Engineer', 'React Developer', 'FastAPI', 'GPT-4', 'Machine Learning', 'Bangalore', 'TypeScript', 'Voice AI', 'Real-time Systems']}
        url="https://kunalis.me/kunal-website"
        image="https://kunalis.me/og-image.svg"
      />
      <motion.main 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        ease: "easeOut",
        delay: 0.1 // Minimal delay for smooth transition from loader
      }}
      className="relative min-h-screen w-full overflow-hidden text-white font-inter gpu-layer"
      style={{
        contain: 'layout style paint',
        willChange: 'opacity, transform'
      }}
    >
      {/* OPTIMIZED BACKGROUND SYSTEM - 60+ FPS Performance */}
      
      {/* Side gradients - Enhanced on large screens */}
      <div className="pointer-events-none fixed inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-10 hidden xl:block" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-24 lg:w-32 bg-gradient-to-l from-black/40 via-black/20 to-transparent z-10 hidden xl:block" />
      
      {/* Layer 1: Base solid background - RESTORED and visible */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#0a0a12]" />
      
      {/* Subtle static gradients - replaces the 10-20% visible portions of animated layers */}
      <div 
        className="pointer-events-none fixed inset-0 -z-19"
        style={{
          background: `
            radial-gradient(ellipse_at_center, rgba(21, 21, 29, 0.6) 0%, rgba(15, 14, 23, 0.3) 40%, transparent 80%),
            linear-gradient(45deg, rgba(99, 102, 241, 0.02) 0%, transparent 50%, rgba(139, 69, 195, 0.02) 100%)
          `
        }}
      />
      
      {/* COMMENTED OUT: Floating particles system - removed for maximum FPS
      <div className="pointer-events-none fixed inset-0 -z-16">
        Main particles - reduced from 12 to 9
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        Larger accent particles - reduced from 6 to 4
        {Array.from({ length: 4 }).map((_, i) => (
          <motion.div
            key={`accent-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? 'rgba(99,102,241,0.3)' : i % 3 === 1 ? 'rgba(139,69,195,0.3)' : 'rgba(244,114,182,0.3)'
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              scale: 0
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 25 + 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      */}
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
    </>
  );
}