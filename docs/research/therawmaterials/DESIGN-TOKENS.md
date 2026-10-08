# Design tokens — therawmaterials.com

## Fonts
Declared in `main.css` (all `font-display:swap`, woff2+woff, self-hosted under `/static/media/`):

| Family | Weights | Used for | Licence | Local substitute |
|---|---|---|---|---|
| **StabilGrotesk** | 200/400/500/700 | body + everything (only weight 400 visible; `ss02` on) | commercial (licensed foundry font) | **Inter Tight** (Google, OFL) — nearest metrics; tracking −0.01em as source |
| RightGrotesk (100) | – | alt big-divider face | commercial | Inter Tight |
| KlarheitKurrent (400/500) | – | `.big-divider.KlarheitKurrent` (7.4vw, 500, −0.04em) | commercial | Inter Tight 500 |
| SF Pro (200/400) | – | `.big-divider.SFPro` | Apple | Inter Tight |
| Optimistic Text (400–700) | – | `.big-divider.OptimisticText` | Microsoft/Meta licence | Inter Tight |
| HTQ-Waldenburg FettSchmal / Halbschmal | – | `.big-divider.HTQ` (condensed) | commercial | Inter Tight (or Oswald for condensed) |
| Moderat | – | misc | commercial | Inter Tight |

Rebuild uses **one** open font (Inter Tight) for all faces; the five alt big-divider faces are represented by the same class names with different tracking/height.

## Colors
| Token | Value | Use |
|---|---|---|
| cream / offwhite | `#f4e9e1` | page bg, light text on color |
| ink | `#0e0e0e` | text, 1px borders |
| orange | `#ff3d00` | Hello |
| purple | `#5900cc` | Approach |
| black | `#000000` | Work |
| blue | `#2835f8` | Talent |
| red | `#ff003d` | Careers |
| yellow | `#ffff00` | Contact (black text) |
| green | `#05ff00` | Unusual Index (black text) |
| white | `#ffffff` | nav item 00 |
| grey | `#83807c` | labels on grey page state |
| line / intro bar | `#242320` @ .8 | intro bar |
| meta green line | `#3eea5a` | case study accents |

## Type scale (vw-driven; measured @1440 → vw)
| Role | px@1440 | CSS | lh | tracking |
|---|---|---|---|---|
| Section intro title | 198.7 | 13.8vw | 1 | −0.01em |
| Section intro number | 99.4 | 6.9vw | 1 | −0.01em |
| Title-block lines | 199.9 | 13.88vw | 14.25vw | 0 |
| Text-block statement | 99.9 | 6.94vw | 8.33vw | 0 (text-indent 12%) |
| Wins | 198.7 | 13.8vw | 11.1vw | −1% |
| Careers pill word | 139.7 | 9.7vw | – | – |
| Big divider | 100 | 6.944vw (7.4vw alt) | 100% | −0.01em |
| People name | 46.1 | 3.2vw | 3.2vw | 0 |
| Divider text | 21.6 | 1.5vw | 100% | −0.01em |
| Landing header | 24.5 | 1.7vw | 1 | 0 |
| Small text | 24 | 24px | 28px | 0 |
| Tab title / number | 17.3 / 14.4 | 1.2vw / 1vw | – | – |
| Section label | 12 | 12px / .833vw | 1 | −0.01em |
| Nav number / text | 12 / 18 | 12px / 18px (mobile 8/12) | – | – |

## Spacing / radius
- Radii: 16px blocks and nav items; `24px/4vw` mobile dividers; number chips `1.7vw`; careers pills `13vw`.
- Gaps between blocks 16px; inner gutter 48px; section-intro padding via margin `4.4vw 0 0 48px`.
- Hairlines: `1px solid #0e0e0e`; title-block lines are `linear-gradient(transparent calc(100% - 1px), #0e0e0e)`.

## Breakpoints
Source media queries (counts): `max-width:767px` ×213, `max-width:1023px` ×56, `max-width:1280px` ×4, `min-width:1280px` ×2, `min-width:1600px` ×1, `min-width:1920px` ×1, plus 768/1196/1200 one-offs and `orientation:portrait`.
| Viewport | Layout |
|---|---|
| 375 | mobile (≤767): bottom nav, content `94vw`, intro aspect 343/480 |
| 768 | tablet (768–1023): bottom nav (mobile nav), content `94vw`, desktop-ish vw type |
| 1024 | desktop: sidebar 226px, content 748px |
| 1440 | reference: content 1162.8px |
| 1920 | content 1642.8px; vw type keeps scaling (intro title 265px); `min-width:1600` raises mission text to 7.4vw; `min-width:1920` pins careers label `bottom:48px` |
