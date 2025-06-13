import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS, ANIMATION_DELAYS } from '../constants/animations';

export function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Glass-morphism effect similar to ressl.ai
  const bg = useTransform(scrollY, [0, 100], [
    'rgba(15, 15, 29, 0)', 
    'rgba(15, 15, 29, 0.4)'
  ]);
  const backdropBlur = useTransform(scrollY, [0, 100], [0, 20]);

  // Memoize navigation links to prevent recreation
  const navLinks = useMemo(() => [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ], []);

  // OPTIMIZED: Close menu handler
  const closeMenu = useCallback(() => setIsOpen(false), []);

  // OPTIMIZED: Toggle menu handler
  const toggleMenu = useCallback(() => setIsOpen(prev => !prev), []);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
  }, [location, closeMenu]);

  // Optimized escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeMenu]);

  // Optimized body scroll prevention
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav 
        style={{ 
          backgroundColor: bg,
          backdropFilter: useTransform(backdropBlur, (value) => `blur(${value}px)`),
          WebkitBackdropFilter: useTransform(backdropBlur, (value) => `blur(${value}px)`),
        }}
        className="fixed top-0 left-0 right-0 z-[60] font-inter"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 sm:h-20 items-center justify-between">
              {/* Logo */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/" className="text-xl sm:text-2xl font-bold gradient-text tracking-tight">
                  Kunal B.
                </Link>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-6 lg:space-x-10">
                  {navLinks.map((link) => {
                    const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                    return (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group ${
                          isActive
                            ? 'text-white'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        {link.name}
                        <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300 ${
                          isActive 
                            ? 'w-full' 
                            : 'w-0 group-hover:w-full'
                        }`} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Desktop CTA */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <Link
                  to="/contact"
                  className="premium-button rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-medium text-white"
                >
                  Contact Me
                </Link>
              </motion.div>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <motion.button
                  onClick={toggleMenu}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center justify-center rounded-lg p-2 text-white bg-white/10 border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300"
                  aria-expanded={isOpen}
                  aria-label="Toggle navigation menu"
                >
                  <span className="sr-only">Open main menu</span>
                  <div className="relative w-6 h-5 flex flex-col justify-between items-center">
                    <motion.span
                      animate={{
                        rotate: isOpen ? 45 : 0,
                        y: isOpen ? 10 : 0,
                        backgroundColor: isOpen ? '#8b5cf6' : '#ffffff'
                      }}
                      transition={{ 
                        duration: ANIMATION_DURATIONS.fast, 
                        ease: ANIMATION_EASINGS.easeInOut,
                        delay: ANIMATION_DELAYS.navbar
                      }}
                      className="block h-0.5 w-6 bg-white rounded-full"
                    />
                    <motion.span
                      animate={{
                        opacity: isOpen ? 0 : 1,
                        scale: isOpen ? 0.8 : 1
                      }}
                      transition={{ 
                        duration: 0.2, 
                        ease: ANIMATION_EASINGS.easeInOut,
                        delay: ANIMATION_DELAYS.navbar + 0.01
                      }}
                      className="block h-0.5 w-6 bg-white rounded-full"
                    />
                    <motion.span
                      animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -10 : 0,
                        backgroundColor: isOpen ? '#8b5cf6' : '#ffffff'
                      }}
                      transition={{ 
                        duration: ANIMATION_DURATIONS.fast, 
                        ease: ANIMATION_EASINGS.easeInOut,
                        delay: ANIMATION_DELAYS.navbar + 0.02
                      }}
                      className="block h-0.5 w-6 bg-white rounded-full"
                    />
                  </div>
                </motion.button>
              </div>
            </div>
        </div>
      </motion.nav>

      {/* Optimized Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-[45] md:hidden"
              onClick={closeMenu}
            />
            
            {/* Mobile menu */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 z-[55] md:hidden overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(15, 15, 29, 0.95) 0%, rgba(10, 10, 25, 0.98) 50%, rgba(5, 5, 15, 0.99) 100%)',
                backdropFilter: 'blur(40px)',
                WebkitBackdropFilter: 'blur(40px)',
                boxShadow: '-20px 0 60px -10px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              {/* Animated gradient overlay */}
              <motion.div 
                className="absolute inset-0 pointer-events-none"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)'
                  ]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              
              {/* Menu content */}
              <div className="relative flex flex-col h-full pt-20 px-6">
                {/* Header */}
                <motion.div 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="mb-8 pb-6 border-b border-white/10"
                >
                  <h2 className="text-lg font-semibold text-white/90">Navigation</h2>
                  <p className="text-sm text-white/50 mt-1">Explore Kunal's work</p>
                </motion.div>

                {/* Navigation links */}
                <div className="space-y-2 flex-1">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.05, type: 'spring', damping: 20 }}
                        className="group"
                      >
                        <Link
                          to={link.path}
                          onClick={closeMenu}
                          className={`relative flex items-center px-4 py-4 rounded-2xl text-base font-medium transition-all duration-300 group ${
                            isActive 
                              ? 'text-white bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/30' 
                              : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                          }`}
                        >
                          {/* Icon placeholder */}
                          <div className={`w-2 h-2 rounded-full mr-4 transition-all duration-300 ${
                            isActive 
                              ? 'bg-gradient-to-r from-indigo-400 to-purple-400 shadow-lg shadow-indigo-400/50' 
                              : 'bg-white/20 group-hover:bg-white/40'
                          }`} />
                          
                          <span className="relative z-10">{link.name}</span>
                          
                          {/* Active indicator */}
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute right-4 w-1.5 h-1.5 bg-indigo-400 rounded-full"
                            />
                          )}
                          
                          {/* Hover arrow */}
                          <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            whileHover={{ opacity: 1, x: 0 }}
                            className="absolute right-4 text-white/40 group-hover:text-white/70"
                          >
                            →
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Contact button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, type: 'spring', damping: 20 }}
                  className="pb-8 pt-6 border-t border-white/10"
                >
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="relative flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/25 group"
                  >
                    <span className="relative z-10 flex items-center">
                      Contact Me
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        →
                      </motion.span>
                    </span>
                    
                    {/* Button glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 via-white/10 to-purple-400/0 group-hover:from-indigo-400/20 group-hover:via-white/20 group-hover:to-purple-400/20 transition-all duration-500" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}