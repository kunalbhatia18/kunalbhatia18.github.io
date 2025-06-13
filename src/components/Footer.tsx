export function Footer() {
  const funStatuses = [
    'Currently building in Bangalore',
    'Caffeinating and creating in Bangalore',
    'Debugging the universe from Bangalore',
    'Compiling dreams in Bangalore',
    'Optimizing life from Bangalore',
    'Writing poetry in TypeScript from Bangalore',
    'Making magic happen in Bangalore'
  ];
  
  const randomStatus = funStatuses[Math.floor(Math.random() * funStatuses.length)];
  
  return (
    <footer className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12 mt-16 sm:mt-20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
        <div>
          <h3 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Connect</h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/60">
            <a href="mailto:kunal@kunalis.me" className="block hover:text-white transition-colors">kunal@kunalis.me</a>
            <a href="https://github.com/kunalb" className="block hover:text-white transition-colors">GitHub</a>
            <a href="https://twitter.com/kunal_b" className="block hover:text-white transition-colors">Twitter</a>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Quick Links</h3>
          <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-white/60">
            <a href="/projects" className="block hover:text-white transition-colors">Projects</a>
            <a href="/blog" className="block hover:text-white transition-colors">Blog</a>
            <a href="/about" className="block hover:text-white transition-colors">About</a>
          </div>
        </div>
        
        <div className="sm:col-span-2 md:col-span-1">
          <h3 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">Status</h3>
          <div className="flex items-center gap-2 text-xs sm:text-sm text-white/60">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            <span>{randomStatus}</span>
          </div>
          <p className="text-xs sm:text-sm text-white/40 mt-1 sm:mt-2">
            Bangalore, India • {new Date().getFullYear()}
          </p>
        </div>
      </div>
      
      <div className="text-center text-xs sm:text-sm text-white/40 pt-6 sm:pt-8 border-t border-white/10">
        Built with React, TypeScript, and way too much caffeine ☕
        <br className="hidden sm:block" />
        <span className="text-white/30 text-xs mt-1 block sm:inline sm:ml-2">
          🍝 Fun fact: This footer was written during a pasta break
        </span>
      </div>
    </footer>
  );
}