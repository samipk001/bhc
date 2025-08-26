"use client";

import { useState, useEffect, useRef } from 'react';

export const useScrollSpy = (
  ids: string[],
  options?: IntersectionObserverInit
): string | undefined => {
  const [activeId, setActiveId] = useState<string>();
  const observer = useRef<IntersectionObserver | null>(null);
  const elementsRef = useRef<Map<string, HTMLElement | null>>(new Map());

  useEffect(() => {
    ids.forEach(id => {
        elementsRef.current.set(id, document.getElementById(id));
    });
    const elements = ids.map(id => elementsRef.current.get(id)).filter(el => el !== null) as HTMLElement[];

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver((entries) => {
      // Find the entry that is most visible in the viewport
      let mostVisibleEntry: IntersectionObserverEntry | null = null;
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (!mostVisibleEntry || entry.intersectionRatio > mostVisibleEntry.intersectionRatio) {
                mostVisibleEntry = entry;
            }
        }
      });

      if (mostVisibleEntry) {
        setActiveId(mostVisibleEntry.target.id);
      }
    }, options);
    
    elements.forEach((el) => {
      if (el) {
        observer.current?.observe(el);
      }
    });

    // Initial check
    let mostVisibleEntry: IntersectionObserverEntry | null = null;
    const root = options?.root || null;
    const rootMargin = options?.rootMargin || '0px';
    const threshold = Array.isArray(options?.threshold) ? options.threshold : [options?.threshold || 0];

    elements.forEach(el => {
        const entry: IntersectionObserverEntry = {
            boundingClientRect: el.getBoundingClientRect(),
            intersectionRatio: 0, // Simplified for initial check
            intersectionRect: el.getBoundingClientRect(),
            isIntersecting: false,
            rootBounds: root instanceof Element ? root.getBoundingClientRect() : null,
            target: el,
            time: performance.now(),
        };
        // This is a simplified check. A full implementation would be more complex.
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        if(isVisible) {
             if (!mostVisibleEntry || rect.top > mostVisibleEntry.boundingClientRect.top) {
                // A very rough way to find the "most visible" element on load.
             }
        }
    });
    if (!activeId && window.scrollY === 0 && ids.includes('home')) {
        setActiveId('home');
    }


    return () => {
      elements.forEach((el) => {
        if (el && observer.current) {
          observer.current.unobserve(el);
        }
      });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(ids), JSON.stringify(options)]);

  return activeId;
};
