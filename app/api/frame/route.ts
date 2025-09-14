import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Extract frame data
    const buttonIndex = body.untrustedData?.buttonIndex;
    const fid = body.untrustedData?.fid;
    const castId = body.untrustedData?.castId;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    switch (buttonIndex) {
      case 1: // Generate Asset
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${baseUrl}/frame/generate`,
          title: 'StyleMuse AI - Generate',
          description: 'Create unique visual assets with AI',
          image: `${baseUrl}/og-generate.png`,
          buttons: [
            {
              label: 'Generate',
              action: 'post',
              target: `${baseUrl}/api/frame/generate`,
            },
            {
              label: 'View Gallery',
              action: 'post',
              target: `${baseUrl}/api/frame/gallery`,
            },
          ],
        });

      case 2: // View Gallery
        return NextResponse.json({
          type: 'frame',
          frameUrl: `${baseUrl}/frame/gallery`,
          title: 'StyleMuse AI - Gallery',
          description: 'Browse your generated designs',
          image: `${baseUrl}/og-gallery.png`,
          buttons: [
            {
              label: 'Generate New',
              action: 'post',
              target: `${baseUrl}/api/frame`,
            },
            {
              label: 'Share',
              action: 'post',
              target: `${baseUrl}/api/frame/share`,
            },
          ],
        });

      default:
        return NextResponse.json({
          type: 'frame',
          frameUrl: baseUrl,
          title: 'StyleMuse AI',
          description: 'Effortless Design, Instantly Yours',
          image: `${baseUrl}/og-image.png`,
          buttons: [
            {
              label: 'Generate Asset',
              action: 'post',
              target: `${baseUrl}/api/frame`,
            },
            {
              label: 'View Gallery',
              action: 'post',
              target: `${baseUrl}/api/frame/gallery`,
            },
          ],
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
    endpoints: [
      'POST /api/frame - Main frame interaction',
      'POST /api/frame/generate - Generate new asset',
      'POST /api/frame/gallery - View user gallery',
      'POST /api/frame/share - Share asset to Farcaster',
    ],
  });
}
