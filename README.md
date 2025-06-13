# Kunal's Portfolio Website

A modern, high-performance portfolio website built with React 18, TypeScript, Tailwind CSS, Vite 6, and Framer Motion. Optimized for 60+ FPS performance with advanced GPU acceleration and glass-morphism design.

## 🚀 Features

- **Landing Page**: Interactive AI chat widget with real-time streaming responses
- **About Page**: Personal bio with hobby showcase and tech stack matrix
- **Projects Page**: Filterable project showcase with modal details and metrics
- **Blog Page**: Searchable blog posts with modern layout
- **Contact Page**: Contact form with social links
- **Performance Optimized**: 60+ FPS target with GPU acceleration and smart caching
- **Responsive Design**: Mobile-first approach with glass-morphism effects
- **AI Chat Widget**: Working AI assistant with streaming responses and easter eggs
- **SEO Optimized**: Complete meta tags, structured data, and Open Graph

## 🛠 Tech Stack

- **React 18.3** + **TypeScript 5.7** - Modern React with full type safety
- **Vite 6.3** - Lightning-fast build tooling with hot reload
- **Tailwind CSS 3.4** - Utility-first CSS with custom glass effects
- **Framer Motion 11** - Smooth animations and micro-interactions
- **React Router 6.28** - Client-side routing

## ⚡ Performance Features

- **GPU Acceleration**: Smart layer management for 60+ FPS
- **State Optimization**: Consolidated React state for better performance
- **Bundle Splitting**: Optimized chunk splitting for faster loading
- **Smart Caching**: Aggressive caching strategies for inference speed
- **Memory Management**: Proper cleanup and performance monitoring

## 🎯 Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. **Open [http://localhost:5173](http://localhost:5173) in your browser**

4. **For performance testing:**
```bash
npm run perf:test
```

## 📦 Build for Production

```bash
npm run build
```

## 📊 Bundle Analysis

```bash
npm run build:analyze
npm run analyze:size
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── landing/
│   │   ├── ChatWidget.tsx      # AI chat with streaming responses
│   │   ├── ChatHeader.tsx      # Chat header component
│   │   ├── ChatMessages.tsx    # Message display with typing
│   │   ├── ChatInput.tsx       # Input with suggestions
│   │   ├── HeroSection.tsx     # Landing hero with metrics
│   │   ├── CallToAction.tsx    # CTA section
│   │   └── MetricCards.tsx     # Animated metric cards
│   ├── ui/
│   │   ├── CustomCursor.tsx    # Custom cursor effects
│   │   ├── PageTransition.tsx  # Page transition animations
│   │   ├── SEO.tsx            # SEO component with meta tags
│   │   └── ScrollProgress.tsx  # Scroll progress indicator
│   ├── Navbar.tsx             # Glass-morphism navbar
│   └── Footer.tsx             # Footer with status
├── pages/
│   ├── Landing.tsx            # Main landing page
│   ├── About.tsx              # About page with hobbies
│   ├── Projects.tsx           # Projects showcase
│   ├── Blog.tsx               # Blog posts
│   └── Contact.tsx            # Contact form
├── constants/
│   └── animations.ts          # Animation constants
├── utils/
│   └── performance.ts         # Performance utilities
├── App.tsx                    # Main app with routing
├── main.tsx                   # App entry point
└── index.css                  # Global styles + GPU optimizations
```

## 🎨 Design System

### Glass-Morphism Effects
- **Navbar**: Translucent with backdrop blur
- **Cards**: Glass effects with subtle borders
- **Chat Widget**: Dark gradient with glow effects

### Typography
- **Primary Font**: Inter (loaded from Google Fonts)
- **Responsive Scale**: clamp() functions for fluid typography
- **Gradient Text**: Animated gradient text effects

### Performance CSS
- **GPU Layers**: Strategic use of `transform: translateZ(0)`
- **Containment**: CSS containment for layout optimization
- **Smart Animations**: Reduced motion support

## 🤖 AI Chat Widget

The chat widget features:
- **Real-time Streaming**: Character-by-character response streaming
- **Smart Responses**: Context-aware responses about Kunal's work
- **Easter Eggs**: Hidden responses for fun queries
- **Performance Optimized**: Consolidated state management
- **Mobile Optimized**: Touch-friendly with proper cleanup

### Easter Eggs in Chat
Try typing: `coffee`, `pizza`, `bug`, `konami`, `dance`, `secret`

## 🔧 Customization

### Personal Content
1. **Update project data** in `src/pages/Projects.tsx`
2. **Modify chat responses** in `src/components/landing/ChatWidget.tsx`
3. **Change personal info** in all page components
4. **Update social links** in `src/components/Footer.tsx`

### Images Needed
Place these in the `public/` directory:
- `favicon.ico` - Site favicon
- `logo-192.png` - PWA icon (192x192)
- `logo-512.png` - PWA icon (512x512)
- `og-image.jpg` - Open Graph image (1200x630)
- `profile-purple.jpg` - Your profile photo

### Performance Tuning
- **GPU Acceleration**: Modify `.gpu-*` classes in `index.css`
- **Animation Settings**: Update `src/constants/animations.ts`
- **Bundle Optimization**: Adjust `vite.config.ts` chunks

## 🚀 Deployment

### Recommended: Vercel
```bash
npm run build
npx vercel --prod
```

### Other Platforms
- **Netlify**: Direct GitHub integration
- **GitHub Pages**: Static site deployment
- **AWS S3**: Static website hosting

### Performance Checklist
- ✅ 60+ FPS animations
- ✅ Sub-100ms TTFB
- ✅ 90+ Lighthouse score
- ✅ Mobile-optimized
- ✅ SEO-ready

## 🎯 Production Optimizations

- **Service Worker**: Disabled to prevent console spam
- **Console Filtering**: Performance logs only in development
- **Memory Management**: Proper interval cleanup
- **Error Boundaries**: Production error handling
- **Bundle Splitting**: React, Router, and Framer Motion separated

## 🐛 Troubleshooting

### Build Issues
- Ensure Node.js 18+ is installed
- Clear `node_modules` and reinstall if needed
- Check TypeScript errors with `npm run build`

### Performance Issues
- Monitor FPS in browser console
- Use React DevTools Profiler
- Check for memory leaks in long sessions

### Mobile Issues
- Test touch interactions on actual devices
- Verify backdrop-filter support
- Check for iOS Safari specific issues

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

---

**Built with ♥️ in Bangalore** | **Powered by coffee and TypeScript** ☕
