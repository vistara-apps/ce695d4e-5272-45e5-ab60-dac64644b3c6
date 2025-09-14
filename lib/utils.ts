import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatCredits(credits: number): string {
  return credits.toLocaleString();
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function validatePrompt(prompt: string): { isValid: boolean; error?: string } {
  if (!prompt.trim()) {
    return { isValid: false, error: 'Prompt cannot be empty' };
  }
  
  if (prompt.length > 200) {
    return { isValid: false, error: 'Prompt must be 200 characters or less' };
  }
  
  // Check for inappropriate content (basic filter)
  const inappropriateWords = ['explicit', 'nsfw', 'adult'];
  const hasInappropriateContent = inappropriateWords.some(word => 
    prompt.toLowerCase().includes(word)
  );
  
  if (hasInappropriateContent) {
    return { isValid: false, error: 'Prompt contains inappropriate content' };
  }
  
  return { isValid: true };
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
