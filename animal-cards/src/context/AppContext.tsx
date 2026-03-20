'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Animal, AppState, Deck } from '@/types/animal';

type Action =
  | { type: 'SET_ANIMALS'; payload: Animal[] }
  | { type: 'SET_INDEX'; payload: number }
  | { type: 'TOGGLE_FAVORITE'; payload: string }
  | { type: 'ADD_DECK'; payload: Deck }
  | { type: 'RENAME_DECK'; payload: { id: string; name: string } }
  | { type: 'DELETE_DECK'; payload: string }
  | { type: 'ADD_TO_DECK'; payload: { deckId: string; animalId: string } }
  | { type: 'HYDRATE'; payload: Partial<AppState> };

const initialState: AppState = {
  animals: [],
  favorites: [],
  decks: [{ id: 'default', name: 'My Animals', animalIds: [], createdAt: '2026-01-01T00:00:00.000Z' }],
  currentIndex: 0,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'HYDRATE': return { ...state, ...action.payload };
    case 'SET_ANIMALS': return { ...state, animals: action.payload };
    case 'SET_INDEX': return { ...state, currentIndex: action.payload };
    case 'TOGGLE_FAVORITE': {
      const favs = state.favorites.includes(action.payload)
        ? state.favorites.filter((id) => id !== action.payload)
        : [...state.favorites, action.payload];
      return { ...state, favorites: favs };
    }
    case 'ADD_DECK': return { ...state, decks: [...state.decks, action.payload] };
    case 'RENAME_DECK':
      return { ...state, decks: state.decks.map((d) => d.id === action.payload.id ? { ...d, name: action.payload.name } : d) };
    case 'DELETE_DECK':
      return { ...state, decks: state.decks.filter((d) => d.id !== action.payload) };
    case 'ADD_TO_DECK':
      return {
        ...state,
        decks: state.decks.map((d) =>
          d.id === action.payload.deckId && !d.animalIds.includes(action.payload.animalId)
            ? { ...d, animalIds: [...d.animalIds, action.payload.animalId] }
            : d
        ),
      };
    default: return state;
  }
}

const AppContext = createContext<{ state: AppState; dispatch: React.Dispatch<Action> } | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('animal-cards-state');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'HYDRATE', payload: { favorites: parsed.favorites ?? [], decks: parsed.decks ?? initialState.decks } });
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('animal-cards-state', JSON.stringify({ favorites: state.favorites, decks: state.decks }));
    } catch {}
  }, [state.favorites, state.decks]);

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
