# Handoff

## Goal
Design and build a homepage for a Shopify store (`0z7d94-qf.myshopify.com`) — a foot-comfort/insoles DTC brand. Originally briefed as "Cloud Lifestyle" with stepprs.com as structural (not visual) inspiration; the brand and codebase have since moved significantly past that first attempt (see Current State). User wants this close to launch-ready.

## Current State

**⚠️ Read this before doing anything on a new machine — see "Critical: local-only project" in Context below. The active project directory does not exist outside this Windows machine.**

The brand/design went through four distinct visual attempts this session, in order:
1. **"Cloud Lifestyle"** (Horizon-based, indigo/coral, Space Grotesk) — built in `C:\Users\Turtl\shopify-store`, pushed as unpublished draft theme **"Cloud Lifestyle - Draft" (`#149909962934`)**. This is now **stale/superseded** — work moved to a from-scratch rebuild (below) and this draft hasn't been touched since. Still sitting on the store, unpublished.
2. **"Fulcrum"** — a from-scratch rebrand attempt (graphite/lime, engineering metaphor) built in a *new* project dir, `C:\Users\Turtl\cloud-lifestyle-scratch`, on Shopify's minimal Skeleton theme starter (not Horizon). **Rejected by the client** — wrong brand entirely; the store is called "Cloud," not "Fulcrum."
3. **"Cloud" v2** — same `cloud-lifestyle-scratch` dir, rebuilt with storm-navy/amber palette, airy light-dominant hero. **Rejected** — client specifically flagged that "the spacing between the boxes and the width of the page were absolutely off" (a real container-width/spacing bug, since fixed) plus a large dead-space zone in the hero.
4. **"Cloud" v3 — CURRENT, accepted direction.** Same dir. Pine (`#1F3D32`) + vibrant Terracotta (`#C93E14`) + Linen (`#F1F3F0`), single-family Libre Franklin type, 12px rounded-rect buttons (not pills), moderate shadow depth. Structure: hero → featured product → "How It Works" (Layered Comfort) → Built For → trust/stats → testimonials → catalog → closing CTA. Pushed as unpublished draft theme **"Cloud - Draft v3" (`#149912256694`)**.

**The live/published theme is still stock "Horizon"** (`#149884403894`) — real visitors have seen nothing from any of this work yet. Nothing has been published.

**Since v3 was accepted**, this session ran the full `/impeccable` quality pipeline on it:
- **`/impeccable harden`**: fixed mobile nav being completely inaccessible (no hamburger existed at all), added empty-state fallback nav links, added text-overflow safety on card titles/body text.
- **`/impeccable critique`** (dual-agent, both assessments run as isolated sub-agents per the skill's process): scored **24/40** ("Acceptable"). Snapshot at `C:\Users\Turtl\cloud-lifestyle-scratch\.impeccable\critique\2026-07-15T06-04-03Z__0z7d94-qf-myshopify-com.md`. Findings mostly fixed since: footer nav had the same empty-state bug as the header (fixed), hero and featured-product sections used the identical placeholder graphic (now visually differentiated — hero keeps concentric rings, featured-product got a distinct insole-silhouette icon + "Product photo coming soon" label), no search or quick-add existed anywhere (added: header search dialog using the Skeleton scaffold's existing `/search` infrastructure, and per-card quick-add buttons on the product grid with proper sold-out/multi-variant states), a Linen Deep color-token deviation was reviewed and kept (it's providing a real visual seam between two adjacent Linen sections — documented as an intentional second use in DESIGN.md rather than "fixed").
- **Two things explicitly deferred, per client decision, not bugs**: (1) the trust/stats section ("Comfort, By the Numbers") shows illustrative placeholder data with a visible "replace before launch" disclaimer — client said leave as-is for now since it's still a draft; (2) the catalog has only 1 real product — not something theme code can fix.
- **One real data fix made**: the store's one product was titled "Comfrt 4D Inoles" (typo) — corrected via Admin API to "Comfort 4D Insoles" (product id `8829854122166`). This was a genuine correction via the Shopify Admin API, not a theme-code change.
- **`/impeccable polish` (flagship-quality bar, client says close to launch) — IN PROGRESS, NOT DONE.** A background agent was mid-run (systematic design-system drift audit, interaction-state coverage, real contrast measurements, tablet-breakpoint check, code cleanup) when this handoff was written. **This agent's progress does not transfer to a new machine or session** — whoever resumes needs to either wait for/check this session, or just re-run `/impeccable polish` fresh on the MacBook once the project is actually available there (see Context).

`theme check` was clean (0 errors, 3 expected Google Fonts warnings) as of the last push before the polish agent was launched.

## Files Being Edited
All under `C:\Users\Turtl\cloud-lifestyle-scratch\` (the current, active project — Skeleton-based, NOT the Horizon `shopify-store` dir from attempt #1):
- `sections/header.liquid` — Pine bar, hardcoded "Cloud" wordmark (never `{{ shop.name }}` — that leaked the store's real account name in an earlier pass), hamburger + mobile drawer nav, search dialog, empty-menu fallback
- `sections/footer.liquid` — Pine Deep, same empty-menu fallback pattern as header
- `sections/hero.liquid`, `flagship-product.liquid`, `how-it-works.liquid`, `built-for.liquid`, `proof-data.liquid`, `testimonials.liquid`, `product-grid.liquid` (now with quick-add), `closing-cta.liquid`
- `assets/theme.css` — all Cloud v3 design tokens, shared component classes
- `assets/icon-menu.svg`, `icon-close.svg`, `icon-search.svg` — new icons added this session
- `layout/theme.liquid` — Google Fonts (Libre Franklin) loading
- `PRODUCT.md`, `DESIGN.md` — strategic brief + full visual spec for "Cloud" v3 (Solid Ground / pine-terracotta direction) — rewritten multiple times as brand direction changed; current versions are v3-accurate
- `.impeccable/design.json` — machine-readable design sidecar, kept in sync with DESIGN.md
- `.impeccable/critique/2026-07-15T06-04-03Z__0z7d94-qf-myshopify-com.md` — persisted critique snapshot
- `.env` — `SHOPIFY_FLAG_STORE` + `SHOPIFY_CLI_THEME_TOKEN` (live Admin API token — **sensitive, redacted from this handoff, do not commit**)

## What Failed
- The very first attempts at getting an Admin API token via a `client_credentials` OAuth curl command never worked (invalid grant type for Shopify) and was blocked by the system's credential-exposure safeguard — resolved once a real token was obtained via Shopify admin → Develop apps → API credentials → Reveal token once.
- **That first token later died mid-session** (started returning 401 on a plain read-only request) — cause unclear (regenerated, app reinstalled, or scopes edited), not the "24-hour expiry" the client suspected earlier (custom app tokens don't auto-expire). Got a fresh token from the client, verified it, current `.env` has the working one.
- A background build agent's own `theme dev` verification step connected to the **wrong store** — it used a globally-cached Shopify CLI session (store handle `3e69v2-8h.myshopify.com`, an unrelated store with VAE/BloomFemme themes on it) instead of this project's `.env`-scoped store, and wrote Cloud-project Liquid files into that other store's personal "Development (45c2f3-Vincent)" theme. Client said not to touch that store — **left alone, not cleaned up**. Worth remembering if that stray dev-theme contamination ever surfaces as confusing later.
- Two Horizon-schema push failures early on (attempt #1): `button_border_radius_*` set to `999` when the field's real max is `100`; hero `padding-block-start` of `140` exceeding max `100`. Both fixed.
- A Skeleton-scaffold push failure on "Fulcrum": a range setting (`products_to_show`, min 4 max 8 step 4) had fewer than the required 3 steps — fixed by changing step to `1`.
- Two separate WCAG contrast failures caught and fixed: Coral Bloom `#FF5C8A` (attempt #1, ~2.7:1, darkened to `#CC2E66`) and a Cloud v3 Terracotta candidate `#D9481C`/`#C2521E` (~4.3-4.4:1, darkened to final `#C93E14`, later punched up for more energy and re-verified at `#C93E14` ~5.02:1).
- A "big empty gap" in v3's "Layered Comfort" section turned out, on measurement, to be exactly the defined 96px spacing token on a naturally short section — not a bug, verified and left alone (an example of checking rather than assuming when something looks off).
- A blank-looking product image in a screenshot turned out to be a `loading="lazy"` timing artifact, not a broken asset — confirmed it loads fine (`naturalWidth: 1440`) once actually waited for.
- Assessment B of the critique's browser-overlay injection genuinely failed (not a false claim) — isolated to the Playwright browser's network context being unable to reach a local Node server it spawned; an environment/sandboxing limitation, not a bug in the theme or the detector tooling.

## Next Step
1. **Check whether the background `/impeccable polish` agent finished** (if resuming in this same session/machine) — if so, independently verify its changes (screenshot, computed-style checks, actual clicking-through — this session did NOT rubber-stamp agent self-reports after an earlier miss where a "genuinely excellent" claim missed an obvious dead-space bug the client had to point out manually), then push to `#149912256694` and re-verify live.
2. If resuming fresh on a different machine: **the project doesn't exist there yet** — see Context below for how to actually get it there.
3. Once polish is verified: get explicit client sign-off before publishing `#149912256694` live (nothing has been published this whole session — nothing changes until you push and someone explicitly says "make it live").

## Context
- Store: `0z7d94-qf.myshopify.com`. Storefront password (needed to preview any draft as an anonymous visitor): `[STOREFRONT_PASSWORD — user knows it]`.
- **Critical: local-only project, not in git, not synced anywhere.** `C:\Users\Turtl\cloud-lifestyle-scratch` — the entire "Cloud" v3 codebase, `PRODUCT.md`, `DESIGN.md`, and the `.impeccable/` critique snapshot/sidecar — exists **only on this Windows machine**. Moving to a MacBook does NOT bring this with it. Options to resume there: (a) `shopify theme pull --theme 149912256694` gets the Liquid/CSS code but **not** `PRODUCT.md`/`DESIGN.md`/the critique snapshot, since those are local planning docs, not theme files — brand/design context would need to be reconstructed or manually copied over; (b) actually copy/sync the whole local folder to the new machine some other way (USB, cloud drive, starting a git repo now and pushing it) before switching. Strongly recommend doing (b) — copy the folder — before treating this as resumable elsewhere.
- Two other unpublished/pre-existing themes sit on this store, both untouched: the stale attempt-#1 "Cloud Lifestyle - Draft" (`#149909962934`, different codebase, likely abandon in favor of v3), and an unrelated pre-existing `theme-export-fjcp4v-y9-myshopify-com-concept-v9430` (`#149884469430`) whose origin was never established — leave alone.
- `C:\Users\Turtl\cloud-lifestyle-scratch\.env` holds a live Shopify Admin API token — sensitive, redacted here, never commit it.
- User communicates tersely, prefers direct action over lengthy confirmation loops, but does want risky/destructive actions (deleting things on other stores, pushing to public GitHub repos with business details) confirmed explicitly first — got frustrated earlier when questioning dragged on, but also specifically called out this session for not scrutinizing agent self-reports carefully enough, so: verify claims, but don't over-ask on low-stakes stuff.
- This working directory (`C:\Users\Turtl`) is shared across multiple unrelated projects (this Cloud work, a separate VAÉ Shopify rebuild, a trading-strategy project) — per-project handoff files are kept separate on purpose; don't consolidate them.
- A prior version of this exact handoff file (attempt-#1 era) is preserved above in spirit but has been fully rewritten to reflect the actual current state — if you need attempt-#1's original detail, it's in this file's git/version history if one exists, otherwise it's summarized in "Current State" point 1 above.
