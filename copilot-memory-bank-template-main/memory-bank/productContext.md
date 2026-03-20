# Product Context

## Why This Exists
Children are naturally curious about animals, but many educational resources are static and text-heavy. Animal Cards provides a visual-first, tactile way for pre-readers and early readers to discover and learn about animals at their own pace — no accounts, no ads, no complexity.

## Problems It Solves
- Makes animal education engaging and fun through card-based interactions
- Allows self-directed exploration (swipe, flip, favorite, organize)
- Reduces friction with minimal navigation — the cards are the interface
- Lets kids build personal collections via favorites and custom decks
- Designed for pre-readers: visual-first with minimal text

## Product Principles
- Visual-first, minimal text
- Learn through play
- Low friction, instant interaction
- Delightful and responsive
- Safe and accessible (WCAG aligned)

## User Experience Goals
- **Swipe-first**: Primary interaction is swiping through a horizontal carousel
- **Card flip**: Tap to reveal animal facts on the back
- **Minimal navigation**: Users land directly in the carousel — no landing page, no tab bar
- **Overlay controls**: Deck access and sort/shuffle via small overlay buttons that don't obstruct cards
- **Personalization**: Favorites and deck organization let kids curate their own collections
- **Playful design**: Rounded cards, bright/soft palette, large tap targets (≥48px)
- **Fast**: All transitions <300ms, lazy-loaded images, preloaded adjacent cards
- **Accessible**: ARIA labels, keyboard navigation, visible focus states, high contrast

## Target Users
- **Primary**: Children ages 3–5 (pre-readers or early readers)
- **Secondary**: Parents facilitating or observing usage

## Non-Functional Requirements
- Online-first (no offline mode in MVP)
- No user accounts — all data in localStorage
- No ads
- No sound in MVP
- WCAG accessibility compliance
- Graceful handling of API failures and missing images/data