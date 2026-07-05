# Handoff

## Goal
Build a complete Shopify OS 2.0 theme ("Confidante") for vaewellness.com — evolved Herbalist's Confidante identity — with Higgsfield-generated hero imagery and video.

## Current State
**Theme is complete and passes `shopify theme check` with 0 errors** (9 warnings, all standard Google Fonts CDN notices). Lives in `vae-theme/` on branch `claude/quirky-curie-pulm3m`; upload zip built from the 7 theme folders. Design system: deep mulberry drench `#571B3C` + apothecary gold `#C99A3A` + botanical green, Young Serif display + Alegreya Sans body (OKLCH tokens with hex fallbacks in `layout/theme.liquid`). Homepage narrative: hero (video-capable) → proof → featured individual products → herbs → how-it-works → guarantee → bundles (supporting offer) → CTA. All core templates done: product (variant picker, gallery), collection (sort + pagination), cart (no-JS-safe), blog/article (comments), search, 404, password, gift card, all 7 customer templates. WCAG 2.1 AA contrast; reduced-motion swaps hero video for the still.

**Higgsfield assets generated** (in the user's Higgsfield library, account user_362HhfQJCpCROl1LyGGfIGLgfRR):
- Hero still 16:9 2K — job `cd1d9a6d-be62-40d7-823f-0be59682c0a1`
- Herb macro 4:5 2K — job `47e4740d-18a4-4298-a78e-b57bceb3b9b9`
- Ritual/guarantee 3:2 2K — job `f6182bd3-4f3d-4076-8a80-6aec6d1e7505`
- Hero video loop 6s 1080p (Kling 3.0 Turbo from the hero still) — job `2df9fb80-452a-4258-aa74-7408bf739786`

PRODUCT.md and DESIGN.md written at repo root (register: brand; anti-refs: cutesy pastel femcare, beige spa; emotion: reassured/credible).

## Files Being Edited
- `vae-theme/**` — the entire theme (64 files): layouts, 22 sections, 5 snippets, 19 templates, base.css, global.js, 3 SVG placeholder illustrations
- `PRODUCT.md` — brand strategy (register, users, personality, anti-references, principles)
- `DESIGN.md` — visual system (palette, type, components, motion)
- `.gitignore` — whitelisted PRODUCT.md, DESIGN.md, vae-theme/**; ignored vae-theme/.impeccable/
- `handoff.md` — this file

## What Failed
- Container network policy blocks the Higgsfield CDN (`d8j0ntlcm91z4.cloudfront.net` → proxy 403), so generated media could NOT be bundled into theme assets. Worked around with on-palette SVG placeholder illustrations + image/video pickers on hero, herbs, and guarantee sections; user uploads the generated art via the theme editor.
- Theme-check flagged conditional width/height on the hero img and `{{ email }}` on reset_password — both fixed.

## Next Step
User uploads the 4 Higgsfield assets to Shopify (theme editor → Hero image + Background video, Herbs image, Guarantee image), then uploads the theme zip via Online Store → Themes → Add theme → Upload zip file. If the user instead shares public URLs of their real product photos, feed them to Higgsfield via `media_import_url` as reference media and regenerate imagery featuring the actual product.

## Context
- Store: 3e69v2-8h.myshopify.com, new domain vaewellness.com — same herbal feminine wellness pads
- User chose: "Evolve it" (brand), same store, editorial botanical photo imagery, KEEP bundles (individual products lead, bundles support — reverses the earlier "remove bundles" request)
- Bundle products must be picked in the theme editor (vae-bundles blocks have product pickers, no products wired yet); featured-products section needs a collection picked
- Old handoff context (voltexbox.com homepage rebuild, PowerShell upload pattern) is superseded by this theme-from-scratch approach
