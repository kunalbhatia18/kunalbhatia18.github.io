import { useState, useEffect, useCallback, useMemo, memo, useRef } from 'react';
import { flushSync } from 'react-dom';
import { motion } from 'framer-motion';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { chatAPI } from '../../utils/chatAPI';
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

  // Helper function for mobile-safe UUID generation
  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  // OPTIMIZED: Prewritten responses for template questions only
  const getPrewrittenResponse = useCallback((message: string): string | null => {
    // Template questions (exact matches)
    if (message === "What's Kunal's ML expertise?") {
      return 'Kunal brings 4+ years of production ML engineering expertise, specializing in sub-100ms latency optimization! He\'s architected systems like Project Quicksilver (35ms inference), fraud detection pipelines with 10× throughput improvements, and real-time systems serving 10M+ requests daily. His technical stack spans GPT-4, FAISS, FastAPI, React, and cloud platforms. From ideation to deployment, he builds ML systems that actually scale! 🚀';
    }
    
    if (message === "Tell me about latency optimizations") {
      return 'Kunal\'s obsessed with speed! His masterpiece: Project Quicksilver with 35ms end-to-end inference for 500-token completions. He\'s achieved this through aggressive Redis caching, ONNX optimization, edge deployment architecture, and FastAPI async patterns. Other achievements include 10× throughput improvements in fraud detection and sub-100ms response systems. He lives by the motto: "Every millisecond matters!" ⚡';
    }
    
    if (message === "Show me technical achievements") {
      return 'Here are Kunal\'s standout technical wins: 🏆 Project Quicksilver (35ms inference serving 10M+ requests), 🏆 Swanari Dashboard (3M+ users across 180+ countries), 🏆 Voice Gmail Copilot (60 emails/min processing), 🏆 Fraud Detection Pipeline (10× throughput boost), 🏆 TrueUPI (UPI fraud prevention). Each project solved real problems at scale with measurable impact. Production-grade, optimized, and built to last! 💪';
    }
    
    return null; // No prewritten response, use API (including coffee)
  }, []);

  // API warming function - runs in background without affecting UX
  const warmupAPI = useCallback(async () => {
    try {
      // Send a lightweight warming request in the background
      await chatAPI.sendMessage("ping");
      console.log("✅ API warmed up successfully");
    } catch (error) {
      // Silently fail - this is just for warming, not critical
      console.log("🔥 API warming complete (expected to fail silently)");
    }
  }, []);

  const ask = useCallback(async (q: string) => {
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
    
    // Check for prewritten responses first
    const prewrittenResponse = getPrewrittenResponse(trimmedQ);
    
    if (prewrittenResponse) {
      // Use prewritten response (no API call) + warm up API in background
      setTimeout(() => {
        stream(botId, prewrittenResponse);
        // Warm up the API in background for next potential custom question
        warmupAPI();
      }, 100);
    } else {
      // Call the real API for all other questions (including coffee)
      try {
        const apiResponse = await chatAPI.sendMessage(trimmedQ);
        
        setTimeout(() => {
          stream(botId, apiResponse.response);
        }, 100);
      } catch (error) {
        // Handle API errors gracefully with user-friendly messages
        let errorMessage = 'Sorry, I\'m having trouble responding right now. Please try again in a moment.';
        
        if (error instanceof Error) {
          if (error.message.includes('Unable to connect')) {
            errorMessage = '🔌 I\'m having trouble connecting right now. Please check your internet connection and try again!';
          } else if (error.message.includes('Daily request limit exceeded for your IP')) {
            errorMessage = '⏰ You\'ve reached your daily chat limit (200 requests)! I\'ll be back tomorrow with fresh energy. Thanks for understanding!';
          } else if (error.message.includes('Hourly request limit exceeded for your IP')) {
            errorMessage = '⏰ You\'ve reached your hourly chat limit (100 requests)! Please try again in the next hour. Thanks for your patience!';
          } else if (error.message.includes('Global daily request limit')) {
            errorMessage = '⏰ The chat service has reached its daily limit! This means lots of people are using it. Please try again tomorrow!';
          } else if (error.message.includes('Global hourly request limit')) {
            errorMessage = '⏰ The chat service is getting lots of requests right now! Please try again in the next hour.';
          } else if (error.message.includes('Daily request limit')) {
            errorMessage = '⏰ I\'ve reached my daily chat limit (500 requests)! I\'ll be back tomorrow with fresh energy. Thanks for understanding!';
          } else if (error.message.includes('Hourly request limit')) {
            errorMessage = '⏰ I\'ve reached my hourly chat limit (100 requests)! Please try again in the next hour. Thanks for your patience!';
          } else if (error.message.includes('Message too long')) {
            errorMessage = '📝 That message is a bit too long! Could you try shortening it to under 500 characters?';
          } else if (error.message.includes('HTTP 429')) {
            errorMessage = '⏰ I\'m getting a lot of requests right now! Please wait a moment and try again.';
          } else if (error.message.includes('timeout')) {
            errorMessage = '⏱️ That took longer than expected. Let me try again - please resend your message!';
          } else {
            errorMessage = '🤖 Something unexpected happened on my end. Please try asking your question again!';
          }
        }
        
        setTimeout(() => {
          stream(botId, errorMessage);
        }, 100);
      }
    }
  }, [stream, getPrewrittenResponse, warmupAPI]);

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