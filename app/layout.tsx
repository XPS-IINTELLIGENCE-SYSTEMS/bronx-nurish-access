import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Bronx Nourish Access — Food Help Options',
  description: 'Bronx Food Help May Be Available — Check Options in 60 Seconds. No payment required to check.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Bronx Nourish Access',
    description: 'Check available food support options. No payment required to check.',
    type: 'website'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
