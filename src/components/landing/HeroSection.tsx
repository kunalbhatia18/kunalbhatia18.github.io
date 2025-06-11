import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  FADE_IN_UP_LARGE, 
  FADE_IN_UP, 
  GRADIENT_TEXT_ANIMATION, 
  GRADIENT_TEXT_TRANSITION,
  ANIMATION_DURATIONS,
  ANIMATION_DELAYS 
} from '../../constants/animations';

export function HeroSection() {
  // OPTIMIZED: Memoized gradient text animation style
  const gradientTextStyle = useMemo(() => ({
    backgroundSize: '200% 200%'
  }), []);

  // OPTIMIZED: Memoized animation configurations using shared constants with staggered delays
  const sublineAnimation = useMemo(() => ({
    ...FADE_IN_UP,
    transition: { delay: ANIMATION_DELAYS.hero + 0.4 }  // Delay relative to hero start
  }), []);

  const ctaAnimation = useMemo(() => ({
    ...FADE_IN_UP,
    transition: { delay: ANIMATION_DELAYS.hero + 0.6 }  // Delay relative to hero start
  }), []);

  const mainTransition = useMemo(() => ({
    duration: ANIMATION_DURATIONS.slow,
    delay: ANIMATION_DELAYS.hero  // Hero section starts after background
  }), []);

  return (
    <section className="mx-auto max-w-4xl text-center pt-24 sm:pt-32 lg:pt-40 px-4 sm:px-6">
      <motion.div 
        {...FADE_IN_UP_LARGE}
        transition={mainTransition}
      >
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6 sm:mb-8 overflow-visible">
          I build AI products that feel like{' '}
          <span className="block sm:inline">
            <motion.span 
              className="gradient-text inline-block"
              animate={GRADIENT_TEXT_ANIMATION}
              transition={GRADIENT_TEXT_TRANSITION}
              style={gradientTextStyle}
            >
              magic
            </motion.span>.
          </span>
        </h1>
        <motion.p 
          {...sublineAnimation}
          className="text-base sm:text-lg lg:text-xl text-white/70 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto"
        >
          Engineer × Designer × Builder
        </motion.p>
        <motion.p 
          {...ctaAnimation}
          className="text-base sm:text-lg text-indigo-400 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          Try my AI assistant below (it's actually pretty smart!) ↓
        </motion.p>
      </motion.div>
    </section>
  );
}
