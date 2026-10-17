import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import './globals.css';

// Fonts are self-hosted (variable woff2, latin subset) instead of loaded via next/font/google:
// Turbopack's Google Fonts loader fails intermittently on Vercel (vercel/next.js#99114),
// and self-hosting also removes the build-time network dependency.
const inter = localFont({
  src: './fonts/inter-latin.woff2',
  weight: '400 600',
  display: 'swap',
  variable: '--font-inter',
});
const spaceGrotesk = localFont({
  src: './fonts/space-grotesk-latin.woff2',
  weight: '400 700',
  display: 'swap',
  variable: '--font-space-grotesk',
});
const jetBrainsMono = localFont({
  src: './fonts/jetbrains-mono-latin.woff2',
  weight: '400 500',
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
  title: 'progra{m}aria · anotações',
  description: 'Anotações das palestras, salvas neste navegador.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
