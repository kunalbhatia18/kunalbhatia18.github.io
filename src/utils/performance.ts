// Performance monitoring utilities
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();
  private observers: PerformanceObserver[] = [];
  private isInitialized: boolean = false;

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  init() {
    if (typeof window === 'undefined' || this.isInitialized) return;
    this.isInitialized = true;

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn('Long task detected:', entry.duration + 'ms');
              this.recordMetric('longTasks', entry.duration);
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
        this.observers.push(longTaskObserver);
      } catch (e) {
        // Long task observation not supported
      }

      // Monitor layout shifts
      try {
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if ('value' in entry && typeof (entry as any).value === 'number' && (entry as any).value > 0.1) {
              console.warn('Layout shift detected:', (entry as any).value);
              this.recordMetric('layoutShifts', (entry as any).value as number);
            }
          }
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
        this.observers.push(clsObserver);
      } catch (e) {
        // Layout shift observation not supported
      }
    }

    // Monitor memory usage (if available)
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        if (memory) {
          this.recordMetric('memoryUsage', memory.usedJSHeapSize / 1024 / 1024);
        }
      }, 5000);
    }

    // Monitor FPS
    this.monitorFPS();
  }

  private monitorFPS() {
    let lastTime = performance.now();
    let frameCount = 0;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        this.recordMetric('fps', fps);
        
        if (fps < 50) {
          console.warn('Low FPS detected:', fps);
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  private recordMetric(name: string, value: number) {
    if (!this.metrics.has(name)) {
      this.metrics.set(name, []);
    }
    const values = this.metrics.get(name)!;
    values.push(value);
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
  }

  getMetrics(): Record<string, { avg: number; max: number; min: number; latest: number }> {
    const result: Record<string, any> = {};
    
    for (const [name, values] of this.metrics) {
      if (values.length === 0) continue;
      
      result[name] = {
        avg: values.reduce((sum, val) => sum + val, 0) / values.length,
        max: Math.max(...values),
        min: Math.min(...values),
        latest: values[values.length - 1]
      };
    }
    
    return result;
  }

  logPerformanceReport() {
    const metrics = this.getMetrics();
    console.group('🚀 Performance Report');
    
    Object.entries(metrics).forEach(([name, stats]) => {
      console.log(`${name}:`, {
        latest: Math.round(stats.latest * 100) / 100,
        avg: Math.round(stats.avg * 100) / 100,
        max: Math.round(stats.max * 100) / 100,
        min: Math.round(stats.min * 100) / 100
      });
    });
    
    console.groupEnd();
  }

  cleanup() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
    this.isInitialized = false;
  }
}

// Core Web Vitals monitoring
export function measureCoreWebVitals() {
  if (typeof window === 'undefined') return;

  // Largest Contentful Paint
  if ('PerformanceObserver' in window) {
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('LCP:', entry.startTime);
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Not supported
    }

    // First Input Delay
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const perfEntry = entry as any;
          if (perfEntry.processingStart && perfEntry.startTime) {
            console.log('FID:', perfEntry.processingStart - perfEntry.startTime);
          }
        }
      }).observe({ entryTypes: ['first-input'] });
    } catch (e) {
      // Not supported
    }
  }
}

// Bundle size analysis
export function analyzeBundleSize() {
  if (typeof window === 'undefined') return;

  // Analyze loaded scripts
  const scripts = Array.from(document.scripts);
  let totalSize = 0;

  scripts.forEach(script => {
    if (script.src) {
      fetch(script.src, { method: 'HEAD' })
        .then(response => {
          const size = parseInt(response.headers.get('content-length') || '0');
          totalSize += size;
          console.log(`Script: ${script.src.split('/').pop()} - ${(size / 1024).toFixed(2)}KB`);
        })
        .catch(() => {
          // Ignore CORS errors
        });
    }
  });

  setTimeout(() => {
    console.log(`Total estimated bundle size: ${(totalSize / 1024).toFixed(2)}KB`);
  }, 2000);
}

// Development helpers
let helpersInitialized = false;

export function addPerformanceHelpers() {
  if (typeof window === 'undefined' || helpersInitialized) return;
  helpersInitialized = true;
  
  // Only add helpers in development (when not minified)
  try {
    // In production builds, this function name will be minified
    if (addPerformanceHelpers.name !== 'addPerformanceHelpers') return;
  } catch (e) {
    // If there's any error, just skip adding helpers
    return;
  }

  // Add global helper functions for development
  (window as any).performanceReport = () => {
    PerformanceMonitor.getInstance().logPerformanceReport();
  };

  (window as any).analyzeBundleSize = analyzeBundleSize;

  console.log('🔧 Performance helpers loaded. Try:');
  console.log('  performanceReport() - View performance metrics');
  console.log('  analyzeBundleSize() - Analyze bundle size');
}
