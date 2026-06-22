# Architecture Impact: Anti Rot Checks

## Summary

Two additive doctor checks. `context-budget` is pure file sizes. `staleness` is the first doctor
check to read git — but it is gated (skips off-git) and deterministic given the repo, so doctor
stays trustworthy. No config schema change, no new generated files. No new ADR.

## Touched

- New `src/core/doctor/checks/context-budget-check.ts`, `staleness-check.ts`; wired in
  `doctor-check.ts`.
- Docs: README doctor table, generated PERSIST_COMMANDS.

## Invariants preserved

- Deterministic, local, offline; default/fresh repos see no new findings (verified).
