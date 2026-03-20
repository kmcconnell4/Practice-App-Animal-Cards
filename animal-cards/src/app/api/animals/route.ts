import { NextRequest, NextResponse } from 'next/server';
import { fetchWikipediaDescription, fetchWikimediaImage } from '@/lib/fetchWikipedia';
import { normalizeAnimal } from '@/lib/normalizeAnimal';

const ANIMAL_NAMES = [
  'lion', 'elephant', 'giraffe', 'penguin', 'dolphin',
  'cheetah', 'gorilla', 'polar bear', 'tiger', 'koala',
  'zebra', 'hippopotamus', 'rhinoceros', 'chimpanzee', 'jaguar',
  'wolf', 'bear', 'fox', 'deer', 'rabbit',
  'eagle', 'owl', 'flamingo', 'parrot', 'toucan',
  'crocodile', 'turtle', 'frog', 'gecko', 'chameleon',
  'shark', 'whale', 'octopus', 'seahorse', 'clownfish',
  'butterfly', 'bee', 'ant', 'ladybug', 'dragonfly',
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json({ animals: ANIMAL_NAMES });
  }

  const apiKey = process.env.APININJAS_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
  }

  try {
    const ninjasRes = await fetch(
      `https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(name)}`,
      { headers: { 'X-Api-Key': apiKey } }
    );

    if (!ninjasRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch animal data' }, { status: 502 });
    }

    const ninjasData = await ninjasRes.json();
    const raw = ninjasData[0];

    if (!raw) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }

    const [{ description, wikipediaUrl }, imageUrl] = await Promise.all([
      fetchWikipediaDescription(name),
      fetchWikimediaImage(name),
    ]);

    const animal = normalizeAnimal(raw, description, imageUrl, wikipediaUrl);
    return NextResponse.json({ animal });
  } catch (error) {
    console.error(`Error fetching animal "${name}":`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
