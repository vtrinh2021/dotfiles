# Handoff

## Goal
Set up Pine Script v6 breakout & retest strategy for TradingView, analyze its backtest results, and sync dotfiles across Mac and Windows.

## Current State
- **Pine Script**: `~/Documents/breakout_retest.pine` — working v6 script with swing pivot breakout & retest logic, SL/TP, alerts, and visual drawings. Includes fix for retest zone box not tracking the chart (box.set_right on each bar).
- **Backtest**: Strategy is losing — 30.1% win rate, profit factor 0.27, -$38,438 net PnL over 286 trades on MNQ1! 15-min. Root cause: 10-bar pivot lookback creates too many noise levels, ~6 trades/day is way too many.
- **Dotfiles**: `~/dotfiles` cloned from github.com/vtrinh2021/dotfiles. Three symlinks live: `~/.claude/CLAUDE.md`, `~/.claude/skills`, `~/CLAUDE.md` all pointing into `~/dotfiles/.claude/`. `references/` folder (phrases.md, structures.md) was rescued from old `~/.claude/skills` and committed to dotfiles repo.

## Files Being Edited
- `~/Documents/breakout_retest.pine` — Pine Script v6 breakout & retest strategy
- `~/dotfiles/.claude/skills/references/` — added phrases.md and structures.md (committed and pushed)

## What Failed
- Pine Script v6 migration: `?` nullable type syntax doesn't exist in Pine Script — reverted to plain `var line` / `var box`
- `ln -sf` for skills created a circular symlink because `~/.claude/skills` already existed as a real directory — fixed by removing the directory first then re-linking

## Next Step
Fix the breakout & retest strategy with three improvements:
1. Increase pivot lookback from 10 to 20–30
2. Add H1 200 EMA trend filter (`request.security`)
3. Require retest candle to *close* back above/below the level (not just wick into zone)

## Context
- Strategy math requires ~61% win rate to break even at current avg win/loss ratio — core logic needs the above fixes before re-testing
- Dotfiles sync workflow: `cd ~/dotfiles && git pull` at start of each Mac session; push after making changes
- MNQ1! backtest dashboard: https://claude.ai/code/artifact/6d27d77a-bf07-4817-b22d-1d62a11b28b2
