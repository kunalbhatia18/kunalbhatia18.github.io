// Shared animation constants to reduce bundle duplication
export const ANIMATION_EASINGS = {
  easeOut: "easeOut" as const,
  easeInOut: "easeInOut" as const,
  linear: "linear" as const,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 0.3,
  medium: 0.6,
  slow: 0.8,
  gradient: 3,
  glow: 5,
  border: 4,
} as const;

// PERFORMANCE: Animation scheduling delays for smooth loading transition
export const ANIMATION_DELAYS = {
  immediate: 0,
  background: 0,        // Background starts immediately as loading exits
  hero: 0.05,          // Hero starts 50ms later (smooth stagger)
  chat: 0.1,           // Chat starts 100ms later (smooth stagger)
  particles: 0.08,     // Particles start 80ms later (between hero and chat)
  navbar: 0.02,        // Navbar starts 20ms later
} as const;

// Common animation configurations
export const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
} as const;

export const FADE_IN_UP_LARGE = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
} as const;

export const SCALE_IN = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
} as const;

export const HOVER_LIFT = {
  y: -4,
  transition: { duration: ANIMATION_DURATIONS.fast, ease: ANIMATION_EASINGS.easeOut }
} as const;

// Gradient animations
export const GRADIENT_TEXT_ANIMATION = {
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
} as const;

export const GRADIENT_TEXT_TRANSITION = {
  duration: ANIMATION_DURATIONS.gradient, 
  repeat: Infinity,
  delay: ANIMATION_DELAYS.hero  // PERFORMANCE: Delay hero text animation
} as const;

// Glow animations  
export const GLOW_ANIMATION = {
  boxShadow: [
    '0 0 60px rgba(99, 102, 241, 0.2), 0 0 120px rgba(99, 102, 241, 0.1)',
    '0 0 60px rgba(139, 69, 195, 0.2), 0 0 120px rgba(139, 69, 195, 0.1)',
    '0 0 60px rgba(99, 102, 241, 0.2), 0 0 120px rgba(99, 102, 241, 0.1)'
  ]
} as const;

export const GLOW_TRANSITION = {
  duration: ANIMATION_DURATIONS.glow, 
  repeat: Infinity, 
  ease: ANIMATION_EASINGS.easeInOut,
  delay: ANIMATION_DELAYS.chat  // PERFORMANCE: Delay chat glow animation
} as const;

// Border animations
export const BORDER_ANIMATION = {
  boxShadow: [
    '0 0 0 1px rgba(99, 102, 241, 0.05), 0 0 30px rgba(99, 102, 241, 0.04)',
    '0 0 0 1px rgba(139, 69, 195, 0.05), 0 0 30px rgba(139, 69, 195, 0.04)',
    '0 0 0 1px rgba(99, 102, 241, 0.05), 0 0 30px rgba(99, 102, 241, 0.04)'
  ]
} as const;

export const BORDER_TRANSITION = {
  duration: ANIMATION_DURATIONS.border, 
  repeat: Infinity, 
  ease: ANIMATION_EASINGS.easeInOut,
  delay: ANIMATION_DELAYS.chat + 0.05  // PERFORMANCE: Slight offset from glow
} as const;

// PERFORMANCE: Smart will-change management utilities
export const enableWillChange = (element: HTMLElement, properties: string) => {
  if (element) {
    element.style.willChange = properties;
  }
};

export const disableWillChange = (element: HTMLElement) => {
  if (element) {
    element.style.willChange = 'auto';
  }
};

// PERFORMANCE: GPU layer optimization hooks
export const optimizeForAnimation = (element: HTMLElement) => {
  if (element) {
    element.style.willChange = 'transform, opacity';
    element.style.transform = 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
  }
};

export const cleanupAnimation = (element: HTMLElement) => {
  if (element) {
    element.style.willChange = 'auto';
  }
};
