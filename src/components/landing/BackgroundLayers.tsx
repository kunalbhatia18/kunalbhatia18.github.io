import { useMemo, memo } from 'react';
import { motion } from 'framer-motion';
import { ANIMATION_DURATIONS, ANIMATION_EASINGS, ANIMATION_DELAYS } from '../../constants/animations';

// OPTIMIZED: Memoized background layers components
export const BackgroundLayers = memo(() => {
  // OPTIMIZED: Further reduced particle count for better performance
  const particles = useMemo(() => Array.from({ length: 4 }), []); // Further reduced
  const accentParticles = useMemo(() => Array.from({ length: 2 }), []); // Further reduced

  // OPTIMIZED: Simplified animation configurations using shared constants with staggered delays
  const gradientTransition1 = useMemo(() => ({
    duration: 16, 
    repeat: Infinity,
    delay: ANIMATION_DELAYS.background  // Starts immediately
  }), []);

  const gradientTransition2 = useMemo(() => ({
    duration: 12, 
    repeat: Infinity,
    delay: ANIMATION_DELAYS.background + 0.02  // Starts 20ms after first gradient
  }), []);

  const spotlightTransition = useMemo(() => ({
    duration: 20, 
    repeat: Infinity,
    delay: ANIMATION_DELAYS.background + 0.04  // Starts 40ms after first gradient
  }), []);

  // OPTIMIZED: Generate particle configs once with staggered delays
  const particleConfigs = useMemo(() => 
    particles.map((_, i) => ({
      initial: {
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        opacity: Math.random() * 0.4 + 0.1
      },
      animate: {
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        opacity: [0.1, 0.4, 0.1]
      },
      transition: {
        duration: Math.random() * 25 + 15,
        repeat: Infinity,
        ease: ANIMATION_EASINGS.linear,
        delay: ANIMATION_DELAYS.particles + (i * 0.03)  // Stagger each particle by 30ms
      }
    })), [particles]
  );

  // OPTIMIZED: Generate accent particle configs once with staggered delays
  const accentConfigs = useMemo(() => 
    accentParticles.map((_, i) => ({
      style: {
        background: i % 3 === 0 ? 'rgba(99,102,241,0.3)' : i % 3 === 1 ? 'rgba(139,69,195,0.3)' : 'rgba(244,114,182,0.3)'
      },
      initial: {
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        scale: 0
      },
      animate: {
        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
        scale: [0, 1, 0]
      },
      transition: {
        duration: Math.random() * 30 + 20,
        repeat: Infinity,
        ease: ANIMATION_EASINGS.easeInOut,
        delay: ANIMATION_DELAYS.particles + 0.1 + (i * 0.05)  // Start after regular particles
      }
    })), [accentParticles]
  );

  return (
    <>
      {/* Side gradients */}
      <div className="pointer-events-none fixed inset-y-0 left-0 w-24 lg:w-32 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-10 hidden xl:block" />
      <div className="pointer-events-none fixed inset-y-0 right-0 w-24 lg:w-32 bg-gradient-to-l from-black/40 via-black/20 to-transparent z-10 hidden xl:block" />
      
      {/* Base background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#0a0a12]" />
      
      {/* OPTIMIZED: Simplified animated gradients with GPU optimization */}
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-19 gpu-background"
        animate={{
          background: [
            'radial-gradient(ellipse_at_center,#15151d_0%,#0f0e17_40%,#0a0a12_80%)',
            'radial-gradient(ellipse_at_center,#1a0f1f_0%,#0f0e17_40%,#0a0a12_80%)',
            'radial-gradient(ellipse_at_center,#15151d_0%,#0f0e17_40%,#0a0a12_80%)',
          ]
        }}
        transition={gradientTransition1}
      />
      
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-18 gpu-background"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(99,102,241,0.03) 0%, transparent 50%, rgba(139,69,195,0.03) 100%)',
            'linear-gradient(225deg, rgba(139,69,195,0.03) 0%, transparent 50%, rgba(244,114,182,0.03) 100%)',
            'linear-gradient(45deg, rgba(99,102,241,0.03) 0%, transparent 50%, rgba(139,69,195,0.03) 100%)',
          ]
        }}
        transition={gradientTransition2}
      />
      
      {/* OPTIMIZED: Simplified spotlight with GPU optimization */}
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-17 gpu-background"
        animate={{
          background: [
            'radial-gradient(circle at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 20%, rgba(139,69,195,0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 80%, rgba(99,102,241,0.08) 0%, transparent 50%)',
          ]
        }}
        transition={spotlightTransition}
      />
      
      {/* OPTIMIZED: Reduced particle system with GPU optimization */}
      <div className="pointer-events-none fixed inset-0 -z-16">
        {/* Main particles */}
        {particles.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full gpu-animated"
            initial={particleConfigs[i].initial}
            animate={particleConfigs[i].animate}
            transition={particleConfigs[i].transition}
          />
        ))}
        
        {/* Accent particles */}
        {accentParticles.map((_, i) => (
          <motion.div
            key={`accent-${i}`}
            className="absolute w-2 h-2 rounded-full gpu-animated"
            style={accentConfigs[i].style}
            initial={accentConfigs[i].initial}
            animate={accentConfigs[i].animate}
            transition={accentConfigs[i].transition}
          />
        ))}
      </div>
    </>
  );
});

BackgroundLayers.displayName = 'BackgroundLayers';
