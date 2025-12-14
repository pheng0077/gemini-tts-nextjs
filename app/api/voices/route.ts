import { NextResponse } from 'next/server';
import { fetchVoices } from '@/lib/services/gemini';

export async function GET() {
  try {
    const voices = await fetchVoices();
    return NextResponse.json(voices);
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch voices' },
      { status: 500 }
    );
  }
}
