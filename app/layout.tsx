import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'StyleMuse AI - Effortless Design, Instantly Yours',
  description: 'Generate unique, on-trend visual assets using AI with options for brand customization and iterative refinement.',
  openGraph: {
    title: 'StyleMuse AI',
    description: 'Effortless Design, Instantly Yours',
    images: ['/og-image.png'],
  },
  other: {
    'fc:frame': 'vNext',
    'fc:frame:image': '/og-image.png',
    'fc:frame:button:1': 'Generate Asset',
    'fc:frame:button:1:action': 'post',
    'fc:frame:post_url': '/api/frame',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg">
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
