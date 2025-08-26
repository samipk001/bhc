
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

export default function Footer() {
  const year = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61573380994962', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/basnetcreations_hub/', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="mt-12 py-8 bg-card border-t">
         <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-muted-foreground">
                &copy; {year} BCH Creation. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                <Link key={social.label} href={social.href} aria-label={social.label} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-accent hover:text-accent-foreground">
                    <social.icon className="h-5 w-5" />
                    </Button>
                </Link>
                ))}
            </div>
            </div>
        </div>
    </footer>
  );
}
