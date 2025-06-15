import { useState, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';

// OPTIMIZED: Memoized MetricCards component
export const MetricCards = memo(() => {
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
      value: '$0.00008', 
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
          whileHover={{ 
            y: -4, 
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
          }}
          onHoverStart={() => handleHoverStart(i)}
          onHoverEnd={handleHoverEnd}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-xl sm:rounded-2xl" 
               style={{backgroundImage: `linear-gradient(to right, ${c.color.split(' ')[1]}, ${c.color.split(' ')[3]})`}} />
          <div className="relative rounded-xl sm:rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md px-2 py-3 sm:px-4 sm:py-6 text-center hover:border-white/20 transition-colors duration-300">
            {hoveredCard === i ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
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
