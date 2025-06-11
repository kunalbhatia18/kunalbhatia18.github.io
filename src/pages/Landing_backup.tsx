import { useEffect, useRef, useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components';

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

// OPTIMIZED: Memoized MetricCards component
const MetricCards = memo(() => {
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
      value: '$0.002', 
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
          whileHover={{ y: -4, scale: 1.02 }}
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

// OPTIMIZED: Memoized ChatWidget component
const ChatWidget = memo(() => {
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
    } else if (query.includes('impressive') || query.includes('work')) {
      return 'What sets Kunal apart: he ships production systems that scale. Technical achievements include 80% cost reduction through optimization, 10× throughput improvements, and systems serving millions of users. Plus he\'s a fascinating person - marathoner, rock vocalist, and makes incredible Italian food! 🎸🏃‍♂️🍝';
    } else if (query.includes('fun') || query.includes('hobby')) {
      return 'When not optimizing ML systems, Kunal\'s a lead vocalist in a rock band, runs sub-4hr marathons, and treks the Himalayas! Also an excellent cook specializing in Italian cuisine. He brings the same precision and passion to everything - whether it\'s debugging production systems or perfecting pasta sauce! 🎸🏃‍♂️';
    } else if (query.includes('coffee') || query.includes('caffeine')) {
      return 'Fun fact: Kunal\'s code quality is directly proportional to his coffee intake! ☕ He\'s powered by espresso and has been known to debug complex ML pipelines at 2 AM with nothing but a double shot and sheer determination. Pro tip: Never schedule meetings before his morning coffee! 😄';
    } else if (query.includes('pizza') || query.includes('food')) {
      return 'Plot twist: Kunal makes better pasta than most Italian restaurants! 🍝 He approaches cooking like he approaches ML - precise measurements, perfect timing, and lots of experimentation. His carbonara has been known to make people forget about production bugs entirely!';
    } else if (query.includes('bug') || query.includes('debug')) {
      return 'Kunal\'s debugging superpower: he talks to bugs like they\'re old friends. "Hey there, little race condition, what are you doing here?" 🐛 His rubber duck collection has seen some serious therapy sessions. Current record: 73 hours debugging a single character typo (we don\'t talk about that one).';
    } else if (query.includes('ai') || query.includes('robot')) {
      return 'Kunal builds AI so good, even other AIs are impressed! 🤖 This chat bot you\'re talking to? Totally built by him. It\'s basically having a conversation with his digital twin, minus the coffee addiction and pasta obsession.';
    } else if (query.includes('secret') || query.includes('easter egg')) {
      return 'Shhh! 🤫 You found a secret! Kunal hides easter eggs in all his code. Legend says there\'s a hidden Rick Roll somewhere in his ML pipeline. Try typing "konami" or "dance" for more surprises! (But don\'t tell anyone I told you)';
    } else if (query.includes('konami') || query.includes('↑↑↓↓←→←→')) {
      return '🎮 KONAMI CODE ACTIVATED! 🎮 You\'ve unlocked the secret developer mode! Kunal\'s childhood dream was to program video games, and he still adds cheat codes to everything he builds. You just earned 30 extra lives and infinite coffee! ☕✨';
    } else if (query.includes('dance') || query.includes('🕺')) {
      return '🕺💃 Dance party initiated! 💃🕺 Kunal\'s secret productivity hack: he codes to music and occasionally breaks into spontaneous dance during compile time. His teammates have learned to just roll with it. Current favorite coding playlist: 80s rock mixed with lo-fi beats!';
    } else if (query.includes('meme') || query.includes('funny')) {
      return 'Kunal\'s sense of humor is like his code - well-structured with perfect timing! 😂 He\'s been known to name variables things like "thisVariableIsDefinitelyNotABug" and leaves comments like "// If this breaks, I was never here". His git commits are legendary!';
    } else if (query.includes('cat') || query.includes('dog')) {
      return 'Kunal is definitely a dog person! 🐕 He believes dogs are like good code - loyal, reliable, and they always come when you call them (unlike APIs sometimes). Fun fact: he names his ML models after dog breeds. Project "Golden Retriever" had the best fetch accuracy!';
    } else if (query.includes('weather') || query.includes('rain')) {
      return 'Kunal\'s productivity is inversely proportional to how nice the weather is! ☀️ Perfect sunny day? Time to go hiking. Rainy day? Perfect for coding marathons with hot coffee. Bangalore weather is basically designed for developers!';
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

  // OPTIMIZED: Memoized chat window styles
  const chatWindowStyle = useMemo(() => ({
    background: `
      linear-gradient(135deg, 
        rgba(15, 15, 35, 0.8) 0%, 
        rgba(10, 10, 25, 0.9) 50%,
        rgba(5, 5, 15, 0.95) 100%
      ),
      radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.03) 0%, transparent 60%),
      radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.02) 0%, transparent 50%)
    `,
    backdropFilter: 'blur(20px) saturate(1.5)', // Reduced from 30px for performance
    boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.03),
      0 25px 50px -12px rgba(0, 0, 0, 0.7),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.05),
      inset 0 -1px 0 0 rgba(255, 255, 255, 0.02)
    `,
    height: 'clamp(500px, 70vh, 700px)', // Much larger!
    minHeight: '500px', // Increased minimum
    maxHeight: '90vh'
  }), []);

  // OPTIMIZED: Memoized input area style
  const inputAreaStyle = useMemo(() => ({
    background: `
      linear-gradient(to top, 
        rgba(0, 0, 0, 0.3) 0%, 
        rgba(0, 0, 0, 0.1) 100%
      )
    `,
    backdropFilter: 'blur(4px)' // Reduced from 6px for performance
  }), []);

  return (
    <div className="relative">
      {/* OPTIMIZED: Simplified spotlight effect */}
      <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-indigo-500/8 via-purple-500/8 to-pink-500/8 blur-[30px] sm:blur-[40px] opacity-60" />

      {/* OPTIMIZED: Simplified outer glow */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl">
        <motion.div 
          className="absolute inset-0 rounded-2xl sm:rounded-3xl"
          animate={{
            boxShadow: [
              '0 0 60px rgba(99, 102, 241, 0.2), 0 0 120px rgba(99, 102, 241, 0.1)',
              '0 0 60px rgba(139, 69, 195, 0.2), 0 0 120px rgba(139, 69, 195, 0.1)',
              '0 0 60px rgba(99, 102, 241, 0.2), 0 0 120px rgba(99, 102, 241, 0.1)'
            ]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
        }}
        whileHover={{ 
          y: -4,
          transition: { duration: 0.3, ease: "easeOut" }
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        id="chat" 
        className="relative flex flex-col rounded-2xl sm:rounded-3xl backdrop-blur-2xl shadow-2xl overflow-hidden group"
        style={chatWindowStyle}
      >
        {/* OPTIMIZED: Simplified animated border */}
        <motion.div 
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
          animate={{
            boxShadow: [
              '0 0 0 1px rgba(99, 102, 241, 0.05), 0 0 30px rgba(99, 102, 241, 0.04)',
              '0 0 0 1px rgba(139, 69, 195, 0.05), 0 0 30px rgba(139, 69, 195, 0.04)',
              '0 0 0 1px rgba(99, 102, 241, 0.05), 0 0 30px rgba(99, 102, 241, 0.04)'
            ]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut"
          }}
        />
        
        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Header */}
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
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.9, 1, 0.9]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative px-2 py-1 text-xs font-bold rounded-full shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.9) 0%, rgba(22, 163, 74, 0.9) 100%)',
                      boxShadow: '0 0 20px rgba(34, 197, 94, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    <span className="relative z-10 text-black">LIVE</span>
                    <div className="absolute inset-0 rounded-full bg-green-400/20 blur-md" />
                  </motion.div>
                </div>
                <p className="text-xs sm:text-sm text-white/50 truncate">Ask anything about Kunal Bhatia • ML Engineer</p>
              </div>
              <div className="relative w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center shrink-0 ml-2">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" />
                <div className="absolute inset-0.5 bg-black/50 rounded-full" />
                <span className="relative text-xs sm:text-sm lg:text-base z-10">✨</span>
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
                <div className={`relative max-w-[90%] sm:max-w-[85%] rounded-lg sm:rounded-xl lg:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3`}
                     style={{
                       background: m.role === 'user'
                         ? `linear-gradient(135deg, 
                             rgba(99, 102, 241, 0.95) 0%, 
                             rgba(79, 70, 229, 0.95) 100%
                           )`
                         : `linear-gradient(135deg, 
                             rgba(255, 255, 255, 0.08) 0%, 
                             rgba(255, 255, 255, 0.05) 100%
                           )`,
                       backdropFilter: m.role === 'assistant' ? 'blur(4px)' : 'none', // Reduced blur
                       border: m.role === 'assistant' ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                       boxShadow: m.role === 'user' 
                         ? '0 4px 12px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                         : 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                     }}>
                  <div className={`text-sm sm:text-base lg:text-base leading-relaxed ${
                    m.role === 'user' ? 'text-white' : 'text-white/90'
                  }`}>{m.content || '…'}</div>
                  {/* Message shine effect */}
                  {m.role === 'user' && (
                    <motion.div 
                      className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl pointer-events-none"
                      initial={{ opacity: 0, x: '-100%' }}
                      animate={{ opacity: [0, 0.3, 0], x: ['0%', '200%'] }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      style={{
                        background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.2) 50%, transparent 100%)',
                        transform: 'skewX(-20deg)'
                      }}
                    />
                  )}
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
                    className="relative w-2 h-2 sm:w-2.5 sm:h-2.5"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-500 rounded-full" />
                    <div className="absolute inset-0 bg-indigo-400 rounded-full blur-sm opacity-50" />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          {/* Input area */}
          <div className="relative p-3 sm:p-4 lg:p-6 border-t border-white/5" style={inputAreaStyle}>
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
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
                        className="relative whitespace-nowrap rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-white/70 transition-all duration-200 group overflow-hidden shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
                          backdropFilter: 'blur(2px)'
                        }}
                      >
                        <span className="relative z-10">{s}</span>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              style={{
                background: `
                  linear-gradient(135deg, 
                    rgba(255, 255, 255, 0.04) 0%, 
                    rgba(255, 255, 255, 0.02) 100%
                  )
                `,
                backdropFilter: 'blur(4px)', // Reduced blur
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 4px 12px rgba(0, 0, 0, 0.2)'
              }}
            >
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-xl pointer-events-none" />
              <input 
                value={inp} 
                onChange={handleInputChange} 
                placeholder="Ask about technical expertise..." 
                className="relative z-10 flex-grow bg-transparent px-3 sm:px-4 lg:px-5 py-2 sm:py-2.5 text-sm sm:text-base text-white placeholder-white/50 outline-none" 
                autoComplete="off"
                tabIndex={0}
              />
              <motion.button 
                type="button" 
                onClick={startVoice} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative rounded-lg sm:rounded-xl p-1.5 sm:p-2 transition-all duration-200 shrink-0 group/voice"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span className="relative z-10 text-xs sm:text-sm">🎙️</span>
                <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-white/10 opacity-0 group-hover/voice:opacity-100 transition-opacity duration-200" />
              </motion.button>
              <motion.button 
                disabled={loading} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative premium-button rounded-lg sm:rounded-xl px-4 py-2 sm:px-5 lg:px-7 sm:py-2.5 text-sm sm:text-base font-semibold disabled:opacity-50 shrink-0 overflow-hidden"
                style={{
                  background: `
                    linear-gradient(135deg, 
                      rgba(99, 102, 241, 0.9) 0%, 
                      rgba(139, 92, 246, 0.9) 100%
                    )
                  `,
                  boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                <span className="relative z-10">{loading ? '...' : 'Send'}</span>
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
        </div>
      </motion.div>
    </div>
  );
});

ChatWidget.displayName = 'ChatWidget';

// OPTIMIZED: Memoized background layers components
const BackgroundLayers = memo(() => {
  // OPTIMIZED: Reduced particle count and simplified animations
  const particles = useMemo(() => Array.from({ length: 6 }), []); // Reduced from 9
  const accentParticles = useMemo(() => Array.from({ length: 3 }), []); // Reduced from 4

  return (
    <>
      {/* Side gradients */}
      <div className="pointer-events-none fixed inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-10 hidden xl:block" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-24 lg:w-32 bg-gradient-to-l from-black/40 via-black/20 to-transparent z-10 hidden xl:block" />
      
      {/* Base background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#0a0a12]" />
      
      {/* OPTIMIZED: Simplified animated gradients */}
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-19"
        animate={{
          background: [
            'radial-gradient(ellipse_at_center,#15151d_0%,#0f0e17_40%,#0a0a12_80%)',
            'radial-gradient(ellipse_at_center,#1a0f1f_0%,#0f0e17_40%,#0a0a12_80%)',
            'radial-gradient(ellipse_at_center,#15151d_0%,#0f0e17_40%,#0a0a12_80%)',
          ]
        }}
        transition={{ duration: 16, repeat: Infinity }} // Slower animation
      />
      
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-18"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(99,102,241,0.03) 0%, transparent 50%, rgba(139,69,195,0.03) 100%)',
            'linear-gradient(225deg, rgba(139,69,195,0.03) 0%, transparent 50%, rgba(244,114,182,0.03) 100%)',
            'linear-gradient(45deg, rgba(99,102,241,0.03) 0%, transparent 50%, rgba(139,69,195,0.03) 100%)',
          ]
        }}
        transition={{ duration: 12, repeat: Infinity }} // Slower animation
      />
      
      {/* OPTIMIZED: Simplified spotlight */}
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-17"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(139,69,195,0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 50%)',
          ]
        }}
        transition={{ duration: 20, repeat: Infinity }} // Slower animation
      />
      
      {/* OPTIMIZED: Reduced particle system */}
      <div className="pointer-events-none fixed inset-0 -z-16">
        {/* Main particles */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full" // Reduced opacity
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: Math.random() * 0.4 + 0.1 // Reduced opacity range
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: Math.random() * 25 + 15, // Slower movement
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Accent particles */}
        {accentParticles.map((_, i) => (
          <motion.div
            key={`accent-${i}`}
            className="absolute w-2 h-2 rounded-full"
            style={{
              background: i % 3 === 0 ? 'rgba(99,102,241,0.3)' : i % 3 === 1 ? 'rgba(139,69,195,0.3)' : 'rgba(244,114,182,0.3)'
            }}
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: 0
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 30 + 20, // Slower animation
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
});

BackgroundLayers.displayName = 'BackgroundLayers';

export default function Landing() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Easter egg for developers - optimized to run only once
    const hasShownEasterEgg = sessionStorage.getItem('devEasterEggShown');
    if (!hasShownEasterEgg) {
      console.log('%c🚀 Hey there, curious developer! 👋', 'font-size: 24px; font-weight: bold; color: #667eea;');
      console.log('%cKunal here! Since you\'re checking out the console, you\'re clearly a person of culture! 🧐', 'font-size: 16px; color: #764ba2;');
      console.log('%c• This site is built with React 18 + TypeScript + Vite 6 + Tailwind CSS', 'color: #10b981;');
      console.log('%c• Every animation is GPU-accelerated for buttery smooth 60fps', 'color: #10b981;');
      console.log('%c• Try typing "konami" or "coffee" in the chat widget! ☕', 'color: #f59e0b;');
      console.log('%c• Fun fact: Variable names in this codebase include "ticking", "mv", and "iv" (I\'m a minimalist) 😄', 'color: #8b5cf6;');
      console.log('%cWant to chat about the tech stack? Hit me up: kunal@kunalis.me', 'font-size: 14px; color: #ef4444;');
      console.log('%c\n💡 Pro tip: Press Ctrl+Shift+I to close this and pretend you were never here 😉', 'font-style: italic; color: #6b7280;');
      sessionStorage.setItem('devEasterEggShown', 'true');
    }
  }, []);
  
  // OPTIMIZED: Simplified keyboard easter egg
  useEffect(() => {
    let sequence = '';
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence += e.key.toLowerCase();
      if (sequence.length > 10) sequence = sequence.slice(-10);
      
      if (sequence.includes('awesome')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        const timer = setTimeout(() => { document.body.style.filter = 'none'; }, 2000);
        console.log('🌈 Rainbow mode activated! Kunal approves of your typing skills!');
        return () => clearTimeout(timer);
      }
      
      if (sequence.includes('pasta')) {
        document.body.style.animation = 'shake 0.5s';
        const timer = setTimeout(() => { document.body.style.animation = ''; }, 500);
        console.log('🍝 Mamma mia! You triggered the pasta protocol!');
        return () => clearTimeout(timer);
      }
    };
    
    window.addEventListener('keydown', handleKeyPress, { passive: true }); // Passive listener for performance
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  // OPTIMIZED: Memoized gradient text animation style
  const gradientTextStyle = useMemo(() => ({
    backgroundSize: '200% 200%'
  }), []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white font-inter">
      <BackgroundLayers />
      <Navbar />

      {/* Hero section */}
      <section className="mx-auto max-w-4xl text-center pt-24 sm:pt-32 lg:pt-40 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
        >
          <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8 overflow-visible">
            I build AI products that feel like{' '}
            <span className="block sm:inline">
              <motion.span 
                className="gradient-text inline-block"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 3, repeat: Infinity }}
                style={gradientTextStyle}
              >
                magic
              </motion.span>.
            </span>
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-white/70 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto"
          >
            Engineer × Designer × Builder
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-indigo-400 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Try my AI assistant below (it's actually pretty smart!) ↓
          </motion.p>
        </motion.div>
      </section>

      {/* Chat Widget section */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Showcase header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-full border border-indigo-500/30 mb-8 sm:mb-10 shadow-lg"
              style={{
                background: 'linear-gradient(45deg,rgb(99, 102, 241, 0.4) 0%,rgb(139, 92, 246, 0.3) 50%',  
                boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
              }}
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></span>
              <span className="text-xs sm:text-sm font-semibold text-white">Live AI Assistant Demo</span>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-white/60 text-xs sm:text-sm max-w-md mx-auto px-4"
            >
              This isn't just a portfolio piece — it's a working AI that knows everything about my experience. Go ahead, test it!
            </motion.p>
          </div>
          
          <ChatWidget />
          
          {/* Call to action */}
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
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}