import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import Link from 'next/link';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { PT_Sans, Playfair_Display } from 'next/font/google';
import ScrollRevealProvider from '@/components/scroll-reveal-provider';
import LoadingIndicator from '@/components/loading-indicator';
import LoadingClassHandler from '@/components/loading-class-handler';

const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'BCH Creation | Creative Agency',
  description:
    'BCH Creation is a modern creative agency specializing in videography, photography, web development, and more.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preload" href="/bch logo.jpg" as="image" />
        <link rel="preload" href="/2.mp4" as="video" type="video/mp4" fetchPriority="high" />
      </head>
      <body className={cn('font-sans antialiased min-h-screen bg-background flex flex-col', ptSans.variable, playfair.variable)}>
        <LoadingClassHandler />
        <LoadingIndicator />
        <ScrollRevealProvider>
          <Header />
          <main className="flex-grow pt-28">{children}</main>
          <Footer />
          <Toaster />
        </ScrollRevealProvider>
      </body>
    </html>
  );
}
