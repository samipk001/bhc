'use client';

import { ReactNode, useEffect } from 'react';
import { initScrollReveal } from '@/lib/scroll-reveal';

interface ScrollRevealProviderProps {
  children: ReactNode;
}

export default function ScrollRevealProvider({ children }: ScrollRevealProviderProps) {
  useEffect(() => {
    // Delay scroll reveal initialization to avoid blocking initial render
    const timer = setTimeout(() => {
      const cleanup = initScrollReveal();
      return cleanup;
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
}