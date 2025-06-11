import { useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  'What\'s Kunal\'s ML expertise?',
  'Tell me about latency optimizations',
  'Show me technical achievements',
  'Try typing "coffee" or "konami" 😉',
] as const;

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (query: string) => void;
  loading: boolean;
  showSuggestions: boolean;
}

// OPTIMIZED: Memoized suggestion button component
const SuggestionButton = memo(({ suggestion, index, onSuggestionClick }: {
  suggestion: string;
  index: number;
  onSuggestionClick: (suggestion: string) => void;
}) => {
  const handleClick = useCallback(() => {
    onSuggestionClick(suggestion);
  }, [suggestion, onSuggestionClick]);

  const buttonStyle = useMemo(() => ({
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
    backdropFilter: 'blur(6px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontWeight: '500',
    letterSpacing: '0.01em'
  }), []);

  const animation = useMemo(() => ({
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: index * 0.1 }
  }), [index]);

  return (
    <motion.button 
      key={suggestion}
      {...animation}
      onClick={handleClick}
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className="relative whitespace-nowrap rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/75 transition-all duration-200 group overflow-hidden shrink-0 hover:text-white"
      style={buttonStyle}
    >
      <span className="relative z-10">{suggestion}</span>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/15 to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
    </motion.button>
  );
});

SuggestionButton.displayName = 'SuggestionButton';

export const ChatInput = memo(({ 
  input, 
  onInputChange, 
  onSubmit, 
  loading, 
  showSuggestions
}: ChatInputProps) => {
  
  // OPTIMIZED: Memoized input area style
  const inputAreaStyle = useMemo(() => ({
    background: `
      linear-gradient(to top, 
        rgba(0, 0, 0, 0.4) 0%, 
        rgba(0, 0, 0, 0.15) 100%
      )
    `,
    backdropFilter: 'blur(4px)', // Original blur
    contain: 'layout style' // CSS containment
  }), []);

  // OPTIMIZED: Memoized form handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSubmit(input);
  }, [onSubmit, input]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  }, [onInputChange]);

  // OPTIMIZED: Memoized suggestion handler
  const handleSuggestionClick = useCallback((suggestion: string) => {
    onSubmit(suggestion);
  }, [onSubmit]);

  // OPTIMIZED: Memoized form styles
  const formStyle = useMemo(() => ({
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.04) 0%, 
        rgba(255, 255, 255, 0.02) 100%
      )
    `,
    backdropFilter: 'blur(6px)', // Original blur
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.2)'
  }), []);

  const inputStyle = useMemo(() => ({
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    letterSpacing: '0.01em',
    lineHeight: '1.5'
  }), []);

  const buttonStyle = useMemo(() => ({
    background: `
      linear-gradient(135deg, 
        rgba(99, 102, 241, 0.95) 0%, 
        rgba(139, 92, 246, 0.95) 100%
      )
    `,
    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    fontWeight: '600',
    letterSpacing: '0.025em'
  }), []);

  // OPTIMIZED: Memoized suggestions animation
  const suggestionsAnimation = useMemo(() => ({
    initial: { opacity: 0, height: 0 },
    animate: { opacity: 1, height: 'auto' },
    exit: { opacity: 0, height: 0 },
    transition: { duration: 0.3, ease: 'easeInOut' }
  }), []);

  return (
    <div className="relative p-3 sm:p-4 lg:p-6 border-t border-white/5" style={inputAreaStyle}>
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      {/* Quick suggestions - only show if no messages yet */}
      <AnimatePresence>
        {showSuggestions && (
          <motion.div
            {...suggestionsAnimation}
            className="mb-4 sm:mb-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1 h-1 bg-indigo-400 rounded-full animate-pulse" />
              <span className="text-xs text-white/50 font-medium tracking-wide">Quick start suggestions:</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-2 suggestions-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {SUGGESTIONS.map((suggestion, index) => (
                  <SuggestionButton 
                    key={suggestion}
                    suggestion={suggestion}
                    index={index}
                    onSuggestionClick={handleSuggestionClick}
                  />
                ))}
              </div>
              {/* Fade out gradient */}
              <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[rgba(5,5,15,0.95)] to-transparent pointer-events-none" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 p-2 sm:p-2.5 lg:p-3 group"
        style={formStyle}
      >
        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />
        <input 
          value={input} 
          onChange={handleInputChange} 
          placeholder="Ask me anything about Kunal's expertise..." 
          className="relative z-10 flex-grow bg-transparent px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-sm text-white placeholder-white/40 outline-none font-medium tracking-wide" 
          style={inputStyle}
          autoComplete="off"
          tabIndex={0}
        />
        <motion.button 
          disabled={loading} 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative premium-button rounded-lg sm:rounded-xl px-5 py-2.5 sm:px-6 lg:px-8 sm:py-3 text-sm sm:text-base font-semibold disabled:opacity-50 shrink-0 overflow-hidden transition-all duration-200"
          style={buttonStyle}
        >
          <span className="relative z-10 flex items-center gap-2">
            {loading ? (
              <>
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                />
                Thinking...
              </>
            ) : (
              <>
                Send
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </>
            )}
          </span>
          {/* Button shine effect */}
          <motion.div 
            className="absolute inset-0 pointer-events-none"
            animate={{
              x: ['-100%', '200%']
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity,
              repeatDelay: 3
            }}
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.3) 50%, transparent 100%)',
              transform: 'skewX(-20deg)'
            }}
          />
        </motion.button>
      </form>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';
