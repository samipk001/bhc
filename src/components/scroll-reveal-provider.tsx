'use client';

import { ReactNode, useEffect } from 'react';
import { initScrollReveal } from '@/lib/scroll-reveal';

interface ScrollRevealProviderProps {
  children: ReactNode;
}

export default function ScrollRevealProvider({ children }: ScrollRevealProviderProps) {
  useEffect(() => {
    const cleanup = initScrollReveal();
    return cleanup;
  }, []);

  return <>{children}</>;
}