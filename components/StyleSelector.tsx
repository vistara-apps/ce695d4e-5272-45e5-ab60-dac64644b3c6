'use client';

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
  disabled?: boolean;
}

const styles = [
  { id: 'modern', name: 'Modern', description: 'Clean, contemporary design' },
  { id: 'minimalist', name: 'Minimalist', description: 'Simple, elegant aesthetics' },
  { id: 'vintage', name: 'Vintage', description: 'Retro, classic styling' },
  { id: 'bold', name: 'Bold', description: 'Vibrant, eye-catching colors' },
  { id: 'professional', name: 'Professional', description: 'Business-ready designs' },
  { id: 'artistic', name: 'Artistic', description: 'Creative, expressive style' },
];

export function StyleSelector({ selectedStyle, onStyleChange, disabled }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          Style
        </label>
        <p className="text-xs text-text-secondary">
          Choose a style that matches your vision
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style.id)}
            disabled={disabled}
            className={`p-3 rounded-md border text-left transition-all duration-200 ${
              selectedStyle === style.id
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
            } ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
          >
            <div className="font-medium text-sm text-text-primary">
              {style.name}
            </div>
            <div className="text-xs text-text-secondary mt-1">
              {style.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
