# Tech Context

## Tech Stack
- **Framework**: Next.js
- **UI**: Material UI (MUI)
- **Language**: TypeScript (assumed, Next.js default)

## External APIs
- **API Ninjas** — animal data
- **Wikipedia API** — supplementary facts
- **Wikimedia Commons API** — animal images

## Data Strategy
Hybrid model: fetch from external APIs, merge with local override files. Local overrides allow curating and correcting data without depending solely on API accuracy.

## Setup Tasks (from Task List)
- [ ] Initialize Next.js project
- [ ] Install and configure MUI

## Constraints
- Child-friendly content — all data must be age-appropriate
- API rate limits may apply to API Ninjas, Wikipedia, and Wikimedia
- Need to handle cases where external APIs are unavailable (fallback to local data)