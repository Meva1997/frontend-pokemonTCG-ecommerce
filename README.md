# Pokémon TCG E‑Commerce (Frontend)

Status: In early development (work in progress)

A simple Next.js + TypeScript + Tailwind CSS frontend for a future Pokémon TCG e‑commerce site. The goal is to provide a fast, accessible and modular UI to browse Pokémon Trading Card Game cards, view details, and (later) manage a shopping cart and checkout flow.

## Overview
This project is being built step by step, starting with layout, styling system, and a structure that will make it easy to plug in real data from the Pokémon TCG API. The focus right now is on:
- Clean component structure
- Reusable UI primitives (buttons, layout containers, card items)
- A consistent design system powered by Tailwind CSS

Once the foundations are stable, data fetching, cart logic, and simple checkout simulation will follow. Real authentication and payments will be added afterward.

## Tech Stack
- Next.js
- TypeScript
- Tailwind CSS
- (Planned) Pokémon TCG API integration
- (Planned) Auth + Stripe payments

## Getting Started
```bash
# Clone
git clone https://github.com/Meva1997/frontend-pokemonTCG-ecommerce.git
cd frontend-pokemonTCG-ecommerce

# Install (choose one)
pnpm install
# or
yarn install
# or
npm install

# Run dev server
pnpm dev
# or yarn dev / npm run dev

# Build
pnpm build
pnpm start
```

## Environment (planned)
Create a `.env.local` later with things like:
```
POKEMON_TCG_API_KEY=your_key
```

## Current Focus
- Basic page structure & routing
- Card listing layout (static placeholder data for now)
- Shared UI components (cards, layout, navigation)
- Styling system + theme tokens

## Short Roadmap
- [ ] Fetch real card data
- [ ] Product detail page
- [ ] Cart state (add / remove / persist locally)
- [ ] Simple checkout mock
- [ ] Auth (NextAuth or custom)
- [ ] Stripe integration
- [ ] Basic tests
- [ ] Dark mode toggle

## Design Principles
- Simplicity first: start small, iterate fast
- Performance: leverage Next.js optimizations (images, caching)
- Accessibility: semantic HTML and keyboard-friendly components
- Type safety: strong typing for domain models (cards, prices, cart items)

## Future Ideas
- Wishlist / favorites
- Advanced filters (rarity, set, type, price range)
- Price history display
- Internationalization (EN/ES)
- Analytics integration

## Contributing (later)
Open an issue or PR once the base structure is stable.

## License
Not defined yet.

---
(Temporary README – will expand as features land.)