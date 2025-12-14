# Gemini 2.5 TTS Studio (Next.js)

A professional Text-to-Speech engine powered by Google's Gemini 2.5 API, built with Next.js 15, React 19, and TypeScript.

## Features

- 🎙️ **30 Gemini Voices** - Multiple voice personalities with different pitches and styles
- 🎨 **Style Presets** - News Anchor, Storyteller, Excited, Whisper, and Technical modes
- 📦 **Batch Processing** - Queue multiple text snippets for efficient generation
- 💾 **Bulk Download** - Export all generated audio files as a ZIP archive
- ⚡ **Modern Stack** - Built with Next.js 15 App Router and React 19

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/gemini-tts-nextjs.git
cd gemini-tts-nextjs
```

2. Install dependencies:
```bash
npm install
```

3. Set up your environment variables:
```bash
cp .env.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── generate/       # API route for TTS generation
│   │   └── voices/         # API route for fetching voices
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── HistoryItem.tsx     # Audio queue item component
│   ├── Icons.tsx           # SVG icon components
│   └── VoiceSelector.tsx   # Voice selection dropdown
├── lib/
│   ├── services/
│   │   └── gemini.ts       # Gemini API service layer
│   ├── utils/
│   │   └── audio.ts        # Audio utility functions
│   └── types.ts            # TypeScript type definitions
└── public/                 # Static assets
```

## Technologies

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Google Gemini 2.5 TTS (Preview)
- **Audio Processing**: JSZip for bulk downloads

## API Routes

### POST /api/generate
Generates speech from text using Gemini TTS.

**Request Body:**
```json
{
  "text": "Hello, world!",
  "voice": "Charon",
  "model": "gemini-2.5-flash-preview-tts",
  "systemInstruction": "Speak calmly and clearly"
}
```

### GET /api/voices
Returns the list of available Gemini voices.

## License

MIT

## Credits

Built with ❤️ using Google's Gemini 2.5 TTS API
