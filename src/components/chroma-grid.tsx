
"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./chroma-grid.css";

export const ChromaGrid = ({
  items,
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const setX = useRef<gsap.QuickSetter | null>(null);
  const setY = useRef<gsap.QuickSetter | null>(null);
  const setOverlayX = useRef<gsap.QuickSetter | null>(null);
  const setOverlayY = useRef<gsap.QuickSetter | null>(null);

  const pos = useRef({ x: 0, y: 0 });

  const data = items;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const overlay = overlayRef.current;
    if (!overlay) return;

    setX.current = gsap.quickSetter(el, "--x", "px");
    setY.current = gsap.quickSetter(el, "--y", "px");
    
    // The overlay is position:fixed so its coordinates are relative to viewport
    setOverlayX.current = gsap.quickSetter(overlay, "--x", "px");
    setOverlayY.current = gsap.quickSetter(overlay, "--y", "px");

    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    
    const initialX = el.getBoundingClientRect().left + pos.current.x;
    const initialY = el.getBoundingClientRect().top + pos.current.y;
    
    setX.current(pos.current.x);
    setY.current(pos.current.y);
    setOverlayX.current(initialX);
    setOverlayY.current(initialY);

    const handleResize = () => {
      const { width, height, left, top } = el.getBoundingClientRect();
      pos.current = { x: width / 2, y: height / 2 };
      setX.current(pos.current.x);
      setY.current(pos.current.y);
      setOverlayX.current(left + pos.current.x);
      setOverlayY.current(top + pos.current.y);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
        
        if (rootRef.current) {
            const rect = rootRef.current.getBoundingClientRect();
            setOverlayX.current?.(rect.left + pos.current.x);
            setOverlayY.current?.(rect.top + pos.current.y);
        }
      },
      overwrite: true,
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
     if (rootRef.current) {
        const { width, height } = rootRef.current.getBoundingClientRect();
        moveTo(width/2, height/2)
    }
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true,
    });
  };

  const handleCardClick = (url?: string) => {
    if (url && url !== '#') {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardMove = (e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`}
      style={
        {
          "--r": `${radius}px`,
          "--cols": columns,
          "--rows": rows,
        } as React.CSSProperties
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div ref={overlayRef} className="chroma-overlay" style={{'--card-gradient': 'linear-gradient(145deg, hsl(var(--primary)), hsl(var(--accent)))'} as React.CSSProperties}/>
      <div ref={fadeRef} className="chroma-fade" />
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={
            {
              "--card-border": c.borderColor || "transparent",
              cursor: c.url ? "pointer" : "default",
            }  as React.CSSProperties
          }
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
            {c.location && <span className="location">{c.location}</span>}
          </footer>
        </article>
      ))}
    </div>
  );
};

export default ChromaGrid;
