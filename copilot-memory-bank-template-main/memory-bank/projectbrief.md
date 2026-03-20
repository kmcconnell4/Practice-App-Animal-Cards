# Project Brief

## Overview
Animal Cards is a delightful, visual learning app for young children (ages 3–5). Kids explore animals through swipeable cards that display images, facts, and fun details.

## Goals
- Help children learn about animals through playful, visual exploration
- Provide a swipe-first, gesture-driven experience
- Support favorites and deck organization for personalized learning
- No accounts — fully local, no ads

## Product Principles
- Visual-first, minimal text
- Learn through play
- Low friction, instant interaction
- Delightful and responsive
- Safe and accessible (WCAG aligned)

## Scope (MVP)
- **100 curated animals** at launch
- **Web app** (no native)
- Swipeable horizontal card carousel with snap-to-card
- Card flip interaction
  - Front: large image, animal name (prominent), minimal metadata (e.g., habitat icon/text)
  - Back: description (2–3 sentences), 2–3 fun facts, range, "Learn more" Wikipedia link
- Favorites (heart icon toggle + localStorage persistence)
- Deck management (create/rename/delete, default deck "My First Animals")
- Add-to-deck modal ("+" button → select or create deck)
- Sorting (habitat, conservation status) & shuffle
- Minimal navigation — overlay controls, no tab bar
- WCAG accessibility compliance
- Fast transitions (<300ms)

## Success Metrics
- Average session duration
- Cards viewed per session
- Favorites per user
- Deck creation rate
- Return usage (D1 retention)

## Future Considerations (Out of Scope for MVP)
- User accounts & syncing
- Quiz mode
- Unlockable animals
- Audio playback
- Progress tracking
- Offline support