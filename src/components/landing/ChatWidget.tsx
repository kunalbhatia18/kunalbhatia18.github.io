import { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { 
  SCALE_IN, 
  ANIMATION_DELAYS 
} from '../../constants/animations';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

// OPTIMIZED: Consolidated chat state for better performance
interface ChatState {
  msgs: Msg[];
  inp: string;
  loading: boolean;
  isTyping: boolean;
}

// PERFORMANCE OPTIMIZED: ChatWidget with instant responses and consolidated state
export const ChatWidget = memo(() => {
  // OPTIMIZATION: Single state object instead of 4 separate useState hooks
  const [chatState, setChatState] = useState<ChatState>({
    msgs: [],
    inp: '',
    loading: false,
    isTyping: false
  });

  // Ref for stream interval cleanup
  const streamIntervalRef = useRef<number | null>(null);

  // OPTIMIZED: Initialize with cleanup
  useEffect(() => { 
    const timer = setTimeout(() => {
      setChatState(prev => ({
        ...prev,
        msgs: [{
          id: `intro-${Date.now()}`,
          role: 'assistant',
          content: 'Hey! I\'m Kunal\'s AI assistant. Ask me anything about his technical expertise, achievements, or impressive projects! 🚀'
        }]
      }));
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // OPTIMIZED: Stream function with proper cleanup - memoized
  const stream = useCallback((id: string, text: string) => {
    setChatState(prev => ({ ...prev, isTyping: true }));
    let i = 0;
    
    // Clear any existing interval
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    
    streamIntervalRef.current = setInterval(() => {
      setChatState(prev => ({
        ...prev,
        msgs: prev.msgs.map(m => m.id === id ? { ...m, content: text.slice(0, i) } : m)
      }));
      i += 3;
      if (i >= text.length) { 
        if (streamIntervalRef.current) {
          clearInterval(streamIntervalRef.current);
          streamIntervalRef.current = null;
        }
        setChatState(prev => ({
          ...prev,
          loading: false,
          isTyping: false
        }));
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

  // Helper function for mobile-safe UUID generation
  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const ask = useCallback((q: string) => {
    const trimmedQ = q.trim();
    if (!trimmedQ) return;
    
    // Generate IDs first
    const userId = generateId();
    const botId = generateId();
    
    // Create message objects
    const userMsg: Msg = { id: userId, role: 'user', content: trimmedQ };
    const botMsg: Msg = { id: botId, role: 'assistant', content: '' };
    
    // Use flushSync to force synchronous state updates on mobile Safari
    flushSync(() => {
      setChatState(prev => ({
        ...prev,
        msgs: [...prev.msgs, userMsg, botMsg],
        inp: '',
        loading: true
      }));
    });
    
    const response = getResponse(trimmedQ);
    
    // Delay stream start to ensure DOM has updated
    setTimeout(() => {
      stream(botId, response);
    }, 100);
  }, [getResponse, stream]);

  // BLACKISH: Dark gradient with subtle variation
  const chatWindowStyle = useMemo(() => ({
    background: `
      linear-gradient(135deg, 
        rgba(16, 16, 28, 0.96) 0%, 
        rgba(12, 12, 22, 0.97) 50%,
        rgba(8, 8, 16, 0.98) 100%
      )
    `,
    // Enhanced styling for better visual appeal
    boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.08),
      0 25px 50px -12px rgba(0, 0, 0, 0.7),
      inset 0 1px 0 0 rgba(255, 255, 255, 0.1)
    `,
    height: 'clamp(500px, 70vh, 700px)',
    minHeight: '500px',
    maxHeight: '90vh',
    // CSS containment for performance
    contain: 'layout style paint',
    willChange: 'transform'
  }), []);

  // ORIGINAL: Memoized animation props without hover lift
  const mainAnimation = useMemo(() => ({
    ...SCALE_IN,
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      delay: ANIMATION_DELAYS.chat
    }
  }), []);

  return (
    <div className="relative">
      {/* ANIMATED: Chat widget glow */}
      <motion.div 
        className="absolute inset-0 rounded-2xl sm:rounded-3xl"
        animate={{
          boxShadow: [
            '0 0 60px rgba(99, 102, 241, 0.4), 0 0 120px rgba(99, 102, 241, 0.2)',
            '0 0 60px rgba(139, 69, 195, 0.4), 0 0 120px rgba(139, 69, 195, 0.2)',
            '0 0 60px rgba(99, 102, 241, 0.4), 0 0 120px rgba(99, 102, 241, 0.2)'
          ]
        }}
        transition={{ 
          duration: 4, 
          repeat: Infinity, 
          ease: "easeInOut"
        }}
      />

      <motion.div 
        {...mainAnimation}
        id="chat" 
        className="relative flex flex-col rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden group glass"
        style={chatWindowStyle}
      >
        {/* Content */}
        <div className="flex flex-col h-full">
          <ChatHeader />
          <ChatMessages messages={chatState.msgs} isTyping={chatState.isTyping} />
          <ChatInput 
            input={chatState.inp}
            onInputChange={(value: string) => setChatState(prev => ({ ...prev, inp: value }))}
            onSubmit={ask}
            loading={chatState.loading}
            showSuggestions={chatState.msgs.length <= 1}
          />
        </div>
      </motion.div>
    </div>
  );
});

ChatWidget.displayName = 'ChatWidget';