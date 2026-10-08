# Plan: Portfolio clone of therawmaterials.com (structure/motion only)

## Decisions (confirmed)
- Purpose: own portfolio. All logos, copy, photos, videos = placeholders.
- Scope: homepage only (add pages later).
- Host: GitHub Pages as user site `mnalabs.github.io` (repo name must be `mnalabs.github.io`, no basePath).
- Name/branding: placeholders ("Your Name") for now.
- Fidelity priority (all equal): smooth scroll, entrance/hover motion, typography/spacing, responsive.
- Env: Node v26, npm 11, git, gh already installed.

## Phase 0 - Setup
1. `git clone https://github.com/JCodesMore/ai-website-cloner-template` into a temp folder, copy contents into `E:\portfolio-website`, delete `.git`, `git init`.
2. `npm install`, `npm run check` (must pass before cloning).
3. Create repo `mnalabs/mnalabs.github.io` (public) and set as origin. Needs your OK at push time.
4. Open the project in Claude Code, make sure browser access is enabled (built-in browser or Claude in Chrome).

## Phase 1 - Static-export config (do before building)
- `next.config`: `output: 'export'`, `images: { unoptimized: true }`, `trailingSlash: true`.
- Add `public/.nojekyll`.
- Add `.github/workflows/deploy.yml` (actions/configure-pages, upload-pages-artifact from `out/`, deploy-pages). Repo Settings > Pages > Source: GitHub Actions.
- Avoid server-only features (API routes, middleware, next/image optimizer).

## Phase 2 - Clone (`/clone-website https://www.therawmaterials.com/`)
Give the command these extra instructions:
- Replace every logo, text string, photo, video and brand SVG with a placeholder; keep real layout, sizes and aspect ratios.
- Fonts: identify font families via computed styles. If proprietary, substitute the closest open font (Google Fonts / Fontsource) and record it.
- Extract: color tokens, type scale, spacing scale, breakpoints (check 375, 768, 1024, 1440, 1920).
- Motion: identify scroll library (Lenis/Locomotive/native), GSAP/Framer usage, easing curves, durations, stagger, scroll-trigger offsets, hover/cursor effects, page-load intro, any WebGL/canvas. Record in `docs/research/`.
- Build with section sub-agents, one component per section.

## Phase 3 - Verify (side-by-side, original vs local)
- Screenshots at each breakpoint, top to bottom.
- Scroll recordings: compare inertia, trigger points, pinned/sticky sections.
- Hover/focus states, loading intro, reduced-motion fallback.
- Lighthouse + `npm run check`. List remaining gaps in `docs/research/`.

## Phase 4 - Personalize
- Swap placeholders for your name, copy, images, favicon, meta/OG tags.

## Phase 5 - Publish
- Commit, push to `mnalabs/mnalabs.github.io`, enable Pages (GitHub Actions), check `https://mnalabs.github.io`.

## Risks
- Exact fonts/WebGL shaders/video may not be extractable; substitutes will be documented.
- "Exact" motion needs real scroll comparison, not screenshots alone.
- Do not reuse their brand name, logo, copy, or imagery in the published site.
