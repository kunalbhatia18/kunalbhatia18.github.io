import { useState, useEffect, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Footer, SEO } from '../components';
import { getAssetUrl, IMAGES } from '../utils/assets';

// ───────────────────────── Data ─────────────────────────
const projects = [
  { 
    id: 'voice-gmail',
    title: 'Voice Gmail Copilot',
    stack: 'React · FastAPI · OpenAI Real-time',
    blurb: 'Process 60 emails/min with natural voice commands',
    img: getAssetUrl(IMAGES.proj1),
    category: 'AI',
    role: 'Solo Maker',
    link: 'https://github.com',
    github: 'https://github.com/kunalbhatia18/voice-gmail-copilot',
    metrics: { throughput: '60/min', accuracy: '97%', saved: '2hrs/day' }
  },
  { 
    id: 'delegate-ai',
    title: 'Delegate AI Engine',
    stack: 'Next.js · LangChain · GPT-4o mini',
    blurb: 'Executive workflow automation saving 85% of busy-work',
    img: getAssetUrl(IMAGES.proj2),
    category: 'AI',
    role: 'Lead Engineer',
    link: '#',
    github: 'https://github.com/kunalbhatia18/delegate-ai',
    metrics: { recaptured: '85%', saved: '$247M/yr', setup: '24h' }
  },
  { 
    id: 'bias-copilot',
    title: 'AI Bias Mitigation Copilot',
    stack: 'Flask · TensorFlow · AIF360',
    blurb: 'Real-time ML fairness analysis with auto-correction',
    img: getAssetUrl(IMAGES.proj3),
    category: 'AI',
    role: 'ML Engineer',
    link: 'https://github.com',
    github: 'https://github.com/kunalbhatia18/ai-bias-copilot',
    metrics: { fairness: '+22%', speed: '<30s', fix: '1-click' }
  },
  { 
    id: 'encephalo',
    title: 'Synthetic EEG Generator',
    stack: 'PyTorch · TimeGAN · React',
    blurb: 'Generate 10K high-fidelity brain signals in 2 minutes',
    img: getAssetUrl(IMAGES.proj4),
    category: 'AI',
    role: 'Research Engineer',
    link: '#',
    github: 'https://github.com/kunalbhatia18/synthetic-eeg-generator',
    metrics: { samples: '10K/run', accuracy: '+18%', cost: '-90%' }
  }
];

const categories = ['All', 'AI'];

// ───────────────────────── Components ─────────────────────────
function FilterBar({ active, setActive }: { active: string, setActive: (c: string) => void }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4 sm:px-6 mb-12 sm:mb-16 mt-8 sm:mt-12">
      {categories.map(c => (
        <motion.button
          key={c}
          onClick={() => setActive(c)}
          className={`relative px-6 py-2 rounded-full font-medium transition-all ${
            active === c 
              ? 'text-white' 
              : 'text-white/60 hover:text-white/80'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {active === c && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{c}</span>
        </motion.button>
      ))}
    </div>
  );
}

const ProjectCard = forwardRef<HTMLDivElement, { project: any, index: number, onOpen: (p: any) => void }>(({ project, index, onOpen }, ref) => {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10, transition: { duration: 0.2 } }}
      className="group cursor-pointer h-full"
      onClick={() => onOpen(project)}
    >
      <div className="relative overflow-hidden rounded-3xl glass hover-glow h-full flex flex-col">
        <div className="aspect-video overflow-hidden flex-shrink-0">
          <img 
            src={project.img} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-8 space-y-4 flex-1 flex flex-col">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2 flex-1">
                {project.title}
              </h3>
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-5 h-5 rounded-md bg-white/10 hover:bg-white/20 transition-colors flex-shrink-0"
                onClick={(e) => e.stopPropagation()}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-3 h-3 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            </div>
            <p className="text-sm text-white/50 mt-1">{project.stack}</p>
          </div>
          
          <p className="text-white/70 leading-relaxed flex-1 line-clamp-3">{project.blurb}</p>
          
          <div className="flex gap-4 pt-2 flex-shrink-0">
            {Object.entries(project.metrics).slice(0, 3).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-sm font-semibold gradient-text">{value as string}</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">{key}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

// Add display name for better debugging
ProjectCard.displayName = 'ProjectCard';

function Modal({ proj, onClose }: { proj: any, onClose: () => void }) {
  if (!proj) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="w-full max-w-2xl lg:max-w-3xl max-h-[90vh] overflow-hidden rounded-2xl sm:rounded-3xl glass-dark overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden flex-shrink-0 bg-gray-900">
            <img 
              src={proj.img} 
              alt={proj.title} 
              className="w-full h-full object-cover brightness-110 contrast-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:bg-black/80 transition-colors border border-white/30 shadow-lg"
            >
              <span className="text-white text-lg sm:text-xl font-light">×</span>
            </button>
          </div>
          
          <div className="p-6 sm:p-8 lg:p-10 space-y-4 sm:space-y-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">{proj.title}</h2>
              <p className="text-sm sm:text-base text-white/60">{proj.stack} — {proj.role}</p>
            </div>
            
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">{proj.blurb}</p>
            
            <div className="grid grid-cols-3 gap-4 sm:gap-6 py-4 sm:py-6 border-y border-white/10">
              {Object.entries(proj.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-lg sm:text-2xl font-bold gradient-text">{value as string}</div>
                  <div className="text-xs sm:text-sm text-white/50 uppercase tracking-wider mt-1">{key}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <motion.a
                href={proj.link}
                className="premium-button inline-block rounded-full px-6 sm:px-8 py-3 text-white font-semibold text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live Project
              </motion.a>
              <motion.button
                onClick={onClose}
                className="rounded-full border border-white/20 px-6 sm:px-8 py-3 text-white font-semibold hover:bg-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Close
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Hero() {
  return (
    <section className="relative flex min-h-[60vh] sm:min-h-[70vh] flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 lg:pb-16 text-center text-white overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_bottom,#15151d_0%,#0f0e17_50%,#0a0a12_100%)]" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity, delay: 4 }}
        className="absolute bottom-1/3 -right-1/4 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]" 
      />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto"
      >
        {/* FIXED: Consistent responsive typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8">
          Projects <span className="gradient-text">Showcase</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
          AI-powered tools solving real problems. From voice-controlled productivity to bias-free ML models—each project pushes boundaries and ships to users.
        </p>
      </motion.div>
    </section>
  );
}

// ───────────────────────── Main ─────────────────────────
export default function Projects() {
  const [filter, setFilter] = useState('All');
  const [open, setOpen] = useState<any>(null);
  const [gradientIndex, setGradientIndex] = useState(0);
  const [easterEgg, setEasterEgg] = useState(false);
  const visible = filter === 'All' ? projects : projects.filter(p => p.category === filter);
  
  const gradients = [
    'radial-gradient(ellipse_at_bottom,#15151d_0%,#0f0e17_50%,#0a0a12_100%)',
    'radial-gradient(ellipse_at_bottom,#1a0f1f_0%,#0f0e17_50%,#0a0a12_100%)',
    'radial-gradient(ellipse_at_bottom,#0f141d_0%,#0f0e17_50%,#0a0a12_100%)',
  ];

  useEffect(() => {
    const gradientInterval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 5000);
    
    // Easter egg: Konami code
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setEasterEgg(true);
          setTimeout(() => setEasterEgg(false), 5000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      clearInterval(gradientInterval);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  
  return (
    <>
      <SEO 
        title="Projects - Kunal's Portfolio"
        description="Explore Kunal's AI portfolio: Voice Gmail Copilot (60 emails/min), Delegate AI (85% time saved), AI Bias Mitigation Co-Pilot, Synthetic EEG Generator. Advanced AI/ML projects."
        keywords={['Voice Gmail Copilot', 'Delegate AI', 'AI Bias Mitigation', 'Synthetic EEG Generator', 'AI Projects', 'ML Portfolio', 'OpenAI Real-time API', 'TensorFlow', 'PyTorch']}
        url="https://kunalis.me/kunal-website/projects"
        image="https://kunalis.me/proj1.jpg"
      />
      <main className="relative bg-[#0f0e17] font-inter text-white min-h-screen">
      {/* Animated gradient background */}
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-20"
        animate={{ background: gradients[gradientIndex] }}
        transition={{ duration: 2 }}
      />
      
      {/* Easter Egg */}
      <AnimatePresence>
        {easterEgg && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="fixed top-20 right-10 z-50 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl"
          >
            🎮 Achievement Unlocked: Code Ninja! 🥷
          </motion.div>
        )}
      </AnimatePresence>
      
      <Navbar />
      <Hero />
      
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-24">
        <FilterBar active={filter} setActive={setFilter} />
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visible.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onOpen={setOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
      
      <Modal proj={open} onClose={() => setOpen(null)} />
      <Footer />
    </main>
    </>
  );
}