import { Suspense } from 'react';

export default function GenerateFramePage() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface rounded-lg p-6 shadow-card text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-text-primary mb-2">
          Create with StyleMuse AI
        </h1>
        <p className="text-text-secondary text-sm mb-4">
          Enter your prompt below to generate a unique design
        </p>
        <div className="text-xs text-text-secondary">
          This frame handles the generation flow
        </div>
      </div>
    </div>
  );
}

