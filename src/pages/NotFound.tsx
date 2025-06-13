import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar, Footer, SEO } from '../components';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="Page Not Found"
        description="The page you're looking for doesn't exist or has been moved."
        url="https://kunalis.me/404"
      />
      <main className="relative min-h-screen w-full bg-[#0f0e17] font-inter text-white flex flex-col">
        <Navbar />
        
        {/* Add proper spacing from navbar - increased top padding */}
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-12 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto w-full"
          >
            {/* Smaller, better proportioned "k." logo */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold gradient-text mb-4 sm:mb-6 md:mb-8 leading-none"
              style={{
                lineHeight: '0.8',
                letterSpacing: '-0.02em'
              }}
            >
              k.
            </motion.div>
            
            {/* More reasonable heading sizes */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 tracking-tight"
            >
              Page Not Found
            </motion.h1>
            
            {/* Better proportioned description text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm xs:text-base sm:text-lg text-white/70 mb-6 sm:mb-8 leading-relaxed max-w-lg mx-auto px-2 sm:px-4"
            >
              The page you're looking for doesn't exist or has been moved.
              <br className="hidden sm:block" />
              <span className="block sm:inline text-xs xs:text-sm sm:text-base text-white/50 mt-1 sm:mt-0 sm:ml-1">
                Maybe it's still being optimized for 35ms response time? 🚀
              </span>
            </motion.p>
            
            {/* Smaller, better proportioned buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 md:mb-12"
            >
              <Link
                to="/"
                className="premium-button inline-block rounded-full px-5 xs:px-6 sm:px-7 py-2 xs:py-2.5 sm:py-3 text-white font-medium text-sm xs:text-base w-full xs:w-auto text-center transition-all duration-300 hover:scale-105"
              >
                ← Back to Home
              </Link>
              <Link
                to="/projects"
                className="rounded-full border border-white/20 px-5 xs:px-6 sm:px-7 py-2 xs:py-2.5 sm:py-3 text-white font-medium text-sm xs:text-base hover:bg-white/10 transition-all duration-300 hover:scale-105 w-full xs:w-auto text-center"
              >
                View Projects
              </Link>
            </motion.div>
            
            {/* Smaller easter egg text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-xs sm:text-sm text-white/40 max-w-md mx-auto px-4"
            >
              🍝 Fun fact: This 404 page loads faster than most websites' homepages!
            </motion.p>
          </motion.div>
        </div>
        
        <Footer />
      </main>
    </>
  );
}
