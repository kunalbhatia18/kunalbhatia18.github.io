import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer, SEO } from '../components';
import { getAssetUrl, IMAGES } from '../utils/assets';

// ---- Hero ----
function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 lg:pb-16 text-center text-white overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,#15151d_0%,#0f0e17_50%,#0a0a12_100%)]" />
      
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
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-4xl mx-auto"
      >
        {/* FIXED: Consistent responsive typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8">
          About <span className="gradient-text">Kunal</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
          Builder, runner, rocker — turning cutting‑edge AI into lightning‑fast, human‑friendly products.
        </p>
      </motion.div>

      {/* Removed floating particles to prevent white smudge dancing */}
    </section>
  );
}

// ---- Core Bio ----
function BioBlock() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24">
      <div className="grid gap-12 sm:gap-16 lg:grid-cols-3 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-1"
        >
          <div className="relative mx-auto w-60 h-60 sm:w-72 sm:h-72">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-30 animate-pulse" />
            <img 
              src={getAssetUrl(IMAGES.profile)} 
              alt="Kunal portrait" 
              className="relative w-full h-full rounded-full object-cover border-2 border-white/10" 
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="space-y-4">
            <p className="text-lg leading-relaxed text-white/80">
              I'm a Bangalore‑based full‑stack ML engineer who loves shaving milliseconds. I've shipped
              dashboards to <span className="text-white font-semibold">3M+ users</span>, cut inference 
              latency <span className="text-white font-semibold">10×</span>, and pitched at YC.
            </p>
            <p className="text-lg leading-relaxed text-white/70">
              Current obsession: voice‑first agents that talk like humans and think like supercomputers.
            </p>
            <p className="text-sm text-white/50 italic mt-4">
              Fun fact: I debug production issues faster than I run marathons (and I run sub-4hrs) 🏃‍♂️🐛
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 hover-glow cursor-pointer"
            >
              <h3 className="text-3xl font-bold gradient-text">35 ms</h3>
              <p className="metric-label mt-2 text-white/50">Fastest end‑to‑end inference</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass rounded-2xl p-6 hover-glow cursor-pointer"
            >
              <h3 className="text-3xl font-bold gradient-text">60 emails/min</h3>
              <p className="metric-label mt-2 text-white/50">Voice Gmail copilot speed</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ---- Skills Matrix ----
function SkillsMatrix() {
  const skills = [
    { category: 'AI/ML', items: ['GPT-4', 'FAISS', 'LangChain', 'MLflow'] },
    { category: 'Backend', items: ['FastAPI', 'Kafka', 'Redis', 'PostgreSQL'] },
    { category: 'Frontend', items: ['React', 'TypeScript', 'Framer', 'Next.js'] },
    { category: 'Cloud', items: ['AWS', 'Vercel', 'Docker', 'GCP'] },
  ];

  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 relative">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 gradient-text"
        >
          Tech Stack
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-xl sm:rounded-2xl p-4 sm:p-6 hover-glow"
            >
              <h3 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">{skill.category}</h3>
              <div className="space-y-1 sm:space-y-2">
                {skill.items.map(item => (
                  <div key={item} className="text-xs sm:text-sm text-white/60">{item}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Hobby Strip ----
function HobbyStrip() {
  const hobbies = [
    { src: getAssetUrl(IMAGES.marathon), label: 'Marathon Runner', desc: 'Sub-4hr finisher' },
    { src: getAssetUrl(IMAGES.adventure), label: 'Adventure Seeker', desc: 'Exploring horizons' },
    { src: getAssetUrl(IMAGES.gym), label: 'Fitness Enthusiast', desc: 'Strength & discipline' },
    { src: getAssetUrl(IMAGES.transformation), label: 'Optimization Mindset', desc: 'Results-driven' }
  ];
  
  return (
    <section className="py-16 sm:py-20 bg-black/20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12"
        >
          Beyond the <span className="gradient-text">Code</span>
        </motion.h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {hobbies.map((hobby, i) => (
            <motion.div
              key={hobby.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
                <img 
                  src={hobby.src} 
                  alt={hobby.label} 
                  className="w-full h-32 sm:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                  <h3 className="font-semibold text-white text-sm sm:text-base">{hobby.label}</h3>
                  <p className="text-xs sm:text-sm text-white/70">{hobby.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---- Call To Action ----
function CTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0f0e17_100%)]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mx-auto max-w-3xl px-4 sm:px-6 text-center"
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
          Building the future of <span className="gradient-text">AI at scale</span>
        </h2>
        <p className="text-base sm:text-lg text-white/70 mb-8 sm:mb-10">
          From 35ms inference to production systems serving 3M+ users globally.
        </p>
        <motion.a 
          href="mailto:kunal@kunalis.me" 
          className="premium-button inline-block rounded-full px-8 sm:px-10 py-3 sm:py-4 text-white font-semibold text-base sm:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Let's Connect
        </motion.a>
      </motion.div>
    </section>
  );
}

export default function About() {
  const [gradientIndex, setGradientIndex] = useState(0);
  
  const gradients = [
    'radial-gradient(ellipse_at_top,#15151d_0%,#0f0e17_50%,#0a0a12_100%)',
    'radial-gradient(ellipse_at_top,#1a0f1f_0%,#0f0e17_50%,#0a0a12_100%)',
    'radial-gradient(ellipse_at_top,#0f141d_0%,#0f0e17_50%,#0a0a12_100%)',
  ];

  useEffect(() => { 
    document.title = 'About – Kunal B';
    document.documentElement.style.scrollBehavior = 'smooth';
    
    const gradientInterval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(gradientInterval);
  }, []);
  
  return (
    <>
      <SEO 
        title="About Kunal - AI/ML Engineer & Marathoner"
        description="Meet Kunal Bhatia - Full-stack ML engineer from Bangalore. 4+ years shipping production AI, sub-4hr marathoner, rock vocalist. Building the future of AI at scale."
        keywords={['About Kunal Bhatia', 'ML Engineer Background', 'Bangalore Developer', 'Marathon Runner', 'Rock Vocalist', 'AI Engineer Story', 'Machine Learning Career']}
        url="https://kunalis.me/about"
        image="https://kunalis.me/profile-purple.jpg"
      />
      <main className="relative min-h-screen w-full overflow-x-hidden bg-[#0f0e17] font-inter text-white">
      {/* Animated gradient background */}
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-20"
        animate={{ background: gradients[gradientIndex] }}
        transition={{ duration: 2 }}
      />
      <Navbar />
      <Hero />
      <BioBlock />
      <SkillsMatrix />
      <HobbyStrip />
      <CTA />
      <Footer />
    </main>
    </>
  );
}