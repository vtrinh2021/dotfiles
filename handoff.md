# Handoff

## Goal
Build and ship the **Westley & Co** scalp-care store (Calvris competitor, one hero product: Targeted Relief Cream) on store 3e69v2-8h.myshopify.com, executed via the /fable plan→execute→judge loop from the approved design in `westley-store/westley-home.html` / `westley-product.html`. This replaces every prior direction on this store — the VAÉ/Confidante herbal-pads era is dead and its theme deleted (owner decision: brand direction).

## Current State
**Everything built is deployed and browser-verified; nothing is mid-flight.**
- Theme "Westley" (ID 165601738973, **unpublished**) — complete OS 2.0 theme, 62+ files. Preview: https://3e69v2-8h.myshopify.com/?preview_theme_id=165601738973
- Products live: Targeted Relief Cream (3 bundle tiers $44/$69/$109, SKUs WC-TRC-1/2/4), Scalp & Beard Brush $15, Clarifying Bar Soap $22 + hidden "With cream" $14 bump variant (WC-SOAP-14). 7 AI-generated brand images across all three.
- Discounts: free brush BXGY + free shipping ≥$60, both verified in real carts. Bump = real $14 variant (see What Failed).
- Shipped on top of the base build, each verified by Playwright QA rounds (all passing): stop-slop copy pass, de-vibecode design pack (before/after drag slider gated on photos, editorial review styling, side-tab accent removed), whisper-level motion pack (CLS 0.0000, reduced-motion fully static), drawer/body overflow hygiene.
- Launch blockers are all owner-side: domain still voltexbox.com / checkout branded "Vaé", Meta channel, Judge.me, Shopify Subscriptions (refill toggle hidden until plan ID set), consented before/after photos, six compliance-flagged copy lines awaiting accept/reject.

## Files Being Edited
- `C:\Users\Turtl\westley-store\westley-theme\**` — the entire theme (built from scratch, all passes applied)
- `C:\Users\Turtl\westley-store\deploy-westley.ps1` — API deploy script (token from $env:SHOPIFY_TOKEN only)
- `C:\Users\Turtl\westley-store\HANDOFF.md` — **the detailed build dossier**: full verification evidence, decisions, compliance flags, owner TODO list, A/B test, and the QUEUED restructure spec
- `C:\Users\Turtl\westley-store\product-images\*` — generated product photography (approved copies)
- `C:\Users\Turtl\westley-store\westley-home.html` / `westley-product.html` / `westley-vscode-handoff-prompt_2.md` — source of truth (copied from Downloads)
- Memory files updated: westley-store-pivot (new), stellar-june-store (site now shows gemstone rings), fable-orchestration-protocol (new)

## What Failed
- **Shopify cannot stack two automatic BXGY discounts on one buy-item** (one cream can fund free brush OR $8-off soap, never both — proven empirically with real carts; every discount shape tried and documented). Fix: real $14 bump variant, theme adds it by SKU. Residual accepted risk: raw /cart/add.js can add the $14 variant without cream (~$8 exposure; theme UI can't reach it; blocking needs a checkout-validation app).
- **Token 401s, twice** — the owner rotates the Admin API token frequently (correctly). Every 401 mid-deploy failed clean with no partial upload. Always ask for a fresh shpat_ token at session start; env-var only, never to disk, never in this file.
- Calvris-branded jar images in Downloads were **rejected for store use** (competitor brand + drug claims — reference only). One brush render rejected for showing a different physical product; regenerated from the approved shot.
- `/plugin` command unavailable in this environment (21st.dev skills installed via `npx @21st-dev/cli install-skill` instead). Shopify CLI can't authenticate here — all deploys via the Admin API script.
- Session interruptions (process exit, rate limit) were recovered by resuming executor agents from transcripts — no work lost.

## Next Step
**The queued Stellar June-style restructure** (owner request, deferred for usage limits): remodel the Westley homepage into stellarjune.com's catalog pattern **with an animated hero**. Full spec with the SJ reference breakdown and Westley mapping is in `westley-store/HANDOFF.md` under "QUEUED". Start by confirming with the owner: (1) hero animation type — cinemagraph video loop (recommended) vs slideshow, and (2) where the current DR homepage sections (pain cards, timeline, chips) land, since the restructure replaces the approved homepage. PDP ad-lander stays untouched.

## Context
- Store 3e69v2-8h.myshopify.com; primary domain currently **voltexbox.com** (Westley will need its own domain before publish). Live published theme is "VAÉ Dryer — Live" — not ours, don't touch.
- Deploy: `$env:SHOPIFY_TOKEN = '<ask owner>'; powershell -File westley-store\deploy-westley.ps1` — reuses theme 165601738973, uploads all files, prints preview URL.
- Estimated cost of the queued restructure: ~one large executor round + deploy + QA (similar to the motion+copy+design day); hero video loop ≈ tens of Higgsfield credits (balance ~3,900).
- The `/fable` protocol memory and `westley-store-pivot` memory carry the working rules: orchestrator never implements, executors verify with observed behavior, escalate ambiguity, confirm which store before using any pasted token.
