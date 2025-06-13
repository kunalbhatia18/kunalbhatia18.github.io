// Performance monitoring utilities
interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  fid?: number;
  ttfb?: number;
  fps?: number; // Added back for console logging
  memory?: number;
}

class PerformanceMonitorClass {
  private static instance: PerformanceMonitorClass;
  private metrics: PerformanceMetrics = {};
  private observer: PerformanceObserver | null = null;
  private frameCount = 0;
  private lastFrameTime = performance.now();
  private rafId: number | null = null;

  private constructor() {}

  static getInstance(): PerformanceMonitorClass {
    if (!PerformanceMonitorClass.instance) {
      PerformanceMonitorClass.instance = new PerformanceMonitorClass();
    }
    return PerformanceMonitorClass.instance;
  }

  init() {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Track paint metrics
    if ('PerformanceObserver' in window) {
      try {
        this.observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'paint') {
              if (entry.name === 'first-contentful-paint') {
                this.metrics.fcp = entry.startTime;
              }
            } else if (entry.entryType === 'largest-contentful-paint') {
              this.metrics.lcp = entry.startTime;
            } else if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              this.metrics.cls = (this.metrics.cls || 0) + (entry as any).value;
            } else if (entry.entryType === 'first-input') {
              this.metrics.fid = (entry as any).processingStart - entry.startTime;
            }
          }
        });

        this.observer.observe({ 
          entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input'] 
        });
      } catch (e) {
        console.warn('PerformanceObserver not supported');
      }
    }

    // Track TTFB
    if ('performance' in window && 'timing' in performance) {
      const navigationTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationTiming && navigationTiming.responseStart && navigationTiming.fetchStart) {
        this.metrics.ttfb = navigationTiming.responseStart - navigationTiming.fetchStart;
      }
    }

    // Start memory monitoring if available
    this.startMemoryMonitoring();

    // Monitor long tasks
    this.monitorLongTasks();
  }
  
  // Separate method to start FPS monitoring immediately for console logs
  startFPSMonitoringImmediate() {
    // Simple FPS counter that logs to console every 3 seconds
    const measureFPS = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - this.lastFrameTime;
      
      if (deltaTime >= 3000) { // Log every 3 seconds
        const fps = Math.round((this.frameCount * 1000) / deltaTime);
        this.metrics.fps = fps;
        
        // Color-coded console logging based on FPS
        if (fps >= 55) {
          console.log(`%c🟢 FPS: ${fps} (Excellent)`, 'color: #10b981; font-weight: bold;');
        } else if (fps >= 45) {
          console.log(`%c🟡 FPS: ${fps} (Good)`, 'color: #f59e0b; font-weight: bold;');
        } else if (fps >= 30) {
          console.log(`%c🟠 FPS: ${fps} (Fair)`, 'color: #f97316; font-weight: bold;');
        } else {
          console.log(`%c🔴 FPS: ${fps} (Poor)`, 'color: #ef4444; font-weight: bold;');
        }
        
        this.frameCount = 0;
        this.lastFrameTime = currentTime;
      }
      
      this.frameCount++;
      this.rafId = requestAnimationFrame(measureFPS);
    };
    
    this.rafId = requestAnimationFrame(measureFPS);
  }


  private startMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        const memory = (performance as any).memory;
        this.metrics.memory = memory.usedJSHeapSize / (1024 * 1024); // Convert to MB
      }, 5000);
    }
  }

  private monitorLongTasks() {
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Only log truly problematic long tasks (>100ms)
            if (entry.duration > 100) {
              console.warn('Long task detected:', entry.duration + 'ms');
            }
          }
        });
        longTaskObserver.observe({ entryTypes: ['longtask'] });
      } catch (e) {
        // Long task API might not be supported
      }
    }
  }

  getMetrics(): PerformanceMetrics {
    return { ...this.metrics };
  }

  cleanup() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
    }
  }
}

export const PerformanceMonitor = PerformanceMonitorClass;

// Export immediate FPS monitoring for early initialization
export const startImmediateFPSMonitoring = () => {
  const monitor = PerformanceMonitorClass.getInstance();
  monitor.startFPSMonitoringImmediate();
};

// Core Web Vitals measurement
export const measureCoreWebVitals = () => {
  if ('web-vital' in window) return;

  // Log metrics after page load
  window.addEventListener('load', () => {
    setTimeout(() => {
      const monitor = PerformanceMonitor.getInstance();
      const metrics = monitor.getMetrics();
      
      console.log('Core Web Vitals:', {
        FCP: metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A',
        LCP: metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A',
        CLS: metrics.cls ? metrics.cls.toFixed(3) : 'N/A',
        FID: metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A',
        TTFB: metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A'
      });
    }, 3000);
  });
};

// Add performance helpers to window for debugging
export const addPerformanceHelpers = () => {
  if (typeof window === 'undefined') return;
  
  // Prevent double initialization
  if ((window as any).performanceHelpersLoaded) {
    return;
  }
  
  (window as any).performanceHelpersLoaded = true;

  (window as any).performanceReport = () => {
    const monitor = PerformanceMonitor.getInstance();
    const metrics = monitor.getMetrics();

    console.group('📊 Performance Report');
    console.log('Core Web Vitals:');
    console.log(`  FCP: ${metrics.fcp ? metrics.fcp.toFixed(2) + 'ms' : 'N/A'}`);
    console.log(`  LCP: ${metrics.lcp ? metrics.lcp.toFixed(2) + 'ms' : 'N/A'}`);
    console.log(`  CLS: ${metrics.cls ? metrics.cls.toFixed(3) : 'N/A'}`);
    console.log(`  FID: ${metrics.fid ? metrics.fid.toFixed(2) + 'ms' : 'N/A'}`);
    console.log(`  TTFB: ${metrics.ttfb ? metrics.ttfb.toFixed(2) + 'ms' : 'N/A'}`);
    console.log('\nRuntime Metrics:');
    console.log(`  Current FPS: ${metrics.fps || 'N/A'}`);
    console.log(`  Memory Usage: ${metrics.memory ? metrics.memory.toFixed(2) + 'MB' : 'N/A'}`);
    console.groupEnd();
  };

  (window as any).analyzeBundleSize = async () => {
    console.group('📦 Bundle Size Analysis');
    console.log('Analyzing loaded resources...');
    
    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    const byType: Record<string, { count: number; size: number }> = {};
    
    resources.forEach(resource => {
      const type = resource.name.split('.').pop() || 'other';
      if (!byType[type]) {
        byType[type] = { count: 0, size: 0 };
      }
      byType[type].count++;
      byType[type].size += resource.transferSize || 0;
    });

    Object.entries(byType).forEach(([type, data]) => {
      console.log(`${type}: ${data.count} files, ${(data.size / 1024).toFixed(2)}KB`);
    });

    const totalSize = Object.values(byType).reduce((sum, data) => sum + data.size, 0);
    console.log(`\nTotal: ${(totalSize / 1024).toFixed(2)}KB`);
    console.groupEnd();
  };
};
