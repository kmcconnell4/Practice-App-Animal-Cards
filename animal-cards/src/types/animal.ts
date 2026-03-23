export interface Animal {
  id: string;
  name: string;
  binomialName: string;
  habitat: string;
  range: string;
  description: string;
  imageUrl: string;
  conservationStatus: string;
  wikipediaUrl: string;
  diet?: string;
  prey?: string;
  youngName?: string;
  topSpeed?: string;
  height?: string;
  weight?: string;
}

export interface Deck {
  id: string;
  name: string;
  animalIds: string[];
  createdAt: string;
}

export interface AppState {
  animals: Animal[];
  favorites: string[];
  decks: Deck[];
  currentIndex: number;
}
