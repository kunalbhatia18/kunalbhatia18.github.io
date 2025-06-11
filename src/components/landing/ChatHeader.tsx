import { motion } from 'framer-motion';

export function ChatHeader() {
  return (
    <div className="relative border-b border-white/5 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6"
         style={{
           background: `
             linear-gradient(to bottom, 
               rgba(255, 255, 255, 0.03) 0%, 
               rgba(255, 255, 255, 0.01) 100%
             )
           `,
           backdropFilter: 'blur(6px)' // Reduced from 8px
         }}>
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
      
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white/95 truncate">Interactive AI Demo</h3>
          </div>
          <p className="text-xs sm:text-sm text-white/50 truncate">Ask anything about Kunal Bhatia • ML Engineer</p>
        </div>
        <motion.div 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.9, 1, 0.9]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative px-2 py-1 text-xs font-bold rounded-full shrink-0 ml-2"
          style={{
            background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.9) 100%)',
            boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
          }}
        >
          <span className="relative z-10 text-black">LIVE</span>
          <div className="absolute inset-0 rounded-full bg-green-400/20 blur-md" />
        </motion.div>
      </div>
    </div>
  );
}
