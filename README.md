# Pokémon TCG E‑Commerce (Frontend)

Status: In early development (work in progress)

A simple Next.js + TypeScript + Tailwind CSS frontend for a future Pokémon TCG e‑commerce site (browse cards, add to cart, and later checkout).

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
- Basic page structure
- Card listing layout
- Shared UI components
- Styling system

## Short Roadmap
- [ ] Fetch real card data
- [ ] Product detail page
- [ ] Cart state
- [ ] Simple checkout mock
- [ ] Auth (NextAuth or custom)
- [ ] Stripe integration
- [ ] Basic tests

## Contributing (later)
Open an issue or PR once the base structure is stable.

## License
Not defined yet.

---

(Temporary README – will expand as features land.)