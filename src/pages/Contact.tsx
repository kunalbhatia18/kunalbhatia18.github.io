import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer, SEO } from '../components';

// ───────────────────────── Hero ─────────────────────────
function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-6 hero-spacing text-center text-white overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_center,#15151d_0%,#0f0e17_50%,#0a0a12_100%)]" />
      
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
        className="max-w-4xl mx-auto relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8">
          Let's <span className="gradient-text">connect</span>
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Discussing interesting ideas and exciting opportunities. Fast response guaranteed.
        </p>
      </motion.div>
    </section>
  );
}

// ───────────────────────── Contact Card ─────────────────────────
function ContactCard() {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    message: ''
  });
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const socials = [
    { name: 'Email', icon: '✉️', link: 'mailto:kunal@kunalis.me', handle: 'kunal@kunalis.me' },
    { name: 'GitHub', icon: '💻', link: 'https://github.com/kunalbhatia18', handle: 'github.com/kunalbhatia18' },
    { name: 'Twitter', icon: '🐦', link: 'https://twitter.com/kunal_b', handle: '@kunal_b' },
    { name: 'LinkedIn', icon: '💼', link: 'https://linkedin.com/in/kunalb', handle: 'in/kunalb' }
  ];

  const submit = (e: React.FormEvent) => { 
    e.preventDefault(); 
    setSent(true);
    // Reset after 3 seconds for demo
    setTimeout(() => {
      setSent(false);
      setFormData({ firstName: '', lastName: '', email: '', company: '', message: '' });
    }, 3000);
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid lg:grid-cols-5 gap-12"
      >
        {/* Contact Info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Quick <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-white/70">
              Email is best for longer conversations. Social for quick hellos.
            </p>
          </div>
          
          <div className="space-y-4">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.link}
                target={social.name !== 'Email' ? '_blank' : undefined}
                rel="noreferrer"
                className="block group"
                onHoverStart={() => setHoveredSocial(social.name)}
                onHoverEnd={() => setHoveredSocial(null)}
                whileHover={{ x: 10 }}
              >
                <div className="flex items-center gap-4 p-4 rounded-2xl glass hover-glow">
                  <span className="text-2xl">{social.icon}</span>
                  <div>
                    <div className="font-medium text-white group-hover:gradient-text transition-all">
                      {social.name}
                    </div>
                    <div className="text-sm text-white/50">{social.handle}</div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: hoveredSocial === social.name ? 1 : 0,
                      x: hoveredSocial === social.name ? 0 : -10
                    }}
                    className="ml-auto text-white/40"
                  >
                    →
                  </motion.div>
                </div>
              </motion.a>
            ))}
          </div>
          
          <div className="pt-8 space-y-4">
            <h3 className="font-semibold text-white/80">Availability</h3>
            <p className="text-sm text-white/60">
              Available 24/7 if it's something interesting<br />
              I don't care if it's 3am - good opportunities don't wait<br />
              <span className="text-xs">(Usually respond within 2 hours, even on weekends)</span>
            </p>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-white/60">Always exploring something new</span>
            </div>
          </div>
        </div>
        
        {/* Form */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl glass-dark p-8 lg:p-10"
          >
            {sent ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-[400px] flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", duration: 0.6 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center mb-6"
                >
                  <span className="text-3xl">✓</span>
                </motion.div>
                <h3 className="text-2xl font-bold gradient-text mb-2">Boom! Message Sent 🚀</h3>
                <p className="text-white/70 mb-2">I'll get back to you faster than you can scroll to the next website!</p>
                <p className="text-white/50 text-sm">(Usually within a few hours, I'm basically glued to my phone 😄)</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      First Name
                    </label>
                    <input 
                      required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/10" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Last Name
                    </label>
                    <input 
                      required 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/10" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Email
                  </label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/10" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Company (Optional)
                  </label>
                  <input 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/10" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Message
                  </label>
                  <textarea 
                    required 
                    rows={5} 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/10 resize-none" 
                  />
                </div>
                
                <motion.button 
                  type="submit" 
                  className="premium-button w-full rounded-xl py-4 text-white font-semibold text-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

// ───────────────────────── Stats Section ─────────────────────────
function Stats() {
  const stats = [
    { value: '24hrs', label: 'Response Time' },
    { value: '100+', label: 'Projects Done' },
    { value: '3M+', label: 'People Reached' },
    { value: '99.9%', label: 'Success Rate' }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-purple-600/10 to-pink-600/10" />
      <div className="mx-auto max-w-6xl px-6 relative">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Contact() {
  const [gradientIndex, setGradientIndex] = useState(0);
  
  const gradients = [
    'radial-gradient(ellipse_at_center,#15151d_0%,#0f0e17_50%,#0a0a12_100%)',
    'radial-gradient(ellipse_at_center,#1a0f1f_0%,#0f0e17_50%,#0a0a12_100%)',
    'radial-gradient(ellipse_at_center,#0f141d_0%,#0f0e17_50%,#0a0a12_100%)',
  ];

  useEffect(() => {
    const gradientInterval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(gradientInterval);
  }, []);
  
  return (
    <>
      <SEO 
        title="Contact Kunal - Let's Build Something Amazing"
        description="Ready to discuss your next project? Contact Kunal Bhatia - AI/ML Engineer. Fast response guaranteed. Email: kunal@kunalis.me. Available for freelance and full-time opportunities."
        keywords={['Contact Kunal Bhatia', 'Hire ML Engineer', 'AI Engineer Contact', 'Freelance ML Developer', 'kunal@kunalis.me', 'Bangalore AI Engineer', 'ML Consultant']}
        url="https://kunalis.me/contact"
        image="https://kunalis.me/profile-purple.jpg"
      />
      <main className="relative min-h-screen bg-[#0f0e17] font-inter text-white">
      {/* Animated gradient background */}
      <motion.div 
        className="pointer-events-none fixed inset-0 -z-20"
        animate={{ background: gradients[gradientIndex] }}
        transition={{ duration: 2 }}
      />
      <Navbar />
      <Hero />
      <ContactCard />
      <Stats />
      <Footer />
    </main>
    </>
  );
}