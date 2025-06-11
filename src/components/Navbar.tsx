import { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS, ANIMATION_DELAYS } from '../constants/animations';

export function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  // Optimized transforms with reduced complexity
  const bg = useTransform(scrollY, [0, 100], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.15]);

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

  // OPTIMIZED: Memoized contact button style
  const contactButtonStyle = useMemo(() => ({
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3), 0 3px 10px rgba(99, 102, 241, 0.2)'
  }), []);

  // OPTIMIZED: Memoized contact button hover handlers
  const handleContactHover = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.boxShadow = '0 12px 35px rgba(99, 102, 241, 0.4), 0 5px 15px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)';
  }, []);

  const handleContactLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.boxShadow = '0 8px 25px rgba(99, 102, 241, 0.3), 0 3px 10px rgba(99, 102, 241, 0.2)';
  }, []);

  return (
    <>
      <motion.nav 
        style={{ 
          backgroundColor: bg,
          // Removed backdrop-filter transform for better performance
        }}
        className="fixed top-0 left-0 right-0 z-[60] font-inter"
      >
        <motion.div 
          style={{ 
            borderBottomColor: useTransform(borderOpacity, (value) => `rgba(255,255,255,${value})`)
          }}
          className="border-b backdrop-blur-md"
          // Added backdrop-blur as a class instead of transform for better performance
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 sm:h-20 items-center justify-between">
              {/* Logo with GPU optimization */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="gpu-animated"
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
                        className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 group gpu-accelerated ${
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

              {/* Desktop CTA with GPU optimization */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden md:block gpu-animated"
              >
                <Link
                  to="/contact"
                  className="premium-button-no-shine rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-[500] text-white transition-all duration-300"
                >
                  Contact Me
                </Link>
              </motion.div>

              {/* Mobile menu button with GPU optimization */}
              <div className="md:hidden">
                <motion.button
                  onClick={toggleMenu}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center justify-center rounded-lg p-2 text-white bg-white/10 border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300 gpu-animated"
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
                      className="block h-0.5 w-6 bg-white rounded-full gpu-animated"
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
                      className="block h-0.5 w-6 bg-white rounded-full gpu-animated"
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
                      className="block h-0.5 w-6 bg-white rounded-full gpu-animated"
                    />
                  </div>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Optimized Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with GPU optimization */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 z-[45] md:hidden gpu-animated"
              onClick={closeMenu}
            />
            
            {/* Mobile menu with GPU optimization */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 border-l border-white/20 z-[55] md:hidden overflow-hidden glass"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(15,15,29,0.9) 50%, rgba(0,0,0,0.95) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '-20px 0 60px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              {/* Simplified gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/8 via-transparent to-purple-500/8 pointer-events-none" />
              
              {/* Menu content */}
              <div className="relative flex flex-col h-full pt-24 px-8">
                {/* Navigation links */}
                <div className="space-y-8 flex-1">
                  {navLinks.map((link, index) => {
                    const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                    return (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + index * 0.08, type: 'spring', damping: 20 }}
                        whileHover={{ x: 4 }}
                        className="group gpu-animated"
                      >
                        <Link
                          to={link.path}
                          onClick={closeMenu}
                          className={`relative block text-xl font-semibold transition-all duration-300 ${
                            isActive 
                              ? 'text-white' 
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          <span className="relative z-10">{link.name}</span>
                          {/* Active indicator */}
                          {isActive && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                            />
                          )}
                          {/* Simplified hover effect */}
                          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300 -z-10" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Contact button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: 'spring', damping: 20 }}
                  className="pb-10"
                >
                  <Link
                    to="/contact"
                    onClick={closeMenu}
                    className="relative block w-full text-center py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 group premium-button"
                  >
                    <span className="relative z-10">Contact Me</span>
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