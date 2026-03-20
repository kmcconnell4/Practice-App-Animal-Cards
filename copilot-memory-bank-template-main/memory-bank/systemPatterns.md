# System Patterns

## Architecture
- **Framework**: Next.js (React)
- **UI Library**: Material UI (MUI)
- **Data Model**: Hybrid — combines multiple sources with local overrides

## Data Sources
- **API Ninjas** — structured animal data
- **Wikipedia** — supplementary text/facts
- **Wikimedia** — images
- **Local overrides** — curated corrections and additions stored in the project

## Key Patterns
- **Carousel component**: Horizontal swipe navigation through animal cards
- **Card component**: Flip interaction (front: image/name, back: facts)
- **Favorites system**: Persist user favorites (storage TBD)
- **Decks**: Group cards into themed collections
- **Sorting & shuffle**: Reorder cards within a deck or the main carousel

## UX Principles
- Swipe-first interaction model
- Minimal navigation — the card carousel is the primary interface
- Card flip for progressive disclosure of information