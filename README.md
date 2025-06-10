# Kunal's Portfolio Website

A modern, interactive portfolio website built with React 19, TypeScript, Tailwind CSS v4, Vite 6, and Framer Motion.

## Features

- **Landing Page**: Interactive chat widget with animated metrics
- **About Page**: Personal bio with hobby showcase
- **Projects Page**: Filterable project showcase with modal details
- **Blog Page**: Searchable blog posts
- **Contact Page**: Contact form with social links
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion interactions
- **Modern UI**: Glassmorphism effects and gradients

## Tech Stack

- **React 19** + **TypeScript 5.7**
- **Vite 6** for build tooling
- **Tailwind CSS v4** with new Vite plugin
- **Framer Motion 12** for animations
- **React Router 7** for navigation

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Start the development server:**
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Build for Production

```bash
npm run build
```

## Project Structure

```
src/
  pages/
    Landing.tsx    # Main landing page with chat widget
    About.tsx      # About page with bio and hobbies
    Projects.tsx   # Projects showcase with filtering
    Blog.tsx       # Blog posts listing
    Contact.tsx    # Contact form and social links
  App.tsx          # Main app with routing
  main.tsx         # App entry point
  index.css        # Global styles with Tailwind v4
```

## What's New in This Version

### ✅ Updated Dependencies (2025)
- **React 19**: Latest stable version with improved performance
- **Vite 6**: Fastest build tool with native ESM support
- **Tailwind CSS v4**: New architecture with better performance
- **Framer Motion 12**: Latest animation library
- **TypeScript 5.7**: Latest TypeScript with better React 19 support

### ✅ Fixed Issues
- **PostCSS ESM Compatibility**: Fixed "module is not defined" error
- **Tailwind v4 Integration**: Updated to use new `@tailwindcss/vite` plugin
- **React 19 Types**: Updated TypeScript configuration for React 19
- **Modern ES Modules**: Full ESM support throughout the project

## Customization

To customize the content:

1. **Personal Info**: Update the content in each page component
2. **Projects**: Modify the `projects` array in `Projects.tsx`
3. **Blog Posts**: Update the `posts` array in `Blog.tsx`
4. **Contact Info**: Change email addresses and social links
5. **Images**: Add your own images to the `public/` directory

## Image Assets Needed

Add these images to the `public/` directory:
- `/profile.jpg` - Your profile photo
- `/run.jpg`, `/stage.jpg`, `/cook.jpg`, `/travel.jpg` - Hobby images
- `/proj1.jpg` through `/proj5.jpg` - Project screenshots
- `/blog1.jpg` through `/blog4.jpg` - Blog post banners

## Configuration Files

- **`vite.config.ts`**: Vite configuration with React and Tailwind v4 plugins
- **`tailwind.config.ts`**: Tailwind CSS v4 configuration
- **`postcss.config.js`**: PostCSS configuration (ESM format)
- **`tsconfig.json`**: TypeScript configuration for React 19

## Deployment

This project can be deployed to:
- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

For Vercel:
```bash
npm run build
npx vercel --prod
```

## Troubleshooting

### PostCSS Errors
If you encounter PostCSS module errors, ensure:
- `postcss.config.js` uses ESM syntax (`export default`)
- `package.json` has `"type": "module"`

### Tailwind v4 Issues
If Tailwind classes aren't working:
- Verify `@tailwindcss/vite` plugin is installed
- Check that CSS imports use `@import "tailwindcss"`
- Ensure content paths in `tailwind.config.ts` are correct

### React 19 Compatibility
For React 19 compatibility issues:
- Update `@types/react` and `@types/react-dom` to v19
- Ensure TypeScript is on version 5.7+
- Check that `allowSyntheticDefaultImports` is enabled

## License

MIT License - feel free to use this template for your own portfolio!
