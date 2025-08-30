import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'DENTL - Medical Document Analyzer',
  description: 'AI-powered medical document analysis and patient information extraction',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
