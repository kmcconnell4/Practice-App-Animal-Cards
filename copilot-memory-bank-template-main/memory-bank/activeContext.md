# Active Context

## Current Focus
Project is in **initial setup phase**. Planning is complete — PRD, design doc, and task list are finalized. No code has been written yet.

## Immediate Next Steps
1. Initialize Next.js project
2. Install Material UI
3. Configure MUI theme (playful, kid-friendly)
4. Setup folder structure
5. Add TypeScript & configure linting

## Decisions Made
- **Data model**: Hybrid — API Ninjas + Wikipedia + Wikimedia + local JSON overrides
- **Animal model**: Defined with id, name, binomialName, habitat, conservationStatus, description, funFacts, range, imageUrl, thumbnailUrl, wikipediaUrl
- **State management**: React Context with `AppState` (animals, currentIndex, favorites, decks, sortMode)
- **Persistence**: localStorage for favorites, decks, and current index
- **UX**: Swipe-first, card flip, minimal navigation, users land directly in carousel
- **Stack**: Next.js + MUI + TypeScript
- **No accounts**: Fully local, no backend auth
- **Default deck**: "My First Animals"
- **Launch scope**: 100 animals, web app only

## Open Questions
- API key management for API Ninjas
- Deployment target
- Image optimization pipeline details
- Caching strategy specifics (in-memory? file-based? HTTP cache headers?)