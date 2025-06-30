import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar, Footer, SEO } from '../components';
// import { getAssetUrl, IMAGES } from '../utils/assets';

/*************************** Sample posts ***************************/
// const posts = [
//   {
//     slug: 'llm-cache',
//     title: 'Caching LLM calls for fun & profit',
//     date: '2025-05-20',
//     reading: '6 min',
//     banner: getAssetUrl(IMAGES.blog1),
//     blurb: 'Slash costs 80% by memoising GPT responses intelligently.',
//     views: '12.5K',
//     category: 'Engineering'
//   },
//   {
//     slug: 'fast-faiss',
//     title: 'FAISS tricks nobody told you',
//     date: '2025-04-10',
//     reading: '7 min',
//     banner: getAssetUrl(IMAGES.blog2),
//     blurb: 'Obscure index params that unlock 30% better recall.',
//     views: '8.2K',
//     category: 'AI/ML'
//   },
//   {
//     slug: 'ux-latency',
//     title: 'Designing for 30-ms latency',
//     date: '2025-03-02',
//     reading: '5 min',
//     banner: getAssetUrl(IMAGES.blog3),
//     blurb: 'Micro-copy & skeletons that hide network lag beautifully.',
//     views: '15.7K',
//     category: 'Design'
//   },
//   {
//     slug: 'voice-agents',
//     title: 'Taming Voice Agents',
//     date: '2025-01-12',
//     reading: '8 min',
//     banner: getAssetUrl(IMAGES.blog4),
//     blurb: 'From whisper to chat: building smooth voice pipelines.',
//     views: '9.3K',
//     category: 'AI/ML'
//   },
// ];

/************************** Hero **************************/
function Hero() {
  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32 lg:pt-40 pb-8 sm:pb-12 lg:pb-16 text-center text-white overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,#15151d_0%,#0f0e17_50%,#0a0a12_100%)]" />
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
        {/* FIXED: Consistent responsive typography */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight mb-6 sm:mb-8">
          Build Logs<br />
          & <span className="gradient-text">Bytes</span>
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
          Hand-crafted notes from shipping <span className="text-indigo-400 font-semibold">sub-100ms</span> products. 
          Real insights from the trenches.
        </p>
      </motion.div>
    </section>
  );
}

/*************************** Search Bar ***************************/
// function SearchBar({ q, setQ }: { q: string; setQ: (s: string) => void }) {
//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       className="mx-auto mb-12 max-w-2xl"
//     >
//       <div className="relative group">
//         <input 
//           value={q} 
//           onChange={e => setQ(e.target.value)} 
//           placeholder="Search posts by title, content, or category..." 
//           className="w-full rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-white placeholder-white/40 outline-none transition-all focus:border-indigo-500/50 focus:bg-white/10 backdrop-blur-md"
//         />
//         <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//           </svg>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

/*************************** Post Card ***************************/
// function PostCard({ post, index }: { post: any, index: number }) {
//   return (
//     <motion.a 
//       href={`/blog/${post.slug}`}
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ delay: index * 0.1, duration: 0.5 }}
//       whileHover={{ y: -10, transition: { duration: 0.2 } }}
//       className="group block"
//     >
//       <article className="overflow-hidden rounded-3xl glass hover-glow h-full flex flex-col">
//         <div className="aspect-[16/10] overflow-hidden">
//           <img 
//             src={post.banner} 
//             alt={post.title} 
//             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
//           />
//         </div>
//         
//         <div className="p-8 flex-1 flex flex-col">
//           <div className="flex items-center gap-3 text-sm text-white/50 mb-3">
//             <span className="px-3 py-1 rounded-full bg-white/10 text-white/70">{post.category}</span>
//             <span>{post.date}</span>
//             <span>•</span>
//             <span>{post.reading}</span>
//           </div>
//           
//           <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
//             {post.title}
//           </h3>
//           
//           <p className="text-white/70 leading-relaxed flex-1">{post.blurb}</p>
//           
//           <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
//             <span className="text-sm text-white/50">{post.views} views</span>
//             <motion.span 
//               className="text-indigo-400 font-medium flex items-center gap-2"
//               animate={{ x: [0, 5, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             >
//               Read more 
//               <span>→</span>
//             </motion.span>
//           </div>
//         </div>
//       </article>
//     </motion.a>
//   );
// }

/*************************** Featured Section ***************************/
// function FeaturedPost() {
//   const featured = posts[2]; // UX latency post
//   
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="mb-20"
//     >
//       <h2 className="text-2xl font-bold mb-8 gradient-text">Featured Post</h2>
//       <a href={`/blog/${featured.slug}`} className="group block">
//         <div className="relative overflow-hidden rounded-3xl glass hover-glow">
//           <div className="grid lg:grid-cols-2 gap-8">
//             <div className="aspect-video lg:aspect-auto overflow-hidden">
//               <img 
//                 src={featured.banner} 
//                 alt={featured.title} 
//                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
//               />
//             </div>
//             <div className="p-8 lg:p-12 flex flex-col justify-center">
//               <div className="flex items-center gap-3 text-sm text-white/50 mb-4">
//                 <span className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//                   {featured.category}
//                 </span>
//                 <span>{featured.reading}</span>
//               </div>
//               <h3 className="text-3xl font-bold text-white mb-4">
//                 {featured.title}
//               </h3>
//               <p className="text-lg text-white/70 leading-relaxed mb-6">
//                 {featured.blurb}
//               </p>
//               <div className="flex items-center gap-6">
//                 <span className="text-sm text-white/50">{featured.views} views</span>
//                 <motion.span 
//                   className="text-indigo-400 font-medium flex items-center gap-2"
//                   whileHover={{ x: 10 }}
//                 >
//                   Read full article 
//                   <span>→</span>
//                 </motion.span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </a>
//     </motion.div>
//   );
// }

/*************************** Coming Soon Section ***************************/
function ComingSoon() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="mx-auto max-w-4xl text-center py-16 px-4 sm:px-6"
    >
      <div className="relative">
        {/* Subtle background matching your site's aesthetic */}
        <div 
          className="absolute inset-0 rounded-3xl -z-10"
          style={{
            background: `
              radial-gradient(ellipse_at_center, rgba(21, 21, 29, 0.3) 0%, rgba(15, 14, 23, 0.1) 40%, transparent 80%),
              linear-gradient(45deg, rgba(99, 102, 241, 0.02) 0%, transparent 50%, rgba(139, 69, 195, 0.02) 100%)
            `
          }}
        />
        
        <div className="relative z-10 py-12">
          {/* Simple icon matching your site's style */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-600/50 to-purple-600/50 rounded-full border border-indigo-500/30 mb-8 shadow-lg"
            style={{
              background: 'linear-gradient(45deg,rgb(99, 102, 241, 0.4) 0%,rgb(139, 92, 246, 0.3) 50%',  
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)'
            }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span className="text-sm font-semibold text-white">Articles in Progress</span>
          </motion.div>
          
          {/* Typography matching your hero section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight mb-6 text-white">
              Building something{' '}
              <motion.span 
                className="gradient-text inline-block"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: '200% 200%' }}
              >
                special
              </motion.span>.
            </h2>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto mb-4">
              Crafting in-depth insights on performance optimization, ML engineering, and production systems.
            </p>
            <p className="text-base sm:text-lg text-indigo-400 leading-relaxed max-w-2xl mx-auto">
              Meanwhile, try my AI assistant on the <a href="/" className="underline hover:no-underline">home page</a> →
            </p>
          </motion.div>
          
          {/* Topic preview matching your site's minimal style */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto"
          >
            {[
              'FastAPI Performance',
              'FAISS Optimization', 
              'Voice AI Systems',
              'Sub-100ms Latency',
              'LLM Cost Engineering',
              'Production ML'
            ].map((topic, index) => (
              <motion.div 
                key={topic}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-sm text-white/60 py-2 px-3 rounded-lg bg-white/[0.02] border border-white/[0.05] hover:border-white/10 hover:text-white/80 transition-all duration-300"
              >
                {topic}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/*************************** Page ***************************/
export default function BlogIndex() {
  // const [q, setQ] = useState('');
  const [gradientIndex, setGradientIndex] = useState(0);
  
  const gradients = [
    'radial-gradient(ellipse_at_top,#15151d_0%,#0f0e17_50%,#0a0a12_100%)',
    'radial-gradient(ellipse_at_top,#1a0f1f_0%,#0f0e17_50%,#0a0a12_100%)',
    'radial-gradient(ellipse_at_top,#0f141d_0%,#0f0e17_50%,#0a0a12_100%)',
  ];

  useEffect(() => {
    const gradientInterval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % gradients.length);
    }, 5000);
    return () => clearInterval(gradientInterval);
  }, []);
  
  // const visible = posts.filter(p => 
  //   p.title.toLowerCase().includes(q.toLowerCase()) || 
  //   p.blurb.toLowerCase().includes(q.toLowerCase()) ||
  //   p.category.toLowerCase().includes(q.toLowerCase())
  // );
  
  return (
    <>
      <SEO 
        title="Blog - Kunal's Build Logs & Engineering Insights"
        description="Engineering insights from the trenches. Sub-100ms latency tricks, LLM caching strategies, FAISS optimization, voice AI pipelines. Real experiences from shipping at scale."
        keywords={['Engineering Blog', 'Sub-100ms latency', 'LLM caching', 'FAISS optimization', 'Voice AI', 'ML Engineering', 'FastAPI tips', 'AI Performance']}
        url="https://kunalis.me/blog"
        image="https://kunalis.me/blog1.jpg"
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
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pb-16 sm:pb-24">
        {/* <div className="mt-12">
          <SearchBar q={q} setQ={setQ} />
        </div>
        
        {q === '' && <FeaturedPost />}
        
        <AnimatePresence mode="popLayout">
          {visible.length > 0 ? (
            <motion.div 
              layout
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {visible.map((p, i) => (
                <PostCard key={p.slug} post={p} index={i} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-white/60 mb-4">No posts found for "{q}"</p>
              <button 
                onClick={() => setQ('')}
                className="text-indigo-400 hover:text-indigo-300 font-medium"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </AnimatePresence> */}
        
        <ComingSoon />
      </div>
      
      <Footer />
    </main>
    </>
  );
}
