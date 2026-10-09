import type { Metadata } from 'next';
import { Red_Hat_Display } from 'next/font/google';
import './globals.css';

const redHatDisplay = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-red-hat-display',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://yusuf-arif.vercel.app'),
  title: 'yusuf Arif | Frontend Developer Portfolio',
  description:
    'yusuf Arif is a frontend developer building pixel-accurate React and Next.js apps, with live projects, source code, tests, CI and 90+ mobile Lighthouse scores.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${redHatDisplay.variable}`}>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
