# StyleMuse AI - Base Mini App

**Effortless Design, Instantly Yours.**

A MiniApp for Farcaster users to generate unique, on-trend visual assets using AI, with options for brand customization and iterative refinement.

## Features

- **AI-Powered Asset Generation**: Create custom graphics, logos, and social media posts using text prompts
- **Style & Trend Adaptation**: Choose from various design styles to match current aesthetics
- **Iterative Design Tools**: Refine and adjust generated designs with built-in editing tools
- **Credit System**: Pay-per-generation micro-transaction model
- **Brand Kit Integration**: (Future) Upload brand colors, fonts, and logos for consistent generation

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design tokens
- **Blockchain**: Base network integration via MiniKit
- **Wallet**: OnchainKit for wallet functionality
- **AI**: OpenAI integration for image generation
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stylemuse-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key  
   - `OPENAI_API_KEY`: Your OpenAI API key

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main application page
├── providers.tsx      # MiniKit and OnchainKit providers
├── globals.css        # Global styles and Tailwind imports
├── loading.tsx        # Loading UI component
├── error.tsx          # Error boundary component
├── api/
│   ├── frame/         # Frame API endpoints
│   └── generate/      # Image generation API
└── manifest.json      # Mini App manifest

components/
├── Header.tsx         # App header with branding
├── PromptInput.tsx    # Text input for generation prompts
├── StyleSelector.tsx  # Style selection interface
├── GeneratedImageDisplay.tsx  # Display generated images
├── CreditCounter.tsx  # Credit balance display
└── RefineControls.tsx # Image refinement tools

lib/
├── ai-service.ts      # AI image generation service
├── types.ts           # TypeScript type definitions
└── utils.ts           # Utility functions
```

## Design System

The app uses a custom design system with the following tokens:

### Colors
- **Background**: `hsl(210, 20%, 95%)`
- **Primary**: `hsl(210, 80%, 50%)`
- **Accent**: `hsl(170, 80%, 50%)`
- **Surface**: `hsl(210, 20%, 100%)`
- **Text Primary**: `hsl(210, 20%, 15%)`
- **Text Secondary**: `hsl(210, 20%, 45%)`

### Spacing
- **Small**: 8px
- **Medium**: 16px  
- **Large**: 24px

### Border Radius
- **Small**: 4px
- **Medium**: 8px
- **Large**: 12px

## API Integration

### Image Generation
The app integrates with OpenAI's DALL-E API for image generation. The service enhances user prompts with style-specific keywords to improve generation quality.

### Frame Actions
Supports Farcaster Frame protocol for in-frame interactions:
- Generate new assets
- Select styles
- Refine designs
- Save and share creations

## Deployment

The app is designed to be deployed on Vercel or similar platforms that support Next.js.

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to your preferred platform**
   - Vercel: Connect your repository and deploy
   - Other platforms: Follow their Next.js deployment guides

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
