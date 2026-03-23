import { NextRequest, NextResponse } from 'next/server';
import { fetchWikipediaData } from '@/lib/fetchWikipedia';
import { normalizeAnimal } from '@/lib/normalizeAnimal';

const ANIMAL_NAMES = [
  'lion', 'african bush elephant', 'giraffe', 'emperor penguin', 'bottlenose dolphin',
  'cheetah', 'western gorilla', 'polar bear', 'tiger', 'koala',
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
    if (!ninjasData.length) {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }

    // Pick the best match from API Ninjas results: prefer an exact name match
    // to the search term over subspecies / tangentially related results.
    const normalizedName = name.toLowerCase();
    const exactMatch = ninjasData.find((a: { name?: string }) => a.name?.toLowerCase() === normalizedName);
    const raw = exactMatch ?? ninjasData[0];

    // Step 1: Fetch Wikipedia + Wikidata — description, image, canonical scientific name, and conservation status
    const { description, wikipediaUrl, binomialName: wikidataBinomial, imageUrl, conservationStatus } = await fetchWikipediaData(name);

    // Step 2: Prefer a proper two-word binomial name. Wikidata sometimes returns only a genus
    // (e.g. "Tursiops" for bottlenose dolphin, "Giraffa" for giraffe). In those cases,
    // fall back to the API Ninjas taxonomy.scientific_name which is usually more specific.
    type NinjasResult = { name?: string; taxonomy?: { scientific_name?: string } };
    const isProperBinomial = (s: string) => s.includes(' ');
    const rawSciName = (raw as NinjasResult).taxonomy?.scientific_name ?? '';
    const fallbackRaw = !wikidataBinomial
      ? (ninjasData as NinjasResult[]).find(
          (a) => a.taxonomy?.scientific_name && a.name?.toLowerCase().includes(normalizedName)
        ) ?? raw
      : raw;
    const binomialName =
      (wikidataBinomial && isProperBinomial(wikidataBinomial))
        ? wikidataBinomial
        : (rawSciName && isProperBinomial(rawSciName))
          ? rawSciName
          : wikidataBinomial || rawSciName || '';

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const animal = normalizeAnimal(fallbackRaw as any, description, imageUrl, wikipediaUrl, binomialName, conservationStatus);
    return NextResponse.json({ animal });
  } catch (error) {
    console.error(`Error fetching animal "${name}":`, error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
