import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Media Usage Frequency Survey',
  description: 'Interactive matrix to capture how often audiences use news outlets and digital platforms.'
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>{children}</body>
  </html>
);

export default RootLayout;
