'use client';

import { useState, useEffect } from 'react';
import { useOnchainKit } from '@coinbase/onchainkit';
import { PromptInput } from '@/components/PromptInput';
import { StyleSelector } from '@/components/StyleSelector';
import { GeneratedImageDisplay } from '@/components/GeneratedImageDisplay';
import { CreditCounter } from '@/components/CreditCounter';
import { RefineControls } from '@/components/RefineControls';
import { Header } from '@/components/Header';
import { generateImage } from '@/lib/ai-service';

interface Generation {
  id: string;
  prompt: string;
  style: string;
  imageUrl: string;
  createdAt: Date;
}

export default function HomePage() {
  const onchainKit = useOnchainKit();
  // For now, we'll mock the user since MiniKit functionality might not be available
  const user = { displayName: 'Demo User' }; // TODO: Replace with actual user context when available
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('modern');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentGeneration, setCurrentGeneration] = useState<Generation | null>(null);
  const [credits, setCredits] = useState(10); // Default credits for demo
  const [showRefineControls, setShowRefineControls] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image');
      return;
    }

    if (credits <= 0) {
      setError('Insufficient credits. Please purchase more credits to continue.');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const imageUrl = await generateImage(prompt, selectedStyle);
      
      const newGeneration: Generation = {
        id: Date.now().toString(),
        prompt,
        style: selectedStyle,
        imageUrl,
        createdAt: new Date(),
      };

      setCurrentGeneration(newGeneration);
      setCredits(prev => prev - 1);
      setShowRefineControls(false);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRefine = () => {
    setShowRefineControls(!showRefineControls);
  };

  const handleShare = async () => {
    if (!currentGeneration) return;

    try {
      // In a real implementation, this would share to Farcaster
      const shareText = `Check out my AI-generated design: "${currentGeneration.prompt}" created with StyleMuse AI!`;
      
      if (navigator.share) {
        await navigator.share({
          title: 'StyleMuse AI Creation',
          text: shareText,
          url: window.location.href,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
        alert('Share link copied to clipboard!');
      }
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  const handleSave = () => {
    if (!currentGeneration) return;
    
    // In a real implementation, this would save to user's collection
    alert('Design saved to your collection!');
  };

  return (
    <div className="min-h-screen bg-bg">
      <Header />
      
      <div className="px-4 py-6 max-w-md mx-auto space-y-6">
        {/* Credits Display */}
        <CreditCounter credits={credits} />

        {/* Main Generation Interface */}
        <div className="bg-surface rounded-lg p-6 shadow-card space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Create Your Design
            </h2>
            <p className="text-text-secondary text-sm">
              Describe what you want to create and select a style
            </p>
          </div>

          <PromptInput
            value={prompt}
            onChange={setPrompt}
            placeholder="e.g., minimalist logo for a coffee shop"
            disabled={isGenerating}
          />

          <StyleSelector
            selectedStyle={selectedStyle}
            onStyleChange={setSelectedStyle}
            disabled={isGenerating}
          />

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim() || credits <= 0}
            className="w-full bg-primary text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Generating...</span>
              </div>
            ) : (
              `Generate Asset (${credits} credits)`
            )}
          </button>
        </div>

        {/* Generated Image Display */}
        {currentGeneration && (
          <div className="bg-surface rounded-lg p-6 shadow-card space-y-4">
            <GeneratedImageDisplay
              generation={currentGeneration}
              isLoading={isGenerating}
            />

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleRefine}
                className="flex-1 bg-gray-100 text-text-primary py-2 px-4 rounded-md font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Refine
              </button>
              <button
                onClick={handleSave}
                className="flex-1 bg-accent text-white py-2 px-4 rounded-md font-medium hover:bg-teal-600 transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={handleShare}
                className="bg-blue-100 text-primary py-2 px-4 rounded-md font-medium hover:bg-blue-200 transition-colors duration-200"
              >
                Cast
              </button>
            </div>

            {/* Refine Controls */}
            {showRefineControls && (
              <div className="animate-slide-up">
                <RefineControls
                  generation={currentGeneration}
                  onUpdate={setCurrentGeneration}
                />
              </div>
            )}
          </div>
        )}

        {/* Welcome Message for New Users */}
        {!currentGeneration && !isGenerating && (
          <div className="bg-surface rounded-lg p-6 shadow-card text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Welcome to StyleMuse AI
            </h3>
            <p className="text-text-secondary text-sm">
              Create stunning visual assets with AI. Enter a prompt above to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
