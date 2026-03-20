# Design Document — Animal Cards (MVP)

## 1. Overview

**Platform:** Next.js + Material UI  
**Experience:** Swipe-first, playful, visual learning tool for young children (ages 3–5)  
**Navigation:** Minimal UI, gesture-driven  

---

## 2. System Architecture

Client:
- React components
- Context state
- localStorage persistence

Backend (Next.js API routes):
- API Ninjas (animal data)
- Wikipedia (descriptions)
- Wikimedia (images)
- Local overrides (fun facts, conservation status)

---

## 3. Data Strategy

### Hybrid Model

| Data Type | Source |
|----------|--------|
| Name | API Ninjas |
| Binomial name | API Ninjas |
| Habitat | API Ninjas |
| Range | API Ninjas |
| Description | Wikipedia |
| Image | Wikimedia |
| Fun facts | Local JSON |
| Conservation status | Local JSON |
| Wikipedia link | Wikipedia |

---

## 4. Data Aggregation Flow

/api/animals
→ Fetch from API Ninjas  
→ Fetch description from Wikipedia  
→ Fetch image from Wikimedia  
→ Merge with local overrides  
→ Return normalized data  

---

## 5. Data Model

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

---

## 6. Core UX

### Entry Point
- Users land directly in the carousel

### Carousel
- Horizontal swipe navigation
- Snap-to-card
- Partial next card visible

### Card
- Tap to flip
- Resets on swipe

---

## 7. Components

### Card
- Front: image + name
- Back: description + fun facts + range

### Carousel
- Swipe handling
- Index tracking

### Decks
- List view
- Detail view

### Add to Deck
- “+” button
- Modal for selection/creation

---

## 8. State Management

```ts
AppState {
  animals: Animal[]
  currentIndex: number
  favorites: string[]
  decks: Deck[]
  sortMode: 'none' | 'habitat' | 'conservation'
}
```

---

## 9. Persistence

Stored in localStorage:
- Favorites
- Decks
- Current index

---

## 10. Visual Design

- Playful, kid-friendly UI
- Rounded cards and components
- Bright, soft color palette
- Large tap targets

---

## 11. Accessibility

- ARIA labels for interactive elements
- Keyboard navigation (arrow keys)
- Visible focus states
- Touch targets ≥ 48px
- High contrast colors

---

## 12. Performance

- Lazy load images
- Preload adjacent cards
- Cache API responses
- Smooth animations (<300ms)

---

## 13. Constraints

- Online-first
- No accounts (local storage only)
- No sound in MVP
