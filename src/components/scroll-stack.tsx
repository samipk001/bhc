
"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./scroll-stack.css";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export const ScrollStackItem = ({ children, itemClassName = "" }: { children: React.ReactNode, itemClassName?: string }) => (
  <div className={cn("scroll-stack-card", itemClassName)}>{children}</div>
);

const ScrollStack = ({
  children,
  className = "",
  itemDistance = 10,
  baseScale = 0.9,
}: {
  children: React.ReactNode,
  className?: string,
  itemDistance?: number,
  baseScale?: number,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLElement[]>([]);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    cardsRef.current = gsap.utils.toArray(".scroll-stack-card");
    if (cardsRef.current.length === 0) return;

    // Set initial positions and styles
    gsap.set(cardsRef.current, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        xPercent: -50,
        yPercent: -50,
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        pin: true,
        scrub: 0.3,
        start: "top top",
        end: () => `+=${(cardsRef.current.length) * (itemDistance * 10)}`, // Adjust end based on card count and distance
        invalidateOnRefresh: true,
      },
    });

    cardsRef.current.forEach((card, index) => {
      if (index === 0) return; // The first card stays in place initially

      const prevCard = cardsRef.current[index - 1];

      // Move cards from below to stack on top
      timeline.fromTo(
        card,
        { 
          yPercent: -50 + 100 * index, // Start below the viewport
          scale: 1,
          opacity: 1,
        },
        {
          yPercent: -50 - (cardsRef.current.length - 1 - index) * 2, // Stack on top with a small offset
          scale: baseScale + (index / cardsRef.current.length) * (1 - baseScale), // Scale down as they stack
          opacity: 1,
          ease: "none",
        },
        `<+=${itemDistance / 100}` // Stagger the animations
      );
      
      // Scale down previous cards as new ones come on top
      timeline.to(prevCard, { 
          scale: baseScale + ((index-1) / cardsRef.current.length) * (1-baseScale) - 0.05,
          ease: 'none'
        }, '<');
    });

    // Calculate container height to provide scroll space
    const totalHeight = (cardsRef.current.length) * (itemDistance * 10) + window.innerHeight;
    container.style.height = `${totalHeight}px`;
    container.style.marginBottom = `-${(cardsRef.current.length) * (itemDistance * 10)}px`;

    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [children, itemDistance, baseScale]);

  return (
    <div ref={containerRef} className={cn("scroll-stack-container", className)}>
      <div className="scroll-stack-inner">
        {children}
      </div>
    </div>
  );
};

export default ScrollStack;
