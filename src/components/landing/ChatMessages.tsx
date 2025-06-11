import { useRef, useEffect, useCallback, useMemo, memo } from 'react';
import { motion } from 'framer-motion';

interface Msg {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface ChatMessagesProps {
  messages: Msg[];
  isTyping: boolean;
}

// OPTIMIZED: Memoized individual message component
const MessageItem = memo(({ message }: { message: Msg }) => {
  // OPTIMIZED: Memoized message styles
  const messageStyle = useMemo(() => ({
    background: message.role === 'user'
      ? `linear-gradient(135deg, 
          rgba(99, 102, 241, 0.95) 0%, 
          rgba(79, 70, 229, 0.95) 100%
        )`
      : `linear-gradient(135deg, 
          rgba(255, 255, 255, 0.12) 0%, 
          rgba(255, 255, 255, 0.08) 100%
        )`,
    backdropFilter: message.role === 'assistant' ? 'blur(6px)' : 'blur(2px)',
    border: message.role === 'assistant' 
      ? '1px solid rgba(255, 255, 255, 0.15)' 
      : '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: message.role === 'user' 
      ? '0 4px 15px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
      : '0 2px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    contain: 'layout style'
  }), [message.role]);

  const textStyle = useMemo(() => ({
    fontFamily: message.role === 'assistant' ? 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' : 'inherit',
    fontWeight: message.role === 'assistant' ? '400' : '500',
    lineHeight: '1.5',
    letterSpacing: '0.01em'
  }), [message.role]);

  const containerClass = useMemo(() => 
    `flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`, 
    [message.role]
  );

  const messageClass = useMemo(() => 
    `${message.role === 'user' ? 'text-white font-medium' : 'text-white/95'} text-xs sm:text-sm lg:text-sm leading-relaxed tracking-wide`,
    [message.role]
  );

  return (
    <motion.div 
      key={message.id} 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.3 }}
      className={containerClass}
    >            
      <div 
        className="relative max-w-[90%] sm:max-w-[85%] rounded-lg sm:rounded-xl lg:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 lg:px-6 lg:py-4 group"
        style={messageStyle}
      >
        <div className={messageClass} style={textStyle}>
          {message.content || '…'}
        </div>
        {/* Message shine effect */}
        {message.role === 'user' && (
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
  );
});

MessageItem.displayName = 'MessageItem';

// OPTIMIZED: Memoized typing indicator
const TypingIndicator = memo(() => {
  const typingDots = useMemo(() => [0, 1, 2], []);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 px-4 sm:px-5 lg:px-7"
    >
      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gradient-to-r from-white/8 to-white/4 border border-white/10">
        <span className="text-xs text-white/50 font-medium mr-2">Typing</span>
        {typingDots.map(i => (
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
            className="w-1.5 h-1.5 bg-indigo-400 rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
});

TypingIndicator.displayName = 'TypingIndicator';

export const ChatMessages = memo(({ messages, isTyping }: ChatMessagesProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);

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

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  return (
    <div 
      ref={messagesRef}
      className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 space-y-2 sm:space-y-3 lg:space-y-4 scrollbar-thin"
    >
      {messages.map(message => (
        <MessageItem key={message.id} message={message} />
      ))}
      {isTyping && <TypingIndicator />}
    </div>
  );
});

ChatMessages.displayName = 'ChatMessages';
