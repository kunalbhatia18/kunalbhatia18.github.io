import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Completely disable service worker functionality and suppress logs
if ('serviceWorker' in navigator) {
  // Unregister any existing service workers
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister());
  });
  
  // Override the register method to prevent new registrations
  navigator.serviceWorker.register = () => {
    return Promise.reject(new Error('Service Worker registration disabled'));
  };
}

// Suppress specific console logs
const originalConsoleLog = console.log;
console.log = (...args) => {
  const message = args.join(' ');
  // Filter out service worker registration messages
  if (message.includes('SW registered') || 
      message.includes('ServiceWorkerRegistration') ||
      message.includes('service worker')) {
    return;
  }
  originalConsoleLog.apply(console, args);
};

createRoot(document.getElementById('root')!).render(
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}
  >
    <App />
  </BrowserRouter>,
)
