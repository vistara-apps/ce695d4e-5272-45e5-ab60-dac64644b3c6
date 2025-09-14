import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function generateImage(prompt: string, style: string): Promise<string> {
  try {
    // Enhance the prompt based on the selected style
    const enhancedPrompt = enhancePromptWithStyle(prompt, style);

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: enhancedPrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = response.data[0].url;
    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI');
    }

    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);

    // Fallback to placeholder for development/demo
    if (process.env.NODE_ENV === 'development') {
      console.warn('Using placeholder image due to OpenAI error');
      return `https://picsum.photos/400/400?random=${Date.now()}&blur=1`;
    }

    throw new Error('Failed to generate image');
  }
}

function enhancePromptWithStyle(prompt: string, style: string): string {
  const styleEnhancements = {
    modern: 'modern, clean, contemporary, sleek design',
    minimalist: 'minimalist, simple, clean lines, white space, elegant',
    vintage: 'vintage, retro, classic, aged, nostalgic aesthetic',
    bold: 'bold, vibrant colors, high contrast, eye-catching, dynamic',
    professional: 'professional, business-like, corporate, polished, refined',
    artistic: 'artistic, creative, expressive, unique, imaginative',
  };

  const enhancement = styleEnhancements[style as keyof typeof styleEnhancements] || 'high quality';
  return `${prompt}, ${enhancement}, high quality, detailed`;
}

export async function refineImage(imageUrl: string, adjustments: any): Promise<string> {
  // In a real implementation, this would apply image adjustments
  // For now, return the original image URL
  return imageUrl;
}
