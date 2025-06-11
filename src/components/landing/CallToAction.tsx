import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MetricCards } from './MetricCards';

export function CallToAction() {
  return (
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
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3), 0 3px 10px rgba(99, 102, 241, 0.2)'
          }}
        >
          <Link to="/projects" className="relative z-10 flex items-center gap-2">
            View My Work 
            <span className="text-white/90 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
          {/* Subtle hover glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
        <motion.a 
          href="mailto:kunal@kunalis.me"
          className="relative rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-5 py-2.5 sm:px-6 sm:py-3 text-white font-medium text-sm sm:text-base hover:bg-white/10 hover:border-white/30 transition-all duration-300 group"
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          style={{
            backdropFilter: 'blur(10px)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 4px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          <span className="flex items-center gap-2 relative z-10">
            Get In Touch
            <motion.span
              animate={{
                y: [0, -2, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-sm"
            >
              📩
            </motion.span>
          </span>
          {/* Subtle border glow on hover */}
          <div className="absolute inset-0 rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
      </div>
      <MetricCards />
    </motion.div>
  );
}
