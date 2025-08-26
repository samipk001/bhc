
"use client";

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import RotatingText from '../rotating-text';

export default function HeroSection() {
  const rotatingTexts = [
    "digital experiences.",
    "cinematic videos.",
    "pixel-perfect websites.",
  ];

  return (
    <section id="home" className="relative h-[calc(100vh-80px)] w-full flex items-center justify-center text-center text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://picsum.photos/1920/1280"
          alt="Creative agency workspace abstract background"
          data-ai-hint="creative workspace"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>
      <div className="relative z-10 p-4 flex flex-col items-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg animate-text-blur-in font-headline">
          Your Vision, Amplified.
        </h1>
        
        <div className="mt-4 text-lg md:text-xl text-gray-200/90 drop-shadow-lg animate-text-blur-in animation-delay-400 flex items-center gap-2 font-sans">
            <p>We are a creative agency that crafts stunning</p>
            <RotatingText
                texts={rotatingTexts}
                mainClassName="bg-primary text-primary-foreground px-3 py-1 rounded-md"
                splitBy="words"
            />
        </div>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-800">
            <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg py-7 px-10 rounded-full">
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
