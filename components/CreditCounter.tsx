'use client';

interface CreditCounterProps {
  credits: number;
  variant?: 'inline' | 'standalone';
}

export function CreditCounter({ credits, variant = 'standalone' }: CreditCounterProps) {
  const isLow = credits <= 3;

  if (variant === 'inline') {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-accent rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">C</span>
        </div>
        <span className={`text-sm font-medium ${isLow ? 'text-red-600' : 'text-text-primary'}`}>
          {credits}
        </span>
      </div>
    );
  }

  return (
    <div className={`bg-surface rounded-lg p-4 shadow-card ${isLow ? 'border border-red-200' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            isLow ? 'bg-red-100' : 'bg-accent/10'
          }`}>
            <svg className={`w-5 h-5 ${isLow ? 'text-red-600' : 'text-accent'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <div>
            <h3 className="font-medium text-text-primary">Credits</h3>
            <p className="text-sm text-text-secondary">
              {isLow ? 'Running low!' : 'Available for generations'}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${isLow ? 'text-red-600' : 'text-text-primary'}`}>
            {credits}
          </div>
          <div className="text-xs text-text-secondary">remaining</div>
        </div>
      </div>

      {isLow && (
        <div className="mt-3 pt-3 border-t border-red-100">
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200">
            Buy More Credits
          </button>
        </div>
      )}
    </div>
  );
}
