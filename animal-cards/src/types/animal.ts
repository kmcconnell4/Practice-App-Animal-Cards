export interface Animal {
  id: string;
  name: string;
  binomialName: string;
  habitat: string;
  range: string;
  description: string;
  imageUrl: string;
  funFacts: string[];
  conservationStatus: string;
  wikipediaUrl: string;
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
