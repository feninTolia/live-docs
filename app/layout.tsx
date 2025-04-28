import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'LiveDocs',
  description: 'Your go to collaborative editor',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            'min-h-screen font-sans antialiased',
            fontSans.variable
          )}
        >
          {children}
        </body>
      </html>
    </Providers>
  );
}
