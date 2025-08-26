
'use client';

import Image from 'next/image';
import { AnimatedSection } from '@/components/animated-section';
import ScrollReveal from '../scroll-reveal';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    title: 'Photography',
    description: 'We produce cinematic brand videos, event coverage, and compelling visual stories that capture the essence of innovation. Our videography services handle everything from concept to final cut, delivering powerful narratives that resonate with audiences.',
    image: 'https://i.postimg.cc/JnstJRVB/photo.jpg',
    aiHint: 'professional photography',
    href: '#',
  },
  {
    title: 'Social Media Management',
    description: 'We manage the social media presence for a diverse range of brands, creating stunning visual content and strategic campaigns that elevate their online presence, drive engagement, and foster loyal communities.',
    image: 'https://i.postimg.cc/KYLnT7P2/social.webp',
    aiHint: 'social media strategy',
    href: '#',
  },
  {
    title: 'Mr. & Miss Royal Jhapa with PCS',
    description: 'As the official production partner for the "Mr. and Miss Royal Jhapa" pageant with PCS, we managed all aspects of video production, photography, and digital promotion. We successfully captured the glamour and excitement of the event.',
    image: 'https://i.postimg.cc/NjZ6LCrD/491913906-1069210025227687-5490006091962434473-n.jpg',
    aiHint: 'pageant event production',
    href: '#',
  },
  {
    title: 'Drone Videography',
    description: 'Breathtaking drone videography for real estate, events, and commercial projects. Our licensed pilots capture stunning aerial footage, showcasing properties and moments from a unique and compelling perspective.',
    image: 'https://i.postimg.cc/m2DCjWYV/travel-drones.jpg',
    aiHint: 'drone videography mountain',
    href: '#',
  },
];

export default function PortfolioSection() {
  return (
    <AnimatedSection id="portfolio" className="py-20 lg:py-32 bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold font-headline text-primary">Our Work</h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            A glimpse into the stories we've helped create.
          </p>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              <AnimatedSection as="div" className={index % 2 === 0 ? 'md:order-1' : 'md:order-2'}>
                 <Image
                    src={project.image}
                    alt={project.title}
                    data-ai-hint={project.aiHint}
                    width={800}
                    height={600}
                    className="rounded-lg object-cover shadow-2xl"
                  />
              </AnimatedSection>
              <div className={`space-y-6 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                 <ScrollReveal
                    containerClassName="!m-0"
                    textClassName="!text-3xl sm:!text-4xl !font-bold !tracking-tight font-headline"
                 >
                    {project.title}
                </ScrollReveal>
                <ScrollReveal
                    baseOpacity={0.1}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={10}
                    wordAnimationEnd="bottom center"
                    textClassName="!text-base lg:!text-lg !font-sans text-muted-foreground !leading-relaxed"
                >
                  {project.description}
                </ScrollReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
