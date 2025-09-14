export interface User {
  id: string;
  farcasterId: string;
  creditsBalance: number;
  savedBrandKitId?: string;
  createdAt: Date;
}

export interface BrandKit {
  id: string;
  userId: string;
  name: string;
  colors: string[];
  fonts: string[];
  logoUrl?: string;
  createdAt: Date;
}

export interface Generation {
  id: string;
  userId: string;
  prompt: string;
  style: string;
  imageUrl: string;
  createdAt: Date;
  brandKitId?: string;
}

export interface StyleOption {
  id: string;
  name: string;
  description: string;
  previewUrl?: string;
}

export interface CreditTransaction {
  id: string;
  userId: string;
  amount: number;
  type: 'purchase' | 'usage' | 'refund';
  description: string;
  createdAt: Date;
}
