'use client';

import { useEffect } from 'react';

export function initScrollReveal() {
  if (typeof window === 'undefined') return;
  
  const revealElements = document.querySelectorAll('.scroll-reveal');
  
  const revealHandler = () => {
    revealElements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Element is in viewport
      if (rect.top <= windowHeight * 0.85) {
        element.classList.remove('opacity-0', 'translate-y-10');
        element.classList.add('opacity-100', 'translate-y-0');
      }
    });
  };
  
  // Initial check
  revealHandler();
  
  // Add scroll listener
  window.addEventListener('scroll', revealHandler, { passive: true });
  
  // Cleanup
  return () => {
    window.removeEventListener('scroll', revealHandler);
  };
}