# Handoff

## Goal
Fix product naming and count across the entire store, and conditionally show the free digital guide notice only for bundle tiers (not singular orders).

## Current State
All changes are live and verified on the store (theme is published at voltexbox.com / 3e69v2-8h.myshopify.com, theme ID 162986098909).

**Done this session:**
- "Herbal Steam Pads" → "Herbal Menstrual Pads" across all sections
- "4 ct" → "20 ct" per pack; tier 3 (Goddess Bundle) shows "2× 20 ct"
- "Suppositories" → "Supplements" everywhere (bundles, product hero, FAQ, testimonials)
- FAQ answer for pH Guardian rewritten — removed "inserted vaginally" and "boric acid" clinical language
- Free digital guide notice now conditional: shows for tier 2 and tier 3, hidden when tier 1 is selected
- Dev server restarted (was stuck on a temp file upload error after push to live theme)

**Still pending / user action needed:**
- Pages feel short — user asked to add more content sections (deferred, discussed options: ingredient spotlight, wellness timeline, press strip)
- Hero video/image still not uploaded (user needs to add via Shopify Files → theme editor)
- Bundle variant IDs still not set (user needs to create 3 products in Shopify admin and paste IDs)

## Files Being Edited
- `sections/bf-bundle-tiers.liquid` — product name, count, suppositories → supplements, conditional guide notice
- `sections/bf-product-hero.liquid` — product name, count, suppositories → supplements in value stacks
- `sections/bf-hero.liquid` — subheadline default and alt text: steam → menstrual
- `sections/footer.liquid` — nav link text
- `sections/bf-about-content.liquid` — story paragraph
- `sections/bf-faq-accordion.liquid` — subheading, FAQ question + answer rewritten
- `sections/bf-testimonials.liquid` — testimonial quote
- `assets/bundle-selector.js` — added guide notice show/hide logic on tier selection

## What Failed
- Dev server showed "Failed to Upload Theme Files" after pushing to the now-live theme — a temp file naming conflict in Shopify CLI. Fixed by killing and restarting the dev server.
- Push to live theme requires `--allow-live` flag (previously unpublished, now published).

## Next Step
Add more content to the homepage — best candidate is an **ingredients / herb spotlight section** showing key botanicals (mugwort, lavender, calendula) with their benefits. This fits the premium brand tone and builds trust with skeptical first-time buyers.

## Context
- Dev server command: `env -u SHOPIFY_TOKEN -u SHOPIFY_CLI_THEME_TOKEN shopify theme dev --store 3e69v2-8h -t 162986098909 --port 9292`
- Theme is now LIVE (published) — all pushes need `--allow-live` flag
- Store: 3e69v2-8h.myshopify.com / voltexbox.com, theme ID 162986098909
- Brand: VAÉ
- Return policy: unopened/sealed only, within 30 days
- Shipping: 6–9 business days (no free shipping)
- Logo files: assets/logo-black.png (header), assets/logo-white.png (footer)
