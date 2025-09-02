'use client';

import { useEffect, useState } from 'react';

export default function LoadingIndicator() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Set loading to false when page is fully loaded
    const handleLoad = () => {
      setIsLoading(false);
    };

    // Check if page is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false);
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-primary font-medium">Loading...</p>
      </div>
    </div>
  );
}