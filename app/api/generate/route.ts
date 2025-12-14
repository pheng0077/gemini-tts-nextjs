import { NextRequest, NextResponse } from 'next/server';
import { generateSpeech } from '@/lib/services/gemini';

export async function POST(request: NextRequest) {
  try {
    const { text, voice, model, systemInstruction } = await request.json();

    if (!text || !voice || !model) {
      return NextResponse.json(
        { error: 'Missing required parameters: text, voice, model' },
        { status: 400 }
      );
    }

    const audioBlob = await generateSpeech({
      text,
      voice,
      model,
      systemInstruction,
    });

    // Convert Blob to Buffer for Next.js response
    const buffer = Buffer.from(await audioBlob.arrayBuffer());

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': buffer.length.toString(),
      },
    });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate speech' },
      { status: 500 }
    );
  }
}
