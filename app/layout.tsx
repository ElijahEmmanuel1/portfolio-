import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { InfrastructureProvider } from '@/components/providers/InfrastructureContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AXIOM AI - Infrastructure Management Portal',
  description: 'Premium infrastructure management platform',
};

import { UserProvider } from '@/components/providers/UserContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <UserProvider>
          <InfrastructureProvider>
            {children}
          </InfrastructureProvider>
        </UserProvider>
      </body>
    </html>
  );
}
