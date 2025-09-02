
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import RotatingText from '../rotating-text';
import { useIsMobile } from '@/hooks/use-mobile';

export default function HeroSection() {
  const rotatingTexts = [
    "digital experiences.",
    "cinematic videos.",
    "pixel-perfect websites.",
  ];
  
  const isMobile = useIsMobile();

  return (
    <section id="home" className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        {isMobile ? (
          <div className="w-full h-full bg-black">
            <Image 
              src="/bch logo.jpg" 
              alt="BCH Creation Hub" 
              fill 
              priority
              className="object-cover opacity-30"
            />
          </div>
        ) : (
          <video
            autoPlay loop muted playsInline
            preload="auto"
            data-ai-hint="Basnet Creation Hub Logo"
            className="w-full h-full object-cover opacity-30"
            poster="/bch logo.jpg"
            fetchPriority="high"
          >
            <source src="/2.mp4" type="video/mp4" />
          </video>
        )}
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <div className="relative z-10 p-4 flex flex-col items-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg animate-text-blur-in font-headline px-2">
          Your Vision, Amplified.
        </h1>
        
        <div className="mt-4 text-base sm:text-lg md:text-xl text-gray-200/90 drop-shadow-lg animate-text-blur-in animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-2 font-sans px-4">
            <p>We are a creative agency that crafts stunning</p>
            <RotatingText
                texts={rotatingTexts}
                mainClassName="bg-primary text-primary-foreground px-3 py-1 rounded-full sm:px-2 sm:py-0.5 mt-1 sm:mt-0"
                splitBy="words"
            />
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-800">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-7 px-10 rounded-full transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
                <Link href="#contact">Start Your Project</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="font-bold text-lg py-7 px-10 border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full">
                <Link href="#portfolio">View Our Work</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
