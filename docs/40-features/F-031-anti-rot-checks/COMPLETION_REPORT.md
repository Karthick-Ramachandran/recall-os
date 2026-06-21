# Completion Report: Anti Rot Checks

## Status

Complete.

## Files Changed

- New `src/core/doctor/checks/context-budget-check.ts`, `staleness-check.ts`; `doctor-check.ts` wiring.
- `README.md` doctor table; `generate-init.ts` RECALL_COMMANDS.
- New tests: `context-budget-check.test.ts`, `staleness-check.test.ts`.

## Tests Run

- `pnpm test:run`, `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm pack:check`, `recall doctor`.

## Results

- 286 tests pass (6 new); typecheck/lint/format/pack green.
- This repo's `recall doctor` stays PASSED — both checks are quiet on a real repo (zero false positives).

## Skipped

- Cached `.recall/index.json` (net-negative; the SessionStart map is already fresh and instant).

## Remaining Risks

- Staleness is a heuristic; conservative thresholds keep it quiet. Budget/threshold are constants
  (config tuning is a possible follow-up).
