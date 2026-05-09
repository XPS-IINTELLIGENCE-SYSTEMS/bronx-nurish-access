import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bronx Nourish Access — Food Help Options',
  description: 'Bronx Food Help May Be Available — Check Options in 60 Seconds. No payment required to check.',
  manifest: '/manifest.webmanifest',
  applicationName: 'Bronx Nourish Access',
  appleWebApp: {
    capable: true,
    title: 'Nourish',
    statusBarStyle: 'black-translucent'
  },
  icons: {
    icon: '/icon.svg',
    apple: '/icon.svg'
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Bronx Nourish Access',
    description: 'Check available food support options. No payment required to check.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  themeColor: '#0b5f2a',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
