# Product Requirements Document — Animal Cards

## 1. Overview

**Goal:** Help children (ages 3–10) learn about animals through interactive, visual exploration.

**Target Users:**
- Primary: Kids (3–10, biased toward 3–5)
- Secondary: Parents, educators

**Launch Scope:**
- 100 animals
- Web app
- No accounts (local-only)

---

## 2. Core Features (MVP)

### Animal Card Carousel
- Swipeable horizontal carousel
- Tap to flip card

**Front:**
- Image
- Name
- Binomial name
- Habitat
- Conservation status

**Back:**
- Description
- Fun facts
- Range
- Wikipedia link

---

### Favorites
- Toggle favorite state
- Persist locally
- Dedicated favorites view (future)

---

### Deck Management
- Default deck: “My First Animals”
- Create / rename / delete decks
- Add/remove animals

---

### Add to Deck
- “+” button on card
- Modal to select or create deck

---

### Shuffle & Sorting
- Shuffle cards
- Sort by:
  - Habitat
  - Conservation status

---

## 3. Non-Functional Requirements

- Fast transitions (<300ms)
- Online-first
- WCAG accessibility compliance
- No ads

---

## 4. Success Metrics

- Session duration
- Cards viewed per session
- Deck creation rate
- Retention (D1, D7)