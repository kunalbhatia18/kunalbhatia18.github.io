import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
  
  // Build optimizations
  build: {
    // Enable source maps for debugging (disable in production if needed)
    sourcemap: false,
    
    // Optimize chunk splitting for better caching
    rollupOptions: {
      output: {
        // Split vendor libraries into separate chunks for better caching
        manualChunks: {
          // React core
          'react-vendor': ['react', 'react-dom'],
          // Routing
          'router': ['react-router-dom'],
          // Animation library (your heavy dependency)
          'framer-motion': ['framer-motion'],
        },
        
        // Better chunk naming for debugging
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    
    // Optimize for modern browsers (better performance)
    target: 'esnext',
    
    // Increase chunk size warning limit (your app might have large chunks)
    chunkSizeWarningLimit: 1000,
    
    // Enable minification for production
    minify: 'esbuild',
  },
  
  // Development server optimizations
  server: {
    // Enable HTTPS in development if needed
    // https: true,
    
    // Hot reload optimizations
    hmr: {
      overlay: true,
    },
    
    // Open browser automatically (optional)
    // open: true,
  },
  
  // Dependency pre-bundling optimizations
  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev server startup
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion'
    ],
    
    // Force re-optimization of dependencies when needed
    force: false,
  },
  
  // CSS optimizations
  css: {
    // Enable CSS source maps in development
    devSourcemap: true,
  },
  
  // Asset handling
  assetsInclude: ['**/*.woff', '**/*.woff2'],
  
  // Performance optimizations
  esbuild: {
    // Remove console.log in production (but keep console.error)
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
  
  // Bundle analysis
  define: {
    __BUNDLE_ANALYZE__: mode === 'analyze'
  }
  };
});
