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

// Map of Wikidata item IDs for IUCN conservation statuses to readable names
const WIKIDATA_CONSERVATION_STATUS: Record<string, string> = {
  Q237350: 'Extinct',
  Q719675: 'Extinct in the wild',
  Q219127: 'Critically Endangered',
  Q11394: 'Endangered',
  Q278113: 'Vulnerable',
  Q211005: 'Near Threatened',
  Q3245245: 'Conservation Dependent',
  Q211006: 'Least Concern',
  Q3245246: 'Data Deficient',
  Q3245247: 'Not Evaluated',
};

async function fetchConservationStatusFromWikidata(wikidataId: string): Promise<string> {
  try {
    const res = await fetch(
      `https://www.wikidata.org/w/api.php?action=wbgetclaims&entity=${wikidataId}&property=P141&format=json`,
      { headers: WIKI_HEADERS, next: { revalidate: 86400 } }
    );
    if (!res.ok) return '';
    const data = await res.json();
    const valueId = data.claims?.P141?.[0]?.mainsnak?.datavalue?.value?.id;
    if (valueId && WIKIDATA_CONSERVATION_STATUS[valueId]) {
      return WIKIDATA_CONSERVATION_STATUS[valueId];
    }
    return '';
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
  conservationStatus: string;
}> {
  const empty = { description: '', wikipediaUrl: '', binomialName: '', imageUrl: '', conservationStatus: '' };
  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animalName)}`,
      { headers: WIKI_HEADERS, next: { revalidate: 86400 } }
    );
    if (!res.ok) return empty;
    const data = await res.json();
    const wikidataId: string = data.wikibase_item ?? '';
    const binomialName = wikidataId ? await fetchBinomialNameFromWikidata(wikidataId) : '';
    const conservationStatus = wikidataId ? await fetchConservationStatusFromWikidata(wikidataId) : '';
    return {
      description: data.extract ?? '',
      wikipediaUrl: data.content_urls?.desktop?.page ?? '',
      binomialName,
      imageUrl: data.thumbnail?.source ?? data.originalimage?.source ?? '',
      conservationStatus,
    };
  } catch {
    return empty;
  }
}
