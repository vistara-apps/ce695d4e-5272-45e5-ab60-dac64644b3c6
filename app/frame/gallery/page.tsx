import { Suspense } from 'react';

export default function GalleryFramePage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface rounded-lg p-6 shadow-card text-center">
        <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-text-primary mb-2">
          Your StyleMuse Gallery
        </h1>
        <p className="text-text-secondary text-sm mb-4">
          Browse and share your generated designs
        </p>
        <div className="text-xs text-text-secondary">
          This frame displays your design gallery
        </div>
      </div>
    </div>
  );
}

