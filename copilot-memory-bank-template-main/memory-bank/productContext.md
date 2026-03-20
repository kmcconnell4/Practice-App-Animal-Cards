# Product Context

## Why This Exists
Children are naturally curious about animals, but many educational resources are static and text-heavy. Animal Cards provides an interactive, tactile way for kids to discover and learn about animals at their own pace — no accounts, no ads, no complexity.

## Problems It Solves
- Makes animal education engaging and fun through card-based interactions
- Allows self-directed exploration (swipe, flip, favorite, organize)
- Reduces friction with minimal navigation — the cards are the interface
- Lets kids build personal collections via favorites and custom decks

## User Experience Goals
- **Swipe-first**: Primary interaction is swiping through a horizontal carousel
- **Card flip**: Tap to reveal animal facts on the back
- **Minimal navigation**: Users land directly in the carousel — no menus needed
- **Personalization**: Favorites and deck organization let kids curate their own collections
- **Playful design**: Rounded cards, bright/soft palette, large tap targets (≥48px)
- **Fast**: All transitions <300ms, lazy-loaded images, preloaded adjacent cards
- **Accessible**: ARIA labels, keyboard navigation, visible focus states, high contrast

## Target Users
- **Primary**: Children ages 3–10 (biased toward 3–5)
- **Secondary**: Parents and educators

## Non-Functional Requirements
- Online-first (no offline mode in MVP)
- No user accounts — all data in localStorage
- No ads
- No sound in MVP
- WCAG accessibility compliance