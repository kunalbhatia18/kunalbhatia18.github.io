import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show cursor on desktop devices
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 768 && !('ontouchstart' in window));
    };
    
    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  const updateMousePosition = useCallback((e: MouseEvent) => {
    // Always use clientX/clientY for viewport-relative coordinates
    setMousePosition({ x: e.clientX, y: e.clientY });
    
    const target = e.target;
    let isPointerState = false;
    if (target && target instanceof Element) {
      isPointerState =
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        (target as HTMLElement).onclick !== null ||
        (target as HTMLElement).closest('button') !== null ||
        (target as HTMLElement).closest('a') !== null;
    }
    setIsPointer(isPointerState);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Add event listeners
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isDesktop, updateMousePosition]);

  // Don't render on mobile/tablet
  if (!isDesktop) return null;

  // Use portal to ensure cursor is rendered at document root
  return createPortal(
    <>
      {/* Container to isolate from any parent transforms */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          // Ensure no transform interference
          transform: 'none',
          isolation: 'isolate',
        }}
      >
        {/* Main cursor */}
        <motion.div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            mixBlendMode: 'difference',
            // Use transform for better performance instead of animate x/y
            transform: `translate3d(${mousePosition.x - 16}px, ${mousePosition.y - 16}px, 0)`,
          }}
          animate={{
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            opacity: { duration: 0.2 },
          }}
        >
          <motion.div
            className="w-8 h-8 bg-white rounded-full"
            animate={{
              scale: isPointer ? 1.5 : 1,
              backgroundColor: isPointer ? '#667eea' : '#ffffff',
            }}
            transition={{ 
              scale: { type: "spring", stiffness: 500, damping: 28 },
              backgroundColor: { duration: 0.2 }
            }}
          />
        </motion.div>

        {/* Cursor trail */}
        <motion.div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
          }}
          animate={{
            x: mousePosition.x - 4,
            y: mousePosition.y - 4,
            opacity: isVisible ? 1 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            opacity: { duration: 0.2 },
          }}
        >
          <div className="w-2 h-2 bg-indigo-500/30 rounded-full" />
        </motion.div>
      </div>
    </>,
    document.body
  );
}
