# PRD: Anti Rot Checks

## Purpose

Memory rots two ways this release addresses deterministically: it grows until every session drowns in
it, and it keeps citing code that has moved on. Add two gated `recall doctor` checks — a context
budget and a git-based staleness heuristic — so both stay visible without the gate becoming clever.

## In Scope

- `context-budget`: warn when the always-loaded agent files (CLAUDE.md + AGENTS.md + Cursor rule)
  exceed a generous byte budget.
- `staleness`: inside a git repo, warn when current-state memory cites a `src/` file whose last commit
  is far newer than the memory's last commit. Skips gracefully off-git.

## Non-Goals

- A cached `.recall/index.json` (the SessionStart `ls` map is already fresh and instant; a cache would
  add staleness risk for no gain — deliberately not built).
- Configurable budget/threshold (sensible constants for now).
- Semantic judgement — staleness is a heuristic nudge; the agent confirms real drift.
