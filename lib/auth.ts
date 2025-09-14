import { prisma } from './db';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface AuthUser {
  id: string;
  farcasterId: string;
  creditsBalance: number;
}

export async function authenticateUser(farcasterId: string): Promise<AuthUser | null> {
  try {
    let user = await prisma.user.findUnique({
      where: { farcasterId },
    });

    if (!user) {
      // Create new user if they don't exist
      user = await prisma.user.create({
        data: {
          farcasterId,
          creditsBalance: 10, // Default credits
        },
      });
    }

    return {
      id: user.id,
      farcasterId: user.farcasterId,
      creditsBalance: user.creditsBalance,
    };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

export async function getUserById(userId: string): Promise<AuthUser | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) return null;

    return {
      id: user.id,
      farcasterId: user.farcasterId,
      creditsBalance: user.creditsBalance,
    };
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function updateUserCredits(userId: string, credits: number): Promise<boolean> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { creditsBalance: credits },
    });
    return true;
  } catch (error) {
    console.error('Update credits error:', error);
    return false;
  }
}

export async function deductCredits(userId: string, amount: number): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || user.creditsBalance < amount) {
      return false;
    }

    await prisma.user.update({
      where: { id: userId },
      data: { creditsBalance: user.creditsBalance - amount },
    });

    // Record the transaction
    await prisma.creditTransaction.create({
      data: {
        userId,
        amount: -amount,
        type: 'USAGE',
        description: `Used ${amount} credits for image generation`,
      },
    });

    return true;
  } catch (error) {
    console.error('Deduct credits error:', error);
    return false;
  }
}

export function generateToken(user: AuthUser): string {
  return jwt.sign(
    {
      userId: user.id,
      farcasterId: user.farcasterId,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
}

export function verifyToken(token: string): { userId: string; farcasterId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return {
      userId: decoded.userId,
      farcasterId: decoded.farcasterId,
    };
  } catch (error) {
    return null;
  }
}

