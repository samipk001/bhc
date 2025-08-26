
"use client";

import { usePathname } from 'next/navigation';
import { Home, Info, Clapperboard, Briefcase, MessageSquare, Mail } from 'lucide-react';
import PillNav from '../pill-nav';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Home', sectionId: 'home', icon: <Home />, color: 'var(--primary)' },
    { href: '/#about', label: 'About', sectionId: 'about', icon: <Info />, color: 'var(--primary)' },
    { href: '/#services', label: 'Services', sectionId: 'services', icon: <Clapperboard />, color: 'var(--primary)' },
    { href: '/#portfolio', label: 'Portfolio', sectionId: 'portfolio', icon: <Briefcase />, color: 'var(--primary)' },
    { href: '/#contact', label: 'Contact', sectionId: 'contact', icon: <Mail />, color: 'var(--primary)' },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-300 ease-in-out",
      isScrolled ? "py-2" : "py-4"
    )}>
      <div className="container mx-auto px-4 md:px-6">
        <PillNav
            items={navLinks}
            activePath={pathname}
            baseColor="hsl(var(--primary))"
            pillColor="hsl(var(--primary-foreground))"
            pillTextColor="hsl(var(--primary))"
            hoveredPillTextColor="hsl(var(--primary-foreground))"
            isScrolled={isScrolled}
        />
      </div>
    </header>
  );
}
