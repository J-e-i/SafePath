
import type { Metadata } from 'next';
import './globals.css';
import SOSButton from '../components/SOSButton';

const pacifico = {
  src: 'https://fonts.googleapis.com/css2?family=Pacifico&display=swap',
  variable: '--font-pacifico'
};

export const metadata: Metadata = {
  title: 'SafePath - AI-Powered Safety Analytics',
  description: 'Real-time incident tracking and predictive risk assessment for your safety',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${pacifico.variable} antialiased`}>
        {children}
        <SOSButton />
      </body>
    </html>
  );
}
