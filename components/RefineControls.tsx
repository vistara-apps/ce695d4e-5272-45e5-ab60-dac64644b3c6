'use client';

import { useState } from 'react';

interface Generation {
  id: string;
  prompt: string;
  style: string;
  imageUrl: string;
  createdAt: Date;
}

interface RefineControlsProps {
  generation: Generation;
  onUpdate: (generation: Generation) => void;
}

export function RefineControls({ generation, onUpdate }: RefineControlsProps) {
  const [activeTab, setActiveTab] = useState<'adjust' | 'colors' | 'effects'>('adjust');
  const [adjustments, setAdjustments] = useState({
    brightness: 0,
    contrast: 0,
    saturation: 0,
  });

  const colorPalettes = [
    { name: 'Warm', colors: ['#FF6B6B', '#FFE66D', '#FF8E53', '#C7CEEA'] },
    { name: 'Cool', colors: ['#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'] },
    { name: 'Monochrome', colors: ['#2C3E50', '#34495E', '#7F8C8D', '#BDC3C7'] },
    { name: 'Vibrant', colors: ['#E74C3C', '#F39C12', '#27AE60', '#8E44AD'] },
  ];

  const effects = [
    { name: 'None', value: 'none' },
    { name: 'Blur', value: 'blur' },
    { name: 'Sharpen', value: 'sharpen' },
    { name: 'Vintage', value: 'vintage' },
  ];

  const handleAdjustmentChange = (key: keyof typeof adjustments, value: number) => {
    setAdjustments(prev => ({ ...prev, [key]: value }));
  };

  const handleApplyChanges = () => {
    // In a real implementation, this would apply the changes to the image
    const updatedGeneration = {
      ...generation,
      // Apply adjustments (this would be handled by an image processing service)
    };
    onUpdate(updatedGeneration);
  };

  const tabs = [
    { id: 'adjust', name: 'Adjust', icon: '⚙️' },
    { id: 'colors', name: 'Colors', icon: '🎨' },
    { id: 'effects', name: 'Effects', icon: '✨' },
  ];

  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-text-primary">Refine Your Design</h4>
        <button
          onClick={handleApplyChanges}
          className="bg-primary text-white px-3 py-1 rounded text-sm font-medium hover:bg-blue-700 transition-colors duration-200"
        >
          Apply
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-white rounded-md p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-2 px-3 rounded text-sm font-medium transition-colors duration-200 ${
              activeTab === tab.id
                ? 'bg-primary text-white'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'adjust' && (
          <div className="space-y-4">
            {Object.entries(adjustments).map(([key, value]) => (
              <div key={key}>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-text-primary capitalize">
                    {key}
                  </label>
                  <span className="text-sm text-text-secondary">{value}</span>
                </div>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={value}
                  onChange={(e) => handleAdjustmentChange(key as any, parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'colors' && (
          <div className="space-y-3">
            <p className="text-sm text-text-secondary">Choose a color palette:</p>
            {colorPalettes.map((palette) => (
              <button
                key={palette.name}
                className="w-full p-3 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors duration-200"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-text-primary">
                    {palette.name}
                  </span>
                  <div className="flex space-x-1">
                    {palette.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'effects' && (
          <div className="grid grid-cols-2 gap-2">
            {effects.map((effect) => (
              <button
                key={effect.value}
                className="p-3 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors duration-200 text-sm font-medium text-text-primary"
              >
                {effect.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
