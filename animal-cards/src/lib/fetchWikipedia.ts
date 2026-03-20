const WIKI_HEADERS = {
  'User-Agent': 'AnimalCardsApp/1.0 (educational kids app; contact@example.com)',
  'Accept': 'application/json',
};

export async function fetchWikipediaDescription(animalName: string): Promise<{ description: string; wikipediaUrl: string }> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animalName)}`,
      { headers: WIKI_HEADERS, next: { revalidate: 86400 } }
    );
    if (!res.ok) return { description: '', wikipediaUrl: '' };
    const data = await res.json();
    return { description: data.extract ?? '', wikipediaUrl: data.content_urls?.desktop?.page ?? '' };
  } catch {
    return { description: '', wikipediaUrl: '' };
  }
}

export async function fetchWikimediaImage(animalName: string): Promise<string> {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animalName)}`,
      { headers: WIKI_HEADERS, next: { revalidate: 86400 } }
    );
    if (!res.ok) return '';
    const data = await res.json();
    return data.thumbnail?.source ?? data.originalimage?.source ?? '';
  } catch {
    return '';
  }
}
