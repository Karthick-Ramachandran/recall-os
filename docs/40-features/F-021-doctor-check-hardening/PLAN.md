# Plan: Doctor Check Hardening

## Steps

1. Add a `stripCode` helper to `drift-check.ts` and apply it before matching ADR references.
2. Add `content-check.ts` that warns when a feature PRD Purpose or In Scope is an unfilled template.
3. Wire `checkContent` into `runDoctor` after `checkDrift`.
4. Add unit tests for both behaviors and confirm the repository still passes Doctor.

## Out Of Scope

- Semantic drift and module-ownership comparison.
- Hard failure for unfilled content.
