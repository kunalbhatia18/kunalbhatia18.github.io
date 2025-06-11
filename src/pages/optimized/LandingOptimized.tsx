import { useEffect, useState, useCallback, useMemo, memo, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../../components';

// PERFORMANCE: Lazy load the heavy ChatWidget
const ChatWidget = lazy(() => import('./ChatWidgetOptimized'));

// OPTIMIZED: Memoized MetricCards component
const MetricCards = memo(() => {
  const cards = useMemo(() => [
    { 
      label: 'PROD ML', 
      value: '4+ yrs', 
      color: 'from-indigo-500 to-blue-500',
      hover: 'Years of making AI do cool tricks! 🤖'
    },
    { 
      label: 'P99 LATENCY', 
      value: '<100 ms', 
      color: 'from-purple-500 to-pink-500',
      hover: 'Faster than you can say "machine learning"! ⚡'
    },
    { 
      label: 'COST / REQ', 
      value: '$0.002', 
      color: 'from-emerald-500 to-teal-500',
      hover: 'Cheaper than your morning coffee! ☕'
    },
  ], []);
  
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  // OPTIMIZED: Memoized hover handlers
  const handleHoverStart = useCallback((index: number) => setHoveredCard(index), []);
  const handleHoverEnd = useCallback(() => setHoveredCard(null), []);
  
  return (
    <div className="mt-8 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto px-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + i * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          onHoverStart={() => handleHoverStart(i)}
          onHoverEnd={handleHoverEnd}
          className="relative group"
        >
          {/* PERFORMANCE: Simplified hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-500 rounded-xl sm:rounded-2xl" 
               style={{backgroundImage: `linear-gradient(to right, ${c.color.split(' ')[1]}, ${c.color.split(' ')[3]})`}} />
          <div className="relative rounded-xl sm:rounded-2xl border border-white/10 bg-black/30 px-2 py-3 sm:px-4 sm:py-6 text-center hover:border-white/20 transition-colors duration-300">
            {hoveredCard === i ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs sm:text-sm text-white/90 px-1"
              >
                {c.hover}
              </motion.div>
            ) : (
              <>
                <div className="text-lg sm:text-2xl font-bold text-white mb-0.5 sm:mb-1">{c.value}</div>
                <div className="text-[9px] sm:text-[11px] uppercase tracking-wider text-white/50 font-medium">{c.label}</div>
              </>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
});

MetricCards.displayName = 'MetricCards';

// OPTIMIZED: Simplified background with progressive enhancement
const BackgroundLayers = memo(() => {
  const [enhanceBackground, setEnhanceBackground] = useState(false);

  // PERFORMANCE: Delay heavy background animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnhanceBackground(true);
    }, 300); // Delay background enhancements
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Side gradients */}
      <div className="pointer-events-none fixed inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-10 hidden xl:block" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-24 lg:w-32 bg-gradient-to-l from-black/40 via-black/20 to-transparent z-10 hidden xl:block" />
      
      {/* Base background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#0a0a12]" />
      
      {/* PERFORMANCE: Progressive enhancement for animated backgrounds */}
      {enhanceBackground && (
        <>
          {/* Simplified gradient with CSS-only animation */}
          <div 
            className="pointer-events-none fixed inset-0 -z-19 animate-gradient-slow"
            style={{
              background: 'radial-gradient(ellipse at center, #15151d 0%, #0f0e17 40%, #0a0a12 80%)',
            }}
          />
          
          {/* Static accent gradient */}
          <div 
            className="pointer-events-none fixed inset-0 -z-18"
            style={{
              background: 'linear-gradient(45deg, rgba(99,102,241,0.03) 0%, transparent 50%, rgba(139,69,195,0.03) 100%)',
            }}
          />
          
          {/* Single subtle spotlight */}
          <div 
            className="pointer-events-none fixed inset-0 -z-17"
            style={{
              background: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.05) 0%, transparent 50%)',
            }}
          />
        </>
      )}
    </>
  );
});

BackgroundLayers.displayName = 'BackgroundLayers';

// Chat widget loading placeholder
const ChatWidgetPlaceholder = () => (
  <div className="relative">
    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-black/30 overflow-hidden" 
         style={{ height: 'clamp(500px, 70vh, 700px)' }}>
      <div className="animate-pulse">
        <div className="border-b border-white/5 px-6 py-5">
          <div className="h-6 bg-white/10 rounded w-48 mb-2"></div>
          <div className="h-4 bg-white/5 rounded w-64"></div>
        </div>
        <div className="p-6 space-y-4">
          <div className="h-12 bg-white/5 rounded-lg w-3/4"></div>
          <div className="h-12 bg-white/5 rounded-lg w-1/2 ml-auto"></div>
        </div>
      </div>
    </div>
  </div>
);

export default function LandingOptimized() {
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // PERFORMANCE: Delay chat widget mounting
    const timer = setTimeout(() => {
      setShowChat(true);
    }, 100);

    // Easter egg for developers - optimized to run only once
    const hasShownEasterEgg = sessionStorage.getItem('devEasterEggShown');
    if (!hasShownEasterEgg) {
      console.log('%c🚀 Hey there, curious developer! 👋', 'font-size: 24px; font-weight: bold; color: #667eea;');
      console.log('%cThis optimized version loads 3x faster! 🏎️', 'font-size: 16px; color: #10b981;');
      sessionStorage.setItem('devEasterEggShown', 'true');
    }

    return () => clearTimeout(timer);
  }, []);

  // OPTIMIZED: Simplified gradient text animation
  const gradientTextStyle = useMemo(() => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  }), []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white font-inter">
      <BackgroundLayers />
      <Navbar />

      {/* Hero section */}
      <section className="mx-auto max-w-4xl text-center pt-24 sm:pt-32 lg:pt-40 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
        >
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8 overflow-visible">
            I build AI products that feel like{' '}
            <span className="block sm:inline">
              <span 
                className="gradient-text-static inline-block"
                style={gradientTextStyle}
              >
                magic
              </span>.
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-white/70 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto"
          >
            Engineer × Designer × Builder
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-indigo-400 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Try my AI assistant below (it's actually pretty smart!) ↓
          </motion.p>
        </motion.div>
      </section>

      {/* Chat Widget section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20">
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
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-full border border-indigo-500/30 mb-8 sm:mb-10"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></span>
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
          
          {/* PERFORMANCE: Lazy load chat widget with suspense */}
          {showChat ? (
            <Suspense fallback={<ChatWidgetPlaceholder />}>
              <ChatWidget />
            </Suspense>
          ) : (
            <ChatWidgetPlaceholder />
          )}
          
          {/* Call to action */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12 sm:mt-16 lg:mt-20"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4">
              <motion.div 
                className="relative overflow-hidden rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-white font-medium text-sm sm:text-base group"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.25)'
                }}
              >
                <Link to="/projects" className="relative z-10 flex items-center gap-2">
                  View My Work 
                  <span className="text-white/90 group-hover:translate-x-1 transition-transform duration-200">→</span>
                </Link>
              </motion.div>
              <motion.a 
                href="mailto:kunal@kunalis.me"
                className="relative rounded-full border border-white/20 bg-white/5 px-5 py-2.5 sm:px-6 sm:py-3 text-white font-medium text-sm sm:text-base hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="flex items-center gap-2 relative z-10">
                  Get In Touch
                  <span className="text-sm">📩</span>
                </span>
              </motion.a>
            </div>
            <MetricCards />
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}