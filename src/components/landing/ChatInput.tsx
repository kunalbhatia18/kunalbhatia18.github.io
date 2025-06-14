import { useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SUGGESTIONS = [
  'What\'s Kunal\'s ML expertise?',
  'Tell me about latency optimizations',
  'Show me technical achievements',
  'Try typing "coffee" ☕',
] as const;

interface ChatInputProps {
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (query: string) => void;
  loading: boolean;
  showSuggestions: boolean;
}

export const ChatInput = memo(({ 
  input, 
  onInputChange, 
  onSubmit, 
  loading, 
  showSuggestions
}: ChatInputProps) => {
  
  // OPTIMIZED: Memoized input area style - backdrop filter removed for performance
  const inputAreaStyle = useMemo(() => ({
    background: `
      linear-gradient(to top, 
        rgba(0, 0, 0, 0.4) 0%, 
        rgba(0, 0, 0, 0.15) 100%
      )
    `,
    // backdropFilter removed for performance
    contain: 'layout style'
  }), []);

  // Form submit handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !loading) {
      onSubmit(input);
    }
  }, [input, loading, onSubmit]);

  // Input change handler
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
  }, [onInputChange]);

  // Suggestion click handler
  const handleSuggestionClick = useCallback((suggestion: string) => {
    onSubmit(suggestion);
  }, [onSubmit]);

  // OPTIMIZED: Memoized form styles - backdrop filter removed for performance
  const formStyle = useMemo(() => ({
    background: `
      linear-gradient(135deg, 
        rgba(255, 255, 255, 0.04) 0%, 
        rgba(255, 255, 255, 0.02) 100%
      )
    `,
    // backdropFilter removed for performance
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.2)'
  }), []);

  const inputStyle = useMemo(() => ({
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    letterSpacing: '0.01em',
    lineHeight: '1.5',
    WebkitAppearance: 'none' as const,
    fontSize: '14px' // Smaller font size for better mobile experience
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
    letterSpacing: '0.025em',
    WebkitTapHighlightColor: 'transparent'
  }), []);

  const suggestionButtonStyle = useMemo(() => ({
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
    // backdropFilter removed for performance
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    fontWeight: '500',
    letterSpacing: '0.01em',
    WebkitTapHighlightColor: 'transparent'
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
              <div className="w-1 h-1 bg-indigo-400 rounded-full" />
              <span className="text-xs text-white/50 font-medium tracking-wide">Quick start suggestions:</span>
              <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
            </div>
            <div className="relative">
              <div className="flex gap-2 overflow-x-auto pb-2 suggestions-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {SUGGESTIONS.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="relative whitespace-nowrap rounded-full border border-white/15 px-4 py-2 text-xs font-medium text-white/75 transition-all duration-200 group overflow-hidden shrink-0 hover:text-white hover:scale-105 active:scale-95"
                    style={suggestionButtonStyle}
                  >
                    <span className="relative z-10">{suggestion}</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/15 to-purple-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                  </motion.button>
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
        <button 
          type="submit"
          disabled={loading} 
          className="relative rounded-lg sm:rounded-xl p-2.5 sm:p-3 disabled:opacity-50 shrink-0 flex items-center justify-center"
          style={buttonStyle}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';