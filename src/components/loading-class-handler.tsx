'use client';

import { useEffect } from 'react';

export default function LoadingClassHandler() {
  useEffect(() => {
    // Add loading class on mount
    document.documentElement.classList.add('loading');
    
    // Remove loading class when page is fully loaded
    const handleLoad = () => {
      document.documentElement.classList.remove('loading');
    };
    
    // Check if page is already loaded
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
  
  // This component doesn't render anything
  return null;
}