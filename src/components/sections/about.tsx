"use client";

import Image from 'next/image';
import ScrollReveal from '../scroll-reveal';

export default function AboutSection() {
  const aboutText = "We are a collective of dreamers, storytellers, and tech wizards passionate about bringing visions to life. At BCH Creation, we believe in the power of a great story and the impact of stunning visuals. Our mission is to craft digital experiences that are not just seen, but felt. Our creative approach is collaborative and tailored. We dive deep into your world to understand your goals, your audience, and your essence. This allows us to produce authentic, compelling content that resonates and drives results."
  return (
    <section id="about" className="py-20 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-6">
            <ScrollReveal
              containerClassName="!m-0"
              textClassName="!text-3xl sm:!text-4xl md:!text-5xl !font-bold !tracking-tighter font-headline"
              baseRotation={0}
            >
              About BCH Creation
            </ScrollReveal>
            <ScrollReveal
                baseOpacity={0.1}
                enableBlur={true}
                baseRotation={0}
                blurStrength={15}
                wordAnimationEnd="bottom center"
            >
              {aboutText}
            </ScrollReveal>
          </div>
          <div className="flex items-center justify-center">
             <Image 
                src="https://i.postimg.cc/d396yRK1/600.webp"
                alt="BCH Creation team working"
                data-ai-hint="team working"
                width={600}
                height={600}
                className="rounded-lg object-cover"
              />
          </div>
        </div>
      </div>
    </section>
  );
}
