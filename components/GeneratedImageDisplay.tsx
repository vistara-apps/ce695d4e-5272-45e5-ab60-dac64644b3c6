'use client';

import Image from 'next/image';

interface Generation {
  id: string;
  prompt: string;
  style: string;
  imageUrl: string;
  createdAt: Date;
}

interface GeneratedImageDisplayProps {
  generation: Generation;
  isLoading?: boolean;
}

export function GeneratedImageDisplay({ generation, isLoading }: GeneratedImageDisplayProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="aspect-square bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-text-secondary text-sm">Generating your design...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={generation.imageUrl}
          alt={generation.prompt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-text-primary text-sm">
              "{generation.prompt}"
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                {generation.style}
              </span>
              <span className="text-xs text-text-secondary">
                {generation.createdAt.toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
