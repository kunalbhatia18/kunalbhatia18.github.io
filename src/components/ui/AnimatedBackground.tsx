import { useEffect, useRef, useCallback, useMemo } from 'react';

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>(0);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Optimized particle class with reduced calculations
  const Particle = useMemo(() => {
    return class {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      baseOpacity: number;
      
      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5; // Slightly smaller particles
        this.speedX = (Math.random() - 0.5) * 0.3; // Slower movement
        this.speedY = (Math.random() - 0.5) * 0.3;
        this.baseOpacity = Math.random() * 0.3 + 0.1; // Reduced base opacity
        this.opacity = this.baseOpacity;
        this.hue = Math.random() * 60 + 240; // Blue to purple range
      }

      update(width: number, height: number, time: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;

        // Optimized opacity animation (less frequent calculations)
        this.opacity = this.baseOpacity + Math.sin(time * 0.001 + this.x * 0.005) * 0.1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `hsla(${this.hue}, 70%, 60%, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };
  }, []);

  // Optimized canvas sizing
  const setCanvasSize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { innerWidth, innerHeight } = window;
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    // Recreate particles with new dimensions
    particlesRef.current = [];
    const particleCount = Math.min(50, Math.floor((innerWidth * innerHeight) / 20000)); // Adaptive particle count
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(innerWidth, innerHeight));
    }
  }, [Particle]);

  // Optimized mouse tracking (throttled)
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.x = e.clientX;
    mouseRef.current.y = e.clientY;
  }, []);

  // Main animation loop with performance optimizations
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const time = Date.now();
    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Clear canvas with trail effect (more efficient than full clear)
    ctx.fillStyle = 'rgba(10, 10, 18, 0.1)'; // More opaque for better performance
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles (reduced mouse interaction frequency)
    particles.forEach((particle, i) => {
      // Only check mouse interaction every 4th frame for performance
      if (i % 4 === 0) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = dx * dx + dy * dy;

        if (distance < 30000) { // Reduced interaction range
          const force = (1 - distance / 30000) * 0.03; // Reduced force
          particle.speedX += dx * force * 0.0003;
          particle.speedY += dy * force * 0.0003;
        }
      }

      particle.update(width, height, time);
      particle.draw(ctx);

      // Further reduced connection drawing (every 3rd particle)
      if (i % 3 === 0) {
        particles.slice(i + 3).forEach(other => {
          const dx2 = particle.x - other.x;
          const dy2 = particle.y - other.y;
          const distance2 = dx2 * dx2 + dy2 * dy2;

          if (distance2 < 10000) { // Reduced connection range (100px)
            const opacity = (1 - distance2 / 10000) * 0.08; // Further reduced opacity
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.3; // Thinner lines
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      }
    });

    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    setCanvasSize();
    
    // Use passive listeners for better performance
    window.addEventListener('resize', setCanvasSize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [setCanvasSize, handleMouseMove, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-30 opacity-40" // Reduced opacity
      style={{ 
        filter: 'blur(0.5px)', // Reduced blur
        willChange: 'auto' // Let browser decide
      }}
    />
  );
}