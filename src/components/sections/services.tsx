
"use client";

import { Camera, Code2, Send, Scissors, Users, Video } from 'lucide-react';
import CurvedLoop from '../curved-loop';
import MagicBento from '../magic-bento';

const services = [
  {
    icon: Video,
    title: 'Videography',
    description: 'High-quality video production for commercials, events, and brand stories that capture attention.',
  },
  {
    icon: Camera,
    title: 'Photography',
    description: 'Professional photography services for products, portraits, and lifestyle that tell a story.',
  },
  {
    icon: Users,
    title: 'Social Media',
    description: 'Strategic social media management to build your brand and engage with your community.',
  },
  {
    icon: Code2,
    title: 'Web Development',
    description: 'Custom, responsive websites designed to provide an exceptional user experience.',
  },
  {
    icon: Scissors,
    title: 'Editing Services',
    description: 'Expert video and photo editing to bring your raw footage and images to life.',
  },
  {
    icon: Send,
    title: 'Drone Videography',
    description: 'Breathtaking aerial shots and cinematic drone footage for a unique perspective.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className='mb-12'>
            <CurvedLoop 
                marqueeText="Our Services ✦"
                speed={1}
                curveAmount={50}
                direction="left"
                interactive={true}
            />
        </div>
        <MagicBento 
          cardData={services}
          textAutoHide={true}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={15}
          glowColor="224, 76, 58"
        />
      </div>
    </section>
  );
}
