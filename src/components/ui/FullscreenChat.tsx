import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2 } from 'lucide-react';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'Tell me about Kunal\'s ML experience',
  'What\'s his fastest latency achievement?',
  'Show me his top projects',
  'Why should we hire Kunal?',
] as const;

interface FullscreenChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FullscreenChat({ isOpen, onClose }: FullscreenChatProps) {
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
    if (isOpen) {
      setTimeout(() => {
        setMsgs([{
          id: 'intro',
          role: 'assistant',
          content: 'Hey! I\'m Kunal\'s AI assistant. Ask me anything about his experience, projects, or why he\'d be perfect for your team! 🚀'
        }]);
      }, 500);
    }
  }, [isOpen]);

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
    let response = 'Great question! Kunal has 4+ years shipping production ML at scale. He\'s cut inference latency by 10×, served 3M+ users, and built voice-first AI that processes 60 emails/minute. Plus, he knows how to ship fast and scale systems!';
    
    if (q.toLowerCase().includes('experience') || q.toLowerCase().includes('ml')) {
      response = 'Kunal brings 4+ years of production ML engineering. He\'s built everything from 35ms inference gateways to real-time fraud detection pipelines. Led teams at startups and shipped to millions. He knows the startup hustle and how to build at scale!';
    } else if (q.toLowerCase().includes('latency')) {
      response = 'His crown jewel: 35ms end-to-end inference for a 500-token completion! Achieved through aggressive caching, ONNX optimization, and edge deployment. He literally wrote the book on shaving milliseconds. Your API will fly! 🚀';
    } else if (q.toLowerCase().includes('project')) {
      response = 'Top hits: (1) Voice Gmail Copilot - 60 emails/min with natural speech, (2) Project Quicksilver - 35ms inference serving 10M+ requests daily, (3) Swanari Dashboard - data viz for 3M+ users across 180 countries. All production, all fast!';
    } else if (q.toLowerCase().includes('hire') || q.toLowerCase().includes('why')) {
      response = 'Because he ships. Fast. While others debate, Kunal builds. He\'s cut costs 80%, boosted throughput 10×, and his code serves millions. Plus, he\'s fun to work with - marathoner, rock vocalist, and makes a mean pasta! 🎸🏃‍♂️🍝';
    } else if (q.toLowerCase().includes('fun') || q.toLowerCase().includes('hobby')) {
      response = 'Plot twist: When not optimizing inference, Kunal\'s a lead vocalist in a rock band, runs sub-4hr marathons, and treks the Himalayas! Also cooks Italian food that\'ll make you forget about that production bug. Work hard, play harder! 🎤🏔️';
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

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200]"
            onClick={onClose}
          />

          {/* Fullscreen Chat */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-[210] flex items-center justify-center p-4"
          >
            <div className="w-full max-w-6xl h-full max-h-[90vh] flex flex-col rounded-3xl overflow-hidden"
                 style={{
                   background: 'linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(139,69,195,0.15) 50%, rgba(236,72,153,0.15) 100%)',
                   backdropFilter: 'blur(32px) saturate(150%)',
                   border: '2px solid rgba(99,102,241,0.3)',
                   boxShadow: '0 0 0 1px rgba(99,102,241,0.2), 0 40px 80px -12px rgba(0,0,0,0.8)'
                 }}>
              
              {/* Enhanced Header */}
              <div className="relative border-b border-white/20 px-8 py-6 flex-shrink-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-2xl">
                      🤖
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h2 className="text-2xl font-bold text-white">Kunal's AI Assistant</h2>
                        <motion.div 
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-black text-xs font-bold rounded-full"
                        >
                          LIVE
                        </motion.div>
                      </div>
                      <p className="text-white/70">Ask anything about Kunal Bhatia • ML Engineer</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <motion.button
                      onClick={onClose}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </div>
              
              {/* Messages Area */}
              <div 
                ref={messagesRef}
                className="flex-1 overflow-y-auto p-8 space-y-6"
              >
                {msgs.map(m => (
                  <motion.div 
                    key={m.id} 
                    initial={{ opacity: 0, y: 20, scale: 0.95 }} 
                    animate={{ opacity: 1, y: 0, scale: 1 }} 
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >            
                    <div className={`max-w-[70%] rounded-2xl px-6 py-4 ${
                      m.role === 'user' 
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/25' 
                        : 'bg-white/10 backdrop-blur-md text-white/95 border border-white/20 shadow-xl'
                    }`}>
                      <div className="text-base leading-relaxed">{m.content || '…'}</div>
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-2 px-6">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"
                      />
                    ))}
                  </div>
                )}
              </div>
              
              {/* Enhanced Input Area */}
              <div className="relative p-8 border-t border-white/20 bg-black/20 flex-shrink-0">
                <div className="flex flex-wrap gap-3 mb-6">
                  {SUGGESTIONS.map(s => (
                    <motion.button 
                      key={s} 
                      onClick={() => ask(s)} 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full border border-indigo-400/40 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 backdrop-blur-md px-5 py-3 text-sm font-medium text-white hover:bg-gradient-to-r hover:from-indigo-400/25 hover:to-purple-400/25 hover:border-indigo-400/60 transition-all duration-300"
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
                  className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/5 backdrop-blur-md p-4"
                >
                  <input 
                    value={inp} 
                    onChange={e => setInp(e.target.value)} 
                    placeholder="Ask about experience, projects, skills..." 
                    className="flex-grow bg-transparent px-4 py-3 text-base text-white placeholder-white/50 outline-none" 
                    autoFocus
                  />
                  <motion.button 
                    type="button" 
                    onClick={startVoice} 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="rounded-xl p-3 bg-white/10 hover:bg-white/20 transition-all duration-300"
                  >
                    🎙️
                  </motion.button>
                  <motion.button 
                    disabled={loading} 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="premium-button rounded-xl px-8 py-3 text-base font-semibold disabled:opacity-50"
                  >
                    Send
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
