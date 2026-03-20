const WIKI_HEADERS = {
  'User-Agent': 'AnimalCardsApp/1.0 (educational kids app; contact@example.com)',
  'Accept': 'application/json',
};

async function fetchBinomialNameFromWikidata(wikidataId: string): Promise<string> {
  try {
    const res = await fetch(
      `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${wikidataId}&property=P225&format=json`,
      { headers: WIKI_HEADERS, next: { revalidate: 86400 } }
    );
    if (!res.ok) return '';
    const data = await res.json();
    return data.claims?.P225?.[0]?.mainsnak?.datavalue?.value ?? '';
  } catch {
    return '';
  }
}

/** Single call that returns everything needed from Wikipedia + Wikidata. */
export async function fetchWikipediaData(animalName: string): Promise<{
  description: string;
  wikipediaUrl: string;
  binomialName: string;
  imageUrl: string;
}> {
  const empty = { description: '', wikipediaUrl: '', binomialName: '', imageUrl: '' };
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animalName)}`,
      { headers: WIKI_HEADERS, next: { revalidate: 86400 } }
    );
    if (!res.ok) return empty;
    const data = await res.json();
    const wikidataId: string = data.wikibase_item ?? '';
    const binomialName = wikidataId ? await fetchBinomialNameFromWikidata(wikidataId) : '';
    return {
      description: data.extract ?? '',
      wikipediaUrl: data.content_urls?.desktop?.page ?? '',
      binomialName,
      imageUrl: data.thumbnail?.source ?? data.originalimage?.source ?? '',
    };
  } catch {
    return empty;
  }
}
