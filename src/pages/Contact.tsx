import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer, SEO } from '../components';
import { productionAnalytics } from '../utils/analytics';

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
          Let's <span className="gradient-text">collaborate</span>
        </h1>
        <p className="text-lg text-white/70 max-w-2xl mx-auto">
          Whether you're an investor, founder, or just someone working on cool AI stuff — I love connecting with smart people.
        </p>
      </motion.div>
    </section>
  );
}

// ───────────────────────── Contact Card ─────────────────────────
function ContactCard() {
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);
  const [hoveredAction, setHoveredAction] = useState<string | null>(null);

  const socials = [
    { name: 'Email', icon: '✉️', link: 'mailto:kunal@kunalis.me', handle: 'kunal@kunalis.me', description: 'Best for detailed discussions' },
    { name: 'GitHub', icon: '💻', link: 'https://github.com/kunalbhatia18', handle: 'github.com/kunalbhatia18', description: 'Check out my latest code' },
    { name: 'Instagram', icon: '📸', link: 'https://instagram.com/kunal_bhatia18', handle: '@kunal_bhatia18', description: 'Behind the scenes and life updates' },
    { name: 'Twitter', icon: '🐦', link: 'https://twitter.com/kunal_b', handle: '@kunal_b', description: 'Daily thoughts and updates' },
    { name: 'LinkedIn', icon: '💼', link: 'https://linkedin.com/in/kunalb', handle: 'in/kunalb', description: 'Professional networking' }
  ];

  const quickActions = [
    {
      title: 'Discuss Ideas',
      description: 'Have an interesting AI project, startup idea, or want to explore collaboration opportunities?',
      action: 'mailto:kunal@kunalis.me?subject=Let\'s Discuss&body=Hi Kunal,%0D%0A%0D%0AI\'d love to discuss an interesting opportunity with you.%0D%0A%0D%0AWhat I\'m working on:%0D%0A%0D%0AWhy I think you\'d be interested:%0D%0A%0D%0ANext steps:%0D%0A%0D%0ABest regards',
      icon: '💡',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Explore Opportunities',
      description: 'Building something ambitious? Let\'s see if there\'s a way we can work together.',
      action: 'mailto:kunal@kunalis.me?subject=Collaboration Opportunity&body=Hi Kunal,%0D%0A%0D%0AI have an exciting opportunity that might interest you.%0D%0A%0D%0AWhat we\'re building:%0D%0A%0D%0AWhy it matters:%0D%0A%0D%0AHow you might fit:%0D%0A%0D%0ALet\'s chat!',
      icon: '🎆',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Connect & Learn',
      description: 'Want to pick my brain about AI, discuss industry trends, or just network?',
      action: 'mailto:kunal@kunalis.me?subject=Let\'s Connect&body=Hi Kunal,%0D%0A%0D%0AI\'d love to connect and learn more about your work in AI.%0D%0A%0D%0AWhat I\'m curious about:%0D%0A%0D%0AWhat I\'m working on:%0D%0A%0D%0ALooking forward to chatting!',
      icon: '🤝',
      gradient: 'from-green-500 to-teal-600'
    }
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-16"
      >
        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.title}
              href={action.action}
              className="block group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredAction(action.title)}
              onHoverEnd={() => setHoveredAction(null)}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => {
                // Track email contact via mailto
                productionAnalytics.emailClick('mailto');
              }}
            >
              <div className="h-full p-8 rounded-3xl glass hover-glow transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                  <span className="text-2xl">{action.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:gradient-text transition-all">
                  {action.title}
                </h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  {action.description}
                </p>
                <div className="flex items-center justify-between">
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: hoveredAction === action.title ? 1 : 0.5,
                      x: hoveredAction === action.title ? 0 : -10
                    }}
                    className="flex items-center text-sm font-medium text-white/60 group-hover:text-white transition-colors"
                  >
                    Start conversation →
                  </motion.div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Track email copy event
                      productionAnalytics.emailClick('copy');
                      navigator.clipboard.writeText('kunal@kunalis.me').then(() => {
                        // Simple visual feedback
                        const btn = e.target as HTMLElement;
                        const originalText = btn.textContent;
                        btn.textContent = '✓';
                        setTimeout(() => {
                          btn.textContent = originalText;
                        }, 1000);
                      });
                    }}
                    className="text-xs text-white/40 hover:text-white/60 transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/20"
                    title="Copy email address"
                  >
                    Copy Email
                  </button>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
        
        {/* Contact Methods */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left side - Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                Or reach out <span className="gradient-text">directly</span>
              </h3>
              <p className="text-white/70">
                I respond to all messages personally. Always curious about what others are building.
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
                  whileHover={{ x: 10, scale: 1.02 }}
                  onClick={() => {
                    // Track social media clicks
                    if (social.name === 'Email') {
                      productionAnalytics.emailClick('direct');
                    } else {
                      productionAnalytics.socialClick(social.name.toLowerCase());
                    }
                  }}
                >
                  <div className="flex items-center gap-4 p-4 rounded-2xl glass hover-glow">
                    <span className="text-2xl">{social.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium text-white group-hover:gradient-text transition-all">
                        {social.name}
                      </div>
                      <div className="text-sm text-white/50">{social.handle}</div>
                      <div className="text-xs text-white/40 mt-1">{social.description}</div>
                    </div>
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: hoveredSocial === social.name ? 1 : 0,
                        x: hoveredSocial === social.name ? 0 : -10
                      }}
                      className="text-white/40"
                    >
                      →
                    </motion.div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Right side - Availability & Info */}
          <div className="space-y-8">
            <div className="rounded-3xl glass-dark p-8">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                Availability
              </h3>
              
              <div className="space-y-4 text-white/70">
                <div className="flex items-start gap-3">
                  <span className="text-lg">⚡</span>
                  <div>
                    <div className="font-medium text-white mb-1">Lightning Fast Responses</div>
                    <div className="text-sm">Usually within 2-4 hours, even on weekends</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-lg">🌍</span>
                  <div>
                    <div className="font-medium text-white mb-1">Global Timezone Friendly</div>
                    <div className="text-sm">Based in Bangalore (GMT+5:30) but work with global teams</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-lg">🎯</span>
                  <div>
                    <div className="font-medium text-white mb-1">Always Exploring</div>
                    <div className="text-sm">Interested in AI/ML, startups, and innovative projects</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="rounded-3xl glass-dark p-8">
              <h3 className="text-xl font-semibold mb-4">What I’m Into Right Now</h3>
              <div className="space-y-3 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full" />
                  <span>Building AI productivity tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  <span>Exploring machine learning at scale</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  <span>Voice AI and real-time interfaces</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span>The future of work and automation</span>
                </div>
              </div>
            </div>
          </div>
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