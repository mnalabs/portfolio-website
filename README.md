# MNA. — Portfolio

Portfolio site for MNA., a product designer and developer.

Built with Next.js (static export), React, TypeScript, Tailwind CSS v4 and GSAP.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run check   # lint + typecheck + build
```

## Deploy

Pushing to `main` builds the static export and deploys it to GitHub Pages
(`.github/workflows/deploy.yml`). The workflow sets `NEXT_PUBLIC_BASE_PATH`
for the project-site URL; leave it unset for local builds.

## Where things live

- `src/components/sites/rawmaterials/sections.tsx` — page content and copy
- `src/components/sites/rawmaterials/rawmaterials.css` — layout, type and responsive rules
- `src/components/sites/rawmaterials/primitives.tsx` — shared blocks, tabs, case cards, marquee
- `docs/research/` — layout, token and motion notes used while building

The layout and motion follow a reference studio site. All content here is original.
