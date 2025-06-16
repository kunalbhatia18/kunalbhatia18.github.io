// Google Analytics 4 Event Tracking Utilities
// Replace 'G-XXXXXXXXXX' with your actual GA4 Measurement ID

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

// Track page views (for SPA routing)
export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', 'G-3K8218118K', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, {
      event_category: 'engagement',
      event_label: parameters?.label,
      value: parameters?.value,
      ...parameters,
    });
  }
};

// Predefined event trackers for common portfolio actions
export const analytics = {
  // Contact events
  emailClick: (method: 'direct' | 'mailto' | 'copy') => {
    trackEvent('contact_email', {
      method,
      event_category: 'contact'
    });
  },

  socialClick: (platform: string) => {
    trackEvent('social_click', {
      platform,
      event_category: 'social'
    });
  },

  // Project events
  projectView: (projectName: string) => {
    trackEvent('project_view', {
      project_name: projectName,
      event_category: 'projects'
    });
  },

  projectLinkClick: (projectName: string, linkType: 'demo' | 'github') => {
    trackEvent('project_link_click', {
      project_name: projectName,
      link_type: linkType,
      event_category: 'projects'
    });
  },

  // Navigation events
  navigationClick: (page: string) => {
    trackEvent('navigation_click', {
      page,
      event_category: 'navigation'
    });
  },

  // Chat widget events (if you have one)
  chatInteraction: (action: 'open' | 'question_click' | 'send') => {
    trackEvent('chat_interaction', {
      action,
      event_category: 'chat'
    });
  },

  // Resume/CV download
  resumeDownload: () => {
    trackEvent('resume_download', {
      event_category: 'engagement'
    });
  },

  // Time spent on page (optional)
  timeOnPage: (page: string, seconds: number) => {
    trackEvent('time_on_page', {
      page,
      seconds,
      event_category: 'engagement'
    });
  }
};

// Development mode check
export const isProduction = () => {
  return process.env.NODE_ENV === 'production' && 
         typeof window !== 'undefined' && 
         window.location.hostname !== 'localhost';
};

// Only track in production
const trackInProduction = (fn: () => void) => {
  if (isProduction()) {
    fn();
  }
};

// Export production-only tracking functions
export const productionAnalytics = {
  emailClick: (method: 'direct' | 'mailto' | 'copy') => trackInProduction(() => analytics.emailClick(method)),
  socialClick: (platform: string) => trackInProduction(() => analytics.socialClick(platform)),
  projectView: (projectName: string) => trackInProduction(() => analytics.projectView(projectName)),
  projectLinkClick: (projectName: string, linkType: 'demo' | 'github') => trackInProduction(() => analytics.projectLinkClick(projectName, linkType)),
  navigationClick: (page: string) => trackInProduction(() => analytics.navigationClick(page)),
  chatInteraction: (action: 'open' | 'question_click' | 'send') => trackInProduction(() => analytics.chatInteraction(action)),
  resumeDownload: () => trackInProduction(() => analytics.resumeDownload()),
};
