# System Patterns

## Architecture
- **Framework**: Next.js (React)
- **UI Library**: Material UI (MUI)
- **State**: React Context
- **Persistence**: localStorage (favorites, decks, current index)
- **Backend**: Next.js API routes (data aggregation layer)

## Data Model

```ts
Animal {
  id: string
  name: string
  binomialName: string
  habitat: string
  conservationStatus: string
  description: string
  funFacts: string[]
  range: string[]
  imageUrl: string
  thumbnailUrl: string
  wikipediaUrl: string
}
```

## App State

```ts
AppState {
  animals: Animal[]
  currentIndex: number
  favorites: string[]        // animal IDs
  decks: Deck[]
  sortMode: 'none' | 'habitat' | 'conservation'
}
```

## Data Aggregation Flow
`/api/animals` → Fetch API Ninjas → Fetch Wikipedia description → Fetch Wikimedia image → Merge local overrides → Return normalized `Animal[]`

| Data Field | Source |
|---|---|
| Name, binomial name, habitat, range | API Ninjas |
| Description, Wikipedia link | Wikipedia |
| Image | Wikimedia |
| Fun facts, conservation status | Local JSON |

## Component Architecture
- **Carousel**: Horizontal swipe, snap-to-card, partial next card visible, index tracking, keyboard nav
- **Card**: Front (image + name + binomial + habitat + conservation) / Back (description + facts + range + link), flip animation, reset on swipe
- **Favorites**: Heart icon toggle, localStorage persistence, hydrate on load
- **Decks**: List view, detail view, CRUD operations, default deck "My First Animals"
- **Add to Deck**: "+" button on card → modal with deck list + inline create
- **Sort/Shuffle**: Control UI, sort by habitat or conservation status, shuffle, updates carousel order

## UX Principles
- Swipe-first, gesture-driven interaction model
- Users land directly in the carousel — minimal navigation
- Card flip for progressive disclosure
- Playful, kid-friendly visual design (rounded, bright/soft palette, large targets)