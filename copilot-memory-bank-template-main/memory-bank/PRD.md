# 📄 Product Requirements Document — Animal Cards (MVP)

## 1. Overview

**Product Name:** Animal Cards
**Platform:** Web app built with Next.js and Material UI

**Goal:**
Help young children (ages 3–5) learn about animals through a delightful, visual, swipe-based experience.

**Launch Scope:**

* 100 curated animals
* Online-first experience
* No user accounts (local persistence only)
* No sound (deprioritized for MVP)

---

## 2. Target Users

### Primary Users

* Children ages 3–5 (pre-readers or early readers)

### Secondary Users

* Parents facilitating or observing usage

---

## 3. Product Principles

* Visual-first, minimal text
* Learn through play
* Low friction, instant interaction
* Delightful and responsive
* Safe and accessible (WCAG aligned)

---

## 4. Core Experience

* Users land directly in a **swipeable card carousel**
* Each card represents an animal
* Users can:

  * Swipe to explore
  * Tap to flip
  * Favorite animals
  * Add animals to decks
* Minimal navigation with overlay controls

---

# 5. Features, User Stories & Acceptance Criteria

---

## 5.1 Animal Card Carousel

### Description

Primary browsing experience using horizontally swipeable cards.

### User Stories

* As a user, I want to swipe through animal cards so I can discover animals.
* As a young child, I want to see what’s next so I feel encouraged to keep going.

### Acceptance Criteria

* Users can swipe horizontally between cards (touch + mouse)
* Cards snap into position after swipe
* The next card is partially visible (“peek”)
* Only one card is active at a time
* Arrow keys allow navigation between cards
* Current card index is tracked in state

---

## 5.2 Animal Card (Front & Back)

### Description

Each animal is displayed as a card with two sides.

### User Stories

* As a user, I want to tap a card to learn more details about the animal.
* As a child, I want information to be simple and easy to understand.

### Acceptance Criteria

#### Front of Card

* Displays:

  * Large image
  * Animal name (prominent)
  * Minimal metadata (e.g., habitat via icon/text)

#### Back of Card

* Displays:

  * Description (2–3 sentences)
  * 2–3 fun facts
  * Range (text)
  * “Learn more” link to Wikipedia

#### Interaction

* Tapping the card flips it (animated)
* Flip animation completes within 300ms
* Card resets to front when user swipes to a new card

---

## 5.3 Favorites

### Description

Users can mark animals as favorites.

### User Stories

* As a user, I want to favorite animals so I can find them later.

### Acceptance Criteria

* Heart icon is visible on each card
* Tapping toggles favorite state immediately
* Visual feedback indicates state change
* Favorites persist across sessions using localStorage
* Favorite state is restored on page load

---

## 5.4 Deck Management

### Description

Users can group animals into decks.

### User Stories

* As a user, I want to organize animals into decks so I can group them.

### Acceptance Criteria

* App initializes with default deck: **“My First Animals”**
* Users can:

  * Create new decks
  * Rename decks
  * Delete decks
* Decks persist across sessions (localStorage)
* Deck list is accessible via overlay button

---

## 5.5 Add to Deck

### Description

Users can quickly add animals to decks.

### User Stories

* As a user, I want to quickly add animals to a deck while browsing.

### Acceptance Criteria

* “+” button is visible on each card
* Tapping opens a modal with:

  * List of existing decks
  * Option to create a new deck
* Selecting a deck adds the animal immediately
* Confirmation feedback is shown (visual or toast)

---

## 5.6 Sorting & Shuffle

### Description

Users can change how cards are ordered.

### User Stories

* As a user, I want to shuffle cards for variety.
* As a user, I want to sort animals to explore categories.

### Acceptance Criteria

* Shuffle randomizes card order instantly
* Sorting options include:

  * Habitat
  * Conservation status
* Sorting updates the carousel order immediately
* Controls are accessible via minimal overlay UI

---

## 5.7 Navigation

### Description

Minimal, gesture-first navigation.

### User Stories

* As a user, I want a simple interface so I can focus on the cards.

### Acceptance Criteria

* Users land directly in the carousel (no landing page)
* No tab bar or complex navigation
* Deck access via small overlay button
* UI does not obstruct card content

---

# 6. Data Requirements

### Animal Data (Hybrid Model)

| Field               | Source     |
| ------------------- | ---------- |
| Name                | API Ninjas |
| Binomial Name       | API Ninjas |
| Habitat             | API Ninjas |
| Range               | API Ninjas |
| Description         | Wikipedia  |
| Image               | Wikimedia  |
| Fun Facts           | Local JSON |
| Conservation Status | Local JSON |

### Acceptance Criteria

* Each animal includes all required fields
* Data is normalized before reaching frontend
* Missing fields are handled gracefully

---

# 7. Non-Functional Requirements

### Performance

* Card transitions < 300ms
* Images lazy-loaded
* Adjacent cards preloaded

### Accessibility (WCAG)

* Keyboard navigation supported
* ARIA labels for all interactive elements
* Touch targets ≥ 48px
* Sufficient color contrast

### Reliability

* Graceful handling of API failures
* Fallback for missing images or data

---

# 8. Success Metrics

* Average session duration
* Cards viewed per session
* Favorites per user
* Deck creation rate
* Return usage (D1 retention)

---

# 9. Constraints

* Online-first (no offline mode)
* No accounts (local storage only)
* No sound in MVP
* Limited to 100 animals at launch

---

# 10. Future Considerations (Out of Scope for MVP)

* User accounts & syncing
* Quiz mode
* Unlockable animals
* Audio playback
* Progress tracking
* Offline support

---
