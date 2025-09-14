import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Handle frame button interactions
    const buttonIndex = body.untrustedData?.buttonIndex;
    
    switch (buttonIndex) {
      case 1: // Generate Asset
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
        });
      
      default:
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`,
        });
    }
  } catch (error) {
    console.error('Frame API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'StyleMuse AI Frame API',
    version: '1.0.0',
  });
}
