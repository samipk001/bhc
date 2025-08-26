
"use client";
import Link from 'next/link';
import "./glass-icons.css";
import { cn } from '@/lib/utils';

const gradientMapping: Record<string, string> = {
  blue: "transparent",
  purple: "transparent",
  red: "transparent",
  indigo: "transparent",
  orange: "transparent",
  green: "transparent",
};

export interface GlassIconItem {
    icon: React.ReactNode;
    color: string;
    label: string;
    href: string;
    active: boolean;
    customClass?: string;
}

interface GlassIconsProps {
    items: GlassIconItem[];
    className?: string;
}

const GlassIcons = ({ items, className }: GlassIconsProps) => {
  const getBackgroundStyle = (color: string) => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={cn("icon-btns", className)}>
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn("icon-btn", item.customClass, item.active && "is-active")}
          aria-label={item.label}
        >
          <span
            className="icon-btn__back"
            style={getBackgroundStyle('transparent')}
          ></span>
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">{item.icon}</span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default GlassIcons;
