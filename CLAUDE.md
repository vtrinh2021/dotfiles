## Handoff Protocol

Before any /clear command, session end, or when the user says "wrap up" or "we're done":

Write a handoff.md file in the project root with this exact structure:

# Handoff

## Goal
What we were working toward this session.

## Current State
Current state of the code — what's working, what's broken, what's incomplete.

## Files Being Edited
List every file actively touched this session with a one-line note on each.

## What Failed
Everything tried that didn't work and why.

## Next Step
The single most important next action to take when resuming.

## Context
Anything else needed to resume without losing momentum.

---

Never skip this. Always write handoff.md before clearing context.

After writing handoff.md, immediately run:

```
git add handoff.md && git commit -m "handoff" && git push
```
