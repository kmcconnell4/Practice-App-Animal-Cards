# Tech Context

## Tech Stack
- **Framework**: Next.js
- **UI**: Material UI (MUI)
- **Language**: TypeScript
- **State management**: React Context
- **Persistence**: localStorage
- **Backend**: Next.js API routes (no separate server)

## External APIs
- **API Ninjas** — name, binomial name, habitat, range
- **Wikipedia API** — descriptions, Wikipedia links
- **Wikimedia Commons API** — animal images

## Local Data
- **Local JSON overrides** — fun facts, conservation status, curated corrections

## Data Strategy
Hybrid model via `/api/animals` endpoint:
1. Fetch structured data from API Ninjas
2. Fetch description from Wikipedia
3. Fetch image from Wikimedia
4. Merge with local override JSON
5. Return normalized `Animal[]`

API responses should be cached for performance.

## Setup (Epic 1)
- [ ] Initialize Next.js project
- [ ] Install Material UI
- [ ] Configure MUI theme (playful, kid-friendly)
- [ ] Setup folder structure
- [ ] Add TypeScript
- [ ] Configure linting

## Performance Requirements
- Transitions <300ms
- Lazy load images
- Preload adjacent cards in carousel
- Optimize/compress images
- Memoize components

## Accessibility Requirements
- ARIA labels on all interactive elements
- Keyboard navigation (arrow keys for carousel)
- Visible focus states
- Touch targets ≥ 48px
- High contrast colors

## Constraints
- Online-first (no offline mode)
- No user accounts — localStorage only
- No ads, no sound in MVP
- Child-friendly content — all data must be age-appropriate
- API rate limits may apply (cache responses)
- Must handle API errors and missing images gracefully