import { NextRequest, NextResponse } from 'next/server';
import { generateImage } from '../../../lib/ai-service';

export async function POST(req: NextRequest) {
  try {
    const { prompt, style, userId } = await req.json();

    if (!prompt || !style) {
      return NextResponse.json(
        { error: 'Prompt and style are required' },
        { status: 400 }
      );
    }

    // In a real implementation, you would:
    // 1. Verify user authentication
    // 2. Check user's credit balance
    // 3. Deduct credits
    // 4. Generate the image
    // 5. Save the generation to database

    const imageUrl = await generateImage(prompt, style);

    const generation = {
      id: Date.now().toString(),
      userId: userId || 'anonymous',
      prompt,
      style,
      imageUrl,
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      generation,
    });
  } catch (error) {
    console.error('Generation API error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}
