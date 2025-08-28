
"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from 'next/navigation';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import "./pill-nav.css";
import GlassIcons, { type GlassIconItem } from "./glass-icons";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface NavItem extends Omit<GlassIconItem, 'icon' | 'active'> {
    href: string;
    label: string;
    sectionId?: string;
    icon: ReactNode;
    color: string;
}

interface PillNavProps {
  items: NavItem[];
  activePath: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
  isScrolled?: boolean;
}

const PillNav = ({
  items,
  ease = "power3.easeOut",
  baseColor = "hsl(var(--primary))",
  pillColor = "hsl(var(--primary-foreground))",
  hoveredPillTextColor = "hsl(var(--primary-foreground))",
  pillTextColor,
  isScrolled = false,
}: PillNavProps) => {
  const resolvedPillTextColor = pillTextColor ?? "hsl(var(--primary))";

  const pathname = usePathname();
  const sectionIds = items.map(link => link.sectionId).filter(id => id) as string[];
  const activeId = useScrollSpy(sectionIds, { rootMargin: '-50% 0px -50% 0px' });

  const getIsActive = (item: NavItem) => {
    const isHomePage = pathname === '/';
    if (isHomePage) {
        if (item.sectionId) {
            return activeId === item.sectionId;
        }
        if(item.href === '/') return activeId === 'home' || !activeId;
    }
    return pathname === item.href;
  };

  const cssVars = {
    "--base": baseColor,
    "--pill-bg": pillColor,
    "--hover-text": hoveredPillTextColor,
    "--pill-text": resolvedPillTextColor,
  } as React.CSSProperties;

  return (
    <div className="pill-nav-container">
      <nav
        className={cn("pill-nav", isScrolled && "is-scrolled")}
        aria-label="Primary"
        style={cssVars}
      >
        <Link href="#about" className="pill-logo">
            <Image src="https://i.postimg.cc/J4bL2Qk0/bch-logo.jpg" alt="BCH Creation Logo" width={52} height={52} />
        </Link>

        <div className="pill-nav-items desktop-nav">
          <GlassIcons items={items.map(item => ({...item, active: getIsActive(item)}))} />
        </div>
      </nav>
    </div>
  );
};

export default PillNav;
