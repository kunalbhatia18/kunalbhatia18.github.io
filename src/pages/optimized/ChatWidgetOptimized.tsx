import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'What\'s Kunal\'s ML expertise?',
  'Tell me about latency optimizations',
  'Show me technical achievements',
  'Try typing "coffee" or "konami" 😉',
] as const;

// OPTIMIZED: ChatWidget with performance improvements
const ChatWidgetOptimized = memo(() => {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // OPTIMIZED: Auto-scroll with better performance
  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      requestAnimationFrame(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      });
    }
  }, []);

  useEffect(scrollToBottom, [msgs, scrollToBottom]);
  
  // OPTIMIZED: Initialize with cleanup
  useEffect(() => { 
    const timer = setTimeout(() => {
      setMsgs([{
        id: 'intro',
        role: 'assistant',
        content: 'Hey! I\'m Kunal\'s AI assistant. Ask me anything about his technical expertise, achievements, or impressive projects! 🚀'
      }]);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // OPTIMIZED: Stream function with proper cleanup
  const stream = useCallback((id: string, text: string) => {
    setIsTyping(true);
    let i = 0;
    
    // Clear any existing interval
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
    }
    
    streamIntervalRef.current = setInterval(() => {
      setMsgs(prev => prev.map(m => m.id === id ? { ...m, content: text.slice(0, i) } : m));
      i += 3;
      if (i >= text.length) { 
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
        setLoading(false);
        setIsTyping(false);
      }
    }, 20);
  }, []);

  // OPTIMIZED: Cleanup intervals on unmount
  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
      }
    };
  }, []);

  // OPTIMIZED: Memoized response logic
  const getResponse = useCallback((q: string) => {
    const query = q.toLowerCase();
    
    if (query.includes('experience') || query.includes('ml') || query.includes('expertise')) {
      return 'Kunal brings 4+ years of production ML engineering expertise. He\'s architected everything from 35ms inference gateways to real-time fraud detection pipelines. Led technical teams at startups and shipped systems serving millions. Deep understanding of both technical challenges and rapid iteration needed in high-growth environments!';
    } else if (query.includes('latency') || query.includes('optimization')) {
      return 'His technical masterpiece: 35ms end-to-end inference for a 500-token completion! Achieved through aggressive caching strategies, ONNX optimization, and edge deployment architecture. He\'s obsessed with performance optimization and has documented techniques for shaving critical milliseconds from ML systems! 🚀';
    } else if (query.includes('project') || query.includes('achievement')) {
      return 'Technical highlights: (1) Voice Gmail Copilot - 60 emails/min processing with natural speech recognition, (2) Project Quicksilver - 35ms inference serving 10M+ requests daily, (3) Swanari Dashboard - real-time data visualization for 3M+ users across 180 countries. All production-grade, all optimized for scale!';
    } else if (query.includes('coffee') || query.includes('caffeine')) {
      return 'Fun fact: Kunal\'s code quality is directly proportional to his coffee intake! ☕ He\'s powered by espresso and has been known to debug complex ML pipelines at 2 AM with nothing but a double shot and sheer determination. Pro tip: Never schedule meetings before his morning coffee! 😄';
    } else if (query.includes('konami')) {
      return '🎮 KONAMI CODE ACTIVATED! 🎮 You\'ve unlocked the secret developer mode! Kunal\'s childhood dream was to program video games, and he still adds cheat codes to everything he builds. You just earned 30 extra lives and infinite coffee! ☕✨';
    }
    
    return 'Kunal has 4+ years shipping production ML at scale. He\'s optimized inference latency by 10×, served 3M+ users, and built voice-first AI that processes 60 emails/minute. His technical approach focuses on shipping fast and scaling systems efficiently!';
  }, []);

  const ask = useCallback((q: string) => {
    if (!q.trim()) return;
    
    const user: Msg = { id: crypto.randomUUID(), role: 'user', content: q };
    const botId = crypto.randomUUID();
    setMsgs(prev => [...prev, user, { id: botId, role: 'assistant', content: '' }]);
    setInp(''); 
    setLoading(true);
    
    const response = getResponse(q);
    setTimeout(() => stream(botId, response), 500);
  }, [getResponse, stream]);

  const startVoice = useCallback(() => {
    // @ts-expect-error - SpeechRecognition API may not be available in all browsers
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR(); 
    rec.lang = 'en-US';
    rec.onresult = (e: any) => ask(e.results[0][0].transcript);
    rec.start();
  }, [ask]);

  // OPTIMIZED: Memoized form handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    ask(inp);
  }, [ask, inp]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInp(e.target.value);
  }, []);

  // OPTIMIZED: Memoized suggestion handler
  const handleSuggestionClick = useCallback((suggestion: string) => {
    ask(suggestion);
  }, [ask]);

  // PERFORMANCE: Simplified styles without heavy backdrop filters
  const chatWindowStyle = useMemo(() => ({
    background: 'rgba(10, 10, 25, 0.95)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05)',
    height: 'clamp(500px, 70vh, 700px)',
    minHeight: '500px',
    maxHeight: '90vh',
    // CSS containment for better performance
    contain: 'layout style paint',
  }), []);

  return (
    <div className="relative">
      {/* PERFORMANCE: Simplified glow effect */}
      <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-2xl opacity-50" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        id="chat" 
        className="relative flex flex-col rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden group"
        style={chatWindowStyle}
      >
        {/* PERFORMANCE: Static border instead of animated */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
             style={{ border: '1px solid rgba(99, 102, 241, 0.1)' }} />
        
        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative border-b border-white/10 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6 bg-white/5">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white/95 truncate">Interactive AI Demo</h3>
                  <div className="relative px-2 py-1 text-xs font-bold rounded-full shrink-0 bg-green-500/20 text-green-400 border border-green-500/30">
                    <span className="animate-pulse">LIVE</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-white/50 truncate">Ask anything about Kunal Bhatia • ML Engineer</p>
              </div>
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shrink-0 ml-2 bg-gradient-to-r from-indigo-500 to-purple-500">
                <span className="text-xs sm:text-sm lg:text-base">✨</span>
              </div>
            </div>
          </div>
          
          {/* Messages area */}
          <div 
            ref={messagesRef}
            className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4 scrollbar-thin"
          >
            {msgs.map(m => (
              <motion.div 
                key={m.id} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >            
                <div className={`relative max-w-[90%] sm:max-w-[85%] rounded-lg sm:rounded-xl lg:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 ${
                  m.role === 'user' 
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white' 
                    : 'bg-white/10 text-white/90 border border-white/10'
                }`}>
                  <div className="text-sm sm:text-base lg:text-base leading-relaxed">
                    {m.content || '…'}
                  </div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-2 px-4 sm:px-5 lg:px-7">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 1, 0.4] 
                    }}
                    transition={{ 
                      duration: 0.8, 
                      repeat: Infinity, 
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="w-2 h-2 bg-indigo-400 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Input area */}
          <div className="relative p-3 sm:p-4 lg:p-6 border-t border-white/10 bg-black/30">
            {/* Quick suggestions - only show if no messages yet */}
            <AnimatePresence>
              {msgs.length <= 1 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="mb-4 sm:mb-5"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs text-white/40 font-medium">Quick start:</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent"></div>
                  </div>
                  <div className="relative">
                    <div className="flex gap-2 overflow-x-auto pb-2 suggestions-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                      {SUGGESTIONS.map((s, index) => (
                        <motion.button 
                          key={s} 
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => handleSuggestionClick(s)} 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 hover:bg-white/10 hover:border-white/20 shrink-0"
                        >
                          {s}
                        </motion.button>
                      ))}
                    </div>
                    <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-[rgba(10,10,25,0.95)] to-transparent pointer-events-none" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <form 
              onSubmit={handleSubmit}
              className="relative flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/10 bg-white/5 p-2 sm:p-2.5 lg:p-3 group"
            >
              <input 
                value={inp} 
                onChange={handleInputChange} 
                placeholder="Ask about technical expertise..." 
                className="flex-grow bg-transparent px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-white/50 outline-none" 
                autoComplete="off"
                tabIndex={0}
              />
              <motion.button 
                type="button" 
                onClick={startVoice} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg sm:rounded-xl p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 transition-colors duration-200 shrink-0"
              >
                <span className="text-xs sm:text-sm">🎙️</span>
              </motion.button>
              <motion.button 
                disabled={loading} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg sm:rounded-xl px-4 py-2 sm:px-5 lg:px-7 sm:py-2.5 text-sm sm:text-base font-semibold disabled:opacity-50 shrink-0 transition-all duration-200"
              >
                {loading ? '...' : 'Send'}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
});

ChatWidgetOptimized.displayName = 'ChatWidgetOptimized';

export default ChatWidgetOptimized;