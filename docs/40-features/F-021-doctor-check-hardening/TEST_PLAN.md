# Test Plan: Doctor Check Hardening

## Unit Tests

- `tests/unit/doctor/drift-check.test.ts`: an ADR identifier only inside a code block produces no
  finding; prose references still resolve as before.
- `tests/unit/doctor/content-check.test.ts`: an unfilled PRD warns on Purpose and In Scope; a filled
  PRD produces no finding.

## Regression

- The repository's own `persist doctor` still passes (its feature PRDs are filled).
- `pnpm test:run`, `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm build`,
  `pnpm pack:check`.
