# Handoff

## Goal
Homepage rebuild for VAÃ‰ (voltexbox.com) to convert first-time buyers â€” 7-section structure with alternating rose-deep/pink-pale backgrounds, tighter social proof, no carousel.

## Current State
**Homepage is fully live and working.** All 7 sections in order:
1. `bf-hero` â€” rose-deep, script eyebrow, hero image, gold CTA
2. `bf-proof-strip` â€” pink-pale, 3-column editorial testimonials, SVG stars, pink column dividers
3. `bf-bundles` (bf-bundle-tiers) â€” bundle picker, pre-selects Complete Feminine Reset
4. `bf-how-it-works` â€” pink-pale, no eyebrow, 3 steps + skeptic note
5. `bf-homepage-herbs` â€” rose-deep, "Inside Every Pad", 5-herb grid
6. `bf-guarantee` â€” pink-pale, no script eyebrow (conditional wrapper added)
7. `bf-homepage-cta` â€” rose-deep, italic Alegreya heading, gold CTA

**Product page** has `bf-product-ingredients` section with TCM herb deep-dive â€” also live and clean.

**Encoding bugs fixed across the whole store:**
- Announcement bar emoji `??` â†’ SVG leaf icon
- Proof strip stars `?????` (corrupted Unicode) â†’ SVG stars in `inline-flex` wrapper
- Product page Chinese characters `???` â†’ romanized pinyin (Xue Lian Hua, Bai Zhi, Ding Xiang, Man Shan Hong, Bai Xian Pi)

## Files Being Edited
- `sections/bf-proof-strip.liquid` â€” new section: 3-col editorial testimonials, SVG stars, pink dividers
- `sections/bf-homepage-herbs.liquid` â€” new section: 5-herb strip on rose-deep
- `sections/bf-homepage-cta.liquid` â€” new section: final CTA on rose-deep
- `sections/bf-how-it-works.liquid` â€” updated: pink-pale bg, conditional eyebrow wrapper, `{% style %}`
- `sections/bf-guarantee.liquid` â€” updated: conditional eyebrow wrapper (eyebrow now blank on homepage)
- `sections/bf-product-ingredients.liquid` â€” updated: Chinese chars replaced with pinyin
- `sections/header.liquid` â€” updated: corrupted emoji replaced with SVG leaf
- `templates/index.json` â€” rebuilt: new 7-section order, bf-benefits/bf-testimonials/bf-trust removed

## What Failed
- `{% stylesheet %}` blocks reject `@media` queries via API â†’ always use `{% style %}` for new/re-uploaded sections
- PowerShell `ConvertTo-Json` wraps strings as `{"value":"..."}` â†’ must use `JavaScriptSerializer.Serialize()`
- Non-ASCII characters (emoji, Unicode stars â˜…, Chinese chars) all corrupt to `?` when uploaded via PowerShell â€” always use SVG or HTML entities instead
- `| default: 'fallback'` fires on empty string â†’ wrap in `{% unless setting == blank %}` and remove `| default:`
- SVG stars without a flex wrapper stack vertically â†’ wrap in `<span style="display:inline-flex;...">`
- `--bf-border-light: #FCE7F3` is near-invisible on `--bf-pink-pale: #FDF2F8` â†’ use `--bf-border: #F9A8D4` for visible dividers

## Next Step
The `.impeccable/design.json` sidecar has not been written yet â€” this would enable the visual live panel at impeccable.style for the DESIGN.md system. Low priority but deferred from this session.

## Context
- Store: 3e69v2-8h.myshopify.com Â· Theme ID: 162986098909
- API token: [SHOPIFY_TOKEN — see local env] (do NOT put in ~/.claude/settings.json â€” breaks dev server proxy with 401)
- DESIGN.md is at C:\Users\Turtl\DESIGN.md â€” North Star: "The Herbalist's Confidante", full token system
- Upload pattern: `JavaScriptSerializer.Serialize()` + PUT to `/admin/api/2024-01/themes/{id}/assets.json`
- Scratchpad for this session: `C:\Users\Turtl\AppData\Local\Temp\claude\C--Users-Turtl\1e777968-f007-4277-8527-02241a616132\scratchpad\`

