
# 🧩 `TASK_LIST.md`

```markdown
# MVP Task List — Animal Cards

---

## EPIC 1: Setup

- Initialize Next.js project
- Install Material UI
- Configure theme
- Setup folder structure
- Add TypeScript
- Configure linting

---

## EPIC 2: Data Layer

- Create /api/animals endpoint
- Integrate API Ninjas
- Fetch Wikipedia descriptions
- Fetch Wikimedia images
- Create local overrides JSON
- Normalize data into Animal model
- Cache responses

---

## EPIC 3: Carousel

- Build Carousel component
- Implement swipe gestures
- Add snap-to-card behavior
- Show partial next card
- Track current index
- Add keyboard navigation

---

## EPIC 4: Card

- Build Card component
- Front: image + name
- Back: description + facts
- Implement flip animation
- Reset flip on swipe

---

## EPIC 5: Favorites

- Add heart icon
- Toggle favorite state
- Store in state
- Persist to localStorage
- Hydrate on load

---

## EPIC 6: Decks

- Define Deck model
- Initialize default deck
- Build deck state
- Persist to localStorage
- Create deck list view
- Create deck detail view
- Add create/rename/delete

---

## EPIC 7: Add to Deck

- Add “+” button to card
- Build modal
- Show deck list
- Add create deck inline
- Implement add logic
- Show confirmation feedback

---

## EPIC 8: Sorting & Shuffle

- Build control UI
- Implement shuffle
- Implement sort (habitat)
- Implement sort (conservation)
- Update carousel order

---

## EPIC 9: Visual Design

- Customize MUI theme
- Apply typography
- Add spacing system
- Style cards
- Style buttons

---

## EPIC 10: Performance

- Lazy load images
- Preload adjacent cards
- Optimize images
- Memoize components

---

## EPIC 11: Accessibility

- Add ARIA labels
- Implement keyboard navigation
- Ensure focus states
- Validate contrast
- Ensure tap targets

---

## EPIC 12: QA

- Handle API errors
- Handle missing images
- Test mobile + desktop
- Cross-browser testing
- Validate persistence