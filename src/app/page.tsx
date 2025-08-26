import HeroSection from '@/components/sections/hero';
import AboutSection from '@/components/sections/about';
import ServicesSection from '@/components/sections/services';
import PortfolioSection from '@/components/sections/portfolio';
import ContactSection from '@/components/sections/contact';
import ClientsSection from '@/components/sections/clients';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <PortfolioSection />
      <ClientsSection />
      <ContactSection />
    </>
  );
}
