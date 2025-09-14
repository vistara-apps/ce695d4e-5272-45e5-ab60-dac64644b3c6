'use client';

import { useState } from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function PromptInput({ value, onChange, placeholder, disabled }: PromptInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const examplePrompts = [
    'minimalist logo for a coffee shop',
    'modern social media post for tech startup',
    'vintage poster for music festival',
    'clean business card design',
    'colorful app icon for fitness app',
  ];

  const handleExampleClick = (example: string) => {
    onChange(example);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          disabled={disabled}
          rows={3}
          className={`w-full px-4 py-3 border rounded-md resize-none transition-all duration-200 ${
            isFocused
              ? 'border-primary ring-2 ring-primary/20'
              : 'border-gray-300 hover:border-gray-400'
          } ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : 'bg-white'
          } text-text-primary placeholder-text-secondary focus:outline-none`}
        />
        <div className="absolute bottom-2 right-2 text-xs text-text-secondary">
          {value.length}/200
        </div>
      </div>

      {!value && !isFocused && (
        <div className="space-y-2">
          <p className="text-xs text-text-secondary font-medium">Try these examples:</p>
          <div className="flex flex-wrap gap-2">
            {examplePrompts.slice(0, 3).map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                disabled={disabled}
                className="text-xs bg-gray-100 text-text-secondary px-3 py-1 rounded-full hover:bg-gray-200 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
