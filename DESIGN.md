# Design

Visual system for VAÉ Wellness (vaewellness.com) — Shopify theme "Confidante". Evolved from the original Herbalist's Confidante system: same soul, deeper color, bolder typography, editorial botanical photography.

## Theme

Named reference: *a 19th-century pharmacopoeia plate, drenched in mulberry* — apothecary credibility with committed color, against both the cutesy-pastel femcare lane and the beige luxury-spa lane. Image-led: full-bleed editorial botanical photography (Higgsfield-generated) carries the hero; deep color carries the bands between.

Color strategy: **Committed.** Deep mulberry carries 40–50% of the page surface (hero, herbs band, footer). Rose-tinted daylight sections sit between. Gold appears only on primary actions and small marks of emphasis. Green belongs to the herbs.

## Color Palette

All colors defined in OKLCH with hex fallbacks. CSS custom properties set in `layout/theme.liquid`.

| Token | OKLCH | Hex | Role |
|---|---|---|---|
| `--vae-mulberry` | oklch(0.32 0.09 355) | `#571B3C` | Committed brand surface: hero, herbs band, footer |
| `--vae-mulberry-deep` | oklch(0.26 0.08 355) | `#431530` | Footer depth, hover states on mulberry |
| `--vae-blush` | oklch(0.96 0.015 0) | `#FAEFF2` | Light section background (rose-tinted, never beige) |
| `--vae-ink` | oklch(0.25 0.05 350) | `#3D1F31` | Text on light surfaces |
| `--vae-light` | oklch(0.94 0.02 355) | `#F7E6ED` | Text on mulberry surfaces (rose-tinted, never pure white) |
| `--vae-gold` | oklch(0.72 0.13 80) | `#C99A3A` | Primary CTA fill, star ratings, emphasis marks |
| `--vae-gold-deep` | oklch(0.62 0.12 78) | `#A87C25` | CTA hover, gold on light backgrounds |
| `--vae-green` | oklch(0.42 0.07 155) | `#2E5F45` | Botanical support: herb names, trust marks on light |
| `--vae-rose-border` | oklch(0.83 0.06 0) | `#E5B8C6` | Visible dividers on blush (never near-invisible) |
| `--vae-rose-mid` | oklch(0.55 0.12 358) | `#A34E70` | Secondary text accents, links on light |

Contrast commitments (WCAG 2.1 AA): `--vae-ink` on `--vae-blush` ≈ 11:1. `--vae-light` on `--vae-mulberry` ≈ 10:1. Dark ink `#2E1420` on `--vae-gold` buttons ≈ 7:1. Gold on mulberry is reserved for large text and borders (≥3:1).

## Typography

| Role | Family | Notes |
|---|---|---|
| Display / headings | **Young Serif** (Google Fonts, 400) | Chunky old-style serif with real weight — apothecary compendium, not whisper-thin spa serif. Hierarchy via size, not weight. |
| Body / UI | **Alegreya Sans** (Google Fonts, 400/500/700) | Humanist sans, warm and credible; continuity thread from the original Alegreya identity. |

- Scale: 1.333 ratio. Display `clamp(2.4rem, 5.5vw, 4.25rem)`; h2 `clamp(1.8rem, 3.5vw, 2.75rem)`; h3 `1.35rem`; body `1.0625rem/1.65`.
- Letter-spacing on Young Serif: 0 to -0.01em, never tighter.
- `text-wrap: balance` on h1–h3; body measure capped at 65ch.
- Line-height on mulberry surfaces +0.05 (light text needs air).
- No tracked-uppercase eyebrows as section grammar. Section cadence comes from alternating surface color and a single botanical rule mark (short gold hairline with a leaf glyph), used sparingly.

## Components

- **Buttons**: Primary — gold fill, ink text `#2E1420`, 2px radius (almost square; apothecary-label, not pill), generous padding, subtle press translate. Secondary — 1.5px solid current-color outline. Focus: 2px `--vae-gold` outline with 2px offset on all interactive elements.
- **Product cards**: image on blush tile, name in Young Serif, price in Alegreya Sans; full-card link; no icon-heading-text template grids. Hover lifts image only (transform, no layout shift).
- **Bundle band**: one mulberry section with the tier picker — supporting offer after trust sections, never before featured individual products.
- **Herb entries**: named in green with pinyin, one-line function; photographed, not iconified.
- **Testimonials**: editorial columns with SVG stars in gold, visible rose borders between columns.
- **Forms/inputs**: 1.5px `--vae-rose-border` borders, blush-white fills, ink text, 4.5:1 placeholder contrast.

## Layout

- Single-purpose folds, long scroll, deliberate pacing (brand permission).
- Fluid spacing: section padding `clamp(4rem, 9vw, 7.5rem)`; page gutter `clamp(1.25rem, 4vw, 3rem)`; max content width 1200px (text blocks 65ch).
- Full-bleed hero: photography carries the fold, headline overlaid, single gold CTA.
- Grid: `repeat(auto-fit, minmax(280px, 1fr))` for product grids; asymmetric two-column splits (7/5) for story sections.

## Motion

"Motion is a whisper": hero video is a slow 5–8s loop (drifting steam, shifting light) with a poster-image fallback; `prefers-reduced-motion: reduce` swaps video for the still and disables all transitions to instant. Scroll reveals only where they clarify sequence (the 3-step ritual), ease-out-quint, ≤500ms, staggered ≤80ms; content fully visible without JS. No bounce, no parallax.

## Imagery

Editorial botanical photography, Higgsfield-generated, art-directed to the palette: dried snow lotus and TCM herbs, linen and dark wood textures, warm directional light against deep mulberry grounds. Macro herb photography in the herbs band. Alt text written in the brand voice ("Dried snow lotus and clove on linen, warm morning light"), never generic.
