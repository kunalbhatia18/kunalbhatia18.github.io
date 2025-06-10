import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar, Footer } from '../components';

// ───────────────────────── Data ─────────────────────────
const projects = [
  { 
    id: 'quicksilver',
    title: 'Project Quicksilver',
    stack: 'FastAPI · GPT‑4o mini · Redis',
    blurb: '35ms inference gateway serving 10M+ requests daily',
    img: '/proj1.jpg',
    category: 'AI',
    role: 'Lead Engineer',
    link: '#',
    metrics: { latency: '35ms', uptime: '99.99%', cost: '-80%' }
  },
  { 
    id: 'swanari',
    title: 'Swanari Data Observatory',
    stack: 'React · D3.js · PostgreSQL',
    blurb: 'Gender‑finance dashboard reaching 3M+ global users',
    img: '/proj2.jpg',
    category: 'DataViz',
    role: 'Full‑stack Dev',
    link: '#',
    metrics: { users: '3M+', countries: '180+', insights: '500+' }
  },
  { 
    id: 'voice',
    title: 'Voice Gmail Copilot',
    stack: 'WebSpeech · OpenAI · Chrome API',
    blurb: 'Process 60 emails/min with natural voice commands',
    img: '/proj3.jpg',
    category: 'AI',
    role: 'Solo Maker',
    link: '#',
    metrics: { speed: '60/min', accuracy: '97%', saves: '2hrs/day' }
  },
  { 
    id: 'fraud',
    title: 'Fraud Pipeline Kafka',
    stack: 'Kafka · MLflow · TensorFlow',
    blurb: '10× throughput boost for real-time fraud detection',
    img: '/proj4.jpg',
    category: 'Backend',
    role: 'ML Engineer',
    link: '#',
    metrics: { throughput: '10×', detection: '<50ms', precision: '99.2%' }
  },
  { 
    id: 'trueupi',
    title: 'TrueUPI',
    stack: 'Flutter · Firebase · Node.js',
    blurb: 'Crowdsourced UPI fraud prevention platform',
    img: '/proj5.jpg',
    category: 'Mobile',
    role: 'Founder',
    link: '#',
    metrics: { downloads: '50K+', ratings: '4.8★', prevented: '₹2Cr+' }
  }
];

const categories = ['All', 'AI', 'DataViz', 'Backend', 'Mobile'];

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

const ProjectCard = React.forwardRef<HTMLDivElement, { project: any, index: number, onOpen: (p: any) => void }>(({ project, index, onOpen }, ref) => {
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
            <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-2">
              {project.title}
            </h3>
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

        {/* Hover indicator */}
        <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="text-white/60"
          >
            →
          </motion.div>
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
        className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          className="w-full max-w-4xl overflow-hidden rounded-3xl glass-dark"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-80 overflow-hidden">
            <img src={proj.img} alt={proj.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="text-white text-xl">×</span>
            </button>
          </div>
          
          <div className="p-10 space-y-6">
            <div>
              <h2 className="text-3xl font-bold gradient-text mb-2">{proj.title}</h2>
              <p className="text-white/60">{proj.stack} — {proj.role}</p>
            </div>
            
            <p className="text-lg text-white/80 leading-relaxed">{proj.blurb}</p>
            
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/10">
              {Object.entries(proj.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{value as string}</div>
                  <div className="text-sm text-white/50 uppercase tracking-wider mt-1">{key}</div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <motion.a
                href={proj.link}
                className="premium-button inline-block rounded-full px-8 py-3 text-white font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Live Project
              </motion.a>
              <motion.button
                onClick={onClose}
                className="rounded-full border border-white/20 px-8 py-3 text-white font-semibold hover:bg-white/10 transition-colors"
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
          Hand‑picked builds proving speed, scale, and polish. Each project pushed boundaries and shipped to real users.
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
  );
}