# therawmaterials.com — homepage brief (placeholder-only rebuild)

Source: https://www.therawmaterials.com/ (single-page React/CRA app, GSAP 3.11.5 + ScrollTrigger + ScrollToPlugin, lottie-web). Evidence pulled from the live DOM, computed styles and the production CSS/JS bundles (`main.de1bebca.css`, `main.0e5f5166.js`). Scope: homepage only. All brand logos, copy, photos, videos and the brand lottie logo are replaced by placeholders; geometry, aspect ratios, type scale, colors and motion are kept.

Local: `/` → `src/app/page.tsx` → `src/components/sites/rawmaterials/*` (styles: `rawmaterials.css`). No downloaded assets (placeholders are CSS).

## Architecture (what the source actually does)
- `html/body` are `overflow:hidden; height:100%`; **the page does not scroll natively on the document**. `.content` is an `absolute`, `100vh`, `overflow-y:auto` scroller (native scrolling, native wheel/touch, **no Lenis / Locomotive / ScrollSmoother** — GSAP ScrollSmoother code is only dead library code, `lenis` = 0 hits). Sidebar `.navigation` is a second scroller (`overflow-y:auto`, 226px).
- Nav clicks use GSAP `ScrollToPlugin` (`scrollTo: section.offsetTop - innerHeight…`, `duration`‑based tween on `.content`).
- `body` background transitions `0.5s ease-in-out` (cream `#f4e9e1`; switches to grey (`greyBackground`) while case studies are open).
- Fixed overlay `.transition` (100vw×100vh, z-index 100000, bg `#f4e9e1`, `transform-origin:100% 50%`) holds a `1px` `.bar` (`#242320`, opacity .8, width 0) = intro.

## Section order (desktop 1440, content column 1162.8px)
| # | Block | Notes |
|---|---|---|
| 0 | Landing | rounded 16px 1px‑border card; header row (two 24.48px lines left / right); giant logo (lottie, random one of 10) |
| 1 Hello (orange `#ff3d00`) | divider pill 32px · intro tile (1190/640) · title-block ("We Are / Raw / Materials", 3 justified lines, hairline under each) · text-block (3 numbered statements) · mission-block (3 rows, label cell + big text) · hello-media-block ("Unusual Wins" 13.8vw over media) · divider w/ arrows + text · people-row (3 cards, video) · divider-alt marquee · quotes (4 testimonial panels, svg logos) |
| 2 Approach (purple `#5900cc`) | divider · intro · media-block (2 imgs) · mission rows · 3× big-divider · divider+arrows · tabbed-block (3 tabs) · big-divider · capabilities-block |
| 3 Work (black `#000`) | divider · intro · 8 case-study-preview-cards (accordion open → full case study, 4 clickable, 4 "coming soon") |
| 4 Talent (blue `#2835f8`) | divider · intro · full media-block (rotated 9° on mobile) · text-block · talent-title-block · divider · tabbed-block (3 tabs) |
| 5 Careers (red `#ff003d`) | divider · intro · careers-title-block (pill words, 1190/736) · divider · careers-list-block (accordion rows) |
| 6 Contact (yellow `#ffff00`, black text) | divider · intro · title-block ("Let's Talk Creativity.") · contact-people-row (3 video cards) · divider |
| 7 Unusual Index (green `#05ff00`, black text) | divider · intro (1190/~690) · full-bleed media · text-block · divider · subscribe block |

Total scroll height ≈ 16 436px at 1024w; section heights at 1024: landing 470, hello 4828, approach 2895, work 1503, talent 2531, careers 1426, contact 1228, unusual 1530.

## Layout rules (desktop ≥1024)
- Sidebar: `left:0; width:226px; padding-left:24px`; items `178×104` (min-height 104), `border-radius:16px`, gap 12px, first item at y=24. Active item expands to `maxHeight` per section (104/491/368/248/318/192/220/159 px) over 0.5s. 
- Content: `position:absolute; left:118px; padding:24px 36px 0 112px; width:calc(100% - 262px)`, children stacked with 16px gaps; every block `border-radius:16px`.
- Landing card: ~1163×760 @1440 (≈aspect 1.53); header row `margin:48px 0 24px`, `width:calc(100% - 96px)`; logo is `height calc(100% - 96px + 30vw)` with negative margins `-20vw -10vw`.
- Inner gutter: 48px each side (`calc(100% - 96px)` everywhere).
- Mobile (≤1023): sidebar hidden → fixed bottom bar (`mobile-navigation`, height 104px, bg cream, 1px top border), content `left:0; padding:3vw; width:94vw`, tab block swaps to stacked `tabbed-block-mobile`. ≤767 rules switch intro aspect to `343/480`, radii to vw.

## Type (all one family in source: StabilGrotesk, `font-feature-settings:"ss02" on`) 
See `DESIGN-TOKENS.md`.
