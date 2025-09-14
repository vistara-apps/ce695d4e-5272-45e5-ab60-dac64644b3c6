'use client';

import { useMiniKit } from '@coinbase/minikit';

export function Header() {
  const { user } = useMiniKit();

  return (
    <header className="bg-surface border-b border-gray-200 px-4 py-4">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary">StyleMuse AI</h1>
            <p className="text-xs text-text-secondary">Effortless Design, Instantly Yours</p>
          </div>
        </div>

        {user && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user.displayName?.[0] || '?'}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
