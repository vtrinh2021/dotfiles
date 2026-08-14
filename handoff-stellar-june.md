# Handoff

Project: **Stellar June** — stellarjune.com / `uww6bs-a3.myshopify.com`, live theme `149017296979`.
Magnetic false lashes dropshipped from AliExpress. Theme repo: `C:\Users\Turtl\stellar-june-theme`.

## Goal

Fix the Siren product image, then a run of storefront and merchandising work:
lifestyle photography, a collection hero, a Starter Kit that lets buyers choose
their own lashes, a Buy-2-Get-1 prompt at checkout, and a single $75 threshold
granting both free shipping and a free lash cleanser.

## Current State

**Everything below is live and verified against the storefront or checkout.**

### Product imagery
- **Siren's on-eye shot replaced.** The original was the odd one out — eye at
  ~40% of frame, no brow, flat beige surround. Regenerated as a tight macro
  crop matching the other 26.
- **Ten lifestyle shots regenerated for the wrong case colour.** The case
  grouping in `SUPPLIER-CODES.md` said "plain case" for fifteen products that
  actually ship four different colours, so ten models held a pink compact the
  customer would never receive. Real colours, read off each pack shot:
  - lime green — Feather, Halo, Siren, Whisper, Wisp
  - clear frosted — Daydream, Reverie
  - ivory — Cameo, Doll · white — Sunday
  - pink — Bombshell, Icon, Muse, Starlet, Velvet (were already correct)
  - cream — the LZ16–40 and LQ groups · pink pearl — Duet, Encore
  Each was regenerated as an *edit* of the original frame so the model, pose,
  lighting and lash are the same photograph. All 27 sit at position 2 (the
  card's hover image). `SUPPLIER-CODES.md` is corrected.
- **Starter Kit had no image at all** — it rendered as an empty card. Now a
  flat-lay showing three compacts in *different* colours (pink/green/cream),
  the curler and the cleanser, because buyers now pick their own three.

### Collection hero
- `assets/collection-hero.jpg` (1800×1005) + `assets/collection-hero-mobile.jpg`
  (900×670, cropped from the same master). Desktop overlays the heading on the
  image's empty left half over a scrim; mobile stacks and is height-capped at
  `42vh` so the grid still starts on the first screen.
- Both are `image_picker` settings on `main-collection` — editable in the theme
  editor, with the bundled files as fallback.
- A phone-specific file exists because a 16:9 frame cropped to phone width
  magnifies whatever is centred and slices the rest. First attempt did exactly
  that and filled the whole viewport with one face.

### Starter Kit lash picker
- Three required selects on the Kit PDP listing the twenty $24.99 styles,
  prefilled Whisper / Wisp / Halo so the description stays true.
- Carried as **line item properties**, not variants — three slots across twenty
  styles is thousands of combinations, far past Shopify's 100-variant ceiling.
- Picks render under the kit in the cart drawer (both Liquid and the JS
  re-render).

### Buy 2 Get 1 Free interstitial
- Intercepts the checkout click **once** when the cart holds 1 or 2 pairs, with
  copy matched to the real maths (at two pairs the next is genuinely free; at
  one pair it says two more are needed). Ten styles addable inline. Declining
  goes straight through.

### Rewards — both at $75
Three rewards, one per Shopify discount class, because **Shopify applies at most
one product discount per order**:

| Reward | Class | Mechanism |
|---|---|---|
| Buy 2, Get 1 Free | product | BXGY on the Lashes collection |
| Free cleanser | **order** | flat $17.95 off, minimum **$92.95** |
| Free shipping over $75 | shipping | automatic discount, minimum $75 |

- The cleanser is **added to the cart automatically** at the threshold and
  removed if the cart drops below — a discount only zeroes an item already in
  the cart, it never adds one.
- The cart drawer offers the cleanser as an add ("Free once you reach $75").
- Free shipping is granted by a **discount**, not a rate. The only rates in the
  profile are the paid Standard $6.99 / International $7.99.
- Verified at checkout on a 5-pair cart: subtotal $117.91, B2G1 applied,
  order discount −$17.95, shipping $6.99 → FREE, total $99.96.

## Files Being Edited

Theme (`C:\Users\Turtl\stellar-june-theme`):
- `CLAUDE.md` — rewritten. CLI-auth workaround, the two shipping traps, the
  discount-class rules, the "drawer renders twice" rule.
- `SUPPLIER-CODES.md` — packaging column replaced with verified case colours.
- `sections/main-collection.liquid` — hero band, `<picture>` swap, hero settings.
- `sections/main-product.liquid` — kit picker, `is_kit`, kit-specific copy.
- `sections/announcement-bar.liquid` — "$75" default + a warning in the info text.
- `snippets/cart-drawer.liquid` — kit picks, gift line, cleanser upsell,
  `qualifying` maths, "add one more item" copy, seeded globals.
- `assets/theme.js` — form serialisation, `applyCart()`, gift sync,
  `qualifyingSubtotal()`, BOGO modal, `esc()`, upsell toggle.
- `assets/base.css` — hero, kit picker, BOGO modal, cleanser upsell, gift badge.
- `config/settings_schema.json` — `free_gift_handle`.
- `config/settings_data.json` — thresholds 75 / 75.
- `templates/product.json` — assurance line "$75".
- `assets/collection-hero.jpg`, `assets/collection-hero-mobile.jpg` — new.

`.build/` scripts (all excluded via `.shopifyignore`):
- `theme_api.py` — **the pull/push tool now.** `pullall` / `get` / `put`.
- `recolor_cases.py`, `fix_siren.py`, `attach_lifestyle.py`, `kit_and_hero.py`,
  `hero_assets.py` — imagery.
- `check_offers.py` — prints what is actually configured (run this first).
- `cleanser_order_discount.py`, `free_ship_4998.py`, `combine_shipping.py`,
  `one_tier_75.py`, `qualify_7497.py`, `restore_rates.py`, `gift_all_collection.py`.

## What Failed

- **`shopify theme pull` / `push` do not work here.** The CLI session expired and
  needs an interactive browser login. It does not error — it prints a device code
  and hangs until timeout, writing nothing. Use `.build/theme_api.py`.
- **Deleting the "free over $50" shipping rates deleted the paid rates too, and
  broke checkout.** Those free rates are `RateRangeCondition`-sourced: their ids
  are the *paid* method definition's id with a `?source=...` suffix, so the
  delete resolved to the parent. The zone was left with **no rates at all**.
  Caught on the verification query and rebuilt with `.build/restore_rates.py`.
  Shopify also refuses to *edit* them ("only available through Shopify's updated
  APIs"). Grant free shipping with a discount instead.
- **Two product discounts will not stack.** The free cleanser was tried as a
  BXGY, then as a 100%-off basic discount. Both ACTIVE, both with
  `combinesWith.productDiscounts: true`, both ignored — checkout charged $17.95
  on a $142.90 cart. Only moving it to the *order* class worked.
- **Discount minimums cascade.** With the cleanser's minimum at a flat $75, its
  own $17.95 credit dropped the subtotal to $74.97 and free shipping missed by
  three cents. Hence $92.95 = $75 + the cleanser's price.
- **The tracker was measuring the wrong number.** `original_total_price` ignored
  B2G1 and promised rewards checkout refused; `total_price` subtracted the
  cleanser credit so the reward switched itself off. Correct measure is
  `items_subtotal_price` minus the cleanser's own line — `qualifyingSubtotal()`
  in theme.js and `gift_qualifying` in cart-drawer.liquid, which must stay
  identical.
- **`combinesWith` was false on every flag** of the cleanser discount, so taking
  the cleanser silently cost the shopper free shipping.
- **Cart mutations bypassed the gift sync** — `setLineQty` called `render()`
  directly instead of `applyCart()`, so a cart dropping below $75 kept the
  cleanser *and got charged for it*.
- `form.submit()` omits the submit button's name, so declining the BOGO modal
  landed on `/cart` instead of checkout. Use `requestSubmit(button)`.
- Naming a scratch file `types.py` shadowed the stdlib and broke every import.

## Next Step

**Supplier style codes — requested, not started.** The supplier needs the style
code (LZ50 etc.) to fulfil, without the customer seeing it. Plan:
1. Set each variant's **SKU** to its supplier code from `SUPPLIER-CODES.md`.
   SKUs are invisible on the storefront but appear on orders, packing slips and
   exports — the built-in mechanism for exactly this.
2. For the Starter Kit, add hidden `_`-prefixed line item properties carrying the
   three chosen styles' codes. The visible properties record only names
   ("Siren"), which the supplier cannot map. Underscore-prefixed properties are
   hidden from the customer in cart and checkout; the drawer already filters them
   and the add-to-cart serialiser already sends them.

## Context

- **The store is live.** Product, price, discount and shipping changes are real.
- **Verify against the live URL**, not a successful push. Several bugs here only
  showed up at checkout, which is the only authority on discounts.
- **The owner edits in the Shopify admin**, and the theme editor writes to
  `templates/*.json`, `config/settings_data.json` and `sections/*-group.json` —
  the same files a push overwrites. `get` each file immediately before editing.
  `pullall` overwrites local edits, so run it *before* starting, not mid-flight.
- **Section settings must exist before the template references them** — Shopify
  silently drops a setting a schema does not declare, with no error.
- **The cart drawer renders twice** (Liquid on load, `render()` in theme.js after
  every change). A line-level change must be made in both places.
- Shopify prepends a `/* ... */` banner to pulled theme JSON; strip it before
  `json.loads`.
- Admin API token: **[SHOPIFY_TOKEN — redacted, see local env]**. It has been
  pasted in chat repeatedly and should be rotated.
- Lash landed cost **$7.61**; cleanser $8.58, curler $5.87. At $24.99 that is
  69.5% margin, 54.3% under Buy 2 Get 1 Free.
- **Known caveat:** an order discount cannot be conditioned on cart contents, so
  a $92.95+ order with no cleanser in it still takes $17.95 off. The drawer's
  auto-add covers the normal path including cold loads. The alternative is
  dropping either B2G1 or the free cleanser, since they compete for one slot.

### Still open
- Abandoned checkout emails — admin-only, no API scope.
- Header menu collections — needs `write_online_store_navigation`.
- `reviews.items` metafields (masked names, 4-star) still disagree with the
  homepage slider (full names, all 5-star).
- Homepage sourcing note is empty while the product page still carries one.
- 11 ring products exist but are archived, unpublished and in no collection —
  not customer-reachable. An unpublished `all-products-internal` smart
  collection exists to serve discount targeting; leave it alone.
