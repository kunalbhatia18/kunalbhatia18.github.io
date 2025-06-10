import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

export function Navbar() {
  const { scrollY } = useScroll();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const bg = useTransform(scrollY, [0, 100], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']);
  const backdrop = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(20px)']);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      <motion.nav 
        style={{ 
          backgroundColor: bg,
          backdropFilter: backdrop,
          WebkitBackdropFilter: backdrop,
        }}
        className="fixed top-0 left-0 right-0 z-[60] font-inter"
      >
        <motion.div 
          style={{ borderBottomColor: useTransform(borderOpacity, (value) => `rgba(255,255,255,${value})`) }}
          className="border-b"
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
                  className="premium-button rounded-full px-4 sm:px-6 py-2 sm:py-2.5 text-sm font-semibold text-white"
                >
                  Contact Me
                </Link>
              </motion.div>

              {/* Enhanced Mobile menu button - Premium glass-morphism hamburger */}
              <div className="md:hidden">
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative inline-flex items-center justify-center rounded-xl p-3 text-white backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 transition-all duration-300 shadow-lg"
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
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="block h-0.5 w-6 bg-white rounded-full transform origin-center shadow-sm"
                    />
                    <motion.span
                      animate={{
                        opacity: isOpen ? 0 : 1,
                        scale: isOpen ? 0.8 : 1
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="block h-0.5 w-6 bg-white rounded-full shadow-sm"
                    />
                    <motion.span
                      animate={{
                        rotate: isOpen ? -45 : 0,
                        y: isOpen ? -10 : 0,
                        backgroundColor: isOpen ? '#8b5cf6' : '#ffffff'
                      }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="block h-0.5 w-6 bg-white rounded-full transform origin-center shadow-sm"
                    />
                  </div>
                  {/* Subtle glow effect when open */}
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-sm -z-10"
                    />
                  )}
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* PROPER slide-in menu from right - keeps hamburger visible */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Translucent backdrop - matches site aesthetic */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[45] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Enhanced slide-in menu from right - Premium glass design */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-72 border-l border-white/20 z-[55] md:hidden overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(15,15,29,0.8) 50%, rgba(0,0,0,0.9) 100%)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                boxShadow: '-20px 0 60px -10px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)'
              }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-purple-500/5 pointer-events-none" />
              {/* Enhanced Menu content */}
              <div className="relative flex flex-col h-full pt-24 px-8">
                {/* Navigation links with enhanced styling */}
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
                        className="group"
                      >
                        <Link
                          to={link.path}
                          onClick={() => setIsOpen(false)}
                          className={`relative block text-xl font-semibold transition-all duration-300 group-hover:scale-105 ${
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
                          {/* Hover glow */}
                          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300 -z-10" />
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Enhanced contact button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, type: 'spring', damping: 20 }}
                  className="pb-10"
                >
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="relative block w-full text-center py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/25 group"
                  >
                    <span className="relative z-10">Contact Me</span>
                    {/* Animated shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/0 to-purple-400/0 group-hover:from-indigo-400/20 group-hover:to-purple-400/20 transition-all duration-300" />
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