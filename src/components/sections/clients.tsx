
"use client";

import LogoLoop from "../logo-loop";

const clientLogos = [
  { src: "https://i.postimg.cc/kgHCkKRL/asta.jpg", alt: "Asta" },
  { src: "https://i.postimg.cc/NjFYJpF1/chirayu.jpg", alt: "Chirayu" },
  { src: "https://i.postimg.cc/DZkTzhgg/fitness.jpg", alt: "Fitness" },
  { src: "https://i.postimg.cc/RF7z6Ypz/impress.jpg", alt: "Empress" },
  { src: "https://i.postimg.cc/Bv13sbxb/united.png", alt: "United" },
  { src: "https://i.postimg.cc/5YrsT1g0/pcs.png", alt: "PCS" },
];


export default function ClientsSection() {
    return (
        <section id="clients" className="py-20 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight text-primary font-headline">Trusted by Industry Leaders</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        We are proud to collaborate with these innovative companies.
                    </p>
                </div>
                <LogoLoop 
                    logos={clientLogos}
                    speed={80}
                    direction="left"
                    logoHeight={48}
                    gap={60}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                />
            </div>
        </section>
    )
}
