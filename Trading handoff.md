# Handoff

## Goal
Take a trading strategy ("Strategy 1" — momentum + breakout with a volatility filter) described by the user from a video, implement it as a TradingView Pine Script strategy, validate it via backtesting on MNQ (Micro Nasdaq) and MGC (Micro Gold) futures, and move toward paper-trading it to see how it performs before ever considering automated live trading on TopstepX.

## Current State
- Working Pine Script v5 strategy called **"Momentum Breakout"** is built and applied to both **MNQ1!** and **MGC1!** on TradingView (5-minute charts). Full source is in the Context section below.
- Rules: long/short on SMA(range,10) > SMA(range,50) volatility expansion + 20-bar momentum/breakout + candle color confirmation; fixed bracket exit at -1.5% stop / +3% target.
- Two real bugs were found and fixed via iterative backtesting:
  1. **Signal-flip whipsaw** — the strategy was letting an opposite signal instantly reverse a position before it ever reached its stop/target. Data showed every trade held ≤15 bars had a 0% win rate. Fixed with a `minHoldBars` gate (15 bars) that blocks reversal signals but leaves the stop/target bracket always live.
  2. **Timezone bug** — an hour-of-day exclusion filter (blocking entries 09:00-11:59) silently did nothing on the first attempt because Pine's bare `hour` variable uses the symbol's *exchange* timezone (America/Chicago for CME), not the chart's *display* timezone (confirmed UTC). Fixed by using `hour(time, "UTC")` explicitly.
- Latest validated results (with realistic $0.65/contract commission + 2-tick slippage applied in Strategy Tester → Properties):
  - **MNQ**: 148 trades, net −$2,741.17, win rate 35.1%, profit factor **0.875**, max drawdown $6,459.
  - **MGC**: 141 trades, net −$1,391.81, win rate 38.3%, profit factor **0.921**, max drawdown $3,695.
  - Both still net-losing (profit factor < 1) but meaningfully improved from the original unfixed version (profit factor 0.760).
  - Notable: on MGC, shorts were net profitable (+$1,525) while longs lost money (−$2,917) — likely reflects gold's downtrend over the May–July 2026 test window rather than a durable directional edge. Flagged to the user as a regime effect, not something to filter on.
- Connected TradingView's **Paper Trading** broker (account shows as "GtxMute usd", ~$102k balance) via the Trading Panel. **Could not find a native "Auto-Trading" toggle** to let the Pine strategy place paper orders automatically — checked the on-chart icon area, the strategy's right-click context menu, and TradingView's own Help Center search for "auto trading." None confirmed the feature exists for this account/broker setup.
- **No real money has been risked.** Never connected to TopstepX's API or any bridge service (PickMyTrade/TradersPost). All work so far is backtesting + attempted paper-trading setup only.

## Files Being Edited
- No local repository files — all strategy work lives directly in TradingView's cloud Pine Editor, not on this machine. This `handoff.md` is the only local file touched this session (plus splitting off `handoff-vae.md` to preserve the prior unrelated project's handoff instead of overwriting it).

## What Failed
- Assumed TradingView's bare `hour` Pine variable matches the chart's displayed timezone — it doesn't; it defaults to the symbol's exchange timezone. Wasted one full backtest cycle before catching this (confirmed by identical entry counts in the excluded hours before and after the "fix").
- Assumed TradingView has an easily discoverable native "connect Pine strategy to Paper Trading account for automatic order execution" feature. After three attempts guided by user screenshots (a floating chart icon, the strategy's right-click menu, Help Center search for "auto trading"), never located or confirmed this exists — it may require a specific supported broker integration TradingView doesn't expose for this account, or may not exist as assumed.
- The original YouTube video the user initially referenced ("this video") had a title referencing "Claude Fable 5" — an internal Anthropic model codename that shouldn't appear organically in a trading video title. Flagged to the user as a likely prompt-injection/scam signal and abandoned as a source. The user instead manually transcribed the actual strategy rules from a screenshot, which is what was actually built and tested — none of the video's own claims or any "free bot" from that channel were used.

## Next Step
Resume by re-asking the user to choose between:
- **(A) Free/manual**: set a TradingView alert (Condition: "Order fills only" → Push/Email) on both MNQ1! and MGC1! charts, then periodically export Strategy Tester → List of Trades CSV for analysis. No real automation — just a low-friction way to track forward (out-of-sample) performance.
- **(B) Paid/real automation**: wire the same TradingView alerts through a webhook into a bridge service (PickMyTrade or TradersPost, ~$29-49/mo) pointed at a demo/paper broker account. This genuinely auto-executes with no manual steps, but requires the user to sign up themselves (I cannot do this for them) and costs money.

The user was asked this but the session ended (`wrap up`) before a decision was made.

## Context
- **Critical rule for judging any future results**: the backtest window used to tune the strategy was **2026-05-17 through 2026-07-08**. Everything in that window was used to fit the `minHoldBars` and hour-exclusion parameters, so it is *not* a fair out-of-sample test. Only trades with an entry date **after 2026-07-08** should be trusted as a genuine forward test of whether these fixes generalize.
- If/when the user wants to move toward real automation on TopstepX: TopstepX launched an official API in April 2026 ($29/mo, $14.50 with promo code "topstep", separate from any bridge subscription). Topstep's rules have some real ambiguity between "all trading activity must originate from your personal device" (their API docs) vs. cloud-hosted bridges like PickMyTrade being openly marketed as Topstep-compatible — get explicit confirmation from Topstep support before connecting any *funded* (not Combine/practice) account to automation.
- User confirmed their TradingView plan is **Essential** (supports webhook alerts) and their chart timezone is **UTC** (shown as the chart clock, e.g. "04:39:39 UTC ETH").
- Full current Pine Script v5 source for "Momentum Breakout" (paste this into the Pine Editor to resume exactly where this session left off):

```pinescript
//@version=5
strategy("Momentum Breakout", overlay=true,
     default_qty_type=strategy.fixed, default_qty_value=1,
     calc_on_every_tick=false)

fastLen  = input.int(10, "Range SMA Fast")
slowLen  = input.int(50, "Range SMA Slow")
lookback = input.int(20, "Momentum/Breakout Lookback")
stopPct  = input.float(1.5, "Stop Loss %")   / 100
tpPct    = input.float(3.0, "Take Profit %") / 100
qty      = input.int(1, "Contracts")
minHoldBars = input.int(15, "Min Bars Before Signal Flip")
excludeHours = input.bool(true, "Exclude 09:00-11:59 entries")

barRange  = high - low
rangeFast = ta.sma(barRange, fastLen)
rangeSlow = ta.sma(barRange, slowLen)
volExpanding = rangeFast > rangeSlow

momentumUp   = close > close[lookback]
momentumDown = close < close[lookback]
breakoutUp   = close > ta.highest(close[1], lookback)
breakoutDown = close < ta.lowest(close[1], lookback)
isGreen = close > open
isRed   = close < open

longSignal  = volExpanding and momentumUp   and breakoutUp   and isGreen
shortSignal = volExpanding and momentumDown and breakoutDown and isRed

barsInTrade = strategy.position_size != 0 ? bar_index - strategy.opentrades.entry_bar_index(0) : 0
canFlip = strategy.position_size == 0 or barsInTrade >= minHoldBars

skipHour = excludeHours and hour(time, "UTC") >= 9 and hour(time, "UTC") < 12
sessionOK = not skipHour

if longSignal and strategy.position_size <= 0 and canFlip and sessionOK
    strategy.entry("Long", strategy.long, qty=qty)

if shortSignal and strategy.position_size >= 0 and canFlip and sessionOK
    strategy.entry("Short", strategy.short, qty=qty)

if strategy.position_size > 0
    strategy.exit("Long Exit", from_entry="Long",
         stop  = strategy.position_avg_price * (1 - stopPct),
         limit = strategy.position_avg_price * (1 + tpPct))

if strategy.position_size < 0
    strategy.exit("Short Exit", from_entry="Short",
         stop  = strategy.position_avg_price * (1 + stopPct),
         limit = strategy.position_avg_price * (1 - tpPct))

plot(rangeFast, "Range SMA Fast", color=color.orange)
plot(rangeSlow, "Range SMA Slow", color=color.blue)
```

- Strategy Tester → Properties settings currently in use: Commission = $0.65 Fixed, Slippage = 2 ticks.

---
