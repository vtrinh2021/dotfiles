# Handoff

## Goal
Design the BloomFemme Shopify store (theme #162986098909) — elevate visual quality, add hero video support, implement VAÉ branding, and make the homepage feel premium and conversion-ready.

## Current State
All homepage sections are live and pushed to Shopify. Dev server runs at http://127.0.0.1:9292. Theme is unpublished (preview only). The page is visually complete but not yet wired to real products — bundle cards have placeholder variant IDs.

**Working:**
- Hero section — full redesign with video support, ambient orb background, 4/5 aspect ratio media panel, pause/play toggle, prefers-reduced-motion compliance
- Featured bundle tier card — deep rose inverse card (dark bg, white text), visually dominant
- Guarantee banner — deep rose full-bleed section, gold CTA button
- Dividers removed across all sections (was a major AI tell)
- VAÉ logos — black in header, white in footer (both PNG assets uploaded to Shopify)
- Favicon — all 4 sizes (16, 32, 48, 180px) wired in theme.liquid
- Footer — white VAÉ logo image replacing text

**Not yet done (requires merchant action):**
- Hero video not uploaded yet — user needs to upload MP4 to Shopify Files and paste URL into theme editor > Hero Banner > "Hero video URL"
- Hero image not set — needs to be uploaded in theme editor as fallback/poster
- Bundle tier variant IDs — user needs to create 3 products in Shopify admin, get variant IDs, paste into Bundle Tiers section settings
- Products not created yet — Herbal Steam Pads, pH Guardian Suppositories, On-The-Go Wipes

## Files Being Edited
- `bloomfemme-theme/sections/bf-hero.liquid` — complete rewrite: video support, ambient bg, new layout, schema
- `bloomfemme-theme/sections/bf-bundle-tiers.liquid` — existing structure kept, CSS drives the featured card redesign
- `bloomfemme-theme/sections/bf-guarantee.liquid` — CTA button changed to btn--gold for dark bg visibility
- `bloomfemme-theme/sections/footer.liquid` — text logo replaced with white VAÉ PNG image
- `bloomfemme-theme/assets/theme.css` — dividers hidden, featured card inverse styles, guarantee banner dark bg, footer logo CSS
- `bloomfemme-theme/layout/theme.liquid` — favicon link tags added
- `bloomfemme-theme/sections/header.liquid` — black VAÉ logo image (done in prior session)

## What Failed
- Full-page Playwright screenshots timeout due to Google Fonts loading — use viewport-only or browser_evaluate for verification instead
- `shopify auth login --store` flag does not exist — just run `shopify auth login` with no flags

## Next Step
Upload a hero video or image in Shopify admin (Shopify Files), then create the 3 products and wire their variant IDs into the Bundle Tiers section settings so the Add to Cart flow is actually functional.

## Context
- Dev server command: `env -u SHOPIFY_TOKEN -u SHOPIFY_CLI_THEME_TOKEN shopify theme dev --store 3e69v2-8h -t 162986098909 --port 9292`
- Admin API token for curl: stored separately — do NOT put in settings.json (check prior session or generate new shpat in Shopify admin > Apps > API credentials)
- SHOPIFY_TOKEN must NOT be in ~/.claude/settings.json — it breaks the dev server proxy with 401
- Store: 3e69v2-8h.myshopify.com / voltexbox.com, theme ID 162986098909 (BloomFemme, unpublished)
- Brand: VAÉ (store shows as "Voltex" in Shopify admin — this is fine, ignore it)
- Return policy: unopened/sealed packaging only, within 30 days of delivery
- Shipping: 6–9 business days (no free shipping committed anywhere)
- Logo files: bloomfemme-theme/assets/logo-black.png (header), bloomfemme-theme/assets/logo-white.png (footer)
