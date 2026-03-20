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
- **Target age**: 3–5 (pre-readers/early readers) — visual-first, minimal text
- **Data model**: Hybrid — API Ninjas + Wikipedia + Wikimedia + local JSON overrides
- **Animal model**: Defined with id, name, binomialName, habitat, conservationStatus, description, funFacts, range, imageUrl, thumbnailUrl, wikipediaUrl
- **Card front**: Simplified — large image, name (prominent), minimal metadata (habitat icon/text). Binomial name and conservation status NOT on front
- **Card back**: Description (2–3 sentences), 2–3 fun facts, range, "Learn more" link
- **State management**: React Context with `AppState` (animals, currentIndex, favorites, decks, sortMode)
- **Persistence**: localStorage for favorites, decks, and current index
- **Navigation**: No landing page, no tab bar — overlay buttons for deck access and controls
- **UX**: Swipe-first, card flip, gesture-driven, visual-first
- **Stack**: Next.js + MUI + TypeScript
- **No accounts**: Fully local, no backend auth
- **Default deck**: "My First Animals"
- **Launch scope**: 100 curated animals, web app only
- **Future scope identified**: accounts/syncing, quiz mode, unlockable animals, audio, progress tracking, offline

## Open Questions
- API key management for API Ninjas
- Deployment target
- Image optimization pipeline details
- Caching strategy specifics (in-memory? file-based? HTTP cache headers?)