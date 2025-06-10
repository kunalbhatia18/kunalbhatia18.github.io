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
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-[#0a0a12] via-[#15151d] to-[#0a0a12]"
    >
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 2 === 0 
                ? 'linear-gradient(45deg, #667eea, #764ba2)' 
                : 'linear-gradient(45deg, #f093fb, #f5576c)'
            }}
            animate={{
              y: [-50, 50, -50],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        {/* Enhanced spinning gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 rounded-full relative"
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
        </motion.div>
        
        {/* Inner circle */}
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
      </div>
      
      {/* Enhanced loading text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="absolute bottom-32 text-center"
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
    </motion.div>
  );
}