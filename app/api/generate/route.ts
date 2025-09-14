import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '../../../lib/ai-service';
import { prisma } from '../../../lib/db';
import { deductCredits } from '../../../lib/auth';

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, userId } = await req.json();

    if (!prompt || !style || !userId) {
      return NextResponse.json(
        { error: 'Prompt, style, and userId are required' },
        { status: 400 }
      );
    }

    // Validate prompt
    if (prompt.length > 200) {
      return NextResponse.json(
        { error: 'Prompt must be 200 characters or less' },
        { status: 400 }
      );
    }

    // Check user and credits
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    if (user.creditsBalance <= 0) {
      return NextResponse.json(
        { error: 'Insufficient credits' },
        { status: 400 }
      );
    }

    // Generate the image
    const imageUrl = await generateImage(prompt, style);

    // Deduct credits
    const creditsDeducted = await deductCredits(userId, 1);
    if (!creditsDeducted) {
      return NextResponse.json(
        { error: 'Failed to deduct credits' },
        { status: 500 }
      );
    }

    // Save generation to database
    const generation = await prisma.generation.create({
      data: {
        userId,
        prompt,
        style,
        imageUrl,
      },
    });

    return NextResponse.json({
      success: true,
      generation: {
        id: generation.id,
        userId: generation.userId,
        prompt: generation.prompt,
        style: generation.style,
        imageUrl: generation.imageUrl,
        createdAt: generation.createdAt,
      },
    });
  } catch (error) {
    console.error('Generation API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
