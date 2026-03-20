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
- **Carousel**: Horizontal swipe (touch + mouse), snap-to-card, partial next card visible ("peek"), index tracking, keyboard nav (arrow keys), one active card at a time
- **Card Front**: Large image, animal name (prominent), minimal metadata (e.g., habitat via icon/text)
- **Card Back**: Description (2–3 sentences), 2–3 fun facts, range (text), "Learn more" Wikipedia link
- **Card interaction**: Tap to flip (animated, <300ms), card resets to front on swipe
- **Favorites**: Heart icon on each card, toggle with immediate visual feedback, localStorage persistence, hydrate on load
- **Decks**: List view (accessible via overlay button), detail view, CRUD operations, default deck "My First Animals"
- **Add to Deck**: "+" button on card → modal with deck list + inline create, confirmation feedback (visual/toast)
- **Sort/Shuffle**: Overlay control UI, sort by habitat or conservation status, shuffle randomizes instantly, updates carousel order
- **Navigation**: No landing page, no tab bar, deck access via small overlay button, UI does not obstruct card content

## UX Principles
- Visual-first, minimal text (designed for pre-readers)
- Swipe-first, gesture-driven interaction model
- Users land directly in the carousel — no landing page
- Overlay controls that don't obstruct card content
- Card flip for progressive disclosure
- Playful, kid-friendly visual design (rounded, bright/soft palette, large targets)