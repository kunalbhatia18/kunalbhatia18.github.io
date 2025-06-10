import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from '../components';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'What\'s Kunal\'s ML expertise?',
  'Tell me about his latency optimizations',
  'Show me his technical achievements',
  'Try typing "coffee" or "konami" 😉',
] as const;

function MetricCards() {
  const cards = [
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
  ];
  
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  
  return (
    <div className="mt-8 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-6 max-w-lg mx-auto px-4">
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 + i * 0.1 }}
          whileHover={{ y: -4, scale: 1.02 }}
          onHoverStart={() => setHoveredCard(i)}
          onHoverEnd={() => setHoveredCard(null)}
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
}

function ChatWidget() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [inp, setInp] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Auto-scroll chat to bottom when new messages arrive
  useEffect(() => { 
    if (messagesRef.current) {
      requestAnimationFrame(() => {
        if (messagesRef.current) {
          messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
        }
      });
    }
  }, [msgs]);
  
  useEffect(() => { 
    setTimeout(() => {
      setMsgs([{
        id: 'intro',
        role: 'assistant',
        content: 'Hey! I\'m Kunal\'s AI assistant. Ask me anything about his technical expertise, achievements, or impressive projects! 🚀'
      }]);
    }, 500);
  }, []);

  function stream(id: string, text: string) {
    setIsTyping(true);
    let i = 0;
    const iv = setInterval(() => {
      setMsgs(p => p.map(m => m.id === id ? { ...m, content: text.slice(0, i) } : m));
      i += 3;
      if (i >= text.length) { 
        clearInterval(iv); 
        setLoading(false);
        setIsTyping(false);
      }
    }, 20);
  }

  function ask(q: string) {
    if (!q.trim()) return;
    
    const user: Msg = { id: crypto.randomUUID(), role: 'user', content: q };
    const botId = crypto.randomUUID();
    setMsgs(p => [...p, user, { id: botId, role: 'assistant', content: '' }]);
    setInp(''); 
    setLoading(true);
    
    // Different responses based on question
    let response = 'Kunal has 4+ years shipping production ML at scale. He\'s optimized inference latency by 10×, served 3M+ users, and built voice-first AI that processes 60 emails/minute. His technical approach focuses on shipping fast and scaling systems efficiently!';
    
    if (q.toLowerCase().includes('experience') || q.toLowerCase().includes('ml') || q.toLowerCase().includes('expertise')) {
      response = 'Kunal brings 4+ years of production ML engineering expertise. He\'s architected everything from 35ms inference gateways to real-time fraud detection pipelines. Led technical teams at startups and shipped systems serving millions. Deep understanding of both technical challenges and rapid iteration needed in high-growth environments!';
    } else if (q.toLowerCase().includes('latency') || q.toLowerCase().includes('optimization')) {
      response = 'His technical masterpiece: 35ms end-to-end inference for a 500-token completion! Achieved through aggressive caching strategies, ONNX optimization, and edge deployment architecture. He\'s obsessed with performance optimization and has documented techniques for shaving critical milliseconds from ML systems! 🚀';
    } else if (q.toLowerCase().includes('project') || q.toLowerCase().includes('achievement')) {
      response = 'Technical highlights: (1) Voice Gmail Copilot - 60 emails/min processing with natural speech recognition, (2) Project Quicksilver - 35ms inference serving 10M+ requests daily, (3) Swanari Dashboard - real-time data visualization for 3M+ users across 180 countries. All production-grade, all optimized for scale!';
    } else if (q.toLowerCase().includes('impressive') || q.toLowerCase().includes('work')) {
      response = 'What sets Kunal apart: he ships production systems that scale. Technical achievements include 80% cost reduction through optimization, 10× throughput improvements, and systems serving millions of users. Plus he\'s a fascinating person - marathoner, rock vocalist, and makes incredible Italian food! 🎸🏃‍♂️🍝';
    } else if (q.toLowerCase().includes('fun') || q.toLowerCase().includes('hobby')) {
      response = 'When not optimizing ML systems, Kunal\'s a lead vocalist in a rock band, runs sub-4hr marathons, and treks the Himalayas! Also an excellent cook specializing in Italian cuisine. He brings the same precision and passion to everything - whether it\'s debugging production systems or perfecting pasta sauce! 🎸🏃‍♂️';
    } else if (q.toLowerCase().includes('coffee') || q.toLowerCase().includes('caffeine')) {
      response = 'Fun fact: Kunal\'s code quality is directly proportional to his coffee intake! ☕ He\'s powered by espresso and has been known to debug complex ML pipelines at 2 AM with nothing but a double shot and sheer determination. Pro tip: Never schedule meetings before his morning coffee! 😄';
    } else if (q.toLowerCase().includes('pizza') || q.toLowerCase().includes('food')) {
      response = 'Plot twist: Kunal makes better pasta than most Italian restaurants! 🍝 He approaches cooking like he approaches ML - precise measurements, perfect timing, and lots of experimentation. His carbonara has been known to make people forget about production bugs entirely!';
    } else if (q.toLowerCase().includes('bug') || q.toLowerCase().includes('debug')) {
      response = 'Kunal\'s debugging superpower: he talks to bugs like they\'re old friends. "Hey there, little race condition, what are you doing here?" 🐛 His rubber duck collection has seen some serious therapy sessions. Current record: 73 hours debugging a single character typo (we don\'t talk about that one).';
    } else if (q.toLowerCase().includes('ai') || q.toLowerCase().includes('robot')) {
      response = 'Kunal builds AI so good, even other AIs are impressed! 🤖 This chat bot you\'re talking to? Totally built by him. It\'s basically having a conversation with his digital twin, minus the coffee addiction and pasta obsession.';
    } else if (q.toLowerCase().includes('secret') || q.toLowerCase().includes('easter egg')) {
      response = 'Shhh! 🤫 You found a secret! Kunal hides easter eggs in all his code. Legend says there\'s a hidden Rick Roll somewhere in his ML pipeline. Try typing "konami" or "dance" for more surprises! (But don\'t tell anyone I told you)';
    } else if (q.toLowerCase().includes('konami') || q.toLowerCase().includes('↑↑↓↓←→←→')) {
      response = '🎮 KONAMI CODE ACTIVATED! 🎮 You\'ve unlocked the secret developer mode! Kunal\'s childhood dream was to program video games, and he still adds cheat codes to everything he builds. You just earned 30 extra lives and infinite coffee! ☕✨';
    } else if (q.toLowerCase().includes('dance') || q.toLowerCase().includes('🕺')) {
      response = '🕺💃 Dance party initiated! 💃🕺 Kunal\'s secret productivity hack: he codes to music and occasionally breaks into spontaneous dance during compile time. His teammates have learned to just roll with it. Current favorite coding playlist: 80s rock mixed with lo-fi beats!';
    } else if (q.toLowerCase().includes('meme') || q.toLowerCase().includes('funny')) {
      response = 'Kunal\'s sense of humor is like his code - well-structured with perfect timing! 😂 He\'s been known to name variables things like "thisVariableIsDefinitelyNotABug" and leaves comments like "// If this breaks, I was never here". His git commits are legendary!';
    } else if (q.toLowerCase().includes('cat') || q.toLowerCase().includes('dog')) {
      response = 'Kunal is definitely a dog person! 🐕 He believes dogs are like good code - loyal, reliable, and they always come when you call them (unlike APIs sometimes). Fun fact: he names his ML models after dog breeds. Project "Golden Retriever" had the best fetch accuracy!';
    } else if (q.toLowerCase().includes('weather') || q.toLowerCase().includes('rain')) {
      response = 'Kunal\'s productivity is inversely proportional to how nice the weather is! ☀️ Perfect sunny day? Time to go hiking. Rainy day? Perfect for coding marathons with hot coffee. Bangalore weather is basically designed for developers!';
    }
    
    setTimeout(() => stream(botId, response), 500);
  }

  function startVoice() {
    // @ts-ignore
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;
    const rec = new SR(); 
    rec.lang = 'en-US';
    rec.onresult = (e: any) => ask(e.results[0][0].transcript);
    rec.start();
  }

  return (
    <div className="relative">
      {/* Simplified spotlight effect */}
      <div className="absolute -inset-4 sm:-inset-8 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 blur-[40px] sm:blur-[60px] opacity-40" />

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
        className="relative flex flex-col rounded-2xl sm:rounded-3xl border border-white/20 bg-black/30 backdrop-blur-xl shadow-2xl overflow-hidden group"
        style={{
          background: 'linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
          height: 'clamp(350px, 75vh, 600px)',
          minHeight: '350px',
          maxHeight: '90vh'
        }}
      >
        {/* Animated border glow effect */}
        <motion.div 
          className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
          initial={{ 
            boxShadow: '0 0 0 1px rgba(99, 102, 241, 0.2), 0 0 20px rgba(99, 102, 241, 0.1)'
          }}
          whileHover={{
            boxShadow: [
              '0 0 0 1px rgba(99, 102, 241, 0.4), 0 0 30px rgba(99, 102, 241, 0.2)',
              '0 0 0 1px rgba(139, 69, 195, 0.4), 0 0 30px rgba(139, 69, 195, 0.2)',
              '0 0 0 1px rgba(99, 102, 241, 0.4), 0 0 30px rgba(99, 102, 241, 0.2)'
            ]
          }}
          animate={{
            boxShadow: [
              '0 0 0 1px rgba(99, 102, 241, 0.2), 0 0 20px rgba(99, 102, 241, 0.1)',
              '0 0 0 1px rgba(139, 69, 195, 0.2), 0 0 20px rgba(139, 69, 195, 0.1)',
              '0 0 0 1px rgba(99, 102, 241, 0.2), 0 0 20px rgba(99, 102, 241, 0.1)'
            ]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut",
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        {/* Content */}
        <div className="flex flex-col h-full">
          {/* Responsive header */}
          <div className="border-b border-white/10 px-3 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white truncate">Interactive AI Demo</h3>
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="px-2 py-1 bg-green-500 text-black text-xs font-bold rounded-full shrink-0"
                  >
                    LIVE
                  </motion.div>
                </div>
                <p className="text-xs sm:text-sm text-white/60 truncate">Ask anything about Kunal Bhatia • ML Engineer</p>
              </div>
              <div className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shrink-0 ml-2">
                <span className="text-xs sm:text-sm lg:text-base">🤖</span>
              </div>
            </div>
          </div>
          
          {/* Responsive messages area */}
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
                <div className={`max-w-[90%] sm:max-w-[85%] rounded-lg sm:rounded-xl lg:rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 ${
                  m.role === 'user' 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-white/10 backdrop-blur-sm text-white/95 border border-white/10'
                }`}>
                  <div className="text-xs sm:text-sm lg:text-sm leading-relaxed">{m.content || '…'}</div>
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <div className="flex gap-1 px-3 sm:px-4 lg:px-6">
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
                    className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-400 rounded-full"
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Responsive input area */}
          <div className="p-3 sm:p-4 lg:p-6 border-t border-white/10 bg-black/20">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {SUGGESTIONS.map(s => (
                <motion.button 
                  key={s} 
                  onClick={() => ask(s)} 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-2.5 py-1.5 sm:px-3 lg:px-4 sm:py-2 text-[10px] sm:text-xs font-medium text-white/80 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  {s}
                </motion.button>
              ))}
            </div>
            <form 
              onSubmit={e => { 
                e.preventDefault();
                e.stopPropagation();
                ask(inp); 
              }} 
              className="flex items-center gap-2 sm:gap-3 rounded-xl sm:rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm p-2 sm:p-2.5 lg:p-3"
            >
              <input 
                value={inp} 
                onChange={e => setInp(e.target.value)} 
                placeholder="Ask about technical expertise..." 
                className="flex-grow bg-transparent px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-white placeholder-white/50 outline-none" 
              />
              <motion.button 
                type="button" 
                onClick={startVoice} 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-lg sm:rounded-xl p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 transition-all duration-200 shrink-0"
              >
                <span className="text-xs sm:text-sm">🎙️</span>
              </motion.button>
              <motion.button 
                disabled={loading} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="premium-button rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 lg:px-6 sm:py-2 text-xs sm:text-sm font-semibold disabled:opacity-50 shrink-0"
              >
                Send
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Landing() {
  // Simplified useEffect - remove complex gradient cycling
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Easter egg for developers 🥚 (only run once)
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
  
  // REMOVED: Cursor tracking that was causing white flickering elements
  // This was setting CSS custom properties that created unwanted visual artifacts
  
  // Fun keyboard easter egg 🎹
  useEffect(() => {
    let sequence = '';
    const handleKeyPress = (e: KeyboardEvent) => {
      sequence += e.key.toLowerCase();
      if (sequence.length > 10) sequence = sequence.slice(-10);
      
      if (sequence.includes('awesome')) {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => { document.body.style.filter = 'none'; }, 2000);
        console.log('🌈 Rainbow mode activated! Kunal approves of your typing skills!');
      }
      
      if (sequence.includes('pasta')) {
        // Shake the page slightly
        document.body.style.animation = 'shake 0.5s';
        setTimeout(() => { document.body.style.animation = ''; }, 500);
        console.log('🍝 Mamma mia! You triggered the pasta protocol!');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden text-white font-inter">
      {/* Side gradients ONLY on large screens - NO mobile interference */}
      <div className="pointer-events-none fixed inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-black/30 via-black/15 to-transparent z-10 hidden xl:block" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-24 lg:w-32 bg-gradient-to-l from-black/30 via-black/15 to-transparent z-10 hidden xl:block" />
      
      {/* Simplified animated backgrounds */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#0a0a12]" />
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-10"
        animate={{
          background: [
            'radial-gradient(ellipse_at_center,#15151d_0%,#0f0e17_40%,#0a0a12_80%)',
            'radial-gradient(ellipse_at_center,#1a0f1f_0%,#0f0e17_40%,#0a0a12_80%)',
            'radial-gradient(ellipse_at_center,#0f141d_0%,#0f0e17_40%,#0a0a12_80%)',
          ]
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />
      
      {/* Removed floating particles to fix white smudge dancing issue */}

      <Navbar />

      {/* FIXED Hero section - Consistent responsive typography */}
      <section className="mx-auto max-w-4xl text-center pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8">
            I build AI products that feel like{' '}
            <motion.span 
              className="gradient-text"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              magic
            </motion.span>.
          </h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg lg:text-xl text-white/70 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto"
          >
            Engineer × Designer × Builder<br />
            <span className="text-indigo-400">Try my AI assistant below (it's actually smart!) ↓</span>
          </motion.p>
        </motion.div>
      </section>

      {/* FIXED Chat Widget section - Fully responsive */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          {/* Simplified showcase header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/20 mb-4 sm:mb-6"
            >
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium text-white/90">Live AI Assistant Demo</span>
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
          
          {/* Spaced out call to action - Responsive */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-center mt-12 sm:mt-16 lg:mt-20"
          >
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 px-4">
              <motion.div 
                className="premium-button rounded-full px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-4 text-white font-semibold text-sm sm:text-base lg:text-lg shadow-lg"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/projects">View My Work →</Link>
              </motion.div>
              <motion.a 
                href="mailto:kunal@kunalis.me"
                className="rounded-full border border-white/30 bg-white/5 backdrop-blur-sm px-6 py-2.5 sm:px-8 sm:py-3 lg:px-10 lg:py-4 text-white font-semibold text-sm sm:text-base lg:text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Get In Touch
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✉️
                  </motion.span>
                </span>
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