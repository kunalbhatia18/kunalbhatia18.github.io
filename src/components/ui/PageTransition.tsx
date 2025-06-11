import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function PageLoader() {
  const funnyMessages = [
    'Loading magic...',
    'Compiling awesome...',
    'Downloading more RAM...',
    'Teaching AI to make coffee...',
    'Optimizing for fun...',
    'Calibrating rubber duck...',
    'Summoning digital unicorns...',
    'Loading 99 little bugs...',
    'Preparing epic experience...',
    'Caffeinating the servers...'
  ];
  
  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 0.95,
        filter: "blur(4px)"
      }}
      transition={{ 
        duration: 0.4, 
        ease: "easeInOut",
        opacity: { duration: 0.3 },
        scale: { duration: 0.4 },
        filter: { duration: 0.3 }
      }}
      className="fixed inset-0 flex items-center justify-center"
      style={{
        zIndex: 99999,
        background: 'linear-gradient(135deg, #0a0a12 0%, #15151d 50%, #0a0a12 100%)',
        width: '100vw',
        height: '100vh',
        top: 0,
        left: 0,
        position: 'fixed'
      }}
    >
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Enhanced spinning gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full relative mb-8"
          style={{
            background: 'conic-gradient(from 0deg, transparent, #667eea, #764ba2, #f093fb, transparent)',
          }}
        >
          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full animate-pulse" 
               style={{
                 background: 'conic-gradient(from 0deg, transparent, #667eea, #764ba2, #f093fb, transparent)',
                 filter: 'blur(8px)'
               }} 
          />
          
          {/* Inner dark circle to create donut effect */}
          <div className="absolute inset-3 bg-gradient-to-br from-[#0a0a12] to-[#15151d] rounded-full" />
          
          {/* Center animated dot */}
          <motion.div
            animate={{ 
              scale: [1, 1.4, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full shadow-lg" />
          </motion.div>
        </motion.div>
        
        {/* Loading text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white/70 text-lg font-medium mb-2"
          >
            {randomMessage}
          </motion.p>
          <motion.div
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sm font-semibold"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Kunal Bhatia • AI Engineer
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}